/**
 * Integration Tests using Firebase Emulators
 * Tests event join flow, photo upload, and real-time feed.
 *
 * PREREQUISITES:
 * - Firebase Emulators must be running on default ports:
 *   - Firestore: localhost:8080
 *   - Storage: localhost:9199
 *   - Auth: localhost:9099
 *
 * Run with: RUN_INTEGRATION_TESTS=true npm test
 */

const runIntegrationTests = process.env.RUN_INTEGRATION_TESTS === 'true';

if (!runIntegrationTests) {
  describe('Integration Tests (Firebase Emulators)', () => {
    it('skipped - set RUN_INTEGRATION_TESTS=true to run', () => {
      expect(true).toBe(true);
    });
  });
} else {
  const fs = require('fs');
  const path = require('path');
  const os = require('os');
  const { auth, db, storage, signInAnonymouslyLocally } = require('../src/services/firebase');
  const { signOut } = require('firebase/auth');
  const {
    createEvent,
    getEventByCode,
    joinEvent,
    uploadAndSavePhoto,
    subscribeToPhotos,
    generatePhotoId,
  } = require('../src/services');
  const { getDocs, collection, doc, deleteDoc } = require('firebase/firestore');
  const { ref, deleteObject } = require('firebase/storage');

  let testUser: any;

  beforeAll(async () => {
    testUser = await signInAnonymouslyLocally();
  });

  afterAll(async () => {
    await signOut(auth);
  });

  afterEach(async () => {
    // Delete all events
    const eventsSnapshot = await getDocs(collection(db, 'events'));
    const eventDeletePromises = eventsSnapshot.docs.map((ed: any) =>
      deleteDoc(doc(db, 'events', ed.id))
    );
    await Promise.all(eventDeletePromises);

    // Delete all photos and their storage objects
    const photosSnapshot = await getDocs(collection(db, 'photos'));
    const photoDeletePromises = photosSnapshot.docs.map(async (pd: any) => {
      const photoData = pd.data();
      const storagePath = photoData.storagePath;
      if (storagePath) {
        try {
          await deleteObject(ref(storage, storagePath));
        } catch (e) {
          // Ignore storage cleanup errors
        }
      }
      await deleteDoc(doc(db, 'photos', pd.id));
    });
    await Promise.all(photoDeletePromises);
  });

  describe('Event Join Flow', () => {
    it('should create event and allow participant to join', async () => {
      const event = await createEvent('Integration Test Event', testUser.id);
      expect(event).toHaveProperty('id');
      expect(event.code).toMatch(/^[A-Z]{3}\d{3}$/);
      expect(event.title).toBe('Integration Test Event');
      expect(event.createdBy).toBe(testUser.id);
      expect(event.participants).toContain(testUser.id);

      const retrieved = await getEventByCode(event.code);
      expect(retrieved).not.toBeNull();
      expect(retrieved!.id).toBe(event.id);
      expect(retrieved!.participants).toContain(testUser.id);

      await joinEvent(event.id, 'another-user-uid');

      const afterJoin = await getEventByCode(event.code);
      expect(afterJoin!.participants).toContain('another-user-uid');
      expect(afterJoin!.participants).toHaveLength(2);
    });

    it('should reject join with invalid event ID', async () => {
      await expect(joinEvent('nonexistent-event-id', testUser.id)).rejects.toThrow(
        'Event not found'
      );
    });
  });

  describe('Photo Upload', () => {
    it('should upload photo and save metadata', async () => {
      const event = await createEvent('Upload Test Event', testUser.id);
      const tempDir = os.tmpdir();
      const tempImagePath = path.join(tempDir, `test-${Date.now()}.jpg`);
      const jpegHeader = Buffer.from([
        0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x00, 0x00,
        0x01, 0x00, 0x01, 0x00, 0x00, 0xff, 0xd9,
      ]);
      fs.writeFileSync(tempImagePath, jpegHeader);

      try {
        const photo = await uploadAndSavePhoto(event.id, testUser.id, {
          uri: tempImagePath,
          width: 1,
          height: 1,
        });

        expect(photo).toHaveProperty('id');
        expect(photo.eventId).toBe(event.id);
        expect(photo.uploaderId).toBe(testUser.id);
        expect(photo.storagePath).toMatch(`events/${event.id}/photos/`);
        expect(photo.width).toBe(1);
        expect(photo.height).toBe(1);
        expect(photo.likeCount).toBe(0);

        const photoDoc = await doc(db, 'photos', photo.id).get();
        expect(photoDoc.exists).toBe(true);
        const data = photoDoc.data();
        expect(data.id).toBe(photo.id);
        expect(data.eventId).toBe(event.id);
        expect(data.uploaderId).toBe(testUser.id);
      } finally {
        if (fs.existsSync(tempImagePath)) {
          fs.unlinkSync(tempImagePath);
        }
      }
    });
  });

  describe('Real-Time Feed', () => {
    it('should subscribe to photos and receive new uploads in real-time', async () => {
      const event = await createEvent('Feed Test Event', testUser.id);

      const receivedPhotos: any[] = [];
      const mockCallback = jest.fn((photos: any[]) => {
        receivedPhotos.push(...photos);
      });

      const unsubscribe = subscribeToPhotos(event.id, mockCallback);

      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback.mock.calls[0][0]).toEqual([]);

      const tempDir = os.tmpdir();
      const tempImagePath = path.join(tempDir, `feed-${Date.now()}.jpg`);
      const jpegHeader = Buffer.from([
        0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x00, 0x00,
        0x01, 0x00, 0x01, 0x00, 0x00, 0xff, 0xd9,
      ]);
      fs.writeFileSync(tempImagePath, jpegHeader);

      try {
        const photo = await uploadAndSavePhoto(event.id, testUser.id, {
          uri: tempImagePath,
          width: 1,
          height: 1,
        });

        await new Promise((resolve) => setTimeout(resolve, 1500));

        expect(mockCallback).toHaveBeenCalledTimes(2);
        const lastPhotos = mockCallback.mock.calls[mockCallback.mock.calls.length - 1][0];
        expect(lastPhotos).toHaveLength(1);
        expect(lastPhotos[0].id).toBe(photo.id);
        expect(lastPhotos[0].eventId).toBe(event.id);
      } finally {
        unsubscribe();
        if (fs.existsSync(tempImagePath)) {
          fs.unlinkSync(tempImagePath);
        }
      }
    });
  });
}
