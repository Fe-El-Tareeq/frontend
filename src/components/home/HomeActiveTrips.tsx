import type { FC } from "react";
import { ArrowLeft, Car } from "lucide-react";

export interface HomeTripItem {
  id: string;
  travelerName: string;
  avatarInitials: string;
  avatarBg: string;
  from: string;
  to: string;
  rating: number;
  time: string;
}

interface HomeActiveTripsProps {
  trips: HomeTripItem[];
  isLoading?: boolean;
  onViewAll: () => void;
  onSelectTrip: (id: string) => void;
}

export const HomeActiveTrips: FC<HomeActiveTripsProps> = ({
  trips,
  isLoading = false,
  onViewAll,
  onSelectTrip,
}) => {
  return (
    <div className="space-y-2.5 pt-2 text-right">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black text-[#123A68] dark:text-white">
          الرحلات المتاحة بالقرب منك
        </h2>
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
      ) : trips.length === 0 ? (
        <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 text-center border border-slate-100 dark:border-white/10 shadow-2xs space-y-2">
          <Car className="h-7 w-7 text-slate-400 dark:text-slate-500 mx-auto" />
          <p className="text-xs font-bold text-text-secondary dark:text-slate-300">
            لا توجد رحلات متاحة في منطقتك حالياً
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {trips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => onSelectTrip(trip.id)}
              className="flex items-center justify-between rounded-3xl bg-white dark:bg-[#102A4C] p-3.5 border border-border dark:border-white/10 shadow-2xs hover:bg-slate-50 dark:hover:bg-[#132F54] hover:border-slate-300 dark:hover:border-white/20 transition-all cursor-pointer text-right"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${trip.avatarBg}`}
                >
                  {trip.avatarInitials}
                </div>
                <div className="text-right">
                  <h3 className="text-xs font-black text-primary dark:text-white">
                    {trip.travelerName}
                  </h3>
                  <p className="text-[11px] text-text-muted dark:text-slate-300">
                    {trip.from} ➔ {trip.to}
                  </p>
                </div>
              </div>

              <div className="text-left space-y-0.5 shrink-0">
                <span className="text-[11px] font-bold text-amber-500 dark:text-amber-400 block">
                  ⭐ {trip.rating}
                </span>
                <span className="text-[10px] text-text-muted dark:text-slate-400">
                  {trip.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

