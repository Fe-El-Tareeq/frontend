import type { FC } from "react";
import { X, Image as ImageIcon } from "lucide-react";

interface ErrandImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  attachedImages: string[];
}

export const ErrandImageModal: FC<ErrandImageModalProps> = ({
  isOpen,
  onClose,
  attachedImages,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div
        className="relative max-w-sm w-full bg-white dark:bg-[#102A4C] border border-transparent dark:border-white/10 rounded-3xl p-4 space-y-3"
        dir="rtl"
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/10">
          <h3 className="text-xs font-bold text-primary dark:text-white">الصور المرفقة للطلب</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {attachedImages.length > 0 ? (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {attachedImages.map((url, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 max-h-64"
              >
                <img
                  src={url}
                  alt={`Errand attachment ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-text-muted dark:text-slate-400 space-y-2">
            <ImageIcon className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <p>لم يتم إرفاق صور إضافية مع هذا الطلب.</p>
          </div>
        )}
      </div>
    </div>
  );
};
