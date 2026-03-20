import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  getDoc,
  increment,
  runTransaction,
  type Unsubscribe,
  type DocumentData,
  type DocumentSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';

const LIKES_SUBCOLLECTION = 'likes';

/**
 * Generates a unique like document ID (using userId as ID for uniqueness)
 */
export function generateLikeId(userId: string): string {
  return userId;
}

/**
 * Likes a photo
 * Creates a like document in the photo's likes subcollection and increments the photo's likeCount
 */
export async function likePhoto(photoId: string, userId: string): Promise<void> {
  const likeRef = doc(collection(db, 'photos', photoId, LIKES_SUBCOLLECTION));

  await setDoc(likeRef, {
    userId,
    createdAt: serverTimestamp(),
  });

  // Increment like count in photo document using transaction for atomicity
  const photoRef = doc(db, 'photos', photoId);
  await runTransaction(db, async (transaction) => {
    const photoDoc = await transaction.get(photoRef);
    if (!photoDoc.exists) {
      throw new Error('Photo not found');
    }
    transaction.update(photoRef, {
      likeCount: increment(1),
    });
  });
}

/**
 * Unlikes a photo
 * Deletes the like document and decrements the photo's likeCount
 */
export async function unlikePhoto(photoId: string, userId: string): Promise<void> {
  const likeRef = doc(collection(db, 'photos', photoId, LIKES_SUBCOLLECTION), userId);

  // Check if like exists before deleting
  const likeDoc = await getDoc(likeRef);
  if (!likeDoc.exists) {
    return; // Already unliked
  }

  await deleteDoc(likeRef);

  // Decrement like count in photo document using transaction for atomicity
  const photoRef = doc(db, 'photos', photoId);
  await runTransaction(db, async (transaction) => {
    const photoDoc = await transaction.get(photoRef);
    if (!photoDoc.exists) {
      throw new Error('Photo not found');
    }
    const data = photoDoc.data() as DocumentData;
    const currentCount = data.likeCount || 0;
    const newCount = Math.max(0, currentCount - 1); // Prevent negative
    transaction.update(photoRef, {
      likeCount: newCount,
    });
  });
}

/**
 * Toggles like status for a photo
 * If user hasn't liked, creates like; if already liked, removes like
 */
export async function toggleLike(photoId: string, userId: string): Promise<boolean> {
  const hasLiked = await hasUserLiked(photoId, userId);

  if (hasLiked) {
    await unlikePhoto(photoId, userId);
    return false;
  } else {
    await likePhoto(photoId, userId);
    return true;
  }
}

/**
 * Gets the current like count for a photo
 */
export async function getLikeCount(photoId: string): Promise<number> {
  const photoRef = doc(db, 'photos', photoId);
  const photoDoc = await getDoc(photoRef);

  if (!photoDoc.exists) {
    return 0;
  }

  const data = photoDoc.data() as DocumentData;
  return data.likeCount ?? 0;
}

/**
 * Checks if a user has liked a photo
 */
export async function hasUserLiked(photoId: string, userId: string): Promise<boolean> {
  const likeRef = doc(collection(db, 'photos', photoId, LIKES_SUBCOLLECTION), userId);
  const likeDoc: DocumentSnapshot<DocumentData> = await getDoc(likeRef);
  return likeDoc.exists;
}

/**
 * Subscribes to like count changes for a photo in real-time
 * @returns Unsubscribe function
 */
export function subscribeToLikeCount(
  photoId: string,
  onLikeCountUpdate: (count: number) => void
): Unsubscribe {
  const photoRef = doc(db, 'photos', photoId);

  return onSnapshot(
    photoRef,
    (snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data() as DocumentData;
        const likeCount = data.likeCount || 0;
        onLikeCountUpdate(likeCount);
      } else {
        onLikeCountUpdate(0);
      }
    },
    (error) => {
      console.error('Error in like count subscription:', error);
      onLikeCountUpdate(0);
    }
  );
}

/**
 * Subscribes to likes for a photo to detect if current user has liked
 * @returns Unsubscribe function
 */
export function subscribeToUserLike(
  photoId: string,
  userId: string,
  onUserLikedUpdate: (hasLiked: boolean) => void
): Unsubscribe {
  const likeRef = doc(collection(db, 'photos', photoId, LIKES_SUBCOLLECTION), userId);

  return onSnapshot(
    likeRef,
    (doc) => {
      onUserLikedUpdate(doc.exists);
    },
    (error) => {
      console.error('Error in user like subscription:', error);
      onUserLikedUpdate(false);
    }
  );
}
