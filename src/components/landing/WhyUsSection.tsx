import type { FC } from "react";
import {
  ShieldCheck,
  Zap,
  Users,
  Smartphone,
  Package,
  CheckCircle2,
  Star,
  MapPin,
} from "lucide-react";

export const WhyUsSection: FC = () => {
  const features = [
    {
      title: "أمان وموثوقية",
      desc: "تقييم متبادل وتوثيق هوية المسافرين لضمان وصول الأغراض بأمان تام.",
      icon: <ShieldCheck className="h-5 w-5 text-white" />,
    },
    {
      title: "سرعة في الوصول",
      desc: "استغل الرحلات اليومية المستمرة لنقل أغراضك في أسرع وقت دون انتظار.",
      icon: <Zap className="h-5 w-5 text-white fill-white" />,
    },
    {
      title: "دعم مجتمعي متبادل",
      desc: "مساعدة أهلنا وأقاربنا في نقل الأدوية والاحتياجات الأساسية بين المدن.",
      icon: <Users className="h-5 w-5 text-white" />,
    },
    {
      title: "كفاءة وسهولة استخدام",
      desc: "تصميم بسيط وخفيف يعمل بكفاءة مع أضعف سرعات الإنترنت.",
      icon: <Smartphone className="h-5 w-5 text-white" />,
    },
  ];

  return (
    <section id="about-platform" className="space-y-5 pt-4 text-right">
      {/* Section Header */}
      <div className="space-y-1.5">
        <span className="text-xs font-black text-[#F36F21] block">
          عن المنصة
        </span>
        <h2 className="text-2xl font-black text-[#123A68] leading-tight">
          منصة مجتمعية تبني الثقة بين الجيران
        </h2>
        <p className="text-xs text-text-secondary leading-relaxed pt-1">
          بطريقك ليست مجرد منصة توصيل، بل هي مجتمع قائم على التعاون والتكافل بين
          أبناء القطاع في ظل الظروف الصعبة، حيث نسهل وصول الاحتياجات اليومية.
        </p>
      </div>

      {/* 4 Feature Items */}
      <div className="space-y-4 pt-1">
        {features.map((item, index) => (
          <div key={index} className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#123A68] text-white shadow-xs">
              {item.icon}
            </div>
            <div className="space-y-0.5 flex-1">
              <h3 className="text-sm font-black text-[#123A68]">
                {item.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 4 Stat Metric Cards (2x2 Grid) matching Figma screenshot */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {/* Card 1: 5 Cities / 16+ Neighborhoods (White Card) */}
        <div className="rounded-3xl bg-white p-4 border border-slate-200/80 shadow-xs text-right space-y-1">
          <div className="flex items-center gap-1 text-[10.5px] font-bold text-text-muted">
            <MapPin className="h-3.5 w-3.5 text-[#123A68]" />
            <span>5 مدن</span>
          </div>
          <div className="text-2xl font-black text-[#123A68]">16+ حي</div>
          <p className="text-[10.5px] text-text-secondary font-medium">
            تغطية كاملة للقطاع
          </p>
        </div>

        {/* Card 2: +380 Weekly Trips (Navy Card) */}
        <div className="rounded-3xl bg-[#123A68] p-4 text-white shadow-md text-right space-y-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/15">
            <Package className="h-4 w-4 text-white" />
          </div>
          <div className="text-2xl font-black text-white">+380</div>
          <p className="text-[10.5px] text-slate-200 font-medium">
            رحلة أسبوعية
          </p>
        </div>

        {/* Card 3: 4.8 / 5 Rating (Orange Card) */}
        <div className="rounded-3xl bg-[#F36F21] p-4 text-white shadow-md text-right space-y-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/20">
            <Star className="h-4 w-4 fill-white text-white" />
          </div>
          <div className="text-2xl font-black text-white">4.8 / 5</div>
          <p className="text-[10.5px] text-orange-100 font-medium">
            تقييم أكثر من 1,200 مستخدم
          </p>
        </div>

        {/* Card 4: 98% Delivery Success (White Card) */}
        <div className="rounded-3xl bg-white p-4 border border-slate-200/80 shadow-xs text-right space-y-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-[#123A68]">98%</div>
          <p className="text-[10.5px] text-text-secondary font-medium">
            نسبة التوصيل الناجح
          </p>
        </div>
      </div>
    </section>
  );
};
