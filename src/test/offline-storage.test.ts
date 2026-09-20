import { describe, expect, it } from "vitest";
import {
  createNamespace,
  getResources,
  getSyncMeta,
  purgeNamespace,
  putResource,
  putSyncMeta,
  resetOfflineStorageForTests,
} from "../offline/storage";

describe("offline IndexedDB storage", () => {
  it("writes and reads versioned resources in a user and environment namespace", async () => {
    const namespace = createNamespace("user-a", "https://api-a.example");
    expect(await putResource({
      namespace,
      userId: "user-a",
      environment: "https://api-a.example",
      cacheKey: '["errands","list"]',
      data: { errands: [{ id: "one" }] },
      cachedAt: 100,
      lastSyncedAt: 100,
      expiresAt: Date.now() + 10_000,
    })).toBe(true);

    const records = await getResources(namespace);
    expect(records).toHaveLength(1);
    expect(records[0].data).toEqual({ errands: [{ id: "one" }] });
    expect(records[0].schemaVersion).toBe(1);
  });

  it("isolates users and API environments", async () => {
    const userA = createNamespace("user-a", "https://api.example");
    const userB = createNamespace("user-b", "https://api.example");
    const stagingA = createNamespace("user-a", "https://staging.example");
    for (const [namespace, userId, environment] of [
      [userA, "user-a", "https://api.example"],
      [userB, "user-b", "https://api.example"],
      [stagingA, "user-a", "https://staging.example"],
    ]) {
      await putResource({ namespace, userId, environment, cacheKey: '["auth","me"]', data: namespace, cachedAt: 1, lastSyncedAt: 1 });
    }
    expect((await getResources(userA)).map((item) => item.data)).toEqual([userA]);
    expect((await getResources(userB)).map((item) => item.data)).toEqual([userB]);
    expect((await getResources(stagingA)).map((item) => item.data)).toEqual([stagingA]);
  });

  it("excludes expired records", async () => {
    const namespace = createNamespace("expired-user", "https://api.example");
    await putResource({ namespace, userId: "expired-user", environment: "https://api.example", cacheKey: '["trips"]', data: [], cachedAt: 1, lastSyncedAt: 1, expiresAt: 2 });
    expect(await getResources(namespace, 3)).toEqual([]);
  });

  it("purges resources and sync metadata without affecting another user", async () => {
    const userA = createNamespace("purge-a", "https://api.example");
    const userB = createNamespace("purge-b", "https://api.example");
    await putResource({ namespace: userA, userId: "purge-a", environment: "https://api.example", cacheKey: '["chat"]', data: "private-a", cachedAt: 1, lastSyncedAt: 1 });
    await putResource({ namespace: userB, userId: "purge-b", environment: "https://api.example", cacheKey: '["chat"]', data: "private-b", cachedAt: 1, lastSyncedAt: 1 });
    await putSyncMeta({ namespace: userA, key: "last-sync", value: 1, updatedAt: 1 });
    await purgeNamespace(userA);
    expect(await getResources(userA)).toEqual([]);
    expect(await getSyncMeta(userA, "last-sync")).toBeUndefined();
    expect(await getResources(userB)).toHaveLength(1);
  });

  it("degrades to online-only behavior when IndexedDB is unavailable", async () => {
    const original = globalThis.indexedDB;
    Object.defineProperty(globalThis, "indexedDB", { configurable: true, value: undefined });
    resetOfflineStorageForTests();
    const namespace = createNamespace("no-storage", "https://api.example");
    expect(await putResource({ namespace, userId: "no-storage", environment: "https://api.example", cacheKey: '["auth"]', data: {}, cachedAt: 1, lastSyncedAt: 1 })).toBe(false);
    expect(await getResources(namespace)).toEqual([]);
    Object.defineProperty(globalThis, "indexedDB", { configurable: true, value: original });
    resetOfflineStorageForTests();
  });
});
