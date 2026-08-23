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
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#123A68] via-[#0F3159] to-[#0D2C50] p-6 text-white text-center shadow-lg space-y-6">
      {/* Top Badge */}
      <div className="inline-flex items-center justify-center">
        <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-[#F36F21] border border-[#F36F21]/30 backdrop-blur-xs">
          شبكة التوصيل التشاركي في قطاع غزة
        </span>
      </div>

      {/* Main Headline matching Figma */}
      <div className="space-y-3">
        <h1 className="text-3xl font-black leading-tight text-white tracking-tight">
          بطريقك..<br />
          <span className="text-[#F36F21]">غرضك يوصل</span><br />
          مع شخص في الطريق
        </h1>
        <p className="text-xs text-slate-200 leading-relaxed max-w-[340px] mx-auto opacity-90">
          منصتنا تربط الأشخاص داخل مناطق قطاع غزة لنقل أو استلام أي غرض، وتتيح
          للمسافرين استغلال رحلاتهم اليومية لمساعدة الآخرين وكسب أجر.
        </p>
      </div>

      {/* Hero Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          onClick={onNeedItem}
          className="flex h-12 items-center justify-center gap-1.5 rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all shadow-md cursor-pointer"
        >
          <Package className="h-4 w-4" />
          <span>أحتاج غرضاً</span>
        </button>

        <button
          type="button"
          onClick={onTraveler}
          className="flex h-12 items-center justify-center gap-1.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-black text-white hover:bg-white/20 active:scale-98 transition-all cursor-pointer"
        >
          <Car className="h-4 w-4" />
          <span>أنا مسافر</span>
        </button>
      </div>

      {/* Trust Stats Strip (3 columns) */}
      <div className="grid grid-cols-3 gap-2 border-t border-white/15 pt-5 text-center">
        <div className="space-y-0.5">
          <div className="text-xl font-black text-white">4.8</div>
          <div className="text-[10.5px] text-slate-300">تقييم المستخدمين</div>
        </div>

        <div className="space-y-0.5 border-x border-white/15">
          <div className="text-xl font-black text-white">+380</div>
          <div className="text-[10.5px] text-slate-300">رحلة أسبوعياً</div>
        </div>

        <div className="space-y-0.5">
          <div className="text-xl font-black text-white">+1200</div>
          <div className="text-[10.5px] text-slate-300">مستخدم نشط</div>
        </div>
      </div>
    </section>
  );
};
