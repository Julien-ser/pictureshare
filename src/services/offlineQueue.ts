import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { uploadAndSavePhoto } from './photoService';
import type { Photo } from '../types';

function safeConsoleError(...args: any[]): void {
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    try {
      console.error(...args);
    } catch (e) {
      // ignore errors from console.error itself
    }
  }
}

const OFFLINE_QUEUE_KEY = 'pictureshare_offline_queue';
const OFFLINE_UPLOADS_DIR = `${FileSystem.cacheDirectory}pictureshare_offline/`;

export interface OfflineQueueItem {
  id: string;
  eventId: string;
  uploaderId: string;
  localImageUri: string;
  cachedImageUri?: string;
  width: number;
  height: number;
  storagePath: string;
  retryCount: number;
  lastAttempt?: number;
  error?: string;
}

/**
 * Initialize offline uploads directory
 */
async function ensureOfflineDir(): Promise<void> {
  const dirInfo = await FileSystem.getInfoAsync(OFFLINE_UPLOADS_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(OFFLINE_UPLOADS_DIR, { intermediates: true });
  }
}

/**
 * Copy image to offline cache directory for persistence
 */
async function cacheImageLocally(originalUri: string, itemId: string): Promise<string> {
  await ensureOfflineDir();
  const fileExt = originalUri.split('.').pop() || 'jpg';
  const cachedUri = `${OFFLINE_UPLOADS_DIR}${itemId}.${fileExt}`;

  try {
    await FileSystem.copyAsync({
      from: originalUri,
      to: cachedUri,
    });
    return cachedUri;
  } catch (error) {
    safeConsoleError('Error caching image:', error);
    throw error;
  }
}

/**
 * Get all items in the offline queue
 */
export async function getOfflineQueue(): Promise<OfflineQueueItem[]> {
  try {
    const queueJson = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
    return queueJson ? JSON.parse(queueJson) : [];
  } catch (error) {
    safeConsoleError('Error reading offline queue:', error);
    return [];
  }
}

/**
 * Add an item to the offline queue
 */
export async function addToOfflineQueue(
  item: Omit<OfflineQueueItem, 'retryCount' | 'lastAttempt'>
): Promise<void> {
  const queue = await getOfflineQueue();
  const fullItem: OfflineQueueItem = {
    ...item,
    retryCount: 0,
  };

  // Cache the image file locally
  try {
    const cachedUri = await cacheImageLocally(item.localImageUri, item.id);
    fullItem.cachedImageUri = cachedUri;
  } catch (error) {
    safeConsoleError('Failed to cache image for offline queue:', error);
    throw error;
  }

  queue.push(fullItem);
  await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
}

/**
 * Remove an item from the offline queue by ID
 */
export async function removeFromOfflineQueue(itemId: string): Promise<void> {
  const queue = await getOfflineQueue();
  const filtered = queue.filter((item) => item.id !== itemId);
  await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(filtered));
}

/**
 * Update retry count and last attempt timestamp for an item
 */
async function updateItemRetry(itemId: string, error?: string): Promise<void> {
  const queue = await getOfflineQueue();
  const item = queue.find((i) => i.id === itemId);
  if (item) {
    item.retryCount += 1;
    item.lastAttempt = Date.now();
    if (error) {
      item.error = error;
    }
    await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  }
}

/**
 * Clear the entire offline queue (use with caution)
 */
export async function clearOfflineQueue(): Promise<void> {
  await AsyncStorage.removeItem(OFFLINE_QUEUE_KEY);
}

/**
 * Get count of items in offline queue
 */
export async function getOfflineQueueCount(): Promise<number> {
  const queue = await getOfflineQueue();
  return queue.length;
}

/**
 * Check if we are online (simple check)
 */
export async function isOnline(): Promise<boolean> {
  try {
    // Simple connectivity check - try to fetch a small resource
    const result = await FileSystem.getInfoAsync('https://www.google.com');
    return result.exists;
  } catch {
    return false;
  }
}

/**
 * Process the offline queue when we're back online
 * Retries failed uploads with exponential backoff
 */
export async function processOfflineQueue(): Promise<void> {
  const queue = await getOfflineQueue();
  if (queue.length === 0) {
    return;
  }

  console.log(`Processing ${queue.length} offline upload(s)`);

  const maxRetries = 5;
  const baseDelay = 2000; // 2 seconds

  for (const item of queue) {
    try {
      // Check if we should retry based on retry count
      if (item.retryCount >= maxRetries) {
        console.warn(`Skipping item ${item.id} - max retries (${maxRetries}) exceeded`);
        continue;
      }

      // Check if we're online
      const online = await isOnline();
      if (!online) {
        console.log('Still offline, stopping queue processing');
        break;
      }

      // Use cached image if available, otherwise fall back to original
      const imageUri = item.cachedImageUri || item.localImageUri;
      if (!imageUri || !(await FileSystem.getInfoAsync(imageUri)).exists) {
        safeConsoleError(`Image file missing for item ${item.id}, removing from queue`);
        await removeFromOfflineQueue(item.id);
        continue;
      }

      // Attempt upload
      const result: Photo = await uploadAndSavePhoto(
        item.eventId,
        item.uploaderId,
        {
          uri: imageUri,
          width: item.width,
          height: item.height,
        },
        item.id
      );

      // Success! Remove from queue
      console.log(`Successfully uploaded offline item ${item.id}`);
      await removeFromOfflineQueue(item.id);

      // Clean up cached file if it was used
      if (item.cachedImageUri && item.cachedImageUri !== item.localImageUri) {
        try {
          await FileSystem.deleteAsync(item.cachedImageUri);
        } catch (e) {
          safeConsoleError('Error cleaning up cached file:', e);
        }
      }
    } catch (error) {
      safeConsoleError(`Failed to upload offline item ${item.id}:`, error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      await updateItemRetry(item.id, errorMessage);

      // Exponential backoff before next retry
      const delay = baseDelay * Math.pow(2, item.retryCount);
      console.log(`Will retry ${item.id} in ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

/**
 * Initialize offline queue management - call this on app startup
 */
export async function initializeOfflineQueue(): Promise<void> {
  try {
    await ensureOfflineDir();
    console.log('Offline queue initialized');

    // Try to process any pending uploads
    await processOfflineQueue();
  } catch (error) {
    try {
      safeConsoleError('Error initializing offline queue:', error);
    } catch (e) {
      // ignore
    }
  }
}
