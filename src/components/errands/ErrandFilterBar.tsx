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
    <div className="rounded-3xl bg-white p-4 border border-border shadow-xs space-y-2.5">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="ابحث في الطلبات..."
        className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
      />

      <div className="grid grid-cols-2 gap-2">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3 text-xs text-primary focus:border-accent focus:outline-none"
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
          className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3 text-xs text-primary focus:border-accent focus:outline-none"
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
