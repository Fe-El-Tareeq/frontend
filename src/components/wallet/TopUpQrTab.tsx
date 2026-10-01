import type { FC } from "react";
import { Zap, Check, Download } from "lucide-react";

interface TopUpQrTabProps {
  onCompleted: () => void;
  onSaveQr: () => void;
}

export const TopUpQrTab: FC<TopUpQrTabProps> = ({
  onCompleted,
  onSaveQr,
}) => {
  return (
    <div className="space-y-4 text-center animate-in fade-in duration-200">
      {/* Stylized QR Code matching Figma */}
      <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-3xl bg-[#F8FAFC] dark:bg-[#0B1E36] p-3 border border-slate-200 dark:border-white/10 shadow-inner">
        <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-white p-2">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full text-[#123A68] fill-current"
          >
            {/* Outer positioning squares */}
            <rect
              x="5"
              y="5"
              width="28"
              height="28"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
            />
            <rect x="12" y="12" width="14" height="14" rx="2" />
            <rect
              x="67"
              y="5"
              width="28"
              height="28"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
            />
            <rect x="74" y="12" width="14" height="14" rx="2" />
            <rect
              x="5"
              y="67"
              width="28"
              height="28"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
            />
            <rect x="12" y="74" width="14" height="14" rx="2" />
            {/* Dense Pattern */}
            <rect x="38" y="8" width="6" height="6" rx="1" />
            <rect x="48" y="14" width="6" height="6" rx="1" />
            <rect x="56" y="8" width="6" height="6" rx="1" />
            <rect x="8" y="38" width="6" height="6" rx="1" />
            <rect x="18" y="46" width="6" height="6" rx="1" />
            <rect x="26" y="38" width="6" height="6" rx="1" />
            <rect x="38" y="38" width="6" height="6" rx="1" />
            <rect x="48" y="46" width="6" height="6" rx="1" />
            <rect x="56" y="38" width="6" height="6" rx="1" />
            <rect x="68" y="38" width="6" height="6" rx="1" />
            <rect x="78" y="46" width="6" height="6" rx="1" />
            <rect x="86" y="38" width="6" height="6" rx="1" />
            <rect x="38" y="68" width="6" height="6" rx="1" />
            <rect x="48" y="78" width="6" height="6" rx="1" />
            <rect x="56" y="68" width="6" height="6" rx="1" />
            <rect x="68" y="68" width="6" height="6" rx="1" />
            <rect x="78" y="78" width="6" height="6" rx="1" />
            <rect x="86" y="68" width="6" height="6" rx="1" />
          </svg>

          {/* Center Lightning Badge */}
          <div className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md border border-orange-100">
            <Zap className="h-5 w-5 text-[#F36F21] fill-[#F36F21]" />
          </div>
        </div>
      </div>

      {/* Numbered Steps */}
      <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200 text-right pt-1 font-bold">
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] dark:bg-[#1E4E8C] text-white font-black text-[11px]">
            ١
          </span>
          <span>افتح تطبيق جوال باي أو البنك على هاتفك</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] dark:bg-[#1E4E8C] text-white font-black text-[11px]">
            ٢
          </span>
          <span>اختر «دفع برمز QR» أو «مسح رمز»</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] dark:bg-[#1E4E8C] text-white font-black text-[11px]">
            ٣
          </span>
          <span>وجّه الكاميرا نحو الباركود أعلاه</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] dark:bg-[#1E4E8C] text-white font-black text-[11px]">
            ٤
          </span>
          <span>راجع المبلغ وأكّد العملية</span>
        </div>
      </div>

      {/* Bottom Dual Action Buttons */}
      <div className="pt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={onCompleted}
          className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-[#123A68] dark:bg-accent text-white hover:bg-[#0D2C50] dark:hover:bg-[#E05E12] active:scale-98 transition-all cursor-pointer shadow-md"
        >
          <Check className="h-4 w-4 stroke-3" />
          <span>لقد أتممت الدفع</span>
        </button>

        <button
          type="button"
          onClick={onSaveQr}
          className="flex h-12 px-4 items-center justify-center gap-1.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#132F54] text-xs font-black text-[#123A68] dark:text-white hover:border-slate-300 dark:hover:border-white/20 active:scale-98 transition-all cursor-pointer"
        >
          <Download className="h-4 w-4" />
          <span>حفظ 📥</span>
        </button>
      </div>
    </div>
  );
};
