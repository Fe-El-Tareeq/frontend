import type { FC } from "react";

export interface TransactionRowData {
  id: string;
  date: string;
  type: string;
  amount: string;
  isPositive: boolean;
  status: "COMPLETED" | "FAILED" | "PENDING";
  statusText?: string;
}

interface WalletTransactionsListProps {
  transactions: TransactionRowData[];
}

export const WalletTransactionsList: FC<WalletTransactionsListProps> = ({
  transactions,
}) => {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] border border-slate-200/90 dark:border-white/10 shadow-2xs overflow-hidden">
      {/* Table Header (4 columns) */}
      <div className="grid grid-cols-4 bg-white dark:bg-[#0B1E36] px-4 py-3 text-right text-xs font-bold text-text-muted dark:text-slate-400 border-b border-slate-100 dark:border-white/10">
        <span className="text-right">التاريخ</span>
        <span className="text-center">نوع العملية</span>
        <span className="text-center">التوكنز</span>
        <span className="text-center">الحالة</span>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-slate-100 dark:divide-white/5 text-xs">
        {transactions.map((tx) => {
          const isFailed = tx.status === "FAILED";
          const statusLabel =
            tx.statusText || (isFailed ? "فشلت" : "مكتمل");

          return (
            <div
              key={tx.id}
              className="grid grid-cols-4 items-center px-4 py-3.5 hover:bg-slate-50/70 dark:hover:bg-[#132F54] transition-colors"
            >
              {/* Date */}
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 text-right">
                {tx.date}
              </span>

              {/* Type */}
              <span className="text-xs font-black text-[#123A68] dark:text-white text-center truncate">
                {tx.type}
              </span>

              {/* Tokens */}
              <span
                className={`text-xs font-black text-center ${
                  tx.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-[#F36F21]"
                }`}
              >
                {tx.amount}
              </span>

              {/* Status Badge */}
              <div className="flex justify-center">
                <span
                  className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-[10.5px] font-bold border ${
                    isFailed
                      ? "bg-[#FFF1F2] dark:bg-red-950/40 text-[#E11D48] dark:text-red-400 border-[#FECDD3] dark:border-red-500/30"
                      : "bg-[#ECFDF5] dark:bg-emerald-950/40 text-[#059669] dark:text-emerald-300 border-[#A7F3D0] dark:border-emerald-500/30"
                  }`}
                >
                  {statusLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

