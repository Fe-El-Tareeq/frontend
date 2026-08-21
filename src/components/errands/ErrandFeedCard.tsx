import type { FC } from "react";
import { Calendar, MapPin } from "lucide-react";

export interface ErrandCardData {
  id: string;
  title: string;
  requesterName: string;
  avatarInitials: string;
  avatarBg: string;
  from: string;
  to: string;
  date: string;
  status: string;
  statusText: string;
  statusClass: string;
  priceNis: number;
}

interface ErrandFeedCardProps {
  errand: ErrandCardData;
  onViewDetails: (id: string) => void;
}

export const ErrandFeedCard: FC<ErrandFeedCardProps> = ({
  errand,
  onViewDetails,
}) => {
  return (
    <div className="rounded-3xl bg-white p-4.5 border border-border shadow-xs space-y-3.5">
      {/* Top Row: Status badge on left, Requester on right */}
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-[10.5px] font-bold border ${errand.statusClass}`}
        >
          {errand.statusText}
        </span>

        <div className="flex items-center gap-2.5">
          <span className="text-xs font-black text-primary">
            {errand.requesterName}
          </span>
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-black text-white ${errand.avatarBg}`}
          >
            {errand.avatarInitials}
          </div>
        </div>
      </div>

      {/* Description Title */}
      <h3 className="text-xs font-black text-primary text-right leading-relaxed">
        {errand.title}
      </h3>

      {/* Route Details Box */}
      <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFC] p-3 text-xs font-bold text-primary border border-slate-200">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-[#F36F21]" />
          <span>إلى: {errand.to}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-[#123A68]" />
          <span>من: {errand.from}</span>
        </div>
      </div>

      {/* Date & Cost Details */}
      <div className="flex items-center justify-between text-xs pt-1">
        <div className="text-right">
          <span className="text-[10.5px] text-text-muted block">أجر التوصيل</span>
          <span className="font-black text-[#F36F21]">
            {errand.priceNis} شيكل
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-text-secondary">
          <Calendar className="h-3.5 w-3.5 text-text-muted" />
          <span>{errand.date}</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={() => onViewDetails(errand.id)}
        className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all"
      >
        عرض تفاصيل الطلب
      </button>
    </div>
  );
};
