import type { Errand } from "./errands";
import type { Trip } from "./trips";

export type AssignmentStatus =
  | "ACCEPTED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "COMPLETED"
  | "CANCELLED";

export interface AssignmentParticipant {
  id: string;
  fullName: string | null;
  trustScore: number;
  profileImageUrl?: string | null;
}

export interface AssignmentChatRoomSummary {
  id: string;
  assignmentId: string;
  createdAt: string;
  updatedAt: string;
  lastMessageAt?: string | null;
}

export interface Assignment {
  id: string;
  errandId: string;
  travelerId: string;
  tripId: string;
  acceptanceSource: string;
  agreedDeliveryFeeNis: number;
  pricingVersion: string;
  acceptTokenTransactionId: string;
  status: AssignmentStatus;
  acceptedAt: string;
  pickedUpAt?: string | null;
  inTransitAt?: string | null;
  completedAt?: string | null;
  cancelledAt?: string | null;
  cancelledByUserId?: string | null;
  cancellationReason?: string | null;
  errand?: Errand;
  trip?: Trip;
  traveler?: AssignmentParticipant;
  cancelledBy?: AssignmentParticipant | null;
  chatRoom?: AssignmentChatRoomSummary | null;
}

export interface AssignmentCreateRequest {
  errandId: string;
  tripId: string;
}

export interface AssignmentCancelRequest {
  cancellationReason?: string;
}

export interface RatingPrompt {
  required: boolean;
  assignmentId: string;
  reviewedUser: AssignmentParticipant;
  reviewedRole: "TRAVELER" | "REQUESTER";
}

export interface CompleteAssignmentResponseData {
  assignment: Assignment;
  ratingPrompt?: RatingPrompt;
}
