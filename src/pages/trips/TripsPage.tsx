import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Car } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { TripCard, type TripCardData } from "../../components/trips/TripCard";
import { useTrips } from "../../hooks/useTrips";
import { useAuth } from "../../hooks/useAuth";

export default function TripsPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<"all" | "mine">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("ALL");

  const { trips: backendTrips, isLoading, isError, refetch } = useTrips();

  const displayTrips: TripCardData[] = backendTrips.map((t, idx) => {
    const originText = t.neighborhood?.name
      ? `${t.neighborhood.governorate || "غزة"} - ${t.neighborhood.name}`
      : t.customOriginKeyword || "غزة";
    const destText = t.destinationNeighborhood?.name
      ? `${t.destinationNeighborhood.governorate || "الوجهة"} - ${t.destinationNeighborhood.name}`
      : t.destinationKeyword;

    const capacityLabel =
      t.maxCapacityClass === "LIGHT"
        ? `حتى ${t.maxCapacityUnits || 2} أغراض (خفيف)`
        : t.maxCapacityClass === "MEDIUM"
          ? `حتى ${t.maxCapacityUnits || 5} أغراض (متوسط)`
          : `حتى ${t.maxCapacityUnits || 8} أغراض (ثقيل)`;

    const dateStr = t.departureTime
      ? new Date(t.departureTime).toLocaleDateString("ar-EG", {
          day: "numeric",
          month: "long",
        })
      : "اليوم";

    const timeStr = t.departureTime
      ? new Date(t.departureTime).toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "10:00 ص";

    return {
      id: t.id,
      travelerName: t.traveler?.fullName || "مسافر نشط",
      avatarInitials: (t.traveler?.fullName || "مسافر")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2),
      avatarBg:
        idx % 3 === 0
          ? "bg-[#123A68]"
          : idx % 3 === 1
            ? "bg-[#F36F21]"
            : "bg-teal-600",
      capacityText: capacityLabel,
      rating: t.traveler?.trustScore
        ? Number((t.traveler.trustScore / 20).toFixed(1))
        : 5.0,
      origin: originText,
      destination: destText,
      date: dateStr,
      time: timeStr,
      notes: t.notes || null,
      travelerId: t.travelerId,
    };
  });

  const filteredTrips = displayTrips.filter((t: TripCardData & { travelerId?: string }) => {
    if (activeTab === "mine" && profile?.id && t.travelerId !== profile.id) {
      return false;
    }
    if (
      searchQuery &&
      !t.travelerName.includes(searchQuery) &&
      !t.origin.includes(searchQuery) &&
      !t.destination.includes(searchQuery)
    ) {
      return false;
    }
    if (
      cityFilter !== "ALL" &&
      !t.origin.includes(cityFilter) &&
      !t.destination.includes(cityFilter)
    ) {
      return false;
    }
    return true;
  });

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title Header with "+ إضافة رحلة" */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68]">الرحلات</h1>
            <span className="text-xs text-text-muted">
              {filteredTrips.length} رحلة متاحة
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/trips/create")}
            className="flex h-11 items-center justify-center gap-1.5 rounded-2xl bg-[#F36F21] px-4 text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#E05E12]"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة رحلة</span>
          </button>
        </div>

        {/* Tab Badges: كل الرحلات / رحلاتي */}
        <div className="flex items-center gap-1 rounded-2xl bg-slate-100 p-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`flex-1 rounded-xl py-2 transition-all cursor-pointer text-center ${
              activeTab === "all"
                ? "bg-[#123A68] text-white shadow-2xs font-black"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            كل الرحلات
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("mine")}
            className={`flex-1 rounded-xl py-2 transition-all cursor-pointer text-center ${
              activeTab === "mine"
                ? "bg-[#123A68] text-white shadow-2xs font-black"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            رحلاتي
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن وجهة أو مسافر..."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white pr-11 pl-4 text-xs font-medium text-text-primary placeholder:text-text-muted focus:border-[#123A68] focus:outline-hidden shadow-2xs text-right"
          />
          <Search className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-text-muted" />
        </div>

        {/* Quick Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold no-scrollbar">
          {[
            { key: "ALL", label: "جميع المدن" },
            { key: "غزة", label: "غزة" },
            { key: "خان يونس", label: "خان يونس" },
            { key: "رفح", label: "رفح" },
            { key: "دير البلح", label: "دير البلح" },
            { key: "الشمال", label: "الشمال" },
          ].map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setCityFilter(c.key)}
              className={`shrink-0 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
                cityFilter === c.key
                  ? "bg-[#123A68] text-white shadow-xs"
                  : "bg-white border border-slate-200 text-text-secondary hover:bg-slate-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-3 pt-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 rounded-3xl bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <ErrorState
            title="تعذر تحميل الرحلات"
            message="حدث خطأ أثناء جلب قائمة الرحلات من الخادم."
            onRetry={refetch}
          />
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredTrips.length === 0 && (
          <EmptyState
            icon={<Car className="h-8 w-8 text-[#123A68]" />}
            title={activeTab === "mine" ? "ليس لديك رحلات معلنة" : "لا توجد رحلات متاحة"}
            description={
              activeTab === "mine"
                ? "أضف مسار رحلتك الأولى لتبدأ بمساعدة أهالي منطقتك واستقبال طلباتهم!"
                : "لم نتمكن من العثور على رحلات تطابق بحثك حالياً. يمكنك إضافة رحلتك الأولى ليراها الجميع!"
            }
            actionText="إضافة رحلة جديدة"
            onAction={() => navigate("/trips/create")}
          />
        )}

        {/* Trips List */}
        {!isLoading && !isError && filteredTrips.length > 0 && (
          <div className="space-y-3.5">
            {filteredTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onViewDetails={(id) => navigate(`/trips/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </MobileContainer>
  );
}

