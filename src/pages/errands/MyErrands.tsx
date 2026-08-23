import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Package } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { ErrandFeedCard } from "../../components/errands/ErrandFeedCard";
import type { ErrandCardData } from "../../components/errands/ErrandFeedCard";
import { ErrandFilterBar } from "../../components/errands/ErrandFilterBar";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useErrands } from "../../hooks/useErrands";

export default function MyErrands() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [zoneFilter, setZoneFilter] = useState("ALL");

  /*
   * ============================================================================
   * BACKEND INTEGRATION: Live Errands Feed
   * Endpoint: GET /api/v1/errands
   * Handles: Loading, Error (ErrorState with retry), Empty (EmptyState).
   * ============================================================================
   */
  const { errands: backendErrands, isLoading, isError, refetch } = useErrands();

  // Map Backend DTO directly
  const displayErrands: ErrandCardData[] = (backendErrands || []).map((e) => ({
    id: e.id,
    title: e.title || e.itemsDescription || "طلب توصيل",
    requesterName: e.requester?.fullName || "مستخدم مسجل",
    avatarInitials: e.requester?.fullName
      ? e.requester.fullName.slice(0, 2)
      : "مخ",
    avatarBg: "bg-[#123A68]",
    from: e.neighborhood?.name ? `غزة - ${e.neighborhood.name}` : "غزة",
    to: e.destinationKeyword || "وجهة محددة",
    date: new Date(e.createdAt).toLocaleDateString("ar-EG", {
      month: "short",
      day: "numeric",
    }),
    status: e.status,
    statusText:
      e.status === "OPEN"
        ? "مفتوح"
        : e.status === "MATCHED"
          ? "تم التطابق"
          : e.status === "COMPLETED"
            ? "مكتمل"
            : "ملغي",
    statusClass:
      e.status === "OPEN"
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : e.status === "MATCHED"
          ? "bg-blue-50 text-blue-700 border-blue-200"
          : e.status === "COMPLETED"
            ? "bg-slate-100 text-text-secondary border-slate-200"
            : "bg-red-50 text-red-700 border-red-200",
    priceNis: e.calculatedFeeNis || 5,
  }));

  const filteredErrands = displayErrands.filter((e) => {
    if (statusFilter !== "ALL" && e.status !== statusFilter) return false;
    if (
      zoneFilter !== "ALL" &&
      !e.from.includes(zoneFilter) &&
      !e.to.includes(zoneFilter)
    ) {
      return false;
    }
    if (
      searchQuery &&
      !e.title.includes(searchQuery) &&
      !e.from.includes(searchQuery) &&
      !e.to.includes(searchQuery)
    ) {
      return false;
    }
    return true;
  });

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-16 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title Header with Action Button */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-[#123A68]">الطلبات</h1>
          
          <button
            type="button"
            onClick={() => navigate("/create-errand")}
            className="flex h-11 items-center justify-center gap-1.5 rounded-2xl bg-[#F36F21] px-4 text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>إنشاء طلب</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <ErrandFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          zoneFilter={zoneFilter}
          onZoneChange={setZoneFilter}
        />

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-44 w-full animate-pulse rounded-3xl bg-white border border-border"
              />
            ))}
          </div>
        ) : isError ? (
          /* Error State with Retry */
          <ErrorState
            title="تعذر تحميل الطلبات"
            message="حدث خطأ أثناء جلب قائمة الطلبات من الخادم، يرجى المحاولة مرة أخرى."
            onRetry={() => refetch()}
          />
        ) : filteredErrands.length === 0 ? (
          /* Structured Empty State from Design System */
          <EmptyState
            icon={<Package className="h-7 w-7 text-[#123A68]" />}
            title="لا توجد طلبات حالياً"
            description="لم يتم العثور على أي طلبات نشطة في الوقت الحالي. يمكنك نشر طلبك الآن وسيقوم المسافرون بمساعدتك."
            actionText="إنشاء طلب جديد"
            onAction={() => navigate("/create-errand")}
          />
        ) : (
          /* Errands List */
          <div className="space-y-3.5 pt-1">
            {filteredErrands.map((errand) => (
              <ErrandFeedCard
                key={errand.id}
                errand={errand}
                onViewDetails={(id) => navigate(`/errands/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
