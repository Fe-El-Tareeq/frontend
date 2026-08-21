import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../utils/cn";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean | string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            "h-12.5 w-full appearance-none rounded-2xl border-2 border-border bg-[#FAFBFC] px-4 pr-4 pl-10 text-right text-sm text-primary transition-colors duration-200 outline-none focus:border-accent focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-error focus:border-error bg-error-light/10",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-text-muted">
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
