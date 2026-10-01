import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Shield, FileText, Camera, CheckCircle2, Home } from "lucide-react";

interface VerificationHeaderProps {
  step: 1 | 2 | 3;
  onBack: () => void;
}

export const VerificationHeader: FC<VerificationHeaderProps> = ({
  step,
  onBack,
}) => {
  const navigate = useNavigate();

  const steps = [
    { num: 1, title: "تحميل المستندات", icon: FileText },
    { num: 2, title: "التحقق من الوجه", icon: Camera },
    { num: 3, title: "المراجعة", icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation on Desktop */}
      <div className="hidden sm:flex items-center gap-2 text-xs text-text-muted dark:text-slate-400 font-bold">
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="hover:text-accent transition-colors cursor-pointer"
        >
          الرئيسية
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={onBack}
          className="hover:text-accent transition-colors cursor-pointer"
        >
          حسابي
        </button>
        <span>/</span>
        <span className="text-[#123A68] dark:text-white">توثيق الحساب (KYC)</span>
      </div>

      {/* Modern Page Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#102A4C] p-5 sm:p-6 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onBack}
              aria-label="رجوع"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 dark:bg-[#0B1E36] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => navigate("/home")}
              aria-label="الصفحة الرئيسية"
              title="الصفحة الرئيسية"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 dark:bg-[#0B1E36] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 hover:text-accent dark:hover:text-accent transition-colors cursor-pointer"
            >
              <Home className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="text-right space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-[#123A68] dark:text-white">
                التحقق من الهوية
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/40 text-[10.5px] font-black text-[#123A68] dark:text-blue-300">
                KYC
              </span>
            </div>
            <p className="text-xs text-text-muted dark:text-slate-400 font-bold">
              الخطوة {step} من 3 — توثيق المستندات الرسمية للاعتماد
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#0B1E36]/60 px-4 py-2 rounded-2xl border border-slate-200/70 dark:border-white/5">
          <Shield className="h-4.5 w-4.5 text-accent" />
          <span>منظومة التوثيق الآمنة</span>
        </div>
      </div>

      {/* Stepper matching test expectations */}
      <div className="grid grid-cols-3 gap-2 p-2 rounded-2xl bg-white dark:bg-[#102A4C] border border-slate-200/80 dark:border-white/10 shadow-2xs">
        {steps.map((s) => {
          const isCurrent = step === s.num;
          const isDone = step > s.num;

          return (
            <div
              key={s.num}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl text-center transition-all ${
                isCurrent
                  ? "bg-orange-50/70 dark:bg-orange-950/20 border border-accent/40 text-[#F36F21] font-black"
                  : isDone
                    ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 font-bold"
                    : "text-slate-400 dark:text-slate-500 font-medium"
              }`}
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-black ${
                  isCurrent
                    ? "bg-[#F36F21] text-white"
                    : isDone
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : s.num}
              </div>
              <span className="text-xs truncate">{s.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
