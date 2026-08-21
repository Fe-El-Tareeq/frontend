import type { PaginationMeta } from "./api";
import type { Neighborhood } from "./locations";

export type WeightClass = "LIGHT" | "MEDIUM" | "HEAVY";
export type ErrandStatus = "OPEN" | "MATCHED" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED" | "EXPIRED";

export interface ErrandCategory {
  id: string;
  name: string;
  icon?: string;
  isActive?: boolean;
}

export interface ErrandRequester {
  id: string;
  fullName: string | null;
  trustScore: number;
}

export interface Errand {
  id: string;
  requesterId: string;
  categoryId?: string | null;
  neighborhoodId: string;
  clientRequestKey: string;
  title: string;
  itemsDescription: string;
  destinationKeyword: string;
  weightClass: WeightClass;
  isUrgent: boolean;
  isInterZone: boolean;
  priorityScore: number;
  calculatedFeeNis: number;
  postTokenCost: number;
  postTokenTransactionId?: string | null;
  voiceNoteUrl?: string | null;
  voiceNoteDurationSec?: number | null;
  status: ErrandStatus;
  neededByTime?: string | null;
  expiresAt: string;
  category?: ErrandCategory | null;
  neighborhood?: Neighborhood | null;
  requester?: ErrandRequester;
  createdAt: string;
  updatedAt: string;
}

export interface ErrandCreateRequest {
  clientRequestKey: string;
  categoryId: string;
  title: string;
  itemsDescription: string;
  destinationKeyword: string;
  weightClass: WeightClass;
  isUrgent?: boolean;
  isInterZone?: boolean;
  neededByTime?: string | null;
  voiceNoteUrl?: string | null;
  voiceNoteDurationSec?: number | null;
}

export interface ErrandUpdateRequest {
  categoryId?: string;
  title?: string;
  itemsDescription?: string;
  destinationKeyword?: string;
  weightClass?: WeightClass;
  isUrgent?: boolean;
  isInterZone?: boolean;
  neededByTime?: string | null;
  voiceNoteUrl?: string | null;
  voiceNoteDurationSec?: number | null;
}

export interface ErrandListData {
  errands: Errand[];
  pagination: PaginationMeta;
}

export interface ErrandFilterParams {
  neighborhoodId?: string;
  status?: ErrandStatus;
  categoryId?: string;
  urgent?: boolean;
  skip?: number;
  take?: number;
}
