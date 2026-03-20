import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Event } from '../types';
import { generateEventCode } from '../utils/codeGenerator';

const EVENTS_COLLECTION = 'events';

/**
 * Checks if an event code already exists in Firestore
 */
export async function isCodeUnique(code: string): Promise<boolean> {
  const q = query(collection(db, EVENTS_COLLECTION), where('code', '==', code));
  const snapshot = await getDocs(q);
  return snapshot.empty;
}

/**
 * Creates a new event in Firestore
 */
export async function createEvent(
  title: string,
  createdBy: string,
  maxDurationHours?: number,
  isPublic: boolean = true
): Promise<Event> {
  // Generate unique event code
  const code = await generateEventCode(isCodeUnique);

  const eventRef = doc(collection(db, EVENTS_COLLECTION));

  const now = Timestamp.now();

  const event: Event = {
    id: eventRef.id,
    code,
    title,
    createdAt: now,
    createdBy,
    participants: [createdBy], // Creator is automatically a participant
    settings: {
      ...(maxDurationHours && { maxDuration: maxDurationHours * 60 * 60 * 1000 }), // Convert to ms
      isPublic,
    },
  };

  await setDoc(eventRef, event);

  return event;
}

/**
 * Retrieves an event by its code
 */
export async function getEventByCode(code: string): Promise<Event | null> {
  const q = query(collection(db, EVENTS_COLLECTION), where('code', '==', code));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  // There should be at most one event with a given code
  const docData = snapshot.docs[0].data();
  return {
    id: snapshot.docs[0].id,
    ...docData,
  } as Event;
}

/**
 * Adds a user as a participant to an event
 */
export async function joinEvent(eventId: string, userId: string): Promise<void> {
  const eventRef = doc(db, EVENTS_COLLECTION, eventId);
  // Use arrayUnion to add userId without duplicates
  // Note: In a real app, you'd use Firestore's arrayUnion but it's not available in the client SDK directly
  // For simplicity, we'll get the doc, update locally and save
  const eventDoc = await getDoc(eventRef);
  if (eventDoc.exists) {
    const event = eventDoc.data() as Event;
    if (!event.participants.includes(userId)) {
      event.participants.push(userId);
      await setDoc(eventRef, event);
    }
  }
}
