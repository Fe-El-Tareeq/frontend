import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

export interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  currentStep?: number;
  totalSteps?: number;
  showBack?: boolean;
  onBack?: () => void;
  footerText?: string;
  footerActionText?: string;
  onFooterAction?: () => void;
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({
  title,
  subtitle,
  currentStep,
  totalSteps,
  showBack = true,
  onBack,
  footerText,
  footerActionText,
  onFooterAction,
  children,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-[#F8FAFC] dark:bg-[#0B1E36] flex flex-col justify-between antialiased text-right transition-colors duration-200"
    >
      {/* Top Header */}
      <header className="flex h-16 items-center justify-between px-6 md:px-12 bg-white dark:bg-[#102A4C] border-b border-border/40 dark:border-white/10 shadow-2xs w-full">
        {showBack ? (
          <button
            type="button"
            onClick={handleBack}
            className="text-xs md:text-sm font-bold text-text-secondary dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors cursor-pointer"
          >
            رجوع
          </button>
        ) : (
          <div />
        )}

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-base font-black text-primary dark:text-white">بطريقك</span>
          <img
            src="/logo.png"
            alt="بطريقك"
            className="h-8 w-8 object-contain"
          />
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 items-center justify-center px-4 py-8 md:py-16">
        <div className="w-full max-w-[420px] rounded-3xl border border-border dark:border-white/10 bg-white dark:bg-[#102A4C] p-6 md:p-8 shadow-md">
          {/* Logo Illustration */}
          <div className="flex justify-center mb-4">
            <img
              src="/logo.png"
              alt="بطريقك"
              className="h-16 w-16 object-contain"
            />
          </div>

          {/* Title & Subtitle */}
          <div className="text-center space-y-1">
            <h1 className="text-xl font-black text-primary dark:text-white">{title}</h1>
            {subtitle && (
              <p className="text-xs text-text-secondary dark:text-slate-300">{subtitle}</p>
            )}
          </div>

          {/* Multi-step indicator */}
          {totalSteps && totalSteps > 1 && (
            <div className="mt-3 flex items-center justify-center gap-2">
              {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNum = index + 1;
                const isPassedOrCurrent = currentStep
                  ? stepNum <= currentStep
                  : false;

                return (
                  <span
                    key={index}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      isPassedOrCurrent
                        ? "w-10 bg-[#F36F21]"
                        : "w-10 bg-slate-200 dark:bg-slate-700",
                    )}
                  />
                );
              })}
            </div>
          )}

          {/* Form Content */}
          <div className="mt-5">{children}</div>

          {/* Footer */}
          {footerActionText && (
            <div className="mt-5 text-center text-xs text-text-secondary dark:text-slate-300 pt-2">
              {footerText && <span>{footerText} </span>}
              <button
                type="button"
                onClick={onFooterAction}
                className="font-black text-[#F36F21] hover:underline"
              >
                {footerActionText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
