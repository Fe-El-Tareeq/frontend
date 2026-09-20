import { openDB, type DBSchema, type IDBPDatabase } from "idb";

export const OFFLINE_SCHEMA_VERSION = 1;
const DB_NAME = "bitareeqak-offline";

export interface ResourceCacheRecord {
  id: string;
  namespace: string;
  userId: string;
  environment: string;
  cacheKey: string;
  data: unknown;
  cachedAt: number;
  lastSyncedAt: number;
  schemaVersion: number;
  expiresAt?: number;
}

export interface SyncMetaRecord {
  id: string;
  namespace: string;
  key: string;
  value: unknown;
  updatedAt: number;
}

interface OfflineDatabase extends DBSchema {
  resource_cache: {
    key: string;
    value: ResourceCacheRecord;
    indexes: { namespace: string; expiresAt: number };
  };
  sync_meta: {
    key: string;
    value: SyncMetaRecord;
    indexes: { namespace: string };
  };
}

let databasePromise: Promise<IDBPDatabase<OfflineDatabase>> | null = null;
let storageDisabled = false;

export function createNamespace(userId: string, environment: string): string {
  return `${encodeURIComponent(environment)}::${encodeURIComponent(userId)}`;
}

function getDatabase() {
  if (storageDisabled || typeof indexedDB === "undefined") return null;
  databasePromise ??= openDB<OfflineDatabase>(DB_NAME, OFFLINE_SCHEMA_VERSION, {
    upgrade(database) {
      if (!database.objectStoreNames.contains("resource_cache")) {
        const resources = database.createObjectStore("resource_cache", { keyPath: "id" });
        resources.createIndex("namespace", "namespace");
        resources.createIndex("expiresAt", "expiresAt");
      }
      if (!database.objectStoreNames.contains("sync_meta")) {
        const metadata = database.createObjectStore("sync_meta", { keyPath: "id" });
        metadata.createIndex("namespace", "namespace");
      }
    },
    blocked() {
      storageDisabled = true;
    },
  }).catch((error) => {
    storageDisabled = true;
    databasePromise = null;
    console.warn("Offline storage is unavailable; continuing online-only.", error);
    throw error;
  });
  return databasePromise;
}

async function withDatabase<T>(
  operation: (database: IDBPDatabase<OfflineDatabase>) => Promise<T>,
  fallback: T,
) {
  try {
    const database = getDatabase();
    return database ? await operation(await database) : fallback;
  } catch {
    return fallback;
  }
}

export async function putResource(record: Omit<ResourceCacheRecord, "id" | "schemaVersion">) {
  return withDatabase(async (database) => {
    await database.put("resource_cache", {
      ...record,
      id: `${record.namespace}::${record.cacheKey}`,
      schemaVersion: OFFLINE_SCHEMA_VERSION,
    });
    return true;
  }, false);
}

export async function getResources(namespace: string, now = Date.now()) {
  return withDatabase(async (database) => {
    const records = await database.getAllFromIndex("resource_cache", "namespace", namespace);
    return records.filter((record) => !record.expiresAt || record.expiresAt > now);
  }, [] as ResourceCacheRecord[]);
}

export async function putSyncMeta(record: Omit<SyncMetaRecord, "id">) {
  return withDatabase(async (database) => {
    await database.put("sync_meta", { ...record, id: `${record.namespace}::${record.key}` });
    return true;
  }, false);
}

export async function getSyncMeta(namespace: string, key: string) {
  return withDatabase(
    (database) => database.get("sync_meta", `${namespace}::${key}`),
    undefined as SyncMetaRecord | undefined,
  );
}

export async function purgeNamespace(namespace: string) {
  return withDatabase(async (database) => {
    const transaction = database.transaction(["resource_cache", "sync_meta"], "readwrite");
    const resources = await transaction.objectStore("resource_cache").index("namespace").getAllKeys(namespace);
    const metadata = await transaction.objectStore("sync_meta").index("namespace").getAllKeys(namespace);
    for (const key of resources) await transaction.objectStore("resource_cache").delete(key);
    for (const key of metadata) await transaction.objectStore("sync_meta").delete(key);
    await transaction.done;
    return true;
  }, false);
}

export async function purgeUserOfflineData(userId: string, environment: string) {
  localStorage.removeItem("bitareeqak-notifications");
  for (let index = localStorage.length - 1; index >= 0; index -= 1) {
    const key = localStorage.key(index);
    if (key?.startsWith("btareeqak_chat_msgs_") || key?.startsWith("btareeqak_voice_")) {
      localStorage.removeItem(key);
    }
  }
  return purgeNamespace(createNamespace(userId, environment));
}

export function resetOfflineStorageForTests() {
  databasePromise = null;
  storageDisabled = false;
}
