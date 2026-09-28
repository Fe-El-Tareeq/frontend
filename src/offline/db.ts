import { DB_NAME, DB_VERSION, STORES } from '../types/offline';

let dbPromise: Promise<IDBDatabase> | null = null;

/**
 * Initializes and returns a singleton connection to the IndexedDB database.
 */
export function getDb(): Promise<IDBDatabase> {
  if (typeof window === 'undefined' || !('indexedDB' in window)) {
    return Promise.reject(new Error('IndexedDB is not supported in this environment'));
  }

  if (dbPromise) {
    return dbPromise;
  }

  dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // 1. Store for API Cache (key: string URL/cacheKey)
      if (!db.objectStoreNames.contains(STORES.CACHE)) {
        db.createObjectStore(STORES.CACHE, { keyPath: 'key' });
      }

      // 2. Store for Offline Sync Queue (key: id)
      if (!db.objectStoreNames.contains(STORES.SYNC_QUEUE)) {
        const syncStore = db.createObjectStore(STORES.SYNC_QUEUE, { keyPath: 'id' });
        syncStore.createIndex('timestamp', 'timestamp', { unique: false });
        syncStore.createIndex('status', 'status', { unique: false });
      }

      // 3. Store for Metadata (key: id/key)
      if (!db.objectStoreNames.contains(STORES.META)) {
        db.createObjectStore(STORES.META, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.onversionchange = () => {
        db.close();
        dbPromise = null;
      };
      resolve(db);
    };

    request.onerror = (event) => {
      dbPromise = null;
      reject((event.target as IDBOpenDBRequest).error);
    };

    request.onblocked = () => {
      console.warn('IndexedDB database open request blocked.');
    };
  });

  return dbPromise;
}

/**
 * Executes a transaction against a specific object store.
 */
export async function withStore<T>(
  storeName: (typeof STORES)[keyof typeof STORES],
  mode: IDBTransactionMode,
  callback: (store: IDBObjectStore) => Promise<T> | T,
): Promise<T> {
  const db = await getDb();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);

    let result: T;
    let callbackPromise: Promise<T> | null = null;

    try {
      const cbResult = callback(store);
      if (cbResult instanceof Promise) {
        callbackPromise = cbResult;
      } else {
        result = cbResult;
      }
    } catch (err) {
      reject(err);
      return;
    }

    tx.oncomplete = async () => {
      try {
        if (callbackPromise) {
          resolve(await callbackPromise);
        } else {
          resolve(result);
        }
      } catch (err) {
        reject(err);
      }
    };

    tx.onerror = () => {
      reject(tx.error);
    };

    tx.onabort = () => {
      reject(new Error(`IndexedDB transaction aborted on store: ${storeName}`));
    };
  });
}

/**
 * Resets database singleton (useful for unit tests)
 */
export function resetDbInstance() {
  dbPromise = null;
}
