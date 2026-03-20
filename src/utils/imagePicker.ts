import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Alert, Platform } from 'react-native';

export interface ImageResult {
  uri: string;
  width: number;
  height: number;
  base64?: string;
}

const MAX_DIMENSION = 1920;
const COMPRESSION_QUALITY = 0.8;

/**
 * Compress and resize image to meet size requirements
 * Resizes to max 1920px on longest side, compresses to 80% quality
 */
export async function compressImage(
  imageUri: string,
  width: number,
  height: number
): Promise<ImageResult> {
  try {
    // If already within max dimensions, return original without manipulation
    if (width <= MAX_DIMENSION && height <= MAX_DIMENSION) {
      return { uri: imageUri, width, height };
    }

    // Calculate target dimensions maintaining aspect ratio
    let targetWidth = width;
    let targetHeight = height;

    if (width >= height) {
      targetWidth = MAX_DIMENSION;
      targetHeight = Math.round((height * MAX_DIMENSION) / width);
    } else {
      targetHeight = MAX_DIMENSION;
      targetWidth = Math.round((width * MAX_DIMENSION) / height);
    }

    // Perform compression and resizing
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: targetWidth, height: targetHeight } }],
      {
        compress: COMPRESSION_QUALITY,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: false,
      }
    );

    return {
      uri: manipulatedImage.uri,
      width: targetWidth,
      height: targetHeight,
    };
  } catch (error) {
    console.error('Error compressing image:', error);
    // Return original if compression fails
    return { uri: imageUri, width, height };
  }
}

/**
 * Request camera and media library permissions
 * Returns true if all permissions granted, false otherwise
 */
export async function requestMediaPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') {
    return true; // Web doesn't require permissions
  }

  const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
  const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (cameraStatus !== 'granted' && mediaLibraryStatus !== 'granted') {
    Alert.alert(
      'Permissions Required',
      'Camera and photo library access are needed to select and upload photos. Please enable these permissions in your device settings.',
      [{ text: 'OK' }]
    );
    return false;
  }

  if (cameraStatus !== 'granted') {
    Alert.alert(
      'Camera Permission Required',
      'Camera access is needed to take photos. Please enable camera permission in your device settings.',
      [{ text: 'OK' }]
    );
    return false;
  }

  if (mediaLibraryStatus !== 'granted') {
    Alert.alert(
      'Photo Library Permission Required',
      'Photo library access is needed to select existing photos. Please enable photo library permission in your device settings.',
      [{ text: 'OK' }]
    );
    return false;
  }

  return true;
}

/**
 * Launch camera to take a new photo
 */
export async function takePhoto(): Promise<ImageResult | null> {
  const hasPermission = await requestMediaPermissions();
  if (!hasPermission) {
    return null;
  }

  try {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      exif: false,
    });

    if (result.canceled) {
      return null;
    }

    const originalImage = result.assets[0];
    // Compress the image after capture
    const compressed = await compressImage(
      originalImage.uri,
      originalImage.width,
      originalImage.height
    );

    return compressed;
  } catch (error) {
    console.error('Error taking photo:', error);
    Alert.alert('Camera Error', 'Failed to take photo. Please try again.');
    return null;
  }
}

/**
 * Launch gallery picker to select existing photo
 */
export async function pickFromGallery(): Promise<ImageResult | null> {
  const hasPermission = await requestMediaPermissions();
  if (!hasPermission) {
    return null;
  }

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      exif: false,
    });

    if (result.canceled) {
      return null;
    }

    const originalImage = result.assets[0];
    // Compress the image after selection
    const compressed = await compressImage(
      originalImage.uri,
      originalImage.width,
      originalImage.height
    );

    return compressed;
  } catch (error) {
    console.error('Error picking image:', error);
    Alert.alert('Gallery Error', 'Failed to select photo. Please try again.');
    return null;
  }
}

/**
 * Unified function to pick image from camera or gallery
 * @param source - 'camera' or 'gallery'
 */
export async function pickImage(source: 'camera' | 'gallery'): Promise<ImageResult | null> {
  if (source === 'camera') {
    return await takePhoto();
  } else {
    return await pickFromGallery();
  }
}
