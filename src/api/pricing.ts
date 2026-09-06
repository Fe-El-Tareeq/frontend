import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  ApiSuccessResponse,
  DeliveryPricingQuote,
  DeliveryPricingQuoteRequest,
} from "../types";

export const pricingApi = {
  getQuote: async (params: DeliveryPricingQuoteRequest) => {
    const res = await apiClient.get<ApiSuccessResponse<DeliveryPricingQuote>>(
      ENDPOINTS.DELIVERY_PRICING.QUOTE,
      { params },
    );
    return res.data;
  },
};
