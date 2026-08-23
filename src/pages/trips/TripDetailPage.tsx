import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Phone,
  MessageSquare,
  Share2,
  ArrowLeft,
  Car,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useTripDetail } from "../../hooks/useTrips";

export default function TripDetailPage() {
  const { id = "trip-1" } = useParams<{ id: string }>();
  const navigate = useNavigate();

  /*
   * ============================================================================
   * BACKEND INTEGRATION: Single Trip Details
   * Pending Endpoint: GET /api/v1/trips/:id
   * Uses real backend data when live, or static preview data if pending.
   * ============================================================================
   */
  const { data: backendTrip, isLoading, isError } = useTripDetail(id);

  // Static preview fallback data while backend endpoint is pending deployment
  const fallbackTrip = {
    id: id || "trip-1",
    traveler: {
      fullName: "محمد أبو ريدة",
      trustScore: 96,
    },
    originCity: "غزة",
    originNeighborhood: "الرمال",
    destinationCity: "رفح",
    destinationNeighborhood: "وسط البلد",
    departureDate: "الخميس 21 أغسطس",
    departureTime: "9:30 صباحاً",
    capacityText: "أغراض خفيفة فقط",
    notes: "يوجد مانع من الأغراض الثقيلة، أغراض خفيفة فقط مسموح بها في هذه الرحلة.",
    status: "OPEN",
    createdAt: new Date().toISOString(),
  };

  const trip = backendTrip || fallbackTrip;

  if (isLoading) {
    return (
      <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
        <Header />
        <div className="p-4 space-y-4">
          <div className="h-36 w-full animate-pulse rounded-3xl bg-white border border-border" />
          <div className="h-24 w-full animate-pulse rounded-3xl bg-white border border-border" />
        </div>
      </MobileContainer>
    );
  }

  if (isError && !trip) {
    return (
      <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
        <Header />
        <div className="p-4">
          <ErrorState
            title="تعذر تحميل تفاصيل الرحلة"
            message="حدث خطأ أثناء جلب بيانات الرحلة."
            onRetry={() => window.location.reload()}
          />
        </div>
      </MobileContainer>
    );
  }

  if (!trip) {
    return (
      <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
        <Header />
        <div className="p-4">
          <EmptyState
            icon={<Car className="h-7 w-7 text-[#123A68]" />}
            title="الرحلة غير موجودة"
            description="لم يتم العثور على تفاصيل هذه الرحلة."
            actionText="العودة للرحلات"
            onAction={() => navigate("/trips")}
          />
        </div>
      </MobileContainer>
    );
  }

  const travelerInitials = trip.traveler?.fullName
    ? trip.traveler.fullName.slice(0, 2)
    : "مر";

  const rating = trip.traveler?.trustScore
    ? (trip.traveler.trustScore / 20).toFixed(1)
    : "4.8";

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#123A68]">تفاصيل الرحلة</h1>
            <p className="text-xs text-text-secondary">
              راجع تفاصيل الرحلة قبل حجز مكانك
            </p>
          </div>
        </div>

        {/* Orange Hero Route Banner (Figma exact card) */}
        <div className="relative overflow-hidden rounded-3xl bg-[#F36F21] p-5 text-white shadow-md space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] text-white/90">منذ ساعتين</span>
            <span className="rounded-full bg-white px-3 py-1 text-[10.5px] font-black text-[#F36F21]">
              منشورة
            </span>
          </div>

          {/* RTL Route: From on RIGHT (1st child), arrow, To on LEFT (3rd child) */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-right">
              <span className="text-[11px] text-white/80 block">من</span>
              <span className="text-2xl font-black text-white">
                {trip.originCity}
                {trip.originNeighborhood ? ` - ${trip.originNeighborhood}` : ""}
              </span>
            </div>

            <ArrowLeft className="h-6 w-6 text-white/90" />

            <div className="text-left">
              <span className="text-[11px] text-white/80 block">إلى</span>
              <span className="text-2xl font-black text-white">
                {trip.destinationCity}
                {trip.destinationNeighborhood
                  ? ` - ${trip.destinationNeighborhood}`
                  : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Traveler Profile Card */}
        <div className="flex items-center justify-between rounded-3xl bg-white p-4 border border-border shadow-xs">
          {/* Right side in RTL: Avatar + Name & Rating */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#123A68] text-xs font-black text-white">
              {travelerInitials}
            </div>

            <div className="text-right">
              <h3 className="text-sm font-black text-primary">
                {trip.traveler?.fullName || "مسافر مسجل"}
              </h3>
              <p className="text-[11px] text-text-muted mt-0.5">
                32 رحلة سابقة • ⭐ {rating}
              </p>
            </div>
          </div>

          {/* Left side in RTL: Phone and Message buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(`/chat/${id}`)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-primary hover:text-accent hover:border-accent shadow-2xs transition-colors cursor-pointer"
            >
              <MessageSquare className="h-4.5 w-4.5" />
            </button>

            <a
              href="tel:0591234567"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-primary hover:text-accent hover:border-accent shadow-2xs transition-colors"
            >
              <Phone className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        {/* Detail Cards List */}
        <div className="space-y-2.5">
          <div className="rounded-2xl bg-white p-3.5 border border-border shadow-2xs text-right">
            <span className="text-[10.5px] text-text-muted block">
              تاريخ المغادرة
            </span>
            <span className="text-xs font-black text-primary mt-0.5 block">
              {trip.departureDate}
            </span>
          </div>

          <div className="rounded-2xl bg-white p-3.5 border border-border shadow-2xs text-right">
            <span className="text-[10.5px] text-text-muted block">
              وقت المغادرة
            </span>
            <span className="text-xs font-black text-primary mt-0.5 block">
              {trip.departureTime}
            </span>
          </div>

          <div className="rounded-2xl bg-white p-3.5 border border-border shadow-2xs text-right">
            <span className="text-[10.5px] text-text-muted block">الحي</span>
            <span className="text-xs font-black text-primary mt-0.5 block">
              {trip.originNeighborhood || trip.originCity}
            </span>
          </div>

          <div className="rounded-2xl bg-white p-3.5 border border-border shadow-2xs text-right">
            <span className="text-[10.5px] text-text-muted block">
              السعة المتاحة للأغراض
            </span>
            <span className="text-xs font-black text-primary mt-0.5 block">
              {trip.capacityText}
            </span>
          </div>
        </div>

        {/* Additional notes */}
        {trip.notes && (
          <div className="space-y-1 pt-1 text-right">
            <span className="text-[11px] font-bold text-text-muted block">
              ملاحظات إضافية
            </span>
            <p className="text-xs text-text-secondary leading-relaxed">
              {trip.notes}
            </p>
          </div>
        )}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-107.5 bg-white/95 backdrop-blur-md border-t border-border p-3.5 shadow-lg">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigate(`/trips/${id}/request-space`)}
            className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer"
          >
            اطلب مكانك بالرحلة
          </button>

          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-primary hover:border-accent hover:text-accent shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
