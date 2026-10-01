import type { FC } from "react";
import { Check, Truck, Package } from "lucide-react";

interface OrderTrackingTimelineProps {
  stageNumber?: number;
}

export const OrderTrackingTimeline: FC<OrderTrackingTimelineProps> = ({
  stageNumber = 3,
}) => {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-border dark:border-white/10 shadow-xs space-y-5 text-right">
      <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-white/10">
        <span className="text-base">⚡</span>
        <h3 className="text-sm font-black text-[#123A68] dark:text-white">مراحل الطلب</h3>
      </div>

      <div className="relative space-y-6 mr-1">
        {/* Connecting Vertical Line */}
        <div className="absolute right-[15px] top-3 bottom-3 w-[2px] bg-slate-200 dark:bg-white/10" />

        {/* Step 1: Published */}
        <div className="relative flex items-start gap-3.5 z-10">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs">
            <Check className="h-4 w-4 stroke-3" />
          </div>
          <div className="text-right flex-1 pt-0.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-primary dark:text-white">تم نشر الطلب</h4>
              <span className="text-[10px] text-text-muted dark:text-slate-400">
                23 يوليو • 10:30 ص
              </span>
            </div>
            <p className="text-[11px] text-text-secondary dark:text-slate-300 mt-0.5">
              نشر طلبك وبدأ المسافرون في مشاهدته
            </p>
          </div>
        </div>

        {/* Step 2: Accepted */}
        <div className="relative flex items-start gap-3.5 z-10">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs">
            <Check className="h-4 w-4 stroke-3" />
          </div>
          <div className="text-right flex-1 pt-0.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-primary dark:text-white">تم قبول العرض</h4>
              <span className="text-[10px] text-text-muted dark:text-slate-400">
                23 يوليو • 11:00 ص
              </span>
            </div>
            <p className="text-[11px] text-text-secondary dark:text-slate-300 mt-0.5">
              وافق المسافر على تنفيذ طلبك وأكّد الرحلة
            </p>
          </div>
        </div>

        {/* Step 3: In Transit */}
        <div className="relative flex items-start gap-3.5 z-10">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-2xs ${stageNumber >= 3
                ? "bg-[#F36F21] text-white animate-pulse"
                : "bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400"
              }`}
          >
            <Truck className="h-4 w-4" />
          </div>
          <div className="text-right flex-1 pt-0.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-[#F36F21]">
                في الطريق
              </h4>
              <span className="text-[10px] text-accent font-bold">الآن ⏱</span>
            </div>
            <p className="text-[11px] text-text-secondary dark:text-slate-300 mt-0.5">
              المسافر في طريقه من غزة إلى رفح
            </p>
          </div>
        </div>

        {/* Step 4: Delivered */}
        <div className="relative flex items-start gap-3.5 z-10">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${stageNumber >= 4
                ? "bg-emerald-500 text-white border-emerald-500"
                : "border-slate-300 dark:border-white/20 bg-white dark:bg-[#0B1E36] text-slate-400 dark:text-slate-500"
              }`}
          >
            <Package className="h-4 w-4" />
          </div>
          <div className="text-right flex-1 pt-0.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-text-muted dark:text-slate-400">
                تم التسليم بنجاح
              </h4>
              <span className="text-[10px] text-text-muted dark:text-slate-400">المتوقع 2:00 م</span>
            </div>
            <p className="text-[11px] text-text-muted dark:text-slate-400 mt-0.5">
              سيتم تأكيد الاستلام وتقييم التجربة
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
