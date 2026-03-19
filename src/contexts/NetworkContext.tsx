import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { initializeOfflineQueue, getOfflineQueueCount } from '../services/offlineQueue';

interface NetworkContextType {
  isConnected: boolean | null;
  isOnline: boolean;
  pendingUploads: number;
  refreshPendingCount: () => Promise<void>;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [pendingUploads, setPendingUploads] = useState(0);

  const refreshPendingCount = useCallback(async () => {
    const count = await getOfflineQueueCount();
    setPendingUploads(count);
  }, []);

  useEffect(() => {
    // Initialize offline queue on startup
    initializeOfflineQueue().then(() => {
      refreshPendingCount();
    });

    // Subscribe to network changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      const online = state.isConnected ?? false;
      setIsConnected(online);

      // When we come back online, process the queue and refresh count
      if (online) {
        setTimeout(async () => {
          await initializeOfflineQueue();
          refreshPendingCount();
        }, 1000); // Small delay to ensure network is stable
      }
    });

    // Get initial network state
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, [refreshPendingCount]);

  const isOnline = isConnected === true;

  return (
    <NetworkContext.Provider
      value={{
        isConnected,
        isOnline,
        pendingUploads,
        refreshPendingCount,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
}
