import type { FC } from "react";
import { Check } from "lucide-react";

interface ReportStep3SuccessConfirmationProps {
  reportReferenceId: string;
  onGoHome: () => void;
  onGoSupport: () => void;
}

export const ReportStep3SuccessConfirmation: FC<
  ReportStep3SuccessConfirmationProps
> = ({ reportReferenceId, onGoHome, onGoSupport }) => {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-6 border border-slate-200/90 dark:border-white/10 shadow-sm text-center space-y-5 animate-in zoom-in-95 duration-200">
      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 shadow-inner">
        <Check className="w-8 h-8 stroke-3" />
      </div>

      <div className="space-y-1.5">
        <h2 className="text-lg font-black text-[#123A68] dark:text-white">
          تم استلام بلاغك بنجاح
        </h2>
        <p className="text-xs text-text-muted dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
          يقوم فريق الأمان بالتحقيق في البلاغ بجدية وسنتواصل معك عبر الإشعارات أو الهاتف خلال 24 ساعة.
        </p>
      </div>

      <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] border border-slate-200 dark:border-white/10 space-y-1">
        <span className="text-[10.5px] text-text-muted dark:text-slate-400 block">
          رقم البلاغ للمتابعة
        </span>
        <span className="text-sm font-mono font-black text-[#123A68] dark:text-accent block">
          #{reportReferenceId}
        </span>
      </div>

      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={onGoHome}
          className="w-full h-12 rounded-2xl bg-[#123A68] dark:bg-accent text-xs font-black text-white hover:bg-[#0D2C50] dark:hover:bg-accent/90 active:scale-98 transition-all cursor-pointer shadow-md"
        >
          العودة للرئيسية
        </button>
        <button
          type="button"
          onClick={onGoSupport}
          className="w-full h-11 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#132F54] text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          مركز المساعدة والدعم
        </button>
      </div>
    </div>
  );
};
