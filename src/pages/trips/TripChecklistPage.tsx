import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Check, Package } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useTripDetail } from "../../hooks/useTrips";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";

interface ChecklistItem {
  id: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  requesterName: string;
  title: string;
  sizeLabel: string;
  weightLabel: string;
  isUrgent: boolean;
  isCompleted: boolean;
}

export default function TripChecklistPage() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { trip, isLoading, isError, refetch } = useTripDetail(id);

  /*
   * ============================================================================
   * BACKEND INTEGRATION: Trip Checklist & Items Execution
   * Endpoint: GET /api/v1/trips/:id/checklist
   * Status updates: POST /api/v1/assignments/:id/complete
   * In-memory local checklist state for live interactive completion.
   * ============================================================================
   */
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  if (isLoading) {
    return (
      <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
        <Header />
        <div className="p-4 space-y-4">
          <div className="h-24 w-full animate-pulse rounded-3xl bg-white border border-border" />
          <div className="h-40 w-full animate-pulse rounded-3xl bg-white border border-border" />
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
            title="تعذر تحميل قائمة مهام الرحلة"
            message="حدث خطأ أثناء جلب تفاصيل الرحلة من الخادم."
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
            icon={<Package className="h-8 w-8 text-[#123A68]" />}
            title="الرحلة غير موجودة"
            description="لم نتمكن من العثور على الرحلة المطلوبة."
            actionText="العودة للرحلات"
            onAction={() => navigate("/trips")}
          />
        </div>
      </MobileContainer>
    );
  }

  const originText = trip.neighborhood?.name
    ? `${trip.neighborhood.governorate || "غزة"} - ${trip.neighborhood.name}`
    : trip.customOriginKeyword || "غزة";
  const destText = trip.destinationNeighborhood?.name
    ? `${trip.destinationNeighborhood.governorate || "الوجهة"} - ${trip.destinationNeighborhood.name}`
    : trip.destinationKeyword;

  const dateText = trip.departureTime
    ? new Date(trip.departureTime).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "اليوم";

  // Build checklist items from trip note or default structure
  const rawItems: ChecklistItem[] = [
    {
      id: "item-1",
      categoryId: "pharmacy",
      categoryName: "دواء / صيدلية",
      categoryIcon: "💊",
      requesterName: "فاطمة علي",
      title: "باراسيتامول + مقياس ضغط لوالدتي",
      sizeLabel: "صغير",
      weightLabel: "أقل من كيلو",
      isUrgent: true,
      isCompleted: !!completedItems["item-1"],
    },
    {
      id: "item-2",
      categoryId: "documents",
      categoryName: "وثائق / أوراق",
      categoryIcon: "📄",
      requesterName: "خالد عبدالله",
      title: "أوراق ثبوتية مهمة في ظرف",
      sizeLabel: "ظرف",
      weightLabel: "خفيف جداً",
      isUrgent: true,
      isCompleted: !!completedItems["item-2"],
    },
  ];

  const toggleItem = (itemId: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const totalCount = rawItems.length;
  const doneCount = rawItems.filter((it) => it.isCompleted).length;
  const progressPercent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
  const isAllCompleted = totalCount > 0 && doneCount === totalCount;

  // Group by category
  const categories = Array.from(new Set(rawItems.map((i) => i.categoryId))).map(
    (catId) => {
      const itemsInCat = rawItems.filter((i) => i.categoryId === catId);
      const catDone = itemsInCat.filter((i) => i.isCompleted).length;
      return {
        id: catId,
        name: itemsInCat[0].categoryName,
        icon: itemsInCat[0].categoryIcon,
        items: itemsInCat,
        doneCount: catDone,
        totalCount: itemsInCat.length,
      };
    },
  );

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Header with Title & Progress */}
        <div className="flex items-center justify-between">
          <div className="text-left space-y-0.5">
            <span className="text-[11px] font-bold text-text-muted block">
              الإنجاز
            </span>
            <span className="text-base font-black text-[#123A68]">
              {doneCount}/{totalCount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-xl font-black text-[#123A68]">ملخص الرحلة</h1>
              <p className="text-xs text-text-secondary mt-0.5">
                {originText} ➔ {destText} • {dateText}
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

        {/* Progress Bar */}
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Categories Checklist matching Component 40 */}
        <div className="space-y-4 pt-1">
          {categories.map((cat) => (
            <div key={cat.id} className="space-y-2">
              {/* Category Pill Bar */}
              <div className="flex items-center justify-between rounded-full bg-red-50/80 px-4 py-2 border border-red-200/70 text-xs">
                <span className="text-[11px] font-bold text-red-600">
                  {cat.doneCount}/{cat.totalCount} منجز
                </span>
                <div className="flex items-center gap-1.5 font-black text-red-700">
                  <span>{cat.name}</span>
                  <span>{cat.icon}</span>
                </div>
              </div>

              {/* Items under Category */}
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-center justify-between rounded-2xl p-4 border transition-all cursor-pointer ${
                      item.isCompleted
                        ? "bg-emerald-50/50 border-emerald-300 shadow-2xs"
                        : "bg-white border-slate-200 shadow-2xs hover:border-slate-300"
                    }`}
                  >
                    {/* Checkbox circle on Left */}
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
                        item.isCompleted
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {item.isCompleted && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>

                    {/* Content on Right */}
                    <div className="text-right flex-1 pr-3 space-y-1">
                      <div className="flex items-center justify-end gap-2">
                        {item.isCompleted && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.2 text-[10px] font-black text-emerald-700">
                            ✓ تم
                          </span>
                        )}
                        {item.isUrgent && !item.isCompleted && (
                          <span className="rounded-full bg-red-50 px-2 py-0.2 text-[10px] font-black text-red-600 border border-red-200">
                            ⚡ عاجل
                          </span>
                        )}
                        <h4
                          className={`text-xs font-black transition-all ${
                            item.isCompleted
                              ? "text-slate-400 line-through"
                              : "text-primary"
                          }`}
                        >
                          {item.requesterName}
                        </h4>
                      </div>

                      <p
                        className={`text-xs transition-all ${
                          item.isCompleted
                            ? "text-slate-400 line-through"
                            : "text-text-secondary"
                        }`}
                      >
                        {item.title}
                      </p>

                      <div className="flex items-center justify-end gap-1.5 pt-0.5">
                        <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-text-muted">
                          {item.weightLabel}
                        </span>
                        <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-text-muted">
                          {item.sizeLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Big Celebration Banner when all items completed matching Component 40 */}
        {isAllCompleted && (
          <div className="rounded-3xl bg-emerald-600 p-6 text-white text-center shadow-lg space-y-2 animate-bounce-short">
            <div className="text-3xl">🎉</div>
            <h3 className="text-base font-black">أنجزت جميع الطلبات!</h3>
            <p className="text-xs text-emerald-100">
              جزاك الله خيراً على مساعدتك لأهالي منطقتك
            </p>
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
