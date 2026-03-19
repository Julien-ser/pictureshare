import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { pickImage, ImageResult, requestMediaPermissions } from '../utils/imagePicker';
import { uploadAndSavePhoto, generatePhotoId } from '../services/photoService';
import { addToOfflineQueue } from '../services/offlineQueue';
import { auth } from '../services/firebase';
import { usePhotos } from '../contexts/PhotoContext';
import { useNetwork } from '../contexts/NetworkContext';
import type { Photo } from '../types';

/**
 * Upload Interface Screen
 * Photo picker, preview, and upload controls with permission handling
 */
interface UploadInterfaceProps {
  eventId: string;
}

const UploadInterface: React.FC<UploadInterfaceProps> = ({ eventId }) => {
  const { addPendingPhoto, removePendingPhoto } = usePhotos();
  const { isOnline } = useNetwork();
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [permissionsChecked, setPermissionsChecked] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    if (Platform.OS === 'web') {
      setPermissionsChecked(true);
      return;
    }
    const hasPermission = await requestMediaPermissions();
    setPermissionsChecked(hasPermission);
  };

  const handlePickImage = async (source: 'camera' | 'gallery') => {
    if (!permissionsChecked) {
      await checkPermissions();
    }

    const image = await pickImage(source);
    if (image) {
      setSelectedImage(image);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select an image first');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Authentication Required', 'Please sign in to upload photos.');
      return;
    }

    // Generate photo ID and create pending photo for optimistic UI
    const photoId = generatePhotoId();
    const pendingPhoto: Photo = {
      id: photoId,
      eventId,
      uploaderId: user.uid,
      storagePath: `events/${eventId}/photos/${photoId}.jpg`,
      width: selectedImage.width,
      height: selectedImage.height,
      createdAt: new Date(),
      localUri: selectedImage.uri, // Local URI for immediate display
    };

    // Add to pending state (optimistic UI)
    addPendingPhoto(pendingPhoto);

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // If offline, add to offline queue directly
      if (!isOnline) {
        console.log('Offline - adding upload to offline queue');
        await addToOfflineQueue({
          id: photoId,
          eventId,
          uploaderId: user.uid,
          localImageUri: selectedImage.uri,
          width: selectedImage.width,
          height: selectedImage.height,
          storagePath: pendingPhoto.storagePath,
        });
        Alert.alert(
          'Offline Mode',
          "Photo saved locally. It will upload automatically when you're back online.",
          [{ text: 'OK' }]
        );
        setSelectedImage(null);
        setUploadProgress(100);
        setIsUploading(false);
        return;
      }

      // Online - try to upload
      await uploadAndSavePhoto(eventId, user.uid, selectedImage, photoId, (progress) => {
        setUploadProgress(progress);
      });

      // Ensure progress shows 100% after completion
      setUploadProgress(100);

      // Remove from pending state now that upload succeeded
      removePendingPhoto(photoId);

      Alert.alert('Upload Complete', 'Your photo has been shared with the event group!', [
        {
          text: 'OK',
          onPress: () => {
            setSelectedImage(null);
            setUploadProgress(0);
          },
        },
      ]);
    } catch (error) {
      console.error('Upload error:', error);

      // Network error or upload failed - add to offline queue for retry
      if (isOnline) {
        console.log('Upload failed while online - adding to offline queue for retry');
        try {
          await addToOfflineQueue({
            id: photoId,
            eventId,
            uploaderId: user.uid,
            localImageUri: selectedImage.uri,
            width: selectedImage.width,
            height: selectedImage.height,
            storagePath: pendingPhoto.storagePath,
          });
          Alert.alert(
            'Connection Issue',
            'Upload failed. Photo will retry automatically when connection improves.',
            [{ text: 'OK' }]
          );
        } catch (queueError) {
          console.error('Failed to add to offline queue:', queueError);
          Alert.alert(
            'Upload Failed',
            'Could not upload the photo and failed to save for retry. Please try again.'
          );
          removePendingPhoto(photoId);
        }
      } else {
        // This shouldn't happen as we check isOnline above, but handle it
        Alert.alert('Upload Failed', 'Could not upload the photo. Please try again.');
        removePendingPhoto(photoId);
      }

      setSelectedImage(null);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSelectedImage(null)}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Photo</Text>
        <TouchableOpacity onPress={handleUpload} disabled={!selectedImage || isUploading}>
          <Text
            style={[styles.shareButton, (!selectedImage || isUploading) && styles.disabledButton]}
          >
            {isUploading ? 'Sharing...' : 'Share'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Image Preview Area */}
        <View style={styles.previewContainer}>
          {selectedImage ? (
            <View style={styles.imagePreview}>
              <Image
                source={{ uri: selectedImage.uri }}
                style={styles.previewImage}
                resizeMode="contain"
              />
              {isUploading && (
                <View style={styles.uploadOverlay}>
                  <ActivityIndicator size="large" color="#fff" />
                  <Text style={styles.uploadOverlayText}>{uploadProgress}%</Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.uploadOptions}>
              <TouchableOpacity
                style={[styles.optionButton, styles.cameraButton]}
                onPress={() => handlePickImage('camera')}
              >
                <Text style={styles.optionIcon}>📸</Text>
                <Text style={styles.optionButtonText}>Take Photo</Text>
                <Text style={styles.optionSubtext}>Use camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.optionButton, styles.galleryButton]}
                onPress={() => handlePickImage('gallery')}
              >
                <Text style={styles.optionIcon}>🖼️</Text>
                <Text style={styles.optionButtonText}>Choose from Gallery</Text>
                <Text style={styles.optionSubtext}>Select existing photo</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Options */}
        {selectedImage && (
          <View style={styles.optionsSection}>
            <Text style={styles.sectionTitle}>Options</Text>

            {/* Quality Indicator */}
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Image Quality</Text>
              <Text style={styles.optionValue}>80% (High)</Text>
            </View>

            {/* Size Indicator */}
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Max Size</Text>
              <Text style={styles.optionValue}>1920px</Text>
            </View>

            {/* Add Caption */}
            <TouchableOpacity style={styles.captionButton}>
              <Text style={styles.captionButtonText}>+ Add Caption</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <View style={styles.uploadProgress}>
            <Text style={styles.progressLabel}>Uploading...</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: `${uploadProgress}%` }]} />
            </View>
            <Text style={styles.progressPercent}>{uploadProgress}%</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  shareButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  disabledButton: {
    color: '#ccc',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  previewContainer: {
    flex: 1,
    marginBottom: 20,
  },
  uploadOptions: {
    flex: 1,
    justifyContent: 'center',
    gap: 15,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  cameraButton: {
    opacity: 0.95,
  },
  galleryButton: {
    opacity: 0.9,
  },
  optionIcon: {
    fontSize: 40,
    marginBottom: 15,
  },
  optionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  optionSubtext: {
    fontSize: 14,
    color: '#999',
  },
  imagePreview: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  uploadOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadOverlayText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 10,
  },
  optionsSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionLabel: {
    fontSize: 14,
    color: '#666',
  },
  optionValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  captionButton: {
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  captionButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  uploadProgress: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 15,
  },
  progressLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressPercent: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
});

export default UploadInterface;
