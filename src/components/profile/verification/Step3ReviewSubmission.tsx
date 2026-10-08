import type { FC } from "react";
import {
  FileCheck,
  FileText,
  User,
  ShieldCheck,
  Loader2,
  Edit3,
  CheckCircle2,
} from "lucide-react";

interface Step3ReviewSubmissionProps {
  frontPreview: string | null;
  backPreview: string | null;
  holdingIdPreview: string | null;
  isSubmitting: boolean;
  onEditStep: (step: 1 | 2) => void;
  onSubmit: () => void;
  onPrev: () => void;
}

export const Step3ReviewSubmission: FC<Step3ReviewSubmissionProps> = ({
  frontPreview,
  backPreview,
  holdingIdPreview,
  isSubmitting,
  onEditStep,
  onSubmit,
  onPrev,
}) => {
  const documents = [
    {
      title: "بطاقة الهوية — الوجه الأمامي",
      subtitle: "المستند الأساسي",
      preview: frontPreview,
      fallbackIcon: FileText,
      step: 1 as const,
    },
    {
      title: "بطاقة الهوية — الوجه الخلفي",
      subtitle: "الرقم القومي والبيانات",
      preview: backPreview,
      fallbackIcon: FileText,
      step: 1 as const,
    },
    {
      title: "صورة السيلفي مع الهوية",
      subtitle: "مطابقة الوجه مع البطاقة",
      preview: holdingIdPreview,
      fallbackIcon: User,
      step: 2 as const,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* Info Banner */}
      <div className="flex items-start gap-3 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 p-4 sm:p-5 border border-blue-200/80 dark:border-blue-900/40">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/60 text-[#123A68] dark:text-blue-300 shrink-0">
          <FileCheck className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm font-black text-[#123A68] dark:text-blue-200">
            مراجعة وتأكيد المستندات قبل الإرسال
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-bold">
            راجع مستنداتك المرفوعة للتأكد من وضوح الصورة والبيانات قبل إرسال طلب التحقق للمراجعة والاعتماد.
          </p>
        </div>
      </div>

      {/* 3 Document Cards: 3 Columns on Tablet / Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {documents.map((doc, idx) => {
          const FallbackIcon = doc.fallbackIcon;

          return (
            <div
              key={idx}
              className="rounded-3xl bg-white dark:bg-[#102A4C] p-4 sm:p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-3.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>جاهز للاعتماد</span>
                </span>
                <button
                  type="button"
                  onClick={() => onEditStep(doc.step)}
                  className="flex items-center gap-1 text-xs font-bold text-[#123A68] dark:text-accent hover:underline cursor-pointer"
                >
                  <Edit3 className="h-3 w-3" />
                  <span>تعديل</span>
                </button>
              </div>

              {/* Document Image Preview */}
              <div className="h-44 w-full rounded-2xl bg-slate-100 dark:bg-[#0B1E36]/60 border border-slate-200/80 dark:border-white/10 overflow-hidden flex items-center justify-center relative group">
                {doc.preview ? (
                  <img
                    src={doc.preview}
                    alt={doc.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <FallbackIcon className="h-10 w-10 text-slate-400" />
                )}
              </div>

              <div className="text-right space-y-0.5">
                <h4 className="text-xs sm:text-sm font-black text-[#123A68] dark:text-white truncate">
                  {doc.title}
                </h4>
                <p className="text-[11px] text-text-muted dark:text-slate-400">
                  {doc.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Privacy Notice */}
      <div className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-slate-100/90 dark:bg-[#102A4C]/60 border border-slate-200/60 dark:border-white/5 text-xs text-text-muted dark:text-slate-300">
        <ShieldCheck className="w-5 h-5 shrink-0 text-[#123A68] dark:text-accent mt-0.5" />
        <p className="leading-relaxed font-bold">
          تُحفظ مستنداتك في بيئة مشفرة ومحمية بالكامل، ولا يتم مشاركتها مع أي جهة خارجية، وتُستخدم حصرياً للتحقق من هوية صاحب الحساب وتأمين المجتمع.
        </p>
      </div>

      {/* Submit / Back Action Buttons */}
      <div className="flex items-center justify-between p-4 rounded-3xl bg-white dark:bg-[#102A4C] border border-slate-200/90 dark:border-white/10 shadow-2xs">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onPrev}
          className="h-12 px-6 rounded-2xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
        >
          السابق
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="flex h-12 w-full sm:w-72 items-center justify-center gap-2 rounded-2xl bg-[#F36F21] hover:bg-[#E05E12] active:scale-98 text-white font-black text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>جاري إرسال المستندات...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>ارسال طلب التحقق</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
