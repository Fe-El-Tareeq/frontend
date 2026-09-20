import type { QueryKey } from "@tanstack/react-query";

export interface CachePolicy {
  ttlMs: number;
  sensitivity: "normal" | "stale-sensitive";
}

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;

const policies: Record<string, CachePolicy> = {
  auth: { ttlMs: 24 * HOUR, sensitivity: "normal" },
  errands: { ttlMs: 15 * MINUTE, sensitivity: "stale-sensitive" },
  trips: { ttlMs: 15 * MINUTE, sensitivity: "stale-sensitive" },
  assignments: { ttlMs: 5 * MINUTE, sensitivity: "stale-sensitive" },
  chat: { ttlMs: 24 * HOUR, sensitivity: "normal" },
  messages: { ttlMs: 24 * HOUR, sensitivity: "normal" },
  notifications: { ttlMs: 30 * MINUTE, sensitivity: "normal" },
  locations: { ttlMs: 7 * 24 * HOUR, sensitivity: "normal" },
  support: { ttlMs: 7 * 24 * HOUR, sensitivity: "normal" },
};

export function getCachePolicy(queryKey: QueryKey): CachePolicy | null {
  return policies[String(queryKey[0] ?? "")] ?? null;
}

export function isPersistableQuery(queryKey: QueryKey): boolean {
  return getCachePolicy(queryKey) !== null;
}
