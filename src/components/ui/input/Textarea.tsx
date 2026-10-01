import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean | string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, rows = 3, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "w-full rounded-[16px] border-2 border-border dark:border-white/10 bg-[#FAFBFC] dark:bg-[#0B1E36] p-4 text-right text-[15px] text-primary dark:text-white transition-colors duration-200 outline-none placeholder:text-text-muted dark:placeholder:text-slate-500 focus:border-accent dark:focus:border-accent focus:bg-white dark:focus:bg-[#102A4C] disabled:opacity-50 disabled:cursor-not-allowed resize-none",
          error && "border-error focus:border-error bg-error-light/10 dark:bg-red-950/20",
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
