import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Package, Search, ChevronRight, MessageSquare, MapPin, Star, RotateCcw } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useErrands } from "../../hooks/useErrands";
import { useAuth } from "../../hooks/useAuth";

export default function MyErrands() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<"mine" | "all">("mine");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { errands: backendErrands, isLoading, isError, refetch } = useErrands();

  const formattedErrands = backendErrands.map((e, idx) => {
    const requesterName = e.requester?.fullName || profile?.fullName || "مستخدم مسجل";
    const initials = requesterName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);

    const isWaiting = e.status === "OPEN";
    const isMatched = e.status === "MATCHED" || e.status === "IN_TRANSIT";
    const isCompleted = e.status === "COMPLETED";

    const statusText = isWaiting
      ? "بانتظار عروض"
      : isMatched
        ? "جارٍ التنفيذ"
        : isCompleted
          ? "مكتمل"
          : "ملغي";

    const statusBadgeClass = isWaiting
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : isMatched
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : isCompleted
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-red-50 text-red-700 border-red-200";

    const dateStr = e.createdAt
      ? new Date(e.createdAt).toLocaleDateString("ar-EG", {
          day: "numeric",
          month: "short",
        })
      : "اليوم";

    const fromStr = e.neighborhood?.name || "غزة";
    const toStr = e.destinationKeyword || "الوجهة";

    return {
      id: e.id,
      requesterName,
      avatarInitials: initials,
      avatarBg:
        idx % 3 === 0
          ? "bg-[#123A68]"
          : idx % 3 === 1
            ? "bg-purple-600"
            : "bg-[#F36F21]",
      status: e.status,
      statusCategory: isWaiting
        ? "WAITING"
        : isMatched
          ? "IN_PROGRESS"
          : isCompleted
            ? "COMPLETED"
            : "CANCELLED",
      statusText,
      statusBadgeClass,
      date: dateStr,
      title: e.title || e.itemsDescription || "طلب توصيل أغراض",
      from: fromStr,
      to: toStr,
      requesterId: e.requesterId,
    };
  });

  const filteredErrands = formattedErrands.filter((e) => {
    if (activeTab === "mine" && profile?.id && e.requesterId && e.requesterId !== profile.id) {
      return false;
    }
    if (
      searchQuery &&
      !e.title.includes(searchQuery) &&
      !e.requesterName.includes(searchQuery) &&
      !e.from.includes(searchQuery) &&
      !e.to.includes(searchQuery)
    ) {
      return false;
    }
    if (statusFilter !== "ALL") {
      if (statusFilter === "WAITING" && e.statusCategory !== "WAITING") return false;
      if (statusFilter === "IN_PROGRESS" && e.statusCategory !== "IN_PROGRESS") return false;
      if (statusFilter === "COMPLETED" && e.statusCategory !== "COMPLETED") return false;
      if (statusFilter === "CANCELLED" && e.statusCategory !== "CANCELLED") return false;
    }
    return true;
  });

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title Header with "+ إنشاء طلب جديد" */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68]">طلباتي</h1>
            <span className="text-xs text-text-muted">
              {filteredErrands.length} طلب
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/errands/incoming-offers")}
              className="flex h-10 items-center justify-center rounded-2xl bg-[#123A68] px-3.5 text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-xs"
            >
              <span>العروض الواردة</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/errands/new")}
              className="flex h-10 items-center justify-center gap-1 rounded-2xl bg-[#F36F21] px-3.5 text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all cursor-pointer shadow-md"
            >
              <Plus className="h-4 w-4" />
              <span>إنشاء طلب</span>
            </button>
          </div>
        </div>

        {/* Tabs: طلباتي / استكشاف كل الطلبات */}
        <div className="flex items-center gap-1 rounded-2xl bg-slate-100 p-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("mine")}
            className={`flex-1 rounded-xl py-2 transition-all cursor-pointer text-center ${
              activeTab === "mine"
                ? "bg-[#123A68] text-white shadow-2xs font-black"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            طلباتي
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`flex-1 rounded-xl py-2 transition-all cursor-pointer text-center ${
              activeTab === "all"
                ? "bg-[#123A68] text-white shadow-2xs font-black"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            استكشاف كل الطلبات
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في الطلبات..."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white pr-11 pl-4 text-xs font-medium text-text-primary placeholder:text-text-muted focus:border-[#123A68] focus:outline-hidden shadow-2xs text-right"
          />
          <Search className="absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-text-muted" />
        </div>

        {/* Status Filter Badges matching Figma: الكل / جارية / بانتظار عروض / مكتملة / ملغاة */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold no-scrollbar">
          {[
            { key: "ALL", label: "الكل" },
            { key: "IN_PROGRESS", label: "جارية" },
            { key: "WAITING", label: "بانتظار عروض" },
            { key: "COMPLETED", label: "مكتملة" },
            { key: "CANCELLED", label: "ملغاة" },
          ].map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setStatusFilter(s.key)}
              className={`shrink-0 rounded-xl px-3.5 py-2 transition-all cursor-pointer ${
                statusFilter === s.key
                  ? "bg-[#123A68] text-white shadow-xs"
                  : "bg-white border border-slate-200 text-text-secondary hover:bg-slate-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-3 pt-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 rounded-3xl bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <ErrorState
            title="تعذر تحميل الطلبات"
            message="حدث خطأ أثناء جلب قائمة طلباتك من الخادم."
            onRetry={refetch}
          />
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredErrands.length === 0 && (
          <EmptyState
            icon={<Package className="h-8 w-8 text-[#123A68]" />}
            title={activeTab === "mine" ? "ليس لديك طلبات مسجلة" : "لا توجد طلبات مسجلة"}
            description={
              activeTab === "mine"
                ? "أنشئ طلبك الأول واطلب مساعدة مسافر بطريقك لتوصيل أغراضك بسهولة!"
                : "لم تقم بإنشاء أي طلبات توصيل حتى الآن. أنشئ طلبك الأول واطلب مساعدة مسافر بطريقك!"
            }
            actionText="إنشاء طلب جديد الآن"
            onAction={() => navigate("/errands/new")}
          />
        )}

        {/* Errands List with Figma Variant Action Buttons */}
        {!isLoading && !isError && filteredErrands.length > 0 && (
          <div className="space-y-3.5">
            {filteredErrands.map((errand) => (
              <div
                key={errand.id}
                className="rounded-3xl bg-white p-4.5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all text-right space-y-3"
              >
                {/* Top Row: User / Title + Status Pill */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${errand.avatarBg} text-xs font-black text-white shadow-2xs`}
                    >
                      {errand.avatarInitials}
                    </div>
                    <div>
                      <h3
                        onClick={() => navigate(`/errands/${errand.id}`)}
                        className="text-xs font-black text-primary hover:text-accent transition-colors cursor-pointer"
                      >
                        {errand.title}
                      </h3>
                      <p className="text-[10px] text-text-muted mt-0.5">
                        {errand.requesterName} • {errand.date}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-bold border ${errand.statusBadgeClass}`}
                  >
                    {errand.statusText}
                  </span>
                </div>

                {/* Route Route Info */}
                <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-2.5 text-xs text-text-secondary border border-slate-100">
                  <MapPin className="h-3.5 w-3.5 text-[#F36F21] shrink-0" />
                  <span className="font-bold text-primary">{errand.from}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-text-muted shrink-0 rotate-180" />
                  <span className="font-bold text-[#123A68]">{errand.to}</span>
                </div>

                {/* Bottom Dynamic Action Button Row matching Figma */}
                <div className="pt-1 flex items-center gap-2">
                  {/* State 1: WAITING (بانتظار عروض) -> "عرض العروض" */}
                  {errand.statusCategory === "WAITING" && (
                    <button
                      type="button"
                      onClick={() => navigate(`/errands/${errand.id}/offers`)}
                      className="flex-1 flex items-center justify-center h-10 rounded-2xl bg-[#123A68] text-xs font-black text-white shadow-2xs hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer"
                    >
                      <span>عرض العروض الواردة</span>
                    </button>
                  )}

                  {/* State 2: IN_PROGRESS (جارٍ التنفيذ) -> "تتبع الطلب" + "دردشة" */}
                  {errand.statusCategory === "IN_PROGRESS" && (
                    <>
                      <button
                        type="button"
                        onClick={() => navigate(`/errands/${errand.id}/tracking`)}
                        className="flex-1 flex items-center justify-center h-10 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-2xs hover:bg-[#E05E12] active:scale-98 transition-all cursor-pointer"
                      >
                        <span>تتبع الطلب</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/messages`)}
                        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-text-secondary hover:bg-slate-50 active:scale-98 transition-all cursor-pointer"
                        title="محادثة المسافر"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </>
                  )}

                  {/* State 3: COMPLETED (مكتمل) -> "تقييم المسافر" */}
                  {errand.statusCategory === "COMPLETED" && (
                    <button
                      type="button"
                      onClick={() => navigate(`/errands/${errand.id}/rating`)}
                      className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-2xl bg-emerald-600 text-xs font-black text-white shadow-2xs hover:bg-emerald-700 active:scale-98 transition-all cursor-pointer"
                    >
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>تقييم المسافر</span>
                    </button>
                  )}

                  {/* State 4: CANCELLED (ملغي) -> "إعادة النشر" */}
                  {errand.statusCategory === "CANCELLED" && (
                    <button
                      type="button"
                      onClick={() => navigate("/errands/new")}
                      className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-2xl border border-slate-200 bg-white text-xs font-black text-text-secondary hover:bg-slate-50 active:scale-98 transition-all cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>إعادة نشر الطلب</span>
                    </button>
                  )}

                  {/* View Details Link */}
                  <button
                    type="button"
                    onClick={() => navigate(`/errands/${errand.id}`)}
                    className="flex h-10 items-center justify-center px-3 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-text-secondary hover:bg-slate-50 active:scale-98 transition-all cursor-pointer"
                  >
                    <span>التفاصيل</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileContainer>
  );
}


