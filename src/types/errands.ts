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
    id: "60a32850-bd3f-444a-84b4-c750abf6ecb1",
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
    id: "60a32850-bd3f-444a-84b4-c750abf6ecb2",
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
    id: "60a32850-bd3f-444a-84b4-c750abf6ecb3",
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
    id: "60a32850-bd3f-444a-84b4-c750abf6ecb4",
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
    id: "60a32850-bd3f-444a-84b4-c750abf6ecb5",
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
    id: "60a32850-bd3f-444a-84b4-c750abf6ecb6",
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
    id: "60a32850-bd3f-444a-84b4-c750abf6ecb7",
    name: "كتب / أدوات دراسية",
    icon: "📚",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
    cardBorder: "border-indigo-200",
    cardBg: "bg-indigo-50/20",
    headerBg: "bg-indigo-50/80",
    headerBorder: "border-indigo-200/60",
    textColor: "text-indigo-700",
    badgeBorder: "border-indigo-200",
    dividerColor: "divide-indigo-100",
    tabSelected: "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-xs font-black",
  },
  {
    id: "60a32850-bd3f-444a-84b4-c750abf6ecb8",
    name: "مفاتيح / بطاقات",
    icon: "🔑",
    badgeBg: "bg-yellow-50",
    badgeText: "text-yellow-700",
    cardBorder: "border-yellow-200",
    cardBg: "bg-yellow-50/20",
    headerBg: "bg-yellow-50/80",
    headerBorder: "border-yellow-200/60",
    textColor: "text-yellow-700",
    badgeBorder: "border-yellow-200",
    dividerColor: "divide-yellow-100",
    tabSelected: "bg-yellow-50 border-yellow-300 text-yellow-700 shadow-xs font-black",
  },
  {
    id: "60a32850-bd3f-444a-84b4-c750abf6ecb9",
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
