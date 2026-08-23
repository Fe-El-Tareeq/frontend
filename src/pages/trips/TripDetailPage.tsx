import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Phone,
  MessageSquare,
  Share2,
  ArrowLeft,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";

export default function TripDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
          <div>
            <h1 className="text-xl font-black text-[#123A68]">تفاصيل الرحلة</h1>
            <p className="text-xs text-text-secondary">
              راجع تفاصيل الرحلة قبل حجز مكانك
            </p>
          </div>
        </div>

        {/* Orange Hero Route Banner (Figma exact card) */}
        <div className="relative overflow-hidden rounded-3xl bg-[#F36F21] p-5 text-white shadow-md space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] text-white/90">منذ ساعتين</span>
            <span className="rounded-full bg-white px-3 py-1 text-[10.5px] font-black text-[#F36F21]">
              منشورة
            </span>
          </div>

          {/* RTL Route: From on RIGHT (1st child), arrow, To on LEFT (3rd child) */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-right">
              <span className="text-[11px] text-white/80 block">من</span>
              <span className="text-2xl font-black text-white">غزة - الرمال</span>
            </div>

            <ArrowLeft className="h-6 w-6 text-white/90" />

            <div className="text-left">
              <span className="text-[11px] text-white/80 block">إلى</span>
              <span className="text-2xl font-black text-white">رفح</span>
            </div>
          </div>
        </div>

        {/* Traveler Profile Card: RTL Order (Traveler info on RIGHT, Action buttons on LEFT) */}
        <div className="flex items-center justify-between rounded-3xl bg-white p-4 border border-border shadow-xs">
          {/* Right side in RTL: Avatar + Name & Rating */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#123A68] text-xs font-black text-white">
              مر
            </div>

            <div className="text-right">
              <h3 className="text-sm font-black text-primary">محمد أبو ريدة</h3>
              <p className="text-[11px] text-text-muted mt-0.5">
                32 رحلة سابقة • ⭐ 4.8
              </p>
            </div>
          </div>

          {/* Left side in RTL: Phone and Message buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(`/chat/${id || "trip-1"}`)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-primary hover:text-accent hover:border-accent shadow-2xs transition-colors cursor-pointer"
            >
              <MessageSquare className="h-4.5 w-4.5" />
            </button>

            <a
              href="tel:0591234567"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-primary hover:text-accent hover:border-accent shadow-2xs transition-colors"
            >
              <Phone className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        {/* Detail Cards List */}
        <div className="space-y-2.5">
          <div className="rounded-2xl bg-white p-3.5 border border-border shadow-2xs text-right">
            <span className="text-[10.5px] text-text-muted block">
              تاريخ المغادرة
            </span>
            <span className="text-xs font-black text-primary mt-0.5 block">
              الخميس 21 أغسطس
            </span>
          </div>

          <div className="rounded-2xl bg-white p-3.5 border border-border shadow-2xs text-right">
            <span className="text-[10.5px] text-text-muted block">
              وقت المغادرة
            </span>
            <span className="text-xs font-black text-primary mt-0.5 block">
              9:30 صباحاً
            </span>
          </div>

          <div className="rounded-2xl bg-white p-3.5 border border-border shadow-2xs text-right">
            <span className="text-[10.5px] text-text-muted block">الحي</span>
            <span className="text-xs font-black text-primary mt-0.5 block">
              حي الشيخ رضوان
            </span>
          </div>

          <div className="rounded-2xl bg-white p-3.5 border border-border shadow-2xs text-right">
            <span className="text-[10.5px] text-text-muted block">
              السعة المتاحة للأغراض
            </span>
            <span className="text-xs font-black text-primary mt-0.5 block">
              أغراض خفيفة فقط
            </span>
          </div>
        </div>

        {/* Additional notes */}
        <div className="space-y-1 pt-1 text-right">
          <span className="text-[11px] font-bold text-text-muted block">
            ملاحظات إضافية
          </span>
          <p className="text-xs text-text-secondary leading-relaxed">
            يوجد مانع من الأغراض الثقيلة، أغراض خفيفة فقط مسموح بها في هذه الرحلة.
          </p>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-[430px] bg-white/95 backdrop-blur-md border-t border-border p-3.5 shadow-lg">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigate(`/trips/${id || "trip-1"}/request-space`)}
            className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer"
          >
            اطلب مكانك بالرحلة
          </button>

          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-primary hover:border-accent hover:text-accent shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
