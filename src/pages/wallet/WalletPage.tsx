import { useNavigate } from "react-router-dom";
import { Plus, Zap } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useWallet, useWalletTransactions } from "../../hooks/useWallet";
import { useAuth } from "../../hooks/useAuth";
import type { WalletTransaction } from "../../types/wallet";

export default function WalletPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const {
    tokenBalance,
    isLoadingWallet,
    isErrorWallet,
    refetchWallet,
  } = useWallet();

  const { transactions } = useWalletTransactions();

  // Fallback demo data if backend transaction list is not yet populated
  const staticTransactions = [
    {
      id: "tx-1",
      date: "23 يوليو 2024",
      type: "نشر طلب",
      tokens: -1,
      status: "COMPLETED",
    },
    {
      id: "tx-2",
      date: "22 يوليو 2024",
      type: "شراء باقة 20 توكن",
      tokens: 20,
      status: "COMPLETED",
    },
    {
      id: "tx-3",
      date: "20 يوليو 2024",
      type: "نشر طلب",
      tokens: -1,
      status: "COMPLETED",
    },
    {
      id: "tx-4",
      date: "18 يوليو 2024",
      type: "نشر طلب",
      tokens: -1,
      status: "COMPLETED",
    },
    {
      id: "tx-5",
      date: "15 يوليو 2024",
      type: "شراء باقة 50 توكن",
      tokens: 50,
      status: "COMPLETED",
    },
    {
      id: "tx-6",
      date: "10 يوليو 2024",
      type: "نشر طلب",
      tokens: -1,
      status: "FAILED",
    },
  ];

  const currentBalance = tokenBalance ?? 47;

  // Format real or fallback transactions
  const displayTransactions =
    transactions && transactions.length > 0
      ? transactions.map((t: WalletTransaction) => ({
          id: t.id,
          date: new Date(t.createdAt).toLocaleDateString("ar-EG", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          type:
            t.transactionType === "TOKEN_TOP_UP" || t.transactionType === "SIGNUP_BONUS"
              ? "شراء باقة توكنز"
              : "نشر طلب",
          tokens: t.tokenAmount > 0 ? `+${t.tokenAmount}` : `${t.tokenAmount}`,
          status: "COMPLETED",
        }))
      : staticTransactions;

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title Header with "+ شراء توكنز" */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-[#123A68]">المحفظة</h1>

          <button
            type="button"
            onClick={() => navigate("/wallet/buy-tokens")}
            className="flex h-11 items-center justify-center gap-1.5 rounded-2xl bg-[#F36F21] px-4 text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#E05E12]"
          >
            <Plus className="h-4 w-4" />
            <span>شراء توكنز</span>
          </button>
        </div>

        {/* Current Balance Dark Navy Card */}
        <div className="relative overflow-hidden rounded-3xl bg-[#123A68] p-5 text-white shadow-md space-y-4">
          <div className="text-right">
            <span className="text-xs text-white/70 block">رصيدك الحالي</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-black text-white">
                {currentBalance}
              </span>
              <span className="text-lg font-black text-white/90">توكن</span>
            </div>
            <p className="text-[11px] text-white/60 mt-1">
              يكفي لنشر {currentBalance} طلب
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <div className="flex items-center gap-1.5 text-white/90">
              <Zap className="h-4 w-4 text-[#F36F21] fill-[#F36F21]" />
              <span className="font-bold">
                {profile?.fullName || "هديل محمد"}
              </span>
            </div>
          </div>
        </div>

        {/* 2 Total Stats Cards Side by Side */}
        <div className="grid grid-cols-2 gap-3">
          {/* Total Bought (Green tint) */}
          <div className="rounded-3xl bg-[#E6F9EE] p-4 border border-emerald-100 text-right space-y-1">
            <span className="text-[11px] font-bold text-emerald-800 block">
              إجمالي الشراء
            </span>
            <div className="text-2xl font-black text-emerald-700">
              70 <span className="text-xs font-bold">توكن</span>
            </div>
          </div>

          {/* Total Spent (Orange tint) */}
          <div className="rounded-3xl bg-[#FFF0E6] p-4 border border-orange-100 text-right space-y-1">
            <span className="text-[11px] font-bold text-[#E05E12] block">
              إجمالي الإنفاق
            </span>
            <div className="text-2xl font-black text-[#F36F21]">
              23 <span className="text-xs font-bold">توكن</span>
            </div>
          </div>
        </div>

        {/* Transactions Table Section */}
        <div className="space-y-2 pt-1">
          <h2 className="text-base font-black text-[#123A68]">سجل المعاملات</h2>

          {isLoadingWallet ? (
            <div className="h-48 w-full animate-pulse rounded-3xl bg-white border border-border" />
          ) : isErrorWallet ? (
            <ErrorState
              title="تعذر تحميل سجل المعاملات"
              message="حدث خطأ أثناء جلب العمليات."
              onRetry={() => refetchWallet()}
            />
          ) : displayTransactions.length === 0 ? (
            <EmptyState
              icon={<Zap className="h-7 w-7 text-[#123A68]" />}
              title="لا توجد معاملات سابقة"
              description="لم تقم بإجراء أي عمليات شحن أو استخدام توكنز بعد."
              actionText="شراء توكنز الآن"
              onAction={() => navigate("/wallet/buy-tokens")}
            />
          ) : (
            <div className="overflow-hidden rounded-3xl bg-white border border-border shadow-xs">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-[#F8FAFC] text-[11px] font-black text-text-muted">
                    <th className="py-3 px-3.5">التاريخ</th>
                    <th className="py-3 px-3.5">نوع العملية</th>
                    <th className="py-3 px-3.5 text-center">التوكنز</th>
                    <th className="py-3 px-3.5 text-left">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-3.5 font-bold text-text-secondary text-[11px]">
                        {t.date}
                      </td>
                      <td className="py-3.5 px-3.5 font-bold text-[#123A68]">
                        {t.type}
                      </td>
                      <td className="py-3.5 px-3.5 text-center font-black">
                        <span
                          className={
                            typeof t.tokens === "number" && t.tokens > 0
                              ? "text-emerald-600"
                              : String(t.tokens).startsWith("+")
                              ? "text-emerald-600"
                              : "text-[#F36F21]"
                          }
                        >
                          {t.tokens}
                        </span>
                      </td>
                      <td className="py-3.5 px-3.5 text-left">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                            t.status === "COMPLETED"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          {t.status === "COMPLETED" ? "مكتمل" : "فشلت"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MobileContainer>
  );
}
