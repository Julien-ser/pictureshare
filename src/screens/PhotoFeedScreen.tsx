import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import { type Unsubscribe } from 'firebase/firestore';
import { storage } from '../services/firebase';
import { usePhotos } from '../contexts/PhotoContext';
import { useEvent } from '../contexts/EventContext';
import { useNetwork } from '../contexts/NetworkContext';
import { useAuth } from '../contexts/AuthContext';
import { canDeletePhoto, deletePhotoWithPermission } from '../services/photoService';
import {
  toggleLike,
  getLikeCount,
  hasUserLiked,
  subscribeToLikeCount,
  subscribeToUserLike,
} from '../services/likeService';
import { subscribeToCommentCount } from '../services/commentService';
import CommentsModal from '../components/CommentsModal';
import ParticipantsList from '../components/ParticipantsList';
import type { Photo } from '../types';

type TabType = 'photos' | 'participants';

interface PhotoFeedScreenProps {
  eventId?: string;
}

interface PhotoWithUri extends Photo {
  uri?: string;
}

const PhotoFeedScreen: React.FC<PhotoFeedScreenProps> = ({ eventId: propEventId }) => {
  const { user } = useAuth();
  const { currentEvent } = useEvent();
  const {
    photos: confirmedPhotos,
    pendingPhotos,
    hasMore,
    loadingMore,
    initialLoading,
    error,
    loadMorePhotos,
  } = usePhotos();
  const { isOnline, pendingUploads } = useNetwork();
  const effectiveEventId = propEventId || currentEvent?.id;

  // Set of pending photo IDs for quick lookup
  const pendingIds = useMemo(() => new Set(pendingPhotos.map((p) => p.id)), [pendingPhotos]);

  // Map to cache URIs for confirmed photos
  const [photoUrisMap, setPhotoUrisMap] = useState<Map<string, string>>(new Map());

  // Track delete permissions: photoId -> boolean
  const [deletePermissions, setDeletePermissions] = useState<Map<string, boolean>>(new Map());
  const [loadingPermissions, setLoadingPermissions] = useState<Set<string>>(new Set());

  // Track like counts and user like status
  const [likeCounts, setLikeCounts] = useState<Map<string, number>>(new Map());
  const [likedByUser, setLikedByUser] = useState<Map<string, boolean>>(new Map());
  const [loadingLikes, setLoadingLikes] = useState<Set<string>>(new Set());
  const [pendingLikePhotos, setPendingLikePhotos] = useState<Set<string>>(new Set());

  // Track comment counts
  const [commentCounts, setCommentCounts] = useState<Map<string, number>>(new Map());

  // Comments modal state
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  // Tab state: 'photos' or 'participants'
  const [activeTab, setActiveTab] = useState<TabType>('photos');

  // Fetch URIs for newly added confirmed photos
  useEffect(() => {
    const fetchUris = async () => {
      // Find confirmed photos that don't have a cached URI yet
      const newPhotos = confirmedPhotos.filter((p) => !photoUrisMap.has(p.id));
      if (newPhotos.length === 0) return;

      const uriPromises = newPhotos.map(async (photo) => {
        try {
          const uri = await getDownloadURL(ref(storage, photo.storagePath));
          return { id: photo.id, uri };
        } catch (err) {
          console.error(`Error getting download URL for photo ${photo.id}:`, err);
          return { id: photo.id, uri: undefined };
        }
      });

      const results = await Promise.all(uriPromises);

      setPhotoUrisMap((prev) => {
        const next = new Map(prev);
        results.forEach(({ id, uri }) => {
          if (uri) {
            next.set(id, uri);
          }
        });
        return next;
      });
    };

    fetchUris();
  }, [confirmedPhotos]);

  // Pre-check delete permissions for confirmed photos when user or event changes
  useEffect(() => {
    const checkPermissions = async () => {
      if (!user || !effectiveEventId) return;

      const newPermissions = new Map<string, boolean>();
      const newLoading = new Set<string>();

      // Check permissions for all confirmed photos that we haven't checked yet
      const photosToCheck = confirmedPhotos.filter(
        (p) => !pendingIds.has(p.id) && deletePermissions.get(p.id) === undefined
      );

      if (photosToCheck.length === 0) return;

      setLoadingPermissions((prev) => {
        const next = new Set(prev);
        photosToCheck.forEach((p) => next.add(p.id));
        return next;
      });

      await Promise.all(
        photosToCheck.map(async (photo) => {
          try {
            const canDelete = await canDeletePhoto(photo.id, user.id, effectiveEventId!);
            newPermissions.set(photo.id, canDelete);
          } catch (error) {
            console.error(`Error checking delete permission for photo ${photo.id}:`, error);
            newPermissions.set(photo.id, false);
          } finally {
            newLoading.delete(photo.id);
          }
        })
      );

      setDeletePermissions((prev) => new Map([...prev, ...newPermissions]));
      setLoadingPermissions((prev) => {
        const next = new Set(prev);
        photosToCheck.forEach((p) => next.delete(p.id));
        return next;
      });
    };

    checkPermissions();
  }, [user, effectiveEventId, confirmedPhotos, pendingIds, deletePermissions]);

  // Subscribe to like counts for confirmed photos
  useEffect(() => {
    const unsubscribers: Unsubscribe[] = [];

    confirmedPhotos.forEach((photo) => {
      if (pendingIds.has(photo.id)) return; // Skip pending photos

      const unsubscribe = subscribeToLikeCount(photo.id, (count) => {
        setLikeCounts((prev) => new Map(prev.set(photo.id, count)));
      });
      unsubscribers.push(unsubscribe);
    });

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [confirmedPhotos, pendingIds]);

  // Subscribe to user like status for each confirmed photo
  useEffect(() => {
    if (!user) {
      setLikedByUser(new Map());
      return;
    }

    const unsubscribers: Unsubscribe[] = [];

    confirmedPhotos.forEach((photo) => {
      if (pendingIds.has(photo.id)) return;

      const unsubscribe = subscribeToUserLike(photo.id, user.id, (hasLiked) => {
        setLikedByUser((prev) => new Map(prev.set(photo.id, hasLiked)));
      });
      unsubscribers.push(unsubscribe);
    });

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [confirmedPhotos, pendingIds, user]);

  // Subscribe to comment counts for confirmed photos
  useEffect(() => {
    const unsubscribers: Unsubscribe[] = [];

    confirmedPhotos.forEach((photo) => {
      if (pendingIds.has(photo.id)) return;

      const unsubscribe = subscribeToCommentCount(photo.id, (count) => {
        setCommentCounts((prev) => new Map(prev.set(photo.id, count)));
      });
      unsubscribers.push(unsubscribe);
    });

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [confirmedPhotos, pendingIds]);

  // Build combined photos list with URIs
  const combinedPhotos = useMemo(() => {
    const pendingWithUri: PhotoWithUri[] = pendingPhotos.map((p) => ({
      ...p,
      uri: p.localUri,
    }));

    const confirmedWithUri: PhotoWithUri[] = confirmedPhotos
      .filter((p) => p.id !== undefined) // ensure id exists
      .map((p) => ({
        ...p,
        uri: photoUrisMap.get(p.id),
      }));

    const combined = [...pendingWithUri, ...confirmedWithUri];
    combined.sort((a, b) => {
      const dateA =
        a.createdAt instanceof Date ? a.createdAt.getTime() : new Date(a.createdAt).getTime();
      const dateB =
        b.createdAt instanceof Date ? b.createdAt.getTime() : new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    return combined;
  }, [pendingPhotos, confirmedPhotos, photoUrisMap]);

  // Handle photo deletion
  const handleDeletePhoto = useCallback(
    async (photoId: string, uploaderId: string) => {
      if (!user || !effectiveEventId) {
        Alert.alert('Error', 'You must be logged in and in an event to delete photos');
        return;
      }

      // Confirm deletion
      Alert.alert(
        'Delete Photo',
        'Are you sure you want to delete this photo? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                await deletePhotoWithPermission(photoId, effectiveEventId, user.id);
                Alert.alert('Success', 'Photo deleted successfully');
                // The real-time listener will update the UI automatically
              } catch (error) {
                Alert.alert(
                  'Error',
                  error instanceof Error ? error.message : 'Failed to delete photo'
                );
              }
            },
          },
        ]
      );
    },
    [user, effectiveEventId]
  );

  // Check if current user can delete a specific photo
  const canUserDeletePhoto = useCallback(
    (photoId: string) => {
      if (!user) return false;
      // If still loading permission, default to false
      if (loadingPermissions.has(photoId)) return false;
      return deletePermissions.get(photoId) || false;
    },
    [user, deletePermissions, loadingPermissions]
  );

  const handleToggleLike = useCallback(
    async (photoId: string) => {
      if (!user) {
        Alert.alert('Error', 'You must be logged in to like photos');
        return;
      }

      if (pendingLikePhotos.has(photoId)) {
        return; // Prevent multiple toggles
      }

      setPendingLikePhotos((prev) => new Set(prev).add(photoId));

      try {
        await toggleLike(photoId, user.id);
      } catch (error) {
        console.error('Error toggling like:', error);
        Alert.alert('Error', error instanceof Error ? error.message : 'Failed to update like');
      } finally {
        setPendingLikePhotos((prev) => {
          const next = new Set(prev);
          next.delete(photoId);
          return next;
        });
      }
    },
    [user, pendingLikePhotos]
  );

  const handleOpenComments = useCallback((photoId: string) => {
    setSelectedPhotoId(photoId);
    setShowCommentsModal(true);
  }, []);

  const handleCloseComments = useCallback(() => {
    setShowCommentsModal(false);
    setSelectedPhotoId(null);
  }, []);

  // Render the photo feed content
  const renderPhotoContent = () => {
    if (initialLoading && combinedPhotos.length === 0) {
      return renderLoadingState();
    }

    if (error && combinedPhotos.length === 0) {
      return renderErrorState();
    }

    if (combinedPhotos.length === 0) {
      return renderEmptyState();
    }

    return (
      <>
        <FlatList
          data={combinedPhotos}
          renderItem={renderPhoto}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.feed}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMorePhotos}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
        <CommentsModal
          visible={showCommentsModal}
          photoId={selectedPhotoId || ''}
          onClose={handleCloseComments}
        />
      </>
    );
  };

  const renderPhoto = ({ item }: { item: PhotoWithUri }) => {
    const isPending = pendingIds.has(item.id);
    const canDelete = canUserDeletePhoto(item.id);

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
            onPress={() => handleToggleLike(item.id)}
            disabled={pendingLikePhotos.has(item.id)}
          >
            <Text style={styles.actionIcon}>{likedByUser.get(item.id) ? '❤️' : '🤍'}</Text>
            <Text style={styles.actionText}>{likeCounts.get(item.id) || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleOpenComments(item.id)}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionText}>{commentCounts.get(item.id) || 0}</Text>
          </TouchableOpacity>
          {!isPending && canDelete && (
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => handleDeletePhoto(item.id, item.uploaderId)}
            >
              <Text style={[styles.actionIcon, styles.deleteIcon]}>🗑️</Text>
              <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
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

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.footerLoaderText}>Loading more...</Text>
      </View>
    );
  };

  if (initialLoading && combinedPhotos.length === 0) {
    return renderLoadingState();
  }

  if (error && combinedPhotos.length === 0) {
    return renderErrorState();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => window.history.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {activeTab === 'photos' ? 'Event Photos' : 'Participants'}
        </Text>
        <View style={styles.statusContainer}>
          {!isOnline && (
            <View style={[styles.statusBadge, styles.offlineBadge]}>
              <Text style={styles.statusText}>Offline</Text>
            </View>
          )}
          {pendingUploads > 0 && (
            <View style={[styles.statusBadge, styles.pendingBadge]}>
              <Text style={styles.statusText}>{pendingUploads} pending</Text>
            </View>
          )}
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'photos' && styles.activeTab]}
          onPress={() => setActiveTab('photos')}
        >
          <Text style={[styles.tabText, activeTab === 'photos' && styles.activeTabText]}>
            Photos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'participants' && styles.activeTab]}
          onPress={() => setActiveTab('participants')}
        >
          <Text style={[styles.tabText, activeTab === 'participants' && styles.activeTabText]}>
            Participants
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'photos' ? (
        renderPhotoContent()
      ) : (
        <ParticipantsList eventId={effectiveEventId || currentEvent?.id || ''} />
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
  statusContainer: { flexDirection: 'row', gap: 8 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  offlineBadge: {
    backgroundColor: '#FF3B30',
  },
  pendingBadge: {
    backgroundColor: '#FF9500',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
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
  likedIcon: { color: '#FF3B30' },
  actionText: { fontSize: 14, color: '#666' },
  deleteButton: { marginRight: 0 },
  deleteIcon: { fontSize: 18, marginRight: 5 },
  deleteText: { fontSize: 14, color: '#FF3B30', fontWeight: '600' },
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
    flexDirection: 'row',
  },
  footerLoaderText: { marginLeft: 10, fontSize: 14, color: '#666' },
  // Tab styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default PhotoFeedScreen;
