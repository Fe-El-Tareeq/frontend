import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  ApiSuccessResponse,
  LegalVersionMetadata,
  LegalAcceptanceRequest,
  LegalAcceptanceResponseData,
} from "../types";

export const legalApi = {
  getCurrentLegal: async () => {
    const res = await apiClient.get<
      ApiSuccessResponse<LegalVersionMetadata>
    >(ENDPOINTS.LEGAL.CURRENT);
    return res.data;
  },

  acceptLegal: async (payload: LegalAcceptanceRequest) => {
    const res = await apiClient.post<
      ApiSuccessResponse<LegalAcceptanceResponseData>
    >(ENDPOINTS.LEGAL.ACCEPTANCES, payload);
    return res.data;
  },
};
