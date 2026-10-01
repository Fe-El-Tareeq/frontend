import type { FC } from "react";
import { Zap } from "lucide-react";

interface ErrandCostSummaryProps {
  postTokenCost?: number;
  tokenBalance?: number | null;
}

export const ErrandCostSummary: FC<ErrandCostSummaryProps> = ({
  postTokenCost = 1,
  tokenBalance,
}) => {
  return (
    <div className="flex items-center justify-between pt-1">
      {/* Right in RTL: Errand Posting Cost */}
      <div className="text-right space-y-0.5">
        <span className="text-[11px] text-slate-400 font-medium block">
          تكلفة نشر الطلب
        </span>
        <div className="flex items-center justify-start gap-1 font-black text-sm text-[#123A68]">
          <span>
            {postTokenCost === 1 ? "توكن واحد" : `${postTokenCost} توكن`}
          </span>
          <Zap className="h-4 w-4 fill-[#F36F21] text-[#F36F21]" />
        </div>
      </div>

      {/* Left in RTL: User Balance */}
      {tokenBalance !== null && tokenBalance !== undefined && (
        <span className="text-xs text-slate-400 font-medium">
          رصيدك: {tokenBalance} توكن
        </span>
      )}
    </div>
  );
};
