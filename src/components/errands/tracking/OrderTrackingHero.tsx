import type { FC } from "react";

interface OrderTrackingHeroProps {
  title?: string;
  neighborhoodName?: string;
  stageNumber?: number;
}

export const OrderTrackingHero: FC<OrderTrackingHeroProps> = ({
  title = "توصيل وثائق رسمية من ديوان الموظفين في خان يونس",
  neighborhoodName = "الشجاعية",
  stageNumber = 3,
}) => {
  const progressPercent =
    stageNumber === 3 ? 67 : Math.round((stageNumber / 4) * 100);

  return (
    <div className="rounded-3xl bg-[#123A68] dark:bg-[#102A4C] border border-transparent dark:border-white/10 p-5 text-white shadow-md space-y-3.5 text-right">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-blue-500/20 px-3 py-0.5 text-[11px] font-bold text-blue-200 border border-blue-400/30">
          تم التطابق
        </span>
        <span className="text-[11px] text-white/70">طلب توصيل</span>
      </div>

      <div>
        <h2 className="text-base font-black text-white leading-relaxed">
          {title}
        </h2>
        <div className="flex items-center gap-3 text-[11px] text-white/80 pt-1.5">
          <span>23 يوليو</span>
          <span>•</span>
          <span>{neighborhoodName}</span>
          <span>•</span>
          <span className="text-amber-400 font-bold">1 توكن ⚡</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
        <div className="flex items-center justify-between text-[11px] text-white/90">
          <span className="font-bold">المرحلة {stageNumber} من 4</span>
          <span>تقدم الطلب {progressPercent}%</span>
        </div>
        <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-[#F36F21] rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
