import type { FC } from "react";
import { Check, Loader2 } from "lucide-react";

interface LegalAgreementFooterProps {
  isAgreed: boolean;
  setIsAgreed: (v: boolean) => void;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: string | null;
  onAgreeAndBack: () => void;
  onBack: () => void;
}

export const LegalAgreementFooter: FC<LegalAgreementFooterProps> = ({
  isAgreed,
  setIsAgreed,
  isSubmitting,
  submitError,
  submitSuccess,
  onAgreeAndBack,
  onBack,
}) => {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-4 text-right">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
          <Check className="h-5 w-5 stroke-3" />
        </div>
        <div>
          <h3 className="text-sm font-black text-[#123A68] dark:text-white">إقرار بالموافقة</h3>
          <p className="text-[10.5px] text-text-muted dark:text-slate-400 mt-0.5">
            بالنقر على "أوافق"، فإنك تُقرّ بأنك قرأت وفهمت وقبلت شروط الاستخدام وسياسة الخصوصية بشكل كامل.
          </p>
        </div>
      </div>

      {submitError && (
        <div className="rounded-2xl bg-rose-50 dark:bg-rose-950/40 p-3 text-xs font-bold text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40">
          {submitError}
        </div>
      )}

      {submitSuccess && (
        <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40">
          {submitSuccess}
        </div>
      )}

      {/* Checkbox Click Area */}
      <button
        type="button"
        onClick={() => setIsAgreed(!isAgreed)}
        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer text-right ${isAgreed
            ? "bg-[#F0FDF4] dark:bg-emerald-950/30 border-emerald-400 dark:border-emerald-800 ring-1 ring-emerald-300 dark:ring-emerald-800/60"
            : "bg-slate-50 dark:bg-[#0B1E36] border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5"
          }`}
      >
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${isAgreed
              ? "border-[#123A68] dark:border-emerald-500 bg-[#123A68] dark:bg-emerald-500 text-white"
              : "border-slate-300 dark:border-white/20 bg-white dark:bg-[#102A4C]"
            }`}
        >
          {isAgreed && <Check className="h-3.5 w-3.5 stroke-3" />}
        </div>

        <span className="text-xs font-bold text-slate-700 dark:text-slate-200 max-w-[85%]">
          أؤكد أنني قرأت وأوافق على شروط الاستخدام و سياسة الخصوصية الخاصة بمنصة بطريقك.
        </span>
      </button>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 pt-1">
        <button
          type="button"
          onClick={onAgreeAndBack}
          disabled={!isAgreed || isSubmitting}
          className={`flex-1 flex h-12 items-center justify-center gap-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${isAgreed && !isSubmitting
              ? "bg-[#059669] text-white shadow-md hover:bg-emerald-700 active:scale-98"
              : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
            }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>جاري الحفظ...</span>
            </>
          ) : isAgreed ? (
            <>
              <Check className="h-4 w-4 stroke-3" />
              <span>تم الموافقة — العودة للإعدادات</span>
            </>
          ) : (
            <span>يجب الموافقة أولاً</span>
          )}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="px-5 h-12 flex items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#132F54] text-xs font-black text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 active:scale-98 transition-all cursor-pointer"
        >
          رجوع
        </button>
      </div>
    </div>
  );
};
