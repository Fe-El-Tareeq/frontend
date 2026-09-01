import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, error, leftElement, rightElement, type = "text", ...props },
    ref,
  ) => {
    return (
      <div className="relative w-full">
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-text-muted">
            {rightElement}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          className={cn(
            "h-12.5 w-full rounded-2xl border-2 border-border bg-[#FAFBFC] px-4 text-right text-sm text-primary transition-colors duration-200 outline-none placeholder:text-text-muted focus:border-accent focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-error focus:border-error bg-error-light/10",
            rightElement && "pr-11",
            leftElement && "pl-11",
            className,
          )}
          {...props}
        />

        {leftElement && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5">
            {leftElement}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
