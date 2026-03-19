import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  onAuthStateChangedListener,
  signInAnonymouslyLocally,
  signInWithGoogle as signInWithGoogleService,
} from '../services/firebase';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInAnonymously: () => Promise<User>;
  signInWithGoogle: () => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInAnonymously = async (): Promise<User> => {
    const user = await signInAnonymouslyLocally();
    setUser(user);
    return user;
  };

  const signInWithGoogle = async (): Promise<User> => {
    const user = await signInWithGoogleService();
    setUser(user);
    return user;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInAnonymously, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
