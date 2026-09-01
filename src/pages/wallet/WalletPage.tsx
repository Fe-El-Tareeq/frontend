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
  const { tokenBalance, isLoadingWallet } = useWallet();

  const {
    transactions,
    isLoadingTransactions,
    isErrorTransactions,
    refetchTransactions,
  } = useWalletTransactions();

  const currentBalance = tokenBalance ?? 0;

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

  // Format real dynamic transactions
  const displayTransactions = transactions.map((t: WalletTransaction) => {
    let typeLabel = "حركة توكنز";
    if (t.transactionType === "SIGNUP_BONUS")
      typeLabel = "هدية التسجيل الترحيبية";
    else if (t.transactionType === "TOKEN_TOP_UP")
      typeLabel = "شراء باقة توكنز";
    else if (t.description) typeLabel = t.description;

    return {
      id: t.id,
      date: new Date(t.createdAt).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      type: typeLabel,
      tokens: t.tokenAmount > 0 ? `+${t.tokenAmount}` : `${t.tokenAmount}`,
      isPositive: t.tokenAmount > 0,
      status: "COMPLETED",
    };
  });

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
                {isLoadingWallet ? "..." : currentBalance}
              </span>
              <span className="text-lg font-black text-white/90">توكن</span>
            </div>
            <p className="text-[11px] text-white/60 mt-1">
              يكفي لنشر أو قبول {currentBalance} طلب
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <div className="flex items-center gap-1.5 text-white/90">
              <Zap className="h-4 w-4 text-[#F36F21] fill-[#F36F21]" />
              <span className="font-bold">
                {profile?.fullName || "المستخدم"}
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
              {isLoadingTransactions ? "..." : totalBought}{" "}
              <span className="text-xs font-bold">توكن</span>
            </div>
          </div>

          {/* Total Spent (Orange tint) */}
          <div className="rounded-3xl bg-[#FFF0E6] p-4 border border-orange-100 text-right space-y-1">
            <span className="text-[11px] font-bold text-[#E05E12] block">
              إجمالي الإنفاق
            </span>
            <div className="text-2xl font-black text-[#F36F21]">
              {isLoadingTransactions ? "..." : totalSpent}{" "}
              <span className="text-xs font-bold">توكن</span>
            </div>
          </div>
        </div>

        {/* Transactions Table Section */}
        <div className="space-y-2 pt-1">
          <h2 className="text-base font-black text-[#123A68]">سجل المعاملات</h2>

          {/* Loading */}
          {isLoadingTransactions && (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 rounded-2xl bg-slate-100 animate-pulse"
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

          {/* Empty */}
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

          {/* Transactions List */}
          {!isLoadingTransactions &&
            !isErrorTransactions &&
            displayTransactions.length > 0 && (
              <div className="rounded-3xl bg-white p-2 border border-slate-200/90 shadow-2xs divide-y divide-slate-100">
                {displayTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="text-right space-y-0.5">
                      <span className="text-xs font-black text-[#123A68] block">
                        {tx.type}
                      </span>
                      <span className="text-[10.5px] text-text-muted">
                        {tx.date}
                      </span>
                    </div>

                    <div
                      className={`text-sm font-black ${
                        tx.isPositive ? "text-emerald-600" : "text-[#F36F21]"
                      }`}
                    >
                      {tx.tokens} توكن
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </MobileContainer>
  );
}
