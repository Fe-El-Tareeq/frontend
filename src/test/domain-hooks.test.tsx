import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { assignmentsApi } from "../api/assignments";
import { chatApi } from "../api/chat";
import { errandsApi } from "../api/errands";
import { locationsApi } from "../api/locations";
import { matchingApi } from "../api/matching";
import { paymentsApi } from "../api/payments";
import { pricingApi } from "../api/pricing";
import { ratingsApi } from "../api/ratings";
import { tripsApi } from "../api/trips";
import { walletApi } from "../api/wallet";
import { useAssignments } from "../hooks/useAssignments";
import { useChatRoom } from "../hooks/useChat";
import { useErrands } from "../hooks/useErrands";
import { useLocations } from "../hooks/useLocations";
import { useErrandMatches } from "../hooks/useMatching";
import { usePayments } from "../hooks/usePayments";
import { useDeliveryPricing } from "../hooks/usePricing";
import { useRatings } from "../hooks/useRatings";
import { useTrips } from "../hooks/useTrips";
import { useWallet, useWalletTransactions } from "../hooks/useWallet";
import { useAuthStore } from "../store/useAuthStore";

const ok = <T,>(data: T) => ({ success: true, message: "ok", data });

vi.mock("../api/assignments", () => ({
  assignmentsApi: {
    getAssignments: vi.fn(),
    createAssignment: vi.fn(),
    markPickedUp: vi.fn(),
    startDelivery: vi.fn(),
    completeAssignment: vi.fn(),
    cancelAssignment: vi.fn(),
  },
}));

vi.mock("../api/chat", () => ({
  chatApi: {
    getRoomById: vi.fn(),
    getMessages: vi.fn(),
    sendMessage: vi.fn(),
    markAsRead: vi.fn(),
  },
}));

vi.mock("../api/errands", () => ({
  errandsApi: {
    getErrands: vi.fn(),
    createErrand: vi.fn(),
    updateErrand: vi.fn(),
    cancelErrand: vi.fn(),
  },
}));

vi.mock("../api/locations", () => ({
  locationsApi: {
    getNeighborhoods: vi.fn(),
  },
}));

vi.mock("../api/matching", () => ({
  matchingApi: {
    getMatchesForErrand: vi.fn(),
    getMatchesForTrip: vi.fn(),
  },
}));

vi.mock("../api/payments", () => ({
  paymentsApi: {
    getPackages: vi.fn(),
    createInvoice: vi.fn(),
    mockPayInvoice: vi.fn(),
  },
}));

vi.mock("../api/pricing", () => ({
  pricingApi: {
    getQuote: vi.fn(),
  },
}));

vi.mock("../api/ratings", () => ({
  ratingsApi: {
    submitRating: vi.fn(),
  },
}));

vi.mock("../api/trips", () => ({
  tripsApi: {
    getTrips: vi.fn(),
    createTrip: vi.fn(),
    updateTrip: vi.fn(),
    cancelTrip: vi.fn(),
  },
}));

vi.mock("../api/wallet", () => ({
  walletApi: {
    getWallet: vi.fn(),
    getTransactions: vi.fn(),
  },
}));

function wrapper({ children }: PropsWithChildren) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

beforeEach(() => {
  useAuthStore.setState({
    user: {
      id: "user-1",
      phone: "0599123456",
      role: "USER",
      status: "ACTIVE",
    },
    accessToken: "token",
    refreshToken: "refresh",
    isAuthenticated: true,
  });
});

describe("domain hooks with mocked APIs", () => {
  it("covers locations loading, success, empty, and error states", async () => {
    vi.mocked(locationsApi.getNeighborhoods).mockResolvedValueOnce(
      ok({ neighborhoods: [{ id: "n1", name: "الرمال", governorate: "غزة" }] }) as never,
    );

    const { result, unmount } = renderHook(() => useLocations(), { wrapper });
    expect(result.current.isLoadingNeighborhoods).toBe(true);

    await waitFor(() =>
      expect(result.current.neighborhoods).toEqual([
        { id: "n1", name: "الرمال", governorate: "غزة" },
      ]),
    );
    unmount();

    vi.mocked(locationsApi.getNeighborhoods).mockResolvedValueOnce(
      ok({ neighborhoods: [] }) as never,
    );
    const empty = renderHook(() => useLocations(), { wrapper });
    await waitFor(() => expect(empty.result.current.neighborhoods).toEqual([]));
    expect(empty.result.current.isErrorNeighborhoods).toBe(false);
    empty.unmount();

    vi.mocked(locationsApi.getNeighborhoods).mockRejectedValueOnce(
      new Error("server down"),
    );
    const failed = renderHook(() => useLocations(), { wrapper });
    await waitFor(() =>
      expect(failed.result.current.isErrorNeighborhoods).toBe(true),
    );
  });

  it("covers wallet balance, transactions, loading, empty, and error states", async () => {
    vi.mocked(walletApi.getWallet).mockResolvedValueOnce(
      ok({ id: "wallet-1", userId: "user-1", tokenBalance: 12 }) as never,
    );
    vi.mocked(walletApi.getTransactions).mockResolvedValueOnce(
      ok({
        transactions: [],
        pagination: { skip: 0, take: 10, total: 0 },
      }) as never,
    );

    const wallet = renderHook(() => useWallet(), { wrapper });
    expect(wallet.result.current.isLoadingWallet).toBe(true);
    await waitFor(() => expect(wallet.result.current.tokenBalance).toBe(12));

    const transactions = renderHook(() => useWalletTransactions({ take: 10 }), {
      wrapper,
    });
    await waitFor(() =>
      expect(transactions.result.current.transactions).toEqual([]),
    );

    vi.mocked(walletApi.getTransactions).mockRejectedValueOnce(
      new Error("wallet unavailable"),
    );
    const failedTransactions = renderHook(() => useWalletTransactions(), {
      wrapper,
    });
    await waitFor(() =>
      expect(failedTransactions.result.current.isErrorTransactions).toBe(true),
    );
  });

  it("covers errands list, create success, insufficient token failure, update, and cancel", async () => {
    vi.mocked(errandsApi.getErrands).mockResolvedValue(
      ok({
        errands: [{ id: "errand-1", title: "دواء", status: "OPEN" }],
        pagination: { skip: 0, take: 10, total: 1 },
      }) as never,
    );
    vi.mocked(errandsApi.createErrand)
      .mockResolvedValueOnce(
        ok({ errand: { id: "errand-2", title: "مفاتيح" } }) as never,
      )
      .mockRejectedValueOnce(new Error("Insufficient token balance"));
    vi.mocked(errandsApi.updateErrand).mockResolvedValue(
      ok({ errand: { id: "errand-1", title: "دواء محدث" } }) as never,
    );
    vi.mocked(errandsApi.cancelErrand).mockResolvedValue(
      ok({ errand: { id: "errand-1", status: "CANCELLED" } }) as never,
    );

    const { result } = renderHook(() => useErrands(), { wrapper });
    await waitFor(() => expect(result.current.errands).toHaveLength(1));

    await expect(
      result.current.createErrand({
        clientRequestKey: "req-1",
        categoryId: "cat-1",
        title: "مفاتيح",
        itemsDescription: "مفاتيح منزل",
        destinationKeyword: "غزة",
        weightClass: "LIGHT",
        isUrgent: false,
        isInterZone: false,
      } as never),
    ).resolves.toBeTruthy();

    await expect(
      result.current.createErrand({
        clientRequestKey: "req-2",
        categoryId: "cat-1",
        title: "مفاتيح",
        itemsDescription: "مفاتيح منزل",
        destinationKeyword: "غزة",
        weightClass: "LIGHT",
        isUrgent: false,
        isInterZone: false,
      } as never),
    ).rejects.toThrow("Insufficient token balance");

    await expect(
      result.current.updateErrand({
        id: "errand-1",
        data: { title: "دواء محدث" } as never,
      }),
    ).resolves.toBeTruthy();
    await expect(result.current.cancelErrand("errand-1")).resolves.toBeTruthy();
  });

  it("covers trips list, create, update, cancel, and pricing quote behavior", async () => {
    vi.mocked(tripsApi.getTrips).mockResolvedValue(
      ok({
        trips: [{ id: "trip-1", destinationKeyword: "رفح" }],
        pagination: { skip: 0, take: 10, total: 1 },
      }) as never,
    );
    vi.mocked(tripsApi.createTrip).mockResolvedValue(
      ok({ trip: { id: "trip-2", destinationKeyword: "غزة" } }) as never,
    );
    vi.mocked(tripsApi.updateTrip).mockResolvedValue(
      ok({ trip: { id: "trip-1", destinationKeyword: "خان يونس" } }) as never,
    );
    vi.mocked(tripsApi.cancelTrip).mockResolvedValue(
      ok({ trip: { id: "trip-1", status: "CANCELLED" } }) as never,
    );
    vi.mocked(pricingApi.getQuote).mockResolvedValue(
      ok({ deliveryFeeNis: 15, pricingRule: "SAME_AREA", currency: "ILS" }) as never,
    );

    const trips = renderHook(() => useTrips(), { wrapper });
    await waitFor(() => expect(trips.result.current.trips).toHaveLength(1));
    await expect(
      trips.result.current.createTrip({
        clientRequestKey: "req-trip-1",
        originType: "DEFAULT_NEIGHBORHOOD",
        destinationKeyword: "غزة",
        destinationNeighborhoodId: "n2",
        departureTime: new Date().toISOString(),
        expectedReturnTime: new Date(Date.now() + 60_000).toISOString(),
        maxCapacityUnits: 2,
        maxCapacityClass: "LIGHT",
        notes: "خفيف",
      }),
    ).resolves.toBeTruthy();
    await expect(
      trips.result.current.updateTrip({ id: "trip-1", data: { notes: "محدث" } }),
    ).resolves.toBeTruthy();
    await expect(trips.result.current.cancelTrip("trip-1")).resolves.toBeTruthy();

    const pricing = renderHook(
      () => useDeliveryPricing({ destinationNeighborhoodId: "n2" }),
      { wrapper },
    );
    await waitFor(() =>
      expect(pricing.result.current.quote?.deliveryFeeNis).toBe(15),
    );
  });

  it("covers matching results, no-result, loading, and error states", async () => {
    vi.mocked(matchingApi.getMatchesForErrand)
      .mockResolvedValueOnce(
        ok({
          matches: [
            {
              trip: { id: "trip-1", destinationKeyword: "رفح" },
              score: { matchScore: 0.91 },
            },
          ],
          limit: 10,
          recalculatedAt: "2026-09-10T00:00:00.000Z",
        }) as never,
      )
      .mockResolvedValueOnce(
        ok({ matches: [], limit: 10, recalculatedAt: "2026-09-10T00:00:00.000Z" }) as never,
      )
      .mockRejectedValueOnce(new Error("matching failed"));

    const matched = renderHook(() => useErrandMatches("errand-1"), { wrapper });
    expect(matched.result.current.isLoading).toBe(true);
    await waitFor(() =>
      expect(matched.result.current.matches[0].score.matchScore).toBe(0.91),
    );

    const empty = renderHook(() => useErrandMatches("errand-2"), { wrapper });
    await waitFor(() => expect(empty.result.current.matches).toEqual([]));

    const failed = renderHook(() => useErrandMatches("errand-3"), { wrapper });
    await waitFor(() => expect(failed.result.current.isError).toBe(true));
  });

  it("covers assignment accept, conflict, pickup, transit, complete, cancel, and unauthorized errors", async () => {
    vi.mocked(assignmentsApi.getAssignments).mockResolvedValue(
      ok({
        assignments: [{ id: "assignment-1", status: "ACCEPTED" }],
        pagination: { skip: 0, take: 10, total: 1 },
      }) as never,
    );
    vi.mocked(assignmentsApi.createAssignment)
      .mockResolvedValueOnce(
        ok({ assignment: { id: "assignment-2", status: "ACCEPTED" } }) as never,
      )
      .mockRejectedValueOnce(new Error("Already assigned"));
    vi.mocked(assignmentsApi.markPickedUp).mockResolvedValue(
      ok({ assignment: { id: "assignment-1", status: "PICKED_UP" } }) as never,
    );
    vi.mocked(assignmentsApi.startDelivery).mockResolvedValue(
      ok({ assignment: { id: "assignment-1", status: "IN_TRANSIT" } }) as never,
    );
    vi.mocked(assignmentsApi.completeAssignment).mockResolvedValue(
      ok({ assignment: { id: "assignment-1", status: "COMPLETED" } }) as never,
    );
    vi.mocked(assignmentsApi.cancelAssignment).mockRejectedValueOnce(
      new Error("Unauthorized"),
    );

    const { result } = renderHook(() => useAssignments(), { wrapper });
    await waitFor(() => expect(result.current.assignments).toHaveLength(1));
    await expect(
      result.current.createAssignment({ errandId: "errand-1", tripId: "trip-1" }),
    ).resolves.toBeTruthy();
    await expect(
      result.current.createAssignment({ errandId: "errand-1", tripId: "trip-1" }),
    ).rejects.toThrow("Already assigned");
    await expect(result.current.markPickedUp("assignment-1")).resolves.toBeTruthy();
    await expect(result.current.startDelivery("assignment-1")).resolves.toBeTruthy();
    await expect(
      result.current.completeAssignment("assignment-1"),
    ).resolves.toBeTruthy();
    await expect(
      result.current.cancelAssignment({
        id: "assignment-1",
        payload: { cancellationReason: "not allowed" } as never,
      }),
    ).rejects.toThrow("Unauthorized");
  });

  it("covers chat text, voice metadata, message list, read state, and blocked send failure", async () => {
    vi.mocked(chatApi.getRoomById).mockResolvedValue(
      ok({ room: { id: "room-1", assignmentId: "assignment-1" } }) as never,
    );
    vi.mocked(chatApi.getMessages).mockResolvedValue(
      ok({
        messages: [],
        pagination: { order: "desc", limit: 20, hasMore: false },
      }) as never,
    );
    vi.mocked(chatApi.sendMessage)
      .mockResolvedValueOnce(
        ok({ message: { id: "msg-1", type: "TEXT", text: "مرحبا" } }) as never,
      )
      .mockResolvedValueOnce(
        ok({
          message: {
            id: "msg-2",
            type: "VOICE",
            voiceNoteUrl: "https://example.test/voice.webm",
            voiceNoteDurationSec: 12,
          },
        }) as never,
      )
      .mockRejectedValueOnce(new Error("Assignment is completed"));
    vi.mocked(chatApi.markAsRead).mockResolvedValue(
      ok({ read: { count: 2, readAt: "2026-09-10T00:00:00.000Z" } }) as never,
    );

    const { result } = renderHook(() => useChatRoom("room-1"), { wrapper });
    await waitFor(() => expect(result.current.isLoadingMessages).toBe(false));

    await expect(
      result.current.sendMessage({
        clientMessageKey: "cmk-text-1",
        type: "TEXT",
        text: "مرحبا",
      }),
    ).resolves.toBeTruthy();
    await expect(
      result.current.sendMessage({
        clientMessageKey: "cmk-voice-1",
        type: "VOICE",
        voiceNoteUrl: "https://example.test/voice.webm",
        voiceNoteDurationSec: 12,
      }),
    ).resolves.toBeTruthy();
    await expect(
      result.current.sendMessage({
        clientMessageKey: "cmk-text-blocked",
        type: "TEXT",
        text: "بعد الإكمال",
      }),
    ).rejects.toThrow("Assignment is completed");
    await expect(result.current.markAsRead()).resolves.toBeTruthy();
  });

  it("covers payment package list, invoice creation, success, and failure without provider credentials", async () => {
    vi.mocked(paymentsApi.getPackages).mockResolvedValue(
      ok({ packages: [{ id: "pkg-1", tokenAmount: 20, priceNis: 15 }] }) as never,
    );
    vi.mocked(paymentsApi.createInvoice).mockResolvedValue(
      ok({ created: true, invoice: { id: "invoice-1", status: "PENDING" } }) as never,
    );
    vi.mocked(paymentsApi.mockPayInvoice)
      .mockResolvedValueOnce(
        ok({
          processed: true,
          reason: "ok",
          invoice: { id: "invoice-1", status: "PAID" },
        }) as never,
      )
      .mockRejectedValueOnce(new Error("payment failed"));

    const { result } = renderHook(() => usePayments(), { wrapper });
    await waitFor(() => expect(result.current.packages).toHaveLength(1));
    await expect(
      result.current.createInvoice({
        tokenPackageId: "pkg-1",
        clientRequestKey: "pay-1",
      }),
    ).resolves.toBeTruthy();
    await expect(result.current.mockPay("invoice-1")).resolves.toBeTruthy();
    await expect(result.current.mockPay("invoice-2")).rejects.toThrow(
      "payment failed",
    );
  });

  it("covers rating submit validation failure and duplicate/disabled server state", async () => {
    vi.mocked(ratingsApi.submitRating)
      .mockResolvedValueOnce(
        ok({
          created: true,
          trustScore: 95,
          rating: { id: "rating-1", ratingStars: 5 },
        }) as never,
      )
      .mockRejectedValueOnce(new Error("Rating already submitted"));

    const { result } = renderHook(() => useRatings(), { wrapper });
    await expect(
      result.current.submitRating({
        assignmentId: "assignment-1",
        ratingStars: 5,
        comments: "ممتاز",
      }),
    ).resolves.toBeTruthy();
    await expect(
      result.current.submitRating({
        assignmentId: "assignment-1",
        ratingStars: 5,
        comments: "مكرر",
      }),
    ).rejects.toThrow("Rating already submitted");
  });
});
