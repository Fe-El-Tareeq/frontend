import type { Neighborhood } from "./locations";

export type PricingRule =
  | "AREA_OVERRIDE"
  | "SAME_AREA"
  | "NEARBY_AREA"
  | "SAME_ZONE"
  | "ZONE_RATE";

export interface DeliveryPricingQuote {
  originNeighborhood: Neighborhood;
  destinationNeighborhood: Neighborhood;
  deliveryFeeNis: number;
  pricingRule: PricingRule;
  pricingVersion: string;
  currency: string;
}

export interface DeliveryPricingQuoteRequest {
  destinationNeighborhoodId: string;
  originNeighborhoodId?: string;
}
