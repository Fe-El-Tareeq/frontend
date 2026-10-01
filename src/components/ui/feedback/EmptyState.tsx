import type { FC, ReactNode } from "react";
import { Package } from "lucide-react";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export const EmptyState: FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
  className = "",
}) => {
  return (
    <div
      className={`rounded-3xl bg-white dark:bg-[#102A4C] p-8 border border-border dark:border-white/10 shadow-xs text-center flex flex-col items-center justify-center space-y-3 my-3 animate-in fade-in duration-200 ${className}`}
    >
      {/* Icon Container */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] text-[#123A68] dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-2xs">
        {icon || <Package className="h-8 w-8 text-text-muted dark:text-slate-400" />}
      </div>

      {/* Text Info */}
      <div className="space-y-1 text-center">
        <h3 className="text-sm font-black text-[#123A68] dark:text-white">{title}</h3>
        <p className="text-xs text-text-muted dark:text-slate-400 leading-relaxed max-w-72.5 mx-auto">
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      {(actionText || secondaryActionText) && (
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 w-full max-w-60">
          {actionText && onAction && (
            <button
              type="button"
              onClick={onAction}
              className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#F36F21] px-5 text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all shadow-xs cursor-pointer"
            >
              {actionText}
            </button>
          )}

          {secondaryActionText && onSecondaryAction && (
            <button
              type="button"
              onClick={onSecondaryAction}
              className="flex h-10 w-full items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B1E36] px-4 text-xs font-bold text-primary dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 active:scale-98 transition-all cursor-pointer"
            >
              {secondaryActionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
