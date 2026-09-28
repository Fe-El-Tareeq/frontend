import { useState, useEffect } from "react";
import {
  WifiOff,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  X,
} from "lucide-react";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";

export function OfflineStatusBar() {
  const {
    isOffline,
    pendingCount,
    isSyncing,
    hoursRemaining,
    minutesRemaining,
    showExpiredNotice,
    purgedCount,
    lastSyncResult,
    triggerSync,
    dismissExpiredNotice,
  } = useNetworkStatus();

  const [showSyncSuccess, setShowSyncSuccess] = useState(false);

  useEffect(() => {
    if (lastSyncResult && lastSyncResult.synced > 0 && !isSyncing) {
      setShowSyncSuccess(true);
      const timer = setTimeout(() => {
        setShowSyncSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [lastSyncResult, isSyncing]);

  return (
    <>
      {/* 48-Hour Expiration Warning Modal */}
      {showExpiredNotice && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-red-100 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-xs">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-gray-900">
                انتهاء صلاحية التخزين المؤقت (48 ساعة)
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                مرّت أكثر من 48 ساعة دون اتصال بالإنترنت. حفاظاً على أمان ومطابقة
                بيانات الطلبات والرحلات مع النظام، تم حذف{" "}
                <span className="font-bold text-red-600">
                  {purgedCount > 0
                    ? `${purgedCount} عمليات معلقة`
                    : "البيانات المؤقتة"}
                </span>
                . يمكنك متابعة استخدام التطبيق بشكل طبيعي فور استقرار الاتصال.
              </p>
            </div>

            <button
              type="button"
              onClick={dismissExpiredNotice}
              className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition-all shadow-md active:scale-98"
            >
              فهمت ذلك
            </button>
          </div>
        </div>
      )}

      {/* Offline Status Top Floating Banner */}
      {isOffline && (
        <div
          role="status"
          aria-live="polite"
          className="bg-amber-500 text-white px-4 py-2.5 shadow-md flex items-center justify-between text-xs sm:text-sm font-medium z-40 sticky top-0 border-b border-amber-600/30"
        >
          <div className="flex items-center gap-2.5">
            <span className="p-1 rounded-full bg-white/20">
              <WifiOff className="w-4 h-4 animate-pulse" />
            </span>
            <div>
              <span className="font-bold">
                أنت تعمل دون اتصال بالإنترنت (أوفلاين)
              </span>
              {pendingCount > 0 && (
                <span className="mr-1 opacity-90">
                  • يوجد ({pendingCount}) عمليات بانتظار المزامنة
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 bg-black/15 px-2.5 py-1 rounded-lg text-2xs sm:text-xs">
            <Clock className="w-3.5 h-3.5 opacity-80" />
            <span>
              صلاحية المزامنة: {hoursRemaining} س {minutesRemaining} د
            </span>
          </div>
        </div>
      )}

      {/* Online but Has Pending Queue (Manual Sync Trigger) */}
      {!isOffline && pendingCount > 0 && !isSyncing && (
        <div
          role="status"
          aria-live="polite"
          className="bg-primary/95 backdrop-blur-xs text-white px-4 py-2 shadow-md flex items-center justify-between text-xs sm:text-sm font-medium z-40 sticky top-0 border-b border-white/10"
        >
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-accent" />
            <span>يوجد {pendingCount} عملية محفوظة محلياً بانتظار المزامنة</span>
          </div>
          <button
            type="button"
            onClick={() => triggerSync()}
            className="px-3 py-1 bg-accent hover:bg-accent/90 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            مزامنة الآن
          </button>
        </div>
      )}

      {/* Syncing in Progress Indicator */}
      {!isOffline && isSyncing && (
        <div
          role="status"
          aria-live="polite"
          className="bg-primary text-white px-4 py-2 shadow-md flex items-center justify-between text-xs sm:text-sm font-medium z-40 sticky top-0"
        >
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-accent" />
            <span>جاري مزامنة البيانات المعلقة مع الخادم...</span>
          </div>
          <span className="text-2xs opacity-80">يرجى الانتظار</span>
        </div>
      )}

      {/* Sync Success Toast */}
      {!isOffline && showSyncSuccess && !isSyncing && (
        <div
          role="status"
          aria-live="polite"
          className="bg-emerald-600 text-white px-4 py-2 shadow-md flex items-center justify-between text-xs sm:text-sm font-medium z-40 sticky top-0 animate-in slide-in-from-top duration-300"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>
              تمت مزامنة {lastSyncResult?.synced} عملية معلقة بنجاح!
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowSyncSuccess(false)}
            className="p-1 hover:bg-white/20 rounded-lg"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
}
