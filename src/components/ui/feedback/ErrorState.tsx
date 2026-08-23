import type { FC, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export interface ErrorStateProps {
  icon?: ReactNode;
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
}

export const ErrorState: FC<ErrorStateProps> = ({
  icon,
  title = "حدث خطأ في تحميل البيانات",
  message = "تعذر الاتصال بالخادم أو جلب البيانات، يرجى التحقق من اتصالك والمحاولة مجدداً.",
  onRetry,
  retryText = "إعادة المحاولة",
  className = "",
}) => {
  return (
    <div
      className={`rounded-3xl bg-white p-7 border border-red-200/80 shadow-xs text-center flex flex-col items-center justify-center space-y-3.5 my-3 animate-in fade-in duration-200 ${className}`}
    >
      {/* Icon Container */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 border border-red-100 shadow-2xs">
        {icon || <AlertCircle className="h-7 w-7 text-red-500" />}
      </div>

      {/* Text Info */}
      <div className="space-y-1 text-center">
        <h3 className="text-sm font-black text-primary">{title}</h3>
        <p className="text-xs text-text-muted leading-relaxed max-w-[280px] mx-auto">
          {message}
        </p>
      </div>

      {/* Retry Button */}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#123A68] px-5 text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all shadow-xs cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>{retryText}</span>
        </button>
      )}
    </div>
  );
};
