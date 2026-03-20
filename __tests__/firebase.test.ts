import * as firebase from '../src/services/firebase';
import { auth } from '../src/services/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  signInAnonymously,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  connectAuthEmulator,
  getAuth,
  type User as FirebaseUser,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, Timestamp, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator, ref } from 'firebase/storage';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, AuthRequest } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';

// Mock all external dependencies before module under test executes
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
  getApps: jest.fn(() => []),
}));

jest.mock('firebase/auth', () => {
  const GoogleAuthProviderMock = jest.fn(() => ({})) as any;
  GoogleAuthProviderMock.credential = jest.fn();
  return {
    getAuth: jest.fn(() => ({})),
    signInAnonymously: jest.fn(),
    onAuthStateChanged: jest.fn(),
    GoogleAuthProvider: GoogleAuthProviderMock,
    signInWithCredential: jest.fn(),
    connectAuthEmulator: jest.fn(),
  };
});

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  connectFirestoreEmulator: jest.fn(),
  doc: jest.fn(() => ({})),
  setDoc: jest.fn(() => Promise.resolve()),
  Timestamp: {
    now: jest.fn(() => ({ toDate: () => new Date() })),
  },
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(() => ({})),
  connectStorageEmulator: jest.fn(),
  ref: jest.fn(() => ({})),
}));

jest.mock('expo-web-browser', () => ({
  maybeCompleteAuthSession: jest.fn(),
}));

jest.mock('expo-auth-session', () => ({
  makeRedirectUri: jest.fn(() => 'pictureshare://redirect'),
  AuthRequest: jest.fn().mockImplementation(() => ({
    promptAsync: jest.fn(),
  })),
}));

jest.mock('expo-auth-session/providers/google', () => ({
  Google: {
    discovery: {},
  },
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

  describe('firebase.storeUserMapping', () => {
    it('should store user mapping in AsyncStorage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      const user = {
        id: 'user-123',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'https://example.com/photo.jpg',
      };

      await firebase.storeUserMapping(user);

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

      await firebase.storeUserMapping({
        id: 'user-123',
        email: 'test@example.com',
      });

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'user_mapping',
        expect.stringContaining('existing-user')
      );
    });
  });

  describe('firebase.getUserMapping', () => {
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

      const result = await firebase.getUserMapping('user-123');

      expect(result).toEqual({
        id: 'user-123',
        email: 'test@example.com',
        displayName: 'Test',
        lastUpdated: expect.any(String),
      });
    });

    it('should return null if user not found', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify({}));

      const result = await firebase.getUserMapping('unknown');

      expect(result).toBeNull();
    });

    it('should return null if no data stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const result = await firebase.getUserMapping('user-123');

      expect(result).toBeNull();
    });
  });

  describe('firebase.signInAnonymouslyLocally', () => {
    it('should sign in anonymously and return user', async () => {
      const mockCredential = { user: mockUser };
      (signInAnonymously as jest.Mock).mockResolvedValue(mockCredential);
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      const result = await firebase.signInAnonymouslyLocally();

      expect(result).toEqual({
        id: mockUser.uid,
        email: mockUser.email,
        displayName: mockUser.displayName,
        photoURL: mockUser.photoURL,
      });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'user_mapping',
        expect.stringContaining(result.id)
      );
    });
  });

  describe('firebase.onAuthStateChangedListener', () => {
    it('should call callback with user when auth state changes', () => {
      const callback = jest.fn();
      const unsubscribe = jest.fn();
      (onAuthStateChanged as jest.Mock).mockReturnValue(unsubscribe);

      const result = firebase.onAuthStateChangedListener(callback);

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

      firebase.onAuthStateChangedListener(callback);

      const listenerCallback = (onAuthStateChanged as jest.Mock).mock.calls[0][1];
      listenerCallback(null);

      expect(callback).toHaveBeenCalledWith(null);
    });
  });

  describe('firebase.signInWithGoogle', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      (GoogleAuthProvider.credential as jest.Mock).mockClear();
      (signInWithCredential as jest.Mock).mockClear();
    });

    it('should successfully sign in with Google and return user', async () => {
      const mockIdToken = 'mock-id-token';
      const mockUserCredential = {
        user: {
          uid: 'google-user-123',
          email: 'google@example.com',
          displayName: 'Google User',
          photoURL: 'https://example.com/photo.jpg',
        },
      };

      // Set up mocks for this test
      (GoogleAuthProvider.credential as jest.Mock).mockReturnValue({});
      (signInWithCredential as jest.Mock).mockResolvedValue(mockUserCredential);

      // Mock firebase.storeUserMapping
      const storeUserMappingSpy = jest
        .spyOn(firebase, 'storeUserMapping')
        .mockResolvedValue(undefined);

      // Mock doc and setDoc
      const mockUserRef = { path: '' };
      (doc as jest.Mock).mockReturnValue(mockUserRef);
      (setDoc as jest.Mock).mockResolvedValue(undefined);

      // Set up AuthRequest mock
      (AuthRequest as jest.Mock).mockImplementation(() => ({
        promptAsync: jest.fn().mockResolvedValue({
          type: 'success',
          params: { id_token: mockIdToken },
        }),
      }));

      const result = await firebase.signInWithGoogle();

      expect(result).toEqual({
        id: mockUserCredential.user.uid,
        email: mockUserCredential.user.email,
        displayName: mockUserCredential.user.displayName,
        photoURL: mockUserCredential.user.photoURL,
      });
      expect(storeUserMappingSpy).toHaveBeenCalledWith(result);
      expect(setDoc).toHaveBeenCalledWith(
        mockUserRef,
        expect.objectContaining({
          id: result.id,
          email: result.email,
          displayName: result.displayName,
          photoURL: result.photoURL,
        })
      );
    });

    it('should throw error when user cancels Google sign-in', async () => {
      (AuthRequest as jest.Mock).mockImplementation(() => ({
        promptAsync: jest.fn().mockResolvedValue({ type: 'cancel' }),
      }));

      await expect(firebase.signInWithGoogle()).rejects.toThrow('User cancelled Google sign-in');
    });

    it('should throw error when Google sign-in fails', async () => {
      (AuthRequest as jest.Mock).mockImplementation(() => ({
        promptAsync: jest.fn().mockResolvedValue({ type: 'dismiss' }),
      }));

      await expect(firebase.signInWithGoogle()).rejects.toThrow('Google sign-in failed');
    });

    it('should throw error when no ID token received', async () => {
      (AuthRequest as jest.Mock).mockImplementation(() => ({
        promptAsync: jest.fn().mockResolvedValue({ type: 'success', params: {} }),
      }));

      await expect(firebase.signInWithGoogle()).rejects.toThrow('No ID token received from Google');
    });
  });
});
