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
  query,
  orderBy,
  type Unsubscribe,
  type DocumentData,
  type QuerySnapshot,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Comment } from '../types';

export type { Comment };

const COMMENTS_SUBCOLLECTION = 'comments';

/**
 * Generates a unique comment document ID
 * Uses auto-generated ID to allow multiple comments from same user
 */
export function generateCommentId(): string {
  return doc(collection(db, 'photos', 'placeholder', COMMENTS_SUBCOLLECTION)).id;
}

/**
 * Adds a comment to a photo
 * Creates a comment document in the photo's comments subcollection and increments the photo's commentCount
 */
export async function addComment(photoId: string, userId: string, text: string): Promise<string> {
  const commentId = generateCommentId();
  const commentRef = doc(collection(db, 'photos', photoId, COMMENTS_SUBCOLLECTION), commentId);

  await setDoc(commentRef, {
    id: commentId,
    photoId,
    userId,
    text,
    createdAt: serverTimestamp(),
  });

  // Increment comment count in photo document using transaction for atomicity
  const photoRef = doc(db, 'photos', photoId);
  await runTransaction(db, async (transaction) => {
    const photoDoc = await transaction.get(photoRef);
    if (!photoDoc.exists) {
      throw new Error('Photo not found');
    }
    transaction.update(photoRef, {
      commentCount: increment(1),
    });
  });

  return commentId;
}

/**
 * Deletes a comment
 * Only the comment owner or photo owner can delete
 * Deletes the comment document and decrements the photo's commentCount
 */
export async function deleteComment(
  photoId: string,
  commentId: string,
  userId: string
): Promise<void> {
  const commentRef = doc(collection(db, 'photos', photoId, COMMENTS_SUBCOLLECTION), commentId);

  // Check if comment exists and user has permission
  const commentDoc = await getDoc(commentRef);
  if (!commentDoc.exists) {
    throw new Error('Comment not found');
  }

  const commentData = commentDoc.data() as DocumentData;
  if (commentData.userId !== userId) {
    throw new Error('You can only delete your own comments');
  }

  await deleteDoc(commentRef);

  // Decrement comment count in photo document using transaction for atomicity
  const photoRef = doc(db, 'photos', photoId);
  await runTransaction(db, async (transaction) => {
    const photoDoc = await transaction.get(photoRef);
    if (!photoDoc.exists) {
      throw new Error('Photo not found');
    }
    const currentCount = photoDoc.data().commentCount || 0;
    const newCount = Math.max(0, currentCount - 1); // Prevent negative
    transaction.update(photoRef, {
      commentCount: newCount,
    });
  });
}

/**
 * Gets the current comment count for a photo
 */
export async function getCommentCount(photoId: string): Promise<number> {
  const photoRef = doc(db, 'photos', photoId);
  const photoDoc = await getDoc(photoRef);

  if (!photoDoc.exists) {
    return 0;
  }

  const data = photoDoc.data();
  return data.commentCount || 0;
}

/**
 * Subscribes to comment count changes for a photo in real-time
 * @returns Unsubscribe function
 */
export function subscribeToCommentCount(
  photoId: string,
  onCommentCountUpdate: (count: number) => void
): Unsubscribe {
  const photoRef = doc(db, 'photos', photoId);

  return onSnapshot(
    photoRef,
    (doc) => {
      if (doc.exists) {
        const data = doc.data() as DocumentData;
        const commentCount = data.commentCount || 0;
        onCommentCountUpdate(commentCount);
      } else {
        onCommentCountUpdate(0);
      }
    },
    (error) => {
      console.error('Error in comment count subscription:', error);
      onCommentCountUpdate(0);
    }
  );
}

/**
 * Subscribes to all comments for a photo in real-time
 * Comments are ordered by creation time (oldest first)
 * @returns Unsubscribe function
 */
export function subscribeToComments(
  photoId: string,
  onCommentsUpdate: (comments: Comment[]) => void
): Unsubscribe {
  const commentsRef = collection(db, 'photos', photoId, COMMENTS_SUBCOLLECTION);
  const q = query(commentsRef, orderBy('createdAt', 'asc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const comments: Comment[] = snapshot.docs.map((doc) => {
        const data = doc.data() as DocumentData;
        return {
          id: doc.id,
          photoId,
          userId: data.userId,
          text: data.text,
          createdAt: data.createdAt,
        };
      });
      onCommentsUpdate(comments);
    },
    (error) => {
      console.error('Error in comments subscription:', error);
      onCommentsUpdate([]);
    }
  );
}
