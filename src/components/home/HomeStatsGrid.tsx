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
  tokenBalance = 47,
  activeTripsCount = 3,
  myErrandsCount = 2,
  newMessagesCount = 0,
  onNavigateWallet,
  onNavigateTrips,
  onNavigateErrands,
  onNavigateMessages,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {/* 1. Token Balance */}
      <div
        onClick={onNavigateWallet}
        className="rounded-3xl bg-white p-3.5 border border-border shadow-xs hover:border-accent/40 transition-colors cursor-pointer text-right space-y-1"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-text-secondary">
            رصيد التوكنز
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-orange-50 text-accent">
            <Zap className="h-4 w-4 fill-accent" />
          </div>
        </div>
        <div className="text-xl font-black text-accent">{tokenBalance}</div>
      </div>

      {/* 2. Active Trips */}
      <div
        onClick={onNavigateTrips}
        className="rounded-3xl bg-white p-3.5 border border-border shadow-xs hover:border-primary/40 transition-colors cursor-pointer text-right space-y-1"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-text-secondary">
            الرحلات النشطة
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-50 text-primary">
            <Car className="h-4 w-4" />
          </div>
        </div>
        <div className="text-xl font-black text-primary">{activeTripsCount}</div>
      </div>

      {/* 3. My Errands */}
      <div
        onClick={onNavigateErrands}
        className="rounded-3xl bg-white p-3.5 border border-border shadow-xs hover:border-emerald-400/40 transition-colors cursor-pointer text-right space-y-1"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-text-secondary">
            طلباتي الحالية
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Package className="h-4 w-4" />
          </div>
        </div>
        <div className="text-xl font-black text-emerald-600">
          {myErrandsCount}
        </div>
      </div>

      {/* 4. New Messages */}
      <div
        onClick={onNavigateMessages}
        className="rounded-3xl bg-white p-3.5 border border-border shadow-xs hover:border-purple-400/40 transition-colors cursor-pointer text-right space-y-1"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-text-secondary">
            الرسائل الجديدة
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <MessageSquare className="h-4 w-4" />
          </div>
        </div>
        <div className="text-xl font-black text-purple-600">
          {newMessagesCount}
        </div>
      </div>
    </div>
  );
};
