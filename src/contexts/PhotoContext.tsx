import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { useEvent } from './EventContext';
import { loadInitialPhotos, loadPhotosBatch } from '../services/photoService';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  type Query,
  type QueryDocumentSnapshot,
  type DocumentData,
} from 'firebase/firestore';
import type { Photo } from '../types';

interface PhotoContextType {
  photos: Photo[];
  pendingPhotos: Photo[];
  hasMore: boolean;
  loadingMore: boolean;
  initialLoading: boolean;
  error: string | null;
  loadMorePhotos: () => Promise<void>;
  addPendingPhoto: (photo: Photo) => void;
  removePendingPhoto: (photoId: string) => void;
  getCombinedPhotos: () => Photo[];
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

interface PhotoProviderProps {
  children: ReactNode;
}

export function PhotoProvider({ children }: PhotoProviderProps) {
  const { currentEvent } = useEvent();
  const eventId = currentEvent?.id;
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [pendingPhotos, setPendingPhotos] = useState<Map<string, Photo>>(new Map());
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Load initial batch of photos when event changes
  useEffect(() => {
    if (!eventId) {
      setPhotos([]);
      setHasMore(true);
      setLastDoc(null);
      setError(null);
      setInitialLoading(false);
      return;
    }

    let mounted = true;

    const loadInitial = async () => {
      try {
        setInitialLoading(true);
        setError(null);
        const { photos: initialPhotos, lastDoc: newLastDoc } = await loadInitialPhotos(eventId, 20);

        if (mounted) {
          setPhotos(initialPhotos);
          setLastDoc(newLastDoc);
          setHasMore(newLastDoc !== null); // If we got a lastDoc, there might be more
          setInitialLoading(false);
        }
      } catch (err) {
        console.error('Error loading initial photos:', err);
        if (mounted) {
          setError('Failed to load photos');
          setPhotos([]);
          setHasMore(false);
          setInitialLoading(false);
        }
      }
    };

    loadInitial();

    return () => {
      mounted = false;
    };
  }, [eventId]);

  // Load more photos (called by FlatList onEndReached)
  const loadMorePhotos = useCallback(async () => {
    if (!eventId || loadingMore || !hasMore || !lastDoc) {
      return;
    }

    try {
      setLoadingMore(true);
      setError(null);

      const { photos: newPhotos, lastDoc: newLastDoc } = await loadPhotosBatch(
        eventId,
        20,
        lastDoc
      );

      setPhotos((prev) => [...prev, ...newPhotos]);
      setLastDoc(newLastDoc);
      setHasMore(newLastDoc !== null); // If no lastDoc returned, we've loaded all
    } catch (err) {
      console.error('Error loading more photos:', err);
      setError('Failed to load more photos');
    } finally {
      setLoadingMore(false);
    }
  }, [eventId, loadingMore, hasMore, lastDoc]);

  const addPendingPhoto = useCallback((photo: Photo) => {
    setPendingPhotos((prev) => {
      const next = new Map(prev);
      next.set(photo.id, photo);
      return next;
    });
  }, []);

  const removePendingPhoto = useCallback((photoId: string) => {
    setPendingPhotos((prev) => {
      const next = new Map(prev);
      next.delete(photoId);
      return next;
    });
  }, []);

  // Get combined photos: pending first (they're newer), then confirmed photos
  const getCombinedPhotos = useCallback(() => {
    const pendingArray = Array.from(pendingPhotos.values());
    // Combine pending and confirmed photos, sort by createdAt descending (newest first)
    const combined = [...pendingArray, ...photos];
    combined.sort((a, b) => {
      const dateA =
        a.createdAt instanceof Date ? a.createdAt.getTime() : new Date(a.createdAt).getTime();
      const dateB =
        b.createdAt instanceof Date ? b.createdAt.getTime() : new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
    return combined;
  }, [pendingPhotos, photos]);

  // Clean up pending photos that have been confirmed (uploaded successfully)
  useEffect(() => {
    if (photos.length === 0) return;
    const confirmedIds = new Set(photos.map((p) => p.id));
    setPendingPhotos((prev) => {
      const next = new Map(prev);
      let changed = false;
      for (const [id] of next) {
        if (confirmedIds.has(id)) {
          next.delete(id);
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [photos]);

  return (
    <PhotoContext.Provider
      value={{
        photos,
        pendingPhotos: Array.from(pendingPhotos.values()),
        hasMore,
        loadingMore,
        initialLoading,
        error,
        loadMorePhotos,
        addPendingPhoto,
        removePendingPhoto,
        getCombinedPhotos,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhotos() {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotos must be used within a PhotoProvider');
  }
  return context;
}
