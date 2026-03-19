import React, { useState, useEffect, useMemo } from 'react';
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
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  startAfter,
  limit,
  type DocumentData,
} from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../services/firebase';
import { usePhotos } from '../contexts/PhotoContext';
import { useEvent } from '../contexts/EventContext';
import type { Photo } from '../types';

interface PhotoFeedScreenProps {
  eventId?: string;
}

interface PhotoWithUri extends Photo {
  uri?: string;
}

const PhotoFeedScreen: React.FC<PhotoFeedScreenProps> = ({ eventId: propEventId }) => {
  const { currentEvent } = useEvent();
  const { pendingPhotos } = usePhotos();
  const effectiveEventId = propEventId || currentEvent?.id;

  // Pagination state for confirmed photos
  const [confirmedPhotos, setConfirmedPhotos] = useState<PhotoWithUri[]>([]);
  const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotoUris = async (photosList: Photo[]): Promise<PhotoWithUri[]> => {
    return Promise.all(
      photosList.map(async (photo) => {
        try {
          const uri = await getDownloadURL(ref(storage, photo.storagePath));
          return { ...photo, uri };
        } catch (err) {
          console.error(`Error getting download URL for photo ${photo.id}:`, err);
          return { ...photo, uri: undefined };
        }
      })
    );
  };

  // Initial subscription (first page with real-time updates)
  useEffect(() => {
    if (!effectiveEventId) {
      setLoadingInitial(false);
      setError('No event selected.');
      return;
    }

    setLoadingInitial(true);
    setError(null);

    const q = query(
      collection(db, 'photos'),
      where('eventId', '==', effectiveEventId),
      orderBy('createdAt', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        const photosData: Photo[] = snapshot.docs.map((doc) => {
          const data = doc.data() as DocumentData;
          return {
            id: doc.id,
            eventId: data.eventId,
            uploaderId: data.uploaderId,
            storagePath: data.storagePath,
            thumbnailPath: data.thumbnailPath,
            createdAt: data.createdAt?.toDate() || new Date(),
            width: data.width,
            height: data.height,
          };
        });

        if (snapshot.docs.length > 0) {
          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        } else {
          setLastDoc(null);
        }
        setHasMore(snapshot.docs.length === 20);

        try {
          const photosWithUris = await fetchPhotoUris(photosData);
          setConfirmedPhotos(photosWithUris);
        } catch (e) {
          console.error('Error fetching URIs:', e);
        } finally {
          setLoadingInitial(false);
        }
      },
      (err) => {
        console.error('Subscription error:', err);
        setError('Failed to load photos');
        setLoadingInitial(false);
      }
    );

    return () => unsubscribe();
  }, [effectiveEventId]);

  // Load more photos (pagination)
  const loadMore = async () => {
    if (!lastDoc || loadingMore || !hasMore || !effectiveEventId) return;

    setLoadingMore(true);
    try {
      const q = query(
        collection(db, 'photos'),
        where('eventId', '==', effectiveEventId),
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(20)
      );

      const snapshot = await getDocs(q);
      const photosData: Photo[] = snapshot.docs.map((doc) => {
        const data = doc.data() as DocumentData;
        return {
          id: doc.id,
          eventId: data.eventId,
          uploaderId: data.uploaderId,
          storagePath: data.storagePath,
          thumbnailPath: data.thumbnailPath,
          createdAt: data.createdAt?.toDate() || new Date(),
          width: data.width,
          height: data.height,
        };
      });

      if (snapshot.docs.length > 0) {
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      } else {
        setLastDoc(null);
      }
      setHasMore(snapshot.docs.length === 20);

      const newPhotos = await fetchPhotoUris(photosData);
      setConfirmedPhotos((prev) => [...prev, ...newPhotos]);
    } catch (err) {
      console.error('Error loading more photos:', err);
      setError('Failed to load more photos');
    } finally {
      setLoadingMore(false);
    }
  };

  // Combine confirmed and pending photos, sorted by newest first
  const pendingWithUri = useMemo(() => {
    return pendingPhotos.filter((p) => p.localUri).map((p) => ({ ...p, uri: p.localUri }));
  }, [pendingPhotos]);

  const allPhotos = useMemo(() => {
    const combined = [...confirmedPhotos, ...pendingWithUri];
    combined.sort((a, b) => {
      const dateA =
        a.createdAt instanceof Date ? a.createdAt.getTime() : new Date(a.createdAt).getTime();
      const dateB =
        b.createdAt instanceof Date ? b.createdAt.getTime() : new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
    return combined;
  }, [confirmedPhotos, pendingWithUri]);

  const pendingIds = useMemo(() => new Set(pendingPhotos.map((p) => p.id)), [pendingPhotos]);

  const renderPhoto = ({ item }: { item: PhotoWithUri }) => {
    const isPending = pendingIds.has(item.id);

    return (
      <View style={styles.photoCard}>
        <View style={styles.photoImageContainer}>
          {item.uri ? (
            <Image source={{ uri: item.uri }} style={styles.photoImage} resizeMode="cover" />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoLabel}>Loading image...</Text>
            </View>
          )}

          {isPending && (
            <View style={styles.pendingOverlay}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.pendingOverlayText}>Uploading...</Text>
            </View>
          )}
        </View>

        <View style={styles.photoInfo}>
          <Text style={styles.uploaderText}>Uploader: {item.uploaderId.substring(0, 8)}...</Text>
          <Text style={styles.timestamp}>
            {item.createdAt instanceof Date ? item.createdAt.toLocaleTimeString() : 'Just now'}
          </Text>
        </View>

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
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.footerLoaderText}>Loading more...</Text>
      </View>
    );
  };

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

  if (loadingInitial && allPhotos.length === 0) {
    return renderLoadingState();
  }

  if (error && allPhotos.length === 0) {
    return renderErrorState();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => window.history.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Photos</Text>
        <View style={styles.placeholderButton} />
      </View>

      {allPhotos.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={allPhotos}
          renderItem={renderPhoto}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.feed}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: { fontSize: 16, color: '#007AFF' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  placeholderButton: { width: 60 },
  feed: { padding: 10 },
  photoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  photoImageContainer: { position: 'relative' },
  photoImage: { width: '100%', height: 300 },
  photoPlaceholder: {
    height: 300,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoLabel: { fontSize: 18, color: '#999' },
  pendingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingOverlayText: { color: '#fff', fontSize: 14, fontWeight: '600', marginTop: 8 },
  photoInfo: { padding: 12, borderTopWidth: 1, borderTopColor: '#f5f5f5' },
  uploaderText: { fontSize: 14, color: '#666', marginBottom: 4 },
  timestamp: { fontSize: 12, color: '#999' },
  photoActions: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  actionIcon: { fontSize: 18, marginRight: 5 },
  actionText: { fontSize: 14, color: '#666' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 15, fontSize: 16, color: '#666' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  errorIcon: { fontSize: 60, marginBottom: 15 },
  errorTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  errorMessage: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyIcon: { fontSize: 80, marginBottom: 20 },
  emptyTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  emptyMessage: { fontSize: 16, color: '#666', textAlign: 'center' },
  footerLoader: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoaderText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
});

export default PhotoFeedScreen;
