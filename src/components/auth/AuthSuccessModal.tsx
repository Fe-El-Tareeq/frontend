import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

export type AuthSuccessVariant = "changed" | "saved" | "registered";

export interface AuthSuccessModalProps {
  isOpen: boolean;
  onClose?: () => void;
  variant?: AuthSuccessVariant;
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

export function AuthSuccessModal({
  isOpen,
  onClose,
  variant = "changed",
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  className,
}: AuthSuccessModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Defaults per variant
  const config = {
    changed: {
      defaultTitle: "تم تغيير كلمة المرور بنجاح",
      defaultSubtitle: "يمكنك الآن تسجيل الدخول إلى حسابك باستخدام كلمة المرور الجديدة",
      defaultPrimaryText: "تسجيل الدخول",
      showSecondary: false,
    },
    saved: {
      defaultTitle: "تم حفظ كلمة المرور بنجاح",
      defaultSubtitle: "يمكنك الآن تسجيل الدخول إلى حسابك باستخدام كلمة المرور الجديدة",
      defaultPrimaryText: "تسجيل الدخول",
      defaultSecondaryText: "العودة للرئيسية",
      showSecondary: true,
    },
    registered: {
      defaultTitle: "تم إنشاء الحساب بنجاح",
      defaultSubtitle: "أهلاً بك في منصة بطريقك! يمكنك الآن البدء واستكشاف جميع المشاوير والطلبات.",
      defaultPrimaryText: "المتابعة إلى حسابك",
      showSecondary: false,
    },
  }[variant];

  const modalTitle = title || config.defaultTitle;
  const modalSubtitle = subtitle || config.defaultSubtitle;
  const primaryText = primaryButtonText || config.defaultPrimaryText;
  const secondaryText = secondaryButtonText || (config as { defaultSecondaryText?: string }).defaultSecondaryText || "العودة للرئيسية";
  const showSecondary = secondaryButtonText !== undefined ? true : config.showSecondary;

  const handlePrimary = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      if (onClose) onClose();
      navigate("/login");
    }
  };

  const handleSecondary = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      if (onClose) onClose();
      navigate("/home");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in"
    >
      <div
        className={cn(
          "w-full max-w-sm rounded-[28px] bg-white p-7 text-center shadow-xl space-y-4",
          className
        )}
        dir="rtl"
      >
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E6F9EE]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10B981] text-white shadow-xs">
            <Check className="h-6 w-6 stroke-[3]" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-1.5 text-center">
          <h3 className="text-xl font-black text-[#123A68]">{modalTitle}</h3>
          <p className="text-xs text-text-secondary leading-relaxed max-w-[260px] mx-auto">
            {modalSubtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={handlePrimary}
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#123A68] text-xs font-black text-white shadow-md active:scale-98 transition-all hover:bg-[#0D2C50] cursor-pointer"
          >
            {primaryText}
          </button>

          {showSecondary && (
            <button
              type="button"
              onClick={handleSecondary}
              className="w-full py-2.5 text-xs font-bold text-[#123A68] hover:text-[#F36F21] transition-colors cursor-pointer"
            >
              {secondaryText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
