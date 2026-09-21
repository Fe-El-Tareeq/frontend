import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
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
    const res = await apiClient.post<
      ApiSuccessResponse<{ proposal: Proposal }>
    >(ENDPOINTS.PROPOSALS.CREATE, payload);
    return res.data;
  },

  acceptProposal: async (id: string) => {
    const res = await apiClient.post<
      ApiSuccessResponse<AcceptProposalResponseData>
    >(ENDPOINTS.PROPOSALS.ACCEPT(id), {});
    return res.data;
  },

  rejectProposal: async (id: string) => {
    const res = await apiClient.post<
      ApiSuccessResponse<RejectProposalResponseData>
    >(ENDPOINTS.PROPOSALS.REJECT(id), {});
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

  withdrawProposal: async (id: string) => {
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

  getErrandProposals: async (errandId: string) => {
    const res = await apiClient.get<
      ApiSuccessResponse<ProposalListResponseData>
    >(ENDPOINTS.PROPOSALS.ERRAND_PROPOSALS(errandId));
    return res.data;
  },

  getTripProposals: async (tripId: string) => {
    const res = await apiClient.get<
      ApiSuccessResponse<ProposalListResponseData>
    >(ENDPOINTS.PROPOSALS.TRIP_PROPOSALS(tripId));
    return res.data;
  },
};
