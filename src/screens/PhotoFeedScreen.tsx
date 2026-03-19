import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../services/firebase';
import { subscribeToPhotos } from '../services/photoService';
import { useEvent } from '../contexts/EventContext';
import type { Photo } from '../types';

interface PhotoFeedScreenProps {
  eventId?: string; // Optional - will use context if not provided
}

interface PhotoWithUri extends Photo {
  uri?: string;
}

const PhotoFeedScreen: React.FC<PhotoFeedScreenProps> = ({ eventId: propEventId }) => {
  const { currentEvent } = useEvent();
  const effectiveEventId = propEventId || currentEvent?.id;
  const [photos, setPhotos] = useState<PhotoWithUri[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch download URLs for photos
  const fetchPhotoUris = async (photosWithoutUri: Photo[]): Promise<PhotoWithUri[]> => {
    const photosWithUris = await Promise.all(
      photosWithoutUri.map(async (photo) => {
        try {
          const uri = await getDownloadURL(ref(storage, photo.storagePath));
          return { ...photo, uri };
        } catch (err) {
          console.error(`Error getting download URL for photo ${photo.id}:`, err);
          return photo;
        }
      })
    );
    return photosWithUris;
  };

  useEffect(() => {
    const currentId = effectiveEventId;
    if (!currentId) {
      setLoading(false);
      setError('No event selected. Join an event to view photos.');
      return;
    }

    setLoading(true);
    setError(null);

    // Subscribe to real-time photo updates
    const unsubscribe = subscribeToPhotos(currentId, async (photosData) => {
      try {
        // Fetch download URLs for each photo
        const photosWithUris = await fetchPhotoUris(photosData);
        setPhotos(photosWithUris);
        setLoading(false);
      } catch (err) {
        console.error('Error processing photos:', err);
        setError('Failed to load photos');
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [effectiveEventId]);

  const renderPhoto = ({ item }: { item: PhotoWithUri }) => (
    <View style={styles.photoCard}>
      {/* Photo Image */}
      {item.uri ? (
        <Image source={{ uri: item.uri }} style={styles.photoImage} resizeMode="cover" />
      ) : (
        <View style={styles.photoPlaceholder}>
          <Text style={styles.photoLabel}>Loading image...</Text>
        </View>
      )}

      {/* Photo Info */}
      <View style={styles.photoInfo}>
        <Text style={styles.uploaderText}>Uploader: {item.uploaderId.substring(0, 8)}...</Text>
        <Text style={styles.timestamp}>
          {item.createdAt instanceof Date ? item.createdAt.toLocaleTimeString() : 'Just now'}
        </Text>
      </View>

      {/* Photo Actions - Placeholder for future features */}
      <View style={styles.photoActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Info', 'Likes feature coming in Phase 5')}
        >
          <Text style={styles.actionIcon}>❤️</Text>
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Info', 'Comments feature coming in Phase 5')}
        >
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📷</Text>
      <Text style={styles.emptyTitle}>No photos yet</Text>
      <Text style={styles.emptyMessage}>Be the first to share a photo in this event!</Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>Loading photos...</Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTitle}>Error loading photos</Text>
      <Text style={styles.errorMessage}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={() => window.location.reload()}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading && photos.length === 0) {
    return renderLoadingState();
  }

  if (error && photos.length === 0) {
    return renderErrorState();
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => window.history.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Photos</Text>
        <View style={styles.placeholderButton} />
      </View>

      {/* Photo Feed */}
      {photos.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={photos}
          renderItem={renderPhoto}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.feed}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  backButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholderButton: {
    width: 60,
  },
  feed: {
    padding: 10,
  },
  photoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: 300,
  },
  photoPlaceholder: {
    height: 300,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoLabel: {
    fontSize: 18,
    color: '#999',
  },
  photoInfo: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  uploaderText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  photoActions: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionIcon: {
    fontSize: 18,
    marginRight: 5,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default PhotoFeedScreen;
