import type { FC } from "react";
import { Eye, MapPin, Star, Trash2, Send } from "lucide-react";

interface ErrandActionButtonsProps {
  isOwner: boolean;
  isWaiting: boolean;
  isInProgress: boolean;
  isCompleted: boolean;
  onViewOffers: () => void;
  onTrackOrder: () => void;
  onRateErrand: () => void;
  onOpenCancelModal: () => void;
  onSubmitOffer: () => void;
}

export const ErrandActionButtons: FC<ErrandActionButtonsProps> = ({
  isOwner,
  isWaiting,
  isInProgress,
  isCompleted,
  onViewOffers,
  onTrackOrder,
  onRateErrand,
  onOpenCancelModal,
  onSubmitOffer,
}) => {
  return (
    <>
      {/* Owner View Action Buttons */}
      {isOwner && (
        <div className="space-y-2 pt-1">
          {isWaiting && (
            <button
              type="button"
              onClick={onViewOffers}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] dark:bg-[#1E4E8C] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#0D2C50] dark:hover:bg-[#123A68]"
            >
              <Eye className="h-4 w-4" />
              <span>عرض العروض الواردة على هذا الطلب</span>
            </button>
          )}

          {isInProgress && (
            <button
              type="button"
              onClick={onTrackOrder}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#E05E12]"
            >
              <MapPin className="h-4 w-4" />
              <span>تتبع حالة توصيل الطلب</span>
            </button>
          )}

          {isCompleted && (
            <button
              type="button"
              onClick={onRateErrand}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-emerald-700"
            >
              <Star className="h-4 w-4 fill-current" />
              <span>تقييم تجربة التوصيل والمسافر</span>
            </button>
          )}

          {isWaiting && (
            <button
              type="button"
              onClick={onOpenCancelModal}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/30 text-xs font-bold text-red-600 dark:text-red-400 active:scale-98 transition-all cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/50"
            >
              <Trash2 className="h-4 w-4" />
              <span>إلغاء هذا الطلب</span>
            </button>
          )}
        </div>
      )}

      {/* Sticky Bottom Offer Proposal Button for non-owners */}
      {!isOwner && isWaiting && (
        <div className="fixed bottom-0 left-0 right-0 lg:right-72 z-30 mx-auto w-full max-w-107.5 md:max-w-md lg:max-w-lg bg-white/95 dark:bg-[#102A4C]/95 backdrop-blur-md border-t md:border border-border dark:border-white/10 p-3.5 shadow-xl md:rounded-3xl md:bottom-4 lg:bottom-6 transition-all">
          <button
            type="button"
            onClick={onSubmitOffer}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#E05E12]"
          >
            <Send className="h-4 w-4 -rotate-45" />
            <span>قدم عرضك لتوصيل الطلب (1 توكن)</span>
          </button>
        </div>
      )}
    </>
  );
};
