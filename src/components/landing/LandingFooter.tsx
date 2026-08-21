import type { FC } from "react";

interface LandingFooterProps {
  onScrollTo: (sectionId: string) => void;
  onNavigateLogin: () => void;
  onNavigateRegister: () => void;
}

export const LandingFooter: FC<LandingFooterProps> = ({
  onScrollTo,
  onNavigateLogin,
  onNavigateRegister,
}) => {
  return (
    <footer className="mt-8 rounded-3xl bg-[#123A68] p-6 text-white text-center space-y-4">
      <div className="flex items-center justify-center gap-2">
        <span className="text-base font-black text-white">بطريقك</span>
        <img
          src="/logo.png"
          alt="بطريقك"
          className="h-8 w-8 object-contain"
        />
      </div>

      <p className="text-[11.5px] text-slate-300 max-w-[280px] mx-auto leading-relaxed">
        الشبكة التضامنية الأولى في غزة لتوصيل الاحتياجات اليومية والطرود بين الجيران والمسافرين.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 pt-1">
        <button
          onClick={() => onScrollTo("how-it-works")}
          className="hover:text-accent transition-colors"
        >
          كيف يعمل
        </button>
        <span>•</span>
        <button
          onClick={() => onScrollTo("why-us")}
          className="hover:text-accent transition-colors"
        >
          الميزات
        </button>
        <span>•</span>
        <button
          onClick={() => onScrollTo("faqs")}
          className="hover:text-accent transition-colors"
        >
          الأسئلة الشائعة
        </button>
        <span>•</span>
        <button
          onClick={onNavigateLogin}
          className="hover:text-accent transition-colors"
        >
          تسجيل الدخول
        </button>
        <span>•</span>
        <button
          onClick={onNavigateRegister}
          className="hover:text-accent transition-colors font-bold text-accent"
        >
          حساب جديد
        </button>
      </div>

      <div className="border-t border-white/10 pt-3 text-[10.5px] text-slate-400">
        جميع الحقوق محفوظة © {new Date().getFullYear()} بطريقك (في الطريق)
      </div>
    </footer>
  );
};
