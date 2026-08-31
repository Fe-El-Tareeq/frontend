import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  ApiSuccessResponse,
  Errand,
  ErrandCreateRequest,
  ErrandFilterParams,
  ErrandListData,
  ErrandUpdateRequest,
} from "../types";

export const errandsApi = {
  getErrands: async (params?: ErrandFilterParams) => {
    const res = await apiClient.get<ApiSuccessResponse<ErrandListData>>(
      ENDPOINTS.ERRANDS.LIST,
      { params }
    );
    return res.data;
  },

  getErrandById: async (id: string) => {
    const res = await apiClient.get<ApiSuccessResponse<{ errand: Errand }>>(
      ENDPOINTS.ERRANDS.DETAIL(id)
    );
    return res.data;
  },

  createErrand: async (payload: ErrandCreateRequest) => {
    const res = await apiClient.post<ApiSuccessResponse<{ errand: Errand }>>(
      ENDPOINTS.ERRANDS.CREATE,
      payload
    );
    return res.data;
  },

  updateErrand: async (id: string, payload: ErrandUpdateRequest) => {
    const res = await apiClient.patch<ApiSuccessResponse<{ errand: Errand }>>(
      ENDPOINTS.ERRANDS.UPDATE(id),
      payload
    );
    return res.data;
  },

  cancelErrand: async (id: string) => {
    const res = await apiClient.post<ApiSuccessResponse<{ errand: Errand }>>(
      ENDPOINTS.ERRANDS.CANCEL(id)
    );
    return res.data;
  },

  /*
   * ============================================================================
   * BACKEND INTEGRATION PLACEHOLDER: Submit Delivery Offer on Errand
   * Endpoint: POST /api/v1/errands/:id/offers
   * Payload: { priceNis: number; departureTime: string; notes?: string; audioMemoUrl?: string }
   * ============================================================================
   */
  submitOffer: async (
    errandId: string,
    payload: { priceNis: number; departureTime: string; notes?: string }
  ) => {
    const res = await apiClient.post(ENDPOINTS.ERRANDS.OFFERS(errandId), payload);
    return res.data;
  },
};
