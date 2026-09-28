import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  setCachedData,
  getCachedData,
  removeCachedData,
  clearAllCache,
} from "../offline/cacheManager";
import {
  enqueueOfflineMutation,
  getAllMutations,
  getPendingMutations,
  processSyncQueue,
  checkAndEnforce48hRule,
  getOfflineRemainingTime,
  setOfflineMetadata,
  getOfflineMetadata,
  clearSyncQueue,
} from "../offline/syncEngine";
import { useOfflineStore } from "../store/useOfflineStore";

describe("IndexedDB Offline System & 48-Hour Sync Engine", () => {
  beforeEach(async () => {
    await clearAllCache();
    await clearSyncQueue();
    await setOfflineMetadata({
      firstOfflineAt: null,
      lastOnlineAt: Date.now(),
      lastSyncAt: null,
      lastPurgedAt: null,
      lastPurgeReason: null,
    });
    vi.restoreAllMocks();
  });

  describe("1. IndexedDB Cache Store Operations", () => {
    it("should store and retrieve data from IndexedDB cache", async () => {
      const sampleErrands = [
        { id: "e1", title: "أدوية من صيدلية الشفاء" },
        { id: "e2", title: "طرد ملابس من دير البلح" },
      ];

      await setCachedData("/api/v1/errands", sampleErrands);
      const cached = await getCachedData<typeof sampleErrands>("/api/v1/errands");

      expect(cached).toEqual(sampleErrands);
    });

    it("should return null for non-existent cache keys", async () => {
      const result = await getCachedData("/api/v1/unknown-endpoint");
      expect(result).toBeNull();
    });

    it("should respect TTL and expire stale cached items", async () => {
      const testData = { user: "Ahmad" };
      // 50ms TTL
      await setCachedData("/api/v1/user", testData, 50);

      const immediate = await getCachedData("/api/v1/user");
      expect(immediate).toEqual(testData);

      // Fast-forward 100ms
      await new Promise((r) => setTimeout(r, 60));

      const afterTtl = await getCachedData("/api/v1/user");
      expect(afterTtl).toBeNull();
    });

    it("should delete single and clear all cache entries", async () => {
      await setCachedData("key1", "val1");
      await setCachedData("key2", "val2");

      await removeCachedData("key1");
      expect(await getCachedData("key1")).toBeNull();
      expect(await getCachedData("key2")).toBe("val2");

      await clearAllCache();
      expect(await getCachedData("key2")).toBeNull();
    });
  });

  describe("2. Offline Mutation Queueing & FIFO Ordering", () => {
    it("should enqueue offline mutations with status 'pending'", async () => {
      const mutation = await enqueueOfflineMutation({
        type: "CREATE_ERRAND",
        endpoint: "/api/v1/errands",
        method: "POST",
        payload: { title: "طلب توصيل دواء" },
        descriptionAr: "إنشاء طلب: توصيل دواء",
      });

      expect(mutation.id).toBeDefined();
      expect(mutation.status).toBe("pending");
      expect(mutation.timestamp).toBeGreaterThan(0);

      const all = await getAllMutations();
      expect(all.length).toBe(1);
      expect(all[0].type).toBe("CREATE_ERRAND");
    });

    it("should return pending mutations ordered chronologically (FIFO)", async () => {
      await enqueueOfflineMutation({
        id: "mut_1",
        type: "CREATE_ERRAND",
        endpoint: "/api/v1/errands",
        method: "POST",
        payload: { title: "الطلب الأول" },
        descriptionAr: "الطلب الأول",
      });

      await new Promise((r) => setTimeout(r, 10));

      await enqueueOfflineMutation({
        id: "mut_2",
        type: "CREATE_TRIP",
        endpoint: "/api/v1/trips",
        method: "POST",
        payload: { origin: "غزة" },
        descriptionAr: "رحلة من غزة",
      });

      const pending = await getPendingMutations();
      expect(pending.length).toBe(2);
      expect(pending[0].id).toBe("mut_1");
      expect(pending[1].id).toBe("mut_2");
    });
  });

  describe("3. Sync Replay when Reconnecting", () => {
    it("should replay queued mutations sequentially and remove them upon success", async () => {
      await enqueueOfflineMutation({
        type: "CREATE_ERRAND",
        endpoint: "/api/v1/errands",
        method: "POST",
        payload: { title: "طلب دواء" },
        descriptionAr: "إنشاء طلب دواء",
      });

      await enqueueOfflineMutation({
        type: "SUBMIT_PROPOSAL",
        endpoint: "/api/v1/proposals",
        method: "POST",
        payload: { priceNis: 20 },
        descriptionAr: "تقديم عرض 20 شيكل",
      });

      const mockApiClient: any = {
        request: vi.fn().mockResolvedValue({ data: { success: true } }),
      };

      const result = await processSyncQueue(mockApiClient);

      expect(result.synced).toBe(2);
      expect(result.failed).toBe(0);
      expect(mockApiClient.request).toHaveBeenCalledTimes(2);

      const remainingPending = await getPendingMutations();
      expect(remainingPending.length).toBe(0);
    });

    it("should handle permanent 4xx errors by removing unrecoverable mutations without blocking the queue", async () => {
      await enqueueOfflineMutation({
        type: "CREATE_ERRAND",
        endpoint: "/api/v1/errands",
        method: "POST",
        payload: { invalidField: true },
        descriptionAr: "طلب غير صالح",
      });

      const mockApiClient: any = {
        request: vi.fn().mockRejectedValue({
          response: { status: 422, data: { message: "Validation error" } },
        }),
      };

      const result = await processSyncQueue(mockApiClient);
      expect(result.failed).toBe(1);

      const remainingPending = await getPendingMutations();
      expect(remainingPending.length).toBe(0);
    });
  });

  describe("4. 48-Hour Offline Expiration Rule", () => {
    it("should allow sync if offline duration is within 48 hours (e.g. 24 hours)", async () => {
      const now = Date.now();
      const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;

      await setOfflineMetadata({
        firstOfflineAt: twentyFourHoursAgo,
        lastOnlineAt: twentyFourHoursAgo,
      });

      await enqueueOfflineMutation({
        type: "CREATE_ERRAND",
        endpoint: "/api/v1/errands",
        method: "POST",
        payload: { title: "طلب خلال 24 ساعة" },
        descriptionAr: "طلب خلال 24 ساعة",
      });

      const check = await checkAndEnforce48hRule();
      expect(check.expired).toBe(false);
      expect(check.purgedMutationsCount).toBe(0);

      const remaining = await getOfflineRemainingTime();
      expect(remaining.isExpired).toBe(false);
      expect(remaining.hoursRemaining).toBeGreaterThanOrEqual(23);
    });

    it("should PURGE all pending mutations and cache if offline duration exceeds 48 hours", async () => {
      const now = Date.now();
      const fortyNineHoursAgo = now - 49 * 60 * 60 * 1000;

      // Simulate offline for 49 hours
      await setOfflineMetadata({
        firstOfflineAt: fortyNineHoursAgo,
        lastOnlineAt: fortyNineHoursAgo,
      });

      // Cache some data
      await setCachedData("/api/v1/errands", [{ id: "stale" }]);

      // Queue a mutation
      await enqueueOfflineMutation({
        type: "CREATE_ERRAND",
        endpoint: "/api/v1/errands",
        method: "POST",
        payload: { title: "طلب منتهي الصلاحية" },
        descriptionAr: "طلب قديم",
      });

      // Execute 48-hour check
      const check = await checkAndEnforce48hRule();

      expect(check.expired).toBe(true);
      expect(check.purgedMutationsCount).toBeGreaterThan(0);

      // Verify sync queue is now completely cleared
      const allMutations = await getAllMutations();
      expect(allMutations.length).toBe(0);

      // Verify stale cache was cleared
      const cached = await getCachedData("/api/v1/errands");
      expect(cached).toBeNull();

      // Verify metadata updated with purge reason
      const meta = await getOfflineMetadata();
      expect(meta.lastPurgedAt).toBeDefined();
      expect(meta.lastPurgeReason).toBe("EXCEEDED_48_HOURS_OFFLINE");
    });

    it("should abort sync attempt and purge if offline exceeded 48 hours", async () => {
      const now = Date.now();
      const fiftyHoursAgo = now - 50 * 60 * 60 * 1000;

      await setOfflineMetadata({
        firstOfflineAt: fiftyHoursAgo,
      });

      await enqueueOfflineMutation({
        type: "CREATE_ERRAND",
        endpoint: "/api/v1/errands",
        method: "POST",
        payload: { title: "طلب بعد 50 ساعة" },
        descriptionAr: "طلب منتهي",
      });

      const mockApiClient: any = {
        request: vi.fn(),
      };

      const result = await processSyncQueue(mockApiClient);

      expect(result.purged).toBeGreaterThan(0);
      expect(result.synced).toBe(0);
      expect(mockApiClient.request).not.toHaveBeenCalled();
    });
  });

  describe("5. Zustand Offline Store Integration", () => {
    it("should initialize store with correct state and track remaining time", async () => {
      const store = useOfflineStore.getState();
      await store.initialize();

      expect(store.isOnline).toBe(true);
      expect(store.hoursRemaining).toBe(48);
    });

    it("should switch between offline and online state properly", async () => {
      const store = useOfflineStore.getState();

      await store.setOnlineState(false);
      expect(useOfflineStore.getState().isOnline).toBe(false);
      expect(useOfflineStore.getState().offlineSince).toBeDefined();

      await store.setOnlineState(true);
      expect(useOfflineStore.getState().isOnline).toBe(true);
    });
  });
});
