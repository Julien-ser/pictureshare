import {
  getOfflineQueue,
  addToOfflineQueue,
  removeFromOfflineQueue,
  clearOfflineQueue,
  getOfflineQueueCount,
  isOnline,
  processOfflineQueue,
  initializeOfflineQueue,
  OfflineQueueItem,
} from '../src/services/offlineQueue';
import * as offlineQueueModule from '../src/services/offlineQueue';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { uploadAndSavePhoto } from '../src/services/photoService';

// Mock dependencies
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('expo-file-system', () => ({
  getInfoAsync: jest.fn(),
  makeDirectoryAsync: jest.fn(),
  copyAsync: jest.fn(),
  deleteAsync: jest.fn(),
  cacheDirectory: '/cache/',
}));

jest.mock('../src/services/photoService', () => ({
  uploadAndSavePhoto: jest.fn(),
}));

describe('offlineQueue', () => {
  const mockQueueItem: OfflineQueueItem = {
    id: 'item-123',
    eventId: 'event-123',
    uploaderId: 'user-123',
    localImageUri: 'file://local.jpg',
    cachedImageUri: 'file://cached.jpg',
    width: 1000,
    height: 800,
    storagePath: 'events/event-123/photos/item-123.jpg',
    retryCount: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (FileSystem.getInfoAsync as any).mockResolvedValue({ exists: false });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getOfflineQueue', () => {
    it('should return empty array if no queue exists', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await getOfflineQueue();

      expect(result).toEqual([]);
    });

    it('should return parsed queue if exists', async () => {
      const queue = [mockQueueItem];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(queue));

      const result = await getOfflineQueue();

      expect(result).toEqual(queue);
    });

    it('should return empty array on error', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Storage error'));

      const result = await getOfflineQueue();

      expect(result).toEqual([]);
    });
  });

  describe('addToOfflineQueue', () => {
    it('should add item to queue and cache image', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      (FileSystem.copyAsync as jest.Mock).mockResolvedValue({});
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      const item = {
        id: 'item-123',
        eventId: 'event-123',
        uploaderId: 'user-123',
        localImageUri: 'file://local.jpg',
        width: 1000,
        height: 800,
        storagePath: 'events/event-123/photos/item-123.jpg',
      };

      await addToOfflineQueue(item);

      expect(FileSystem.copyAsync).toHaveBeenCalledWith({
        from: 'file://local.jpg',
        to: '/cache/pictureshare_offline/item-123.jpg',
      });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('item-123')
      );
    });

    it('should set retryCount to 0 for new item', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      (FileSystem.copyAsync as jest.Mock).mockResolvedValue({});
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      await addToOfflineQueue({
        id: 'item-123',
        eventId: 'event-123',
        uploaderId: 'user-123',
        localImageUri: 'file://local.jpg',
        width: 1000,
        height: 800,
        storagePath: 'events/event-123/photos/item-123.jpg',
      });

      const savedQueue = JSON.parse((AsyncStorage.setItem as jest.Mock).mock.calls[0][1]);
      expect(savedQueue[0].retryCount).toBe(0);
    });
  });

  describe('removeFromOfflineQueue', () => {
    it('should remove item by ID', async () => {
      const queue = [mockQueueItem, { ...mockQueueItem, id: 'item-456' }];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(queue));
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      await removeFromOfflineQueue('item-123');

      const savedQueue = JSON.parse((AsyncStorage.setItem as jest.Mock).mock.calls[0][1]);
      expect(savedQueue).toHaveLength(1);
      expect(savedQueue[0].id).toBe('item-456');
    });
  });

  describe('clearOfflineQueue', () => {
    it('should remove queue from storage', async () => {
      await clearOfflineQueue();
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('pictureshare_offline_queue');
    });
  });

  describe('getOfflineQueueCount', () => {
    it('should return number of items in queue', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify([mockQueueItem, mockQueueItem])
      );

      const count = await getOfflineQueueCount();

      expect(count).toBe(2);
    });
  });

  describe('isOnline', () => {
    it('should return true if network check succeeds', async () => {
      (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({ exists: true });

      const result = await isOnline();

      expect(result).toBe(true);
    });

    it('should return false if network check fails', async () => {
      (FileSystem.getInfoAsync as jest.Mock).mockRejectedValue(new Error('Network error'));

      const result = await isOnline();

      expect(result).toBe(false);
    });
  });

  describe('processOfflineQueue', () => {
    it('should process all pending items when online', async () => {
      const queue = [mockQueueItem];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(queue));
      (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({ exists: true });
      (uploadAndSavePhoto as jest.Mock).mockResolvedValue({
        id: 'photo-123',
        eventId: mockQueueItem.eventId,
        uploaderId: mockQueueItem.uploaderId,
        storagePath: mockQueueItem.storagePath,
        width: mockQueueItem.width,
        height: mockQueueItem.height,
        likeCount: 0,
        createdAt: new Date(),
      } as any);
      (FileSystem.deleteAsync as jest.Mock).mockResolvedValue(undefined);

      await processOfflineQueue();

      expect(uploadAndSavePhoto).toHaveBeenCalledWith(
        mockQueueItem.eventId,
        mockQueueItem.uploaderId,
        {
          uri: mockQueueItem.cachedImageUri!,
          width: mockQueueItem.width,
          height: mockQueueItem.height,
        },
        mockQueueItem.id
      );
      // Verify that the queue was cleared (item removed)
      const lastSetItemCall = (AsyncStorage.setItem as jest.Mock).mock.calls.slice(-1)[0];
      const savedQueue = JSON.parse(lastSetItemCall[1]);
      expect(savedQueue).toHaveLength(0);
    });

    it('should skip items with max retries exceeded', async () => {
      const itemWithMaxRetries = { ...mockQueueItem, retryCount: 5 };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([itemWithMaxRetries]));
      (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({ exists: true });

      await processOfflineQueue();

      expect(uploadAndSavePhoto).not.toHaveBeenCalled();
    });

    it('should stop processing if offline', async () => {
      const queue = [mockQueueItem];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(queue));
      (FileSystem.getInfoAsync as jest.Mock)
        .mockResolvedValueOnce({ exists: false }) // online check returns false
        .mockResolvedValueOnce({ exists: true }); // any subsequent calls

      await processOfflineQueue();

      expect(uploadAndSavePhoto).not.toHaveBeenCalled();
    });

    it('should handle upload errors and increment retry count', async () => {
      const queue = [mockQueueItem];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(queue));
      (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({ exists: true });
      (uploadAndSavePhoto as jest.Mock).mockRejectedValue(new Error('Upload failed'));

      await processOfflineQueue();

      // Verify that the item's retryCount was incremented and the item remains in the queue
      const lastSetItemCall = (AsyncStorage.setItem as jest.Mock).mock.calls.slice(-1)[0];
      const savedQueue = JSON.parse(lastSetItemCall[1]);
      expect(savedQueue).toHaveLength(1);
      expect(savedQueue[0].retryCount).toBe(1);
      expect(savedQueue[0].id).toBe(mockQueueItem.id);
    });
  });

  describe('initializeOfflineQueue', () => {
    it('should initialize directory and process any pending uploads', async () => {
      (FileSystem.getInfoAsync as jest.Mock).mockResolvedValue({ exists: false });
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify([]));

      await initializeOfflineQueue();

      expect(FileSystem.makeDirectoryAsync).toHaveBeenCalledWith('/cache/pictureshare_offline/', {
        intermediates: true,
      });
      // Verify that processOfflineQueue was called indirectly by checking getOfflineQueue was invoked
      expect(AsyncStorage.getItem).toHaveBeenCalled();
    });

    it('should handle initialization errors gracefully', async () => {
      (FileSystem.getInfoAsync as jest.Mock).mockRejectedValue(new Error('Init error'));

      await initializeOfflineQueue();

      // Should not throw
    });
  });
});
