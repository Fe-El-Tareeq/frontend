import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CheckCircle2,
  MapPin,
  MessageSquare,
  Phone,
  Truck,
  Package,
  Star,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { AppLayout } from "../../components/layout/AppLayout";
import { Card } from "../../components/ui/card/Card";
import { Button } from "../../components/ui/button/Button";
import { WeightBadge } from "../../components/ui/badge/WeightBadge";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useErrandDetail } from "../../hooks/useErrands";
import type { AssignmentStatus } from "../../types";

export default function OrderTracking() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();

  /*
   * ============================================================================
   * BACKEND INTEGRATION: Order Tracking Data
   * Endpoint: GET /api/v1/errands/:id
   * Uses real backend data. If not found, displays EmptyState.
   * ============================================================================
   */
  const { errand, isLoading, isError } = useErrandDetail(id);

  // Dynamic tracking status matching backend lifecycle
  const [currentStatus, setCurrentStatus] =
    useState<AssignmentStatus>("IN_TRANSIT");

  const steps: Array<{
    status: AssignmentStatus;
    title: string;
    description: string;
    icon: typeof Package;
  }> = [
    {
      status: "ACCEPTED",
      title: "تم قبول المشوار",
      description: "وافق المسافر على توصيل أغراضك",
      icon: CheckCircle2,
    },
    {
      status: "PICKED_UP",
      title: "تم استلام الأغراض",
      description: "المسافر استلم الأغراض وجاري التحرك",
      icon: Package,
    },
    {
      status: "IN_TRANSIT",
      title: "في الطريق إليك",
      description: "المسافر متجه الآن إلى عنوان التسليم المحدد",
      icon: Truck,
    },
    {
      status: "COMPLETED",
      title: "تم التوصيل بنجاح",
      description: "تم استلام الطلب وتأكيد اكتمال المشوار",
      icon: CheckCircle2,
    },
  ];

  const getStepIndex = (status: AssignmentStatus) => {
    const order: AssignmentStatus[] = [
      "ACCEPTED",
      "PICKED_UP",
      "IN_TRANSIT",
      "COMPLETED",
    ];
    return order.indexOf(status);
  };

  const currentStepIdx = getStepIndex(currentStatus);

  const handleNextStatus = () => {
    if (currentStatus === "ACCEPTED") setCurrentStatus("PICKED_UP");
    else if (currentStatus === "PICKED_UP") setCurrentStatus("IN_TRANSIT");
    else if (currentStatus === "IN_TRANSIT") {
      setCurrentStatus("COMPLETED");
      navigate(`/errands/${id}/rating`);
    }
  };

  if (isLoading) {
    return (
      <AppLayout
        headerProps={{
          title: "تتبع حالة التوصيل",
          subtitle: `طلب رقم #${id.substring(0, 8)}`,
          showBack: true,
        }}
        showBottomNav={false}
      >
        <div className="space-y-4 pb-8">
          <div className="h-44 w-full animate-pulse rounded-[20px] bg-white border border-border" />
          <div className="h-64 w-full animate-pulse rounded-[20px] bg-white border border-border" />
        </div>
      </AppLayout>
    );
  }

  if (isError) {
    return (
      <AppLayout
        headerProps={{
          title: "تتبع حالة التوصيل",
          showBack: true,
        }}
        showBottomNav={false}
      >
        <ErrorState
          title="تعذر تحميل بيانات التتبع"
          message="حدث خطأ أثناء الاتصال بالخادم لجلب تفاصيل التتبع."
          onRetry={() => window.location.reload()}
        />
      </AppLayout>
    );
  }

  if (!errand) {
    return (
      <AppLayout
        headerProps={{
          title: "تتبع حالة التوصيل",
          showBack: true,
        }}
        showBottomNav={false}
      >
        <EmptyState
          icon={<Package className="h-7 w-7 text-[#123A68]" />}
          title="الطلب غير موجود"
          description="لم نتمكن من العثور على هذا الطلب للتتبع."
          actionText="العودة للطلبات"
          onAction={() => navigate("/errands")}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout
      headerProps={{
        title: "تتبع حالة التوصيل",
        subtitle: `طلب رقم #${id.substring(0, 8)}`,
        showBack: true,
      }}
      showBottomNav={false}
    >
      <div className="space-y-4 pb-8 text-right">
        {/* Estimated Arrival Banner */}
        <div className="rounded-[20px] bg-[#123A68] p-5 text-white shadow-md text-right">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <span className="text-[12px] text-white/70 block">
                الوقت المتوقع للوصول:
              </span>
              <span className="text-[20px] font-extrabold text-[#F36F21]">
                خلال 15 - 25 دقيقة
              </span>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-[#F36F21]">
              <Truck className="h-6 w-6 animate-pulse" />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1 text-[12px] text-white/80">
            <MapPin className="h-4 w-4 text-[#F36F21] shrink-0" />
            <span>
              من: {errand.neighborhood?.name || "غزة"} ➔ إلى: {errand.destinationKeyword || "غزة"}
            </span>
          </div>
        </div>

        {/* Live Stepper Timeline */}
        <Card variant="elevated">
          <Card.Header>
            <Card.Title>خط سير التوصيل</Card.Title>
            <span className="text-[12px] font-bold text-accent bg-accent-light px-2.5 py-1 rounded-pill">
              محدث مباشرة
            </span>
          </Card.Header>

          <Card.Body>
            <div className="space-y-6 relative mr-3 my-2 text-right">
              <div className="absolute right-[15px] top-3 bottom-3 w-[2px] bg-border z-0" />

              {steps.map((step, idx) => {
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;
                const Icon = step.icon;

                return (
                  <div key={step.status} className="relative z-10 flex items-start gap-4">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                        isPassed
                          ? "border-accent bg-accent text-white shadow-sm"
                          : "border-border bg-white text-text-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="flex-1 text-right pt-0.5">
                      <h4
                        className={`text-[14px] font-bold ${
                          isCurrent
                            ? "text-accent"
                            : isPassed
                            ? "text-primary"
                            : "text-text-muted"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-[12px] text-text-secondary mt-0.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card.Body>
        </Card>

        {/* Assigned Traveler Card */}
        <Card>
          <Card.Header>
            <Card.Title>المسافر المسؤول عن التوصيل</Card.Title>
            <div className="flex items-center gap-1 text-[12px] text-success font-bold bg-success-light px-2 py-0.5 rounded-pill">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>موثوق {errand.requester?.trustScore || 98}%</span>
            </div>
          </Card.Header>

          <Card.Body>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-right">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#123A68] text-white text-[16px] font-extrabold shadow-sm">
                  {errand.requester?.fullName
                    ? errand.requester.fullName.slice(0, 1)
                    : "م"}
                </div>
                <div className="text-right">
                  <h4 className="text-[15px] font-bold text-primary">
                    {errand.requester?.fullName || "المسافر المسجل"}
                  </h4>
                  <div className="flex items-center gap-1 text-[12px] text-text-secondary mt-0.5">
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    <span>
                      {errand.requester?.trustScore
                        ? (errand.requester.trustScore / 20).toFixed(1)
                        : "4.9"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Communication Actions */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/chat/${id}`)}
                  className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-accent-light text-accent hover:bg-accent hover:text-white transition-colors shadow-sm cursor-pointer"
                  aria-label="محادثة"
                >
                  <MessageSquare className="h-5 w-5" />
                </button>
                <a
                  href="tel:0599123456"
                  className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-background text-primary hover:bg-slate-200 transition-colors shadow-sm"
                  aria-label="اتصال"
                >
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Order Details Brief */}
        <Card>
          <Card.Header>
            <Card.Title>ملخص الأغراض والتكلفة</Card.Title>
            <WeightBadge weightClass={errand.weightClass || "LIGHT"} />
          </Card.Header>

          <Card.Body>
            <p className="text-[13px] text-text-secondary text-right">
              {errand.itemsDescription || errand.title || "لا توجد تفاصيل إضافية"}
            </p>
          </Card.Body>

          <Card.Footer>
            <span className="text-[13px] text-text-secondary">
              طريقة الدفع للمسافر:
            </span>
            <span className="text-[15px] font-extrabold text-primary">
              {errand.calculatedFeeNis || 5} ₪ (نقداً عند الاستلام)
            </span>
          </Card.Footer>
        </Card>

        {/* Traveler Action Buttons */}
        <div className="pt-2 space-y-2">
          {currentStatus !== "COMPLETED" ? (
            <Button
              variant="accent"
              size="md"
              fullWidth
              onClick={handleNextStatus}
            >
              {currentStatus === "ACCEPTED" && "تأكيد استلام الأغراض من المحل"}
              {currentStatus === "PICKED_UP" && "بدء التحرك (في الطريق)"}
              {currentStatus === "IN_TRANSIT" && "تأكيد تسليم الطلب للعميل"}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => navigate(`/errands/${id}/rating`)}
              rightIcon={<ChevronRight className="h-4 w-4" />}
            >
              تقييم تجربة التوصيل
            </Button>
          )}

          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={() => navigate(`/chat/${id}`)}
            leftIcon={<MessageSquare className="h-5 w-5" />}
          >
            فتح المحادثة المباشرة
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
