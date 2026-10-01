import { describe, it, expect, vi, beforeEach } from "vitest";
import { adminApi } from "../api/admin";
import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";

vi.mock("../api/client", () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Admin API Client Module", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("verifies all ENDPOINTS.ADMIN and ENDPOINTS.ADMIN_AUTH route constants", () => {
    const id = "123";

    expect(ENDPOINTS.ADMIN_AUTH.LOGIN).toBe("/api/v1/admin/auth/login");
    expect(ENDPOINTS.ADMIN_AUTH.ME).toBe("/api/v1/admin/auth/me");
    expect(ENDPOINTS.ADMIN.PAYMENTS_INVOICES).toBe("/api/v1/admin/payments/invoices");
    expect(ENDPOINTS.ADMIN.PAYMENTS_APPROVE(id)).toBe(`/api/v1/admin/payments/invoices/${id}/approve`);
    expect(ENDPOINTS.ADMIN.PAYMENTS_REJECT(id)).toBe(`/api/v1/admin/payments/invoices/${id}/reject`);
    expect(ENDPOINTS.ADMIN.VERIFICATIONS).toBe("/api/v1/admin/verifications");
    expect(ENDPOINTS.ADMIN.VERIFICATION_APPROVE(id)).toBe(`/api/v1/admin/verifications/${id}/approve`);
    expect(ENDPOINTS.ADMIN.VERIFICATION_REJECT(id)).toBe(`/api/v1/admin/verifications/${id}/reject`);
    expect(ENDPOINTS.ADMIN.FAQS).toBe("/api/v1/admin/faqs");
    expect(ENDPOINTS.ADMIN.FAQ_DETAIL(id)).toBe(`/api/v1/admin/faqs/${id}`);
    expect(ENDPOINTS.ADMIN.FAQ_REORDER).toBe("/api/v1/admin/faqs/reorder");
  });

  it("handles Payment Invoices review API calls", async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: {
        success: true,
        data: {
          invoices: [
            { id: "inv-1", amountNis: 15, status: "PENDING" },
          ],
        },
      },
    } as any);

    const invoicesRes = await adminApi.getPendingInvoices({ status: "PENDING", skip: 0, take: 10 });
    expect(apiClient.get).toHaveBeenCalledWith(ENDPOINTS.ADMIN.PAYMENTS_INVOICES, {
      params: { status: "PENDING", skip: 0, take: 10 },
    });
    expect(invoicesRes.data.invoices).toHaveLength(1);

    vi.mocked(apiClient.post).mockResolvedValueOnce({
      data: { success: true, data: { approved: true } },
    } as any);

    const approveRes = await adminApi.approveInvoice("inv-1");
    expect(apiClient.post).toHaveBeenCalledWith(ENDPOINTS.ADMIN.PAYMENTS_APPROVE("inv-1"), {});
    expect(approveRes.data.approved).toBe(true);

    vi.mocked(apiClient.post).mockResolvedValueOnce({
      data: { success: true, data: { rejected: true } },
    } as any);

    const rejectRes = await adminApi.rejectInvoice("inv-1", "إيصال غير واضح");
    expect(apiClient.post).toHaveBeenCalledWith(ENDPOINTS.ADMIN.PAYMENTS_REJECT("inv-1"), {
      rejectionNotes: "إيصال غير واضح",
    });
    expect(rejectRes.data.rejected).toBe(true);
  });

  it("handles KYC Verifications review API calls", async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: {
        success: true,
        data: {
          verifications: [{ id: "ver-1", userId: "u-1", status: "PENDING_REVIEW" }],
        },
      },
    } as any);

    const kycRes = await adminApi.getPendingKyc({ status: "PENDING_REVIEW" });
    expect(apiClient.get).toHaveBeenCalledWith(ENDPOINTS.ADMIN.VERIFICATIONS, {
      params: { status: "PENDING_REVIEW" },
    });
    expect(kycRes.data.verifications).toHaveLength(1);

    vi.mocked(apiClient.post).mockResolvedValueOnce({
      data: { success: true, data: { approved: true } },
    } as any);

    const approveRes = await adminApi.approveKyc("ver-1");
    expect(apiClient.post).toHaveBeenCalledWith(ENDPOINTS.ADMIN.VERIFICATION_APPROVE("ver-1"), {});
    expect(approveRes.data.approved).toBe(true);

    vi.mocked(apiClient.post).mockResolvedValueOnce({
      data: { success: true, data: { rejected: true } },
    } as any);

    const rejectRes = await adminApi.rejectKyc("ver-1", "الهوية منتهية الصلاحية");
    expect(apiClient.post).toHaveBeenCalledWith(ENDPOINTS.ADMIN.VERIFICATION_REJECT("ver-1"), {
      rejectionReason: "الهوية منتهية الصلاحية",
    });
    expect(rejectRes.data.rejected).toBe(true);
  });

  it("performs full FAQs CRUD and reordering operations", async () => {
    // List
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: {
        success: true,
        data: {
          faqs: [
            { id: "faq-1", question: "كيف يتم الدفع؟", answer: "عبر جوال باي أو التحويل البنكي", displayOrder: 1, isActive: true },
          ],
        },
      },
    } as any);

    const listRes = await adminApi.getFaqs();
    expect(apiClient.get).toHaveBeenCalledWith(ENDPOINTS.ADMIN.FAQS);
    expect(listRes.data.faqs).toHaveLength(1);

    // Create
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      data: {
        success: true,
        data: { faq: { id: "faq-2", question: "سؤال جديد", answer: "إجابة وافية", displayOrder: 2, isActive: true } },
      },
    } as any);

    const createRes = await adminApi.createFaq({
      question: "سؤال جديد",
      answer: "إجابة وافية",
      displayOrder: 2,
      isActive: true,
    });
    expect(apiClient.post).toHaveBeenCalledWith(
      ENDPOINTS.ADMIN.FAQS,
      expect.objectContaining({ question: "سؤال جديد" }),
    );
    expect(createRes.data.faq.id).toBe("faq-2");

    // Update
    vi.mocked(apiClient.put).mockResolvedValueOnce({
      data: {
        success: true,
        data: { faq: { id: "faq-1", question: "كيف يتم الدفع؟", answer: "عبر جوال باي", displayOrder: 1, isActive: false } },
      },
    } as any);

    const updateRes = await adminApi.updateFaq("faq-1", { isActive: false });
    expect(apiClient.put).toHaveBeenCalledWith(
      ENDPOINTS.ADMIN.FAQ_DETAIL("faq-1"),
      { isActive: false },
    );
    expect(updateRes.data.faq.isActive).toBe(false);

    // Delete
    vi.mocked(apiClient.delete).mockResolvedValueOnce({
      data: { success: true, data: { deleted: true } },
    } as any);

    const deleteRes = await adminApi.deleteFaq("faq-1");
    expect(apiClient.delete).toHaveBeenCalledWith(ENDPOINTS.ADMIN.FAQ_DETAIL("faq-1"));
    expect(deleteRes.data.deleted).toBe(true);

    // Reorder
    vi.mocked(apiClient.post).mockResolvedValueOnce({
      data: { success: true, data: { reordered: true } },
    } as any);

    const reorderRes = await adminApi.reorderFaqs({
      items: [{ id: "faq-1", displayOrder: 2 }, { id: "faq-2", displayOrder: 1 }],
    });
    expect(apiClient.post).toHaveBeenCalledWith(ENDPOINTS.ADMIN.FAQ_REORDER, {
      items: [{ id: "faq-1", displayOrder: 2 }, { id: "faq-2", displayOrder: 1 }],
    });
    expect(reorderRes.data.reordered).toBe(true);
  });
});
