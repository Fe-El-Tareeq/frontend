import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Play, Pause, Send, Zap, Package, MapPin, Eye, Star, Trash2 } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useErrandDetail } from "../../hooks/useErrands";
import { useAuth } from "../../hooks/useAuth";

export default function ErrandDetail() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, profile } = useAuth();

  /*
   * ============================================================================
   * BACKEND INTEGRATION: Single Errand Details
   * Endpoint: GET /api/v1/errands/:id
   * Uses real backend data. If not found or empty, displays EmptyState without mock fallback.
   * ============================================================================
   */
  const { errand, isLoading, isError } = useErrandDetail(id);
  const [isPlaying, setIsPlaying] = useState(false);

  const isOwner = Boolean(profile?.id && errand?.requesterId === profile.id);

  if (isLoading) {
    return (
      <MobileContainer className="bg-[#F8FAFC] pb-12 text-right">
        <Header />
        <div className="p-5">
          <div className="h-64 w-full animate-pulse rounded-3xl bg-white border border-border" />
        </div>
      </MobileContainer>
    );
  }

  if (isError) {
    return (
      <MobileContainer className="bg-[#F8FAFC] pb-12 text-right">
        <Header />
        <div className="p-5">
          <ErrorState
            title="تعذر تحميل تفاصيل الطلب"
            message="حدث خطأ أثناء جلب بيانات الطلب من الخادم."
            onRetry={() => window.location.reload()}
          />
        </div>
      </MobileContainer>
    );
  }

  if (!errand) {
    return (
      <MobileContainer className="bg-[#F8FAFC] pb-12 text-right">
        <Header />
        <div className="p-5">
          <EmptyState
            icon={<Package className="h-7 w-7 text-[#123A68]" />}
            title="الطلب غير موجود"
            description="لم نتمكن من العثور على تفاصيل هذا الطلب، ربما تم إنجازه أو حذفه."
            actionText="العودة للطلبات"
            onAction={() => navigate("/errands")}
          />
        </div>
      </MobileContainer>
    );
  }

  const isWaiting = errand.status === "OPEN";
  const isInProgress = errand.status === "MATCHED" || errand.status === "IN_TRANSIT";
  const isCompleted = errand.status === "COMPLETED";

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-28 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Top Header */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#123A68]">
              {isOwner ? "تفاصيل طلبي" : "تفاصيل الطلب"}
            </h1>
            <p className="text-xs text-text-secondary">
              {isOwner
                ? "إدارة حالة طلبك والعروض المقدمة عليه"
                : "راجع تفاصيل الطلب قبل حجز مكانك أو تقديم عرضك"}
            </p>
          </div>
        </div>

        {/* Main Details Card matching Figma */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-4 text-right">
          {/* Requester Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#123A68] text-xs font-black text-white">
                {errand.requester?.fullName
                  ? errand.requester.fullName.slice(0, 2)
                  : "مخ"}
              </div>

              <div className="text-right">
                <h3 className="text-sm font-black text-primary">
                  {errand.requester?.fullName || (isOwner ? profile?.fullName : "مستخدم مسجل")}
                </h3>
                <p className="text-[10.5px] text-text-muted">
                  نشرت الطلب في{" "}
                  {new Date(errand.createdAt).toLocaleDateString("ar-EG", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Status pill */}
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-bold border ${
                errand.status === "OPEN"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : errand.status === "MATCHED" || errand.status === "IN_TRANSIT"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : errand.status === "COMPLETED"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              {errand.status === "OPEN"
                ? "بانتظار عروض"
                : errand.status === "MATCHED" || errand.status === "IN_TRANSIT"
                  ? "جارٍ التنفيذ"
                  : errand.status === "COMPLETED"
                    ? "مكتمل"
                    : "ملغي"}
            </span>
          </div>

          {/* Errand Title */}
          <div className="space-y-1 pt-1 text-right">
            <h2 className="text-base font-black text-[#123A68]">
              {errand.title || "طلب توصيل أغراض"}
            </h2>
          </div>

          {/* Description Section */}
          <div className="space-y-1.5 text-right">
            <span className="text-[11px] font-bold text-text-muted block">
              ماذا تحتاج؟
            </span>
            <p className="text-xs text-primary leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              {errand.itemsDescription || "لا يوجد وصف إضافي."}
            </p>
          </div>

          {/* Route Section */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Pickup */}
            <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200 text-right">
              <span className="text-[10.5px] text-text-muted flex items-center gap-1">
                <MapPin className="h-3 w-3 text-[#F36F21]" />
                حي الاستلام
              </span>
              <span className="text-xs font-black text-[#123A68] mt-1 block">
                {errand.neighborhood?.name || "وسط البلد"}
              </span>
            </div>

            {/* Destination */}
            <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200 text-right">
              <span className="text-[10.5px] text-text-muted flex items-center gap-1">
                <MapPin className="h-3 w-3 text-[#123A68]" />
                الوجهة المقصودة
              </span>
              <span className="text-xs font-black text-[#123A68] mt-1 block">
                {errand.destinationKeyword || "غزة"}
              </span>
            </div>
          </div>

          {/* Voice Note Player Component (if available) */}
          <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200 space-y-2 text-right">
            <span className="text-[10.5px] text-text-muted block">
              رسالة صوتية مرفقة
            </span>
            <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-xs hover:bg-[#E05E12] transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 mr-0.5" />
                )}
              </button>

              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-[#F36F21] rounded-full transition-all duration-300 ${
                    isPlaying ? "w-3/4" : "w-1/3"
                  }`}
                />
              </div>

              <span className="text-[11px] font-bold text-text-muted">
                0:18
              </span>
            </div>
          </div>

          {/* Token fee info (Traveler perspective) */}
          {!isOwner && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-[11px] text-text-muted">
                رسوم التوكنز لتقديم العرض
              </span>
              <div className="flex items-center gap-1 font-bold text-accent">
                <Zap className="h-3.5 w-3.5 fill-accent" />
                <span>1 توكن فقط</span>
              </div>
            </div>
          )}
        </div>

        {/* Owner View Actions Card */}
        {isOwner && (
          <div className="space-y-2">
            {isWaiting && (
              <button
                type="button"
                onClick={() => navigate(`/errands/${id}/offers`)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#0D2C50]"
              >
                <Eye className="h-4 w-4" />
                <span>عرض العروض الواردة على هذا الطلب</span>
              </button>
            )}

            {isInProgress && (
              <button
                type="button"
                onClick={() => navigate(`/errands/${id}/tracking`)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#E05E12]"
              >
                <MapPin className="h-4 w-4" />
                <span>تتبع حالة توصيل الطلب</span>
              </button>
            )}

            {isCompleted && (
              <button
                type="button"
                onClick={() => navigate(`/errands/${id}/rating`)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-emerald-700"
              >
                <Star className="h-4 w-4 fill-current" />
                <span>تقييم تجربة التوصيل والمسافر</span>
              </button>
            )}

            {/* Cancel errand option for owner if still open */}
            {isWaiting && (
              <button
                type="button"
                onClick={() => {
                  /* BACKEND PENDING: Errand cancellation endpoint */
                  navigate("/errands");
                }}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50/50 text-xs font-bold text-red-600 active:scale-98 transition-all cursor-pointer hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                <span>إلغاء هذا الطلب</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Sticky Bottom Offer Proposal Button for non-owners */}
      {!isOwner && isWaiting && (
        <div className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-107.5 bg-white/95 backdrop-blur-md border-t border-border p-3.5 shadow-lg">
          <button
            type="button"
            onClick={() => {
              if (!isAuthenticated) {
                navigate("/login");
              } else {
                navigate(`/errands/${id}/offer`);
              }
            }}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#E05E12]"
          >
            <Send className="h-4 w-4 -rotate-45" />
            <span>قدم عرضك لتوصيل الطلب (1 توكن)</span>
          </button>
        </div>
      )}
    </MobileContainer>
  );
}

