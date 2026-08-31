import { describe, it, expect } from "vitest";
import { TOKEN_PACKAGES } from "../pages/wallet/BuyTokensPackages";
import { ENDPOINTS } from "../api/endpoints";

describe("Wallet Domain & Multi-Step Purchase Flow", () => {
  it("should have 4 predefined token packages with positive prices", () => {
    expect(TOKEN_PACKAGES.length).toBe(4);

    TOKEN_PACKAGES.forEach((pkg) => {
      expect(pkg.tokens).toBeGreaterThan(0);
      expect(pkg.priceUsd).toBeGreaterThan(0);
      expect(pkg.name).toBeTruthy();
      expect(pkg.ratePerToken).toBeTruthy();
    });
  });

  it("should mark the 20-token package as popular", () => {
    const popularPkg = TOKEN_PACKAGES.find((p) => p.isPopular);
    expect(popularPkg).toBeDefined();
    expect(popularPkg?.tokens).toBe(20);
    expect(popularPkg?.priceUsd).toBe(15);
  });

  it("should verify wallet endpoints", () => {
    expect(ENDPOINTS.WALLET.ME).toBe("/api/v1/wallet");
    expect(ENDPOINTS.WALLET.TRANSACTIONS).toBe("/api/v1/wallet/transactions");
  });
});
