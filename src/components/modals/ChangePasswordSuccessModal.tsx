import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChangePasswordSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangePasswordSuccessModal({
  isOpen,
  onClose,
}: ChangePasswordSuccessModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-sm rounded-[28px] bg-white p-7 text-center shadow-xl space-y-4 text-right"
        dir="rtl"
      >
        {/* Light green circle with green check */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E6F9EE]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10B981] text-white shadow-xs">
            <Check className="h-6 w-6 stroke-[3]" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-1 text-center">
          <h3 className="text-xl font-black text-[#123A68]">
            تم حفظ كلمة المرور بنجاح
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed max-w-[260px] mx-auto">
            يمكنك الآن تسجيل الدخول إلى حسابك باستخدام كلمة المرور الجديدة
          </p>
        </div>

        {/* Buttons */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/login");
            }}
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#123A68] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer"
          >
            تسجيل الدخول
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/home");
            }}
            className="w-full py-2.5 text-xs font-bold text-[#123A68] hover:text-[#F36F21] transition-colors cursor-pointer"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
