import type { FC } from "react";
import { PRESET_CATEGORIES } from "../../../types/errands";

interface ErrandCategorizedItemsProps {
  groupedCategories: Record<string, any>;
  formatSize: (size?: string) => string;
}

export const ErrandCategorizedItems: FC<ErrandCategorizedItemsProps> = ({
  groupedCategories,
  formatSize,
}) => {
  return (
    <div className="space-y-3">
      {Object.values(groupedCategories).map((group: any) => {
        const config = group.config || PRESET_CATEGORIES[0];
        return (
          <div
            key={group.name}
            className={`rounded-2xl border ${config.cardBorder} dark:border-white/10 overflow-hidden bg-white dark:bg-[#102A4C] shadow-2xs`}
          >
            {/* Category Header */}
            <div
              className={`flex items-center justify-between px-3.5 py-2.5 ${config.headerBg} border-b ${config.headerBorder}`}
            >
              <span
                className={`text-[11px] font-black ${config.textColor} bg-white dark:bg-[#102A4C] px-2 py-0.5 rounded-full border ${config.badgeBorder} dark:border-white/10`}
              >
                {group.items.length}{" "}
                {group.items.length === 1
                  ? "غرض"
                  : group.items.length === 2
                    ? "غرضان"
                    : "أغراض"}
              </span>

              <div
                className={`flex items-center gap-1.5 text-xs font-black ${config.textColor}`}
              >
                <span>{group.icon || "📦"}</span>
                <span>{group.name}</span>
              </div>
            </div>

            {/* Items List */}
            <div className={`divide-y ${config.dividerColor} dark:divide-white/10 bg-white dark:bg-[#102A4C]`}>
              {group.items.map((item: any, idx: number) => (
                <div
                  key={item.id || idx}
                  className="flex items-start justify-between gap-4 p-4"
                >
                  {/* Right: Title & Note */}
                  <div className="space-y-1 text-right flex-1">
                    <h4 className="text-sm font-black text-[#123A68] dark:text-white">
                      {item.name}
                    </h4>
                    {item.itemNote && (
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        "{item.itemNote}"
                      </p>
                    )}
                  </div>

                  {/* Left: Urgent badge, Quantity, Size */}
                  <div className="flex flex-col items-end gap-1 shrink-0 text-left">
                    {item.isUrgent && (
                      <span className="rounded-full bg-red-100/80 dark:bg-red-950/60 px-2.5 py-0.5 text-[10px] font-black text-red-600 dark:text-red-400">
                        عاجل
                      </span>
                    )}
                    <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <span>الكمية:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">
                        {item.quantity}x
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <span>الحجم:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">
                        {formatSize(item.size)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
