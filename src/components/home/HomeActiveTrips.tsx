import type { FC } from "react";
import { Star, ArrowLeft } from "lucide-react";

interface TripItem {
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
  trips: TripItem[];
  onViewAll: () => void;
  onSelectTrip: (id: string) => void;
}

export const HomeActiveTrips: FC<HomeActiveTripsProps> = ({
  trips,
  onViewAll,
  onSelectTrip,
}) => {
  return (
    <div className="space-y-3 pt-1 text-right">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-[#123A68]">
          الرحلات المتاحة بالقرب منك
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-accent hover:underline cursor-pointer"
        >
          عرض الكل ({trips.length})
        </button>
      </div>

      <div className="space-y-2.5">
        {trips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => onSelectTrip(trip.id)}
            className="rounded-3xl bg-white p-3.5 border border-border shadow-xs hover:border-primary/40 transition-all cursor-pointer space-y-2.5 text-right"
          >
            {/* Top row: Avatar + Name on RIGHT (1st child in RTL), Rating on LEFT (2nd child in RTL) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-black text-white ${trip.avatarBg}`}
                >
                  {trip.avatarInitials}
                </div>
                <span className="text-xs font-bold text-primary">
                  {trip.travelerName}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-black text-primary">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span>{trip.rating}</span>
              </div>
            </div>

            {/* Route row: From on the RIGHT, arrow in middle, To on the LEFT */}
            <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFC] p-2.5 text-xs font-bold">
              <span className="text-primary">{trip.from}</span>
              <ArrowLeft className="h-3.5 w-3.5 text-accent" />
              <span className="text-primary">{trip.to}</span>
            </div>

            {/* Bottom time */}
            <div className="flex items-center justify-between text-[11px] text-text-muted">
              <span>{trip.time}</span>
              <span>المغادرة اليوم</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
