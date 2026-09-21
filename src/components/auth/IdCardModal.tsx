import { UserCheck, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

export interface IdCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function IdCardModal({
  isOpen,
  onClose,
  title = "تسجيل الدخول مطلوب",
  subtitle = "يجب عليك تسجيل الدخول أو إنشاء حساب جديد للوصول إلى هذه الميزة والتواصل مع المستخدمين.",
  className,
}: IdCardModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in"
    >
      <div
        className={cn(
          "relative w-full max-w-sm rounded-[28px] bg-white p-7 text-center shadow-xl space-y-4",
          className
        )}
        dir="rtl"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute left-4 top-4 rounded-full p-1.5 text-text-muted hover:bg-slate-100 hover:text-text-primary transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon / Illustration */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EBF3FC]">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123A68] text-white shadow-xs">
            <UserCheck className="h-6 w-6 stroke-[2.5]" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-1.5 text-center">
          <h3 className="text-xl font-black text-[#123A68]">{title}</h3>
          <p className="text-xs text-text-secondary leading-relaxed max-w-[270px] mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/login");
            }}
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#123A68] text-xs font-black text-white shadow-md active:scale-98 transition-all hover:bg-[#0D2C50] cursor-pointer"
          >
            تسجيل الدخول
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/register-step1");
            }}
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all hover:bg-[#E05E12] cursor-pointer"
          >
            إنشاء حساب جديد
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/home");
            }}
            className="w-full py-1.5 text-xs font-bold text-text-secondary hover:text-primary transition-colors cursor-pointer"
          >
            الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
