import { useEffect } from 'react';
import { useOfflineStore } from '../store/useOfflineStore';

export function useNetworkStatus() {
  const isOnline = useOfflineStore((s) => s.isOnline);
  const pendingCount = useOfflineStore((s) => s.pendingCount);
  const isSyncing = useOfflineStore((s) => s.isSyncing);
  const offlineSince = useOfflineStore((s) => s.offlineSince);
  const hoursRemaining = useOfflineStore((s) => s.hoursRemaining);
  const minutesRemaining = useOfflineStore((s) => s.minutesRemaining);
  const isExpired48h = useOfflineStore((s) => s.isExpired48h);
  const purgedCount = useOfflineStore((s) => s.purgedCount);
  const lastSyncAt = useOfflineStore((s) => s.lastSyncAt);
  const lastSyncResult = useOfflineStore((s) => s.lastSyncResult);
  const showExpiredNotice = useOfflineStore((s) => s.showExpiredNotice);

  const initialize = useOfflineStore((s) => s.initialize);
  const setOnlineState = useOfflineStore((s) => s.setOnlineState);
  const triggerSync = useOfflineStore((s) => s.triggerSync);
  const dismissExpiredNotice = useOfflineStore((s) => s.dismissExpiredNotice);
  const refreshPendingCount = useOfflineStore((s) => s.refreshPendingCount);
  const updateRemainingTime = useOfflineStore((s) => s.updateRemainingTime);

  useEffect(() => {
    // Initial load
    initialize();

    const handleOnline = () => {
      setOnlineState(true);
    };

    const handleOffline = () => {
      setOnlineState(false);
    };

    const handleMutationQueued = () => {
      refreshPendingCount();
      updateRemainingTime();
    };

    const handleExpired = () => {
      useOfflineStore.getState().check48hStatus();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('btareeqak:mutation-queued', handleMutationQueued);
    window.addEventListener('btareeqak:offline-48h-expired', handleExpired);

    // Periodic check every 60 seconds to update remaining hours/minutes and enforce 48h limit
    const interval = setInterval(() => {
      updateRemainingTime();
    }, 60 * 1000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('btareeqak:mutation-queued', handleMutationQueued);
      window.removeEventListener('btareeqak:offline-48h-expired', handleExpired);
      clearInterval(interval);
    };
  }, [initialize, setOnlineState, refreshPendingCount, updateRemainingTime]);

  return {
    isOnline,
    isOffline: !isOnline,
    pendingCount,
    isSyncing,
    offlineSince,
    hoursRemaining,
    minutesRemaining,
    isExpired48h,
    purgedCount,
    lastSyncAt,
    lastSyncResult,
    showExpiredNotice,
    triggerSync,
    dismissExpiredNotice,
  };
}
