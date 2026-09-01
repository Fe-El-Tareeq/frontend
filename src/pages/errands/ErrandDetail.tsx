import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Play, Pause, Send, Zap, Package } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useErrandDetail } from "../../hooks/useErrands";
import { useAuth } from "../../hooks/useAuth";

export default function ErrandDetail() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  /*
   * ============================================================================
   * BACKEND INTEGRATION: Single Errand Details
   * Endpoint: GET /api/v1/errands/:id
   * Uses real backend data. If not found or empty, displays EmptyState without mock fallback.
   * ============================================================================
   */
  const { errand, isLoading, isError } = useErrandDetail(id);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
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
            <h1 className="text-xl font-black text-[#123A68]">تفاصيل الطلب</h1>
            <p className="text-xs text-text-secondary">
              راجع تفاصيل الطلب قبل حجز مكانك أو تقديم عرضك
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
                  {errand.requester?.fullName || "مستخدم مسجل"}
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
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : errand.status === "MATCHED"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : errand.status === "COMPLETED"
                      ? "bg-slate-100 text-text-secondary border-slate-200"
                      : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              {errand.status === "OPEN"
                ? "مفتوح"
                : errand.status === "MATCHED"
                  ? "تم التطابق"
                  : errand.status === "COMPLETED"
                    ? "مكتمل"
                    : "ملغي"}
            </span>
          </div>

          {/* Description Section */}
          <div className="space-y-1.5 pt-1 text-right">
            <span className="text-[11px] font-bold text-text-muted block">
              ماذا تحتاج؟
            </span>
            <p className="text-xs text-primary leading-relaxed">
              {errand.itemsDescription || errand.title || "لا يوجد وصف إضافي."}
            </p>
          </div>

          {/* City Box */}
          <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200 text-right">
            <span className="text-[10.5px] text-text-muted block">
              المدينة المطلوبة
            </span>
            <span className="text-xs font-black text-[#123A68] mt-0.5 block">
              {errand.destinationKeyword || "غزة"}
            </span>
          </div>

          {/* Neighborhood Box */}
          <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200 text-right">
            <span className="text-[10.5px] text-text-muted block">الحي</span>
            <span className="text-xs font-black text-[#123A68] mt-0.5 block">
              {errand.neighborhood?.name || "وسط البلد"}
            </span>
          </div>

          {/* Voice Note Player Component */}
          <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200 space-y-2 text-right">
            <span className="text-[10.5px] text-text-muted block">
              رسالة صوتية
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

          {/* Token fee info */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-[11px] text-text-muted">
              رسوم التوكنز لتقديم العرض
            </span>
            <div className="flex items-center gap-1 font-bold text-accent">
              <Zap className="h-3.5 w-3.5 fill-accent" />
              <span>1 توكن فقط</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Offer Proposal Button */}
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
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer"
        >
          <Send className="h-4 w-4 -rotate-45" />
          <span>قدم عرضك لتوصيل الطلب</span>
        </button>
      </div>
    </MobileContainer>
  );
}
