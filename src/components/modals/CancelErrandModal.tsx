import { useState, type FC } from "react";
import { X, AlertTriangle, Check } from "lucide-react";

interface CancelErrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void> | void;
  isCancelling?: boolean;
}

const CANCELLATION_REASONS = [
  "وجدت مسافراً بطريقة أخرى",
  "تغيّرت الظروف ولم أعد محتاجاً للطلب",
  "الانتظار طال كثيراً دون عروض مناسبة",
  "نشرت الطلب بالخطأ أو ببيانات غير دقيقة",
  "سبب آخر",
];

export const CancelErrandModal: FC<CancelErrandModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isCancelling = false,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>(
    CANCELLATION_REASONS[0],
  );
  const [customReason, setCustomReason] = useState("");

  if (!isOpen) return null;

  const handleConfirm = async () => {
    const finalReason =
      selectedReason === "سبب آخر"
        ? customReason.trim() || "سبب آخر"
        : selectedReason;
    await onConfirm(finalReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs text-right">
      <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#102A4C] shadow-2xl p-5 border border-slate-200 dark:border-white/10 space-y-4 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <h3 className="text-sm font-black text-rose-600 dark:text-rose-400">
                إلغاء الطلب
              </h3>
              <p className="text-[10.5px] text-text-muted dark:text-slate-400">
                يرجى اختيار سبب إلغاء هذا الطلب
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/40">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Reasons List */}
        <div className="space-y-2 pt-1">
          {CANCELLATION_REASONS.map((reason) => {
            const isSelected = selectedReason === reason;
            return (
              <button
                key={reason}
                type="button"
                onClick={() => setSelectedReason(reason)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl border text-right transition-all cursor-pointer ${isSelected
                    ? "bg-rose-50/50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700/60 ring-1 ring-rose-200 dark:ring-rose-800/40 shadow-2xs"
                    : "bg-white dark:bg-[#0B1E36] border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
              >
                <div
                  className={`flex h-4.5 w-4.5 items-center justify-center rounded-full border transition-all ${isSelected
                      ? "border-rose-600 bg-rose-600 text-white"
                      : "border-slate-300 dark:border-slate-600"
                    }`}
                >
                  {isSelected && <Check className="h-3 w-3 stroke-3" />}
                </div>

                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {reason}
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom Reason input */}
        {selectedReason === "سبب آخر" && (
          <textarea
            rows={2}
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            placeholder="اكتب سبب الإلغاء باختصار..."
            className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] p-3 text-xs text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-400 text-right focus:outline-none focus:border-rose-500 resize-none shadow-2xs"
          />
        )}

        {/* Notice */}
        <p className="text-[10.5px] text-text-muted dark:text-slate-400 text-center leading-relaxed">
          سيتم استرجاع التوكن المستخدم إلى محفظتك تلقائياً فور تأكيد الإلغاء.
        </p>

        {/* Action Buttons */}
        <div className="pt-1 flex items-center gap-2">
          <button
            type="button"
            disabled={isCancelling}
            onClick={handleConfirm}
            className="flex-1 flex h-11 items-center justify-center gap-1.5 rounded-2xl bg-[#E11D48] text-xs font-black text-white hover:bg-rose-700 active:scale-98 transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            <span>{isCancelling ? "جاري الإلغاء..." : "تأكيد إلغاء الطلب"}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 h-11 flex items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#132F54] text-xs font-bold text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 transition-all cursor-pointer"
          >
            تراجع
          </button>
        </div>
      </div>
    </div>
  );
};
