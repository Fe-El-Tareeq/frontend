import React from "react";
import { X } from "lucide-react";

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  imageUrl?: string | null;
  placeholderText?: string;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle = "في التطبيق الفعلي ستظهر الصورة الأصلية المرسلة من المستخدم",
  imageUrl,
  placeholderText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0F223A] border border-[#1E3A5F] p-6 shadow-2xl text-right">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E3A5F]/60">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-[#1E3A5F] hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-black text-white">{title}</h3>
        </div>

        {/* Content Preview Container */}
        <div className="my-6 flex flex-col items-center justify-center rounded-xl bg-[#091626] border border-[#1E3A5F] min-h-[260px] p-6">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="max-h-[360px] max-w-full rounded-lg object-contain shadow-md"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center space-y-3">
              <div className="h-16 w-16 rounded-2xl bg-[#1E3A5F]/50 flex items-center justify-center text-3xl shadow-inner">
                📄
              </div>
              <p className="text-base font-bold text-slate-200">
                {placeholderText || title}
              </p>
            </div>
          )}
        </div>

        {/* Footer Subtitle */}
        <p className="text-center text-xs text-slate-400 font-medium">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
