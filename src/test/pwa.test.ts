import { describe, it, expect } from "vitest";
import manifest from "../../public/manifest.json";

describe("Progressive Web App (PWA) Configuration", () => {
  it("should have a valid web app manifest with required standalone properties", () => {
    expect(manifest.name).toBe("بطريقك | منصة التوصيل المجتمعي");
    expect(manifest.short_name).toBe("بطريقك");
    expect(manifest.start_url).toBe("/");
    expect(manifest.display).toBe("standalone");
    expect(manifest.theme_color).toBe("#123A68");
    expect(manifest.background_color).toBe("#123A68");
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

    const errandShortcut = manifest.shortcuts.find((s: any) => s.url === "/errands/new");
    const tripShortcut = manifest.shortcuts.find((s: any) => s.url === "/trips/new");

    expect(errandShortcut).toBeDefined();
    expect(tripShortcut).toBeDefined();
  });
});
