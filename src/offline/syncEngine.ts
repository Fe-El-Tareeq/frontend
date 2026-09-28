import { withStore } from './db';
import { clearAllCache } from './cacheManager';
import {
  STORES,
  MAX_OFFLINE_DURATION_MS,
  type OfflineMutation,
  type OfflineMetadata,
  type MutationStatus,
} from '../types/offline';
import type { AxiosInstance } from 'axios';

const META_KEY = 'offline_metadata';

/**
 * Retrieves the current offline metadata from IndexedDB.
 */
export async function getOfflineMetadata(): Promise<OfflineMetadata> {
  try {
    const meta = await withStore<OfflineMetadata | undefined>(
      STORES.META,
      'readonly',
      (store) => {
        return new Promise((resolve, reject) => {
          const request = store.get(META_KEY);
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      },
    );

    if (meta) return meta;

    // Default metadata
    const defaultMeta: OfflineMetadata = {
      firstOfflineAt: null,
      lastOnlineAt: Date.now(),
      lastSyncAt: null,
      lastPurgedAt: null,
      lastPurgeReason: null,
    };
    return defaultMeta;
  } catch {
    return {
      firstOfflineAt: null,
      lastOnlineAt: Date.now(),
      lastSyncAt: null,
      lastPurgedAt: null,
    };
  }
}

/**
 * Updates offline metadata in IndexedDB.
 */
export async function setOfflineMetadata(
  updates: Partial<OfflineMetadata>,
): Promise<OfflineMetadata> {
  const current = await getOfflineMetadata();
  const nextMeta: OfflineMetadata & { id: string } = {
    ...current,
    ...updates,
    id: META_KEY,
  };

  await withStore(STORES.META, 'readwrite', (store) => {
    store.put(nextMeta);
  });

  return nextMeta;
}

/**
 * Marks network state as offline, recording the first offline timestamp if not already set.
 */
export async function recordNetworkOffline(): Promise<OfflineMetadata> {
  const meta = await getOfflineMetadata();
  const now = Date.now();

  const nextFirstOffline = meta.firstOfflineAt ?? now;
  return setOfflineMetadata({
    firstOfflineAt: nextFirstOffline,
  });
}

/**
 * Marks network state as online, resetting firstOfflineAt and updating lastOnlineAt.
 */
export async function recordNetworkOnline(): Promise<OfflineMetadata> {
  const now = Date.now();
  return setOfflineMetadata({
    firstOfflineAt: null,
    lastOnlineAt: now,
  });
}

/**
 * 48-Hour Expiry Rule Check & Enforcement:
 * Evaluates whether offline duration or pending mutations have exceeded 48 hours.
 * If exceeded: purges all pending sync mutations and stale offline cache.
 */
export async function checkAndEnforce48hRule(): Promise<{
  expired: boolean;
  purgedMutationsCount: number;
  hoursElapsed: number;
}> {
  const meta = await getOfflineMetadata();
  const now = Date.now();

  let isExpired = false;
  let hoursElapsed = 0;

  if (meta.firstOfflineAt) {
    const elapsedMs = now - meta.firstOfflineAt;
    hoursElapsed = elapsedMs / (1000 * 60 * 60);

    if (elapsedMs > MAX_OFFLINE_DURATION_MS) {
      isExpired = true;
    }
  }

  // Also check if any individual mutation is older than 48 hours
  const allMutations = await getAllMutations();
  const hasExpiredMutation = allMutations.some(
    (m) => now - m.timestamp > MAX_OFFLINE_DURATION_MS,
  );

  if (isExpired || hasExpiredMutation) {
    const purgedCount = allMutations.length;

    // Purge sync queue and cache
    await clearSyncQueue();
    await clearAllCache();

    await setOfflineMetadata({
      firstOfflineAt: null,
      lastPurgedAt: now,
      lastPurgeReason: 'EXCEEDED_48_HOURS_OFFLINE',
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('btareeqak:offline-48h-expired', {
          detail: {
            purgedCount,
            hoursElapsed,
          },
        }),
      );
    }

    return {
      expired: true,
      purgedMutationsCount: purgedCount,
      hoursElapsed,
    };
  }

  return {
    expired: false,
    purgedMutationsCount: 0,
    hoursElapsed,
  };
}

/**
 * Calculates remaining hours and minutes until the 48-hour offline limit expires.
 */
export async function getOfflineRemainingTime(): Promise<{
  hoursRemaining: number;
  minutesRemaining: number;
  isExpired: boolean;
  firstOfflineAt: number | null;
}> {
  const meta = await getOfflineMetadata();
  if (!meta.firstOfflineAt) {
    return {
      hoursRemaining: 48,
      minutesRemaining: 0,
      isExpired: false,
      firstOfflineAt: null,
    };
  }

  const now = Date.now();
  const elapsedMs = now - meta.firstOfflineAt;
  const remainingMs = Math.max(0, MAX_OFFLINE_DURATION_MS - elapsedMs);

  const hoursRemaining = Math.floor(remainingMs / (1000 * 60 * 60));
  const minutesRemaining = Math.floor(
    (remainingMs % (1000 * 60 * 60)) / (1000 * 60),
  );

  return {
    hoursRemaining,
    minutesRemaining,
    isExpired: remainingMs <= 0,
    firstOfflineAt: meta.firstOfflineAt,
  };
}

/**
 * Enqueues an offline mutation into the IndexedDB sync queue.
 */
export async function enqueueOfflineMutation<T = unknown>(
  mutation: Omit<OfflineMutation<T>, 'id' | 'timestamp' | 'retryCount' | 'status'> & {
    id?: string;
    timestamp?: number;
  },
): Promise<OfflineMutation<T>> {
  const meta = await getOfflineMetadata();
  if (!meta.firstOfflineAt) {
    await recordNetworkOffline();
  }

  const fullMutation: OfflineMutation<T> = {
    ...mutation,
    id: mutation.id || `mut_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    timestamp: mutation.timestamp || Date.now(),
    retryCount: 0,
    status: 'pending',
  };

  await withStore(STORES.SYNC_QUEUE, 'readwrite', (store) => {
    store.put(fullMutation);
  });

  // Request Service Worker background sync if supported
  requestBackgroundSync();

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('btareeqak:mutation-queued', {
        detail: { mutation: fullMutation },
      }),
    );
  }

  return fullMutation;
}

/**
 * Retrieves all mutations in the sync queue.
 */
export async function getAllMutations(): Promise<OfflineMutation[]> {
  return withStore<OfflineMutation[]>(STORES.SYNC_QUEUE, 'readonly', (store) => {
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  });
}

/**
 * Retrieves pending and retryable failed mutations sorted in chronological order (FIFO).
 */
export async function getPendingMutations(): Promise<OfflineMutation[]> {
  const all = await getAllMutations();
  return all
    .filter((m) => m.status === 'pending' || m.status === 'failed')
    .sort((a, b) => a.timestamp - b.timestamp);
}

/**
 * Updates a mutation's status and optional error/retryCount.
 */
export async function updateMutationStatus(
  id: string,
  status: MutationStatus,
  error?: string | null,
): Promise<void> {
  await withStore(STORES.SYNC_QUEUE, 'readwrite', async (store) => {
    return new Promise((resolve, reject) => {
      const getReq = store.get(id);
      getReq.onsuccess = () => {
        const item: OfflineMutation | undefined = getReq.result;
        if (!item) {
          resolve(undefined);
          return;
        }

        item.status = status;
        if (error !== undefined) item.error = error;
        if (status === 'failed') item.retryCount = (item.retryCount || 0) + 1;

        const putReq = store.put(item);
        putReq.onsuccess = () => resolve(undefined);
        putReq.onerror = () => reject(putReq.error);
      };
      getReq.onerror = () => reject(getReq.error);
    });
  });
}

/**
 * Removes a mutation from the queue after successful sync or rejection.
 */
export async function removeMutation(id: string): Promise<void> {
  await withStore(STORES.SYNC_QUEUE, 'readwrite', (store) => {
    store.delete(id);
  });
}

/**
 * Clears the entire sync queue.
 */
export async function clearSyncQueue(): Promise<void> {
  await withStore(STORES.SYNC_QUEUE, 'readwrite', (store) => {
    store.clear();
  });
}

/**
 * Replays and synchronizes all pending mutations against the backend API.
 */
let isSyncInProgress = false;

export async function processSyncQueue(apiClient: AxiosInstance): Promise<{
  synced: number;
  failed: number;
  purged: number;
}> {
  if (isSyncInProgress) {
    return { synced: 0, failed: 0, purged: 0 };
  }

  // If offline, cannot sync now
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return { synced: 0, failed: 0, purged: 0 };
  }

  // 1. Enforce 48-hour rule first
  const ruleResult = await checkAndEnforce48hRule();
  if (ruleResult.expired) {
    return { synced: 0, failed: 0, purged: ruleResult.purgedMutationsCount };
  }

  const pending = await getPendingMutations();
  if (pending.length === 0) {
    await recordNetworkOnline();
    return { synced: 0, failed: 0, purged: 0 };
  }

  isSyncInProgress = true;
  let synced = 0;
  let failed = 0;

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('btareeqak:sync-started', {
        detail: { totalCount: pending.length },
      }),
    );
  }

  try {
    for (const mutation of pending) {
      await updateMutationStatus(mutation.id, 'syncing');

      try {
        await apiClient.request({
          url: mutation.endpoint,
          method: mutation.method,
          data: mutation.payload,
          headers: mutation.headers,
        });

        // Successfully synced -> Remove from IndexedDB queue
        await removeMutation(mutation.id);
        synced++;
      } catch (error: any) {
        // If network went offline during batch, stop processing remaining items
        if (!navigator.onLine || error?.code === 'ERR_NETWORK' || error?.message === 'Network Error') {
          await updateMutationStatus(mutation.id, 'pending', 'Network interrupted');
          break;
        }

        // Permanent client error (4xx) - Remove or mark failed to prevent blocking queue
        const status = error?.response?.status;
        const errorMessage = error?.response?.data?.message || error?.message || 'Sync failed';

        if (status && status >= 400 && status < 500) {
          // Unrecoverable validation / business logic error
          console.error(`[Offline Sync] Permanent error on mutation ${mutation.id}:`, errorMessage);
          await removeMutation(mutation.id);
          failed++;
        } else {
          // Transient 5xx server error
          await updateMutationStatus(mutation.id, 'failed', errorMessage);
          failed++;
        }
      }
    }

    const now = Date.now();
    await setOfflineMetadata({
      lastSyncAt: now,
      firstOfflineAt: null,
      lastOnlineAt: now,
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('btareeqak:sync-completed', {
          detail: { synced, failed, purged: 0 },
        }),
      );
    }
  } finally {
    isSyncInProgress = false;
  }

  return { synced, failed, purged: 0 };
}

/**
 * Triggers Service Worker Background Sync if supported.
 */
export function requestBackgroundSync(): void {
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'SyncManager' in window
  ) {
    navigator.serviceWorker.ready
      .then((reg: any) => {
        if (reg.sync) {
          return reg.sync.register('btareeqak-sync-queue');
        }
      })
      .catch((err) => {
        console.warn('[PWA Background Sync] Registration failed:', err);
      });
  }
}
