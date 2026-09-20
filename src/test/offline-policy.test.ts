import { describe, expect, it } from "vitest";
import { getCachePolicy, isPersistableQuery } from "../offline/cachePolicy";

describe("offline query allowlist", () => {
  it.each(["auth", "errands", "trips", "assignments", "chat", "messages", "notifications", "locations", "support"])("persists approved %s reads", (root) => {
    expect(isPersistableQuery([root, "list"])).toBe(true);
  });

  it.each(["wallet", "payments", "matching", "pricing", "otp"])("rejects excluded %s data", (root) => {
    expect(isPersistableQuery([root])).toBe(false);
  });

  it("uses resource-specific expiry policies", () => {
    expect(getCachePolicy(["assignments"])?.ttlMs).toBeLessThan(getCachePolicy(["auth"])!.ttlMs);
    expect(getCachePolicy(["notifications"])?.ttlMs).toBeLessThan(getCachePolicy(["locations"])!.ttlMs);
  });
});
