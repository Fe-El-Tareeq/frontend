import type { FC } from "react";
import { Star, Calendar, Clock } from "lucide-react";

export interface TripCardData {
  id: string;
  travelerName: string;
  avatarInitials: string;
  avatarBg: string;
  capacityText: string;
  rating: number;
  origin: string;
  destination: string;
  date: string;
  time: string;
  notes: string | null;
}

interface TripCardProps {
  trip: TripCardData;
  onViewDetails: (id: string) => void;
}

export const TripCard: FC<TripCardProps> = ({ trip, onViewDetails }) => {
  return (
    <div className="rounded-3xl bg-white p-4.5 border border-border shadow-xs space-y-3.5 text-right">
      {/* Top Row: Traveler on RIGHT (1st child in RTL), Rating on LEFT (2nd child in RTL) */}
      <div className="flex items-center justify-between">
        {/* Right side in RTL: Avatar + Name */}
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-black text-white ${trip.avatarBg}`}
          >
            {trip.avatarInitials}
          </div>

          <div className="text-right">
            <h3 className="text-sm font-black text-[#123A68]">
              {trip.travelerName}
            </h3>
            <span className="text-[11px] text-text-muted">
              {trip.capacityText}
            </span>
          </div>
        </div>

        {/* Left side in RTL: Rating */}
        <div className="flex items-center gap-1 text-xs font-black text-primary">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span>{trip.rating}</span>
        </div>
      </div>

      {/* Route Timeline Container */}
      <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200 text-right">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-primary">
            <div className="h-2.5 w-2.5 rounded-full bg-[#123A68]" />
            <span>{trip.origin}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#F36F21]">
            <div className="h-2.5 w-2.5 rounded-full bg-[#F36F21]" />
            <span>{trip.destination}</span>
          </div>
        </div>
      </div>

      {/* Date & Time */}
      <div className="flex items-center gap-4 text-[11px] text-text-secondary">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-text-muted" />
          <span>{trip.date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-text-muted" />
          <span>{trip.time}</span>
        </div>
      </div>

      {/* Note Tag */}
      {trip.notes && (
        <div className="rounded-xl bg-[#FFFBEB] p-2.5 text-[11px] font-bold text-[#92400E] border border-[#FDE68A] text-right">
          {trip.notes}
        </div>
      )}

      {/* Details Button */}
      <button
        type="button"
        onClick={() => onViewDetails(trip.id)}
        className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer"
      >
        عرض التفاصيل
      </button>
    </div>
  );
};
