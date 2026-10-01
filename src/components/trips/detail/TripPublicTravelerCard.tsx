import type { FC } from "react";
import { Star } from "lucide-react";

interface TripPublicTravelerCardProps {
  fullName?: string | null;
  trustScore?: number | null;
  previousTripsCount?: number;
}

export const TripPublicTravelerCard: FC<TripPublicTravelerCardProps> = ({
  fullName = "أحمد خالد",
  trustScore,
  previousTripsCount = 32,
}) => {
  const name = fullName || "أحمد خالد";
  const rating = trustScore ? (trustScore / 20).toFixed(1) : "4.8";
  const initials = name.slice(0, 2);

  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-4.5 border border-border dark:border-white/10 shadow-xs flex items-center justify-between text-right">
      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <span>{rating}</span>
        <span className="text-text-muted dark:text-slate-400">• {previousTripsCount} رحلة سابقة</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <h3 className="text-sm font-black text-[#123A68] dark:text-white">{name}</h3>
          <span className="text-[10.5px] text-text-muted dark:text-slate-400">مسافر نشط</span>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#123A68] dark:bg-[#1E4E8C] text-xs font-black text-white">
          {initials}
        </div>
      </div>
    </div>
  );
};
