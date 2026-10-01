import type { FC } from "react";
import { Check, Clock, Car, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Step4UnderReviewStateProps {
  onGoHome: () => void;
}

export const Step4UnderReviewState: FC<Step4UnderReviewStateProps> = ({
  onGoHome,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl mx-auto py-10 px-6 sm:px-8 rounded-3xl bg-white dark:bg-[#102A4C] border border-slate-200/90 dark:border-white/10 shadow-sm text-center space-y-8 animate-in fade-in zoom-in-95 duration-200">
      {/* Green Checkmark Badge */}
      <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 shadow-inner">
        <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
          <Check className="w-8 h-8 stroke-3" />
        </div>
      </div>

      {/* Title & Description */}
      <div className="space-y-3">
        <h2 className="text-2xl font-black text-[#123A68] dark:text-white">
          تم إرسال مستنداتك للمراجعة بنجاح
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary dark:text-slate-300 leading-relaxed max-w-md mx-auto font-bold">
          استلمنا مستنداتك بنجاح، ويقوم فريق التحقق بمراجعتها ومطابقتها للتأكد من هويتك وتفعيل حسابك خلال مدة أقصاها 24 ساعة.
        </p>
      </div>

      {/* Desktop Milestone Timeline */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0B1E36]/50 border border-slate-200/80 dark:border-white/5 space-y-4 text-right">
        <span className="text-xs font-black text-[#123A68] dark:text-white block">
          مراحل معالجة طلبك:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/40 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
              ✓
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 block">
                استلام المستندات
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                تم بنجاح
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0 animate-pulse">
              ⏳
            </div>
            <div>
              <span className="text-xs font-bold text-amber-900 dark:text-amber-200 block">
                التدقيق والمطابقة
              </span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400">
                قيد التنفيذ الآن
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 flex items-center gap-2.5 opacity-60">
            <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold shrink-0">
              3
            </div>
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                اعتماد وتوثيق الحساب
              </span>
              <span className="text-[10px] text-slate-500">
                في الانتظار
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onGoHome}
          className="w-full sm:w-56 py-3.5 rounded-2xl bg-[#F36F21] hover:bg-[#E05E12] active:scale-98 text-white font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Home className="h-4 w-4" />
          <span>الرجوع للرئيسية</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/trips")}
          className="w-full sm:w-56 py-3.5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 active:scale-98 font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
        >
          <Car className="h-4 w-4" />
          <span>استكشاف الرحلات</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs text-text-muted dark:text-slate-400 font-bold">
        <Clock className="w-4 h-4 text-[#F36F21]" />
        <span>سنرسل لك إشعاراً فورياً على المنصة فور انتهاء عملية التدقيق</span>
      </div>
    </div>
  );
};
