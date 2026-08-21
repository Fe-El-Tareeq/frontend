import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../../utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "ghost" | "danger" | "secondary";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "accent",
      size = "md",
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary shadow-sm",
      accent:
        "bg-accent text-white hover:bg-accent-hover focus-visible:ring-accent shadow-sm",
      outline:
        "border-2 border-border bg-white text-primary hover:bg-background focus-visible:ring-primary",
      ghost:
        "bg-transparent text-primary hover:bg-background focus-visible:ring-primary",
      danger:
        "bg-error text-white hover:bg-red-700 focus-visible:ring-error shadow-sm",
      secondary:
        "bg-background text-primary hover:bg-slate-200 focus-visible:ring-primary",
    };

    const sizes = {
      sm: "h-9.5 px-3 text-xs rounded-xl gap-1.5",
      md: "h-12.5 px-5 text-sm rounded-2xl gap-2",
      lg: "h-14 px-6 text-base rounded-2xl gap-2.5",
      icon: "h-10.5 w-10.5 p-0 rounded-xl",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
