import type { FC } from "react";
import {
  FileText,
  Camera,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";

interface VerificationSidebarProps {
  currentStep: 1 | 2 | 3;
}

export const VerificationSidebar: FC<VerificationSidebarProps> = ({
  currentStep,
}) => {
  const steps = [
    {
      num: 1,
      title: "مستندات الهوية الوطنية",
      desc: "صورة الوجهين الأمامي والخلفي",
      icon: FileText,
    },
    {
      num: 2,
      title: "مطابقة ملامح الوجه",
      desc: "سيلفي واضح مع بطاقة الهوية",
      icon: Camera,
    },
    {
      num: 3,
      title: "التدقيق والاعتماد النهائي",
      desc: "مراجعة المستندات وتأكيد الإرسال",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="space-y-5 text-right">
      {/* Desktop Step Progress Card */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <span className="text-xs font-black text-text-muted dark:text-slate-400">
            مراحل التوثيق
          </span>
          <span className="text-xs font-black text-[#F36F21]">
            {currentStep === 1 ? "33%" : currentStep === 2 ? "66%" : "100%"}
          </span>
        </div>

        {/* Stepper Timeline */}
        <div className="space-y-3">
          {steps.map((s) => {
            const isCurrent = currentStep === s.num;
            const isDone = currentStep > s.num;
            const Icon = s.icon;

            return (
              <div
                key={s.num}
                className={`relative flex items-start gap-3 p-3 rounded-2xl transition-all ${
                  isCurrent
                    ? "bg-orange-50/80 dark:bg-orange-950/20 border border-[#F36F21]/30 shadow-xs"
                    : isDone
                      ? "bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/30"
                      : "bg-slate-50/70 dark:bg-[#0B1E36]/30 border border-transparent opacity-60"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-black shrink-0 transition-transform ${
                    isCurrent
                      ? "bg-[#F36F21] text-white shadow-xs scale-105"
                      : isDone
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Icon className="h-4.5 w-4.5" />
                  )}
                </div>

                <div className="space-y-0.5 overflow-hidden">
                  <span
                    className={`text-xs font-black block truncate ${
                      isCurrent
                        ? "text-[#F36F21]"
                        : isDone
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {s.title}
                  </span>
                  <p className="text-[11px] text-text-muted dark:text-slate-400 truncate">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Verify Card */}
      <div className="rounded-3xl bg-linear-to-br from-[#123A68] to-[#0D2C50] text-white p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-[#F36F21]" />
          <h4 className="text-xs font-black">لماذا نطلب التحقق من الهوية؟</h4>
        </div>

        <ul className="space-y-2 text-[11px] text-white/85">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F36F21] shrink-0" />
            <span>تفعيل ميزة إضافة الرحلات ومطابقة الشحنات</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F36F21] shrink-0" />
            <span>حماية المجتمع ومنع الاحتيال والحسابات الوهمية</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F36F21] shrink-0" />
            <span>شارة "موثّق ✓" لزيادة ثقة المسافرين والعملاء</span>
          </li>
        </ul>
      </div>

      {/* Security & Privacy Guarantee */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-4.5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2.5">
        <div className="flex items-center gap-2 text-slate-800 dark:text-white">
          <Lock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <h4 className="text-xs font-black">حماية بياناتك أولويتنا</h4>
        </div>
        <p className="text-[11px] text-text-muted dark:text-slate-300 leading-relaxed">
          تُحفظ صور المستندات في بيئة سحابية مشفرة ببروتوكول 256-bit SSL وتُستخدم حصرياً لأغراض التحقق الداخلي وفق سياسة الخصوصية.
        </p>
      </div>
    </div>
  );
};
