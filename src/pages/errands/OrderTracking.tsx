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
import type { AssignmentStatus } from "../../types";

export default function OrderTracking() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock tracking state (will sync with backend assignment endpoints)
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
      description: "المسافر متواجد عند المحل/الصيدلية واستلم الأغراض",
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
      navigate(`/errands/${id || "1"}/rating`);
    }
  };

  return (
    <AppLayout
      headerProps={{
        title: "تتبع حالة التوصيل",
        subtitle: `طلب رقم #${id ? id.substring(0, 8) : "84920"}`,
        showBack: true,
      }}
      showBottomNav={false}
    >
      <div className="space-y-4 pb-8">
        {/* Estimated Arrival Banner */}
        <div className="rounded-[20px] bg-gradient-to-l from-primary to-primary-light p-5 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[12px] text-white/70 block">
                الوقت المتوقع للوصول:
              </span>
              <span className="text-[20px] font-extrabold text-accent">
                خلال 15 - 25 دقيقة
              </span>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-accent">
              <Truck className="h-6 w-6 animate-pulse" />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1 text-[12px] text-white/80">
            <MapPin className="h-4 w-4 text-accent shrink-0" />
            <span>من: صيدلية الشفاء ➔ إلى: حي الرمال الجنوبي</span>
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
            <div className="space-y-6 relative mr-3 my-2">
              {/* Timeline connecting vertical line */}
              <div className="absolute right-[15px] top-3 bottom-3 w-[2px] bg-border z-0" />

              {steps.map((step, idx) => {
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;
                const Icon = step.icon;

                return (
                  <div key={step.status} className="relative z-10 flex items-start gap-4">
                    {/* Step Circle Icon */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                        isPassed
                          ? "border-accent bg-accent text-white shadow-sm"
                          : "border-border bg-white text-text-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    {/* Step Text Info */}
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
              <span>موثوق 98%</span>
            </div>
          </Card.Header>

          <Card.Body>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-[16px] font-extrabold shadow-sm">
                  ع
                </div>
                <div className="text-right">
                  <h4 className="text-[15px] font-bold text-primary">
                    عمر خليل السقا
                  </h4>
                  <div className="flex items-center gap-1 text-[12px] text-text-secondary mt-0.5">
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    <span>4.9 (42 توصيلة ناجحة)</span>
                  </div>
                </div>
              </div>

              {/* Quick Communication Actions */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/chat/${id || "1"}`)}
                  className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-accent-light text-accent hover:bg-accent hover:text-white transition-colors shadow-sm"
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
            <WeightBadge weightClass="LIGHT" />
          </Card.Header>

          <Card.Body>
            <p className="text-[13px] text-text-secondary">
              علبة حليب أطفال رقم 2 + شريط بنادول من الصيدلية
            </p>
          </Card.Body>

          <Card.Footer>
            <span className="text-[13px] text-text-secondary">
              طريقة الدفع للمسافر:
            </span>
            <span className="text-[15px] font-extrabold text-primary">
              5 ₪ (نقداً عند الاستلام)
            </span>
          </Card.Footer>
        </Card>

        {/* Simulation / Traveler Action Buttons */}
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
              onClick={() => navigate(`/errands/${id || "1"}/rating`)}
              rightIcon={<ChevronRight className="h-4 w-4" />}
            >
              تقييم تجربة التوصيل
            </Button>
          )}

          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={() => navigate(`/chat/${id || "1"}`)}
            leftIcon={<MessageSquare className="h-5 w-5" />}
          >
            فتح المحادثة المباشرة
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
