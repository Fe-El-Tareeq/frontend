import type { FC } from "react";
import { ChevronLeft } from "lucide-react";

interface LandingMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateLogin: () => void;
  onNavigateRegister: () => void;
  onNavigateHome: () => void;
}

export const LandingMenuModal: FC<LandingMenuModalProps> = ({
  isOpen,
  onClose,
  onNavigateLogin,
  onNavigateRegister,
  onNavigateHome,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-12 backdrop-blur-xs transition-opacity animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[390px] rounded-3xl bg-[#F1F5F9]/95 p-4 shadow-2xl space-y-3.5 border border-white/60 animate-in zoom-in-95 duration-150 text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Logo Card */}
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-white py-4 px-6 border border-slate-200/80 shadow-xs">
          <span className="text-base font-black text-[#123A68]">بطريقك</span>
          <img
            src="/logo.png"
            alt="بطريقك"
            className="h-8 w-8 object-contain"
          />
        </div>

        {/* 2. Login Button */}
        <button
          type="button"
          onClick={onNavigateLogin}
          className="flex w-full items-center justify-between rounded-2xl bg-white p-4 border border-slate-200/80 shadow-xs hover:bg-slate-50 active:scale-98 transition-all text-right cursor-pointer"
        >
          <span className="text-sm font-black text-[#123A68]">
            تسجيل الدخول
          </span>
          <ChevronLeft className="h-5 w-5 text-[#123A68]" />
        </button>

        {/* 3. Register Button */}
        <button
          type="button"
          onClick={onNavigateRegister}
          className="flex w-full items-center justify-between rounded-2xl bg-white p-4 border border-slate-200/80 shadow-xs hover:bg-slate-50 active:scale-98 transition-all text-right cursor-pointer"
        >
          <span className="text-sm font-black text-[#123A68]">
            إنشاء حساب جديد
          </span>
          <ChevronLeft className="h-5 w-5 text-[#123A68]" />
        </button>

        {/* 4. Home Active Button (Orange) */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex w-full items-center justify-between rounded-2xl bg-[#F36F21] p-4 text-white shadow-md active:scale-98 transition-all text-right cursor-pointer"
        >
          <span className="text-sm font-black text-white">الرئيسية</span>
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};
