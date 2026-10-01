import type { FC } from "react";

interface ErrandFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusChange: (val: string) => void;
  zoneFilter: string;
  onZoneChange: (val: string) => void;
}

export const ErrandFilterBar: FC<ErrandFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  zoneFilter,
  onZoneChange,
}) => {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-4 border border-border dark:border-white/10 shadow-xs space-y-2.5">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="ابحث في الطلبات..."
        className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-4 text-xs text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-500 focus:border-accent focus:outline-none"
      />

      <div className="grid grid-cols-2 gap-2">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3 text-xs text-primary dark:text-white focus:border-accent focus:outline-none cursor-pointer"
        >
          <option value="ALL">كل الحالات</option>
          <option value="PENDING">قيد الانتظار</option>
          <option value="MATCHED">تم التطابق</option>
          <option value="COMPLETED">مكتمل</option>
          <option value="CANCELLED">ملغي</option>
        </select>

        <select
          value={zoneFilter}
          onChange={(e) => onZoneChange(e.target.value)}
          className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3 text-xs text-primary dark:text-white focus:border-accent focus:outline-none cursor-pointer"
        >
          <option value="ALL">كل المناطق</option>
          <option value="غزة">غزة</option>
          <option value="شمال غزة">شمال غزة</option>
          <option value="دير البلح">دير البلح</option>
          <option value="خان يونس">خان يونس</option>
          <option value="رفح">رفح</option>
        </select>
      </div>
    </div>
  );
};
