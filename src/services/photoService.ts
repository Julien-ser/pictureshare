import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  Query,
  QueryDocumentSnapshot,
  limit,
  startAfter,
  type DocumentData,
  type QuerySnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { storage, db } from './firebase';
import type { Photo, Event } from '../types';

const PHOTOS_COLLECTION = 'photos';

/**
 * Generates a unique photo ID
 */
export function generatePhotoId(): string {
  return `photo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Uploads an image file to Firebase Storage with progress tracking
 * @param eventId - Event ID
 * @param photoId - Unique photo identifier
 * @param imageUri - Local URI of the compressed image
 * @param onProgress - Optional progress callback (0-100)
 * @returns Storage path of the uploaded image
 */
export async function uploadPhotoToStorage(
  eventId: string,
  photoId: string,
  imageUri: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  try {
    // Create storage reference
    const storagePath = `events/${eventId}/photos/${photoId}.jpg`;
    const storageRef = ref(storage, storagePath);

    // Read image file
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Use resumable upload for progress tracking
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // Monitor progress
    if (onProgress) {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          onProgress(progress);
        },
        (error) => {
          console.error('Upload error:', error);
        }
      );
    }

    // Wait for completion
    await uploadTask;

    return storagePath;
  } catch (error) {
    console.error('Error uploading photo to storage:', error);
    throw error;
  }
}

/**
 * Saves photo metadata to Firestore
 * @param photo - Photo metadata object
 */
export async function savePhotoMetadata(
  photo: Omit<Photo, 'id' | 'createdAt'> & {
    createdAt?: DocumentData;
  }
): Promise<void> {
  try {
    const photoRef = doc(collection(db, PHOTOS_COLLECTION));

    const photoData = {
      ...photo,
      createdAt: serverTimestamp(),
    };

    await setDoc(photoRef, photoData);
  } catch (error) {
    console.error('Error saving photo metadata:', error);
    throw error;
  }
}

/**
 * Deletes a photo from Storage and Firestore
 * @param eventId - Event ID
 * @param photoId - Photo ID
 * @param storagePath - Full storage path (optional, will construct if not provided)
 */
export async function deletePhoto(
  eventId: string,
  photoId: string,
  storagePath?: string
): Promise<void> {
  try {
    // Delete from Storage
    const path = storagePath || `events/${eventId}/photos/${photoId}.jpg`;
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting photo from storage:', error);
    // Continue to delete metadata even if storage deletion fails
  }

  try {
    // Delete from Firestore
    await deleteDoc(doc(db, PHOTOS_COLLECTION, photoId));
  } catch (error) {
    console.error('Error deleting photo metadata:', error);
    throw error;
  }
}

/**
 * Complete upload workflow: upload image and save metadata
 * @param eventId - Event ID to upload to
 * @param uploaderId - User ID of the uploader
 * @param imageResult - Compressed image result from image picker
 * @param photoId - Optional pre-generated photo ID for optimistic UI
 * @param onProgress - Optional progress callback (0-100)
 * @returns The saved Photo object
 */
export async function uploadAndSavePhoto(
  eventId: string,
  uploaderId: string,
  imageResult: {
    uri: string;
    width: number;
    height: number;
  },
  photoId?: string,
  onProgress?: (progress: number) => void
): Promise<Photo> {
  // Use provided photoId or generate a new one
  const id = photoId || generatePhotoId();

  // Upload image to Firebase Storage with progress
  const storagePath = await uploadPhotoToStorage(eventId, id, imageResult.uri, onProgress);

  // Create photo metadata
  const photo: Omit<Photo, 'id' | 'createdAt'> = {
    eventId,
    uploaderId,
    storagePath,
    width: imageResult.width,
    height: imageResult.height,
    likeCount: 0, // Initialize like count
  };

  // Save metadata to Firestore
  await savePhotoMetadata(photo);

  // Return complete Photo object
  return {
    ...photo,
    id,
    createdAt: new Date(),
  };
}

/**
 * Subscribes to real-time updates for photos in a specific event
 * @param eventId - Event ID to filter photos
 * @param onPhotosUpdate - Callback function receiving array of Photo objects
 * @returns Unsubscribe function to stop listening
 */
export function subscribeToPhotos(
  eventId: string,
  onPhotosUpdate: (photos: Photo[]) => void
): Unsubscribe {
  // Create query: photos where eventId == current, ordered by createdAt descending
  const photosQuery = query(
    collection(db, PHOTOS_COLLECTION),
    where('eventId', '==', eventId),
    orderBy('createdAt', 'desc')
  );

  // Set up real-time listener
  const unsubscribe = onSnapshot(
    photosQuery,
    (snapshot: QuerySnapshot<DocumentData>) => {
      const photos: Photo[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          eventId: data.eventId,
          uploaderId: data.uploaderId,
          storagePath: data.storagePath,
          thumbnailPath: data.thumbnailPath,
          createdAt: data.createdAt?.toDate() || new Date(),
          width: data.width,
          height: data.height,
          likeCount: data.likeCount || 0,
          commentCount: data.commentCount || 0,
        } as Photo;
      });
      onPhotosUpdate(photos);
    },
    (error) => {
      console.error('Error in photos subscription:', error);
      onPhotosUpdate([]);
    }
  );

  return unsubscribe;
}

/**
 * Loads a batch of photos for an event with pagination support
 * @param eventId - Event ID to filter photos
 * @param batchSize - Number of photos to fetch (default 20)
 * @param lastPhoto - Optional last photo document from previous batch to use as cursor
 * @returns Array of Photo objects and the last document snapshot for next pagination
 */
export async function loadPhotosBatch(
  eventId: string,
  batchSize: number = 20,
  lastPhoto?: QueryDocumentSnapshot<DocumentData>
): Promise<{ photos: Photo[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null }> {
  try {
    // Build query with optional cursor
    let photosQuery: Query<DocumentData> = query(
      collection(db, PHOTOS_COLLECTION),
      where('eventId', '==', eventId),
      orderBy('createdAt', 'desc'),
      limit(batchSize)
    );

    // Add cursor if we have a last photo
    if (lastPhoto) {
      photosQuery = query(photosQuery, startAfter(lastPhoto));
    }

    // Execute query
    const snapshot = await getDocs(photosQuery);
    const photos: Photo[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        eventId: data.eventId,
        uploaderId: data.uploaderId,
        storagePath: data.storagePath,
        thumbnailPath: data.thumbnailPath,
        createdAt: data.createdAt?.toDate() || new Date(),
        width: data.width,
        height: data.height,
        likeCount: data.likeCount || 0,
        commentCount: data.commentCount || 0,
      } as Photo;
    });

    // Get the last document for next pagination
    const lastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    return { photos, lastDoc };
  } catch (error) {
    console.error('Error loading photos batch:', error);
    throw error;
  }
}

/**
 * Loads the initial batch of photos (convenience function)
 */
export async function loadInitialPhotos(
  eventId: string,
  batchSize: number = 20
): Promise<{ photos: Photo[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null }> {
  return loadPhotosBatch(eventId, batchSize);
}

/**
 * Checks if a user can delete a photo
 * User can delete if they are the uploader OR the event creator
 */
export async function canDeletePhoto(
  photoId: string,
  userId: string,
  eventId: string
): Promise<boolean> {
  try {
    // Get the photo document
    const photoRef = doc(db, PHOTOS_COLLECTION, photoId);
    const photoDoc = await getDoc(photoRef);

    if (!photoDoc.exists()) {
      return false;
    }

    const photoData = photoDoc.data();

    // Check if user is the uploader
    if (photoData.uploaderId === userId) {
      return true;
    }

    // Get the event to check if user is the creator
    const eventRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventRef);

    if (eventDoc.exists()) {
      const eventData = eventDoc.data() as Event;
      if (eventData.createdBy === userId) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking delete permission:', error);
    return false;
  }
}

/**
 * Deletes a photo with permission verification
 */
export async function deletePhotoWithPermission(
  photoId: string,
  eventId: string,
  userId: string
): Promise<void> {
  // Check permission first
  const canDelete = await canDeletePhoto(photoId, userId, eventId);

  if (!canDelete) {
    throw new Error('Unauthorized: You do not have permission to delete this photo');
  }

  // Get photo data to retrieve storage path
  const photoRef = doc(db, PHOTOS_COLLECTION, photoId);
  const photoDoc = await getDoc(photoRef);

  if (!photoDoc.exists()) {
    throw new Error('Photo not found');
  }

  const photoData = photoDoc.data() as Photo;
  const storagePath = photoData.storagePath;

  // Use existing deletePhoto function
  await deletePhoto(eventId, photoId, storagePath);
}
