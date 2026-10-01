import type { FC } from "react";
import { MessageSquare, Mail, Phone, AlertCircle } from "lucide-react";

interface SupportContactChannelsProps {
  onOpenModal: (type: "CHAT" | "EMAIL" | "PHONE") => void;
  onNavigateReport: () => void;
}

export const SupportContactChannels: FC<SupportContactChannelsProps> = ({
  onOpenModal,
  onNavigateReport,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* 1. Live Chat */}
      <button
        type="button"
        onClick={() => onOpenModal("CHAT")}
        className="flex items-center justify-between p-4 rounded-3xl bg-white dark:bg-[#102A4C] border border-slate-200 dark:border-white/10 shadow-2xs hover:border-[#123A68]/40 dark:hover:border-white/20 hover:shadow-xs transition-all cursor-pointer text-right group"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#123A68] dark:text-[#38BDF8] group-hover:scale-105 transition-transform">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div className="text-right flex-1 pr-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm font-black text-[#123A68] dark:text-white">محادثة مباشرة</h3>
          </div>
          <p className="text-[11px] text-text-muted dark:text-slate-400 mt-0.5">رد فوري خلال دقيقة</p>
        </div>
      </button>

      {/* 2. Email Ticket */}
      <button
        type="button"
        onClick={() => onOpenModal("EMAIL")}
        className="flex items-center justify-between p-4 rounded-3xl bg-white dark:bg-[#102A4C] border border-slate-200 dark:border-white/10 shadow-2xs hover:border-[#123A68]/40 dark:hover:border-white/20 hover:shadow-xs transition-all cursor-pointer text-right group"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#123A68] dark:text-[#38BDF8] group-hover:scale-105 transition-transform">
          <Mail className="h-5 w-5" />
        </div>
        <div className="text-right flex-1 pr-3">
          <h3 className="text-sm font-black text-[#123A68] dark:text-white">إرسال بريد إلكتروني</h3>
          <p className="text-[11px] text-text-muted dark:text-slate-400 mt-0.5">رد خلال 24 ساعة</p>
        </div>
      </button>

      {/* 3. Phone Call */}
      <button
        type="button"
        onClick={() => onOpenModal("PHONE")}
        className="flex items-center justify-between p-4 rounded-3xl bg-white dark:bg-[#102A4C] border border-slate-200 dark:border-white/10 shadow-2xs hover:border-[#123A68]/40 dark:hover:border-white/20 hover:shadow-xs transition-all cursor-pointer text-right group"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#123A68] dark:text-[#38BDF8] group-hover:scale-105 transition-transform">
          <Phone className="h-5 w-5" />
        </div>
        <div className="text-right flex-1 pr-3">
          <h3 className="text-sm font-black text-[#123A68] dark:text-white">اتصال هاتفي</h3>
          <p className="text-[11px] text-text-muted dark:text-slate-400 mt-0.5">من 8:00 ص إلى 8:00 م</p>
        </div>
      </button>

      {/* 4. Report Issue CTA */}
      <button
        type="button"
        onClick={onNavigateReport}
        className="flex items-center justify-between p-4 rounded-3xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 shadow-2xs hover:border-rose-300 hover:shadow-xs transition-all cursor-pointer text-right group"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 group-hover:scale-105 transition-transform">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div className="text-right flex-1 pr-3">
          <h3 className="text-sm font-black text-rose-800 dark:text-rose-200">الإبلاغ عن مشكلة</h3>
          <p className="text-[11px] text-rose-700/80 dark:text-rose-300/80 mt-0.5">نزاع، شحنة، أو احتيال</p>
        </div>
      </button>
    </div>
  );
};
