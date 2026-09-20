import { describe, expect, it } from "vitest";
import { API_BASE_URL } from "../api/endpoints";
import { createNamespace, getResources, putResource } from "../offline/storage";
import { useAuthStore } from "../store/useAuthStore";

const tokens = { accessToken: "access", refreshToken: "refresh" };

describe("offline logout isolation", () => {
  it("purges User A before User B can use the application", async () => {
    const namespaceA = createNamespace("user-a", API_BASE_URL);
    await putResource({
      namespace: namespaceA,
      userId: "user-a",
      environment: API_BASE_URL,
      cacheKey: '["notifications","list","all"]',
      data: { notifications: [{ id: "private-a" }] },
      cachedAt: 1,
      lastSyncedAt: 1,
    });
    localStorage.setItem("bitareeqak-notifications", "private-a");
    useAuthStore.getState().setAuth(
      { id: "user-a", phone: "1", role: "USER", status: "ACTIVE" },
      tokens,
    );

    await useAuthStore.getState().logout();
    useAuthStore.getState().setAuth(
      { id: "user-b", phone: "2", role: "USER", status: "ACTIVE" },
      tokens,
    );

    expect(await getResources(namespaceA)).toEqual([]);
    expect(localStorage.getItem("bitareeqak-notifications")).toBeNull();
    expect(useAuthStore.getState().user?.id).toBe("user-b");
  });
});
