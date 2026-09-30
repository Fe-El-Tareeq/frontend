import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { tripsApi } from "../api/trips";
import { errandsApi } from "../api/errands";
import { assignmentsApi } from "../api/assignments";
import { paymentsApi } from "../api/payments";
import { authApi } from "../api/auth";
import { proposalsApi } from "../api/proposals";
import { useTripChecklist } from "../hooks/useTrips";
import { useErrandTracking } from "../hooks/useErrands";
import { useAssignments } from "../hooks/useAssignments";
import { usePayments } from "../hooks/usePayments";
import { useAuth } from "../hooks/useAuth";
import { useProposals } from "../hooks/useProposals";

vi.mock("../api/trips", () => ({
  tripsApi: {
    getChecklist: vi.fn(),
    getTrips: vi.fn(),
    getTripById: vi.fn(),
  },
}));

vi.mock("../api/errands", () => ({
  errandsApi: {
    getTracking: vi.fn(),
    getErrands: vi.fn(),
    getErrandById: vi.fn(),
    cancelErrand: vi.fn(),
  },
}));

vi.mock("../api/assignments", () => ({
  assignmentsApi: {
    getAssignments: vi.fn(),
    updateEstimatedDeliveryTime: vi.fn(),
    createAssignment: vi.fn(),
    markPickedUp: vi.fn(),
    startDelivery: vi.fn(),
    completeAssignment: vi.fn(),
    cancelAssignment: vi.fn(),
  },
}));

vi.mock("../api/payments", () => ({
  paymentsApi: {
    getPackages: vi.fn(),
    createInvoice: vi.fn(),
    verifyPaymentOtp: vi.fn(),
    resendPaymentOtp: vi.fn(),
    uploadReceipt: vi.fn(),
  },
}));

vi.mock("../api/auth", () => ({
  authApi: {
    changePassword: vi.fn(),
    deactivateAccount: vi.fn(),
    login: vi.fn(),
    register: vi.fn(),
  },
}));

vi.mock("../api/proposals", () => ({
  proposalsApi: {
    getErrandProposals: vi.fn(),
    getTripProposals: vi.fn(),
    rejectProposal: vi.fn(),
    acceptProposal: vi.fn(),
  },
}));

describe("New API Integrations & Domain Hooks Suite", () => {
  let queryClient: QueryClient;

  const wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    vi.clearAllMocks();
  });

  it("useTripChecklist fetches checklist items with categorized items", async () => {
    vi.mocked(tripsApi.getChecklist).mockResolvedValueOnce({
      success: true,
      message: "Checklist retrieved",
      data: {
        tripId: "trip-100",
        items: [
          {
            id: "chk-1",
            title: "طرد أدوية",
            categoryName: "أدوية",
            categoryIcon: "💊",
            requesterName: "أحمد",
            sizeLabel: "صغير",
            weightLabel: "1 كجم",
            isUrgent: true,
            isCompleted: false,
          },
        ],
      },
    } as any);

    const { result } = renderHook(() => useTripChecklist("trip-100"), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const items = result.current.checklist?.items;
    expect(items).toBeDefined();
    expect(items).toHaveLength(1);
    expect(items?.[0].title).toBe("طرد أدوية");
  });

  it("useErrandTracking fetches tracking progress and current stage", async () => {
    vi.mocked(errandsApi.getTracking).mockResolvedValueOnce({
      success: true,
      message: "Tracking info retrieved",
      data: {
        errandId: "err-50",
        currentStage: "IN_TRANSIT",
        stageNumber: 3,
        stages: [
          { key: "PUBLISHED", title: "تم النشر", completed: true, timestamp: "2026-09-30T10:00:00Z" },
          { key: "MATCHED", title: "تم قبول العرض", completed: true, timestamp: "2026-09-30T11:00:00Z" },
          { key: "IN_TRANSIT", title: "في الطريق", completed: false, current: true },
          { key: "DELIVERED", title: "تم التسليم", completed: false },
        ],
      },
    } as any);

    const { result } = renderHook(() => useErrandTracking("err-50"), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.tracking?.stageNumber).toBe(3);
    expect(result.current.tracking?.currentStage).toBe("IN_TRANSIT");
  });

  it("useAssignments updates estimated delivery time", async () => {
    vi.mocked(assignmentsApi.getAssignments).mockResolvedValueOnce({
      success: true,
      data: { assignments: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } },
    } as any);

    vi.mocked(assignmentsApi.updateEstimatedDeliveryTime).mockResolvedValueOnce({
      success: true,
      message: "Delivery time updated",
      data: {
        assignment: {
          id: "asg-1",
          estimatedDeliveryAt: "2026-09-30T16:00:00Z",
        },
      },
    } as any);

    const { result } = renderHook(() => useAssignments(), { wrapper });

    await result.current.updateEstimatedDeliveryTime({
      id: "asg-1",
      estimatedDeliveryAt: "2026-09-30T16:00:00Z",
    });

    expect(assignmentsApi.updateEstimatedDeliveryTime).toHaveBeenCalledWith("asg-1", {
      estimatedDeliveryAt: "2026-09-30T16:00:00Z",
    });
  });

  it("usePayments handles verifyOtp, resendOtp, and uploadReceipt", async () => {
    vi.mocked(paymentsApi.getPackages).mockResolvedValueOnce({
      success: true,
      data: { packages: [] },
    } as any);

    vi.mocked(paymentsApi.verifyPaymentOtp).mockResolvedValueOnce({
      success: true,
      message: "OTP verified",
      data: {
        success: true,
        invoice: { id: "inv-1", status: "PAID" },
      },
    } as any);

    vi.mocked(paymentsApi.resendPaymentOtp).mockResolvedValueOnce({
      success: true,
      message: "OTP resent",
      data: {
        message: "OTP resent",
      },
    } as any);

    const mockFile = new File(["receipt image"], "receipt.png", { type: "image/png" });
    vi.mocked(paymentsApi.uploadReceipt).mockResolvedValueOnce({
      success: true,
      message: "Receipt uploaded",
      data: {
        success: true,
        invoice: { id: "inv-1", status: "PENDING_VERIFICATION" },
      },
    } as any);

    const { result } = renderHook(() => usePayments(), { wrapper });

    // Verify OTP
    const verifyRes = await result.current.verifyOtp({
      invoiceId: "inv-1",
      otpCode: "123456",
    });
    expect(paymentsApi.verifyPaymentOtp).toHaveBeenCalledWith("inv-1", { otpCode: "123456" });
    expect(verifyRes.data?.invoice.status).toBe("PAID");

    // Resend OTP
    const resendRes = await result.current.resendOtp("inv-1");
    expect(paymentsApi.resendPaymentOtp).toHaveBeenCalledWith("inv-1");
    expect(resendRes.data?.message).toBe("OTP resent");

    // Upload Receipt
    const uploadRes = await result.current.uploadReceipt({
      invoiceId: "inv-1",
      receiptImage: mockFile,
    });
    expect(paymentsApi.uploadReceipt).toHaveBeenCalledWith("inv-1", mockFile);
    expect(uploadRes.data?.success).toBe(true);
  });

  it("useAuth executes changePassword and deactivateAccount", async () => {
    vi.mocked(authApi.changePassword).mockResolvedValueOnce({
      success: true,
      message: "Password updated",
      data: null,
    } as any);

    vi.mocked(authApi.deactivateAccount).mockResolvedValueOnce({
      success: true,
      message: "Account deactivated",
      data: null,
    } as any);

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Change Password
    const changeRes = await result.current.changePassword({
      currentPassword: "OldPassword123!",
      newPassword: "NewPassword123!",
      refreshToken: "ref-tok-1",
    });
    expect(authApi.changePassword).toHaveBeenCalledWith({
      currentPassword: "OldPassword123!",
      newPassword: "NewPassword123!",
      refreshToken: "ref-tok-1",
    });
    expect(changeRes.success).toBe(true);

    // Deactivate Account
    const deactRes = await result.current.deactivateAccount({
      password: "NewPassword123!",
      confirmation: "DELETE",
    });
    expect(authApi.deactivateAccount).toHaveBeenCalledWith({
      password: "NewPassword123!",
      confirmation: "DELETE",
    });
    expect(deactRes.success).toBe(true);
  });

  it("useProposals allows rejecting proposals with rejectionNote", async () => {
    vi.mocked(proposalsApi.rejectProposal).mockResolvedValueOnce({
      success: true,
      message: "Proposal rejected",
      data: { rejected: true, proposal: { id: "prop-99", status: "REJECTED" } },
    } as any);

    const { result } = renderHook(() => useProposals(), { wrapper });

    const rejectRes = await result.current.rejectProposal({
      id: "prop-99",
      rejectionNote: "السعر غير مناسب للرحلة",
    });

    expect(proposalsApi.rejectProposal).toHaveBeenCalledWith(
      "prop-99",
      "السعر غير مناسب للرحلة",
    );
    expect(rejectRes.data?.rejected).toBe(true);
  });
});
