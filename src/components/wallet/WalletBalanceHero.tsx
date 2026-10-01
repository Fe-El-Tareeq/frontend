import type { FC } from "react";
import { Zap } from "lucide-react";

interface WalletBalanceHeroProps {
  tokenBalance: number;
  userName?: string;
  isLoading?: boolean;
}

export const WalletBalanceHero: FC<WalletBalanceHeroProps> = ({
  tokenBalance,
  userName = "المستخدم",
  isLoading = false,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#123A68] p-5 text-white shadow-md space-y-4">
      <div className="text-right">
        <span className="text-xs text-white/70 block">رصيدك الحالي</span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-4xl font-black text-white">
            {isLoading ? "..." : tokenBalance}
          </span>
          <span className="text-lg font-black text-white/90">توكن</span>
        </div>
        <p className="text-[11px] text-white/60 mt-1">
          يكفي لنشر {tokenBalance} رحلة/ طلب
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
        <div className="flex items-center gap-1.5 text-white/90">
          <Zap className="h-4 w-4 text-[#F36F21] fill-[#F36F21]" />
          <span className="font-bold">{userName}</span>
        </div>
      </div>
    </div>
  );
};

