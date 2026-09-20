import { CloudOff } from "lucide-react";
import { useOfflineStatus } from "../../offline/offlineContext";

export function OfflineBanner() {
  const { isOffline, lastSyncedAt } = useOfflineStatus();
  if (!isOffline) return null;

  const lastSync = lastSyncedAt
    ? new Intl.DateTimeFormat("ar", { dateStyle: "short", timeStyle: "short" }).format(lastSyncedAt)
    : null;

  return (
    <div
      role="status"
      className="sticky top-0 z-50 flex min-h-10 items-center justify-center gap-2 bg-amber-100 px-4 py-2 text-center text-xs font-bold text-amber-950"
    >
      <CloudOff className="h-4 w-4 shrink-0" />
      <span>
        لا يوجد اتصال. البيانات المعروضة محفوظة وقد تكون قديمة
        {lastSync ? ` · آخر مزامنة ${lastSync}` : ""}
      </span>
    </div>
  );
}
