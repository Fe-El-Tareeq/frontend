import type { PaginationMeta } from "./api";
import type { Neighborhood } from "./locations";

export type WeightClass = "LIGHT" | "MEDIUM" | "HEAVY";
export type ErrandStatus =
  "OPEN" | "MATCHED" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED" | "EXPIRED";

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
  profileImageUrl?: string | null;
  isVerified?: boolean;
}

export interface ErrandImage {
  id?: string;
  imageUrl: string;
  position?: number;
}

export interface Errand {
  id: string;
  requesterId: string;
  categoryId?: string | null;
  neighborhoodId: string;
  destinationNeighborhoodId?: string | null;
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
  destinationNeighborhood?: Neighborhood | null;
  requester?: ErrandRequester;
  items?: ErrandItemPayload[];
  images?: ErrandImage[];
  imageUrls?: string[];
  createdAt: string;
  updatedAt: string;
}

export type ItemSize = "ENVELOPE" | "SMALL" | "MEDIUM" | "LARGE";

export interface ErrandItemPayload {
  id?: string;
  categoryId?: string;
  categoryName?: string;
  categoryIcon?: string;
  name: string;
  description?: string | null;
  quantity: number;
  size: ItemSize;
  isUrgent: boolean;
  itemNote?: string | null;
}

export interface ErrandCreateRequest {
  clientRequestKey: string;
  categoryId?: string;
  pickupNeighborhoodId: string;
  destinationKeyword: string;
  items?: ErrandItemPayload[];
  title?: string;
  itemsDescription?: string;
  weightClass?: WeightClass;
  isUrgent?: boolean;
  isInterZone?: boolean;
  voiceNoteUrl?: string | null;
  voiceNoteDurationSec?: number | null;
  imageUrls?: string[];
  neededByTime?: string | null;
}

export interface CategoryOption {
  id: string;
  name: string;
  icon: string;
  badgeBg: string;
  badgeText: string;
  cardBorder: string;
  cardBg: string;
  headerBg: string;
  headerBorder: string;
  textColor: string;
  badgeBorder: string;
  dividerColor: string;
  tabSelected: string;
}

export const PRESET_CATEGORIES: CategoryOption[] = [
  {
    id: "ffcb81e7-6ee6-4be3-9de2-188b1da4f395",
    name: "دواء / صيدلية",
    icon: "💊",
    badgeBg: "bg-red-50 dark:bg-red-950/40",
    badgeText: "text-red-700 dark:text-red-300",
    cardBorder: "border-red-200 dark:border-red-900/50",
    cardBg: "bg-red-50/20 dark:bg-red-950/20",
    headerBg: "bg-red-50/80 dark:bg-red-950/60",
    headerBorder: "border-red-200/60 dark:border-red-900/40",
    textColor: "text-red-700 dark:text-red-300",
    badgeBorder: "border-red-200 dark:border-red-800/60",
    dividerColor: "divide-red-100 dark:divide-red-900/30",
    tabSelected: "bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 shadow-xs font-black",
  },
  {
    id: "00f3ef85-d13d-4577-888c-958374437340",
    name: "وثائق / أوراق",
    icon: "📄",
    badgeBg: "bg-blue-50 dark:bg-blue-950/40",
    badgeText: "text-blue-700 dark:text-blue-300",
    cardBorder: "border-blue-200 dark:border-blue-900/50",
    cardBg: "bg-blue-50/20 dark:bg-blue-950/20",
    headerBg: "bg-blue-50/80 dark:bg-blue-950/60",
    headerBorder: "border-blue-200/60 dark:border-blue-900/40",
    textColor: "text-blue-700 dark:text-blue-300",
    badgeBorder: "border-blue-200 dark:border-blue-800/60",
    dividerColor: "divide-blue-100 dark:divide-blue-900/30",
    tabSelected: "bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 shadow-xs font-black",
  },
  {
    id: "f3ec724e-d763-4b9d-9b1a-e2e734a6ac8b",
    name: "طرد / بضاعة عامة",
    icon: "📦",
    badgeBg: "bg-amber-50 dark:bg-amber-950/40",
    badgeText: "text-amber-700 dark:text-amber-300",
    cardBorder: "border-amber-200 dark:border-amber-900/50",
    cardBg: "bg-amber-50/20 dark:bg-amber-950/20",
    headerBg: "bg-amber-50/80 dark:bg-amber-950/60",
    headerBorder: "border-amber-200/60 dark:border-amber-900/40",
    textColor: "text-amber-700 dark:text-amber-300",
    badgeBorder: "border-amber-200 dark:border-amber-800/60",
    dividerColor: "divide-amber-100 dark:divide-amber-900/30",
    tabSelected: "bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 shadow-xs font-black",
  },
  {
    id: "b9171634-30c4-4831-899d-10fab390d5eb",
    name: "مواد غذائية",
    icon: "🥫",
    badgeBg: "bg-orange-50 dark:bg-orange-950/40",
    badgeText: "text-orange-700 dark:text-orange-300",
    cardBorder: "border-orange-200 dark:border-orange-900/50",
    cardBg: "bg-orange-50/20 dark:bg-orange-950/20",
    headerBg: "bg-orange-50/80 dark:bg-orange-950/60",
    headerBorder: "border-orange-200/60 dark:border-orange-900/40",
    textColor: "text-orange-700 dark:text-orange-300",
    badgeBorder: "border-orange-200 dark:border-orange-800/60",
    dividerColor: "divide-orange-100 dark:divide-orange-900/30",
    tabSelected: "bg-orange-50 dark:bg-orange-950/60 border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 shadow-xs font-black",
  },
  {
    id: "6a3bf094-2a87-4179-be52-e46e4356f6ec",
    name: "ملابس / أحذية",
    icon: "👕",
    badgeBg: "bg-purple-50 dark:bg-purple-950/40",
    badgeText: "text-purple-700 dark:text-purple-300",
    cardBorder: "border-purple-200 dark:border-purple-900/50",
    cardBg: "bg-purple-50/20 dark:bg-purple-950/20",
    headerBg: "bg-purple-50/80 dark:bg-purple-950/60",
    headerBorder: "border-purple-200/60 dark:border-purple-900/40",
    textColor: "text-purple-700 dark:text-purple-300",
    badgeBorder: "border-purple-200 dark:border-purple-800/60",
    dividerColor: "divide-purple-100 dark:divide-purple-900/30",
    tabSelected: "bg-purple-50 dark:bg-purple-950/60 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 shadow-xs font-black",
  },
  {
    id: "ea575922-4dc2-449d-9539-9aa87698305f",
    name: "إلكترونيات / شواحن",
    icon: "🔌",
    badgeBg: "bg-cyan-50 dark:bg-cyan-950/40",
    badgeText: "text-cyan-700 dark:text-cyan-300",
    cardBorder: "border-cyan-200 dark:border-cyan-900/50",
    cardBg: "bg-cyan-50/20 dark:bg-cyan-950/20",
    headerBg: "bg-cyan-50/80 dark:bg-cyan-950/60",
    headerBorder: "border-cyan-200/60 dark:border-cyan-900/40",
    textColor: "text-cyan-700 dark:text-cyan-300",
    badgeBorder: "border-cyan-200 dark:border-cyan-800/60",
    dividerColor: "divide-cyan-100 dark:divide-cyan-900/30",
    tabSelected: "bg-cyan-50 dark:bg-cyan-950/60 border-cyan-300 dark:border-cyan-700 text-cyan-700 dark:text-cyan-300 shadow-xs font-black",
  },
  {
    id: "67895f12-5576-4f44-a7d6-3734d2a114c5",
    name: "مستلزمات أطفال",
    icon: "🍼",
    badgeBg: "bg-pink-50 dark:bg-pink-950/40",
    badgeText: "text-pink-700 dark:text-pink-300",
    cardBorder: "border-pink-200 dark:border-pink-900/50",
    cardBg: "bg-pink-50/20 dark:bg-pink-950/20",
    headerBg: "bg-pink-50/80 dark:bg-pink-950/60",
    headerBorder: "border-pink-200/60 dark:border-pink-900/40",
    textColor: "text-pink-700 dark:text-pink-300",
    badgeBorder: "border-pink-200 dark:border-pink-800/60",
    dividerColor: "divide-pink-100 dark:divide-pink-900/30",
    tabSelected: "bg-pink-50 dark:bg-pink-950/60 border-pink-300 dark:border-pink-700 text-pink-700 dark:text-pink-300 shadow-xs font-black",
  },
  {
    id: "193779e4-6271-436d-8f4a-a7c1b452189f",
    name: "مياه",
    icon: "💧",
    badgeBg: "bg-sky-50 dark:bg-sky-950/40",
    badgeText: "text-sky-700 dark:text-sky-300",
    cardBorder: "border-sky-200 dark:border-sky-900/50",
    cardBg: "bg-sky-50/20 dark:bg-sky-950/20",
    headerBg: "bg-sky-50/80 dark:bg-sky-950/60",
    headerBorder: "border-sky-200/60 dark:border-sky-900/40",
    textColor: "text-sky-700 dark:text-sky-300",
    badgeBorder: "border-sky-200 dark:border-sky-800/60",
    dividerColor: "divide-sky-100 dark:divide-sky-900/30",
    tabSelected: "bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-700 text-sky-700 dark:text-sky-300 shadow-xs font-black",
  },
  {
    id: "f012d591-f0b6-45fd-9827-6b2f21c77d50",
    name: "مستلزمات منزلية",
    icon: "🏠",
    badgeBg: "bg-teal-50 dark:bg-teal-950/40",
    badgeText: "text-teal-700 dark:text-teal-300",
    cardBorder: "border-teal-200 dark:border-teal-900/50",
    cardBg: "bg-teal-50/20 dark:bg-teal-950/20",
    headerBg: "bg-teal-50/80 dark:bg-teal-950/60",
    headerBorder: "border-teal-200/60 dark:border-teal-900/40",
    textColor: "text-teal-700 dark:text-teal-300",
    badgeBorder: "border-teal-200 dark:border-teal-800/60",
    dividerColor: "divide-teal-100 dark:divide-teal-900/30",
    tabSelected: "bg-teal-50 dark:bg-teal-950/60 border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300 shadow-xs font-black",
  },
  {
    id: "70a05540-187b-49c4-b927-afdf98372215",
    name: "أخرى",
    icon: "✨",
    badgeBg: "bg-slate-100 dark:bg-white/10",
    badgeText: "text-slate-700 dark:text-slate-300",
    cardBorder: "border-slate-200 dark:border-white/10",
    cardBg: "bg-slate-50/40 dark:bg-white/5",
    headerBg: "bg-slate-100 dark:bg-white/10",
    headerBorder: "border-slate-200 dark:border-white/10",
    textColor: "text-slate-700 dark:text-slate-300",
    badgeBorder: "border-slate-200 dark:border-white/10",
    dividerColor: "divide-slate-100 dark:divide-white/10",
    tabSelected: "bg-slate-100 dark:bg-white/15 border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-200 shadow-xs font-black",
  },
];

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
  originZoneKey?: string;
  destinationZoneKey?: string;
  originCity?: string;
  destinationCity?: string;
  originNeighborhoodId?: string;
  destinationNeighborhoodId?: string;
  neighborhoodId?: string;
  categoryId?: string;
  status?: ErrandStatus;
  urgent?: boolean;
  mine?: boolean;
  skip?: number;
  take?: number;
}

export interface ErrandCancelRequest {
  cancellationReason: string;
}

export type ErrandTrackingStageType =
  | "PUBLISHED"
  | "ACCEPTED"
  | "IN_TRANSIT"
  | "DELIVERED";

export interface ErrandTrackingStage {
  stage: ErrandTrackingStageType;
  completed: boolean;
  reachedAt?: string | null;
}

export interface ErrandTrackingTraveler {
  id: string;
  fullName: string | null;
  trustScore?: number;
  profileImageUrl?: string | null;
  isVerified?: boolean;
  acceptanceMessage?: string | null;
}

export interface ErrandTrackingData {
  currentStage: ErrandTrackingStageType;
  stageNumber?: number;
  progressPercentage: number;
  stages: ErrandTrackingStage[];
  cancellation?: {
    cancelledAt: string;
    cancellationReason?: string | null;
    cancelledByUserId?: string | null;
  } | null;
  estimatedDeliveryAt?: string | null;
  traveler?: ErrandTrackingTraveler | null;
}

export interface ErrandTrackingResponseData {
  tracking: ErrandTrackingData;
}

