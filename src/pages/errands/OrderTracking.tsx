import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronRight,
  Check,
  Truck,
  Package,
  Star,
  ShieldCheck,
  MessageSquare,
  X,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useErrandDetail } from "../../hooks/useErrands";

export default function OrderTracking() {
  const { id = "errand-1" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { errand } = useErrandDetail(id);

  const [rating, setRating] = useState<number>(0);

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-black text-[#123A68]">تتبع حالة الطلب</h1>
        </div>

        {/* Top Dark Navy Header Card */}
        <div className="rounded-3xl bg-[#123A68] p-5 text-white shadow-md space-y-3.5 text-right">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-blue-500/20 px-3 py-0.5 text-[11px] font-bold text-blue-200 border border-blue-400/30">
              تم التطابق
            </span>
            <span className="text-[11px] text-white/70">طلب توصيل</span>
          </div>

          <div>
            <h2 className="text-base font-black text-white leading-relaxed">
              {errand?.title || "توصيل وثائق رسمية من ديوان الموظفين في خان يونس"}
            </h2>
            <div className="flex items-center gap-3 text-[11px] text-white/80 pt-1.5">
              <span>23 يوليو</span>
              <span>•</span>
              <span>{errand?.neighborhood?.name || "الشجاعية"}</span>
              <span>•</span>
              <span className="text-amber-400 font-bold">1 توكن ⚡</span>
            </div>
          </div>

          {/* Progress Bar (67% - Step 3 of 4) */}
          <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
            <div className="flex items-center justify-between text-[11px] text-white/90">
              <span className="font-bold">المرحلة 3 من 4</span>
              <span>تقدم الطلب 67%</span>
            </div>
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-[#F36F21] rounded-full w-2/3 transition-all duration-500" />
            </div>
          </div>
        </div>

        {/* Card 2: مراحل الطلب (Timeline) */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-5 text-right">
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <span className="text-base">⚡</span>
            <h3 className="text-sm font-black text-[#123A68]">مراحل الطلب</h3>
          </div>

          <div className="relative space-y-6 mr-1">
            {/* Connecting Vertical Line */}
            <div className="absolute right-[15px] top-3 bottom-3 w-[2px] bg-slate-200" />

            {/* Step 1: Done */}
            <div className="relative flex items-start gap-3.5 z-10">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <div className="text-right flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-primary">تم نشر الطلب</h4>
                  <span className="text-[10px] text-text-muted">23 يوليو • 10:30 ص</span>
                </div>
                <p className="text-[11px] text-text-secondary mt-0.5">
                  نشر طلبك وبدأ المسافرون في مشاهدته
                </p>
              </div>
            </div>

            {/* Step 2: Done */}
            <div className="relative flex items-start gap-3.5 z-10">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <div className="text-right flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-primary">تم قبول العرض</h4>
                  <span className="text-[10px] text-text-muted">23 يوليو • 11:00 ص</span>
                </div>
                <p className="text-[11px] text-text-secondary mt-0.5">
                  وافق أحمد خالد على تنفيذ طلبك وأكّد الرحلة
                </p>
              </div>
            </div>

            {/* Step 3: Active (In Transit) */}
            <div className="relative flex items-start gap-3.5 z-10">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white shadow-md ring-4 ring-blue-50">
                <Truck className="h-4 w-4" />
              </div>
              <div className="text-right flex-1 pt-0.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-black text-[#123A68]">في الطريق</h4>
                    <span className="rounded-full bg-blue-100 px-2 py-0.2 text-[9.5px] font-black text-[#123A68]">
                      الآن
                    </span>
                  </div>
                  <span className="text-[10px] text-[#F36F21] font-bold">23 يوليو • 2:00 م (متوقع)</span>
                </div>
                <p className="text-[11px] text-text-secondary">
                  المسافر في طريقه — الرحلة من غزة إلى رفح
                </p>

                {/* Live Subcard */}
                <div className="rounded-2xl bg-blue-50/70 p-3 border border-blue-200/70 text-right space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-[#123A68]">
                    <div className="flex items-center gap-1.5">
                      <Truck className="h-4 w-4" />
                      <span>المسافر في الطريق</span>
                    </div>
                    <span className="flex items-center gap-1 text-[10.5px] font-bold text-emerald-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      مباشر
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-600">
                    غزة - الرمال ➔ رفح • الوصول المتوقع 2:30 م
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4: Pending (Delivered) */}
            <div className="relative flex items-start gap-3.5 z-10">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 border border-slate-200">
                <Package className="h-4 w-4" />
              </div>
              <div className="text-right flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-400">تم التسليم</h4>
                  <span className="text-[10px] text-text-muted">في انتظار التأكيد</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  وصل غرضك بأمان إلى وجهته
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: المسافر المكلّف بطلبك */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-3.5 text-right">
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <span className="text-base">👤</span>
            <h3 className="text-sm font-black text-[#123A68]">المسافر المكلّف بطلبك</h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#123A68] text-xs font-black text-white">
                أخ
              </div>
              <span className="absolute bottom-0 left-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            <div className="text-right flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-black text-primary">أحمد خالد</h4>
                <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="h-3 w-3" />
                  موثّق
                </span>
                <span className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
                  ⭐ 4.9
                </span>
              </div>
              <p className="text-[10.5px] text-text-muted mt-0.5">
                45 رحلة مكتملة • عضو منذ 2024 • رحلة اليوم 1:00 ص • غزة - الرمال
              </p>
            </div>
          </div>

          {/* Quote */}
          <div className="rounded-2xl bg-[#F8FAFC] p-3 border border-slate-100 text-right space-y-1">
            <span className="text-[10px] font-bold text-text-muted block">
              رسالته عند القبول:
            </span>
            <p className="text-xs text-text-secondary leading-relaxed italic">
              "يمكنني نقل غرضك بكل أمان، لدي خبرة طويلة في هذا المسار وأوصل في الوقت المحدد دائماً"
            </p>
          </div>
        </div>

        {/* Card 4: تقييم المسافر */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-black text-[#123A68]">
            <span>⭐</span>
            <span>تقييم المسافر</span>
          </div>
          <p className="text-[11px] text-text-muted">
            يمكنك التقييم بعد تأكيد استلام غرضك
          </p>

          <div className="flex items-center justify-center gap-2 pt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 text-slate-300 hover:text-amber-400 hover:scale-110 transition-all cursor-pointer"
              >
                <Star
                  className={`h-7 w-7 ${
                    star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(`/chat/${id}`)}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-50/60 text-xs font-black text-[#123A68] hover:bg-blue-100 active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            <MessageSquare className="h-4 w-4" />
            <span>التواصل مع المسافر</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm("هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟")) {
                navigate("/errands");
              }
            }}
            className="flex h-12 px-4 items-center justify-center gap-1.5 rounded-2xl border border-red-200 bg-red-50/60 text-xs font-black text-red-600 hover:bg-red-100 active:scale-98 transition-all cursor-pointer"
          >
            <X className="h-4 w-4" />
            <span>إلغاء الطلب</span>
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
