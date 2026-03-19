import { getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  type DocumentData,
} from 'firebase/firestore';
import { storage, db } from './firebase';
import type { Photo } from '../types';

const PHOTOS_COLLECTION = 'photos';

/**
 * Generates a unique photo ID
 */
export function generatePhotoId(): string {
  return `photo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Uploads an image file to Firebase Storage
 * @param eventId - Event ID
 * @param photoId - Unique photo identifier
 * @param imageUri - Local URI of the compressed image
 * @returns Storage path of the uploaded image
 */
export async function uploadPhotoToStorage(
  eventId: string,
  photoId: string,
  imageUri: string
): Promise<string> {
  try {
    // Create storage reference
    const storagePath = `events/${eventId}/photos/${photoId}.jpg`;
    const storageRef = ref(storage, storagePath);

    // Upload the file using uploadBytes (React Native compatible)
    const response = await fetch(imageUri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);

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
 * @returns The saved Photo object
 */
export async function uploadAndSavePhoto(
  eventId: string,
  uploaderId: string,
  imageResult: {
    uri: string;
    width: number;
    height: number;
  }
): Promise<Photo> {
  // Generate unique photo ID
  const photoId = generatePhotoId();

  // Upload image to Firebase Storage
  const storagePath = await uploadPhotoToStorage(eventId, photoId, imageResult.uri);

  // Create photo metadata
  const photo: Omit<Photo, 'id' | 'createdAt'> = {
    eventId,
    uploaderId,
    storagePath,
    width: imageResult.width,
    height: imageResult.height,
  };

  // Save metadata to Firestore
  await savePhotoMetadata(photo);

  // Return complete Photo object
  return {
    ...photo,
    id: photoId,
    createdAt: new Date(),
  };
}
