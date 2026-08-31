import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Car } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useTrips } from "../../hooks/useTrips";

export default function TripsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("NEWEST");

  const {
    trips: backendTrips,
    isLoading,
    isError,
    refetch,
  } = useTrips({
    city: cityFilter === "ALL" ? undefined : cityFilter,
    sort: sortOrder,
  });

  // 6 Trips exactly matching Figma Batch 1 image 4
  const staticFallbackTrips = [
    {
      id: "trip-1",
      travelerName: "أحمد خالد",
      avatarInitials: "أخ",
      avatarBg: "bg-[#F36F21]",
      capacityText: "حتى 4 أغراض",
      rating: 4.9,
      origin: "غزة - الرمال",
      destination: "رفح",
      dateTime: "23 يونيو 2024 • 10:00 ص",
      note: "لا مانع من الأغراض الثقيلة",
    },
    {
      id: "trip-2",
      travelerName: "سارة عمر",
      avatarInitials: "سع",
      avatarBg: "bg-red-600",
      capacityText: "حتى 5 أغراض",
      rating: 4.7,
      origin: "خان يونس",
      destination: "غزة - الشجاعية",
      dateTime: "24 يونيو 2024 • 2:00 م",
      note: null,
    },
    {
      id: "trip-3",
      travelerName: "محمد يوسف",
      avatarInitials: "مي",
      avatarBg: "bg-teal-600",
      capacityText: "حتى 2 أغراض",
      rating: 5.0,
      origin: "دير البلح",
      destination: "بيت لاهيا",
      dateTime: "25 يونيو 2024 • 9:00 ص",
      note: "أغراض خفيفة فقط",
    },
    {
      id: "trip-4",
      travelerName: "ليلى حسن",
      avatarInitials: "لح",
      avatarBg: "bg-purple-600",
      capacityText: "حتى 4 أغراض",
      rating: 4.6,
      origin: "غزة - التفاح",
      destination: "خان يونس",
      dateTime: "26 يونيو 2024 • 11:30 ص",
      note: null,
    },
    {
      id: "trip-5",
      travelerName: "عمر نبيل",
      avatarInitials: "عن",
      avatarBg: "bg-[#F36F21]",
      capacityText: "حتى 6 أغراض",
      rating: 4.8,
      origin: "رفح",
      destination: "غزة - النصر",
      dateTime: "27 يونيو 2024 • 5:00 م",
      note: "متاح للأغراض المتنوعة",
    },
    {
      id: "trip-6",
      travelerName: "نور إبراهيم",
      avatarInitials: "نإ",
      avatarBg: "bg-teal-600",
      capacityText: "حتى 4 أغراض",
      rating: 4.5,
      origin: "بيت حانون",
      destination: "دير البلح",
      dateTime: "28 يونيو 2024 • 8:30 ص",
      note: null,
    },
  ];

  const displayTrips =
    backendTrips && backendTrips.length > 0
      ? backendTrips.map((t) => ({
          id: t.id,
          travelerName: t.traveler?.fullName || "مسافر مسجل",
          avatarInitials: t.traveler?.fullName
            ? t.traveler.fullName.slice(0, 2)
            : "مس",
          avatarBg: "bg-[#123A68]",
          capacityText: t.capacityText || "سعة مناسبة",
          rating: t.traveler?.trustScore
            ? Number((t.traveler.trustScore / 20).toFixed(1))
            : 4.8,
          origin: t.originNeighborhood
            ? `${t.originCity} - ${t.originNeighborhood}`
            : t.originCity,
          destination: t.destinationNeighborhood
            ? `${t.destinationCity} - ${t.destinationNeighborhood}`
            : t.destinationCity,
          dateTime: `${t.departureDate} • ${t.departureTime}`,
          note: t.notes || null,
        }))
      : staticFallbackTrips;

  const filteredTrips = displayTrips.filter((t) => {
    if (
      searchQuery &&
      !t.travelerName.includes(searchQuery) &&
      !t.origin.includes(searchQuery) &&
      !t.destination.includes(searchQuery)
    ) {
      return false;
    }
    if (cityFilter !== "ALL" && !t.origin.includes(cityFilter) && !t.destination.includes(cityFilter)) {
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

        {/* Filter Card */}
        <div className="rounded-3xl bg-white p-4 border border-border shadow-xs space-y-2.5 text-right">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن وجهة أو مسافر..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] pr-10 pl-4 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none text-right"
            />
            <Search className="absolute right-3.5 top-3.5 h-4 w-4 text-text-muted pointer-events-none" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3 text-xs text-primary focus:border-accent focus:outline-none"
            >
              <option value="ALL">كل المدن ⌵</option>
              <option value="غزة">غزة</option>
              <option value="شمال غزة">شمال غزة</option>
              <option value="دير البلح">دير البلح</option>
              <option value="خان يونس">خان يونس</option>
              <option value="رفح">رفح</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3 text-xs text-primary focus:border-accent focus:outline-none"
            >
              <option value="NEWEST">الترتيب: الأحدث ⌵</option>
              <option value="RATING">الأعلى تقييماً</option>
            </select>
          </div>
        </div>

        {/* Trips List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-44 w-full animate-pulse rounded-3xl bg-white border border-border"
              />
            ))}
          </div>
        ) : isError ? (
          <ErrorState
            title="تعذر تحميل الرحلات"
            message="حدث خطأ أثناء جلب قائمة الرحلات."
            onRetry={() => refetch()}
          />
        ) : filteredTrips.length === 0 ? (
          <EmptyState
            icon={<Car className="h-7 w-7 text-[#123A68]" />}
            title="لا توجد رحلات متاحة"
            description="لم نتمكن من العثور على أي رحلات تطابق هذا البحث."
            actionText="إضافة رحلة جديدة"
            onAction={() => navigate("/trips/create")}
          />
        ) : (
          <div className="space-y-3.5 pt-1">
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="rounded-3xl bg-white p-4.5 border border-border shadow-xs space-y-3 hover:border-[#123A68]/30 transition-all text-right"
              >
                {/* Traveler Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <span>⭐</span>
                    <span>{trip.rating}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="text-right">
                      <h3 className="text-sm font-black text-[#123A68]">
                        {trip.travelerName}
                      </h3>
                      <span className="text-[10.5px] text-text-muted">
                        {trip.capacityText}
                      </span>
                    </div>

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${trip.avatarBg} text-xs font-black text-white`}
                    >
                      {trip.avatarInitials}
                    </div>
                  </div>
                </div>

                {/* Route Box with dotted vertical line */}
                <div className="rounded-2xl bg-[#F8FAFC] p-3 border border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#123A68]">
                    <span className="h-2 w-2 rounded-full bg-[#123A68]" />
                    <span>{trip.origin}</span>
                  </div>
                  <div className="mr-1 h-3 border-r-2 border-dashed border-slate-300" />
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F36F21]">
                    <span className="h-2 w-2 rounded-full bg-[#F36F21]" />
                    <span>{trip.destination}</span>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="text-[11px] text-text-muted text-right">
                  📅 {trip.dateTime}
                </div>

                {/* Note Pill if available */}
                {trip.note && (
                  <div className="rounded-xl bg-amber-50/80 p-2 text-right text-[11px] font-bold text-amber-800 border border-amber-200/60">
                    💡 {trip.note}
                  </div>
                )}

                {/* View Details Button */}
                <button
                  type="button"
                  onClick={() => navigate(`/trips/${trip.id}`)}
                  className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-xs"
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
