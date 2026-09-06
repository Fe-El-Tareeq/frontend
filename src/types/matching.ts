import type { Trip } from "./trips";
import type { Errand } from "./errands";

export interface MatchScoreBreakdown {
  matchScore: number;
  destinationScore?: number;
  timeScore?: number;
  loadScore?: number;
  urgentBoost?: number;
  trustPenalty?: number;
}

export interface TripMatchItem {
  trip: Trip;
  score: MatchScoreBreakdown;
}

export interface ErrandMatchItem {
  errand: Errand;
  score: MatchScoreBreakdown;
}

export interface MatchingTripsForErrandResponseData {
  matches: TripMatchItem[];
  limit: number;
  recalculatedAt: string;
}

export interface MatchingErrandsForTripResponseData {
  matches: ErrandMatchItem[];
  limit: number;
  recalculatedAt: string;
}
