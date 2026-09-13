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
