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

export type ItemSize = "ENVELOPE" | "SMALL" | "MEDIUM" | "LARGE";

export interface ErrandItemPayload {
  id?: string;
  categoryId?: string;
  categoryName?: string;
  categoryIcon?: string;
  name: string;
  description?: string;
  quantity: number;
  size: ItemSize;
  isUrgent: boolean;
  itemNote?: string;
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
  headerBg: string;
}

export const PRESET_CATEGORIES: CategoryOption[] = [
  {
    id: "pharmacy",
    name: "دواء / صيدلية",
    icon: "💊",
    badgeBg: "bg-red-50",
    badgeText: "text-red-700",
    headerBg: "bg-red-50/80 border-red-200 text-red-700",
  },
  {
    id: "documents",
    name: "وثائق / أوراق",
    icon: "📄",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    headerBg: "bg-blue-50/80 border-blue-200 text-blue-700",
  },
  {
    id: "package",
    name: "طرد / بضاعة عامة",
    icon: "📦",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    headerBg: "bg-amber-50/80 border-amber-200 text-amber-700",
  },
  {
    id: "food",
    name: "مواد غذائية",
    icon: "🥫",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-700",
    headerBg: "bg-orange-50/80 border-orange-200 text-orange-700",
  },
  {
    id: "clothes",
    name: "ملابس / أحذية",
    icon: "👕",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-700",
    headerBg: "bg-purple-50/80 border-purple-200 text-purple-700",
  },
  {
    id: "electronics",
    name: "إلكترونيات / شواحن",
    icon: "🔌",
    badgeBg: "bg-cyan-50",
    badgeText: "text-cyan-700",
    headerBg: "bg-cyan-50/80 border-cyan-200 text-cyan-700",
  },
  {
    id: "books",
    name: "كتب / أدوات دراسية",
    icon: "📚",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
    headerBg: "bg-indigo-50/80 border-indigo-200 text-indigo-700",
  },
  {
    id: "keys",
    name: "مفاتيح / بطاقات",
    icon: "🔑",
    badgeBg: "bg-yellow-50",
    badgeText: "text-yellow-700",
    headerBg: "bg-yellow-50/80 border-yellow-200 text-yellow-700",
  },
  {
    id: "other",
    name: "أخرى",
    icon: "✨",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-700",
    headerBg: "bg-slate-100 border-slate-200 text-slate-700",
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
