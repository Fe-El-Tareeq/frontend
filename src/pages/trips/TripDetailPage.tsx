import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  MessageSquare,
  Share2,
  Car,
  Check,
  Star,
  FileText,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
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

interface TripRequestItem {
  id: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  requesterName: string;
  requesterInitials: string;
  requesterAvatarBg: string;
  requesterRating: number;
  timeAgo: string;
  itemsSummary: string;
  sizeLabel: string;
  weightLabel: string;
  isUrgent: boolean;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

export default function TripDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile, isAuthenticated } = useAuth();
  const { trip, isLoading, isError, refetch } = useTripDetail(id);

  const [activeTab, setActiveTab] = useState<"ALL" | "PENDING" | "ACCEPTED" | "REJECTED">("ALL");
  const [selectedRequest, setSelectedRequest] = useState<ErrandRequestItem | null>(null);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  /*
   * ============================================================================
   * BACKEND INTEGRATION: Trip Requests & Proposals Management
   * Endpoints:
   *   - GET /api/v1/trips/:id/proposals
   *   - POST /api/v1/proposals/:id/accept
   *   - POST /api/v1/proposals/:id/reject
   * When empty or pending, renders structured EmptyState without mock data.
   * ============================================================================
   */
  const [requests, setRequests] = useState<TripRequestItem[]>([]);

  const handleConfirmAccept = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "ACCEPTED" } : r)),
    );
    setIsAcceptModalOpen(false);
  };

  const handleConfirmReject = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "REJECTED" } : r)),
    );
    setIsRejectModalOpen(false);
  };

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
            onRetry={() => refetch()}
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

  const isOwner = profile?.id && trip.travelerId === profile.id;
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

  // Group filtered requests by category matching Component 38
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
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* ========================================================================= */}
        {/* SCENARIO A: TRAVELER'S OWN TRIP MANAGEMENT (تفاصيل الرحلة الخاصة فيّا.png) */}
        {/* ========================================================================= */}
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
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Dark Navy Trip Summary Hero Card */}
            <div className="rounded-3xl bg-[#123A68] p-5 text-white shadow-md space-y-3.5 text-right">
              <div className="flex items-start justify-between">
                <div className="text-left space-y-0.5">
                  <span className="text-[10px] text-white/70 block">التاريخ</span>
                  <span className="text-xs font-black text-white">{dateStr}</span>
                  <span className="text-[10px] text-white/80 block">{timeStr}</span>
                </div>

                <div className="text-right space-y-0.5">
                  <span className="text-[10px] text-white/70 block">مسار الرحلة</span>
                  <h3 className="text-sm font-black text-white">{originText}</h3>
                  <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-[#F36F21]">
                    <Car className="h-3.5 w-3.5" />
                    <span>{destText}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/10">
                <span>حتى {trip.maxCapacityUnits || 3} أغراض 📦</span>
                <span>{trip.notes || "لا مانع من الأغراض الثقيلة 📄"}</span>
                <span>{requests.length} طلب وارد 📄</span>
              </div>
            </div>

            {/* Checklist Banner Link matching تفاصيل الرحلة الخاصة فيّا.png */}
            {!isCompleted && (
              <div
                onClick={() => navigate(`/trips/${id}/checklist`)}
                className="flex items-center justify-between rounded-3xl bg-white p-4 border border-slate-200/90 shadow-2xs hover:border-[#123A68]/40 transition-all cursor-pointer text-right"
              >
                <div className="flex items-center gap-2">
                  <ChevronRight className="h-5 w-5 text-slate-400 rotate-180" />
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-xs font-black border border-emerald-200">
                    {acceptedCount > 0
                      ? `${Math.round((0 / acceptedCount) * 100)}%`
                      : "0%"}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <h4 className="text-xs font-black text-[#123A68]">
                      ملخص الرحلة الكامل
                    </h4>
                    <p className="text-[11px] text-text-muted">
                      {acceptedCount} طلب مقبول • 0 منجز • 0%
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#123A68]">
                    <FileText className="h-5 w-5" />
                  </div>
                </div>
              </div>
            )}

            {/* Completed Trip Statistics Row (عرض التفاصيل للرحلة المكتملة.png) */}
            {isCompleted && (
              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-2xl bg-white p-3 text-center border border-slate-200 shadow-2xs space-y-0.5">
                  <div className="text-lg font-black text-primary">
                    {requests.length}
                  </div>
                  <span className="text-[10.5px] text-text-muted block">
                    إجمالي الطلبات
                  </span>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-3 text-center border border-emerald-200 shadow-2xs space-y-0.5">
                  <div className="text-lg font-black text-emerald-700">
                    {acceptedCount}
                  </div>
                  <span className="text-[10.5px] text-emerald-800 font-bold block">
                    تم توصيلها
                  </span>
                </div>
                <div className="rounded-2xl bg-red-50 p-3 text-center border border-red-200 shadow-2xs space-y-0.5">
                  <div className="text-lg font-black text-red-600">
                    {rejectedCount}
                  </div>
                  <span className="text-[10.5px] text-red-800 font-bold block">
                    مرفوضة
                  </span>
                </div>
              </div>
            )}

            {/* Filter Tabs matching Component 38 */}
            <div className="flex items-center gap-2 text-xs font-bold">
              {[
                { key: "ALL", label: `الكل (${requests.length})` },
                { key: "PENDING", label: `بانتظار (${pendingCount})` },
                { key: "ACCEPTED", label: `مقبول (${acceptedCount})` },
                { key: "REJECTED", label: `مرفوض (${rejectedCount})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`rounded-2xl px-3.5 py-1.5 transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-[#123A68] text-white shadow-xs font-black"
                      : "bg-white border border-slate-200 text-text-secondary hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Categorized Requests List matching Component 38 */}
            {groupedCategories.length === 0 ? (
              <EmptyState
                icon={<Car className="h-8 w-8 text-[#123A68]" />}
                title="لا توجد طلبات في هذا التصنيف"
                description="ستظهر الطلبات الجديدة التي يقدمها المستخدمون هنا فور استلامها."
              />
            ) : (
              <div className="space-y-4">
                {groupedCategories.map(({ category, requests: catReqs }) => (
                  <div key={category.id} className="space-y-2">
                    {/* Category Header */}
                    <div className="flex items-center justify-between rounded-full bg-red-50/70 px-4 py-2 border border-red-200/60 text-xs">
                      <span className="text-[11px] font-black text-red-700 bg-white px-2 py-0.5 rounded-full border border-red-200">
                        {catReqs.length} طلب
                      </span>
                      <div className="flex items-center gap-1.5 font-black text-red-700">
                        <span>{category.name}</span>
                        <span>{category.icon}</span>
                      </div>
                    </div>

                    {/* Category Items */}
                    <div className="space-y-2.5">
                      {catReqs.map((req) => {
                        const isReqAccepted = req.status === "ACCEPTED";
                        const isReqPending = req.status === "PENDING";
                        const isReqRejected = req.status === "REJECTED";

                        return (
                          <div
                            key={req.id}
                            className={`rounded-3xl border shadow-xs p-4.5 space-y-3 text-right ${
                              isReqAccepted
                                ? "bg-white border-emerald-300 ring-2 ring-emerald-100"
                                : isReqRejected
                                  ? "bg-white border-red-200"
                                  : "bg-white border-slate-200"
                            }`}
                          >
                            {/* Top accepted indicator */}
                            {isReqAccepted && (
                              <div className="flex items-center justify-center gap-1 text-xs font-black text-emerald-700 bg-emerald-50 py-1 rounded-xl border border-emerald-200">
                                <Check className="h-4 w-4 stroke-[3]" />
                                <span>قبلت هذا الطلب</span>
                              </div>
                            )}

                            {/* Requester Info */}
                            <div className="flex items-center justify-between">
                              <span
                                className={`rounded-xl px-2.5 py-0.5 text-[10.5px] font-black ${
                                  isReqAccepted
                                    ? "bg-emerald-100 text-emerald-800"
                                    : isReqRejected
                                      ? "bg-red-100 text-red-800"
                                      : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {isReqAccepted
                                  ? "مقبول"
                                  : isReqRejected
                                    ? "مرفوض"
                                    : "بانتظار ردك"}
                              </span>

                              <div className="flex items-center gap-2.5">
                                <div className="text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <span className="text-xs font-bold text-amber-500">
                                      ⭐ {req.requesterRating}
                                    </span>
                                    <h4 className="text-xs font-black text-primary">
                                      {req.requesterName}
                                    </h4>
                                  </div>
                                  <span className="text-[10px] text-text-muted">
                                    {req.timeAgo}
                                  </span>
                                </div>

                                <div
                                  className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-black text-white ${req.requesterAvatarBg}`}
                                >
                                  {req.requesterInitials}
                                </div>
                              </div>
                            </div>

                            {/* Summary description */}
                            <p className="text-xs text-primary font-bold">
                              {req.itemsSummary}
                            </p>

                            {/* Badges */}
                            <div className="flex items-center justify-end gap-2 text-[10.5px]">
                              {req.isUrgent && (
                                <span className="rounded-full bg-red-50 px-2 py-0.2 font-black text-red-600 border border-red-200">
                                  ⚡ عاجل
                                </span>
                              )}
                              <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-text-muted font-bold">
                                {req.sizeLabel}
                              </span>
                              <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-text-muted font-bold">
                                {req.weightLabel} 📦
                              </span>
                            </div>

                            {/* Actions matching Component 38 */}
                            {isReqAccepted && (
                              <button
                                type="button"
                                onClick={() => navigate(`/chat/${req.id}`)}
                                className="w-full flex items-center justify-center gap-2 h-11 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-xs"
                              >
                                <MessageSquare className="h-4 w-4" />
                                <span>التواصل معه</span>
                              </button>
                            )}

                            {isReqPending && (
                              <div className="flex items-center gap-2 pt-1">
                                <button
                                  type="button"
                                  onClick={() => handleAccept(req)}
                                  className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-2xl bg-emerald-600 text-xs font-black text-white hover:bg-emerald-700 active:scale-98 transition-all cursor-pointer shadow-xs"
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                  <span>قبول</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleReject(req)}
                                  className="px-4 flex items-center justify-center gap-1.5 h-11 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-text-secondary hover:bg-red-50 hover:text-red-600 active:scale-98 transition-all cursor-pointer"
                                >
                                  <ThumbsDown className="h-4 w-4" />
                                  <span>رفض</span>
                                </button>
                              </div>
                            )}

                            {isCompleted && (
                              <div className="flex items-center justify-center gap-1 text-xs font-black text-emerald-700 bg-emerald-50 py-1.5 rounded-xl border border-emerald-200">
                                <Check className="h-4 w-4" />
                                <span>تم التوصيل بنجاح</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          /* ========================================================================= */
          /* SCENARIO B: PUBLIC USER BROWSING A TRIP (تفاصيل الرحلة.png) */
          /* ========================================================================= */
          <>
            {/* Top Header */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
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

            {/* Orange Hero Card matching تفاصيل الرحلة.png */}
            <div className="rounded-3xl bg-gradient-to-r from-[#F36F21] to-[#E05E12] p-5 text-white shadow-md space-y-3 text-right">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white px-3 py-0.5 text-xs font-black text-[#F36F21]">
                  منشورة
                </span>
                <span className="text-[11px] text-white/90">منذ ساعتين</span>
              </div>

              <div className="text-center pt-2 pb-1">
                <div className="flex items-center justify-center gap-3 text-lg font-black text-white">
                  <span>من {originText}</span>
                  <span>➔</span>
                  <span>إلى {destText}</span>
                </div>
              </div>
            </div>

            {/* Traveler Card matching Figma */}
            <div className="rounded-3xl bg-white p-4.5 border border-border shadow-xs flex items-center justify-between text-right">
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span>
                  {trip.traveler?.trustScore
                    ? (trip.traveler.trustScore / 20).toFixed(1)
                    : "4.8"}
                </span>
                <span className="text-text-muted">• 32 رحلة سابقة</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <h3 className="text-sm font-black text-[#123A68]">
                    {trip.traveler?.fullName || "أحمد خالد"}
                  </h3>
                  <span className="text-[10.5px] text-text-muted">مسافر نشط</span>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#123A68] text-xs font-black text-white">
                  {(trip.traveler?.fullName || "أحمد خالد").slice(0, 2)}
                </div>
              </div>
            </div>

            {/* Details Grid Items matching Figma */}
            <div className="space-y-2.5">
              <div className="rounded-2xl bg-white p-3.5 border border-slate-200 text-right">
                <span className="text-[10.5px] text-text-muted block">
                  تاريخ المغادرة
                </span>
                <span className="text-xs font-black text-[#123A68] mt-0.5 block">
                  {dateStr}
                </span>
              </div>

              <div className="rounded-2xl bg-white p-3.5 border border-slate-200 text-right">
                <span className="text-[10.5px] text-text-muted block">
                  وقت المغادرة
                </span>
                <span className="text-xs font-black text-[#123A68] mt-0.5 block">
                  {timeStr}
                </span>
              </div>

              <div className="rounded-2xl bg-white p-3.5 border border-slate-200 text-right">
                <span className="text-[10.5px] text-text-muted block">
                  الحي
                </span>
                <span className="text-xs font-black text-[#123A68] mt-0.5 block">
                  {trip.neighborhood?.name || "وسط البلد"}
                </span>
              </div>

              <div className="rounded-2xl bg-white p-3.5 border border-slate-200 text-right">
                <span className="text-[10.5px] text-text-muted block">
                  السعة المتاحة للأغراض
                </span>
                <span className="text-xs font-black text-[#123A68] mt-0.5 block">
                  {trip.maxCapacityClass === "LIGHT"
                    ? "أغراض خفيفة فقط (حتى 2 أغراض)"
                    : trip.maxCapacityClass === "MEDIUM"
                      ? "أغراض متوسطة (حتى 5 أغراض)"
                      : "أغراض ثقيلة ومتنوعة"}
                </span>
              </div>

              {trip.notes && (
                <div className="p-3 text-right space-y-1">
                  <span className="text-[10.5px] font-bold text-text-muted block">
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
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: `رحلة من ${originText} إلى ${destText}`,
                        url: window.location.href,
                      });
                    }
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-primary hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Share2 className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!isAuthenticated) {
                      navigate("/login");
                    } else {
                      navigate(`/trips/${id}/request`);
                    }
                  }}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#E05E12]"
                >
                  <span>اطلب مكانك بالرحلة</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Accept Request Modal */}
      {selectedRequest && (
        <TripRequestAcceptModal
          isOpen={isAcceptModalOpen}
          request={selectedRequest}
          onClose={() => setIsAcceptModalOpen(false)}
          onConfirmAccept={handleConfirmAccept}
        />
      )}

      {/* Reject Request Modal */}
      {selectedRequest && (
        <TripRequestRejectModal
          isOpen={isRejectModalOpen}
          request={selectedRequest}
          onClose={() => setIsRejectModalOpen(false)}
          onConfirmReject={handleConfirmReject}
        />
      )}
    </MobileContainer>
  );
}
