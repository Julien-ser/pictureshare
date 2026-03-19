import {
  getParticipantsWithStats,
  getUserProfiles,
  getEnrichedParticipants,
} from '../src/services/participantService';
import { db } from '../src/services/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  type QuerySnapshot,
  type DocumentData,
} from 'firebase/firestore';

// Mock Firebase modules
jest.mock('../src/services/firebase', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  QuerySnapshot: class QuerySnapshot {},
}));

describe('participantService', () => {
  const mockEventId = 'test-event-123';
  const mockUserId1 = 'user-1';
  const mockUserId2 = 'user-2';
  const mockUserId3 = 'user-3';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getParticipantsWithStats', () => {
    it('should return empty array if event does not exist', async () => {
      const mockEventDoc = { exists: false };

      (doc as jest.Mock).mockReturnValue({ path: 'events/test' });
      (getDoc as jest.Mock).mockResolvedValue(mockEventDoc);

      const result = await getParticipantsWithStats(mockEventId);

      expect(result).toEqual([]);
    });

    it('should return empty array if event has no participants', async () => {
      const mockEventDoc = {
        exists: true,
        data: () => ({ participants: [] }),
      };

      (doc as jest.Mock).mockReturnValue({ path: 'events/test' });
      (getDoc as jest.Mock).mockResolvedValue(mockEventDoc);

      const result = await getParticipantsWithStats(mockEventId);

      expect(result).toEqual([]);
    });

    it('should fetch photo counts for each participant', async () => {
      const mockEventDoc = {
        exists: true,
        data: () => ({
          participants: [mockUserId1, mockUserId2],
        }),
      };

      const mockPhotosSnapshot1 = {
        size: 3,
        empty: false,
      };
      const mockPhotosSnapshot2 = {
        size: 1,
        empty: false,
      };

      const mockQuery1 = { path: 'photos/query1' };
      const mockQuery2 = { path: 'photos/query2' };

      let queryCallCount = 0;
      (query as jest.Mock).mockImplementation(() => {
        queryCallCount++;
        return { path: `photos/query${queryCallCount}` };
      });

      (doc as jest.Mock).mockReturnValue({ path: 'events/test' });
      (getDoc as jest.Mock).mockResolvedValue(mockEventDoc);
      (getDocs as jest.Mock).mockImplementation(async () => {
        if (queryCallCount === 1) return mockPhotosSnapshot1;
        return mockPhotosSnapshot2;
      });

      const result = await getParticipantsWithStats(mockEventId);

      expect(result).toHaveLength(2);
      expect(result.find((p) => p.userId === mockUserId1)?.photoCount).toBe(3);
      expect(result.find((p) => p.userId === mockUserId2)?.photoCount).toBe(1);
    });

    it('should sort participants by photo count descending', async () => {
      const mockEventDoc = {
        exists: true,
        data: () => ({
          participants: [mockUserId1, mockUserId2, mockUserId3],
        }),
      };

      const mockPhotosSnapshot1 = { size: 1, empty: false };
      const mockPhotosSnapshot2 = { size: 3, empty: false };
      const mockPhotosSnapshot3 = { size: 2, empty: false };

      const mockQueries = [{ path: 'q1' }, { path: 'q2' }, { path: 'q3' }];
      let queryIndex = 0;
      (query as jest.Mock).mockImplementation(() => mockQueries[queryIndex++]);

      (doc as jest.Mock).mockReturnValue({ path: 'events/test' });
      (getDoc as jest.Mock).mockResolvedValue(mockEventDoc);
      (getDocs as jest.Mock).mockImplementation(async () => {
        const snapshot = [mockPhotosSnapshot1, mockPhotosSnapshot2, mockPhotosSnapshot3][
          queryIndex - 1
        ];
        return snapshot;
      });

      const result = await getParticipantsWithStats(mockEventId);

      // Should be sorted: user-2 (3), user-3 (2), user-1 (1)
      expect(result[0].userId).toBe(mockUserId2);
      expect(result[1].userId).toBe(mockUserId3);
      expect(result[2].userId).toBe(mockUserId1);
    });

    it('should return empty array on error', async () => {
      (doc as jest.Mock).mockReturnValue({ path: 'events/test' });
      (getDoc as jest.Mock).mockRejectedValue(new Error('Database error'));

      const result = await getParticipantsWithStats(mockEventId);

      expect(result).toEqual([]);
    });
  });

  describe('getUserProfiles', () => {
    it('should return map of user profiles with placeholder display names', async () => {
      const userIds = [mockUserId1, mockUserId2];
      const result = await getUserProfiles(userIds);

      expect(result.size).toBe(2);
      expect(result.get(mockUserId1)?.displayName).toBe(`User ${mockUserId1.substring(0, 6)}`);
      expect(result.get(mockUserId2)?.displayName).toBe(`User ${mockUserId2.substring(0, 6)}`);
      expect(result.get(mockUserId1)?.photoURL).toBeUndefined();
    });

    it('should handle empty user list', async () => {
      const result = await getUserProfiles([]);
      expect(result.size).toBe(0);
    });

    it('should handle long user IDs in display name truncation', async () => {
      const longUserId = 'user-with-very-long-id-12345';
      const result = await getUserProfiles([longUserId]);

      expect(result.get(longUserId)?.displayName).toBe(`User user-w`); // first 6 chars
    });
  });

  describe('getEnrichedParticipants', () => {
    it('should enrich participants with isCurrentUser flag', async () => {
      const mockParticipants = [
        { userId: mockUserId1, photoCount: 2 },
        { userId: mockUserId2, photoCount: 1 },
      ];

      // Mock getParticipantsWithStats
      (getParticipantsWithStats as jest.Mock).mockResolvedValue(mockParticipants);

      const result = await getEnrichedParticipants(mockEventId, mockUserId1);

      expect(result).toHaveLength(2);
      expect(result[0].isCurrentUser).toBe(true); // user1 is current user
      expect(result[1].isCurrentUser).toBe(false);
      expect(result[0].displayName).toBe(`User ${mockUserId1.substring(0, 8)}`);
    });

    it('should mark all as non-current when no currentUserId provided', async () => {
      const mockParticipants = [
        { userId: mockUserId1, photoCount: 1 },
        { userId: mockUserId2, photoCount: 2 },
      ];

      (getParticipantsWithStats as jest.Mock).mockResolvedValue(mockParticipants);

      const result = await getEnrichedParticipants(mockEventId);

      expect(result.every((p) => p.isCurrentUser === false)).toBe(true);
    });

    it('should preserve existing displayName from participant stats', async () => {
      const mockParticipants = [{ userId: mockUserId1, photoCount: 1, displayName: 'Custom Name' }];

      (getParticipantsWithStats as jest.Mock).mockResolvedValue(mockParticipants);

      const result = await getEnrichedParticipants(mockEventId);

      expect(result[0].displayName).toBe('Custom Name');
    });
  });
});
