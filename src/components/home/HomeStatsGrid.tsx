import type { FC } from "react";
import { Zap, Car, Package, MessageSquare } from "lucide-react";

interface HomeStatsGridProps {
  tokenBalance?: number;
  activeTripsCount?: number;
  myErrandsCount?: number;
  newMessagesCount?: number;
  onNavigateWallet: () => void;
  onNavigateTrips: () => void;
  onNavigateErrands: () => void;
  onNavigateMessages: () => void;
}

export const HomeStatsGrid: FC<HomeStatsGridProps> = ({
  tokenBalance = 0,
  activeTripsCount = 0,
  myErrandsCount = 0,
  newMessagesCount = 0,
  onNavigateWallet,
  onNavigateTrips,
  onNavigateErrands,
  onNavigateMessages,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {/* 1. Token Balance */}
      <div
        onClick={onNavigateWallet}
        className="rounded-3xl bg-white dark:bg-[#102A4C] p-3.5 border border-border dark:border-white/10 shadow-xs hover:border-accent/40 dark:hover:border-accent/50 transition-colors cursor-pointer text-right space-y-1"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-text-secondary dark:text-slate-400">
            رصيد التوكنز
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/40 text-accent">
            <Zap className="h-4 w-4 fill-accent" />
          </div>
        </div>
        <div className="text-xl font-black text-accent">{tokenBalance}</div>
      </div>

      {/* 2. Active Trips */}
      <div
        onClick={onNavigateTrips}
        className="rounded-3xl bg-white dark:bg-[#102A4C] p-3.5 border border-border dark:border-white/10 shadow-xs hover:border-primary/40 dark:hover:border-blue-400/40 transition-colors cursor-pointer text-right space-y-1"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-text-secondary dark:text-slate-400">
            الرحلات النشطة
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-primary dark:text-blue-300">
            <Car className="h-4 w-4" />
          </div>
        </div>
        <div className="text-xl font-black text-primary dark:text-white">
          {activeTripsCount}
        </div>
      </div>

      {/* 3. My Errands */}
      <div
        onClick={onNavigateErrands}
        className="rounded-3xl bg-white dark:bg-[#102A4C] p-3.5 border border-border dark:border-white/10 shadow-xs hover:border-emerald-400/40 transition-colors cursor-pointer text-right space-y-1"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-text-secondary dark:text-slate-400">
            طلباتي الحالية
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
            <Package className="h-4 w-4" />
          </div>
        </div>
        <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
          {myErrandsCount}
        </div>
      </div>

      {/* 4. New Messages */}
      <div
        onClick={onNavigateMessages}
        className="rounded-3xl bg-white dark:bg-[#102A4C] p-3.5 border border-border dark:border-white/10 shadow-xs hover:border-purple-400/40 transition-colors cursor-pointer text-right space-y-1"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-text-secondary dark:text-slate-400">
            الرسائل الجديدة
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
            <MessageSquare className="h-4 w-4" />
          </div>
        </div>
        <div className="text-xl font-black text-purple-600 dark:text-purple-400">
          {newMessagesCount}
        </div>
      </div>
    </div>
  );
};
