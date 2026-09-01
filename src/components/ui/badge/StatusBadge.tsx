import type { HTMLAttributes } from "react";
import type { ErrandStatus } from "../../../types";
import { cn } from "../../../utils/cn";

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: ErrandStatus | "URGENT";
}

export const StatusBadge = ({
  status,
  className,
  ...props
}: StatusBadgeProps) => {
  const config: Record<
    ErrandStatus | "URGENT",
    { label: string; bg: string; text: string; dotBg: string }
  > = {
    OPEN: {
      label: "متاح",
      bg: "bg-success-light",
      text: "text-success",
      dotBg: "bg-success",
    },
    MATCHED: {
      label: "تمت المطابقة",
      bg: "bg-info-light",
      text: "text-info",
      dotBg: "bg-info",
    },
    IN_TRANSIT: {
      label: "في الطريق",
      bg: "bg-warning-light",
      text: "text-warning",
      dotBg: "bg-warning",
    },
    COMPLETED: {
      label: "مكتمل",
      bg: "bg-slate-100",
      text: "text-slate-600",
      dotBg: "bg-slate-400",
    },
    CANCELLED: {
      label: "ملغي",
      bg: "bg-error-light",
      text: "text-error",
      dotBg: "bg-error",
    },
    EXPIRED: {
      label: "منتهي",
      bg: "bg-slate-100",
      text: "text-slate-400",
      dotBg: "bg-slate-400",
    },
    URGENT: {
      label: "عاجل",
      bg: "bg-red-100",
      text: "text-red-600",
      dotBg: "bg-red-500",
    },
  };

  const item = config[status] || {
    label: status,
    bg: "bg-slate-100",
    text: "text-slate-700",
    dotBg: "bg-slate-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shrink-0",
        item.bg,
        item.text,
        className,
      )}
      {...props}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", item.dotBg)} />
      {item.label}
    </span>
  );
};
