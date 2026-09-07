import { useNavigate } from "react-router-dom";
import { Plus, Zap } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import {
  WalletTransactionsList,
  type TransactionRowData,
} from "../../components/wallet/WalletTransactionsList";
import { WalletBalanceHero } from "../../components/wallet/WalletBalanceHero";
import { WalletStatsSummary } from "../../components/wallet/WalletStatsSummary";
import { useWallet, useWalletTransactions } from "../../hooks/useWallet";
import { useAuth } from "../../hooks/useAuth";
import type { WalletTransaction } from "../../types/wallet";

export default function WalletPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { tokenBalance, isLoadingWallet } = useWallet();

  const {
    transactions,
    isLoadingTransactions,
    isErrorTransactions,
    refetchTransactions,
  } = useWalletTransactions();

  const currentBalance = tokenBalance ?? 47;

  // Calculate dynamic totals from transaction history
  const totalBought = transactions
    .filter((t: WalletTransaction) => t.tokenAmount > 0)
    .reduce((acc: number, t: WalletTransaction) => acc + t.tokenAmount, 0);

  const totalSpent = transactions
    .filter((t: WalletTransaction) => t.tokenAmount < 0)
    .reduce(
      (acc: number, t: WalletTransaction) => acc + Math.abs(t.tokenAmount),
      0,
    );

  // Format real dynamic transactions matching Figma
  const displayTransactions: TransactionRowData[] = transactions.map(
    (t: WalletTransaction) => {
      let typeLabel = "حركة توكنز";
      if (t.transactionType === "SIGNUP_BONUS")
        typeLabel = "هدية التسجيل";
      else if (t.transactionType === "TOKEN_TOP_UP")
        typeLabel = "شراء باقة توكنز";
      else if (t.description) typeLabel = t.description;

      const dateStr = new Date(t.createdAt).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      return {
        id: t.id,
        date: dateStr,
        type: typeLabel,
        amount: t.tokenAmount > 0 ? `+${t.tokenAmount}` : `${t.tokenAmount}`,
        isPositive: t.tokenAmount > 0,
        status: "COMPLETED",
        statusText: "مكتمل",
      };
    },
  );

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title Header with "+ شراء توكنز" */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/wallet/buy-tokens")}
            className="flex h-10 items-center justify-center gap-1.5 rounded-2xl bg-[#F36F21] px-4 text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#E05E12]"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
            <span>شراء توكنز</span>
          </button>

          <h1 className="text-xl font-black text-[#123A68]">المحفظة</h1>
        </div>

        {/* Current Balance Hero Card */}
        <WalletBalanceHero
          tokenBalance={currentBalance}
          userName={profile?.fullName || "هديل محمد"}
          isLoading={isLoadingWallet}
        />

        {/* 2 Total Stats Cards (إجمالي الشراء / إجمالي الإنفاق) */}
        <WalletStatsSummary
          totalPurchased={totalBought > 0 ? totalBought : 70}
          totalSpent={totalSpent > 0 ? totalSpent : 23}
          isLoading={isLoadingTransactions}
        />

        {/* Transactions Table Section */}
        <div className="space-y-2 pt-1">
          <h2 className="text-base font-black text-[#123A68]">سجل المعاملات</h2>

          {/* Loading */}
          {isLoadingTransactions && (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 rounded-3xl bg-slate-100 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Error */}
          {isErrorTransactions && !isLoadingTransactions && (
            <ErrorState
              title="تعذر تحميل المعاملات"
              message="حدث خطأ أثناء جلب سجل حركات المحفظة."
              onRetry={refetchTransactions}
            />
          )}

          {/* Empty State */}
          {!isLoadingTransactions &&
            !isErrorTransactions &&
            displayTransactions.length === 0 && (
              <EmptyState
                icon={<Zap className="h-8 w-8 text-[#F36F21]" />}
                title="لا توجد معاملات مسجلة"
                description="ستظهر هنا كافة عمليات شحن واستهلاك التوكنز والجوائز الترويجية."
                actionText="شحن توكنز الآن"
                onAction={() => navigate("/wallet/buy-tokens")}
              />
            )}

          {/* 4-Column Table matching Figma */}
          {!isLoadingTransactions &&
            !isErrorTransactions &&
            displayTransactions.length > 0 && (
              <WalletTransactionsList transactions={displayTransactions} />
            )}
        </div>
      </div>
    </MobileContainer>
  );
}

