import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  MessageSquare,
  Share2,
  ArrowLeft,
  Car,
  Calendar,
  Check,
  X,
  Star,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useTripDetail } from "../../hooks/useTrips";
import { useAuth } from "../../hooks/useAuth";
import {
  TripRequestAcceptModal,
} from "../../components/trips/TripRequestAcceptModal";
import type { ErrandRequestItem } from "../../components/trips/TripRequestAcceptModal";
import { TripRequestRejectModal } from "../../components/trips/TripRequestRejectModal";
import { TripRatingModal } from "../../components/trips/TripRatingModal";

// Sample incoming requests for traveler's trip management
const INITIAL_SAMPLE_REQUESTS: (ErrandRequestItem & {
  status: "ACCEPTED" | "PENDING" | "REJECTED";
})[] = [
  {
    id: "req-1",
    requesterName: "محمد أحمد",
    requesterRating: 4.9,
    itemDescription: "كرتونة أدوية ومستلزمات طبية عاجلة",
    weightKg: 2.5,
    pickupLocation: "خان يونس - البلد",
    dropoffLocation: "غزة - الرمال",
    rewardTokens: 15,
    status: "ACCEPTED",
  },
  {
    id: "req-2",
    requesterName: "سارة خليل",
    requesterRating: 4.8,
    itemDescription: "حقيبة ملابس وأغراض شخصية صغيرة",
    weightKg: 3.0,
    pickupLocation: "خان يونس - الحي الياباني",
    dropoffLocation: "غزة - النصر",
    rewardTokens: 20,
    status: "PENDING",
  },
  {
    id: "req-3",
    requesterName: "خالد يوسف",
    requesterRating: 5.0,
    itemDescription: "طرد أوراق ووثائق رسمية مغلقة",
    weightKg: 0.5,
    pickupLocation: "خان يونس - الكتيبه",
    dropoffLocation: "غزة - الرمال الجنوبي",
    rewardTokens: 12,
    status: "PENDING",
  },
  {
    id: "req-4",
    requesterName: "ياسمين النجار",
    requesterRating: 4.6,
    itemDescription: "جهاز إلكتروني صغير (راوتر ومحول)",
    weightKg: 1.2,
    pickupLocation: "خان يونس - الأمل",
    dropoffLocation: "غزة - الشفاء",
    rewardTokens: 18,
    status: "REJECTED",
  },
];

export default function TripDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { trip, isLoading, isError, refetch } = useTripDetail(id);

  const [requests, setRequests] = useState(INITIAL_SAMPLE_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState<ErrandRequestItem | null>(null);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratingTarget, setRatingTarget] = useState<{ name: string; avatar?: string }>({
    name: "المسافر",
  });

  if (isLoading) {
    return (
      <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
        <Header />
        <div className="p-4 space-y-4">
          <div className="h-44 w-full animate-pulse rounded-3xl bg-white border border-border" />
          <div className="h-28 w-full animate-pulse rounded-3xl bg-white border border-border" />
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

  // Check if current user is traveler (or treat as owner for management view)
  const isOwner = !profile?.id || trip.travelerId === profile.id || true;

  const originText = trip.neighborhood?.name
    ? `${trip.neighborhood.governorate || "خان يونس"} (${trip.neighborhood.name})`
    : trip.customOriginKeyword || "خان يونس (الحي الياباني)";

  const destText = trip.destinationNeighborhood?.name
    ? `${trip.destinationNeighborhood.governorate || "غزة"} (${trip.destinationNeighborhood.name})`
    : trip.destinationKeyword || "غزة (الرمال الجنوبي)";

  const departureDateStr = trip.departureTime
    ? new Date(trip.departureTime).toLocaleDateString("ar-EG", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "الأربعاء، 15 أيار";

  const departureTimeStr = trip.departureTime
    ? new Date(trip.departureTime).toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "08:30 ص";

  const totalCount = requests.length;
  const pendingCount = requests.filter((r) => r.status === "PENDING").length;
  const acceptedCount = requests.filter((r) => r.status === "ACCEPTED").length;

  const handleOpenAccept = (req: ErrandRequestItem) => {
    setSelectedRequest(req);
    setIsAcceptModalOpen(true);
  };

  const handleOpenReject = (req: ErrandRequestItem) => {
    setSelectedRequest(req);
    setIsRejectModalOpen(true);
  };

  const handleConfirmAccept = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "ACCEPTED" } : r))
    );
  };

  const handleConfirmReject = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "REJECTED" } : r))
    );
  };

  const handleOpenRating = (name: string, avatar?: string) => {
    setRatingTarget({ name, avatar });
    setIsRatingModalOpen(true);
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-28 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title / Back */}
        <div className="flex items-center justify-between">
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
                {isOwner ? "إدارة الطلبات الواردة لرحلتك" : "تفاصيل الرحلة والتواصل"}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-white text-primary hover:text-accent shadow-2xs transition-colors cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Navy Hero Card (from تفاصيل الرحلة الخاصة فيّا.png) */}
        <div className="relative overflow-hidden rounded-3xl bg-[#123A68] p-5 text-white shadow-md space-y-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-white/90">
              <Calendar className="h-3.5 w-3.5 text-[#F36F21]" />
              <span className="text-[11px] font-bold">
                {departureDateStr} • {departureTimeStr}
              </span>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-400/30">
              {trip.status === "ACTIVE" ? "رحلة نشطة" : "مكتملة"}
            </span>
          </div>

          {/* Route Section */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-right">
              <span className="text-[10.5px] text-white/70 block">من</span>
              <span className="text-base font-black text-white block truncate max-w-[130px]">
                {originText}
              </span>
            </div>

            <ArrowLeft className="h-5 w-5 text-[#F36F21] shrink-0" />

            <div className="text-left">
              <span className="text-[10.5px] text-white/70 block">إلى</span>
              <span className="text-base font-black text-white block truncate max-w-[130px]">
                {destText}
              </span>
            </div>
          </div>

          {/* Feature Tags Row */}
          <div className="flex flex-wrap items-center gap-1.5 border-t border-white/10 pt-3">
            <span className="rounded-full bg-[#F36F21] px-2.5 py-1 text-[10.5px] font-black text-white">
              {totalCount} طلب وارد
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] text-white/90">
              لا مانع من الأغراض الثقيلة
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] text-white/90">
              حتى 3 أغراض
            </span>
          </div>
        </div>

        {/* 3 Summary Pill Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-blue-50/80 p-2.5 text-center border border-blue-100">
            <span className="text-[10px] text-blue-700 block font-bold">إجمالي الطلبات</span>
            <span className="text-lg font-black text-[#123A68]">{totalCount}</span>
          </div>

          <div className="rounded-2xl bg-orange-50/80 p-2.5 text-center border border-orange-100">
            <span className="text-[10px] text-orange-700 block font-bold">بانتظار الموافقة</span>
            <span className="text-lg font-black text-[#F36F21]">{pendingCount}</span>
          </div>

          <div className="rounded-2xl bg-emerald-50/80 p-2.5 text-center border border-emerald-100">
            <span className="text-[10px] text-emerald-700 block font-bold">تم القبول</span>
            <span className="text-lg font-black text-emerald-600">{acceptedCount}</span>
          </div>
        </div>

        {/* Incoming Delivery Requests Header */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-[#123A68]">
              طلبات التوصيل الواردة ({requests.length})
            </h2>
            <span className="text-[11px] text-text-muted">
              اضغط قبول أو رفض للرد
            </span>
          </div>

          {/* Requests List */}
          <div className="space-y-3">
            {requests.map((req) => {
              const isAccepted = req.status === "ACCEPTED";
              const isPending = req.status === "PENDING";
              const isRejected = req.status === "REJECTED";

              return (
                <div
                  key={req.id}
                  className={`rounded-3xl bg-white border p-4 shadow-xs space-y-3 transition-all ${
                    isAccepted
                      ? "border-emerald-200 bg-emerald-50/20"
                      : isRejected
                        ? "border-slate-200 opacity-60 bg-slate-50/50"
                        : "border-border hover:border-slate-300"
                  }`}
                >
                  {/* Status Banner */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#123A68] text-xs font-black text-white">
                        {req.requesterName.slice(0, 2)}
                      </div>
                      <div className="text-right">
                        <h4 className="text-xs font-black text-primary">
                          {req.requesterName}
                        </h4>
                        <span className="text-[10.5px] text-amber-500 font-bold">
                          ⭐ {req.requesterRating}
                        </span>
                      </div>
                    </div>

                    {isAccepted && (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10.5px] font-black text-emerald-700 border border-emerald-200">
                        قبلت هذا الطلب ✓
                      </span>
                    )}

                    {isPending && (
                      <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10.5px] font-black text-[#F36F21] border border-orange-200">
                        بانتظار موافقتك ⏳
                      </span>
                    )}

                    {isRejected && (
                      <span className="rounded-full bg-slate-200 px-2.5 py-1 text-[10.5px] font-bold text-slate-600">
                        تم الرفض ✕
                      </span>
                    )}
                  </div>

                  {/* Errand Item Description & Details */}
                  <div className="rounded-2xl bg-white p-3 border border-slate-100 space-y-1.5 text-xs text-right">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">
                        {req.itemDescription}
                      </span>
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#123A68]">
                        {req.weightKg} كغم
                      </span>
                    </div>

                    <div className="text-[11px] text-text-muted flex items-center justify-between pt-1">
                      <span>{req.pickupLocation} ← {req.dropoffLocation}</span>
                      {req.rewardTokens && (
                        <span className="text-emerald-700 font-bold">
                          +{req.rewardTokens} توكن
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons for Request */}
                  <div className="flex items-center gap-2 pt-1">
                    {isPending && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleOpenAccept(req)}
                          className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 active:scale-98 transition-all cursor-pointer"
                        >
                          <Check className="h-4 w-4" />
                          <span>قبول</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenReject(req)}
                          className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-2xl border border-red-200 bg-red-50/50 text-xs font-bold text-red-600 hover:bg-red-50 active:scale-98 transition-all cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                          <span>رفض</span>
                        </button>
                      </>
                    )}

                    {isAccepted && (
                      <button
                        type="button"
                        onClick={() => handleOpenRating(req.requesterName, req.requesterAvatar)}
                        className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-slate-100 text-xs font-bold text-primary hover:bg-slate-200 transition-all cursor-pointer"
                      >
                        <Star className="h-3.5 w-3.5 text-amber-500" />
                        <span>تقييم العميل</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => navigate(`/chat/${trip.id}`)}
                      className="flex h-10 items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-primary hover:border-accent hover:text-accent shadow-2xs transition-colors cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>تواصل</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modals */}
      <TripRequestAcceptModal
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        request={selectedRequest}
        onConfirmAccept={handleConfirmAccept}
        onOpenChat={() => navigate(`/chat/${trip.id}`)}
      />

      <TripRequestRejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        request={selectedRequest}
        onConfirmReject={handleConfirmReject}
      />

      <TripRatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        targetName={ratingTarget.name}
        targetAvatar={ratingTarget.avatar}
        onSubmit={(stars, comment) => {
          console.log("Rated:", stars, comment);
        }}
      />
    </MobileContainer>
  );
}
