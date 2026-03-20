import {
  storeUserMapping,
  getUserMapping,
  signInAnonymouslyLocally,
  signInWithGoogle,
  onAuthStateChangedListener,
} from '../src/services/firebase';
import { auth } from '../src/services/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  signInAnonymously,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  type User as FirebaseUser,
} from 'firebase/auth';

// Mock Firebase modules
jest.mock('../src/services/firebase', () => ({
  auth: {},
  db: {},
  storage: {},
  googleProvider: {},
}));

jest.mock('firebase/auth', () => ({
  signInAnonymously: jest.fn(),
  onAuthStateChanged: jest.fn(),
  GoogleAuthProvider: {
    credential: jest.fn(),
  },
  signInWithCredential: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('firebase', () => {
  const mockUser = {
    uid: 'user-123',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: 'https://example.com/photo.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('storeUserMapping', () => {
    it('should store user mapping in AsyncStorage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      const user = {
        id: 'user-123',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'https://example.com/photo.jpg',
      };

      await storeUserMapping(user);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'user_mapping',
        expect.stringContaining('user-123')
      );
    });

    it('should update existing mappings', async () => {
      const existing = JSON.stringify({
        'existing-user': { id: 'existing-user' },
      });
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(existing);
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      await storeUserMapping({
        id: 'user-123',
        email: 'test@example.com',
      });

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'user_mapping',
        expect.stringContaining('existing-user')
      );
    });
  });

  describe('getUserMapping', () => {
    it('should return user if found', async () => {
      const userData = {
        'user-123': {
          id: 'user-123',
          email: 'test@example.com',
          displayName: 'Test',
          lastUpdated: new Date().toISOString(),
        },
      };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(userData));

      const result = await getUserMapping('user-123');

      expect(result).toEqual({
        id: 'user-123',
        email: 'test@example.com',
        displayName: 'Test',
      });
    });

    it('should return null if user not found', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify({}));

      const result = await getUserMapping('unknown');

      expect(result).toBeNull();
    });

    it('should return null if no data stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await getUserMapping('user-123');

      expect(result).toBeNull();
    });
  });

  describe('signInAnonymouslyLocally', () => {
    it('should sign in anonymously and return user', async () => {
      const mockCredential = { user: mockUser };
      (signInAnonymously as jest.Mock).mockResolvedValue(mockCredential);
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      const result = await signInAnonymouslyLocally();

      expect(result).toEqual({
        id: mockUser.uid,
        email: mockUser.email,
        displayName: mockUser.displayName,
        photoURL: mockUser.photoURL,
      });
      expect(storeUserMapping).toHaveBeenCalledWith(result);
    });
  });

  describe('onAuthStateChangedListener', () => {
    it('should call callback with user when auth state changes', () => {
      const callback = jest.fn();
      const unsubscribe = jest.fn();
      (onAuthStateChanged as jest.Mock).mockReturnValue(unsubscribe);

      const result = onAuthStateChangedListener(callback);

      expect(result).toBe(unsubscribe);
      expect(onAuthStateChanged).toHaveBeenCalledWith(auth, expect.any(Function));

      // Simulate auth state change
      const listenerCallback = (onAuthStateChanged as jest.Mock).mock.calls[0][1];
      listenerCallback(mockUser);

      expect(callback).toHaveBeenCalledWith({
        id: mockUser.uid,
        email: mockUser.email,
        displayName: mockUser.displayName,
        photoURL: mockUser.photoURL,
      });
    });

    it('should call callback with null when user signs out', () => {
      const callback = jest.fn();
      const unsubscribe = jest.fn();
      (onAuthStateChanged as jest.Mock).mockReturnValue(unsubscribe);

      onAuthStateChangedListener(callback);

      const listenerCallback = (onAuthStateChanged as jest.Mock).mock.calls[0][1];
      listenerCallback(null);

      expect(callback).toHaveBeenCalledWith(null);
    });
  });
});
