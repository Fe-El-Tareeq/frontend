import type { FC } from "react";
import { MapPin, Send, CheckCircle2 } from "lucide-react";

export const HowItWorksSection: FC = () => {
  const steps = [
    {
      num: "01.",
      title: "حدد منطقتك",
      desc: "اختر مكان تواجدك والوجهة التي تريد إرسال الغرض إليها، أو ابحث عن رحلات متجهة إلى منطقتك.",
      icon: <MapPin className="h-5 w-5 text-[#123A68]" />,
      iconBg: "bg-blue-50 border border-blue-100",
    },
    {
      num: "02.",
      title: "اطلب أو شارك رحلتك",
      desc: "انشر طلبك مع التفاصيل والوزن، أو أعلن عن رحلتك القادمة واستقبل طلبات من أشخاص على طريقك.",
      icon: <Send className="h-5 w-5 text-[#F36F21] -rotate-45" />,
      iconBg: "bg-orange-50 border border-orange-100",
    },
    {
      num: "03.",
      title: "تواصل واستلم",
      desc: "تواصل عبر المحادثة المباشرة لتأكيد الموعد ونقطة الاستلام، وتابع غرضك حتى يصل بأمان.",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
      iconBg: "bg-emerald-50 border border-emerald-100",
    },
  ];

  return (
    <section id="how-it-works" className="space-y-4 pt-4 text-right">
      {/* Decorative Divider */}
      <div className="flex justify-center">
        <div className="h-1 w-12 rounded-full bg-slate-300" />
      </div>

      {/* Section Header */}
      <div className="text-center space-y-1">
        <span className="text-xs font-black text-[#F36F21] block">
          كيف يعمل؟
        </span>
        <h2 className="text-2xl font-black text-[#123A68]">
          ثلاث خطوات بسيطة
        </h2>
      </div>

      {/* Steps Cards List */}
      <div className="space-y-3.5">
        {steps.map((step) => (
          <div
            key={step.num}
            className="rounded-3xl bg-white p-5 border border-slate-200/80 shadow-xs space-y-3 text-right"
          >
            {/* Top row: Number on the RIGHT (1st child in RTL), Icon on the LEFT (2nd child in RTL) */}
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-[#123A68] tracking-tighter">
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
              <h3 className="text-sm font-black text-[#123A68]">
                {step.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
