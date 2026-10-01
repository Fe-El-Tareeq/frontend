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

      <div className="w-full max-w-3xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-black text-[#123A68] dark:text-white">
            تتبع حالة الطلب
          </h1>
        </div>

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
