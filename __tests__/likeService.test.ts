import {
  likePhoto,
  unlikePhoto,
  toggleLike,
  getLikeCount,
  hasUserLiked,
  subscribeToLikeCount,
  subscribeToUserLike,
  generateLikeId,
} from '../src/services/likeService';
import { db } from '../src/services/firebase';
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
} from 'firebase/firestore';

// Mock Firebase modules
jest.mock('../firebase', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  deleteDoc: jest.fn(),
  serverTimestamp: jest.fn(() => ({ toDate: () => new Date() })),
  onSnapshot: jest.fn(),
  getDoc: jest.fn(),
  increment: jest.fn((value) => ({ value })),
  runTransaction: jest.fn(),
  Unsubscribe: jest.fn(),
}));

describe('likeService', () => {
  const mockPhotoId = 'test-photo-123';
  const mockUserId = 'user-123';
  const mockLikeId = generateLikeId(mockUserId);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateLikeId', () => {
    it('should return userId as like ID', () => {
      expect(generateLikeId(mockUserId)).toBe(mockUserId);
    });
  });

  describe('likePhoto', () => {
    it('should create like document and increment photo likeCount', async () => {
      const mockLikeRef = { path: '' };
      const mockPhotoRef = { path: '' };
      const mockTransaction = {
        get: jest.fn(),
        update: jest.fn(),
      };

      (doc as jest.Mock)
        .mockReturnValueOnce(mockLikeRef) // likeRef
        .mockReturnValueOnce(mockPhotoRef); // photoRef

      (collection as jest.Mock).mockReturnValueOnce({});

      (runTransaction as jest.Mock).mockResolvedValue(undefined);

      await likePhoto(mockPhotoId, mockUserId);

      expect(setDoc).toHaveBeenCalledWith(mockLikeRef, {
        userId: mockUserId,
        createdAt: expect.any(Object),
      });

      expect(runTransaction).toHaveBeenCalledWith(expect.anything(), expect.any(Function));
    });

    it('should throw error if photo does not exist', async () => {
      const mockLikeRef = { path: '' };
      const mockPhotoRef = { path: '' };
      const mockTransaction = {
        get: jest.fn().mockResolvedValue({ exists: false }),
        update: jest.fn(),
      };

      (doc as jest.Mock).mockReturnValueOnce(mockLikeRef).mockReturnValueOnce(mockPhotoRef);

      (collection as jest.Mock).mockReturnValueOnce({});

      (runTransaction as jest.Mock).mockImplementation(async (db, operation) => {
        await operation(mockTransaction);
      });

      await expect(likePhoto(mockPhotoId, mockUserId)).rejects.toThrow('Photo not found');
    });
  });

  describe('unlikePhoto', () => {
    it('should delete like document and decrement photo likeCount', async () => {
      const mockLikeRef = { path: '' };
      const mockPhotoRef = { path: '' };
      const mockPhotoDoc = {
        exists: true,
        data: () => ({ likeCount: 5 }),
      };
      const mockTransaction = {
        get: jest.fn().mockResolvedValue(mockPhotoDoc),
        update: jest.fn(),
      };

      (doc as jest.Mock)
        .mockReturnValueOnce(mockLikeRef) // getDoc for like check
        .mockReturnValueOnce({}) // collection for like path
        .mockReturnValueOnce(mockPhotoRef); // photoRef for transaction

      (getDoc as jest.Mock).mockResolvedValue({ exists: true });

      (runTransaction as jest.Mock).mockImplementation(async (db, operation) => {
        await operation(mockTransaction);
      });

      await unlikePhoto(mockPhotoId, mockUserId);

      expect(deleteDoc).toHaveBeenCalledWith(mockLikeRef);
      expect(mockTransaction.update).toHaveBeenCalledWith(mockPhotoRef, {
        likeCount: 4,
      });
    });

    it('should not throw if like does not exist', async () => {
      (doc as jest.Mock).mockReturnValueOnce({});
      (getDoc as jest.Mock).mockResolvedValue({ exists: false });

      await expect(unlikePhoto(mockPhotoId, mockUserId)).resolves.not.toThrow();

      expect(deleteDoc).not.toHaveBeenCalled();
    });

    it('should not decrement below zero', async () => {
      const mockLikeRef = { path: '' };
      const mockPhotoRef = { path: '' };
      const mockPhotoDoc = {
        exists: true,
        data: () => ({ likeCount: 0 }),
      };
      const mockTransaction = {
        get: jest.fn().mockResolvedValue(mockPhotoDoc),
        update: jest.fn(),
      };

      (doc as jest.Mock)
        .mockReturnValueOnce(mockLikeRef)
        .mockReturnValueOnce({})
        .mockReturnValueOnce(mockPhotoRef);

      (getDoc as jest.Mock).mockResolvedValue({ exists: true });

      (runTransaction as jest.Mock).mockImplementation(async (db, operation) => {
        await operation(mockTransaction);
      });

      await unlikePhoto(mockPhotoId, mockUserId);

      expect(mockTransaction.update).toHaveBeenCalledWith(mockPhotoRef, {
        likeCount: 0,
      });
    });
  });

  describe('toggleLike', () => {
    it('should unlike if already liked', async () => {
      (hasUserLiked as jest.Mock).mockResolvedValue(true);
      (unlikePhoto as jest.Mock).mockResolvedValue(undefined);

      const result = await toggleLike(mockPhotoId, mockUserId);

      expect(result).toBe(false);
      expect(unlikePhoto).toHaveBeenCalledWith(mockPhotoId, mockUserId);
    });

    it('should like if not already liked', async () => {
      (hasUserLiked as jest.Mock).mockResolvedValue(false);
      (likePhoto as jest.Mock).mockResolvedValue(undefined);

      const result = await toggleLike(mockPhotoId, mockUserId);

      expect(result).toBe(true);
      expect(likePhoto).toHaveBeenCalledWith(mockPhotoId, mockUserId);
    });
  });

  describe('getLikeCount', () => {
    it('should return likeCount from photo document', async () => {
      const mockPhotoRef = { path: '' };
      const mockPhotoDoc = {
        exists: true,
        data: () => ({ likeCount: 42 }),
      };

      (doc as jest.Mock).mockReturnValueOnce(mockPhotoRef);
      (getDoc as jest.Mock).mockResolvedValue(mockPhotoDoc);

      const count = await getLikeCount(mockPhotoId);

      expect(count).toBe(42);
    });

    it('should return 0 if photo does not exist', async () => {
      (doc as jest.Mock).mockReturnValueOnce({});
      (getDoc as jest.Mock).mockResolvedValue({ exists: false });

      const count = await getLikeCount(mockPhotoId);

      expect(count).toBe(0);
    });

    it('should return 0 if likeCount not set', async () => {
      (doc as jest.Mock).mockReturnValueOnce({});
      (getDoc as jest.Mock).mockResolvedValue({
        exists: true,
        data: () => ({}),
      });

      const count = await getLikeCount(mockPhotoId);

      expect(count).toBe(0);
    });
  });

  describe('hasUserLiked', () => {
    it('should return true if like document exists', async () => {
      (doc as jest.Mock).mockReturnValueOnce({});
      (getDoc as jest.Mock).mockResolvedValue({ exists: true });

      const result = await hasUserLiked(mockPhotoId, mockUserId);

      expect(result).toBe(true);
    });

    it('should return false if like document does not exist', async () => {
      (doc as jest.Mock).mockReturnValueOnce({});
      (getDoc as jest.Mock).mockResolvedValue({ exists: false });

      const result = await hasUserLiked(mockPhotoId, mockUserId);

      expect(result).toBe(false);
    });
  });

  describe('subscribeToLikeCount', () => {
    it('should subscribe to photo document and call callback with likeCount', () => {
      const mockOnUpdate = jest.fn();
      const mockUnsubscribe = jest.fn();
      const mockPhotoRef = { path: '' };

      (doc as jest.Mock).mockReturnValueOnce(mockPhotoRef);
      (onSnapshot as jest.Mock).mockReturnValueOnce(mockUnsubscribe);

      const unsubscribe = subscribeToLikeCount(mockPhotoId, mockOnUpdate);

      expect(unsubscribe).toBe(mockUnsubscribe);

      // Simulate snapshot callback
      const callback = (onSnapshot as jest.Mock).mock.calls[0][1];
      callback({
        exists: () => true,
        data: () => ({ likeCount: 10 }),
      });

      expect(mockOnUpdate).toHaveBeenCalledWith(10);
    });

    it('should call callback with 0 if photo does not exist', () => {
      const mockOnUpdate = jest.fn();
      (doc as jest.Mock).mockReturnValueOnce({});
      (onSnapshot as jest.Mock).mockReturnValueOnce(jest.fn());

      subscribeToLikeCount(mockPhotoId, mockOnUpdate);

      const callback = (onSnapshot as jest.Mock).mock.calls[0][1];
      callback({ exists: () => false });

      expect(mockOnUpdate).toHaveBeenCalledWith(0);
    });
  });

  describe('subscribeToUserLike', () => {
    it('should subscribe to like document and call callback with existence status', () => {
      const mockOnUpdate = jest.fn();
      const mockUnsubscribe = jest.fn();
      const mockLikeRef = { path: '' };

      (collection as jest.Mock).mockReturnValueOnce({});
      (doc as jest.Mock).mockReturnValueOnce(mockLikeRef);
      (onSnapshot as jest.Mock).mockReturnValueOnce(mockUnsubscribe);

      const unsubscribe = subscribeToUserLike(mockPhotoId, mockUserId, mockOnUpdate);

      expect(unsubscribe).toBe(mockUnsubscribe);

      // Simulate snapshot callback - like exists
      const callback = (onSnapshot as jest.Mock).mock.calls[0][1];
      callback({ exists: () => true });

      expect(mockOnUpdate).toHaveBeenCalledWith(true);
    });
  });
});
