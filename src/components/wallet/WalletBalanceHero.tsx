import type { FC } from "react";
import { Zap } from "lucide-react";

interface WalletBalanceHeroProps {
  tokenBalance: number;
  userName: string;
}

export const WalletBalanceHero: FC<WalletBalanceHeroProps> = ({
  tokenBalance,
  userName,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#123A68] p-5 text-white shadow-md">
      {/* Circular decorations */}
      <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
      <div className="absolute right-0 bottom-0 h-28 w-28 rounded-full bg-black/15" />

      <div className="relative z-10 space-y-3">
        <span className="text-xs text-white/80 block">رصيدك الحالي</span>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-white">{tokenBalance}</span>
          <span className="text-lg font-bold text-white/90">توكن</span>
        </div>
        <p className="text-[11px] text-white/70">
          يكفي لنشر {tokenBalance} طلب
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-white/15">
          <span className="text-xs font-bold text-white">{userName}</span>
          <Zap className="h-5 w-5 text-[#F36F21] fill-[#F36F21]" />
        </div>
      </div>
    </div>
  );
};
