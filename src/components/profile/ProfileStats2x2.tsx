import type { FC } from "react";
import { Zap, Car, Package, Star } from "lucide-react";

interface ProfileStats2x2Props {
  tokenBalance: number;
  tripsCount: number;
  errandsCount: number;
  trustScore: string;
  onTokensClick?: () => void;
  onTripsClick?: () => void;
  onErrandsClick?: () => void;
}

export const ProfileStats2x2: FC<ProfileStats2x2Props> = ({
  tokenBalance,
  tripsCount,
  errandsCount,
  trustScore,
  onTokensClick,
  onTripsClick,
  onErrandsClick,
}) => {
  return (
    <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-3.5 text-right">
      <h2 className="text-sm font-black text-[#123A68]">الإحصائيات</h2>

      <div className="grid grid-cols-2 gap-2.5">
        {/* Top Right: Tokens */}
        <div
          onClick={onTokensClick}
          className="flex flex-col items-center justify-center rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200/80 hover:border-orange-300 transition-all cursor-pointer text-center space-y-1"
        >
          <Zap className="h-5 w-5 text-[#F36F21] fill-[#F36F21]" />
          <span className="text-xl font-black text-[#F36F21]">
            {tokenBalance}
          </span>
          <span className="text-[10.5px] text-text-muted font-bold">
            رصيد التوكنز
          </span>
        </div>

        {/* Top Left: Trips */}
        <div
          onClick={onTripsClick}
          className="flex flex-col items-center justify-center rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer text-center space-y-1"
        >
          <Car className="h-5 w-5 text-[#123A68]" />
          <span className="text-xl font-black text-[#123A68]">
            {tripsCount}
          </span>
          <span className="text-[10.5px] text-text-muted font-bold">
            الرحلات
          </span>
        </div>

        {/* Bottom Right: Errands */}
        <div
          onClick={onErrandsClick}
          className="flex flex-col items-center justify-center rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200/80 hover:border-emerald-300 transition-all cursor-pointer text-center space-y-1"
        >
          <Package className="h-5 w-5 text-[#059669]" />
          <span className="text-xl font-black text-[#059669]">
            {errandsCount}
          </span>
          <span className="text-[10.5px] text-text-muted font-bold">
            الطلبات
          </span>
        </div>

        {/* Bottom Left: Rating */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200/80 text-center space-y-1">
          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          <span className="text-xl font-black text-amber-500">{trustScore}</span>
          <span className="text-[10.5px] text-text-muted font-bold">
            التقييم
          </span>
        </div>
      </div>
    </div>
  );
};
