import type { FC } from "react";
import { Package } from "lucide-react";
import { EmptyState } from "../ui/feedback/EmptyState";

interface ErrandItem {
  id: string;
  title: string;
  neighborhood: string;
  date: string;
  status: string;
  statusText: string;
  statusBg: string;
  avatarInitials: string;
  avatarBg: string;
}

interface HomeNearbyErrandsProps {
  errands: ErrandItem[];
  onViewAll: () => void;
  onSelectErrand: (id: string) => void;
}

export const HomeNearbyErrands: FC<HomeNearbyErrandsProps> = ({
  errands,
  onViewAll,
  onSelectErrand,
}) => {
  return (
    <div className="space-y-3 pt-1 text-right">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-[#123A68]">الطلبات القريبة</h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-accent hover:underline cursor-pointer"
        >
          عرض الكل ({errands.length})
        </button>
      </div>

      {errands.length === 0 ? (
        <EmptyState
          icon={<Package className="h-7 w-7 text-[#123A68]" />}
          title="لا توجد طلبات قريبة حالياً"
          description="لم يتم العثور على أي طلبات نشطة بالقرب منك في الوقت الحالي."
        />
      ) : (
        <div className="space-y-2.5">
          {errands.map((errand) => (
            <div
              key={errand.id}
              onClick={() => onSelectErrand(errand.id)}
              className="flex items-center justify-between rounded-3xl bg-white p-3.5 border border-border shadow-xs hover:border-primary/40 transition-all cursor-pointer text-right"
            >
              {/* Errand Title & Details on right */}
              <div className="flex items-center gap-2.5 text-right">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${errand.avatarBg}`}
                >
                  {errand.avatarInitials}
                </div>
                <div className="text-right">
                  <h4 className="text-xs font-black text-primary line-clamp-1 max-w-[190px]">
                    {errand.title}
                  </h4>
                  <div className="flex items-center justify-start gap-2 text-[10.5px] text-text-muted mt-0.5">
                    <span>{errand.date}</span>
                    <span>•</span>
                    <span>{errand.neighborhood}</span>
                  </div>
                </div>
              </div>

              {/* Status Pill on left */}
              <div>
                <span
                  className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold border ${errand.statusBg}`}
                >
                  {errand.statusText}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
