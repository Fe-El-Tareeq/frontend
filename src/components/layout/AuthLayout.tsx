import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { MobileContainer } from "./MobileContainer";
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
    <MobileContainer className="min-h-screen bg-[#F8FAFC] pb-8">
      {/* Top Header */}
      <header className="flex h-14 items-center justify-between px-5 bg-white border-b border-border/40 shadow-2xs">
        {showBack ? (
          <button
            type="button"
            onClick={handleBack}
            className="text-xs font-bold text-text-secondary hover:text-primary transition-colors"
          >
            رجوع
          </button>
        ) : (
          <div />
        )}

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 cursor-pointer"
        >
          <span className="text-sm font-black text-primary">بطريقك</span>
          <img
            src="/logo.png"
            alt="بطريقك"
            className="h-7 w-7 object-contain"
          />
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 items-center justify-center px-4 py-6">
        <div className="w-full max-w-[360px] rounded-3xl border border-border bg-white p-6 shadow-xs">
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
            <h1 className="text-xl font-black text-primary">{title}</h1>
            {subtitle && (
              <p className="text-xs text-text-secondary">{subtitle}</p>
            )}
          </div>

          {/* Multi-step indicator */}
          {totalSteps && totalSteps > 1 && (
            <div className="mt-3 flex items-center justify-center gap-2">
              {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNum = index + 1;
                const isPassedOrCurrent =
                  currentStep ? stepNum <= currentStep : false;

                return (
                  <span
                    key={index}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      isPassedOrCurrent ? "w-10 bg-[#F36F21]" : "w-10 bg-slate-200"
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
            <div className="mt-5 text-center text-xs text-text-secondary pt-2">
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
    </MobileContainer>
  );
};
