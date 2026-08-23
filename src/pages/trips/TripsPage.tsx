import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Car } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { TripCard } from "../../components/trips/TripCard";
import type { TripCardData } from "../../components/trips/TripCard";
import { TripFilterBar } from "../../components/trips/TripFilterBar";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useTrips } from "../../hooks/useTrips";

export default function TripsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("NEWEST");

  /*
   * ============================================================================
   * BACKEND INTEGRATION PLACEHOLDER: Trips Feed
   * Endpoint: GET /api/v1/trips
   * Handles: Loading, Error (ErrorState with retry), Empty (EmptyState).
   * ============================================================================
   */
  const {
    trips: backendTrips,
    isLoading,
    isError,
    refetch,
  } = useTrips({
    city: cityFilter === "ALL" ? undefined : cityFilter,
    sort: sortOrder,
  });

  // Static preview dataset while endpoint is pending deployment
  const staticFallbackTrips: TripCardData[] = [
    {
      id: "trip-1",
      travelerName: "محمد أبو ريدة",
      avatarInitials: "مر",
      avatarBg: "bg-[#123A68]",
      capacityText: "أغراض خفيفة فقط",
      rating: 4.8,
      origin: "غزة - الرمال",
      destination: "رفح",
      date: "الخميس 21 أغسطس",
      time: "9:30 صباحاً",
      notes: "يوجد مانع من الأغراض الثقيلة، أغراض خفيفة فقط",
    },
    {
      id: "trip-2",
      travelerName: "خالد السعدي",
      avatarInitials: "خس",
      avatarBg: "bg-[#F36F21]",
      capacityText: "حمولة حتى 5 كجم",
      rating: 4.9,
      origin: "دير البلح",
      destination: "خان يونس",
      date: "الخميس 21 أغسطس",
      time: "1:00 ظهراً",
      notes: null,
    },
    {
      id: "trip-3",
      travelerName: "أحمد النجار",
      avatarInitials: "أن",
      avatarBg: "bg-emerald-600",
      capacityText: "حمولة حتى 10 كجم",
      rating: 4.7,
      origin: "خان يونس",
      destination: "غزة",
      date: "الجمعة 22 أغسطس",
      time: "8:00 صباحاً",
      notes: "أغراض طبية ومستندات لها أولوية",
    },
  ];

  // Map Backend DTO if endpoint is available, otherwise use static fallback
  const displayTrips: TripCardData[] =
    backendTrips && backendTrips.length > 0
      ? backendTrips.map((t) => ({
          id: t.id,
          travelerName: t.traveler?.fullName || "مسافر مسجل",
          avatarInitials: t.traveler?.fullName
            ? t.traveler.fullName.slice(0, 2)
            : "مس",
          avatarBg: "bg-[#123A68]",
          capacityText: t.capacityText || "سعة غير محددة",
          rating: t.traveler?.trustScore
            ? Number((t.traveler.trustScore / 20).toFixed(1))
            : 4.8,
          origin: t.originNeighborhood
            ? `${t.originCity} - ${t.originNeighborhood}`
            : t.originCity,
          destination: t.destinationNeighborhood
            ? `${t.destinationCity} - ${t.destinationNeighborhood}`
            : t.destinationCity,
          date: t.departureDate,
          time: t.departureTime,
          notes: t.notes || null,
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
    return true;
  });

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-16 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title Header with Action Button */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-[#123A68]">الرحلات المتاحة</h1>

          <button
            type="button"
            onClick={() => navigate("/trips/create")}
            className="flex h-11 items-center justify-center gap-1.5 rounded-2xl bg-[#F36F21] px-4 text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة رحلة</span>
          </button>
        </div>

        {/* Filter Bar */}
        <TripFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          cityFilter={cityFilter}
          onCityChange={setCityFilter}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />

        {/* Loading State */}
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
          /* Error State with Retry */
          <ErrorState
            title="تعذر تحميل الرحلات"
            message="حدث خطأ أثناء جلب قائمة الرحلات، يرجى المحاولة مرة أخرى."
            onRetry={() => refetch()}
          />
        ) : filteredTrips.length === 0 ? (
          /* Structured Empty State from Design System */
          <EmptyState
            icon={<Car className="h-7 w-7 text-[#123A68]" />}
            title="لا توجد رحلات متاحة حالياً"
            description="لم يقم أحد بإضافة رحلة متطابقة مع هذا البحث حتى الآن. يمكنك إضافة رحلتك القادمة ومساعدة الآخرين."
            actionText="إضافة رحلة جديدة"
            onAction={() => navigate("/trips/create")}
          />
        ) : (
          /* Trips List */
          <div className="space-y-3.5 pt-1">
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
