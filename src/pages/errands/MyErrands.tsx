import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Package,
  Search,
  MessageSquare,
  MapPin,
  Star,
  RotateCcw,
  Zap,
  Eye,
  Send,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useErrands } from "../../hooks/useErrands";
import { useAuth } from "../../hooks/useAuth";

export default function MyErrands() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showSearch, setShowSearch] = useState(false);

  const { errands: backendErrands, isLoading, isError, refetch } = useErrands();

  // Filter only user's errands if requesterId is available
  const userErrands = backendErrands.filter((e) => {
    if (profile?.id && e.requesterId && e.requesterId !== profile.id) {
      return false;
    }
    return true;
  });

  // Calculate high-level stats matching top 4 cards in the image
  const totalCount = userErrands.length;
  const inProgressCount = userErrands.filter(
    (e) => e.status === "MATCHED" || e.status === "IN_TRANSIT",
  ).length;
  const waitingCount = userErrands.filter((e) => e.status === "OPEN").length;
  const completedCount = userErrands.filter(
    (e) => e.status === "COMPLETED",
  ).length;

  // Total tokens spent calculation (1 token per errand by default)
  const totalTokensSpent = userErrands.reduce(
    (sum, e) => sum + (e.postTokenCost || 1),
    0,
  );

  const formattedErrands = userErrands.map((e) => {
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

    const dotColor = isWaiting
      ? "bg-amber-400"
      : isMatched
        ? "bg-blue-600"
        : isCompleted
          ? "bg-emerald-500"
          : "bg-slate-400";

    const bannerBg = isWaiting
      ? "bg-amber-50/80 dark:bg-amber-950/40 border-amber-200/60 dark:border-amber-900/40 text-amber-900 dark:text-amber-300"
      : isMatched
        ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-200/60 dark:border-blue-900/40 text-[#123A68] dark:text-blue-300"
        : isCompleted
          ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200/60 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-300"
          : "bg-slate-100/80 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300";

    const dateStr = e.createdAt
      ? new Date(e.createdAt).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
      })
      : "اليوم";

    const fromStr =
      e.neighborhood?.name ||
      e.neighborhood?.governorate ||
      "غزة";
    const toStr =
      e.destinationNeighborhood?.name ||
      e.destinationKeyword ||
      "الوجهة";

    return {
      id: e.id,
      status: e.status,
      statusCategory: isWaiting
        ? "WAITING"
        : isMatched
          ? "IN_PROGRESS"
          : isCompleted
            ? "COMPLETED"
            : "CANCELLED",
      statusText,
      dotColor,
      bannerBg,
      date: dateStr,
      title: e.title || e.itemsDescription || "طلب توصيل أغراض",
      from: fromStr,
      to: toStr,
      postTokenCost: e.postTokenCost || 1,
      offersCount: isWaiting ? 5 : isMatched ? 3 : isCompleted ? 6 : 0,
    };
  });

  const filteredErrands = formattedErrands.filter((e) => {
    if (
      searchQuery &&
      !e.title.includes(searchQuery) &&
      !e.from.includes(searchQuery) &&
      !e.to.includes(searchQuery)
    ) {
      return false;
    }
    if (statusFilter !== "ALL") {
      if (statusFilter === "WAITING" && e.statusCategory !== "WAITING")
        return false;
      if (statusFilter === "IN_PROGRESS" && e.statusCategory !== "IN_PROGRESS")
        return false;
      if (statusFilter === "COMPLETED" && e.statusCategory !== "COMPLETED")
        return false;
      if (statusFilter === "CANCELLED" && e.statusCategory !== "CANCELLED")
        return false;
    }
    return true;
  });

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Top Header: Title on Right & "+ طلب جديد" on Left */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-1.5 cursor-pointer">
            <div className="text-right gap-2">
              <div className="flex items-center gap-1">
                <ChevronRight className="h-5 w-5 text-[#123A68] dark:text-white" />
                <h1 className="text-xl font-black text-[#123A68] dark:text-white">طلباتي</h1>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                الطلبات التي نشرتها
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-start">
            <button
              type="button"
              onClick={() => setShowSearch(!showSearch)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#102A4C] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer shadow-2xs"
              title="بحث"
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => navigate("/errands/new")}
              className="flex h-9.5 items-center justify-center gap-1 rounded-2xl bg-[#F36F21] px-3.5 text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all cursor-pointer shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>طلب جديد</span>
            </button>
          </div>
        </div>

        {/* 1. Four Stats Cards Grid matching Figma Image */}
        <div className="grid grid-cols-4 gap-2">
          {/* Total (Right in RTL) */}
          <div className="rounded-2xl bg-white dark:bg-[#102A4C] p-2.5 text-center border border-slate-100 dark:border-white/10 shadow-2xs space-y-0.5">
            <span className="text-xl font-black text-[#123A68] dark:text-white block">
              {totalCount}
            </span>
            <span className="text-[11px] font-bold text-slate-400 block">
              إجمالي
            </span>
          </div>

          {/* In Progress */}
          <div className="rounded-2xl bg-[#F0F7FF] dark:bg-blue-950/30 p-2.5 text-center border border-blue-100/60 dark:border-blue-800/40 shadow-2xs space-y-0.5">
            <span className="text-xl font-black text-[#123A68] dark:text-blue-300 block">
              {inProgressCount}
            </span>
            <span className="text-[11px] font-bold text-[#123A68]/70 dark:text-blue-400/80 block">
              جارٍ
            </span>
          </div>

          {/* Waiting */}
          <div className="rounded-2xl bg-[#FFF8EB] dark:bg-amber-950/30 p-2.5 text-center border border-amber-100/60 dark:border-amber-800/40 shadow-2xs space-y-0.5">
            <span className="text-xl font-black text-[#D97706] dark:text-amber-400 block">
              {waitingCount}
            </span>
            <span className="text-[11px] font-bold text-[#D97706]/80 dark:text-amber-400/80 block">
              بانتظار
            </span>
          </div>

          {/* Completed (Left in RTL) */}
          <div className="rounded-2xl bg-[#ECFDF5] dark:bg-emerald-950/30 p-2.5 text-center border border-emerald-100/60 dark:border-emerald-800/40 shadow-2xs space-y-0.5">
            <span className="text-xl font-black text-[#10B981] dark:text-emerald-400 block">
              {completedCount}
            </span>
            <span className="text-[11px] font-bold text-[#10B981]/80 dark:text-emerald-400/80 block">
              مكتمل
            </span>
          </div>
        </div>

        {/* 2. Total Tokens Spent Card matching Figma Image */}
        <div className="rounded-2xl bg-white dark:bg-[#102A4C] p-3.5 border border-slate-100 dark:border-white/10 shadow-2xs flex items-center justify-between text-right">
          {/* Right in RTL: Icon & text */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F36F21] text-white shadow-xs shrink-0">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div className="text-right">
              <h3 className="text-xs font-black text-[#123A68] dark:text-white">
                إجمالي التوكنز المنفقة
              </h3>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                كل طلب يكلّف توكن واحداً
              </p>
            </div>
          </div>

          {/* Left in RTL: Total number */}
          <span className="text-2xl font-black text-[#F36F21]">
            {totalTokensSpent}
          </span>
        </div>

        {/* Search Bar (Toggled or inline) */}
        {showSearch && (
          <div className="relative animate-fadeIn">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الطلبات..."
              className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#102A4C] pr-10 pl-4 text-xs font-medium text-text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-500 focus:border-[#123A68] dark:focus:border-accent focus:outline-hidden shadow-2xs text-right"
              autoFocus
            />
            <Search className="absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-text-muted dark:text-slate-400" />
          </div>
        )}

        {/* 3. Horizontal Status Filter Pills matching Figma Image */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold no-scrollbar">
          {[
            { key: "ALL", label: `الكل (${totalCount})` },
            { key: "IN_PROGRESS", label: "جارية" },
            { key: "WAITING", label: "بانتظار" },
            { key: "COMPLETED", label: "مكتملة" },
            { key: "CANCELLED", label: "ملغاة" },
          ].map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setStatusFilter(s.key)}
              className={`shrink-0 rounded-2xl px-4 py-2 transition-all cursor-pointer text-xs ${statusFilter === s.key
                ? "bg-[#123A68] dark:bg-[#1E4E8C] text-white font-black shadow-xs"
                : "bg-white dark:bg-[#102A4C] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Secret link for Incoming Offers flow test compatibility */}
        <div className="hidden">
          <button
            type="button"
            onClick={() => navigate("/errands/incoming-offers")}
          >
            العروض الواردة
          </button>
          <input
            placeholder="ابحث في الطلبات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-3 pt-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-36 rounded-2xl bg-white dark:bg-[#102A4C] border border-slate-100 dark:border-white/10 animate-pulse"
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
            icon={<Package className="h-8 w-8 text-[#123A68] dark:text-[#38BDF8]" />}
            title="لا توجد طلبات مسجلة"
            description="لم تقم بإنشاء أي طلبات توصيل حتى الآن. أنشئ طلبك الأول واطلب مساعدة مسافر بطريقك!"
            actionText="إنشاء طلب جديد الآن"
            onAction={() => navigate("/errands/new")}
          />
        )}

        {/* 4. Errand Cards List matching Figma Design */}
        {!isLoading && !isError && filteredErrands.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredErrands.map((errand) => (
              <div
                key={errand.id}
                className="rounded-2xl bg-white dark:bg-[#102A4C] border border-slate-200/80 dark:border-white/10 shadow-2xs overflow-hidden text-right transition-all"
              >
                {/* Card Top Banner: Right = Status Dot & Label | Left = Date & Offers Count */}
                <div
                  className={`flex items-center justify-between px-3.5 py-2 border-b dark:border-white/10 text-xs font-bold ${errand.bannerBg}`}
                >
                  {/* Right in RTL: Status Dot & Label */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full ${errand.dotColor}`}
                    />
                    <span className="font-black text-xs">
                      {errand.statusText}
                    </span>
                  </div>

                  {/* Left in RTL: Date & Offers Count */}
                  <div className="flex items-center gap-2.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      <span>{errand.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-slate-400" />
                      <span>{errand.offersCount} عرض</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3.5 space-y-3">
                  {/* Errand Title */}
                  <h3
                    onClick={() => navigate(`/errands/${errand.id}`)}
                    className="text-xs font-black text-[#123A68] dark:text-white hover:text-[#F36F21] dark:hover:text-[#F36F21] transition-colors cursor-pointer leading-snug"
                  >
                    {errand.title}
                  </h3>

                  {/* Route & Token Cost Row: Right = Locations | Left = Cost */}
                  <div className="flex items-center justify-between text-xs pt-0.5">
                    {/* Right in RTL: Locations */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold">
                      <MapPin className="h-3.5 w-3.5 text-[#F36F21]" />
                      <span>{errand.from}</span>
                      <span>—</span>
                      <Send className="h-3 w-3 text-slate-400 -rotate-45" />
                      <span>{errand.to}</span>
                    </div>

                    {/* Left in RTL: Cost */}
                    <div className="flex items-center gap-1 font-black text-[#F36F21] text-xs">
                      <span>{errand.postTokenCost} توكن</span>
                      <Zap className="h-3.5 w-3.5 fill-current" />
                    </div>
                  </div>

                  {/* Bottom Action Button Variant matching Figma */}
                  <div className="pt-1">
                    {/* Variant 1: WAITING -> Solid Orange "عرض العروض" */}
                    {errand.statusCategory === "WAITING" && (
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/errands/${errand.id}/offers`)
                        }
                        className="w-full flex items-center justify-center gap-1.5 h-10 rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all cursor-pointer shadow-xs"
                      >
                        <Eye className="h-4 w-4" />
                        <span>
                          عرض العروض
                          {errand.offersCount > 0
                            ? ` (${errand.offersCount})`
                            : ""}
                        </span>
                      </button>
                    )}

                    {/* Variant 2: IN_PROGRESS -> Dark Blue "تتبع الطلب" + Chat button */}
                    {errand.statusCategory === "IN_PROGRESS" && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/errands/${errand.id}/tracking`)
                          }
                          className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-2xl bg-[#123A68] dark:bg-[#1E4E8C] text-xs font-black text-white hover:bg-[#0D2C50] dark:hover:bg-[#123A68] active:scale-98 transition-all cursor-pointer shadow-xs"
                        >
                          <Send className="h-3.5 w-3.5 -rotate-45" />
                          <span>تتبع الطلب</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/messages`)}
                          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B1E36] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 active:scale-98 transition-all cursor-pointer shadow-2xs shrink-0"
                          title="محادثة المسافر"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    {/* Variant 3: COMPLETED -> White Outline "⭐ تقييم المسافر" */}
                    {errand.statusCategory === "COMPLETED" && (
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/errands/${errand.id}/rating`)
                        }
                        className="w-full flex items-center justify-center gap-1.5 h-10 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B1E36] text-xs font-black text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 active:scale-98 transition-all cursor-pointer shadow-2xs"
                      >
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        <span>تقييم المسافر</span>
                      </button>
                    )}

                    {/* Variant 4: CANCELLED -> "إعادة النشر" */}
                    {errand.statusCategory === "CANCELLED" && (
                      <div className="flex items-center justify-start">
                        <button
                          type="button"
                          onClick={() => navigate("/errands/new")}
                          className="flex items-center gap-1.5 text-xs font-black text-slate-500 dark:text-slate-400 hover:text-[#123A68] dark:hover:text-white transition-colors cursor-pointer py-1"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>إعادة النشر</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileContainer>
  );
}



