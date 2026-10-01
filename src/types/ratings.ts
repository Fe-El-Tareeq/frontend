import type { PaginationMeta } from "./api";

export type FeedbackTag =
  | "GOOD_COMMUNICATION"
  | "ON_TIME"
  | "RESPECTFUL"
  | "CAREFUL_HANDLING"
  | "HELPFUL"
  | "LATE"
  | "POOR_COMMUNICATION"
  | "ITEM_PROBLEM";

export type PaymentModality = "CASH" | "BARTER";

export interface RatingUserSummary {
  id: string;
  fullName: string | null;
  trustScore: number;
  profileImageUrl?: string | null;
}

export interface UserBadge {
  awardedAt: string;
  badge: {
    name: string;
    description: string;
    icon: string;
  };
}

export interface Rating {
  id: string;
  assignmentId: string;
  reviewerId: string;
  reviewedUserId: string;
  ratingStars: number;
  comments?: string | null;
  paymentModalityConfirmed?: PaymentModality | null;
  feedbackTags: FeedbackTag[];
  reviewer?: RatingUserSummary;
  reviewedUser?: RatingUserSummary;
  createdAt: string;
  updatedAt: string;
}

export interface RatingCreateRequest {
  assignmentId: string;
  ratingStars: number;
  comments?: string | null;
  feedbackTags?: FeedbackTag[];
  paymentModalityConfirmed?: PaymentModality | null;
}

export interface RatingCreateResponseData {
  rating: Rating;
  created: boolean;
  trustScore: number;
}

export interface PendingRating {
  assignmentId: string;
  completedAt: string;
  errandTitle: string;
  reviewedUser: RatingUserSummary;
  reviewedRole: "TRAVELER" | "REQUESTER";
}

export interface PendingRatingsResponseData {
  pendingRatings: PendingRating[];
  pagination: PaginationMeta;
}

export interface ReceivedRatingsResponseData {
  ratings: Rating[];
  pagination: PaginationMeta;
}

export interface UserRatingSummaryResponseData {
  user: {
    id: string;
    fullName: string | null;
    trustScore: number;
    userBadges: UserBadge[];
  };
  ratingCount: number;
  averageRating: number;
}
