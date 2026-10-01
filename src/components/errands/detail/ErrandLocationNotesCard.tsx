import type { FC } from "react";
import { Image as ImageIcon } from "lucide-react";

interface ErrandLocationNotesCardProps {
  cityName: string;
  neighborhoodName: string;
  generalNoteText: string | null;
  attachedImages: string[];
  onOpenImageModal: () => void;
}

export const ErrandLocationNotesCard: FC<ErrandLocationNotesCardProps> = ({
  cityName,
  neighborhoodName,
  generalNoteText,
  attachedImages,
  onOpenImageModal,
}) => {
  return (
    <>
      {/* 1. City Card */}
      <div className="rounded-2xl bg-[#F8FAFC] dark:bg-[#102A4C] p-3.5 border border-slate-100/80 dark:border-white/10 text-right space-y-0.5">
        <span className="text-[11px] text-slate-400 font-medium block">
          المدينة المطلوبة
        </span>
        <span className="text-base font-black text-[#123A68] dark:text-white block">
          {cityName}
        </span>
      </div>

      {/* 2. Neighborhood Card */}
      <div className="rounded-2xl bg-[#F8FAFC] dark:bg-[#102A4C] p-3.5 border border-slate-100/80 dark:border-white/10 text-right space-y-0.5">
        <span className="text-[11px] text-slate-400 font-medium block">
          الحي
        </span>
        <span className="text-base font-black text-[#123A68] dark:text-white block">
          {neighborhoodName}
        </span>
      </div>

      {/* 3. General Notes & Image Attachment Card */}
      <div className="rounded-2xl bg-[#F8FAFC] dark:bg-[#102A4C] p-3.5 border border-slate-100/80 dark:border-white/10 text-right flex items-center justify-between gap-3">
        {/* Notes Text on Right */}
        <div className="space-y-0.5 text-right flex-1">
          <span className="text-[11px] text-slate-400 font-medium block">
            ملاحظات عامة من الطالب
          </span>
          <p className="text-sm font-black text-[#123A68] dark:text-white leading-relaxed">
            {generalNoteText || "لا توجد ملاحظات إضافية."}
          </p>
        </div>

        {/* Attached Image Thumbnail Icon on Left */}
        {attachedImages.length > 0 ? (
          <button
            type="button"
            onClick={onOpenImageModal}
            className="relative flex items-center justify-center h-11 w-11 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B1E36] hover:border-[#123A68] dark:hover:border-accent transition-all cursor-pointer shrink-0 overflow-hidden shadow-2xs group"
            title="عرض الصور المرفقة"
          >
            <img
              src={attachedImages[0]}
              alt="Thumbnail"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform"
            />
          </button>
        ) : (
          <div
            className="p-1.5 text-slate-300 dark:text-slate-600 rounded-xl shrink-0 cursor-default"
            title="لا توجد صور مرفقة"
          >
            <ImageIcon className="h-6 w-6 stroke-[1.5]" />
          </div>
        )}
      </div>
    </>
  );
};
