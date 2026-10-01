import type { FC } from "react";

interface TripPublicHeroCardProps {
  originText: string;
  destText: string;
}

export const TripPublicHeroCard: FC<TripPublicHeroCardProps> = ({
  originText,
  destText,
}) => {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-[#F36F21] to-[#E05E12] p-5 text-white shadow-md space-y-3 text-right">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white dark:bg-[#102A4C] px-3 py-0.5 text-xs font-black text-[#F36F21] dark:text-[#FB923C] border border-transparent dark:border-white/10">
          منشورة
        </span>
        <span className="text-[11px] text-white/90">منذ ساعتين</span>
      </div>

      <div className="text-center pt-2 pb-1">
        <div className="flex items-center justify-center gap-3 text-lg font-black text-white">
          <span>من {originText}</span>
          <span>➔</span>
          <span>إلى {destText}</span>
        </div>
      </div>
    </div>
  );
};
