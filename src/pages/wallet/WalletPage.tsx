import { useNavigate } from "react-router-dom";
import { Plus, Wallet } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useAuth } from "../../hooks/useAuth";
import { useWallet, useWalletTransactions } from "../../hooks/useWallet";
import { WalletBalanceHero } from "../../components/wallet/WalletBalanceHero";
import { WalletStatsSummary } from "../../components/wallet/WalletStatsSummary";
import { WalletTransactionsList } from "../../components/wallet/WalletTransactionsList";
import type { TransactionRowData } from "../../components/wallet/WalletTransactionsList";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import type { WalletTransaction } from "../../types";

export default function WalletPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const {
    tokenBalance,
    isLoadingWallet,
    isErrorWallet,
    refetchWallet,
  } = useWallet();

  /*
   * ============================================================================
   * BACKEND INTEGRATION: Wallet Balance & Transactions History
   * Endpoints:
   * - GET /api/v1/wallet
   * - GET /api/v1/wallet/transactions
   * Handles: Loading, Error (ErrorState with retry), Empty (EmptyState).
   * ============================================================================
   */
  const {
    transactions: backendTransactions,
    isLoadingTransactions,
    isErrorTransactions,
    refetchTransactions,
  } = useWalletTransactions();

  // Map Backend transactions directly from API
  const displayTransactions: TransactionRowData[] = (backendTransactions || []).map(
    (tx: WalletTransaction) => ({
      id: tx.id,
      date: new Date(tx.createdAt).toLocaleDateString("ar-EG", {
        month: "short",
        day: "numeric",
      }),
      type:
        tx.transactionType === "TOKEN_TOP_UP" ||
        tx.transactionType === "SIGNUP_BONUS"
          ? "شراء باقة توكنز"
          : "نشر طلب",
      amount:
        tx.tokenAmount > 0
          ? `+${tx.tokenAmount}`
          : `${tx.tokenAmount}`,
      status: "COMPLETED",
      statusText: "مكتمل",
      statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    })
  );

  // Compute live totals from real transactions
  const totalPurchased = (backendTransactions || [])
    .filter((tx) => tx.tokenAmount > 0)
    .reduce((acc, tx) => acc + tx.tokenAmount, 0);

  const totalSpent = (backendTransactions || [])
    .filter((tx) => tx.tokenAmount < 0)
    .reduce((acc, tx) => acc + Math.abs(tx.tokenAmount), 0);

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-16 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title Header with Action Button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/wallet/topup-qr")}
            className="flex h-11 items-center justify-center gap-1.5 rounded-2xl bg-[#F36F21] px-4 text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>شراء توكنز</span>
          </button>

          <h1 className="text-xl font-black text-[#123A68]">المحفظة</h1>
        </div>

        {/* Main Navy Balance Card */}
        <WalletBalanceHero
          tokenBalance={tokenBalance ?? 0}
          userName={profile?.fullName || "المستخدم"}
        />

        {/* Two Mini Summary Cards with Live Totals */}
        <WalletStatsSummary
          totalPurchased={totalPurchased}
          totalSpent={totalSpent}
        />

        {/* Transactions Table Section */}
        {isLoadingWallet || isLoadingTransactions ? (
          <div className="h-48 w-full animate-pulse rounded-3xl bg-white border border-border" />
        ) : isErrorWallet || isErrorTransactions ? (
          /* Error State with Retry */
          <ErrorState
            title="تعذر تحميل بيانات المحفظة"
            message="حدث خطأ أثناء جلب سجل المعاملات، يرجى المحاولة مرة أخرى."
            onRetry={() => {
              refetchWallet();
              refetchTransactions();
            }}
          />
        ) : displayTransactions.length === 0 ? (
          /* Structured Empty State from Design System */
          <EmptyState
            icon={<Wallet className="h-7 w-7 text-[#123A68]" />}
            title="لا توجد معاملات سابقة"
            description="لم تقم بإجراء أي عمليات شحن أو استهلاك للتوكنز حتى الآن. رصيدك الحالي متاح للاستخدام فوراً."
            actionText="شراء توكنز الآن"
            onAction={() => navigate("/wallet/topup-qr")}
          />
        ) : (
          <WalletTransactionsList transactions={displayTransactions} />
        )}
      </div>
    </MobileContainer>
  );
}
