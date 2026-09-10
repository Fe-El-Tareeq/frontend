import { useState } from "react";
import { CheckCircle2, ShieldCheck, MessageSquare, ArrowRight, Package } from "lucide-react";

export interface ErrandRequestItem {
  id: string;
  requesterName: string;
  requesterAvatar?: string;
  requesterRating: number;
  requesterPhone?: string;
  itemDescription: string;
  weightKg?: number;
  pickupLocation: string;
  dropoffLocation: string;
  rewardTokens?: number;
}

interface TripRequestAcceptModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ErrandRequestItem | null;
  onConfirmAccept: (requestId: string) => void;
  onOpenChat?: (requestId: string) => void;
}

export function TripRequestAcceptModal({
  isOpen,
  onClose,
  request,
  onConfirmAccept,
  onOpenChat,
}: TripRequestAcceptModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !request) return null;

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onConfirmAccept(request.id);
    }, 600);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  const handleChat = () => {
    handleClose();
    if (onOpenChat) {
      onOpenChat(request.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-right border border-border">
        {!isSuccess ? (
          <div className="space-y-4">
            {/* Modal Header */}
            <div className="text-center space-y-1.5 pt-1">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Package className="h-7 w-7" />
              </div>
              <h3 className="text-base font-black text-[#123A68]">
                قبول طلب التوصيل
              </h3>
              <p className="text-xs text-text-secondary">
                أنت على وشك قبول نقل غرض جديد في مسار رحلتك
              </p>
            </div>

            {/* Requester & Errand Details Card */}
            <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123A68] text-xs font-black text-white">
                    {request.requesterAvatar ? (
                      <img
                        src={request.requesterAvatar}
                        alt={request.requesterName}
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      request.requesterName.slice(0, 2)
                    )}
                  </div>
                  <div className="text-right">
                    <h4 className="text-xs font-black text-primary">
                      {request.requesterName}
                    </h4>
                    <span className="text-[10px] text-amber-600 font-bold">
                      ⭐ {request.requesterRating} (عميل موثوق)
                    </span>
                  </div>
                </div>
                {request.rewardTokens && (
                  <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-black text-[#F36F21]">
                    +{request.rewardTokens} توكن
                  </span>
                )}
              </div>

              <div className="border-t border-slate-200/70 pt-2 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[11px] text-text-muted">محتوى الغرض:</span>
                  <span className="text-[11px] font-bold text-primary">
                    {request.itemDescription}
                  </span>
                </div>
                {request.weightKg && (
                  <div className="flex justify-between">
                    <span className="text-[11px] text-text-muted">الوزن التقديري:</span>
                    <span className="text-[11px] font-bold text-primary">
                      {request.weightKg} كغم
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[11px] text-text-muted">المسار:</span>
                  <span className="text-[11px] font-bold text-primary">
                    {request.pickupLocation} ← {request.dropoffLocation}
                  </span>
                </div>
              </div>
            </div>

            {/* Responsibility Notice */}
            <div className="flex items-start gap-2.5 rounded-2xl bg-emerald-50/70 p-3 border border-emerald-200/80 text-[11px] text-emerald-900 leading-relaxed">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                بتأكيد القبول، سيتم إشعار صاحب الطلب وحجز السعة في رحلتك وتنسيق الاستلام عبر الشات.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleConfirm}
                className="flex h-12 w-full items-center justify-center rounded-2xl bg-emerald-600 text-xs font-bold text-white shadow-md hover:bg-emerald-700 active:scale-98 transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? "جاري التأكيد..." : "تأكيد قبول الطلب ✓"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-10 w-full items-center justify-center rounded-2xl text-xs font-medium text-text-secondary hover:bg-slate-100 transition-all cursor-pointer"
              >
                تراجع
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Confirmed Success Modal */
          <div className="space-y-5 py-3 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 animate-in zoom-in-75">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-black text-[#123A68]">
                تم قبول الطلب بنجاح!
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed px-2">
                تم حجز السعة وإرسال إشعار فوري لـ{" "}
                <span className="font-bold text-primary">
                  {request.requesterName}
                </span>
                . يمكنك الآن بدء المحادثة وتنسيق نقطة اللقاء.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleChat}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-bold text-white shadow-md hover:bg-[#0E2E54] active:scale-98 transition-all cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                <span>محادثة صاحب الطلب</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="flex h-11 w-full items-center justify-center gap-1.5 rounded-2xl border border-slate-200 text-xs font-medium text-text-secondary hover:bg-slate-50 transition-all cursor-pointer"
              >
                <span>العودة لتفاصيل الرحلة</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
