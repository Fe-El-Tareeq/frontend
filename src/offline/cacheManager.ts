import { withStore } from './db';
import { STORES, type CachedItem } from '../types/offline';

/**
 * Stores a value in the offline cache.
 */
export async function setCachedData<T = unknown>(
  key: string,
  data: T,
  ttlMs?: number,
): Promise<void> {
  const item: CachedItem<T> = {
    key,
    data,
    cachedAt: Date.now(),
    ttl: ttlMs,
  };

  await withStore(STORES.CACHE, 'readwrite', (store) => {
    store.put(item);
  });
}

/**
 * Retrieves a cached item if valid (not expired by TTL).
 */
export async function getCachedData<T = unknown>(key: string): Promise<T | null> {
  try {
    const item = await withStore<CachedItem<T> | undefined>(
      STORES.CACHE,
      'readonly',
      (store) => {
        return new Promise((resolve, reject) => {
          const request = store.get(key);
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      },
    );

    if (!item) return null;

    // If item has a specific TTL and it has passed
    if (item.ttl && Date.now() - item.cachedAt > item.ttl) {
      // Async delete stale item
      removeCachedData(key).catch(() => {});
      return null;
    }

    return item.data;
  } catch (error) {
    console.warn(`[Offline Cache] Error reading key "${key}":`, error);
    return null;
  }
}

/**
 * Removes a single cached entry.
 */
export async function removeCachedData(key: string): Promise<void> {
  await withStore(STORES.CACHE, 'readwrite', (store) => {
    store.delete(key);
  });
}

/**
 * Clears all cached items from the offline cache store.
 */
export async function clearAllCache(): Promise<void> {
  await withStore(STORES.CACHE, 'readwrite', (store) => {
    store.clear();
  });
}

/**
 * Returns all cached items in the store (useful for debugging/inspection).
 */
export async function getAllCachedItems(): Promise<CachedItem[]> {
  return withStore<CachedItem[]>(STORES.CACHE, 'readonly', (store) => {
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  });
}
