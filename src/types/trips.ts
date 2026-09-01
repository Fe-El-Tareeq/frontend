import type { WeightClass } from "./errands";
import type { Neighborhood } from "./locations";
import type { PaginationMeta } from "./api";

export type TripStatus = "ACTIVE" | "CANCELLED" | "EXPIRED" | "COMPLETED";
export type TripOriginType = "DEFAULT_NEIGHBORHOOD" | "CUSTOM_KEYWORD";

export interface TripTraveler {
  id: string;
  fullName: string;
  trustScore?: number;
  profileImageUrl?: string | null;
}

export interface Trip {
  id: string;
  travelerId: string;
  neighborhoodId: string;
  destinationNeighborhoodId: string;
  clientRequestKey: string;
  originType: TripOriginType;
  customOriginKeyword?: string | null;
  destinationKeyword: string;
  deliveryFeeNis: number;
  pricingRule?: string;
  pricingVersion?: string;
  departureTime: string;
  expectedReturnTime?: string;
  maxCapacityClass: WeightClass;
  maxCapacityUnits: number;
  remainingCapacityUnits: number;
  notes?: string | null;
  status: TripStatus;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  neighborhood?: Neighborhood;
  destinationNeighborhood?: Neighborhood;
  traveler?: TripTraveler;
}

export interface TripFilterParams {
  neighborhoodId?: string;
  destinationKeyword?: string;
  status?: TripStatus;
  departureFrom?: string;
  departureTo?: string;
  mine?: boolean;
  skip?: number;
  take?: number;
}

export interface TripListData {
  trips: Trip[];
  pagination: PaginationMeta;
}

export interface CreateTripRequest {
  clientRequestKey: string;
  originType: TripOriginType;
  originNeighborhoodId?: string;
  customOriginKeyword?: string | null;
  destinationKeyword: string;
  destinationNeighborhoodId: string;
  departureTime: string;
  expectedReturnTime: string;
  maxCapacityClass: WeightClass;
  maxCapacityUnits: number;
  notes?: string | null;
}

export interface UpdateTripRequest {
  departureTime?: string;
  expectedReturnTime?: string;
  maxCapacityClass?: WeightClass;
  maxCapacityUnits?: number;
  notes?: string | null;
}
