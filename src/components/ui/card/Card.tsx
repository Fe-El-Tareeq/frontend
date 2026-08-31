import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "interactive";
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-white border border-border shadow-sm",
      elevated: "bg-white shadow-md border border-border/60",
      outlined: "bg-white border-2 border-border",
      interactive:
        "bg-white border border-border shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-200 cursor-pointer active:scale-[0.99]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl p-5 text-right transition-all",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardRoot.displayName = "Card";

const CardHeader = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-start justify-between gap-3 pb-3 border-b border-border/50",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
CardHeader.displayName = "CardHeader";

const CardTitle = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn("text-base font-bold text-primary leading-snug", className)}
    {...props}
  >
    {children}
  </h3>
);
CardTitle.displayName = "CardTitle";

const CardDescription = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-xs text-text-secondary mt-0.5", className)} {...props}>
    {children}
  </p>
);
CardDescription.displayName = "CardDescription";

const CardBody = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("py-3 text-sm text-primary", className)} {...props}>
    {children}
  </div>
);
CardBody.displayName = "CardBody";

const CardFooter = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "pt-3 border-t border-border/50 flex items-center justify-between gap-3",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
CardFooter.displayName = "CardFooter";

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});
