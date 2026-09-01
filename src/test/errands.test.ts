import { describe, it, expect } from "vitest";
import { z } from "zod";
import { ENDPOINTS } from "../api/endpoints";

describe("Errands Domain & Schemas", () => {
  const errandCreateSchema = z.object({
    clientRequestKey: z.string().min(1),
    categoryId: z.string().min(1),
    title: z.string().min(3).max(100),
    itemsDescription: z.string().min(3).max(300),
    destinationKeyword: z.string().min(2),
    weightClass: z.enum(["LIGHT", "MEDIUM", "HEAVY"]),
    isUrgent: z.boolean(),
    isInterZone: z.boolean(),
  });

  it("should validate a valid errand creation request", () => {
    const errand = {
      clientRequestKey: "req-unique-12345",
      categoryId: "60a32850-bd3f-444a-84b4-c750abf6ecb6",
      title: "توصيل دواء من رفح إلى الرمال",
      itemsDescription: "علبة دواء للأطفال من صيدلية الشفاء في رفح",
      destinationKeyword: "الرمال",
      weightClass: "LIGHT" as const,
      isUrgent: false,
      isInterZone: false,
    };

    const result = errandCreateSchema.safeParse(errand);
    expect(result.success).toBe(true);
  });

  it("should fail validation if itemsDescription exceeds 300 characters", () => {
    const longDesc = "أ".repeat(301);
    const errand = {
      clientRequestKey: "req-unique-12345",
      categoryId: "60a32850-bd3f-444a-84b4-c750abf6ecb6",
      title: "عنوان صالح",
      itemsDescription: longDesc,
      destinationKeyword: "غزة",
      weightClass: "LIGHT" as const,
      isUrgent: false,
      isInterZone: false,
    };

    const result = errandCreateSchema.safeParse(errand);
    expect(result.success).toBe(false);
  });

  it("should verify dynamic errand endpoints", () => {
    const errandId = "errand-123";
    expect(ENDPOINTS.ERRANDS.LIST).toBe("/api/v1/errands");
    expect(ENDPOINTS.ERRANDS.CREATE).toBe("/api/v1/errands");
    expect(ENDPOINTS.ERRANDS.DETAIL(errandId)).toBe(
      `/api/v1/errands/${errandId}`,
    );
    expect(ENDPOINTS.ERRANDS.CANCEL(errandId)).toBe(
      `/api/v1/errands/${errandId}/cancel`,
    );
    expect(ENDPOINTS.ERRANDS.OFFERS(errandId)).toBe(
      `/api/v1/errands/${errandId}/offers`,
    );
  });
});
