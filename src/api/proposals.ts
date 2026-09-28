import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import { enqueueOfflineMutation } from "../offline/syncEngine";
import type {
  ApiSuccessResponse,
  Proposal,
  CreateProposalRequest,
  ProposalListResponseData,
  AcceptProposalResponseData,
  RejectProposalResponseData,
} from "../types";

export const proposalsApi = {
  createProposal: async (payload: CreateProposalRequest) => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      const mut = await enqueueOfflineMutation({
        type: "SUBMIT_PROPOSAL",
        endpoint: ENDPOINTS.PROPOSALS.CREATE,
        method: "POST",
        payload,
        descriptionAr: `تقديم عرض بقيمة ${payload.priceNis} ₪`,
      });
      return {
        success: true,
        message: "تم حفظ العرض محلياً بانتظار استعادة الاتصال",
        data: {
          proposal: {
            id: mut.id,
            status: "PENDING",
            ...payload,
            createdAt: new Date().toISOString(),
          },
        },
      } as unknown as ApiSuccessResponse<{ proposal: Proposal }>;
    }

    const res = await apiClient.post<
      ApiSuccessResponse<{ proposal: Proposal }>
    >(ENDPOINTS.PROPOSALS.CREATE, payload);
    return res.data;
  },

  acceptProposal: async (id: string) => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      await enqueueOfflineMutation({
        type: "ACCEPT_PROPOSAL",
        endpoint: ENDPOINTS.PROPOSALS.ACCEPT(id),
        method: "POST",
        payload: {},
        descriptionAr: `قبول العرض #${id.slice(0, 6)}`,
      });
      return {
        success: true,
        message: "تم تسجيل قبول العرض محلياً",
        data: { proposalId: id, status: "ACCEPTED" },
      } as unknown as ApiSuccessResponse<AcceptProposalResponseData>;
    }

    const res = await apiClient.post<
      ApiSuccessResponse<AcceptProposalResponseData>
    >(ENDPOINTS.PROPOSALS.ACCEPT(id), {});
    return res.data;
  },

  rejectProposal: async (id: string, reason?: string, details?: string) => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      await enqueueOfflineMutation({
        type: "REJECT_PROPOSAL",
        endpoint: ENDPOINTS.PROPOSALS.REJECT(id),
        method: "POST",
        payload: { reason, details },
        descriptionAr: `رفض العرض #${id.slice(0, 6)}`,
      });
      return {
        success: true,
        message: "تم تسجيل رفض العرض محلياً",
        data: { proposalId: id, status: "REJECTED" },
      } as unknown as ApiSuccessResponse<RejectProposalResponseData>;
    }

    const res = await apiClient.post<
      ApiSuccessResponse<RejectProposalResponseData>
    >(ENDPOINTS.PROPOSALS.REJECT(id), { reason, details });
    return res.data;
  },

  getInboxProposals: async (params?: {
    status?: string;
    unread?: boolean;
    skip?: number;
    take?: number;
  }) => {
    const res = await apiClient.get<
      ApiSuccessResponse<ProposalListResponseData>
    >(ENDPOINTS.PROPOSALS.INBOX, { params });
    return res.data;
  },

  getSentProposals: async (params?: {
    status?: string;
    skip?: number;
    take?: number;
  }) => {
    const res = await apiClient.get<
      ApiSuccessResponse<ProposalListResponseData>
    >(ENDPOINTS.PROPOSALS.SENT, { params });
    return res.data;
  },

  getErrandProposals: async (
    errandId: string,
    params?: { skip?: number; take?: number },
  ) => {
    const res = await apiClient.get<
      ApiSuccessResponse<ProposalListResponseData>
    >(ENDPOINTS.PROPOSALS.INBOX, { params: { errandId, ...params } });
    return res.data;
  },

  getTripProposals: async (
    tripId: string,
    params?: { skip?: number; take?: number },
  ) => {
    const res = await apiClient.get<
      ApiSuccessResponse<ProposalListResponseData>
    >(ENDPOINTS.PROPOSALS.SENT, { params: { tripId, ...params } });
    return res.data;
  },

  withdrawProposal: async (id: string) => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      await enqueueOfflineMutation({
        type: "WITHDRAW_PROPOSAL",
        endpoint: ENDPOINTS.PROPOSALS.WITHDRAW(id),
        method: "POST",
        payload: {},
        descriptionAr: `سحب العرض #${id.slice(0, 6)}`,
      });
      return {
        success: true,
        message: "تم تسجيل سحب العرض محلياً",
        data: { withdrawn: true },
      } as unknown as ApiSuccessResponse<{ withdrawn: boolean }>;
    }

    const res = await apiClient.post<ApiSuccessResponse<{ withdrawn: boolean }>>(
      ENDPOINTS.PROPOSALS.WITHDRAW(id),
      {},
    );
    return res.data;
  },

  markProposalRead: async (id: string) => {
    const res = await apiClient.post<ApiSuccessResponse<{ read: boolean }>>(
      ENDPOINTS.PROPOSALS.READ(id),
      {},
    );
    return res.data;
  },
};
