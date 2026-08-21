import type { FC } from "react";
import { Package, Car } from "lucide-react";

interface HeroSectionProps {
  onNeedItem: () => void;
  onTraveler: () => void;
}

export const HeroSection: FC<HeroSectionProps> = ({
  onNeedItem,
  onTraveler,
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#123A68] via-[#0F3159] to-[#0D2C50] p-6 text-white text-center shadow-lg space-y-5">
      <div className="space-y-2">
        <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-accent">
          الشبكة الأولى في قطاع غزة 🇵🇸
        </span>
        <h1 className="text-2xl font-black leading-tight text-white">
          بطريقك... غرضك يوصل مع شخص في الطريق
        </h1>
        <p className="text-xs text-slate-200 leading-relaxed max-w-[320px] mx-auto">
          شبكة مجتمعية موثوقة تربط من يحتاج توصيل غرض مع مسافرين متجهين لنفس
          الوجهة في غزة.
        </p>
      </div>

      {/* Hero Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          onClick={onNeedItem}
          className="flex h-12 items-center justify-center gap-1.5 rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all shadow-md"
        >
          <Package className="h-4 w-4" />
          <span>أحتاج غرضاً</span>
        </button>

        <button
          type="button"
          onClick={onTraveler}
          className="flex h-12 items-center justify-center gap-1.5 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 text-xs font-black text-white hover:bg-white/25 active:scale-98 transition-all"
        >
          <Car className="h-4 w-4" />
          <span>أنا مسافر</span>
        </button>
      </div>

      {/* Trust Stats Strip */}
      <div className="flex items-center justify-center gap-4 text-[11px] font-medium text-slate-300 border-t border-white/10 pt-3">
        <span>⭐ 4.8 تقييم</span>
        <span>•</span>
        <span>+380 رحلة أسبوعياً</span>
        <span>•</span>
        <span>+1,200 مستخدم</span>
      </div>
    </section>
  );
};
