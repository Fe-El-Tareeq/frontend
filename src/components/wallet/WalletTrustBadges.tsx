import type { FC } from "react";
import { Sparkles, RefreshCw, ShieldCheck } from "lucide-react";

export const WalletTrustBadges: FC = () => {
  return (
    <div className="flex items-center justify-around rounded-2xl bg-white dark:bg-[#102A4C] p-3.5 border border-slate-200 dark:border-white/10 text-[10.5px] font-bold text-text-muted dark:text-slate-400">
      <div className="flex items-center gap-1">
        <Sparkles className="h-3.5 w-3.5 text-[#123A68] dark:text-accent" />
        <span>تفعيل فوري بعد الدفع</span>
      </div>
      <span className="text-slate-300 dark:text-slate-600">•</span>
      <div className="flex items-center gap-1">
        <RefreshCw className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        <span>استرداد خلال 7 أيام</span>
      </div>
      <span className="text-slate-300 dark:text-slate-600">•</span>
      <div className="flex items-center gap-1">
        <ShieldCheck className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
        <span>دفع آمن ومشفر</span>
      </div>
    </div>
  );
};
