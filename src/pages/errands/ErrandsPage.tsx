import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, MapPin, Loader2 } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { useErrands } from "../../hooks/useErrands";
import { cn } from "../../utils/cn";

interface ErrandDisplayItem {
  id: string;
  requesterName: string;
  initials: string;
  avatarBg: string;
  dateStr: string;
  status: "OPEN" | "MATCHED" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED" | "EXPIRED";
  statusText: string;
  statusBadgeClass: string;
  title: string;
  location: string;
  originCity?: string;
  destinationCity?: string;
}

const CITIES = ["جميع المدن", "غزة", "خانيونس", "رفح", "الشمال", "دير البلح"];

// Curated avatar background colors matching design
const AVATAR_COLORS = [
  "bg-purple-600 text-white",
  "bg-orange-600 text-white",
  "bg-red-600 text-white",
  "bg-[#123A68] text-white",
  "bg-teal-600 text-white",
  "bg-indigo-600 text-white",
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name: string): string {
  if (!name) return "ط";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`;
  }
  return parts[0].slice(0, 2);
}

// Fallback demo items perfectly matching design image 1
const DEMO_ERRANDS: ErrandDisplayItem[] = [
  {
    id: "demo-1",
    requesterName: "فاطمة علي",
    initials: "فع",
    avatarBg: "bg-purple-600 text-white",
    dateStr: "23 يوليو",
    status: "OPEN",
    statusText: "قيد الانتظار",
    statusBadgeClass: "bg-[#FEF3C7] text-[#D97706] dark:bg-amber-950/40 dark:text-amber-400",
    title: "توصيل دواء من صيدلية في رفح إلى منزلي في غزة - الرمال",
    location: "الرمال",
    originCity: "رفح",
    destinationCity: "غزة",
  },
  {
    id: "demo-2",
    requesterName: "خالد عبدالله",
    initials: "خع",
    avatarBg: "bg-purple-600 text-white",
    dateStr: "22 يوليو",
    status: "MATCHED",
    statusText: "تم التطابق",
    statusBadgeClass: "bg-[#DBEAFE] text-[#2563EB] dark:bg-blue-950/40 dark:text-blue-400",
    title: "توصيل وثائق رسمية من ديوان الموظفين في خان يونس",
    location: "الشجاعية",
    originCity: "خانيونس",
    destinationCity: "غزة",
  },
  {
    id: "demo-3",
    requesterName: "رنا سعيد",
    initials: "رس",
    avatarBg: "bg-orange-600 text-white",
    dateStr: "21 يوليو",
    status: "COMPLETED",
    statusText: "مكتمل",
    statusBadgeClass: "bg-[#D1FAE5] text-[#059669] dark:bg-emerald-950/40 dark:text-emerald-400",
    title: "شراء مستلزمات مدرسية من محلات خان يونس",
    location: "بيت لاهيا",
    originCity: "خانيونس",
    destinationCity: "الشمال",
  },
  {
    id: "demo-4",
    requesterName: "ياسر حمدان",
    initials: "يح",
    avatarBg: "bg-red-600 text-white",
    dateStr: "20 يوليو",
    status: "OPEN",
    statusText: "قيد الانتظار",
    statusBadgeClass: "bg-[#FEF3C7] text-[#D97706] dark:bg-amber-950/40 dark:text-amber-400",
    title: "توصيل طرود صغيرة من مكتب البريد المركزي",
    location: "رفح",
    originCity: "غزة",
    destinationCity: "رفح",
  },
  {
    id: "demo-5",
    requesterName: "منى فارس",
    initials: "مف",
    avatarBg: "bg-[#123A68] text-white",
    dateStr: "19 يوليو",
    status: "CANCELLED",
    statusText: "ملغي",
    statusBadgeClass: "bg-[#FEE2E2] text-[#DC2626] dark:bg-red-950/40 dark:text-red-400",
    title: "شراء ملابس أطفال من سوق الشجاعية",
    location: "الرمال",
    originCity: "غزة",
    destinationCity: "غزة",
  },
];

export default function ErrandsPage() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("جميع المدن");
  const [originSearch, setOriginSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");

  const { errands: backendErrands, isLoading } = useErrands();

  const formattedErrands: ErrandDisplayItem[] = useMemo(() => {
    if (!backendErrands || backendErrands.length === 0) {
      return DEMO_ERRANDS;
    }

    return backendErrands.map((e) => {
      const isWaiting = e.status === "OPEN";
      const isMatched = e.status === "MATCHED" || e.status === "IN_TRANSIT";
      const isCompleted = e.status === "COMPLETED";

      const statusText = isWaiting
        ? "قيد الانتظار"
        : isMatched
          ? "تم التطابق"
          : isCompleted
            ? "مكتمل"
            : "ملغي";

      const statusBadgeClass = isWaiting
        ? "bg-[#FEF3C7] text-[#D97706] dark:bg-amber-950/40 dark:text-amber-400"
        : isMatched
          ? "bg-[#DBEAFE] text-[#2563EB] dark:bg-blue-950/40 dark:text-blue-400"
          : isCompleted
            ? "bg-[#D1FAE5] text-[#059669] dark:bg-emerald-950/40 dark:text-emerald-400"
            : "bg-[#FEE2E2] text-[#DC2626] dark:bg-red-950/40 dark:text-red-400";

      const name = e.requester?.fullName || "مستخدم بطريقك";
      const dateStr = e.createdAt
        ? new Date(e.createdAt).toLocaleDateString("ar-EG", {
            day: "numeric",
            month: "long",
          })
        : "اليوم";

      const destinationName =
        e.destinationNeighborhood?.name ||
        e.destinationKeyword ||
        e.destinationNeighborhood?.governorate ||
        "الوجهة";

      const originCity = e.neighborhood?.governorate || e.neighborhood?.name || "";
      const destinationCity =
        e.destinationNeighborhood?.governorate || e.destinationNeighborhood?.name || "";

      return {
        id: e.id,
        requesterName: name,
        initials: getInitials(name),
        avatarBg: getAvatarColor(name),
        dateStr,
        status: e.status,
        statusText,
        statusBadgeClass,
        title: e.title || e.itemsDescription || "طلب توصيل غرض",
        location: destinationName,
        originCity,
        destinationCity,
      };
    });
  }, [backendErrands]);

  // Apply filters: City pill + Origin Search + Destination Search
  const filteredErrands = useMemo(() => {
    return formattedErrands.filter((item) => {
      // 1. City Pill Filter
      if (selectedCity !== "جميع المدن") {
        const matchesCity =
          item.location.includes(selectedCity) ||
          (item.originCity && item.originCity.includes(selectedCity)) ||
          (item.destinationCity && item.destinationCity.includes(selectedCity)) ||
          item.title.includes(selectedCity);
        if (!matchesCity) return false;
      }

      // 2. Origin Search Filter
      if (originSearch.trim()) {
        const cleanOrigin = originSearch.trim();
        const matchesOrigin =
          (item.originCity && item.originCity.includes(cleanOrigin)) ||
          item.title.includes(cleanOrigin);
        if (!matchesOrigin) return false;
      }

      // 3. Destination Search Filter
      if (destinationSearch.trim()) {
        const cleanDest = destinationSearch.trim();
        const matchesDest =
          item.location.includes(cleanDest) ||
          (item.destinationCity && item.destinationCity.includes(cleanDest)) ||
          item.title.includes(cleanDest);
        if (!matchesDest) return false;
      }

      return true;
    });
  }, [formattedErrands, selectedCity, originSearch, destinationSearch]);

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] min-h-screen pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Page Title & Count Row */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-black text-[#123A68] dark:text-white">
            طلبات الأغراض
          </h1>
          <span className="text-sm font-bold text-slate-400 dark:text-slate-400">
            {filteredErrands.length} طلب
          </span>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/errands/new")}
            className="flex-1 py-3 px-4 rounded-xl bg-[#F36F21] hover:bg-[#E05E12] active:scale-98 text-white font-black text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="h-4.5 w-4.5" />
            <span>إنشاء طلب جديد</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/errands/incoming-offers")}
            className="flex-1 py-3 px-4 rounded-xl bg-[#123A68] hover:bg-[#0E2F54] active:scale-98 text-white font-black text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span>العروض الواردة</span>
          </button>
        </div>

        {/* Search by Trip Direction */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
            ابحث عن طلبات بنفس اتجاه رحلتك :
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Origin Search (Right in RTL) */}
            <div className="relative">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={originSearch}
                onChange={(e) => setOriginSearch(e.target.value)}
                placeholder="مثال: من غزة"
                className="w-full h-11 pr-10 pl-3 rounded-xl bg-white dark:bg-[#102A4C] border border-slate-200/80 dark:border-white/10 text-xs md:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123A68]/20 focus:border-[#123A68] transition-all"
              />
            </div>

            {/* Destination Search (Left in RTL) */}
            <div className="relative">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={destinationSearch}
                onChange={(e) => setDestinationSearch(e.target.value)}
                placeholder="مثال: إلى رفح"
                className="w-full h-11 pr-10 pl-3 rounded-xl bg-white dark:bg-[#102A4C] border border-slate-200/80 dark:border-white/10 text-xs md:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123A68]/20 focus:border-[#123A68] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Horizontal City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CITIES.map((city) => {
            const isSelected = selectedCity === city;
            return (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer",
                  isSelected
                    ? "bg-[#123A68] text-white shadow-xs"
                    : "bg-white dark:bg-[#102A4C] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5",
                )}
              >
                {city}
              </button>
            );
          })}
        </div>

        {/* Errands List Feed */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#123A68] dark:text-blue-400" />
            <p className="text-xs text-slate-400 font-medium">جاري تحميل الطلبات...</p>
          </div>
        ) : filteredErrands.length === 0 ? (
          <EmptyState
            title="لا توجد طلبات مطابقة"
            description="لم نجد طلبات تطابق معايير البحث أو المدينة المحددة حالياً."
            actionText="عرض جميع الطلبات"
            onAction={() => {
              setSelectedCity("جميع المدن");
              setOriginSearch("");
              setDestinationSearch("");
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredErrands.map((errand) => (
              <div
                key={errand.id}
                className="rounded-3xl bg-white dark:bg-[#102A4C] border border-slate-100 dark:border-white/10 p-4.5 shadow-xs flex flex-col justify-between space-y-3 transition-all hover:border-slate-200 dark:hover:border-white/20 hover:shadow-md"
              >
                <div className="space-y-3">
                  {/* Top Card Header */}
                  <div className="flex items-start justify-between">
                    {/* Status Badge (Left in RTL) */}
                    <span
                      className={cn(
                        "text-[11px] font-bold px-2.5 py-1 rounded-full",
                        errand.statusBadgeClass,
                      )}
                    >
                      {errand.statusText}
                    </span>

                    {/* User Info (Right in RTL) */}
                    <div className="flex items-center gap-2.5">
                      <div className="text-right">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                          {errand.requesterName}
                        </h3>
                        <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5">
                          {errand.dateStr}
                        </p>
                      </div>

                      <div
                        className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center font-black text-xs shrink-0 shadow-2xs",
                          errand.avatarBg,
                        )}
                      >
                        {errand.initials}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-100 leading-relaxed text-right line-clamp-3">
                    {errand.title}
                  </p>

                  {/* Location Pin */}
                  <div className="flex items-center justify-end gap-1 text-slate-500 dark:text-slate-400">
                    <span className="text-[11px] font-semibold">{errand.location}</span>
                    <MapPin className="h-3.5 w-3.5 text-[#F36F21]" />
                  </div>
                </div>

                {/* Full Width Details Button */}
                <button
                  type="button"
                  onClick={() => navigate(`/errands/${errand.id}`)}
                  className="w-full py-2.5 rounded-2xl bg-[#F0F4F8] hover:bg-[#E2E8F0] dark:bg-white/5 dark:hover:bg-white/10 text-[#123A68] dark:text-blue-300 font-bold text-xs md:text-sm transition-colors text-center cursor-pointer active:scale-99 mt-2"
                >
                  عرض التفاصيل
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
