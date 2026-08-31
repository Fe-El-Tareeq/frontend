import type { FC } from "react";

interface WalletStatsSummaryProps {
  totalPurchased: number;
  totalSpent: number;
}

export const WalletStatsSummary: FC<WalletStatsSummaryProps> = ({
  totalPurchased,
  totalSpent,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Total Purchased */}
      <div className="rounded-3xl bg-[#E6F4EA] p-4 border border-[#CEEAD6] text-right">
        <span className="text-xs font-bold text-[#137333] block">
          إجمالي الشراء
        </span>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-2xl font-black text-[#137333]">
            {totalPurchased}
          </span>
          <span className="text-xs font-bold text-[#137333]">توكن</span>
        </div>
      </div>

      {/* Total Spent */}
      <div className="rounded-3xl bg-[#FEECEB] p-4 border border-[#FAD2CF] text-right">
        <span className="text-xs font-bold text-[#C5221F] block">
          إجمالي الإنفاق
        </span>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-2xl font-black text-[#C5221F]">
            {totalSpent}
          </span>
          <span className="text-xs font-bold text-[#C5221F]">توكن</span>
        </div>
      </div>
    </div>
  );
};
