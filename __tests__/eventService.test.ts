import { createEvent, getEventByCode, joinEvent } from '../src/services/eventService';
import { db } from '../src/services/firebase';
import { generateEventCode } from '../src/utils/codeGenerator';
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

// Mock Firebase modules
jest.mock('../src/services/firebase', () => ({
  db: {},
}));

jest.mock('../src/utils/codeGenerator', () => ({
  generateEventCode: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  Timestamp: {
    now: jest.fn(() => ({ toDate: () => new Date() })),
  },
}));

describe('eventService', () => {
  const mockTitle = 'Test Event';
  const mockUserId = 'test-user';
  const mockEventCode = 'ABC123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createEvent', () => {
    it('should create event with unique code', async () => {
      const mockEventRef = { id: 'event-123' };
      (generateEventCode as jest.Mock).mockResolvedValue(mockEventCode);
      (collection as jest.Mock).mockReturnValue({});
      (doc as jest.Mock).mockReturnValue(mockEventRef);

      const result = await createEvent(mockTitle, mockUserId);

      expect(generateEventCode).toHaveBeenCalledWith(expect.any(Function));
      expect(setDoc).toHaveBeenCalledWith(
        mockEventRef,
        expect.objectContaining({
          code: mockEventCode,
          title: mockTitle,
          createdBy: mockUserId,
          participants: [mockUserId],
          settings: {
            isPublic: true,
          },
        })
      );
      expect(result.code).toBe(mockEventCode);
      expect(result.id).toBe('event-123');
    });

    it('should set isPublic to true by default', async () => {
      (generateEventCode as jest.Mock).mockResolvedValue(mockEventCode);
      (collection as jest.Mock).mockReturnValue({});
      (doc as jest.Mock).mockReturnValue({ id: 'event-123' });

      await createEvent(mockTitle, mockUserId);

      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          settings: { isPublic: true },
        })
      );
    });

    it('should set custom maxDuration if provided', async () => {
      (generateEventCode as jest.Mock).mockResolvedValue(mockEventCode);
      (collection as jest.Mock).mockReturnValue({});
      (doc as jest.Mock).mockReturnValue({ id: 'event-123' });

      await createEvent(mockTitle, mockUserId, 24); // 24 hours

      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          settings: {
            maxDuration: 24 * 60 * 60 * 1000,
            isPublic: true,
          },
        })
      );
    });

    it('should set isPublic to false when specified', async () => {
      (generateEventCode as jest.Mock).mockResolvedValue(mockEventCode);
      (collection as jest.Mock).mockReturnValue({});
      (doc as jest.Mock).mockReturnValue({ id: 'event-123' });

      await createEvent(mockTitle, mockUserId, undefined, false);

      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          settings: { isPublic: false },
        })
      );
    });
  });

  describe('getEventByCode', () => {
    it('should return event if found', async () => {
      const mockEventRef = { id: 'event-123' };
      const mockEventData = {
        code: mockEventCode,
        title: mockTitle,
        createdBy: mockUserId,
      };

      (query as jest.Mock).mockReturnValue({});
      (getDocs as jest.Mock).mockResolvedValue({
        empty: false,
        docs: [{ id: 'event-123', data: () => mockEventData }],
      });

      const result = await getEventByCode(mockEventCode);

      expect(result).toEqual({
        id: 'event-123',
        ...mockEventData,
      });
    });

    it('should return null if event not found', async () => {
      (query as jest.Mock).mockReturnValue({});
      (getDocs as jest.Mock).mockResolvedValue({
        empty: true,
        docs: [],
      });

      const result = await getEventByCode(mockEventCode);

      expect(result).toBeNull();
    });
  });

  describe('joinEvent', () => {
    it('should add user to participants if not already a member', async () => {
      const mockEventId = 'event-123';
      const mockEventDoc = {
        exists: true,
        data: () => ({
          participants: [mockUserId],
        }),
      };
      const mockEventRef = { path: '' };

      (doc as jest.Mock).mockReturnValue(mockEventRef);
      (getDoc as jest.Mock).mockResolvedValue(mockEventDoc);
      (setDoc as jest.Mock).mockResolvedValue(undefined);

      await joinEvent(mockEventId, 'new-user');

      // Should have added new user
      expect(setDoc).toHaveBeenCalledWith(
        mockEventRef,
        expect.objectContaining({
          participants: [mockUserId, 'new-user'],
        })
      );
    });

    it('should not add duplicate participant', async () => {
      const mockEventId = 'event-123';
      const mockEventDoc = {
        exists: true,
        data: () => ({
          participants: ['existing-user'],
        }),
      };
      const mockEventRef = { path: '' };

      (doc as jest.Mock).mockReturnValue(mockEventRef);
      (getDoc as jest.Mock).mockResolvedValue(mockEventDoc);
      (setDoc as jest.Mock).mockResolvedValue(undefined);

      await joinEvent(mockEventId, 'existing-user');

      expect(setDoc).not.toHaveBeenCalled();
    });

    it('should not add if event does not exist', async () => {
      const mockEventId = 'event-123';
      (doc as jest.Mock).mockReturnValue({});
      (getDoc as jest.Mock).mockResolvedValue({ exists: false });

      await joinEvent(mockEventId, mockUserId);

      expect(setDoc).not.toHaveBeenCalled();
    });
  });
});
