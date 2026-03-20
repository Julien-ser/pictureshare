import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  type DocumentData,
  type QuerySnapshot,
} from 'firebase/firestore';
import { db } from './firebase';
import type { User } from '../types';

/**
 * Interface for participant data with photo count
 */
export interface ParticipantWithStats {
  userId: string;
  displayName?: string;
  photoURL?: string;
  photoCount: number;
}

/**
 * Fetches all participants for an event with their photo upload counts
 * @param eventId - Event ID
 * @returns Array of participants with their stats
 */
export async function getParticipantsWithStats(eventId: string): Promise<ParticipantWithStats[]> {
  try {
    // Get the event document to get participants array
    const eventRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventRef);

    if (!eventDoc.exists) {
      return [];
    }

    const eventData = eventDoc.data() as DocumentData;
    const participantIds: string[] = eventData.participants || [];

    if (participantIds.length === 0) {
      return [];
    }

    // Fetch photo counts for each participant
    const participantsWithStats: ParticipantWithStats[] = await Promise.all(
      participantIds.map(async (userId) => {
        // Query photos where uploaderId == userId and eventId == current event
        const photosQuery = query(
          collection(db, 'photos'),
          where('eventId', '==', eventId),
          where('uploaderId', '==', userId)
        );

        const snapshot: QuerySnapshot<DocumentData> = await getDocs(photosQuery);
        const photoCount = snapshot.size;

        // Return basic participant info (we don't have profile data directly,
        // so we'll return minimal info; the caller can supplement if needed)
        return {
          userId,
          displayName: undefined, // Will be fetched separately if needed
          photoURL: undefined,
          photoCount,
        };
      })
    );

    // Sort by photo count descending, then by userId
    participantsWithStats.sort((a, b) => {
      if (b.photoCount !== a.photoCount) {
        return b.photoCount - a.photoCount;
      }
      return a.userId.localeCompare(b.userId);
    });

    return participantsWithStats;
  } catch (error) {
    console.error('Error fetching participants with stats:', error);
    return [];
  }
}

/**
 * Fetches basic profile info for a list of users
 * Note: In a production app, you'd have a separate 'users' collection
 * For now, we'll return placeholder data; displayName and photoURL may be empty
 * @param userIds - Array of user IDs
 * @returns Map of userId -> { displayName, photoURL }
 */
export async function getUserProfiles(
  userIds: string[]
): Promise<Map<string, { displayName?: string; photoURL?: string }>> {
  const profiles = new Map<string, { displayName?: string; photoURL?: string }>();

  // In a full implementation, you'd fetch from a 'users' collection
  // For now, return empty profiles; the displayName can be derived from userId
  userIds.forEach((userId) => {
    profiles.set(userId, {
      displayName: `User ${userId.substring(0, 6)}`,
      photoURL: undefined,
    });
  });

  return profiles;
}

/**
 * Combined function to get participants with enriched profile data
 */
export async function getEnrichedParticipants(
  eventId: string,
  currentUserId?: string
): Promise<(ParticipantWithStats & { isCurrentUser: boolean })[]> {
  const participants = await getParticipantsWithStats(eventId);

  // Enrich with profile data (in real app, this would be a separate fetch)
  const enriched: (ParticipantWithStats & { isCurrentUser: boolean })[] = participants.map((p) => ({
    ...p,
    displayName: p.displayName || `User ${p.userId.substring(0, 8)}`,
    photoURL: p.photoURL,
    isCurrentUser: currentUserId ? p.userId === currentUserId : false,
  }));

  return enriched;
}
