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
        <h2 className="text-sm font-black text-[#123A68]">
          الرحلات المتاحة بالقرب منك
        </h2>
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
      ) : trips.length === 0 ? (
        <div className="rounded-3xl bg-white p-5 text-center border border-slate-100 shadow-2xs space-y-2">
          <Car className="h-7 w-7 text-slate-400 mx-auto" />
          <p className="text-xs font-bold text-text-secondary">
            لا توجد رحلات متاحة في منطقتك حالياً
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {trips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => onSelectTrip(trip.id)}
              className="flex items-center justify-between rounded-3xl bg-white p-3.5 border border-border shadow-2xs hover:border-slate-300 transition-all cursor-pointer text-right"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-black text-white ${trip.avatarBg}`}
                >
                  {trip.avatarInitials}
                </div>
                <div className="text-right">
                  <h3 className="text-xs font-black text-primary">
                    {trip.travelerName}
                  </h3>
                  <p className="text-[11px] text-text-muted">
                    {trip.from} ➔ {trip.to}
                  </p>
                </div>
              </div>

              <div className="text-left space-y-0.5">
                <span className="text-[11px] font-bold text-amber-500 block">
                  ⭐ {trip.rating}
                </span>
                <span className="text-[10px] text-text-muted">
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

