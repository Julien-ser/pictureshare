import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithCredential,
  onAuthStateChanged,
  type Auth,
  type User as FirebaseUser,
} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { connectAuthEmulator } from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import { AuthRequest, makeRedirectUri, discover } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../types';

// Configure WebBrowser for auth
WebBrowser.maybeCompleteAuthSession();

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase (singleton)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth: Auth = getAuth(app);
export const db = getFirestore(app);

// Use emulators in development
if (__DEV__) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}

// Google provider for fallback auth
export const googleProvider = new GoogleAuthProvider();

// Local storage key for user mapping
const USER_MAPPING_KEY = 'user_mapping';

// Export the provider discovery for expo-auth-session
export { WebBrowser, Google };

// Convert Firebase user to app User type
function firebaseUserToAppUser(firebaseUser: FirebaseUser): User {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email ?? undefined,
    displayName: firebaseUser.displayName ?? undefined,
    photoURL: firebaseUser.photoURL ?? undefined,
  };
}

// Store user mapping locally (User object)
export async function storeUserMapping(user: User): Promise<void> {
  try {
    const existing = await AsyncStorage.getItem(USER_MAPPING_KEY);
    const mappings = existing ? JSON.parse(existing) : {};
    mappings[user.id] = {
      ...user,
      lastUpdated: new Date().toISOString(),
    };
    await AsyncStorage.setItem(USER_MAPPING_KEY, JSON.stringify(mappings));
  } catch (error) {
    console.error('Error storing user mapping:', error);
  }
}

// Get user mapping from local storage
export async function getUserMapping(uid: string): Promise<User | null> {
  try {
    const stored = await AsyncStorage.getItem(USER_MAPPING_KEY);
    if (!stored) return null;
    const mappings = JSON.parse(stored);
    return mappings[uid] || null;
  } catch (error) {
    console.error('Error getting user mapping:', error);
    return null;
  }
}

// Sign in anonymously
export async function signInAnonymouslyLocally(): Promise<User> {
  const userCredential = await signInAnonymously(auth);
  const appUser = firebaseUserToAppUser(userCredential.user);

  // Store minimal user info
  await storeUserMapping(appUser);

  return appUser;
}

// Sign in with Google (placeholder - requires expo-auth-session integration)
export async function signInWithGoogle(): Promise<User> {
  // This will be implemented in a future iteration with expo-auth-session
  throw new Error('Google Sign-In not yet implemented');
}

// Auth state change listener - converts Firebase user to app User
export function onAuthStateChangedListener(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      callback(firebaseUserToAppUser(firebaseUser));
    } else {
      callback(null);
    }
  });
}
