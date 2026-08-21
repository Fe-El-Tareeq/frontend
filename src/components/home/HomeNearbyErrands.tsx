import type { FC } from "react";

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
    <div className="space-y-3 pt-1">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-accent hover:underline"
        >
          عرض الكل ({errands.length})
        </button>
        <h3 className="text-sm font-black text-[#123A68]">الطلبات القريبة</h3>
      </div>

      <div className="space-y-2.5">
        {errands.map((errand) => (
          <div
            key={errand.id}
            onClick={() => onSelectErrand(errand.id)}
            className="flex items-center justify-between rounded-3xl bg-white p-3.5 border border-border shadow-xs hover:border-primary/40 transition-all cursor-pointer"
          >
            {/* Status Pill on left */}
            <div>
              <span
                className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold border ${errand.statusBg}`}
              >
                {errand.statusText}
              </span>
            </div>

            {/* Errand Title & Details on right */}
            <div className="flex items-center gap-2.5 text-right">
              <div>
                <h4 className="text-xs font-black text-primary line-clamp-1 max-w-[190px]">
                  {errand.title}
                </h4>
                <div className="flex items-center justify-end gap-2 text-[10.5px] text-text-muted mt-0.5">
                  <span>{errand.date}</span>
                  <span>•</span>
                  <span>{errand.neighborhood}</span>
                </div>
              </div>

              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${errand.avatarBg}`}
              >
                {errand.avatarInitials}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
