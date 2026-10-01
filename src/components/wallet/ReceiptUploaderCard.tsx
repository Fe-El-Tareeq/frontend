import type { FC, RefObject, ChangeEvent } from "react";
import { Upload, FileCheck, X, AlertCircle } from "lucide-react";

interface ReceiptUploaderCardProps {
  receiptFile: File | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  showWarning: boolean;
}

export const ReceiptUploaderCard: FC<ReceiptUploaderCardProps> = ({
  receiptFile,
  fileInputRef,
  onFileChange,
  onRemoveFile,
  showWarning,
}) => {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-xs space-y-3.5 text-right">
      <h3 className="text-xs font-black text-[#123A68] dark:text-white border-b border-slate-100 dark:border-white/10 pb-2">
        إرفاق إشعار التحويل البنكي
      </h3>

      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept="image/*,.pdf"
        className="hidden"
      />

      {!receiptFile ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 hover:border-[#123A68]/40 dark:hover:border-accent/40 bg-[#F8FAFC] dark:bg-[#0B1E36] hover:bg-blue-50/20 dark:hover:bg-[#132F54]/40 text-center transition-all cursor-pointer space-y-2"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 dark:bg-[#132F54] text-[#123A68] dark:text-blue-300">
            <Upload className="h-5 w-5" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-black text-[#123A68] dark:text-white block">
              اضغط لرفع صورة الإشعار أو ملف PDF
            </span>
            <span className="text-[10.5px] text-text-muted dark:text-slate-400 block">
              صورة واضحة توضح رقم الحساب والمبلغ وتاريخ التحويل
            </span>
          </div>
        </button>
      ) : (
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 text-right">
          <button
            type="button"
            onClick={onRemoveFile}
            className="p-1 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 block truncate max-w-[160px]">
                {receiptFile.name}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">
                {(receiptFile.size / 1024).toFixed(1)} KB • جاهز للإرسال
              </span>
            </div>
            <FileCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          </div>
        </div>
      )}

      {showWarning && !receiptFile && (
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>يرجى رفع إشعار التحويل لتتمكن من إتمام الطلب ومراجعته.</span>
        </div>
      )}
    </div>
  );
};
