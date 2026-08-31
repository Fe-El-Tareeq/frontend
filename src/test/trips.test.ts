import { describe, it, expect } from "vitest";
import { z } from "zod";
import { ENDPOINTS } from "../api/endpoints";

describe("Trips Domain & Schemas", () => {
  const tripCreateSchema = z.object({
    destinationKeyword: z.string().min(2),
    departureDate: z.string().min(1),
    departureTime: z.string().min(1),
    capacityClass: z.enum(["LIGHT", "MEDIUM", "HEAVY"]),
    originCity: z.string().min(2),
    destinationCity: z.string().min(2),
    notes: z.string().optional(),
  });

  it("should validate a valid trip creation payload", () => {
    const trip = {
      destinationKeyword: "رفح",
      departureDate: "2026-09-01",
      departureTime: "10:00",
      capacityClass: "LIGHT" as const,
      originCity: "غزة",
      destinationCity: "رفح",
      notes: "أغراض خفيفة فقط",
    };

    const result = tripCreateSchema.safeParse(trip);
    expect(result.success).toBe(true);
  });

  it("should verify dynamic trips and matching endpoints", () => {
    const tripId = "trip-456";
    expect(ENDPOINTS.TRIPS.LIST).toBe("/api/v1/trips");
    expect(ENDPOINTS.TRIPS.CREATE).toBe("/api/v1/trips");
    expect(ENDPOINTS.TRIPS.DETAIL(tripId)).toBe(`/api/v1/trips/${tripId}`);
    expect(ENDPOINTS.TRIPS.CANCEL(tripId)).toBe(`/api/v1/trips/${tripId}/cancel`);
    expect(ENDPOINTS.TRIPS.BOOK(tripId)).toBe(`/api/v1/trips/${tripId}/book`);
    expect(ENDPOINTS.MATCHING.TRIP_ERRANDS(tripId)).toBe(`/api/v1/matching/trips/${tripId}`);
    expect(ENDPOINTS.MATCHING.ERRAND_TRIPS(tripId)).toBe(`/api/v1/matching/errands/${tripId}`);
  });
});
