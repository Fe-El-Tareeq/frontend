import type { FC, RefObject, ChangeEvent } from "react";
import {
  FileText,
  Camera,
  Trash2,
  Check,
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";

interface Step1DocumentsUploadProps {
  frontImage: File | null;
  frontPreview: string | null;
  backImage: File | null;
  backPreview: string | null;
  frontInputRef: RefObject<HTMLInputElement | null>;
  frontCameraInputRef: RefObject<HTMLInputElement | null>;
  backInputRef: RefObject<HTMLInputElement | null>;
  backCameraInputRef: RefObject<HTMLInputElement | null>;
  onFrontChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBackChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveFront: () => void;
  onRemoveBack: () => void;
  onOpenLiveCamera: (mode: "id_front" | "id_back") => void;
  onNext: () => void;
}

export const Step1DocumentsUpload: FC<Step1DocumentsUploadProps> = ({
  frontImage,
  frontPreview,
  backImage,
  backPreview,
  frontInputRef,
  frontCameraInputRef,
  backInputRef,
  backCameraInputRef,
  onFrontChange,
  onBackChange,
  onRemoveFront,
  onRemoveBack,
  onOpenLiveCamera,
  onNext,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-right">
      {/* Blue Info Banner */}
      <div className="flex items-start gap-3 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 p-4 sm:p-5 border border-blue-200/80 dark:border-blue-900/40">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/60 text-[#123A68] dark:text-blue-300 shrink-0">
          <FileText className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm font-black text-[#123A68] dark:text-blue-200">
            تعليمات رفع بطاقة الهوية الوطنية
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-bold">
            ارفع صورة واضحة من بطاقة هويتك الوطنية — الوجهين الأمامي والخلفي — في إضاءة جيدة وبدون انعكاسات ضوئية.
          </p>
        </div>
      </div>

      {/* Grid: 2 Columns on Tablet / Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Front Side Card */}
        <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 sm:p-6 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-950/40 text-xs font-black text-accent">
                1
              </span>
              <h3 className="text-sm font-black text-[#123A68] dark:text-white">
                بطاقة الهوية — الوجه الأمامي
              </h3>
            </div>
            {frontImage && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>جاهز</span>
              </span>
            )}
          </div>

          <input
            ref={frontInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/*"
            className="hidden"
            onChange={onFrontChange}
          />
          <input
            ref={frontCameraInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/*"
            capture="environment"
            className="hidden"
            onChange={onFrontChange}
          />

          {!frontImage ? (
            <div className="space-y-3 flex-1 flex flex-col justify-center">
              <button
                type="button"
                onClick={() => frontInputRef.current?.click()}
                className="w-full flex-1 min-h-[180px] flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-accent dark:hover:border-accent bg-slate-50/70 dark:bg-[#0B1E36]/50 hover:bg-orange-50/20 dark:hover:bg-[#0B1E36]/80 text-center transition-all cursor-pointer space-y-3 group"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-[#102A4C] border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300 group-hover:text-accent shadow-xs transition-colors">
                  <UploadCloud className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs sm:text-sm font-black text-[#123A68] dark:text-white block">
                    اسحب وأفلت الصورة هنا أو اضغط للتصفح
                  </span>
                  <span className="text-[11px] text-text-muted dark:text-slate-400 block">
                    صورة الوجه الأمامي كاملة وبدقة عالية
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onOpenLiveCamera("id_front")}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-[#123A68] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <Camera className="h-4 w-4 text-[#F36F21]" />
                <span>التقاط بالكاميرا</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="h-44 w-full rounded-2xl bg-slate-100 dark:bg-[#0B1E36]/60 border border-slate-200/80 dark:border-white/10 overflow-hidden relative group">
                {frontPreview && (
                  <img
                    src={frontPreview}
                    alt="Front ID Preview"
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => frontInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#102A4C] text-slate-800 dark:text-white border border-transparent dark:border-white/10 text-xs font-bold shadow-md cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10"
                  >
                    تغيير الصورة
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-between">
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200 block truncate max-w-[170px]">
                    {frontImage.name}
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>تم الرفع بنجاح</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onRemoveFront}
                  className="p-2 rounded-xl bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors cursor-pointer"
                  title="حذف الصورة"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. Back Side Card */}
        <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 sm:p-6 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-950/40 text-xs font-black text-accent">
                2
              </span>
              <h3 className="text-sm font-black text-[#123A68] dark:text-white">
                بطاقة الهوية — الوجه الخلفي
              </h3>
            </div>
            {backImage && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>جاهز</span>
              </span>
            )}
          </div>

          <input
            ref={backInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/*"
            className="hidden"
            onChange={onBackChange}
          />
          <input
            ref={backCameraInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/*"
            capture="environment"
            className="hidden"
            onChange={onBackChange}
          />

          {!backImage ? (
            <div className="space-y-3 flex-1 flex flex-col justify-center">
              <button
                type="button"
                onClick={() => backInputRef.current?.click()}
                className="w-full flex-1 min-h-[180px] flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-accent dark:hover:border-accent bg-slate-50/70 dark:bg-[#0B1E36]/50 hover:bg-orange-50/20 dark:hover:bg-[#0B1E36]/80 text-center transition-all cursor-pointer space-y-3 group"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-[#102A4C] border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300 group-hover:text-accent shadow-xs transition-colors">
                  <UploadCloud className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs sm:text-sm font-black text-[#123A68] dark:text-white block">
                    اسحب وأفلت الصورة هنا أو اضغط للتصفح
                  </span>
                  <span className="text-[11px] text-text-muted dark:text-slate-400 block">
                    صورة الوجه الخلفي تظهر الرقم القومي والباركود
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onOpenLiveCamera("id_back")}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold text-[#123A68] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <Camera className="h-4 w-4 text-[#F36F21]" />
                <span>التقاط بالكاميرا</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="h-44 w-full rounded-2xl bg-slate-100 dark:bg-[#0B1E36]/60 border border-slate-200/80 dark:border-white/10 overflow-hidden relative group">
                {backPreview && (
                  <img
                    src={backPreview}
                    alt="Back ID Preview"
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => backInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#102A4C] text-slate-800 dark:text-white border border-transparent dark:border-white/10 text-xs font-bold shadow-md cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10"
                  >
                    تغيير الصورة
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-between">
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200 block truncate max-w-[170px]">
                    {backImage.name}
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>تم الرفع بنجاح</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onRemoveBack}
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

      {/* Bottom Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-[#102A4C] border border-slate-200/90 dark:border-white/10 shadow-2xs">
        <div className="text-xs text-text-muted dark:text-slate-400 font-bold">
          {frontImage && backImage ? (
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Check className="h-4 w-4 stroke-3" />
              <span>تم رفع الوجهين بنجاح. يمكنك الآن المتابعة للخطوة التالية.</span>
            </span>
          ) : (
            <span>يرجى رفع صورة الوجه الأمامي والوجه الخلفي للمتابعة</span>
          )}
        </div>

        <button
          type="button"
          disabled={!frontImage || !backImage}
          onClick={onNext}
          className="flex h-12 w-full sm:w-64 items-center justify-center gap-2 rounded-2xl bg-[#123A68] hover:bg-[#0D2C50] text-sm font-black text-white active:scale-98 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-md shrink-0"
        >
          <span>المتابعة للتحقق من الوجه</span>
          <ArrowLeft className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
