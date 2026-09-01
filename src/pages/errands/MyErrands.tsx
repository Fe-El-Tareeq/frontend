import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Package,
  Search,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useErrands } from "../../hooks/useErrands";

export default function MyErrands() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { errands: backendErrands, isLoading, isError, refetch } = useErrands();

  const displayErrands = backendErrands.map((e, idx) => {
    const requesterName = e.requester?.fullName || "مستخدم مسجل";
    const initials = requesterName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);

    const isWaiting = e.status === "OPEN";
    const isMatched = e.status === "MATCHED";
    const isCompleted = e.status === "COMPLETED";

    const statusLabel = isWaiting
      ? "قيد الانتظار"
      : isMatched
      ? "تم التطابق"
      : isCompleted
      ? "مكتمل"
      : e.status === "IN_TRANSIT"
      ? "جاري التوصيل"
      : "ملغي";

    const statusBadge = isWaiting
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

    const locationStr = e.neighborhood?.name
      ? `${e.neighborhood.name} ➔ ${e.destinationKeyword}`
      : e.destinationKeyword || "غزة";

    return {
      id: e.id,
      requesterName,
      avatarInitials: initials,
      avatarBg: idx % 3 === 0 ? "bg-[#123A68]" : idx % 3 === 1 ? "bg-purple-600" : "bg-[#F36F21]",
      status: e.status,
      statusLabel,
      statusBadge,
      date: dateStr,
      description: e.title || e.itemsDescription,
      location: locationStr,
    };
  });

  const filteredErrands = displayErrands.filter((e) => {
    if (searchQuery && !e.description.includes(searchQuery) && !e.requesterName.includes(searchQuery)) {
      return false;
    }
    if (statusFilter !== "ALL" && e.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title Header with "+ إنشاء طلب جديد" and "العروض الواردة" */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68]">طلبات الأغراض</h1>
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
              <span>إنشاء طلب جديد</span>
            </button>
          </div>
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

        {/* Status Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold no-scrollbar">
          {[
            { key: "ALL", label: "الكل" },
            { key: "OPEN", label: "قيد الانتظار" },
            { key: "MATCHED", label: "تم التطابق" },
            { key: "COMPLETED", label: "مكتمل" },
            { key: "CANCELLED", label: "ملغي" },
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
              <div key={i} className="h-28 rounded-3xl bg-slate-100 animate-pulse" />
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
            title="لا توجد طلبات مسجلة"
            description="لم تقم بإنشاء أي طلبات توصيل حتى الآن. أنشئ طلبك الأول واطلب مساعدة مسافر بطريقك!"
            actionText="إنشاء طلب جديد الآن"
            onAction={() => navigate("/errands/new")}
          />
        )}

        {/* Errands List */}
        {!isLoading && !isError && filteredErrands.length > 0 && (
          <div className="space-y-3.5">
            {filteredErrands.map((errand) => (
              <div
                key={errand.id}
                onClick={() => navigate(`/errands/${errand.id}`)}
                className="rounded-3xl bg-white p-4.5 border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-[#123A68]/30 transition-all cursor-pointer space-y-3"
              >
                {/* Header: User Avatar + Name + Status Badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${errand.avatarBg} text-xs font-black text-white shadow-xs`}
                    >
                      {errand.avatarInitials}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-primary">
                        {errand.requesterName}
                      </h3>
                      <span className="text-[11px] text-text-muted">
                        {errand.date}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold border ${errand.statusBadge}`}
                  >
                    {errand.statusLabel}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                  {errand.description}
                </p>

                {/* Footer: Location Tag & Action */}
                <div className="flex items-center justify-between text-[11px] text-text-muted pt-2 border-t border-slate-100">
                  <span className="truncate max-w-[200px] font-medium text-text-primary">
                    📍 {errand.location}
                  </span>
                  <span className="text-[#F36F21] font-bold">
                    عرض التفاصيل ➔
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
