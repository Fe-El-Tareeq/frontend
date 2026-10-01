import type { FC } from "react";

interface TripFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  cityFilter: string;
  onCityChange: (val: string) => void;
  sortOrder: string;
  onSortChange: (val: string) => void;
}

export const TripFilterBar: FC<TripFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  cityFilter,
  onCityChange,
  sortOrder,
  onSortChange,
}) => {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-4 border border-border dark:border-white/10 shadow-xs space-y-2.5">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="ابحث عن وجهة أو مسافر..."
        className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-4 text-xs text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-500 focus:border-accent focus:outline-none"
      />

      <select
        value={cityFilter}
        onChange={(e) => onCityChange(e.target.value)}
        className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3.5 text-xs text-primary dark:text-white focus:border-accent focus:outline-none cursor-pointer"
      >
        <option value="ALL">كل المدن</option>
        <option value="غزة">غزة</option>
        <option value="شمال غزة">شمال غزة</option>
        <option value="دير البلح">دير البلح</option>
        <option value="خان يونس">خان يونس</option>
        <option value="رفح">رفح</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3.5 text-xs text-primary dark:text-white focus:border-accent focus:outline-none cursor-pointer"
      >
        <option value="NEWEST">الترتيب: الأحدث</option>
        <option value="RATING">الترتيب: الأعلى تقييماً</option>
      </select>
    </div>
  );
};
