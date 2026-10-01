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
  originZoneKey?: string;
  originCity?: string;
  originNeighborhoodId?: string;
  neighborhoodId?: string;
  destinationZoneKey?: string;
  destinationCity?: string;
  destinationNeighborhoodId?: string;
  destinationKeyword?: string;
  status?: TripStatus;
  departureFrom?: string;
  departureTo?: string;
  mine?: boolean;
  skip?: number;
  take?: number;
}

export interface TripUserSummary {
  activeTripsCount?: number;
  completedTripsCount?: number;
  totalEarningsNis?: number;
}

export interface TripListData {
  trips: Trip[];
  pagination: PaginationMeta;
  summary?: TripUserSummary;
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

export interface TripChecklistItem {
  id: string;
  assignmentId: string;
  errandId: string;
  categoryId?: string;
  categoryName?: string;
  categoryIcon?: string;
  requesterName?: string;
  title: string;
  quantity?: number;
  size?: string;
  sizeLabel?: string;
  weightLabel?: string;
  isUrgent?: boolean;
  isPickedUp: boolean;
  isDelivered: boolean;
  isCompleted: boolean;
}

export interface TripChecklistProgress {
  completed: number;
  total: number;
  percentage: number;
}

export interface TripChecklistData {
  checklist: TripChecklistItem[];
  items?: TripChecklistItem[];
  progress: TripChecklistProgress;
}

