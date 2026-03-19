import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { useEvent } from './EventContext';
import { subscribeToPhotos } from '../services/photoService';
import type { Photo } from '../types';

interface PhotoContextType {
  photos: Photo[];
  pendingPhotos: Photo[];
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

  // Subscribe to real-time photo updates from Firestore for current event
  useEffect(() => {
    if (!eventId) {
      setPhotos([]);
      return;
    }

    const unsubscribe = subscribeToPhotos(eventId, (photosData: Photo[]) => {
      setPhotos(photosData);

      // Remove any pending photos that have been confirmed in Firestore
      setPendingPhotos((prev) => {
        const next = new Map(prev);
        photosData.forEach((photo) => {
          if (next.has(photo.id)) {
            next.delete(photo.id);
          }
        });
        return next;
      });
    });

    return () => unsubscribe();
  }, [eventId]);

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

  return (
    <PhotoContext.Provider
      value={{
        photos,
        pendingPhotos: Array.from(pendingPhotos.values()),
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
