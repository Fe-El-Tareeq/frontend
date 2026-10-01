import { useState } from "react";
import {
  Scale,
  MapPin,
  Clock,
  PackageX,
  AlertTriangle,
  HelpCircle,
  XCircle,
} from "lucide-react";
import type { ErrandRequestItem } from "./TripRequestAcceptModal";

interface TripRequestRejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ErrandRequestItem | null;
  onConfirmReject: (requestId: string, reason: string) => void;
}

const REJECTION_REASONS = [
  {
    id: "capacity",
    label: "الحجم أو الوزن زائد عن سعة السيارة",
    icon: Scale,
  },
  {
    id: "route",
    label: "نقطة التسليم أو الاستلام بعيدة عن مساري",
    icon: MapPin,
  },
  {
    id: "time",
    label: "الوقت المحدد غير مناسب للالتقاء",
    icon: Clock,
  },
  {
    id: "full",
    label: "لا توجد مساحة كافية حالياً في السيارة",
    icon: PackageX,
  },
  {
    id: "safety",
    label: "عدم الارتياح لمحتوى الغرض المطلوب نقله",
    icon: AlertTriangle,
  },
  {
    id: "other",
    label: "سبب آخر (توضيح إضافي)",
    icon: HelpCircle,
  },
];

export function TripRequestRejectModal({
  isOpen,
  onClose,
  request,
  onConfirmReject,
}: TripRequestRejectModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [customNotes, setCustomNotes] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen || !request) return null;

  const handleConfirm = () => {
    if (!selectedReason) return;
    setIsProcessing(true);

    const chosenReasonObj = REJECTION_REASONS.find((r) => r.id === selectedReason);
    const reasonText =
      selectedReason === "other" && customNotes
        ? `أخرى: ${customNotes}`
        : chosenReasonObj?.label || "تم الرفض من قبل السائق";

    setTimeout(() => {
      setIsProcessing(false);
      setIsSubmitted(true);
      onConfirmReject(request.id, reasonText);
    }, 500);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setSelectedReason("");
    setCustomNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-[#102A4C] p-6 shadow-2xl text-right border border-border dark:border-white/10 max-h-[90vh] overflow-y-auto">
        {!isSubmitted ? (
          <div className="space-y-4">
            {/* Modal Header */}
            <div className="text-center space-y-1.5 pt-1">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40">
                <XCircle className="h-7 w-7" />
              </div>
              <h3 className="text-base font-black text-[#123A68] dark:text-white">
                رفض طلب التوصيل
              </h3>
              <p className="text-xs text-text-secondary dark:text-slate-400">
                يرجى اختيار سبب الرفض لمساعدة{" "}
                <span className="font-bold text-primary dark:text-white">
                  {request.requesterName}
                </span>{" "}
                في معرفة السبب
              </p>
            </div>

            {/* Reasons Radio List */}
            <div className="space-y-2 pt-1">
              {REJECTION_REASONS.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedReason === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedReason(r.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl p-3 border transition-all cursor-pointer text-right ${
                      isSelected
                        ? "border-red-500 bg-red-50/50 dark:bg-red-950/30 shadow-xs"
                        : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B1E36] hover:border-slate-300 dark:hover:border-white/20"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isSelected
                          ? "bg-red-500 text-white"
                          : "bg-slate-100 dark:bg-[#132F54] text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <span
                      className={`text-xs font-bold leading-tight flex-1 ${
                        isSelected ? "text-red-700 dark:text-red-300" : "text-primary dark:text-white"
                      }`}
                    >
                      {r.label}
                    </span>

                    <div
                      className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-red-500 bg-red-500"
                          : "border-slate-300 dark:border-white/20 bg-white dark:bg-[#0B1E36]"
                      }`}
                    >
                      {isSelected && (
                        <div className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Notes when 'other' is selected */}
            {selectedReason === "other" && (
              <div className="animate-in fade-in duration-200">
                <textarea
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="يرجى كتابة سبب الرفض هنا..."
                  rows={2}
                  className="w-full resize-none rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1E36] p-2.5 text-xs text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-500 focus:border-red-400 focus:bg-white dark:focus:bg-[#102A4C] focus:outline-none transition-all"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                disabled={
                  !selectedReason ||
                  (selectedReason === "other" && !customNotes.trim()) ||
                  isProcessing
                }
                onClick={handleConfirm}
                className="flex h-12 w-full items-center justify-center rounded-2xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white shadow-md active:scale-98 transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
              >
                {isProcessing ? "جاري التأكيد..." : "تأكيد الرفض"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-10 w-full items-center justify-center rounded-2xl text-xs font-medium text-text-secondary dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                تراجع
              </button>
            </div>
          </div>
        ) : (
          /* Confirmation Success Modal */
          <div className="space-y-4 py-3 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-[#0B1E36] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 animate-in zoom-in-75">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-black text-[#123A68] dark:text-white">
                تم رفض الطلب
              </h3>
              <p className="text-xs text-text-secondary dark:text-slate-400 leading-relaxed px-2">
                تم إشعار صاحب الطلب بسبب الرفض وإتاحة السعة لطلبات أخرى في رحلتك.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#123A68] dark:bg-[#1E4E8C] text-xs font-bold text-white shadow-md hover:bg-[#0E2E54] dark:hover:bg-[#123A68] transition-all cursor-pointer mt-3"
            >
              حسناً
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
