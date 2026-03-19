import { storage, db } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { Photo } from '../types';
import type { ImageResult } from '../utils/imagePicker';

/**
 * Upload a compressed photo to Firebase Storage and save metadata to Firestore
 * Storage path: /events/{eventId}/photos/{photoId}.jpg
 *
 * @param eventId - The event ID to upload to
 * @param image - Compressed image result with uri, width, height
 * @param uploaderId - User ID of the uploader
 * @param onProgress - Optional progress callback (0-100)
 * @returns Photo object with metadata
 */
export async function uploadPhoto(
  eventId: string,
  image: ImageResult,
  uploaderId: string,
  onProgress?: (progress: number) => void
): Promise<Photo> {
  if (!image.uri) {
    throw new Error('Invalid image: missing URI');
  }

  // Generate unique photo ID
  const photoId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  // Storage path structure: /events/{eventId}/photos/{photoId}.jpg
  const storagePath = `events/${eventId}/photos/${photoId}.jpg`;
  const storageRef = ref(storage, storagePath);

  // Read image file as blob for upload
  const response = await fetch(image.uri);
  const blob = await response.blob();

  // Upload with metadata
  const metadata = {
    contentType: 'image/jpeg',
    customMetadata: {
      eventId,
      uploaderId,
    },
  };

  // Upload the image with progress tracking
  const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

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
        throw error;
      }
    );
  }

  await uploadTask;

  // Get the download URL
  const downloadURL = await getDownloadURL(storageRef);

  // Save photo metadata to Firestore
  const photoData = {
    eventId,
    uploaderId,
    storagePath,
    thumbnailPath: downloadURL,
    createdAt: serverTimestamp(),
    width: image.width,
    height: image.height,
  };

  const docRef = await addDoc(collection(db, 'photos'), photoData);

  return {
    id: docRef.id,
    eventId,
    uploaderId,
    storagePath,
    thumbnailPath: downloadURL,
    createdAt: photoData.createdAt,
    width: image.width,
    height: image.height,
  };
}
