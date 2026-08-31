import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LandingMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LandingMenuModal({ isOpen, onClose }: LandingMenuModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-xs animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-3xl bg-[#F8FAFC] p-4 text-center shadow-2xl space-y-3"
        dir="rtl"
      >
        {/* Top Brand Card */}
        <div className="flex items-center justify-center rounded-2xl bg-white p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-[#123A68]">بطريقك</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#F36F21]">
              <span className="text-xl">🛒</span>
            </div>
          </div>
        </div>

        {/* 1. Login Option Card */}
        <button
          type="button"
          onClick={() => {
            onClose();
            navigate("/login");
          }}
          className="flex h-14 w-full items-center justify-between rounded-2xl bg-white px-5 border border-slate-200 text-sm font-black text-[#123A68] hover:border-[#F36F21] shadow-2xs active:scale-98 transition-all cursor-pointer"
        >
          <span>تسجيل الدخول</span>
          <ChevronLeft className="h-5 w-5 text-[#123A68]" />
        </button>

        {/* 2. Register Option Card */}
        <button
          type="button"
          onClick={() => {
            onClose();
            navigate("/register-step1");
          }}
          className="flex h-14 w-full items-center justify-between rounded-2xl bg-white px-5 border border-slate-200 text-sm font-black text-[#123A68] hover:border-[#F36F21] shadow-2xs active:scale-98 transition-all cursor-pointer"
        >
          <span>إنشاء حساب جديد</span>
          <ChevronLeft className="h-5 w-5 text-[#123A68]" />
        </button>

        {/* 3. Home Solid Button */}
        <button
          type="button"
          onClick={() => {
            onClose();
            navigate("/");
          }}
          className="flex h-14 w-full items-center justify-between rounded-2xl bg-[#F36F21] px-5 text-sm font-black text-white shadow-md active:scale-98 transition-all cursor-pointer"
        >
          <span>الرئيسية</span>
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
}
