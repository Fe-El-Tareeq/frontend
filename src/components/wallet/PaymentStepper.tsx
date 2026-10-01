import type { FC } from "react";

interface PaymentStepperProps {
  currentStep: 1 | 2 | 3 | 4;
}

export const PaymentStepper: FC<PaymentStepperProps> = ({ currentStep }) => {
  const steps = [
    { num: 1, label: "اختر الباقة" },
    { num: 2, label: "طريقة الدفع" },
    { num: 3, label: "إتمام الدفع" },
    { num: 4, label: "تم الشراء" },
  ];

  return (
    <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-[#102A4C] p-3 border border-slate-200/80 dark:border-white/10 shadow-2xs text-[11px] font-bold text-center">
      {steps.map((s, idx) => {
        const isActive = s.num === currentStep;
        const isPassed = s.num < currentStep;

        return (
          <div key={s.num} className="contents">
            <div
              className={`flex items-center gap-1.5 ${
                isActive
                  ? "text-[#123A68] dark:text-white font-black"
                  : isPassed
                    ? "text-emerald-600 dark:text-emerald-400 font-bold"
                    : "text-text-muted dark:text-slate-400"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                  isActive
                    ? "bg-[#123A68] dark:bg-accent text-white"
                    : isPassed
                      ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300"
                      : "bg-slate-100 dark:bg-[#0B1E36] text-slate-500 dark:text-slate-400"
                }`}
              >
                {s.num}
              </span>
              <span>{s.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <span className="text-slate-300 dark:text-slate-600">──</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
