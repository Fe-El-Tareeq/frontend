import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConnectivityMonitor } from "../offline/connectivity";

function setBrowserOnline(value: boolean) {
  Object.defineProperty(navigator, "onLine", { configurable: true, value });
}

describe("connectivity monitor", () => {
  beforeEach(() => setBrowserOnline(true));

  it("does not trust browser online status when the backend is unreachable", async () => {
    const monitor = new ConnectivityMonitor("/health", vi.fn().mockRejectedValue(new TypeError("network")));
    expect(await monitor.probe()).toBe(false);
    expect(monitor.getSnapshot()).toBe("OFFLINE");
  });

  it("moves from offline to online only after a successful probe", async () => {
    setBrowserOnline(false);
    const fetcher = vi.fn().mockResolvedValue({ ok: true });
    const monitor = new ConnectivityMonitor("/health", fetcher as unknown as typeof fetch);
    expect(monitor.getSnapshot()).toBe("OFFLINE");
    setBrowserOnline(true);
    expect(await monitor.probe()).toBe(true);
    expect(monitor.getSnapshot()).toBe("ONLINE");
  });
});
