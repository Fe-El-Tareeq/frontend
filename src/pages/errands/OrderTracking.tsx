import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { CancelErrandModal } from "../../components/modals/CancelErrandModal";
import {
  useErrandDetail,
  useErrands,
  useErrandTracking,
} from "../../hooks/useErrands";

// Modular sub-components
import { OrderTrackingHero } from "../../components/errands/tracking/OrderTrackingHero";
import { OrderTrackingTimeline } from "../../components/errands/tracking/OrderTrackingTimeline";
import { OrderTrackingCourierCard } from "../../components/errands/tracking/OrderTrackingCourierCard";

export default function OrderTracking() {
  const { id = "errand-1" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cancelErrand, isCancelling } = useErrands();
  const { errand } = useErrandDetail(id);
  const { tracking } = useErrandTracking(id);

  const [showCancelModal, setShowCancelModal] = useState(false);

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Title */}
        <div className="flex items-center gap-2 justify-start2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-[#123A68] dark:text-white">
              تتبع حالة الطلب
            </h1>
            <p className="text-xs md:text-sm text-text-secondary dark:text-slate-400">
              تابع حركة ومراحل تنفيذ مشوارك بالوقت الفعلي
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Column: Hero & Timeline */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Hero Card */}
            <OrderTrackingHero
              title={
                errand?.title ||
                "توصيل وثائق رسمية من ديوان الموظفين في خان يونس"
              }
              neighborhoodName={errand?.neighborhood?.name || "الشجاعية"}
              stageNumber={tracking?.stageNumber || 3}
            />

            {/* Timeline */}
            <OrderTrackingTimeline stageNumber={tracking?.stageNumber || 3} />
          </div>

          {/* Sticky Sidebar: Courier Card & Quick Actions */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-20">
            {/* Courier Card */}
            <OrderTrackingCourierCard
              courierName="أحمد خالد"
              rating={4.8}
              completedTripsCount={32}
              origin="غزة"
              destination="رفح"
              timeStr="اليوم • 1:00 ص"
              onOpenChat={() => navigate(`/chat/${id}`)}
            />

            {/* Action Card */}
            <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-border dark:border-white/10 shadow-xs space-y-3">
              <button
                type="button"
                onClick={() => navigate(`/errands/${id}`)}
                className="flex h-11 w-full items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs md:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-accent dark:hover:text-accent transition-colors cursor-pointer"
              >
                عرض تفاصيل الطلب الكاملة
              </button>

              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="flex h-11 w-full items-center justify-center rounded-2xl border border-red-200 dark:border-red-900/40 text-xs md:text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
              >
                إلغاء الطلب
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Errand Modal */}
      <CancelErrandModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        isCancelling={isCancelling}
        onConfirm={async () => {
          try {
            await cancelErrand(id);
            navigate("/errands");
          } catch {
            // Handled
          }
        }}
      />
    </MobileContainer>
  );
}
