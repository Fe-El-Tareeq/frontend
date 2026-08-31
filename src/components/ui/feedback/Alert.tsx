import type { FC, ReactNode } from "react";
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  X,
} from "lucide-react";
import { cn } from "../../../utils/cn";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
  variant?: AlertVariant;
  solid?: boolean;
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  onClose?: () => void;
  className?: string;
}

const variantStyles: Record<
  AlertVariant,
  { subtle: string; solid: string; icon: typeof Info }
> = {
  info: {
    subtle: "bg-blue-50 text-[#123A68] border-blue-200",
    solid: "bg-[#123A68] text-white border-transparent",
    icon: Info,
  },
  success: {
    subtle: "bg-emerald-50 text-emerald-800 border-emerald-200",
    solid: "bg-emerald-600 text-white border-transparent",
    icon: CheckCircle2,
  },
  warning: {
    subtle: "bg-amber-50 text-amber-800 border-amber-200",
    solid: "bg-amber-500 text-white border-transparent",
    icon: AlertTriangle,
  },
  error: {
    subtle: "bg-red-50 text-red-700 border-red-200",
    solid: "bg-red-600 text-white border-transparent",
    icon: AlertCircle,
  },
};

export const Alert: FC<AlertProps> = ({
  variant = "info",
  solid = false,
  title,
  children,
  icon,
  onClose,
  className = "",
}) => {
  const config = variantStyles[variant];
  const IconComponent = config.icon;

  return (
    <div
      role="alert"
      className={cn(
        "relative flex items-start gap-3 rounded-2xl p-3.5 text-right border transition-all text-xs",
        solid ? config.solid : config.subtle,
        className
      )}
    >
      {/* Icon on Right in RTL */}
      <div className="shrink-0 pt-0.5">
        {icon || <IconComponent className="h-4.5 w-4.5" />}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-0.5 text-right">
        {title && <h4 className="font-black text-xs">{title}</h4>}
        <div className="leading-relaxed opacity-95">{children}</div>
      </div>

      {/* Close button on Left in RTL */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 p-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="إغلاق التنبيه"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
