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
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { trip, isLoading, isError, refetch } = useTripDetail(id);

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

  if (isError) {
    return (
      <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
        <Header />
        <div className="p-4">
          <ErrorState
            title="تعذر تحميل تفاصيل الرحلة"
            message="حدث خطأ أثناء جلب بيانات الرحلة من الخادم."
            onRetry={refetch}
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
            description="لم يتم العثور على تفاصيل هذه الرحلة أو تم إلغاؤها."
            actionText="العودة للرحلات"
            onAction={() => navigate("/trips")}
          />
        </div>
      </MobileContainer>
    );
  }

  const travelerName = trip.traveler?.fullName || "مسافر مسجل";
  const travelerInitials = travelerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const rating = trip.traveler?.trustScore
    ? Number((trip.traveler.trustScore / 20).toFixed(1))
    : 5.0;

  const originText = trip.neighborhood?.name
    ? `${trip.neighborhood.governorate || "غزة"} - ${trip.neighborhood.name}`
    : trip.customOriginKeyword || "غزة";

  const destText = trip.destinationNeighborhood?.name
    ? `${trip.destinationNeighborhood.governorate || "الوجهة"} - ${trip.destinationNeighborhood.name}`
    : trip.destinationKeyword;

  const departureDateStr = trip.departureTime
    ? new Date(trip.departureTime).toLocaleDateString("ar-EG", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "اليوم";

  const departureTimeStr = trip.departureTime
    ? new Date(trip.departureTime).toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "10:00 ص";

  const capacityText =
    trip.maxCapacityClass === "LIGHT"
      ? `حتى ${trip.maxCapacityUnits || 2} أغراض (خفيف)`
      : trip.maxCapacityClass === "MEDIUM"
        ? `حتى ${trip.maxCapacityUnits || 5} أغراض (متوسط)`
        : `حتى ${trip.maxCapacityUnits || 8} أغراض (ثقيل)`;

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

        {/* Orange Hero Route Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-[#F36F21] p-5 text-white shadow-md space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] text-white/90">
              {trip.status === "ACTIVE" ? "رحلة نشطة" : "مكتملة"}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-[10.5px] font-black text-[#F36F21]">
              منشورة
            </span>
          </div>

          {/* RTL Route */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-right">
              <span className="text-[11px] text-white/80 block">من</span>
              <span className="text-xl font-black text-white block truncate max-w-[130px]">
                {originText}
              </span>
            </div>

            <ArrowLeft className="h-6 w-6 text-white/90 shrink-0" />

            <div className="text-left">
              <span className="text-[11px] text-white/80 block">إلى</span>
              <span className="text-xl font-black text-white block truncate max-w-[130px]">
                {destText}
              </span>
            </div>
          </div>
        </div>

        {/* Traveler Profile Card */}
        <div className="flex items-center justify-between rounded-3xl bg-white p-4 border border-border shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#123A68] text-xs font-black text-white">
              {travelerInitials}
            </div>

            <div className="text-right">
              <h3 className="text-sm font-black text-primary">
                {travelerName}
              </h3>
              <p className="text-[11px] text-text-muted mt-0.5">
                مسافر موثوق • ⭐ {rating}
              </p>
            </div>
          </div>

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
              {departureDateStr}
            </span>
          </div>

          <div className="rounded-2xl bg-white p-3.5 border border-border shadow-2xs text-right">
            <span className="text-[10.5px] text-text-muted block">
              وقت المغادرة
            </span>
            <span className="text-xs font-black text-primary mt-0.5 block">
              {departureTimeStr}
            </span>
          </div>

          <div className="rounded-2xl bg-white p-3.5 border border-border shadow-2xs text-right">
            <span className="text-[10.5px] text-text-muted block">
              حي الانطلاق
            </span>
            <span className="text-xs font-black text-primary mt-0.5 block">
              {originText}
            </span>
          </div>

          <div className="rounded-2xl bg-white p-3.5 border border-border shadow-2xs text-right">
            <span className="text-[10.5px] text-text-muted block">
              السعة المتاحة للأغراض
            </span>
            <span className="text-xs font-black text-primary mt-0.5 block">
              {capacityText}
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
      <div className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-[430px] bg-white/95 backdrop-blur-md border-t border-border p-3.5 shadow-lg">
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
