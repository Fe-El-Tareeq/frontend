import type { FC } from "react";

interface TripPublicDetailsGridProps {
  dateStr: string;
  timeStr: string;
  neighborhoodName: string;
  maxCapacityClass?: string;
  notes?: string | null;
}

export const TripPublicDetailsGrid: FC<TripPublicDetailsGridProps> = ({
  dateStr,
  timeStr,
  neighborhoodName,
  maxCapacityClass,
  notes,
}) => {
  const capacityLabel =
    maxCapacityClass === "LIGHT"
      ? "أغراض خفيفة فقط (حتى 2 أغراض)"
      : maxCapacityClass === "MEDIUM"
        ? "أغراض متوسطة (حتى 5 أغراض)"
        : "أغراض ثقيلة ومتنوعة";

  return (
    <div className="space-y-2.5">
      <div className="rounded-2xl bg-white dark:bg-[#102A4C] p-3.5 border border-slate-200 dark:border-white/10 text-right">
        <span className="text-[10.5px] text-text-muted dark:text-slate-400 block">
          تاريخ المغادرة
        </span>
        <span className="text-xs font-black text-[#123A68] dark:text-white mt-0.5 block">
          {dateStr}
        </span>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#102A4C] p-3.5 border border-slate-200 dark:border-white/10 text-right">
        <span className="text-[10.5px] text-text-muted dark:text-slate-400 block">وقت المغادرة</span>
        <span className="text-xs font-black text-[#123A68] dark:text-white mt-0.5 block">
          {timeStr}
        </span>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#102A4C] p-3.5 border border-slate-200 dark:border-white/10 text-right">
        <span className="text-[10.5px] text-text-muted dark:text-slate-400 block">الحي</span>
        <span className="text-xs font-black text-[#123A68] dark:text-white mt-0.5 block">
          {neighborhoodName}
        </span>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#102A4C] p-3.5 border border-slate-200 dark:border-white/10 text-right">
        <span className="text-[10.5px] text-text-muted dark:text-slate-400 block">
          السعة المتاحة للأغراض
        </span>
        <span className="text-xs font-black text-[#123A68] dark:text-white mt-0.5 block">
          {capacityLabel}
        </span>
      </div>

      {notes && (
        <div className="p-3 text-right space-y-1">
          <span className="text-[10.5px] font-bold text-text-muted dark:text-slate-400 block">
            ملاحظات إضافية
          </span>
          <p className="text-xs text-text-secondary dark:text-slate-300 leading-relaxed">{notes}</p>
        </div>
      )}
    </div>
  );
};
