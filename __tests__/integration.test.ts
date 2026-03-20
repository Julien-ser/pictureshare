/**
 * Integration tests using Firebase Emulators
 * Tests: event join flow, photo upload, real-time feed
 *
 * These tests require Firebase Emulators to be running.
 * Set RUN_INTEGRATION_TESTS=true to enable, otherwise they're skipped.
 */

// Conditionally skip integration tests unless explicitly enabled
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
  const {
    initializeTestEnvironment,
    assertSucceeds,
    assertFails,
  } = require('@firebase/rules-unit-testing');
  const { getAuth, signInAnonymously, signOut } = require('firebase/auth');
  const {
    getFirestore,
    collection,
    doc,
    getDocs,
    query,
    where,
    setDoc,
    Timestamp,
  } = require('firebase/firestore');
  const { getStorage, ref, deleteObject } = require('firebase/storage');
  const { initializeApp, deleteApp } = require('firebase/app');

  // Import app services (these will use the initialized Firebase app)
  const {
    createEvent,
    getEventByCode,
    joinEvent,
    uploadAndSavePhoto,
    subscribeToPhotos,
    generatePhotoId,
  } = require('../src/services');

  let testEnv: any;
  let testApp: any;
  let auth: any;
  let db: any;
  let storage: any;
  let testUser: any;

  beforeAll(async () => {
    // Initialize Firebase emulator environment
    testEnv = await initializeTestEnvironment({
      projectId: 'pictureshare-test',
      firestore: {
        rules: `
          rules_version = '2';
          service cloud.firestore {
            match /databases/{database}/documents {
              match /events/{event} {
                allow read: if true;
                allow create: if request.auth != null;
                allow update: if request.auth != null && request.auth.uid == resource.data.createdBy;
                allow delete: if request.auth != null && request.auth.uid == resource.data.createdBy;
              }
              match /events/{event}/photos/{photo} {
                allow read: if true;
                allow create: if request.auth != null;
                allow delete: if request.auth != null && request.auth.uid == resource.data.uploaderId;
              }
              match /users/{user} {
                allow read: if true;
                allow create: if request.auth != null && request.auth.uid == user;
                allow update: if request.auth != null && request.auth.uid == user;
              }
            }
          }
        `,
      },
      auth: {
        projectId: 'pictureshare-test',
      },
      storage: {
        bucket: 'pictureshare-test.appspot.com',
        rules: `
          service firebase.storage {
            match /b/{bucket}/o {
              match /events/{eventId}/photos/{photoId} {
                allow read: if true;
                allow create: if request.auth != null;
                allow delete: if request.auth != null && request.auth.uid == request.resource.name; // simplified
              }
            }
          }
        `,
      },
    });

    testApp = testEnv.authenticatedContext('test-user-1');
    auth = getAuth(testApp);
    db = getFirestore(testApp);
    storage = getStorage(testApp);

    // Sign in anonymously
    const userCred = await signInAnonymously(auth);
    testUser = userCred.user;
  });

  afterAll(async () => {
    await signOut(auth);
    await deleteApp(testApp);
    await testEnv.cleanup();
  });

  afterEach(async () => {
    // Clean up any created data
    const eventsSnapshot = await getDocs(collection(db, 'events'));
    const deletePromises = eventsSnapshot.docs.map((docSnap: any) =>
      doc(db, 'events', docSnap.id).delete()
    );
    await Promise.all(deletePromises);

    // Cleanup storage
    try {
      const photosRef = ref(storage, 'events/');
      // Note: deleteObject only deletes a single file; for directories we'd need to list and delete each.
      // For simplicity, we skip storage cleanup or rely on emulator reset.
    } catch (e) {
      // ignore cleanup errors
    }
  });

  describe('Event Join Flow', () => {
    it('should create event and allow participant to join', async () => {
      // Create event as authenticated user
      const event = await createEvent('Integration Test Event', testUser.uid);

      expect(event).toHaveProperty('id');
      expect(event.code).toMatch(/^[A-Z]{3}\d{3}$/);
      expect(event.title).toBe('Integration Test Event');
      expect(event.createdBy).toBe(testUser.uid);
      expect(event.participants).toContain(testUser.uid);

      // Event should be stored in Firestore
      const retrieved = await getEventByCode(event.code);
      expect(retrieved).not.toBeNull();
      expect(retrieved!.id).toBe(event.id);
      expect(retrieved!.participants).toContain(testUser.uid);

      // Another user joins the event
      const anotherUserId = 'another-user-uid';
      await joinEvent(event.code, anotherUserId);

      const afterJoin = await getEventByCode(event.code);
      expect(afterJoin!.participants).toContain(anotherUserId);
      expect(afterJoin!.participants).toHaveLength(2);
    });

    it('should reject join with invalid code', async () => {
      await expect(joinEvent('INVALIDCODE', testUser.uid)).rejects.toThrow('Event not found');
    });
  });

  describe('Photo Upload', () => {
    it('should upload photo and save metadata', async () => {
      const event = await createEvent('Upload Test Event', testUser.uid);

      // Create a temporary image file
      const tempDir = os.tmpdir();
      const tempImagePath = path.join(tempDir, `test-${Date.now()}.jpg`);
      // Minimal JPEG data (1x1 pixel)
      const jpegHeader = Buffer.from([
        0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x00, 0x00,
        0x01, 0x00, 0x01, 0x00, 0x00, 0xff, 0xd9,
      ]);
      fs.writeFileSync(tempImagePath, jpegHeader);

      try {
        const photo = await uploadAndSavePhoto(event.id, testUser.uid, {
          uri: tempImagePath,
          width: 1,
          height: 1,
        });

        expect(photo).toHaveProperty('id');
        expect(photo.eventId).toBe(event.id);
        expect(photo.uploaderId).toBe(testUser.uid);
        expect(photo.storagePath).toMatch(`events/${event.id}/photos/`);
        expect(photo.width).toBe(1);
        expect(photo.height).toBe(1);
        expect(photo.likeCount).toBe(0);

        // Verify metadata stored in Firestore
        const photoDoc = await doc(db, 'events', event.id, 'photos', photo.id).get();
        expect(photoDoc.exists).toBe(true);
        const data = photoDoc.data();
        expect(data.id).toBe(photo.id);
        expect(data.eventId).toBe(event.id);
        expect(data.uploaderId).toBe(testUser.uid);
      } finally {
        // Clean up temp file
        if (fs.existsSync(tempImagePath)) {
          fs.unlinkSync(tempImagePath);
        }
      }
    });
  });

  describe('Real-Time Feed', () => {
    it('should subscribe to photos and receive new uploads in real-time', async () => {
      const event = await createEvent('Feed Test Event', testUser.uid);

      const receivedPhotos: any[] = [];
      const mockCallback = jest.fn((photos: any[]) => {
        receivedPhotos.push(...photos);
      });

      // Subscribe to photos for the event
      const { unsubscribe } = await subscribeToPhotos(event.id, mockCallback);

      // Initially, no photos
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback.mock.calls[0][0]).toEqual([]);

      // Upload a photo
      const tempDir = os.tmpdir();
      const tempImagePath = path.join(tempDir, `feed-${Date.now()}.jpg`);
      const jpegHeader = Buffer.from([
        0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x00, 0x00,
        0x01, 0x00, 0x01, 0x00, 0x00, 0xff, 0xd9,
      ]);
      fs.writeFileSync(tempImagePath, jpegHeader);

      try {
        const photo = await uploadAndSavePhoto(event.id, testUser.uid, {
          uri: tempImagePath,
          width: 1,
          height: 1,
        });

        // Wait for Firestore real-time update to propagate
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Callback should have been called at least once more with the new photo
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
