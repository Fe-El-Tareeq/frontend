import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useQueryClient, type Query } from "@tanstack/react-query";
import { API_BASE_URL } from "../api/endpoints";
import { useAuthStore } from "../store/useAuthStore";
import { getCachePolicy, isPersistableQuery } from "./cachePolicy";
import { connectivityMonitor } from "./connectivity";
import { OfflineContext } from "./offlineContext";
import {
  createNamespace,
  getResources,
  getSyncMeta,
  putResource,
  putSyncMeta,
} from "./storage";

function cacheKey(query: Query) {
  return JSON.stringify(query.queryKey);
}

async function controlledRefresh(queryClient: ReturnType<typeof useQueryClient>) {
  const queries = queryClient
    .getQueryCache()
    .findAll({ type: "active", stale: true })
    .filter((query) => isPersistableQuery(query.queryKey));
  for (const query of queries) {
    await query.fetch().catch(() => undefined);
    await new Promise((resolve) => window.setTimeout(resolve, 100));
  }
}

export function OfflineDataProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);
  const status = useSyncExternalStore(
    connectivityMonitor.subscribe,
    connectivityMonitor.getSnapshot,
    () => "ONLINE" as const,
  );
  const previousStatus = useRef(status);
  const previousUserId = useRef(userId);
  const [hydrated, setHydrated] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<number>();
  const namespace = userId ? createNamespace(userId, API_BASE_URL) : null;

  useEffect(() => connectivityMonitor.start(), []);

  useEffect(() => {
    if (previousUserId.current !== userId) {
      queryClient.clear();
      previousUserId.current = userId;
    }
  }, [queryClient, userId]);

  useEffect(() => {
    let cancelled = false;
    setHydrated(false);
    if (!namespace) {
      setHydrated(true);
      setLastSyncedAt(undefined);
      return;
    }
    void Promise.all([getResources(namespace), getSyncMeta(namespace, "last-sync")]).then(
      ([records, metadata]) => {
        if (cancelled) return;
        for (const record of records) {
          try {
            queryClient.setQueryData(JSON.parse(record.cacheKey), record.data, {
              updatedAt: record.lastSyncedAt,
            });
          } catch {
            // Ignore a corrupt record; the next online fetch replaces it.
          }
        }
        setLastSyncedAt(metadata?.updatedAt);
        setHydrated(true);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [namespace, queryClient]);

  useEffect(() => {
    if (!namespace) return;
    return queryClient.getQueryCache().subscribe((event) => {
      const query = event.query;
      const policy = getCachePolicy(query.queryKey);
      if (!policy || query.state.status !== "success" || query.state.data === undefined) return;
      const now = Date.now();
      void putResource({
        namespace,
        userId: userId!,
        environment: API_BASE_URL,
        cacheKey: cacheKey(query),
        data: query.state.data,
        cachedAt: now,
        lastSyncedAt: query.state.dataUpdatedAt || now,
        expiresAt: now + policy.ttlMs,
      });
      void putSyncMeta({ namespace, key: "last-sync", value: now, updatedAt: now });
      setLastSyncedAt(now);
    });
  }, [namespace, queryClient, userId]);

  useEffect(() => {
    if (previousStatus.current === "OFFLINE" && status === "ONLINE") {
      void controlledRefresh(queryClient);
    }
    previousStatus.current = status;
  }, [queryClient, status]);

  const value = useMemo(
    () => ({ status, isOffline: status === "OFFLINE", hydrated, lastSyncedAt }),
    [status, hydrated, lastSyncedAt],
  );
  return <OfflineContext.Provider value={value}>{children}</OfflineContext.Provider>;
}
