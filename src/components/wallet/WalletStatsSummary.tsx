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
      {/* Total Purchased (Light Green) */}
      <div className="rounded-3xl bg-[#E6F9EE] p-4 border border-emerald-100 text-right space-y-1">
        <span className="text-[11px] font-bold text-emerald-800 block">
          إجمالي الشراء
        </span>
        <div className="text-2xl font-black text-emerald-700">
          {isLoading ? "..." : totalPurchased}{" "}
          <span className="text-xs font-bold">توكن</span>
        </div>
      </div>

      {/* Total Spent (Light Orange) */}
      <div className="rounded-3xl bg-[#FFF0E6] p-4 border border-orange-100 text-right space-y-1">
        <span className="text-[11px] font-bold text-[#E05E12] block">
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

