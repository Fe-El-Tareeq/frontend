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
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-4.5 border border-border dark:border-white/10 shadow-xs space-y-3.5 text-right">
      {/* Top Row: Requester on RIGHT (1st child in RTL), Status Badge on LEFT (2nd child in RTL) */}
      <div className="flex items-center justify-between">
        {/* Right side in RTL: Avatar + Name */}
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-black text-white ${errand.avatarBg}`}
          >
            {errand.avatarInitials}
          </div>
          <span className="text-xs font-black text-primary dark:text-white">
            {errand.requesterName}
          </span>
        </div>

        {/* Left side in RTL: Status Badge */}
        <span
          className={`rounded-full px-3 py-1 text-[10.5px] font-bold border ${errand.statusClass}`}
        >
          {errand.statusText}
        </span>
      </div>

      {/* Description Title */}
      <h3 className="text-xs font-black text-primary dark:text-white text-right leading-relaxed">
        {errand.title}
      </h3>

      {/* Route Details Box */}
      <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] p-3 text-xs font-bold text-primary dark:text-white border border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-[#123A68] dark:text-blue-300" />
          <span>من: {errand.from}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-[#F36F21]" />
          <span>إلى: {errand.to}</span>
        </div>
      </div>

      {/* Date & Cost Details */}
      <div className="flex items-center justify-between text-xs pt-1">
        <div className="text-right">
          <span className="text-[10.5px] text-text-muted dark:text-slate-400 block">
            أجر التوصيل
          </span>
          <span className="font-black text-[#F36F21]">
            {errand.priceNis} شيكل
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-text-secondary dark:text-slate-400">
          <Calendar className="h-3.5 w-3.5 text-text-muted dark:text-slate-400" />
          <span>{errand.date}</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={() => onViewDetails(errand.id)}
        className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#123A68] dark:bg-[#1E4E8C] text-xs font-black text-white hover:bg-[#0D2C50] dark:hover:bg-[#123A68] active:scale-98 transition-all cursor-pointer"
      >
        عرض تفاصيل الطلب
      </button>
    </div>
  );
};
