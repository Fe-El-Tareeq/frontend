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
    <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-3 text-right">
      <h3 className="text-sm font-black text-[#123A68]">الإحصائيات</h3>

      <div className="grid grid-cols-2 gap-3">
        {/* Tokens */}
        <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
          <Zap className="h-5 w-5 text-[#F36F21] fill-[#F36F21]" />
          <span className="text-xl font-black text-[#F36F21] mt-1">
            {tokenBalance}
          </span>
          <span className="text-[10.5px] text-text-muted">رصيد التوكنز</span>
        </div>

        {/* Trips */}
        <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
          <Car className="h-5 w-5 text-[#123A68]" />
          <span className="text-xl font-black text-[#123A68] mt-1">
            {tripsCount}
          </span>
          <span className="text-[10.5px] text-text-muted">الرحلات</span>
        </div>

        {/* Errands */}
        <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
          <Package className="h-5 w-5 text-emerald-600" />
          <span className="text-xl font-black text-emerald-600 mt-1">
            {errandsCount}
          </span>
          <span className="text-[10.5px] text-text-muted">الطلبات</span>
        </div>

        {/* Rating */}
        <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          <span className="text-xl font-black text-amber-600 mt-1">
            {rating}
          </span>
          <span className="text-[10.5px] text-text-muted">التقييم</span>
        </div>
      </div>
    </div>
  );
};
