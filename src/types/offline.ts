export type OfflineMutationType =
  | 'CREATE_ERRAND'
  | 'UPDATE_ERRAND'
  | 'CANCEL_ERRAND'
  | 'CREATE_TRIP'
  | 'UPDATE_TRIP'
  | 'CANCEL_TRIP'
  | 'SUBMIT_PROPOSAL'
  | 'ACCEPT_PROPOSAL'
  | 'REJECT_PROPOSAL'
  | 'WITHDRAW_PROPOSAL'
  | 'SEND_CHAT_MESSAGE'
  | 'SEND_SUPPORT_MESSAGE'
  | 'SUBMIT_RATING'
  | 'UPDATE_PROFILE'
  | 'UPDATE_NOTIFICATION_SETTINGS'
  | 'SUBMIT_REPORT'
  | 'GENERIC_MUTATION';

export type MutationStatus = 'pending' | 'syncing' | 'failed' | 'completed';

export interface OfflineMutation<T = unknown> {
  id: string;
  type: OfflineMutationType;
  endpoint: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  payload: T;
  headers?: Record<string, string>;
  timestamp: number; // Date.now() when queued
  retryCount: number;
  status: MutationStatus;
  error?: string | null;
  entityId?: string; // Optional temporary ID for optimistic UI
  descriptionAr: string; // Arabic description for UI feedback
}

export interface CachedItem<T = unknown> {
  key: string;
  data: T;
  cachedAt: number;
  ttl?: number; // Time-to-live in ms (optional)
}

export interface OfflineMetadata {
  firstOfflineAt: number | null;
  lastOnlineAt: number;
  lastSyncAt: number | null;
  lastPurgedAt: number | null;
  lastPurgeReason?: string | null;
}

export interface OfflineSyncStatus {
  isOnline: boolean;
  offlineSince: number | null;
  hoursRemainingUntil48h: number;
  isExpired48h: boolean;
  pendingCount: number;
  isSyncing: boolean;
  lastSyncAt: number | null;
  lastSyncResult?: {
    synced: number;
    failed: number;
    purged: number;
  } | null;
}

// 48 hours in milliseconds (48 * 60 * 60 * 1000)
export const MAX_OFFLINE_DURATION_MS = 48 * 60 * 60 * 1000;
export const DB_NAME = 'btareeqak_offline_db';
export const DB_VERSION = 1;

export const STORES = {
  CACHE: 'cache',
  SYNC_QUEUE: 'sync_queue',
  META: 'meta',
} as const;
