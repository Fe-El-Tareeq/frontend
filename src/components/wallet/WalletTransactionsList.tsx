import type { FC } from "react";

export interface TransactionRowData {
  id: string;
  date: string;
  type: string;
  amount: string;
  status: string;
  statusText: string;
  statusClass: string;
}

interface WalletTransactionsListProps {
  transactions: TransactionRowData[];
}

export const WalletTransactionsList: FC<WalletTransactionsListProps> = ({
  transactions,
}) => {
  return (
    <div className="space-y-2.5 pt-2">
      <h2 className="text-sm font-black text-[#123A68]">سجل المعاملات</h2>

      <div className="rounded-3xl bg-white border border-border shadow-xs overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-4 bg-[#F8FAFC] p-3 text-center text-[10.5px] font-black text-text-muted border-b border-slate-100">
          <span>التاريخ</span>
          <span>نوع العملية</span>
          <span>التوكنز</span>
          <span>الحالة</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100 text-xs">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="grid grid-cols-4 items-center p-3 text-center"
            >
              <span className="text-[10px] text-text-muted">{tx.date}</span>
              <span className="font-bold text-primary">{tx.type}</span>
              <span
                className={`font-black ${
                  tx.amount.startsWith("+")
                    ? "text-emerald-600"
                    : "text-[#F36F21]"
                }`}
              >
                {tx.amount}
              </span>
              <div>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold border ${tx.statusClass}`}
                >
                  {tx.statusText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
