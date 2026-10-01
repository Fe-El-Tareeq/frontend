import type { FC } from "react";
import { Package, ArrowLeft, Plus } from "lucide-react";

export interface HomeErrandItem {
  id: string;
  title: string;
  avatarInitials: string;
  avatarBg: string;
  status: string;
  statusBadge: string;
  dateLocation: string;
}

interface HomeNearbyErrandsProps {
  errands: HomeErrandItem[];
  isLoading?: boolean;
  onViewAll: () => void;
  onSelectErrand: (id: string) => void;
  onCreateErrand?: () => void;
}

export const HomeNearbyErrands: FC<HomeNearbyErrandsProps> = ({
  errands,
  isLoading = false,
  onViewAll,
  onSelectErrand,
  onCreateErrand,
}) => {
  return (
    <div className="space-y-2.5 pt-2 text-right">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black text-[#123A68]">الطلبات القريبة</h2>
        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center gap-1 text-xs font-black text-[#123A68] hover:text-[#F36F21] transition-colors cursor-pointer"
        >
          <span>عرض الكل</span>
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-2.5">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-16 rounded-3xl bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      ) : errands.length === 0 ? (
        <div className="rounded-3xl bg-white p-5 text-center border border-slate-100 shadow-2xs space-y-2">
          <Package className="h-7 w-7 text-slate-400 mx-auto" />
          <p className="text-xs font-bold text-text-secondary">
            لا توجد طلبات توصيل مسجلة حالياً
          </p>
          {onCreateErrand && (
            <button
              type="button"
              onClick={onCreateErrand}
              className="inline-flex items-center gap-1 text-xs font-black text-[#F36F21] hover:underline cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>أنشئ طلب توصيل جديد</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2.5">
          {errands.map((e) => (
            <div
              key={e.id}
              onClick={() => onSelectErrand(e.id)}
              className="flex items-center justify-between rounded-3xl bg-white p-3.5 border border-border shadow-2xs hover:border-slate-300 transition-all cursor-pointer text-right"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${e.avatarBg} text-xs font-black text-white`}
                >
                  {e.avatarInitials}
                </div>
                <div className="text-right">
                  <h3 className="text-xs font-black text-primary line-clamp-1 max-w-50">
                    {e.title}
                  </h3>
                  <p className="text-[11px] text-text-muted">
                    {e.dateLocation}
                  </p>
                </div>
              </div>

              <div className="text-left">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold border ${e.statusBadge}`}
                >
                  {e.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

