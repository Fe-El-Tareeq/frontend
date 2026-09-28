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
    badgeBg: "bg-red-50",
    badgeText: "text-red-700",
    cardBorder: "border-red-200",
    cardBg: "bg-red-50/20",
    headerBg: "bg-red-50/80",
    headerBorder: "border-red-200/60",
    textColor: "text-red-700",
    badgeBorder: "border-red-200",
    dividerColor: "divide-red-100",
    tabSelected: "bg-red-50 border-red-300 text-red-700 shadow-xs font-black",
  },
  {
    id: "00f3ef85-d13d-4577-888c-958374437340",
    name: "وثائق / أوراق",
    icon: "📄",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    cardBorder: "border-blue-200",
    cardBg: "bg-blue-50/20",
    headerBg: "bg-blue-50/80",
    headerBorder: "border-blue-200/60",
    textColor: "text-blue-700",
    badgeBorder: "border-blue-200",
    dividerColor: "divide-blue-100",
    tabSelected: "bg-blue-50 border-blue-300 text-blue-700 shadow-xs font-black",
  },
  {
    id: "f3ec724e-d763-4b9d-9b1a-e2e734a6ac8b",
    name: "طرد / بضاعة عامة",
    icon: "📦",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    cardBorder: "border-amber-200",
    cardBg: "bg-amber-50/20",
    headerBg: "bg-amber-50/80",
    headerBorder: "border-amber-200/60",
    textColor: "text-amber-700",
    badgeBorder: "border-amber-200",
    dividerColor: "divide-amber-100",
    tabSelected: "bg-amber-50 border-amber-300 text-amber-700 shadow-xs font-black",
  },
  {
    id: "b9171634-30c4-4831-899d-10fab390d5eb",
    name: "مواد غذائية",
    icon: "🥫",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-700",
    cardBorder: "border-orange-200",
    cardBg: "bg-orange-50/20",
    headerBg: "bg-orange-50/80",
    headerBorder: "border-orange-200/60",
    textColor: "text-orange-700",
    badgeBorder: "border-orange-200",
    dividerColor: "divide-orange-100",
    tabSelected: "bg-orange-50 border-orange-300 text-orange-700 shadow-xs font-black",
  },
  {
    id: "6a3bf094-2a87-4179-be52-e46e4356f6ec",
    name: "ملابس / أحذية",
    icon: "👕",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-700",
    cardBorder: "border-purple-200",
    cardBg: "bg-purple-50/20",
    headerBg: "bg-purple-50/80",
    headerBorder: "border-purple-200/60",
    textColor: "text-purple-700",
    badgeBorder: "border-purple-200",
    dividerColor: "divide-purple-100",
    tabSelected: "bg-purple-50 border-purple-300 text-purple-700 shadow-xs font-black",
  },
  {
    id: "ea575922-4dc2-449d-9539-9aa87698305f",
    name: "إلكترونيات / شواحن",
    icon: "🔌",
    badgeBg: "bg-cyan-50",
    badgeText: "text-cyan-700",
    cardBorder: "border-cyan-200",
    cardBg: "bg-cyan-50/20",
    headerBg: "bg-cyan-50/80",
    headerBorder: "border-cyan-200/60",
    textColor: "text-cyan-700",
    badgeBorder: "border-cyan-200",
    dividerColor: "divide-cyan-100",
    tabSelected: "bg-cyan-50 border-cyan-300 text-cyan-700 shadow-xs font-black",
  },
  {
    id: "67895f12-5576-4f44-a7d6-3734d2a114c5",
    name: "مستلزمات أطفال",
    icon: "🍼",
    badgeBg: "bg-pink-50",
    badgeText: "text-pink-700",
    cardBorder: "border-pink-200",
    cardBg: "bg-pink-50/20",
    headerBg: "bg-pink-50/80",
    headerBorder: "border-pink-200/60",
    textColor: "text-pink-700",
    badgeBorder: "border-pink-200",
    dividerColor: "divide-pink-100",
    tabSelected: "bg-pink-50 border-pink-300 text-pink-700 shadow-xs font-black",
  },
  {
    id: "193779e4-6271-436d-8f4a-a7c1b452189f",
    name: "مياه",
    icon: "💧",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    cardBorder: "border-sky-200",
    cardBg: "bg-sky-50/20",
    headerBg: "bg-sky-50/80",
    headerBorder: "border-sky-200/60",
    textColor: "text-sky-700",
    badgeBorder: "border-sky-200",
    dividerColor: "divide-sky-100",
    tabSelected: "bg-sky-50 border-sky-300 text-sky-700 shadow-xs font-black",
  },
  {
    id: "f012d591-f0b6-45fd-9827-6b2f21c77d50",
    name: "مستلزمات منزلية",
    icon: "🏠",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-700",
    cardBorder: "border-teal-200",
    cardBg: "bg-teal-50/20",
    headerBg: "bg-teal-50/80",
    headerBorder: "border-teal-200/60",
    textColor: "text-teal-700",
    badgeBorder: "border-teal-200",
    dividerColor: "divide-teal-100",
    tabSelected: "bg-teal-50 border-teal-300 text-teal-700 shadow-xs font-black",
  },
  {
    id: "70a05540-187b-49c4-b927-afdf98372215",
    name: "أخرى",
    icon: "✨",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-700",
    cardBorder: "border-slate-200",
    cardBg: "bg-slate-50/40",
    headerBg: "bg-slate-100",
    headerBorder: "border-slate-200",
    textColor: "text-slate-700",
    badgeBorder: "border-slate-200",
    dividerColor: "divide-slate-100",
    tabSelected: "bg-slate-100 border-slate-300 text-slate-700 shadow-xs font-black",
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
  neighborhoodId?: string;
  status?: ErrandStatus;
  categoryId?: string;
  urgent?: boolean;
  skip?: number;
  take?: number;
}
