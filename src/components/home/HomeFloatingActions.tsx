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
    <div className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-[430px] bg-white/95 backdrop-blur-md border-t border-border p-3.5 shadow-lg">
      <div className="flex items-center gap-3">
        {/* Create errand (Orange) */}
        <button
          type="button"
          onClick={onCreateErrand}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>إنشاء طلب جديد</span>
        </button>

        {/* Add trip (Navy) */}
        <button
          type="button"
          onClick={onCreateTrip}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] shadow-md active:scale-98 transition-all"
        >
          <Car className="h-4 w-4" />
          <span>إضافة رحلة</span>
        </button>
      </div>
    </div>
  );
};
