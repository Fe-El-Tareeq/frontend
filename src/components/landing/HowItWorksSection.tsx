import type { FC } from "react";
import { MapPin, Send, CheckCircle2 } from "lucide-react";

export const HowItWorksSection: FC = () => {
  const steps = [
    {
      num: "01.",
      title: "حدد منطقتك",
      desc: "اختر مكان تواجدك والوجهة التي تريد إرسال الغرض إليها، أو ابحث عن رحلات متجهة إلى منطقتك.",
      icon: <MapPin className="h-5 w-5 text-[#123A68] dark:text-[#38BDF8]" />,
      iconBg: "bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/40",
    },
    {
      num: "02.",
      title: "اطلب أو شارك رحلتك",
      desc: "انشر طلبك مع التفاصيل والوزن، أو أعلن عن رحلتك القادمة واستقبل طلبات من أشخاص على طريقك.",
      icon: <Send className="h-5 w-5 text-[#F36F21] -rotate-45" />,
      iconBg: "bg-orange-50 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-800/40",
    },
    {
      num: "03.",
      title: "تواصل واستلم",
      desc: "تواصل عبر المحادثة المباشرة لتأكيد الموعد ونقطة الاستلام، وتابع غرضك حتى يصل بأمان.",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/40",
    },
  ];

  return (
    <section id="how-it-works" className="space-y-4 pt-4 text-right">
      {/* Decorative Divider */}
      <div className="flex justify-center">
        <div className="h-1 w-12 rounded-full bg-slate-300 dark:bg-slate-700" />
      </div>

      {/* Section Header */}
      <div className="text-center space-y-1">
        <span className="text-xs font-black text-[#F36F21] block">
          كيف يعمل؟
        </span>
        <h2 className="text-2xl font-black text-[#123A68] dark:text-white">ثلاث خطوات بسيطة</h2>
      </div>

      {/* Steps Cards List */}
      <div className="space-y-3.5">
        {steps.map((step) => (
          <div
            key={step.num}
            className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3 text-right"
          >
            {/* Top row: Number on the RIGHT (1st child in RTL), Icon on the LEFT (2nd child in RTL) */}
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-[#123A68] dark:text-white tracking-tighter">
                {step.num}
              </span>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl ${step.iconBg}`}
              >
                {step.icon}
              </div>
            </div>

            {/* Step content */}
            <div className="space-y-1 text-right">
              <h3 className="text-sm font-black text-[#123A68] dark:text-white">
                {step.title}
              </h3>
              <p className="text-xs text-text-secondary dark:text-slate-300 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
