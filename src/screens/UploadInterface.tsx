import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

/**
 * Upload Interface Screen Wireframe
 * Photo picker, preview, and upload controls
 */
const UploadInterface: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handlePickImage = () => {
    // Placeholder for image picker logic
    console.log('Open image picker');
    Alert.alert('Image Picker', 'Select photo from camera or gallery');
  };

  const handleUpload = () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select an image first');
      return;
    }
    console.log('Upload image:', selectedImage);
    Alert.alert('Upload', 'Image upload started...');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Photo</Text>
        <TouchableOpacity onPress={handleUpload} disabled={!selectedImage}>
          <Text style={[styles.shareButton, !selectedImage && styles.disabledButton]}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Image Preview Area */}
        <View style={styles.previewContainer}>
          {selectedImage ? (
            <View style={styles.imagePreview}>
              <Text style={styles.previewLabel}>Selected Image</Text>
              <Text style={styles.previewInfo}>Compressed: 1920px / 80%</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadPrompt} onPress={handlePickImage}>
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadPromptText}>Tap to select photo</Text>
              <Text style={styles.uploadSubtext}>Camera or Gallery</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Options */}
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

        {/* Upload Progress */}
        {selectedImage && (
          <View style={styles.uploadProgress}>
            <Text style={styles.progressLabel}>Uploading...</Text>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarFill} />
            </View>
            <Text style={styles.progressPercent}>75%</Text>
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
  uploadPrompt: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  uploadIcon: {
    fontSize: 轻轻的我来了50,
    marginBottom: 15,
  },
  uploadPromptText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#999',
  },
  imagePreview: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  previewInfo: {
    fontSize: 14,
    color: '#007AFF',
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
    width: '75%',
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
