import type { Errand, WeightClass } from "./errands";

export type TripStatus = "ACTIVE" | "COMPLETED" | "CANCELLED";
export type AssignmentStatus = "ACCEPTED" | "PICKED_UP" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED";

export interface Trip {
  trip_id: string;
  traveler_id: string;
  traveler_name: string;
  traveler_trust_score: number;
  destination_keyword: string;
  neighborhood_id: string;
  departure_time: string;
  max_capacity: WeightClass;
  remaining_capacity: WeightClass;
  status: TripStatus;
  created_at: string;
}

export interface CreateTripRequestDTO {
  destination_keyword: string;
  neighborhood_id: string;
  departure_time: string;
  max_capacity: WeightClass;
}

export interface TravelerFeedItemDTO {
  match_id: string;
  trip_id: string;
  errand: Errand;
  match_score: number;
  distance_category: "SAME_NEIGHBORHOOD" | "ADJACENT_ZONE";
  estimated_fee_nis: 3 | 5 | 7;
  badges_required?: string[];
  match_status: "SUGGESTED" | "ACCEPTED" | "REJECTED" | "EXPIRED";
  expires_at?: string;
}

export interface TravelerFeedResponseDTO {
  feed_timestamp: string;
  total_matches: number;
  urgent_count: number;
  items: TravelerFeedItemDTO[];
}

export interface AcceptErrandRequestDTO {
  errand_id: string;
  acceptance_source: "DIRECT" | "TRIP_MATCH";
  trip_id?: string;
}

export interface AssignmentResponseDTO {
  assignment_id: string;
  errand_id: string;
  traveler_id: string;
  trip_id?: string;
  acceptance_source: "DIRECT" | "TRIP_MATCH";
  status: AssignmentStatus;
  accepted_at: string;
  picked_up_at?: string;
  in_transit_at?: string;
  completed_at?: string;
  cancelled_at?: string;
}
