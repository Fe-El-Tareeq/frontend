import type { FC } from "react";

interface LandingCtaBannerProps {
  onRegister: () => void;
  onLogin: () => void;
}

export const LandingCtaBanner: FC<LandingCtaBannerProps> = ({
  onRegister,
  onLogin,
}) => {
  return (
    <section className="rounded-3xl bg-[#123A68] p-6 text-white text-center shadow-lg space-y-4">
      <h2 className="text-2xl font-black text-white">
        ابدأ استخدام بطريقك اليوم
      </h2>

      <p className="text-xs text-slate-200 leading-relaxed max-w-[320px] mx-auto opacity-90">
        انضم إلى شبكتنا وكن جزءاً من مجتمع التوصيل التشاركي، سواء كنت تبحث عن
        توصيل غرض أو ترغب في مساعدة الآخرين أثناء سفرك.
      </p>

      <div className="space-y-2.5 pt-2">
        {/* Register Button (Orange) */}
        <button
          type="button"
          onClick={onRegister}
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all shadow-md cursor-pointer"
        >
          إنشاء حساب مجاني
        </button>

        {/* Login Button (Outline / Transparent) */}
        <button
          type="button"
          onClick={onLogin}
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-xs font-black text-white hover:bg-white/20 active:scale-98 transition-all cursor-pointer"
        >
          تسجيل الدخول
        </button>
      </div>
    </section>
  );
};
