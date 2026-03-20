import {
  generatePhotoId,
  uploadPhotoToStorage,
  savePhotoMetadata,
  deletePhoto,
  uploadAndSavePhoto,
  subscribeToPhotos,
  loadPhotosBatch,
  canDeletePhoto,
  deletePhotoWithPermission,
} from '../src/services/photoService';
import { db, storage } from '../src/services/firebase';
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
  startAfter,
  limit,
  type Query,
  type QueryDocumentSnapshot,
  type Unsubscribe,
  type DocumentData,
  type QuerySnapshot,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, deleteObject } from 'firebase/storage';

// Mock Firebase modules
jest.mock('../src/services/firebase', () => ({
  db: {},
  storage: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  deleteDoc: jest.fn(),
  serverTimestamp: jest.fn(() => ({ toDate: () => new Date() })),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: jest.fn(),
  getDocs: jest.fn(),
  startAfter: jest.fn(),
  limit: jest.fn(),
  Query: class Query {},
  QueryDocumentSnapshot: class QueryDocumentSnapshot {},
  Unsubscribe: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  ref: jest.fn(),
  uploadBytesResumable: jest.fn(),
  deleteObject: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    blob: () => Promise.resolve(new Blob(['test'], { type: 'image/jpeg' })),
  })
) as any;

describe.skip('photoService', () => {
  const mockEventId = 'test-event';
  const mockUserId = 'test-user';
  const mockPhotoId = 'photo_123';
  const mockImageUri = 'file://test.jpg';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generatePhotoId', () => {
    it('should generate a unique photo ID with correct format', () => {
      const id1 = generatePhotoId();
      const id2 = generatePhotoId();

      expect(id1).toMatch(/^photo_\d+_[a-z0-9]+$/);
      expect(id2).toMatch(/^photo_\d+_[a-z0-9]+$/);
      expect(id1).not.toBe(id2);
    });
  });

  describe('uploadPhotoToStorage', () => {
    it('should upload image to storage with correct path', async () => {
      const mockStorageRef = { path: '' };
      const mockUploadTask = {
        on: jest.fn(),
        then: jest.fn().mockResolvedValue(undefined),
      };

      (ref as jest.Mock).mockReturnValue(mockStorageRef);
      (uploadBytesResumable as jest.Mock).mockReturnValue(mockUploadTask);

      const result = await uploadPhotoToStorage(mockEventId, mockPhotoId, mockImageUri);

      expect(ref).toHaveBeenCalledWith(storage, `events/${mockEventId}/photos/${mockPhotoId}.jpg`);
      expect(result).toBe(`events/${mockEventId}/photos/${mockPhotoId}.jpg`);
    });

    it('should call progress callback during upload', async () => {
      const mockStorageRef = { path: '' };
      const mockUploadTask = {
        on: jest.fn((event, callback) => {
          if (event === 'state_changed') {
            callback({ bytesTransferred: 50, totalBytes: 100 });
          }
        }),
        then: jest.fn().mockResolvedValue(undefined),
      };

      (ref as jest.Mock).mockReturnValue(mockStorageRef);
      (uploadBytesResumable as jest.Mock).mockReturnValue(mockUploadTask);

      const onProgress = jest.fn();
      await uploadPhotoToStorage(mockEventId, mockPhotoId, mockImageUri, onProgress);

      expect(onProgress).toHaveBeenCalledWith(50);
    });

    it('should handle upload errors', async () => {
      const mockStorageRef = { path: '' };
      const mockUploadTask = {
        on: jest.fn(),
        then: jest.fn().mockRejectedValue(new Error('Upload failed')),
      };

      (ref as jest.Mock).mockReturnValue(mockStorageRef);
      (uploadBytesResumable as jest.Mock).mockReturnValue(mockUploadTask);

      await expect(uploadPhotoToStorage(mockEventId, mockPhotoId, mockImageUri)).rejects.toThrow(
        'Upload failed'
      );
    });
  });

  describe('savePhotoMetadata', () => {
    it('should save photo document with correct data', async () => {
      const mockPhotoRef = { path: '' };
      const mockPhoto = {
        eventId: mockEventId,
        uploaderId: mockUserId,
        storagePath: 'test-path',
        width: 1000,
        height: 800,
        likeCount: 0,
      };

      (collection as jest.Mock).mockReturnValue({});
      (doc as jest.Mock).mockReturnValue(mockPhotoRef);

      await savePhotoMetadata(mockPhoto);

      expect(setDoc).toHaveBeenCalledWith(mockPhotoRef, {
        ...mockPhoto,
        createdAt: expect.any(Object),
      });
    });
  });

  describe('deletePhoto', () => {
    it('should delete from storage and firestore', async () => {
      (ref as jest.Mock).mockReturnValue({});
      (deleteObject as jest.Mock).mockResolvedValue(undefined);
      (doc as jest.Mock).mockReturnValue({});

      await deletePhoto(mockEventId, mockPhotoId);

      expect(deleteObject).toHaveBeenCalledWith(expect.anything());
      expect(deleteDoc).toHaveBeenCalledWith(expect.anything(), mockPhotoId);
    });

    it('should use provided storage path if given', async () => {
      const customPath = 'custom/path.jpg';
      (ref as jest.Mock).mockReturnValue({});
      (deleteObject as jest.Mock).mockResolvedValue(undefined);
      (doc as jest.Mock).mockReturnValue({});

      await deletePhoto(mockEventId, mockPhotoId, customPath);

      expect(ref).toHaveBeenCalledWith(storage, customPath);
    });

    it('should continue to delete metadata even if storage deletion fails', async () => {
      (ref as jest.Mock).mockReturnValue({});
      (deleteObject as jest.Mock).mockRejectedValue(new Error('Storage error'));
      (doc as jest.Mock).mockReturnValue({});
      (deleteDoc as jest.Mock).mockResolvedValue(undefined);

      await deletePhoto(mockEventId, mockPhotoId);

      expect(deleteDoc).toHaveBeenCalled();
    });
  });

  describe('uploadAndSavePhoto', () => {
    it('should upload photo and save metadata', async () => {
      const imageResult = {
        uri: mockImageUri,
        width: 1000,
        height: 800,
      };

      (uploadPhotoToStorage as jest.Mock).mockResolvedValue('storage/path.jpg');
      (collection as jest.Mock).mockReturnValue({});
      (doc as jest.Mock).mockReturnValue({});

      await uploadAndSavePhoto(mockEventId, mockUserId, imageResult, mockPhotoId);

      expect(uploadPhotoToStorage).toHaveBeenCalledWith(
        mockEventId,
        mockPhotoId,
        mockImageUri,
        undefined
      );
      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          eventId: mockEventId,
          uploaderId: mockUserId,
          storagePath: 'storage/path.jpg',
          width: 1000,
          height: 800,
          likeCount: 0,
        })
      );
    });

    it('should generate photo ID if not provided', async () => {
      const imageResult = {
        uri: mockImageUri,
        width: 1000,
        height: 800,
      };

      (uploadPhotoToStorage as jest.Mock).mockResolvedValue('storage/path.jpg');
      (collection as jest.Mock).mockReturnValue({});
      (doc as jest.Mock).mockReturnValue({});

      await uploadAndSavePhoto(mockEventId, mockUserId, imageResult);

      expect(doc).toHaveBeenCalled();
    });

    it('should pass progress callback to upload', async () => {
      const imageResult = {
        uri: mockImageUri,
        width: 1000,
        height: 800,
      };
      const onProgress = jest.fn();

      (uploadPhotoToStorage as jest.Mock).mockResolvedValue('storage/path.jpg');
      (collection as jest.Mock).mockReturnValue({});
      (doc as jest.Mock).mockReturnValue({});

      await uploadAndSavePhoto(mockEventId, mockUserId, imageResult, mockPhotoId, onProgress);

      expect(uploadPhotoToStorage).toHaveBeenCalledWith(
        mockEventId,
        mockPhotoId,
        mockImageUri,
        onProgress
      );
    });
  });

  describe('subscribeToPhotos', () => {
    it('should subscribe to photos query and return unsubscribe function', () => {
      const mockOnUpdate = jest.fn();
      const mockUnsubscribe = jest.fn();

      (collection as jest.Mock).mockReturnValue({});
      (query as jest.Mock).mockReturnValue({});
      (orderBy as jest.Mock).mockReturnValue({});
      (onSnapshot as jest.Mock).mockReturnValue(mockUnsubscribe);

      const unsubscribe = subscribeToPhotos(mockEventId, mockOnUpdate);

      expect(unsubscribe).toBe(mockUnsubscribe);
      expect(onSnapshot).toHaveBeenCalledWith(
        expect.anything(),
        expect.any(Function),
        expect.any(Function)
      );
    });

    it('should call callback with photos array when data received', () => {
      const mockOnUpdate = jest.fn();
      (collection as jest.Mock).mockReturnValue({});
      (query as jest.Mock).mockReturnValue({});
      (orderBy as jest.Mock).mockReturnValue({});
      (onSnapshot as jest.Mock).mockReturnValue(jest.fn());

      subscribeToPhotos(mockEventId, mockOnUpdate);

      const snapshotCallback = (onSnapshot as jest.Mock).mock.calls[0][1];
      const mockDoc1 = {
        id: 'photo1',
        data: () => ({
          eventId: mockEventId,
          uploaderId: 'user1',
          storagePath: 'path1',
          width: 100,
          height: 100,
        }),
      };
      const mockDoc2 = {
        id: 'photo2',
        data: () => ({
          eventId: mockEventId,
          uploaderId: 'user2',
          storagePath: 'path2',
          width: 200,
          height: 200,
        }),
      };

      snapshotCallback({
        docs: [mockDoc1, mockDoc2],
      });

      expect(mockOnUpdate).toHaveBeenCalledWith([
        expect.objectContaining({ id: 'photo1' }),
        expect.objectContaining({ id: 'photo2' }),
      ]);
    });

    it('should call callback with empty array on error', () => {
      const mockOnUpdate = jest.fn();
      (collection as jest.Mock).mockReturnValue({});
      (query as jest.Mock).mockReturnValue({});
      (orderBy as jest.Mock).mockReturnValue({});
      (onSnapshot as jest.Mock).mockReturnValue(jest.fn());

      subscribeToPhotos(mockEventId, mockOnUpdate);

      const errorCallback = (onSnapshot as jest.Mock).mock.calls[0][2];
      errorCallback(new Error('Subscription error'));

      expect(mockOnUpdate).toHaveBeenCalledWith([]);
    });
  });

  describe('loadPhotosBatch', () => {
    it('should load initial batch without cursor', async () => {
      const mockSnapshot = {
        docs: [
          {
            id: 'photo1',
            data: () => ({ eventId: mockEventId }),
          },
        ],
        empty: false,
      };
      const mockQuery = {};

      (query as jest.Mock).mockReturnValue(mockQuery);
      (getDocs as jest.Mock).mockResolvedValue(mockSnapshot);

      const result = await loadPhotosBatch(mockEventId, 20);

      expect(result.photos).toHaveLength(1);
      expect(result.lastDoc).toBe(mockSnapshot.docs[0]);
      expect(where).toHaveBeenCalledWith(expect.anything(), 'eventId', mockEventId);
      expect(orderBy).toHaveBeenCalledWith(expect.anything(), 'createdAt', 'desc');
      expect(limit).toHaveBeenCalledWith(20);
    });

    it('should add cursor to query when lastPhoto provided', async () => {
      const mockLastDoc = {};
      const mockQuery = {};

      (query as jest.Mock).mockReturnValue(mockQuery);
      (startAfter as jest.Mock).mockReturnValue({});
      (getDocs as jest.Mock).mockResolvedValue({ docs: [], empty: true });

      await loadPhotosBatch(mockEventId, 20, mockLastDoc as QueryDocumentSnapshot<DocumentData>);

      expect(startAfter).toHaveBeenCalledWith(mockLastDoc);
    });

    it('should throw error on query failure', async () => {
      (query as jest.Mock).mockReturnValue({});
      (getDocs as jest.Mock).mockRejectedValue(new Error('Query failed'));

      await expect(loadPhotosBatch(mockEventId)).rejects.toThrow('Query failed');
    });

    it('should return empty photos array and null lastDoc for empty snapshot', async () => {
      const mockSnapshot = { docs: [], empty: true };
      (query as jest.Mock).mockReturnValue({});
      (getDocs as jest.Mock).mockResolvedValue(mockSnapshot);

      const result = await loadPhotosBatch(mockEventId);

      expect(result.photos).toEqual([]);
      expect(result.lastDoc).toBeNull();
    });
  });

  describe('canDeletePhoto', () => {
    it('should return true if user is the uploader', async () => {
      const mockPhotoDoc = {
        exists: true,
        data: () => ({ uploaderId: mockUserId }),
      };

      (doc as jest.Mock)
        .mockReturnValueOnce({}) // photoRef
        .mockReturnValueOnce({ path: 'events/event' }); // eventRef (won't be called)

      (getDoc as jest.Mock).mockResolvedValue(mockPhotoDoc);

      const result = await canDeletePhoto(mockPhotoId, mockUserId, mockEventId);

      expect(result).toBe(true);
    });

    it('should return true if user is the event creator', async () => {
      const mockPhotoDoc = {
        exists: true,
        data: () => ({ uploaderId: 'other-user' }),
      };
      const mockEventDoc = {
        exists: true,
        data: () => ({ createdBy: mockUserId }),
      };

      (doc as jest.Mock)
        .mockReturnValueOnce({}) // photoRef
        .mockReturnValueOnce({ path: 'events/event' }); // eventRef

      (getDoc as jest.Mock).mockResolvedValueOnce(mockPhotoDoc).mockResolvedValueOnce(mockEventDoc);

      const result = await canDeletePhoto(mockPhotoId, mockUserId, mockEventId);

      expect(result).toBe(true);
    });

    it('should return false if user is neither uploader nor creator', async () => {
      const mockPhotoDoc = {
        exists: true,
        data: () => ({ uploaderId: 'other-user' }),
      };
      const mockEventDoc = {
        exists: true,
        data: () => ({ createdBy: 'other-creator' }),
      };

      (doc as jest.Mock).mockReturnValueOnce({}).mockReturnValueOnce({ path: 'events/event' });

      (getDoc as jest.Mock).mockResolvedValueOnce(mockPhotoDoc).mockResolvedValueOnce(mockEventDoc);

      const result = await canDeletePhoto(mockPhotoId, mockUserId, mockEventId);

      expect(result).toBe(false);
    });

    it('should return false if photo does not exist', async () => {
      (doc as jest.Mock).mockReturnValue({});
      (getDoc as jest.Mock).mockResolvedValue({ exists: false });

      const result = await canDeletePhoto(mockPhotoId, mockUserId, mockEventId);

      expect(result).toBe(false);
    });

    it('should return false on error', async () => {
      (doc as jest.Mock).mockReturnValue({});
      (getDoc as jest.Mock).mockRejectedValue(new Error('Database error'));

      const result = await canDeletePhoto(mockPhotoId, mockUserId, mockEventId);

      expect(result).toBe(false);
    });
  });

  describe('deletePhotoWithPermission', () => {
    it('should delete photo if user has permission', async () => {
      jest.spyOn(require('../src/services/photoService'), 'canDeletePhoto').mockResolvedValue(true);
      (doc as jest.Mock).mockReturnValue({ path: 'photos/photo' });
      (getDoc as jest.Mock).mockResolvedValue({
        exists: true,
        data: () => ({ storagePath: 'events/test/photos/photo.jpg' }),
      });
      (ref as jest.Mock).mockReturnValue({});
      (deleteObject as jest.Mock).mockResolvedValue(undefined);
      (deleteDoc as jest.Mock).mockResolvedValue(undefined);

      await deletePhotoWithPermission(mockPhotoId, mockEventId, mockUserId);

      expect(deletePhoto).toHaveBeenCalledWith(
        mockEventId,
        mockPhotoId,
        'events/test/photos/photo.jpg'
      );
      jest.restoreAllMocks();
    });

    it('should throw error if user lacks permission', async () => {
      jest
        .spyOn(require('../src/services/photoService'), 'canDeletePhoto')
        .mockResolvedValue(false);

      await expect(deletePhotoWithPermission(mockPhotoId, mockEventId, mockUserId)).rejects.toThrow(
        'Unauthorized: You do not have permission to delete this photo'
      );
      jest.restoreAllMocks();
    });

    it('should throw error if photo not found during deletion', async () => {
      jest.spyOn(require('../src/services/photoService'), 'canDeletePhoto').mockResolvedValue(true);
      (doc as jest.Mock).mockReturnValue({ path: 'photos/photo' });
      (getDoc as jest.Mock).mockResolvedValue({ exists: false });

      await expect(deletePhotoWithPermission(mockPhotoId, mockEventId, mockUserId)).rejects.toThrow(
        'Photo not found'
      );
      jest.restoreAllMocks();
    });
  });
});
