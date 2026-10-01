import type { FC } from "react";

export type TripRequestFilterTab = "ALL" | "PENDING" | "ACCEPTED" | "REJECTED";

interface TripOwnerRequestsFilterProps {
  activeTab: TripRequestFilterTab;
  onTabChange: (tab: TripRequestFilterTab) => void;
  totalCount: number;
  pendingCount: number;
  acceptedCount: number;
  rejectedCount: number;
}

export const TripOwnerRequestsFilter: FC<TripOwnerRequestsFilterProps> = ({
  activeTab,
  onTabChange,
  totalCount,
  pendingCount,
  acceptedCount,
  rejectedCount,
}) => {
  const tabs: { key: TripRequestFilterTab; label: string }[] = [
    { key: "ALL", label: `الكل (${totalCount})` },
    { key: "PENDING", label: `بانتظار (${pendingCount})` },
    { key: "ACCEPTED", label: `مقبول (${acceptedCount})` },
    { key: "REJECTED", label: `مرفوض (${rejectedCount})` },
  ];

  return (
    <div className="flex items-center gap-2 text-xs font-bold overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
          className={`rounded-2xl px-3.5 py-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === tab.key
              ? "bg-[#123A68] dark:bg-[#1E4E8C] text-white shadow-xs font-black"
              : "bg-white dark:bg-[#102A4C] border border-slate-200 dark:border-white/10 text-text-secondary dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#132F54]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
