import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

export interface ImageResult {
  uri: string;
  width: number;
  height: number;
  base64?: string;
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

    return {
      uri: result.assets[0].uri,
      width: result.assets[0].width,
      height: result.assets[0].height,
    };
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

    return {
      uri: result.assets[0].uri,
      width: result.assets[0].width,
      height: result.assets[0].height,
    };
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
