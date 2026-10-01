import type { PaginationMeta } from "./api";
import type { UserSummary } from "./auth";

export type ProposalType = "TRAVELER_OFFER" | "REQUESTER_REQUEST";

export type ProposalStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "WITHDRAWN"
  | "CANCELLED"
  | "EXPIRED";

export interface Proposal {
  id: string;
  errandId?: string | null;
  tripId?: string | null;
  proposerId?: string;
  type?: ProposalType;
  clientRequestKey?: string;
  message?: string | null;
  priceNis?: number;
  departureTime?: string | null;
  notes?: string | null;
  audioMemoUrl?: string | null;
  status: ProposalStatus;
  proposer?: UserSummary;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProposalRequest {
  errandId?: string;
  tripId?: string;
  clientRequestKey?: string;
  type?: ProposalType;
  message?: string | null;
  priceNis?: number;
  departureTime?: string;
  notes?: string;
  audioMemoUrl?: string;
}

export interface ProposalListResponseData {
  proposals: Proposal[];
  pagination: PaginationMeta;
}

export interface AcceptProposalResponseData {
  accepted: boolean;
  proposal: Proposal;
  assignmentId?: string;
}

export interface RejectProposalRequest {
  rejectionNote?: string;
}

export interface RejectProposalResponseData {
  rejected: boolean;
  proposal: Proposal;
}

