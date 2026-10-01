import type { FC } from "react";
import { Zap, Car, Package, Star } from "lucide-react";

interface ProfileStatsGridProps {
  tokenBalance: number;
  tripsCount?: number;
  errandsCount?: number;
  rating?: number | string;
}

export const ProfileStatsGrid: FC<ProfileStatsGridProps> = ({
  tokenBalance,
  tripsCount = 0,
  errandsCount = 0,
  rating = "5.0",
}) => {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-border dark:border-white/10 shadow-xs space-y-3 text-right">
      <h3 className="text-sm font-black text-[#123A68] dark:text-white">الإحصائيات</h3>

      <div className="grid grid-cols-2 gap-3">
        {/* Tokens */}
        <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] border border-slate-200 dark:border-white/10">
          <Zap className="h-5 w-5 text-[#F36F21] fill-[#F36F21]" />
          <span className="text-xl font-black text-[#F36F21] mt-1">
            {tokenBalance}
          </span>
          <span className="text-[10.5px] text-text-muted dark:text-slate-400">رصيد التوكنز</span>
        </div>

        {/* Trips */}
        <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] border border-slate-200 dark:border-white/10">
          <Car className="h-5 w-5 text-[#123A68] dark:text-[#38BDF8]" />
          <span className="text-xl font-black text-[#123A68] dark:text-white mt-1">
            {tripsCount}
          </span>
          <span className="text-[10.5px] text-text-muted dark:text-slate-400">الرحلات</span>
        </div>

        {/* Errands */}
        <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] border border-slate-200 dark:border-white/10">
          <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {errandsCount}
          </span>
          <span className="text-[10.5px] text-text-muted dark:text-slate-400">الطلبات</span>
        </div>

        {/* Rating */}
        <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] border border-slate-200 dark:border-white/10">
          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          <span className="text-xl font-black text-amber-500 dark:text-amber-400 mt-1">
            {rating}
          </span>
          <span className="text-[10.5px] text-text-muted dark:text-slate-400">التقييم</span>
        </div>
      </div>
    </div>
  );
};
