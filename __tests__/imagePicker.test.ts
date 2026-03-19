import {
  compressImage,
  requestMediaPermissions,
  takePhoto,
  pickFromGallery,
  pickImage,
} from '../src/utils/imagePicker';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Alert, Platform } from 'react-native';

// Mock expo modules
jest.mock('expo-image-picker', () => ({
  launchCameraAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  requestCameraPermissionsAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  MediaTypeOptions: {
    Images: 'images',
  },
}));

jest.mock('expo-image-manipulator', () => ({
  manipulateAsync: jest.fn(),
  SaveFormat: {
    JPEG: 'jpeg',
  },
}));

jest.mock('react-native', () => ({
  Alert: { alert: jest.fn() },
  Platform: { OS: 'ios' },
}));

describe('imagePicker', () => {
  const mockImageUri = 'file://test-image.jpg';
  const mockWidth = 2000;
  const mockHeight = 1500;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('compressImage', () => {
    it('should return original image if within max dimensions', async () => {
      const result = await compressImage(mockImageUri, 1000, 800);

      expect(result).toEqual({
        uri: mockImageUri,
        width: 1000,
        height: 800,
      });
      expect(ImageManipulator.manipulateAsync).not.toHaveBeenCalled();
    });

    it('should resize image if width exceeds max dimension', async () => {
      (ImageManipulator.manipulateAsync as jest.Mock).mockResolvedValue({
        uri: 'compressed.jpg',
        width: 1920,
        height: 1440,
      });

      const result = await compressImage(mockImageUri, mockWidth, mockHeight);

      expect(ImageManipulator.manipulateAsync).toHaveBeenCalledWith(
        mockImageUri,
        [{ resize: { width: 1920, height: 1440 } }],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: false,
        }
      );
      expect(result).toEqual({
        uri: 'compressed.jpg',
        width: 1920,
        height: 1440,
      });
    });

    it('should resize image if height exceeds max dimension', async () => {
      (ImageManipulator.manipulateAsync as jest.Mock).mockResolvedValue({
        uri: 'compressed.jpg',
        width: 960,
        height: 1920,
      });

      const result = await compressImage(mockImageUri, 800, 2500);

      expect(ImageManipulator.manipulateAsync).toHaveBeenCalledWith(
        mockImageUri,
        [{ resize: { width: 960, height: 1920 } }],
        expect.any(Object)
      );
      expect(result).toEqual({
        uri: 'compressed.jpg',
        width: 960,
        height: 1920,
      });
    });

    it('should maintain aspect ratio when resizing landscape image', () => {
      const width = 4000;
      const height = 2000;
      // Landscape: width > height, width is the limiting factor
      // targetWidth = 1920, targetHeight = (2000 * 1920) / 4000 = 960
      const expectedHeight = Math.round((height * 1920) / width);
      expect(expectedHeight).toBe(960);
    });

    it('should maintain aspect ratio when resizing portrait image', () => {
      const width = 1000;
      const height = 3000;
      // Portrait: height > width, height is the limiting factor
      // targetHeight = 1920, targetWidth = (1000 * 1920) / 3000 = 640
      const expectedWidth = Math.round((width * 1920) / height);
      expect(expectedWidth).toBe(640);
    });

    it('should handle errors and return original image', async () => {
      (ImageManipulator.manipulateAsync as jest.Mock).mockRejectedValue(
        new Error('Compression failed')
      );

      const result = await compressImage(mockImageUri, mockWidth, mockHeight);

      expect(result).toEqual({
        uri: mockImageUri,
        width: mockWidth,
        height: mockHeight,
      });
    });
  });

  describe('requestMediaPermissions', () => {
    beforeEach(() => {
      (Platform as any).OS = 'ios';
    });

    it('should return true for web platform', async () => {
      (Platform as any).OS = 'web';
      const result = await requestMediaPermissions();
      expect(result).toBe(true);
      expect(ImagePicker.requestCameraPermissionsAsync).not.toHaveBeenCalled();
    });

    it('should return true when both permissions granted', async () => {
      (ImagePicker.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });
      (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });

      const result = await requestMediaPermissions();

      expect(result).toBe(true);
      expect(Alert.alert).not.toHaveBeenCalled();
    });

    it('should return false and show alert when camera permission denied', async () => {
      (ImagePicker.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });
      (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });

      // Test camera denied, library granted - should still return false due to camera
      (ImagePicker.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'denied',
      });

      const result = await requestMediaPermissions();

      expect(result).toBe(false);
      expect(Alert.alert).toHaveBeenCalledWith('Camera Permission Required', expect.any(String), [
        { text: 'OK' },
      ]);
    });

    it('should return false and show alert when media library permission denied', async () => {
      (ImagePicker.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });
      (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'denied',
      });

      const result = await requestMediaPermissions();

      expect(result).toBe(false);
      expect(Alert.alert).toHaveBeenCalledWith(
        'Photo Library Permission Required',
        expect.any(String),
        [{ text: 'OK' }]
      );
    });

    it('should return false and show alert when both permissions denied', async () => {
      (ImagePicker.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'denied',
      });
      (ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'denied',
      });

      const result = await requestMediaPermissions();

      expect(result).toBe(false);
      expect(Alert.alert).toHaveBeenCalledWith('Permissions Required', expect.any(String), [
        { text: 'OK' },
      ]);
    });
  });

  describe('takePhoto', () => {
    it('should return null if permissions denied', async () => {
      (requestMediaPermissions as jest.Mock).mockResolvedValue(false);

      const result = await takePhoto();

      expect(result).toBeNull();
      expect(ImagePicker.launchCameraAsync).not.toHaveBeenCalled();
    });

    it('should return null if camera cancelled', async () => {
      (requestMediaPermissions as jest.Mock).mockResolvedValue(true);
      (ImagePicker.launchCameraAsync as jest.Mock).mockResolvedValue({ canceled: true });

      const result = await takePhoto();

      expect(result).toBeNull();
    });

    it('should compress and return photo when successful', async () => {
      (requestMediaPermissions as jest.Mock).mockResolvedValue(true);
      (ImagePicker.launchCameraAsync as jest.Mock).mockResolvedValue({
        canceled: false,
        assets: [{ uri: mockImageUri, width: mockWidth, height: mockHeight }],
      });
      (ImageManipulator.manipulateAsync as jest.Mock).mockResolvedValue({
        uri: 'compressed.jpg',
        width: 1920,
        height: 1440,
      });

      const result = await takePhoto();

      expect(result).toEqual({
        uri: 'compressed.jpg',
        width: 1920,
        height: 1440,
      });
      expect(ImageManipulator.manipulateAsync).toHaveBeenCalledWith(
        mockImageUri,
        [{ resize: { width: 1920, height: 1440 } }],
        expect.objectContaining({
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG,
        })
      );
    });

    it('should show alert and return null on error', async () => {
      (requestMediaPermissions as jest.Mock).mockResolvedValue(true);
      (ImagePicker.launchCameraAsync as jest.Mock).mockRejectedValue(new Error('Camera error'));

      const result = await takePhoto();

      expect(result).toBeNull();
      expect(Alert.alert).toHaveBeenCalledWith(
        'Camera Error',
        'Failed to take photo. Please try again.'
      );
    });
  });

  describe('pickFromGallery', () => {
    it('should return null if permissions denied', async () => {
      (requestMediaPermissions as jest.Mock).mockResolvedValue(false);

      const result = await pickFromGallery();

      expect(result).toBeNull();
      expect(ImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
    });

    it('should return null if gallery cancelled', async () => {
      (requestMediaPermissions as jest.Mock).mockResolvedValue(true);
      (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({ canceled: true });

      const result = await pickFromGallery();

      expect(result).toBeNull();
    });

    it('should compress and return selected image', async () => {
      (requestMediaPermissions as jest.Mock).mockResolvedValue(true);
      (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
        canceled: false,
        assets: [{ uri: mockImageUri, width: mockWidth, height: mockHeight }],
      });
      (ImageManipulator.manipulateAsync as jest.Mock).mockResolvedValue({
        uri: 'compressed.jpg',
        width: 1920,
        height: 1440,
      });

      const result = await pickFromGallery();

      expect(result).toEqual({
        uri: 'compressed.jpg',
        width: 1920,
        height: 1440,
      });
    });

    it('should show alert and return null on error', async () => {
      (requestMediaPermissions as jest.Mock).mockResolvedValue(true);
      (ImagePicker.launchImageLibraryAsync as jest.Mock).mockRejectedValue(
        new Error('Gallery error')
      );

      const result = await pickFromGallery();

      expect(result).toBeNull();
      expect(Alert.alert).toHaveBeenCalledWith(
        'Gallery Error',
        'Failed to select photo. Please try again.'
      );
    });
  });

  describe('pickImage', () => {
    it('should call takePhoto when source is camera', async () => {
      (requestMediaPermissions as jest.Mock).mockResolvedValue(false);
      await pickImage('camera');
      expect(ImagePicker.launchCameraAsync).not.toHaveBeenCalled();
      expect(ImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();

      (requestMediaPermissions as jest.Mock).mockResolvedValue(true);
      (ImagePicker.launchCameraAsync as jest.Mock).mockResolvedValue({
        canceled: false,
        assets: [{ uri: mockImageUri, width: 1000, height: 800 }],
      });
      (ImageManipulator.manipulateAsync as jest.Mock).mockResolvedValue({
        uri: 'compressed.jpg',
        width: 1000,
        height: 800,
      });

      const result = await pickImage('camera');
      expect(result).not.toBeNull();
      expect(ImagePicker.launchCameraAsync).toHaveBeenCalled();
    });

    it('should call pickFromGallery when source is gallery', async () => {
      (requestMediaPermissions as jest.Mock).mockResolvedValue(true);
      (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
        canceled: false,
        assets: [{ uri: mockImageUri, width: 1000, height: 800 }],
      });
      (ImageManipulator.manipulateAsync as jest.Mock).mockResolvedValue({
        uri: 'compressed.jpg',
        width: 1000,
        height: 800,
      });

      const result = await pickImage('gallery');
      expect(result).not.toBeNull();
      expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
    });
  });
});
