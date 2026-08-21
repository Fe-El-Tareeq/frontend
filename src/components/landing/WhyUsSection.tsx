import type { FC } from "react";
import { ShieldCheck, Zap, Users, CreditCard } from "lucide-react";

export const WhyUsSection: FC = () => {
  const points = [
    {
      title: "أمان وثقة تامة",
      desc: "تحقق من الهوية وتقييمات حقيقية لكل مستخدم.",
      icon: <ShieldCheck className="h-5 w-5 text-emerald-600" />,
    },
    {
      title: "سرعة في التوصيل",
      desc: "استفد من رحلات جيرانك المتجهة لنفس وجهتك اليومية.",
      icon: <Zap className="h-5 w-5 text-accent" />,
    },
    {
      title: "مجتمع تضامني",
      desc: "مبادرة محلية من أبناء غزة لمساعدة بعضنا البعض.",
      icon: <Users className="h-5 w-5 text-primary" />,
    },
    {
      title: "نظام التوكنز الشفاف",
      desc: "شحن واستخدام بسيط بدون أي تكاليف أو عمولات مخفية.",
      icon: <CreditCard className="h-5 w-5 text-purple-600" />,
    },
  ];

  return (
    <section id="why-us" className="space-y-3 pt-2">
      <div className="text-center space-y-1">
        <h2 className="text-base font-black text-[#123A68]">لماذا تختار بطريقك؟</h2>
        <p className="text-xs text-text-secondary">
          ميزات صممت خصيصاً لتناسب واقعنا واحتياجاتنا
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {points.map((p, i) => (
          <div
            key={i}
            className="rounded-3xl bg-white p-4 border border-border shadow-xs space-y-2 text-right"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
              {p.icon}
            </div>
            <h3 className="text-xs font-black text-[#123A68]">{p.title}</h3>
            <p className="text-[10.5px] text-text-secondary leading-relaxed">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
