import type { FC } from "react";
import { MapPin, Send, CheckCircle2 } from "lucide-react";

export const HowItWorksSection: FC = () => {
  const steps = [
    {
      num: ".01",
      title: "حدد منطقتك ووقتك",
      desc: "اختر مدينتك وحيّك، وحدد إن كنت تريد إرسال غرض أو مشاركة رحلتك كمسافر.",
      icon: <MapPin className="h-5 w-5 text-primary" />,
    },
    {
      num: ".02",
      title: "اطلب أو شارك رحلتك",
      desc: "انشر تفاصيل الغرض أو اعلن عن مسار رحلتك وسعتك المتاحة للأغراض.",
      icon: <Send className="h-5 w-5 text-accent" />,
    },
    {
      num: ".03",
      title: "تواصل واستلم بأمان",
      desc: "تواصل مع الطرف الآخر عبر المحادثة، ونسّق نقطة الالتقاء والاستلام بكل سهولة.",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
    },
  ];

  return (
    <section id="how-it-works" className="space-y-3 pt-2">
      <div className="text-center space-y-1">
        <h2 className="text-base font-black text-[#123A68]">كيف يعمل بطريقك؟</h2>
        <p className="text-xs text-text-secondary">ثلاث خطوات بسيطة ومباشرة</p>
      </div>

      <div className="space-y-3">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex items-start gap-3.5 rounded-3xl bg-white p-4 border border-border shadow-xs"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200">
              {step.icon}
            </div>
            <div className="space-y-0.5 text-right flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-[#123A68]">
                  {step.title}
                </h3>
                <span className="text-[10.5px] font-black text-accent">
                  {step.num}
                </span>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
