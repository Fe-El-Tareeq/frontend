import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  ApiSuccessResponse,
  AdminInvoicesListData,
  AdminVerificationsListData,
  AdminFaqsListData,
  FAQItem,
  CreateFaqRequest,
  UpdateFaqRequest,
  ReorderFaqsRequest,
} from "../types";

export const adminApi = {
  // --- Payment Invoices Review ---
  getPendingInvoices: async (params?: {
    status?: string;
    skip?: number;
    take?: number;
  }) => {
    const res = await apiClient.get<
      ApiSuccessResponse<AdminInvoicesListData>
    >(ENDPOINTS.ADMIN.PAYMENTS_INVOICES, { params });
    return res.data;
  },

  approveInvoice: async (id: string) => {
    const res = await apiClient.post<ApiSuccessResponse<{ approved: boolean }>>(
      ENDPOINTS.ADMIN.PAYMENTS_APPROVE(id),
      {},
    );
    return res.data;
  },

  rejectInvoice: async (id: string, rejectionNotes: string) => {
    const res = await apiClient.post<ApiSuccessResponse<{ rejected: boolean }>>(
      ENDPOINTS.ADMIN.PAYMENTS_REJECT(id),
      { rejectionNotes },
    );
    return res.data;
  },

  // --- KYC Verification Review ---
  getPendingKyc: async (params?: {
    status?: string;
    skip?: number;
    take?: number;
  }) => {
    const res = await apiClient.get<
      ApiSuccessResponse<AdminVerificationsListData>
    >(ENDPOINTS.ADMIN.VERIFICATIONS, { params });
    return res.data;
  },

  approveKyc: async (id: string) => {
    const res = await apiClient.post<ApiSuccessResponse<{ approved: boolean }>>(
      ENDPOINTS.ADMIN.VERIFICATION_APPROVE(id),
      {},
    );
    return res.data;
  },

  rejectKyc: async (id: string, rejectionReason: string) => {
    const res = await apiClient.post<ApiSuccessResponse<{ rejected: boolean }>>(
      ENDPOINTS.ADMIN.VERIFICATION_REJECT(id),
      { rejectionReason },
    );
    return res.data;
  },

  // --- FAQ CRUD & Reordering ---
  getFaqs: async () => {
    const res = await apiClient.get<
      ApiSuccessResponse<AdminFaqsListData>
    >(ENDPOINTS.ADMIN.FAQS);
    return res.data;
  },

  createFaq: async (payload: CreateFaqRequest) => {
    const res = await apiClient.post<ApiSuccessResponse<{ faq: FAQItem }>>(
      ENDPOINTS.ADMIN.FAQS,
      payload,
    );
    return res.data;
  },

  updateFaq: async (id: string, payload: UpdateFaqRequest) => {
    const res = await apiClient.put<ApiSuccessResponse<{ faq: FAQItem }>>(
      ENDPOINTS.ADMIN.FAQ_DETAIL(id),
      payload,
    );
    return res.data;
  },

  deleteFaq: async (id: string) => {
    const res = await apiClient.delete<ApiSuccessResponse<{ deleted: boolean }>>(
      ENDPOINTS.ADMIN.FAQ_DETAIL(id),
    );
    return res.data;
  },

  reorderFaqs: async (payload: ReorderFaqsRequest) => {
    const res = await apiClient.post<ApiSuccessResponse<{ reordered: boolean }>>(
      ENDPOINTS.ADMIN.FAQ_REORDER,
      payload,
    );
    return res.data;
  },
};
