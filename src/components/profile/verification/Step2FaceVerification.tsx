import type { FC, RefObject, ChangeEvent } from "react";
import {
  Camera,
  Trash2,
  Check,
  ArrowLeft,
  SunMedium,
  ScanFace,
  CheckCircle2,
  Eye,
} from "lucide-react";

interface Step2FaceVerificationProps {
  holdingIdImage: File | null;
  holdingIdPreview: string | null;
  holdingIdInputRef: RefObject<HTMLInputElement | null>;
  holdingIdCameraInputRef: RefObject<HTMLInputElement | null>;
  onHoldingIdChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveHoldingId: () => void;
  onOpenLiveCamera: (mode: "selfie") => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Step2FaceVerification: FC<Step2FaceVerificationProps> = ({
  holdingIdImage,
  holdingIdPreview,
  holdingIdInputRef,
  holdingIdCameraInputRef,
  onHoldingIdChange,
  onRemoveHoldingId,
  onOpenLiveCamera,
  onPrev,
  onNext,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* 2-Column Responsive Layout for Tablet & Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Guidance & Checklist (5 cols on lg) */}
        <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#102A4C] p-6 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 text-[#123A68] dark:text-white pb-3 border-b border-slate-100 dark:border-white/5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/40 text-accent shrink-0">
              <ScanFace className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-black">تعليمات الصورة الشخصية</h3>
              <p className="text-[11px] text-text-muted dark:text-slate-400">
                لضمان سرعة قبول الطلب
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0B1E36]/40 border border-slate-200/70 dark:border-white/5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
                أمسك بطاقة الهوية بجانب وجهك بوضوح دون تغطية أي جزء من ملامحك.
              </p>
            </div>

            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0B1E36]/40 border border-slate-200/70 dark:border-white/5">
              <SunMedium className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
                تأكد من وجود إضاءة طبيعية واضحة وعدم وجود ظلال أو توهج على بيانات البطاقة.
              </p>
            </div>

            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0B1E36]/40 border border-slate-200/70 dark:border-white/5">
              <Eye className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
                انزع النظارات الشمسية أو القبعات لضمان تطابق الوجه مع المستند.
              </p>
            </div>
          </div>
        </div>

        {/* Capture / Upload Area (7 cols on lg) */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#102A4C] p-6 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
            <h3 className="text-sm font-black text-[#123A68] dark:text-white">
              التقاط الصورة الشخصية مع الهوية
            </h3>
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-950/40 text-xs font-black text-accent">
              سيلفي
            </span>
          </div>

          <input
            ref={holdingIdInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/*"
            className="hidden"
            onChange={onHoldingIdChange}
          />
          <input
            ref={holdingIdCameraInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/*"
            capture="user"
            className="hidden"
            onChange={onHoldingIdChange}
          />

          {!holdingIdImage ? (
            <div className="space-y-3.5 flex-1 flex flex-col justify-center py-2">
              <button
                type="button"
                onClick={() => onOpenLiveCamera("selfie")}
                className="w-full flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-[#123A68]/30 dark:border-white/15 hover:border-accent dark:hover:border-accent bg-blue-50/40 dark:bg-[#0B1E36]/40 hover:bg-orange-50/30 dark:hover:bg-[#0B1E36]/70 text-center transition-all cursor-pointer space-y-3 group"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#123A68] text-white shadow-md group-hover:scale-105 transition-transform">
                  <Camera className="h-7 w-7 text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-black text-[#123A68] dark:text-white block">
                    التقاط سيلفي بالكاميرا الآن
                  </span>
                  <span className="text-xs text-text-muted dark:text-slate-400">
                    يفتح الكاميرا مع إطار مخصص لتوجيه الوجه والبطاقة
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => holdingIdInputRef.current?.click()}
                className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-center cursor-pointer shadow-2xs"
              >
                أو اختيار صورة موجودة من الجهاز
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="h-56 w-full rounded-2xl bg-slate-100 dark:bg-[#0B1E36]/60 border border-slate-200/80 dark:border-white/10 overflow-hidden relative group">
                {holdingIdPreview && (
                  <img
                    src={holdingIdPreview}
                    alt="Selfie ID Preview"
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenLiveCamera("selfie")}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#102A4C] text-slate-800 dark:text-white border border-transparent dark:border-white/10 text-xs font-bold shadow-md cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10"
                  >
                    إعادة التقاط
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-between">
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200 block truncate max-w-[200px]">
                    {holdingIdImage.name}
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>تم التقاط وحفظ الصورة بنجاح</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onRemoveHoldingId}
                  className="p-2 rounded-xl bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors cursor-pointer"
                  title="حذف الصورة"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between p-4 rounded-3xl bg-white dark:bg-[#102A4C] border border-slate-200/90 dark:border-white/10 shadow-2xs">
        <button
          type="button"
          onClick={onPrev}
          className="h-12 px-6 rounded-2xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
        >
          السابق
        </button>

        <button
          type="button"
          disabled={!holdingIdImage}
          onClick={onNext}
          className="flex h-12 w-full sm:w-60 items-center justify-center gap-2 rounded-2xl bg-[#123A68] hover:bg-[#0D2C50] text-sm font-black text-white active:scale-98 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-md"
        >
          <span>المتابعة للمراجعة</span>
          <ArrowLeft className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
