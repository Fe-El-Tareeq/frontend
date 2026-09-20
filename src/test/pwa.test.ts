/// <reference types="node" />
import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import manifest from "../../public/manifest.json";

describe("Progressive Web App (PWA) Configuration", () => {
  it("should have a valid web app manifest with required standalone properties", () => {
    expect(manifest.name).toBe("بطريقك | منصة التوصيل المجتمعي");
    expect(manifest.short_name).toBe("بطريقك");
    expect(manifest.start_url).toBe("/");
    expect(manifest.display).toBe("standalone");
    expect(manifest.theme_color).toBe("#ffffff");
    expect(manifest.background_color).toBe("#ffffff");
    expect(manifest.dir).toBe("rtl");
    expect(manifest.lang).toBe("ar");
  });

  it("should contain standard 192x192 and 512x512 maskable app icons", () => {
    expect(manifest.icons).toBeDefined();
    expect(manifest.icons.length).toBeGreaterThanOrEqual(2);

    const icon192 = manifest.icons.find((i: any) => i.sizes === "192x192");
    const icon512 = manifest.icons.find((i: any) => i.sizes === "512x512");

    expect(icon192).toBeDefined();
    expect(icon512).toBeDefined();
  });

  it("should declare quick action app shortcuts", () => {
    expect(manifest.shortcuts).toBeDefined();
    expect(manifest.shortcuts.length).toBeGreaterThanOrEqual(2);

    const errandShortcut = manifest.shortcuts.find(
      (s: any) => s.url === "/errands/new",
    );
    const tripShortcut = manifest.shortcuts.find(
      (s: any) => s.url === "/trips/new",
    );

    expect(errandShortcut).toBeDefined();
    expect(tripShortcut).toBeDefined();
  });
});

describe("revisioned service worker configuration", () => {
  const viteConfig = readFileSync("vite.config.ts", "utf8");

  it("uses generated revisioned precaching instead of the legacy static worker", () => {
    expect(viteConfig).toContain("VitePWA");
    expect(viteConfig).toContain("cleanupOutdatedCaches: true");
    expect(viteConfig).toContain('navigateFallback: "/index.html"');
    expect(viteConfig).toContain("html,js,css,png,svg,ico,woff,woff2,webmanifest");
    expect(existsSync("public/sw.js")).toBe(false);
  });

  it("does not configure authenticated API runtime caching", () => {
    expect(viteConfig).toContain("navigateFallbackDenylist");
    expect(viteConfig).not.toContain('cacheName: "bitareeqak-api"');
  });

  it("keeps a new deployment waiting until a safe activation point", () => {
    expect(viteConfig).toContain('registerType: "prompt"');
    expect(viteConfig).toContain("skipWaiting: false");
    expect(viteConfig).toContain("clientsClaim: false");
  });
});
