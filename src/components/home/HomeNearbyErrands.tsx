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
        <h2 className="text-sm font-black text-[#123A68] dark:text-white">الطلبات القريبة</h2>
        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center gap-1 text-xs font-black text-[#123A68] dark:text-[#38BDF8] hover:text-[#F36F21] dark:hover:text-[#F36F21] transition-colors cursor-pointer"
        >
          <span>عرض الكل</span>
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 rounded-3xl bg-slate-100 dark:bg-[#102A4C]/60 animate-pulse border border-transparent dark:border-white/5"
            />
          ))}
        </div>
      ) : errands.length === 0 ? (
        <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 text-center border border-slate-100 dark:border-white/10 shadow-2xs space-y-2">
          <Package className="h-7 w-7 text-slate-400 dark:text-slate-500 mx-auto" />
          <p className="text-xs font-bold text-text-secondary dark:text-slate-300">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {errands.map((e) => (
            <div
              key={e.id}
              onClick={() => onSelectErrand(e.id)}
              className="flex items-center justify-between rounded-3xl bg-white dark:bg-[#102A4C] p-3.5 border border-border dark:border-white/10 shadow-2xs hover:bg-slate-50 dark:hover:bg-[#132F54] hover:border-slate-300 dark:hover:border-white/20 transition-all cursor-pointer text-right"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${e.avatarBg} text-xs font-black text-white`}
                >
                  {e.avatarInitials}
                </div>
                <div className="text-right">
                  <h3 className="text-xs font-black text-primary dark:text-white line-clamp-1 max-w-50">
                    {e.title}
                  </h3>
                  <p className="text-[11px] text-text-muted dark:text-slate-300">
                    {e.dateLocation}
                  </p>
                </div>
              </div>

              <div className="text-left shrink-0">
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

