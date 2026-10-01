import { create } from 'zustand';
import {
  getPendingMutations,
  getOfflineRemainingTime,
  checkAndEnforce48hRule,
  processSyncQueue,
  getOfflineMetadata,
  recordNetworkOffline,
  recordNetworkOnline,
} from '../offline/syncEngine';
import { apiClient } from '../api/client';

interface OfflineStoreState {
  isOnline: boolean;
  pendingCount: number;
  isSyncing: boolean;
  offlineSince: number | null;
  hoursRemaining: number;
  minutesRemaining: number;
  isExpired48h: boolean;
  purgedCount: number;
  lastSyncAt: number | null;
  lastSyncResult: { synced: number; failed: number; purged: number } | null;
  showExpiredNotice: boolean;

  // Actions
  initialize: () => Promise<void>;
  setOnlineState: (isOnline: boolean) => Promise<void>;
  refreshPendingCount: () => Promise<void>;
  updateRemainingTime: () => Promise<void>;
  triggerSync: () => Promise<{ synced: number; failed: number; purged: number }>;
  dismissExpiredNotice: () => void;
  check48hStatus: () => Promise<void>;
}

export const useOfflineStore = create<OfflineStoreState>((set, get) => ({
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  pendingCount: 0,
  isSyncing: false,
  offlineSince: null,
  hoursRemaining: 48,
  minutesRemaining: 0,
  isExpired48h: false,
  purgedCount: 0,
  lastSyncAt: null,
  lastSyncResult: null,
  showExpiredNotice: false,

  initialize: async () => {
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    const meta = await getOfflineMetadata();

    // Check if 48h exceeded
    const ruleCheck = await checkAndEnforce48hRule();
    if (ruleCheck.expired) {
      set({
        isExpired48h: true,
        purgedCount: ruleCheck.purgedMutationsCount,
        showExpiredNotice: true,
        pendingCount: 0,
        hoursRemaining: 0,
        minutesRemaining: 0,
      });
    } else {
      const remaining = await getOfflineRemainingTime();
      const pending = await getPendingMutations();
      set({
        isOnline,
        offlineSince: meta.firstOfflineAt,
        hoursRemaining: remaining.hoursRemaining,
        minutesRemaining: remaining.minutesRemaining,
        isExpired48h: false,
        pendingCount: pending.length,
        lastSyncAt: meta.lastSyncAt,
      });

      // Auto-sync if online and has pending items
      if (isOnline && pending.length > 0) {
        get().triggerSync();
      }
    }
  },

  setOnlineState: async (isOnline: boolean) => {
    if (isOnline) {
      await recordNetworkOnline();
      set({ isOnline: true });
      await get().refreshPendingCount();
      await get().triggerSync();
    } else {
      await recordNetworkOffline();
      const meta = await getOfflineMetadata();
      const remaining = await getOfflineRemainingTime();
      set({
        isOnline: false,
        offlineSince: meta.firstOfflineAt,
        hoursRemaining: remaining.hoursRemaining,
        minutesRemaining: remaining.minutesRemaining,
      });
      await get().refreshPendingCount();
    }
  },

  refreshPendingCount: async () => {
    const pending = await getPendingMutations();
    set({ pendingCount: pending.length });
  },

  updateRemainingTime: async () => {
    const check = await checkAndEnforce48hRule();
    if (check.expired) {
      set({
        isExpired48h: true,
        purgedCount: check.purgedMutationsCount,
        showExpiredNotice: true,
        pendingCount: 0,
        hoursRemaining: 0,
        minutesRemaining: 0,
      });
      return;
    }

    const remaining = await getOfflineRemainingTime();
    set({
      hoursRemaining: remaining.hoursRemaining,
      minutesRemaining: remaining.minutesRemaining,
      isExpired48h: remaining.isExpired,
    });
  },

  triggerSync: async () => {
    if (get().isSyncing) {
      return { synced: 0, failed: 0, purged: 0 };
    }

    set({ isSyncing: true });
    try {
      const result = await processSyncQueue(apiClient);
      const pending = await getPendingMutations();
      const meta = await getOfflineMetadata();

      set({
        pendingCount: pending.length,
        lastSyncAt: meta.lastSyncAt,
        lastSyncResult: result,
      });

      return result;
    } finally {
      set({ isSyncing: false });
    }
  },

  dismissExpiredNotice: () => {
    set({ showExpiredNotice: false });
  },

  check48hStatus: async () => {
    const check = await checkAndEnforce48hRule();
    if (check.expired) {
      set({
        isExpired48h: true,
        purgedCount: check.purgedMutationsCount,
        showExpiredNotice: true,
        pendingCount: 0,
        hoursRemaining: 0,
        minutesRemaining: 0,
      });
    } else {
      await get().updateRemainingTime();
    }
  },
}));
