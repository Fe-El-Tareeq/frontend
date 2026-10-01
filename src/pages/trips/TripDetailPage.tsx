import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Car, Home } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useTripDetail } from "../../hooks/useTrips";
import { useAuth } from "../../hooks/useAuth";
import { TripRequestAcceptModal } from "../../components/trips/TripRequestAcceptModal";
import type { ErrandRequestItem } from "../../components/trips/TripRequestAcceptModal";
import { TripRequestRejectModal } from "../../components/trips/TripRequestRejectModal";
import { PRESET_CATEGORIES } from "../../types/errands";

// Modular sub-components
import { TripOwnerSummaryCard } from "../../components/trips/detail/TripOwnerSummaryCard";
import {
  TripOwnerRequestsFilter,
  type TripRequestFilterTab,
} from "../../components/trips/detail/TripOwnerRequestsFilter";
import {
  TripOwnerRequestsList,
  type TripRequestItem,
} from "../../components/trips/detail/TripOwnerRequestsList";
import { TripPublicHeroCard } from "../../components/trips/detail/TripPublicHeroCard";
import { TripPublicTravelerCard } from "../../components/trips/detail/TripPublicTravelerCard";
import { TripPublicDetailsGrid } from "../../components/trips/detail/TripPublicDetailsGrid";
import { TripPublicStickyBottom } from "../../components/trips/detail/TripPublicStickyBottom";

export default function TripDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile, isAuthenticated } = useAuth();
  const { trip, isLoading, isError, refetch } = useTripDetail(id);

  const [activeTab, setActiveTab] = useState<TripRequestFilterTab>("ALL");
  const [selectedRequest, setSelectedRequest] =
    useState<ErrandRequestItem | null>(null);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const [requests, setRequests] = useState<TripRequestItem[]>([]);

  const handleConfirmAccept = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status: "ACCEPTED" } : r,
      ),
    );
    setIsAcceptModalOpen(false);
  };

  const handleConfirmReject = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status: "REJECTED" } : r,
      ),
    );
    setIsRejectModalOpen(false);
  };

  if (isLoading) {
    return (
      <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 text-right">
        <Header />
        <div className="p-4 space-y-4">
          <div className="h-44 w-full animate-pulse rounded-3xl bg-white dark:bg-[#102A4C] border border-border dark:border-white/10" />
          <div className="h-28 w-full animate-pulse rounded-3xl bg-white dark:bg-[#102A4C] border border-border dark:border-white/10" />
        </div>
      </MobileContainer>
    );
  }

  if (isError) {
    return (
      <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 text-right">
        <Header />
        <div className="p-4">
          <ErrorState
            title="تعذر تحميل تفاصيل الرحلة"
            message="حدث خطأ أثناء جلب بيانات الرحلة من الخادم."
            onRetry={() => refetch()}
          />
        </div>
      </MobileContainer>
    );
  }

  if (!trip) {
    return (
      <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 text-right">
        <Header />
        <div className="p-4">
          <EmptyState
            icon={<Car className="h-8 w-8 text-[#123A68]" />}
            title="الرحلة غير موجودة"
            description="لم نتمكن من العثور على الرحلة المطلوبة."
            actionText="العودة للرحلات"
            onAction={() => navigate("/trips")}
          />
        </div>
      </MobileContainer>
    );
  }

  const isOwner = Boolean(profile?.id && trip.travelerId === profile.id);
  const isCompleted = trip.status === "COMPLETED";

  const originText = trip.neighborhood?.name
    ? `${trip.neighborhood.governorate || "غزة"} - ${trip.neighborhood.name}`
    : trip.customOriginKeyword || "غزة - الرمال";
  const destText = trip.destinationNeighborhood?.name
    ? `${trip.destinationNeighborhood.governorate || "الوجهة"} - ${trip.destinationNeighborhood.name}`
    : trip.destinationKeyword || "رفح";

  const dateStr = trip.departureTime
    ? new Date(trip.departureTime).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "23 يوليو 2026";

  const timeStr = trip.departureTime
    ? new Date(trip.departureTime).toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "1:00 ص";

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    if (activeTab === "ALL") return true;
    return r.status === activeTab;
  });

  // Group filtered requests by category
  const groupedCategories = PRESET_CATEGORIES.map((cat) => {
    const catReqs = filteredRequests.filter((r) => r.categoryId === cat.id);
    return {
      category: cat,
      requests: catReqs,
    };
  }).filter((g) => g.requests.length > 0);

  const acceptedCount = requests.filter((r) => r.status === "ACCEPTED").length;
  const pendingCount = requests.filter((r) => r.status === "PENDING").length;
  const rejectedCount = requests.filter((r) => r.status === "REJECTED").length;

  const handleAccept = (req: TripRequestItem) => {
    setSelectedRequest({
      id: req.id,
      requesterName: req.requesterName,
      requesterRating: req.requesterRating,
      itemDescription: req.itemsSummary,
      weightKg: 2,
      pickupLocation: originText,
      dropoffLocation: destText,
      rewardTokens: 1,
    });
    setIsAcceptModalOpen(true);
  };

  const handleReject = (req: TripRequestItem) => {
    setSelectedRequest({
      id: req.id,
      requesterName: req.requesterName,
      requesterRating: req.requesterRating,
      itemDescription: req.itemsSummary,
      weightKg: 2,
      pickupLocation: originText,
      dropoffLocation: destText,
      rewardTokens: 1,
    });
    setIsRejectModalOpen(true);
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* SCENARIO A: TRAVELER'S OWN TRIP MANAGEMENT */}
        {isOwner ? (
          <>
            {/* Top Header */}
            <div className="flex items-center justify-between">
              <span
                className={`rounded-xl px-3 py-1 text-xs font-black ${
                  isCompleted
                    ? "bg-emerald-600 text-white"
                    : "bg-[#123A68] text-white"
                }`}
              >
                {isCompleted ? "مكتملة ✓" : "نشطة"}
              </span>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <h1 className="text-xl font-black text-[#123A68]">
                    تفاصيل الرحلة
                  </h1>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {originText} ➔ {destText}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigate("/home")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-accent dark:hover:text-accent transition-colors cursor-pointer"
                    title="الصفحة الرئيسية"
                  >
                    <Home className="h-4 w-4" />
                    <span>الرئيسية</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => typeof window !== "undefined" && window.history.length > 1 ? navigate(-1) : navigate("/home")}
                    className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
                    aria-label="رجوع"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>

            <TripOwnerSummaryCard
              tripId={id}
              originText={originText}
              destText={destText}
              dateStr={dateStr}
              timeStr={timeStr}
              maxCapacityUnits={trip.maxCapacityUnits}
              notes={trip.notes}
              requestsCount={requests.length}
              acceptedCount={acceptedCount}
              rejectedCount={rejectedCount}
              isCompleted={isCompleted}
            />

            <TripOwnerRequestsFilter
              activeTab={activeTab}
              onTabChange={setActiveTab}
              totalCount={requests.length}
              pendingCount={pendingCount}
              acceptedCount={acceptedCount}
              rejectedCount={rejectedCount}
            />

            <TripOwnerRequestsList
              groupedCategories={groupedCategories}
              isCompleted={isCompleted}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          </>
        ) : (
          /* SCENARIO B: PUBLIC USER BROWSING A TRIP */
          <>
            {/* Top Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => typeof window !== "undefined" && window.history.length > 1 ? navigate(-1) : navigate("/home")}
                  className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
                  aria-label="رجوع"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div>
                  <h1 className="text-xl font-black text-[#123A68]">
                    تفاصيل الرحلة
                  </h1>
                  <p className="text-xs text-text-secondary">
                    راجع تفاصيل الرحلة قبل حجز مكانك
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/home")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-accent dark:hover:text-accent transition-colors cursor-pointer"
                title="الصفحة الرئيسية"
              >
                <Home className="h-4 w-4" />
                <span>الرئيسية</span>
              </button>
            </div>

            <TripPublicHeroCard
              originText={originText}
              destText={destText}
            />

            <TripPublicTravelerCard
              fullName={trip.traveler?.fullName}
              trustScore={trip.traveler?.trustScore}
              previousTripsCount={32}
            />

            <TripPublicDetailsGrid
              dateStr={dateStr}
              timeStr={timeStr}
              neighborhoodName={trip.neighborhood?.name || "وسط البلد"}
              maxCapacityClass={trip.maxCapacityClass}
              notes={trip.notes}
            />

            <TripPublicStickyBottom
              onShare={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `رحلة من ${originText} إلى ${destText}`,
                    url: window.location.href,
                  });
                }
              }}
              onRequestSpace={() => {
                if (!isAuthenticated) {
                  navigate("/login");
                } else {
                  navigate(`/trips/${id}/request`);
                }
              }}
            />
          </>
        )}
      </div>

      {/* Modals */}
      {selectedRequest && (
        <>
          <TripRequestAcceptModal
            isOpen={isAcceptModalOpen}
            request={selectedRequest}
            onClose={() => setIsAcceptModalOpen(false)}
            onConfirmAccept={handleConfirmAccept}
          />
          <TripRequestRejectModal
            isOpen={isRejectModalOpen}
            request={selectedRequest}
            onClose={() => setIsRejectModalOpen(false)}
            onConfirmReject={handleConfirmReject}
          />
        </>
      )}
    </MobileContainer>
  );
}
