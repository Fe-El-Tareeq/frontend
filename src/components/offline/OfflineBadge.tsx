import { CloudOff } from "lucide-react";

interface OfflineBadgeProps {
  label?: string;
  className?: string;
}

export function OfflineBadge({
  label = "بانتظار المزامنة",
  className = "",
}: OfflineBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-2xs font-bold bg-amber-100 text-amber-800 border border-amber-200 ${className}`}
    >
      <CloudOff className="w-3 h-3 text-amber-600" />
      <span>{label}</span>
    </span>
  );
}
