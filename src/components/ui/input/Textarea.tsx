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
          "w-full rounded-[16px] border-2 border-border bg-[#FAFBFC] p-4 text-right text-[15px] text-primary transition-colors duration-200 outline-none placeholder:text-text-muted focus:border-accent focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed resize-none",
          error && "border-error focus:border-error bg-error-light/10",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
