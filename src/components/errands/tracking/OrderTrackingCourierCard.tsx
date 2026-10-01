import type { FC } from "react";
import { Star, ShieldCheck, MessageSquare } from "lucide-react";

interface OrderTrackingCourierCardProps {
  courierName?: string;
  rating?: number;
  completedTripsCount?: number;
  origin?: string;
  destination?: string;
  timeStr?: string;
  onOpenChat: () => void;
}

export const OrderTrackingCourierCard: FC<OrderTrackingCourierCardProps> = ({
  courierName = "أحمد خالد",
  rating = 4.8,
  completedTripsCount = 32,
  origin = "غزة",
  destination = "رفح",
  timeStr = "اليوم • 1:00 ص",
  onOpenChat,
}) => {
  const initials = courierName.slice(0, 2);

  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-border dark:border-white/10 shadow-xs space-y-4 text-right">
      <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-white/10">
        <span className="text-base">👤</span>
        <h3 className="text-sm font-black text-[#123A68] dark:text-white">
          المسافر المكلّف بطلبك
        </h3>
      </div>

      <div className="flex items-center justify-between">
        {/* Courier Info on RIGHT */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#123A68] dark:bg-[#1E4E8C] text-xs font-black text-white shrink-0">
            {initials}
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-black text-primary dark:text-white">{courierName}</h3>
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            </div>
            <span className="text-[10.5px] text-text-muted dark:text-slate-400">مسافر معتمد</span>
          </div>
        </div>

        {/* Rating on LEFT */}
        <div className="flex items-center gap-1 text-xs font-bold text-amber-500 shrink-0">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span>{rating}</span>
          <span className="text-text-muted dark:text-slate-400">• {completedTripsCount} رحلة</span>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-50 dark:bg-[#0B1E36] p-3.5 border border-slate-100 dark:border-white/10 space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-500 dark:text-slate-400">{timeStr}</span>
          <span className="font-black text-[#123A68] dark:text-[#38BDF8]">
            {origin} ➔ {destination}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenChat}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] dark:bg-[#1E4E8C] text-xs font-black text-white hover:bg-[#0D2C50] dark:hover:bg-[#2563EB] active:scale-98 transition-all cursor-pointer shadow-md"
      >
        <MessageSquare className="h-4 w-4" />
        <span>التواصل مع المسافر</span>
      </button>
    </div>
  );
};
