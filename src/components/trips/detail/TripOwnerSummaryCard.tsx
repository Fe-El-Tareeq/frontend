import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Car, ChevronRight, FileText } from "lucide-react";

interface TripOwnerSummaryCardProps {
  tripId: string;
  originText: string;
  destText: string;
  dateStr: string;
  timeStr: string;
  maxCapacityUnits?: number;
  notes?: string | null;
  requestsCount: number;
  acceptedCount: number;
  rejectedCount: number;
  isCompleted: boolean;
}

export const TripOwnerSummaryCard: FC<TripOwnerSummaryCardProps> = ({
  tripId,
  originText,
  destText,
  dateStr,
  timeStr,
  maxCapacityUnits = 3,
  notes,
  requestsCount,
  acceptedCount,
  rejectedCount,
  isCompleted,
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Dark Navy Trip Summary Hero Card */}
      <div className="rounded-3xl bg-[#123A68] dark:bg-[#102A4C] border border-transparent dark:border-white/10 p-5 text-white shadow-md space-y-3.5 text-right">
        <div className="flex items-start justify-between">
          {/* Route on RIGHT */}
          <div className="text-right space-y-0.5">
            <span className="text-[10px] text-white/70 block">مسار الرحلة</span>
            <h3 className="text-sm font-black text-white">{originText}</h3>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F36F21]">
              <Car className="h-3.5 w-3.5" />
              <span>{destText}</span>
            </div>
          </div>

          {/* Date & Time on LEFT */}
          <div className="text-left space-y-0.5">
            <span className="text-[10px] text-white/70 block">التاريخ</span>
            <span className="text-xs font-black text-white">{dateStr}</span>
            <span className="text-[10px] text-white/80 block">{timeStr}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/10">
          <span>{requestsCount} طلب وارد 📄</span>
          <span>{notes || "لا مانع من الأغراض الثقيلة 📄"}</span>
          <span>حتى {maxCapacityUnits} أغراض 📦</span>
        </div>
      </div>

      {/* Checklist Banner Link */}
      {!isCompleted && (
        <div
          onClick={() => navigate(`/trips/${tripId}/checklist`)}
          className="flex items-center justify-between rounded-3xl bg-white dark:bg-[#102A4C] p-4 border border-slate-200/90 dark:border-white/10 shadow-2xs hover:border-[#123A68]/40 dark:hover:border-accent/40 transition-all cursor-pointer text-right"
        >
          {/* Info on RIGHT */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 dark:bg-white/10 text-[#123A68] dark:text-accent shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="text-right">
              <h4 className="text-xs font-black text-[#123A68] dark:text-white">
                ملخص الرحلة الكامل
              </h4>
              <p className="text-[11px] text-text-muted dark:text-slate-400">
                {acceptedCount} طلب مقبول • 0 منجز • 0%
              </p>
            </div>
          </div>

          {/* Indicator & Chevron on LEFT */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-black border border-emerald-200 dark:border-emerald-800/40">
              {acceptedCount > 0 ? "0%" : "0%"}
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400 rotate-180" />
          </div>
        </div>
      )}

      {/* Completed Trip Statistics Row */}
      {isCompleted && (
        <div className="grid grid-cols-3 gap-2.5">
          <div className="rounded-2xl bg-white dark:bg-[#102A4C] p-3 text-center border border-slate-200 dark:border-white/10 shadow-2xs space-y-0.5">
            <div className="text-lg font-black text-primary dark:text-white">
              {requestsCount}
            </div>
            <span className="text-[10.5px] text-text-muted dark:text-slate-400 block">
              إجمالي الطلبات
            </span>
          </div>
          <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 p-3 text-center border border-emerald-200 dark:border-emerald-900/40 shadow-2xs space-y-0.5">
            <div className="text-lg font-black text-emerald-700 dark:text-emerald-300">
              {acceptedCount}
            </div>
            <span className="text-[10.5px] text-emerald-800 dark:text-emerald-300 font-bold block">
              تم توصيلها
            </span>
          </div>
          <div className="rounded-2xl bg-red-50 dark:bg-red-950/30 p-3 text-center border border-red-200 dark:border-red-900/40 shadow-2xs space-y-0.5">
            <div className="text-lg font-black text-red-600 dark:text-red-300">
              {rejectedCount}
            </div>
            <span className="text-[10.5px] text-red-800 dark:text-red-300 font-bold block">
              مرفوضة
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
