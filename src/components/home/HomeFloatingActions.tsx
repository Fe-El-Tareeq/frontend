import type { FC } from "react";
import { Plus, Car } from "lucide-react";

interface HomeFloatingActionsProps {
  onCreateErrand: () => void;
  onCreateTrip: () => void;
}

export const HomeFloatingActions: FC<HomeFloatingActionsProps> = ({
  onCreateErrand,
  onCreateTrip,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:right-72 z-30 mx-auto w-full max-w-107.5 md:max-w-md lg:max-w-lg bg-white/95 dark:bg-[#102A4C]/95 backdrop-blur-md border-t md:border border-border dark:border-white/10 p-3.5 shadow-xl md:rounded-3xl md:bottom-4 lg:bottom-6 transition-all">
      <div className="flex items-center gap-3">
        {/* Create errand (Orange) */}
        <button
          type="button"
          onClick={onCreateErrand}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all hover:bg-[#E05E12] cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>إنشاء طلب جديد</span>
        </button>

        {/* Add trip (Navy) */}
        <button
          type="button"
          onClick={onCreateTrip}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#123A68] dark:bg-[#1E4E8C] text-xs font-black text-white hover:bg-[#0D2C50] dark:hover:bg-[#123A68] shadow-md active:scale-98 transition-all cursor-pointer"
        >
          <Car className="h-4 w-4" />
          <span>إضافة رحلة</span>
        </button>
      </div>
    </div>
  );
};
