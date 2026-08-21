import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";
import { WalletBalanceHero } from "../../components/wallet/WalletBalanceHero";
import { WalletStatsSummary } from "../../components/wallet/WalletStatsSummary";
import { WalletTransactionsList } from "../../components/wallet/WalletTransactionsList";
import type { TransactionRowData } from "../../components/wallet/WalletTransactionsList";

export default function WalletPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { tokenBalance } = useWallet();

  const transactions: TransactionRowData[] = [
    {
      id: "tx-1",
      date: "23 يوليو 2024",
      type: "نشر طلب",
      amount: "-1",
      status: "COMPLETED",
      statusText: "مكتمل",
      statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "tx-2",
      date: "22 يوليو 2024",
      type: "شراء باقة 20 توكن",
      amount: "+20",
      status: "COMPLETED",
      statusText: "مكتمل",
      statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "tx-3",
      date: "20 يوليو 2024",
      type: "نشر طلب",
      amount: "-1",
      status: "COMPLETED",
      statusText: "مكتمل",
      statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "tx-4",
      date: "18 يوليو 2024",
      type: "نشر طلب",
      amount: "-1",
      status: "COMPLETED",
      statusText: "مكتمل",
      statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "tx-5",
      date: "15 يوليو 2024",
      type: "شراء باقة 50 توكن",
      amount: "+50",
      status: "COMPLETED",
      statusText: "مكتمل",
      statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "tx-6",
      date: "10 يوليو 2024",
      type: "نشر طلب",
      amount: "-1",
      status: "FAILED",
      statusText: "فشلت",
      statusClass: "bg-red-50 text-red-700 border-red-200",
    },
  ];

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-16 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title Header with Action Button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/wallet/topup-qr")}
            className="flex h-11 items-center justify-center gap-1.5 rounded-2xl bg-[#F36F21] px-4 text-xs font-black text-white shadow-md active:scale-98 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>شراء توكنز</span>
          </button>

          <h1 className="text-xl font-black text-[#123A68]">المحفظة</h1>
        </div>

        {/* Main Navy Balance Card */}
        <WalletBalanceHero
          tokenBalance={tokenBalance || 47}
          userName={profile?.fullName || "هديل محمد"}
        />

        {/* Two Mini Summary Cards */}
        <WalletStatsSummary totalPurchased={70} totalSpent={23} />

        {/* Transactions Table Section */}
        <WalletTransactionsList transactions={transactions} />
      </div>
    </MobileContainer>
  );
}
