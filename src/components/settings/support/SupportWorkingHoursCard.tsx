import type { FC } from "react";
import { Clock, Globe, Hourglass, Users } from "lucide-react";

export const SupportWorkingHoursCard: FC = () => {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-3.5 text-right">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/10">
        <Clock className="h-4 w-4 text-[#123A68] dark:text-[#38BDF8]" />
        <h3 className="text-xs font-black text-[#123A68] dark:text-white">ساعات العمل والتواجد</h3>
      </div>

      <div className="grid grid-cols-2 gap-2.5 text-right">
        <div className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] border border-slate-100 dark:border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[10.5px]">
            <Globe className="h-3 w-3 text-slate-400 dark:text-slate-500" />
            <span>خدمة المحادثة</span>
          </div>
          <span className="text-xs font-black text-[#123A68] dark:text-white block">24/7 طوال الأسبوع</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] border border-slate-100 dark:border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[10.5px]">
            <Hourglass className="h-3 w-3 text-slate-400 dark:text-slate-500" />
            <span>الاتصال الهاتفي</span>
          </div>
          <span className="text-xs font-black text-[#123A68] dark:text-white block">8:00 ص - 8:00 م</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-text-muted dark:text-slate-400 pt-1">
        <Users className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>فريق دعم محلي متواجد لخدمتكم</span>
      </div>
    </div>
  );
};
