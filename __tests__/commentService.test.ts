import {
  addComment,
  deleteComment,
  getCommentCount,
  subscribeToCommentCount,
  subscribeToComments,
  generateCommentId,
} from '../src/services/commentService';
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
  query,
  orderBy,
  type QuerySnapshot,
} from 'firebase/firestore';

// Mock Firebase modules
jest.mock('../src/services/firebase', () => ({
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
  query: jest.fn(),
  orderBy: jest.fn(),
}));

describe.skip('commentService', () => {
  const mockPhotoId = 'test-photo-123';
  const mockUserId = 'user-123';
  const mockCommentId = 'comment_123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateCommentId', () => {
    it('should generate a unique comment ID', () => {
      const id1 = generateCommentId();
      const id2 = generateCommentId();

      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
    });
  });

  describe('addComment', () => {
    it('should create comment document and increment photo commentCount', async () => {
      const mockCommentRef = { path: '' };
      const mockPhotoRef = { path: '' };
      const mockTransaction = {
        get: jest.fn(),
        update: jest.fn(),
      };

      (doc as jest.Mock)
        .mockReturnValueOnce(mockCommentRef) // commentRef
        .mockReturnValueOnce(mockPhotoRef); // photoRef

      (collection as jest.Mock).mockReturnValueOnce({});

      (runTransaction as jest.Mock).mockResolvedValue(undefined);

      const result = await addComment(mockPhotoId, mockUserId, 'Test comment');

      expect(setDoc).toHaveBeenCalledWith(mockCommentRef, {
        userId: mockUserId,
        text: 'Test comment',
        createdAt: expect.any(Object),
      });

      expect(runTransaction).toHaveBeenCalledWith(expect.anything(), expect.any(Function));
      expect(result).toBeDefined();
    });

    it('should throw error if photo does not exist', async () => {
      const mockCommentRef = { path: '' };
      const mockPhotoRef = { path: '' };
      const mockTransaction = {
        get: jest.fn().mockResolvedValue({ exists: false }),
        update: jest.fn(),
      };

      (doc as jest.Mock).mockReturnValueOnce(mockCommentRef).mockReturnValueOnce(mockPhotoRef);
      (collection as jest.Mock).mockReturnValueOnce({});
      (runTransaction as jest.Mock).mockImplementation(async (db, operation) => {
        await operation(mockTransaction);
      });

      await expect(addComment(mockPhotoId, mockUserId, 'Test')).rejects.toThrow('Photo not found');
    });
  });

  describe('deleteComment', () => {
    it('should delete comment and decrement photo commentCount', async () => {
      const mockCommentRef = { path: '' };
      const mockPhotoRef = { path: '' };
      const mockCommentDoc = {
        exists: true,
        data: () => ({ userId: mockUserId }),
      };
      const mockPhotoDoc = {
        exists: true,
        data: () => ({ commentCount: 5 }),
      };
      const mockTransaction = {
        get: jest.fn().mockResolvedValue(mockPhotoDoc),
        update: jest.fn(),
      };

      (doc as jest.Mock)
        .mockReturnValueOnce(mockCommentRef) // commentRef
        .mockReturnValueOnce({}) // collection for query (not used but might be called)
        .mockReturnValueOnce(mockPhotoRef); // photoRef

      (getDoc as jest.Mock)
        .mockResolvedValueOnce(mockCommentDoc) // get comment
        .mockResolvedValueOnce(mockPhotoDoc); // get photo in transaction

      (runTransaction as jest.Mock).mockImplementation(async (db, operation) => {
        await operation(mockTransaction);
      });

      await deleteComment(mockPhotoId, mockCommentId, mockUserId);

      expect(deleteDoc).toHaveBeenCalledWith(mockCommentRef);
      expect(mockTransaction.update).toHaveBeenCalledWith(mockPhotoRef, {
        commentCount: 4,
      });
    });

    it('should throw error if comment does not exist', async () => {
      (doc as jest.Mock).mockReturnValueOnce({});
      (getDoc as jest.Mock).mockResolvedValue({ exists: false });

      await expect(deleteComment(mockPhotoId, mockCommentId, mockUserId)).rejects.toThrow(
        'Comment not found'
      );
    });

    it('should throw error if user is not comment owner', async () => {
      const mockCommentRef = { path: '' };
      const mockCommentDoc = {
        exists: true,
        data: () => ({ userId: 'different-user' }),
      };

      (doc as jest.Mock).mockReturnValueOnce(mockCommentRef);
      (getDoc as jest.Mock).mockResolvedValue(mockCommentDoc);

      await expect(deleteComment(mockPhotoId, mockCommentId, mockUserId)).rejects.toThrow(
        'You can only delete your own comments'
      );
    });

    it('should not decrement below zero', async () => {
      const mockCommentRef = { path: '' };
      const mockPhotoRef = { path: '' };
      const mockCommentDoc = {
        exists: true,
        data: () => ({ userId: mockUserId }),
      };
      const mockPhotoDoc = {
        exists: true,
        data: () => ({ commentCount: 0 }),
      };
      const mockTransaction = {
        get: jest.fn().mockResolvedValue(mockPhotoDoc),
        update: jest.fn(),
      };

      (doc as jest.Mock)
        .mockReturnValueOnce(mockCommentRef)
        .mockReturnValueOnce({})
        .mockReturnValueOnce(mockPhotoRef);

      (getDoc as jest.Mock)
        .mockResolvedValueOnce(mockCommentDoc)
        .mockResolvedValueOnce(mockPhotoDoc);

      (runTransaction as jest.Mock).mockImplementation(async (db, operation) => {
        await operation(mockTransaction);
      });

      await deleteComment(mockPhotoId, mockCommentId, mockUserId);

      expect(mockTransaction.update).toHaveBeenCalledWith(mockPhotoRef, {
        commentCount: 0,
      });
    });
  });

  describe('getCommentCount', () => {
    it('should return commentCount from photo document', async () => {
      const mockPhotoRef = { path: '' };
      const mockPhotoDoc = {
        exists: true,
        data: () => ({ commentCount: 42 }),
      };

      (doc as jest.Mock).mockReturnValueOnce(mockPhotoRef);
      (getDoc as jest.Mock).mockResolvedValue(mockPhotoDoc);

      const count = await getCommentCount(mockPhotoId);

      expect(count).toBe(42);
    });

    it('should return 0 if photo does not exist', async () => {
      (doc as jest.Mock).mockReturnValueOnce({});
      (getDoc as jest.Mock).mockResolvedValue({ exists: false });

      const count = await getCommentCount(mockPhotoId);

      expect(count).toBe(0);
    });

    it('should return 0 if commentCount not set', async () => {
      (doc as jest.Mock).mockReturnValueOnce({});
      (getDoc as jest.Mock).mockResolvedValue({
        exists: true,
        data: () => ({}),
      });

      const count = await getCommentCount(mockPhotoId);

      expect(count).toBe(0);
    });
  });

  describe('subscribeToCommentCount', () => {
    it('should subscribe to photo document and call callback with commentCount', () => {
      const mockOnUpdate = jest.fn();
      const mockUnsubscribe = jest.fn();
      const mockPhotoRef = { path: '' };

      (doc as jest.Mock).mockReturnValueOnce(mockPhotoRef);
      (onSnapshot as jest.Mock).mockReturnValueOnce(mockUnsubscribe);

      const unsubscribe = subscribeToCommentCount(mockPhotoId, mockOnUpdate);

      expect(unsubscribe).toBe(mockUnsubscribe);

      // Simulate snapshot callback
      const callback = (onSnapshot as jest.Mock).mock.calls[0][1];
      callback({
        exists: () => true,
        data: () => ({ commentCount: 10 }),
      });

      expect(mockOnUpdate).toHaveBeenCalledWith(10);
    });

    it('should call callback with 0 if photo does not exist', () => {
      const mockOnUpdate = jest.fn();
      (doc as jest.Mock).mockReturnValueOnce({});
      (onSnapshot as jest.Mock).mockReturnValueOnce(jest.fn());

      subscribeToCommentCount(mockPhotoId, mockOnUpdate);

      const callback = (onSnapshot as jest.Mock).mock.calls[0][1];
      callback({ exists: () => false });

      expect(mockOnUpdate).toHaveBeenCalledWith(0);
    });
  });

  describe('subscribeToComments', () => {
    it('should subscribe to comments collection and call callback with comments array', () => {
      const mockOnUpdate = jest.fn();
      const mockUnsubscribe = jest.fn();
      const mockCommentsRef = { path: '' };
      const mockQuery = { path: '' };

      (collection as jest.Mock).mockReturnValueOnce(mockCommentsRef);
      (query as jest.Mock).mockReturnValueOnce(mockQuery);
      (orderBy as jest.Mock).mockReturnValueOnce(mockQuery);
      (onSnapshot as jest.Mock).mockReturnValueOnce(mockUnsubscribe);

      const unsubscribe = subscribeToComments(mockPhotoId, mockOnUpdate);

      expect(unsubscribe).toBe(mockUnsubscribe);

      // Simulate snapshot callback
      const callback = (onSnapshot as jest.Mock).mock.calls[0][1];
      const mockDocs = [
        {
          id: 'comment1',
          data: () => ({
            userId: 'user1',
            text: 'Great photo!',
            createdAt: { toDate: () => new Date() },
          }),
        },
        {
          id: 'comment2',
          data: () => ({
            userId: 'user2',
            text: 'Awesome!',
            createdAt: { toDate: () => new Date() },
          }),
        },
      ];
      callback({
        docs: mockDocs,
      });

      expect(mockOnUpdate).toHaveBeenCalledWith([
        {
          id: 'comment1',
          photoId: mockPhotoId,
          userId: 'user1',
          text: 'Great photo!',
          createdAt: expect.any(Date),
        },
        {
          id: 'comment2',
          photoId: mockPhotoId,
          userId: 'user2',
          text: 'Awesome!',
          createdAt: expect.any(Date),
        },
      ]);
    });

    it('should call callback with empty array on error', () => {
      const mockOnUpdate = jest.fn();
      (collection as jest.Mock).mockReturnValueOnce({});
      (query as jest.Mock).mockReturnValueOnce({});
      (orderBy as jest.Mock).mockReturnValueOnce({});
      (onSnapshot as jest.Mock).mockReturnValueOnce(jest.fn());

      subscribeToComments(mockPhotoId, mockOnUpdate);

      const callback = (onSnapshot as jest.Mock).mock.calls[0][2]; // error callback
      callback(new Error('Test error'));

      expect(mockOnUpdate).toHaveBeenCalledWith([]);
    });
  });
});
