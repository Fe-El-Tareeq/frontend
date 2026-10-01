import type { HTMLAttributes } from "react";
import { Package, Feather, Layers } from "lucide-react";
import type { WeightClass } from "../../../types";
import { cn } from "../../../utils/cn";

export interface WeightBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  weightClass: WeightClass;
}

export const WeightBadge = ({
  weightClass,
  className,
  ...props
}: WeightBadgeProps) => {
  const config: Record<
    WeightClass,
    { label: string; sub: string; icon: typeof Feather }
  > = {
    LIGHT: {
      label: "خفيف",
      sub: "≤ 1 كجم",
      icon: Feather,
    },
    MEDIUM: {
      label: "متوسط",
      sub: "1 - 4 كجم",
      icon: Package,
    },
    HEAVY: {
      label: "ثقيل",
      sub: "> 4 كجم",
      icon: Layers,
    },
  };

  const item = config[weightClass] || config.LIGHT;
  const Icon = item.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-background text-xs font-medium text-text-secondary border border-border",
        className,
      )}
      {...props}
    >
      <Icon className="h-3.5 w-3.5 text-primary" />
      <span>
        {item.label}{" "}
        <span className="text-[10px] text-text-muted">({item.sub})</span>
      </span>
    </span>
  );
};
