import { useQuery } from "@tanstack/react-query";
import { pricingApi } from "../api/pricing";
import type { DeliveryPricingQuoteRequest } from "../types";

export const PRICING_KEYS = {
  all: ["pricing"] as const,
  quote: (params: DeliveryPricingQuoteRequest) =>
    [...PRICING_KEYS.all, "quote", params] as const,
};

export function useDeliveryPricing(params: DeliveryPricingQuoteRequest) {
  const query = useQuery({
    queryKey: PRICING_KEYS.quote(params),
    queryFn: () => pricingApi.getQuote(params),
    enabled: Boolean(params.destinationNeighborhoodId),
    select: (res) => res.data,
  });

  return {
    quote: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
