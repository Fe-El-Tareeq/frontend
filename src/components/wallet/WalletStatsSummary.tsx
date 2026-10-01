import type { FC } from "react";

interface WalletStatsSummaryProps {
  totalPurchased: number;
  totalSpent: number;
  isLoading?: boolean;
}

export const WalletStatsSummary: FC<WalletStatsSummaryProps> = ({
  totalPurchased,
  totalSpent,
  isLoading = false,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Total Purchased (Light Green / Dark Emerald) */}
      <div className="rounded-3xl bg-[#E6F9EE] dark:bg-emerald-950/30 p-4 border border-emerald-100 dark:border-emerald-500/20 text-right space-y-1">
        <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block">
          إجمالي الشراء
        </span>
        <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
          {isLoading ? "..." : totalPurchased}{" "}
          <span className="text-xs font-bold">توكن</span>
        </div>
      </div>

      {/* Total Spent (Light Orange / Dark Orange) */}
      <div className="rounded-3xl bg-[#FFF0E6] dark:bg-orange-950/30 p-4 border border-orange-100 dark:border-orange-500/20 text-right space-y-1">
        <span className="text-[11px] font-bold text-[#E05E12] dark:text-orange-300 block">
          إجمالي الإنفاق
        </span>
        <div className="text-2xl font-black text-[#F36F21]">
          {isLoading ? "..." : totalSpent}{" "}
          <span className="text-xs font-bold">توكن</span>
        </div>
      </div>
    </div>
  );
};

