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
    <div className="rounded-3xl bg-white p-4 border border-border shadow-xs space-y-2.5">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="ابحث عن وجهة أو مسافر..."
        className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
      />

      <select
        value={cityFilter}
        onChange={(e) => onCityChange(e.target.value)}
        className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary focus:border-accent focus:outline-none"
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
        className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary focus:border-accent focus:outline-none"
      >
        <option value="NEWEST">الترتيب: الأحدث</option>
        <option value="RATING">الترتيب: الأعلى تقييماً</option>
      </select>
    </div>
  );
};
