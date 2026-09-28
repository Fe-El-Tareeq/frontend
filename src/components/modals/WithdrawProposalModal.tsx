import { type FC } from "react";
import { X, AlertCircle } from "lucide-react";

interface WithdrawProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  isWithdrawing?: boolean;
}

export const WithdrawProposalModal: FC<WithdrawProposalModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isWithdrawing = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs text-right">
      <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl p-5 border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <h3 className="text-sm font-black text-[#123A68]">
                سحب العرض المقدّم
              </h3>
              <p className="text-[10.5px] text-text-muted">
                تأكيد سحب عرضك لتوصيل هذا الطلب
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200 text-xs text-slate-700 leading-relaxed text-right">
          هل أنت متأكد من رغبتك في سحب عرضك؟ سيتم إشعار صاحب الطلب بسحب العرض
          وإلغاء حجزك في هذه العملية.
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center gap-2">
          <button
            type="button"
            disabled={isWithdrawing}
            onClick={async () => {
              await onConfirm();
              onClose();
            }}
            className="flex-1 flex h-11 items-center justify-center gap-1.5 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            <span>{isWithdrawing ? "جاري السحب..." : "نعم، اسحب العرض"}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 h-11 flex items-center justify-center rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
          >
            تراجع
          </button>
        </div>
      </div>
    </div>
  );
};
