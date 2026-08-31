import { useState } from "react";
import {
  X,
  Share,
  PlusSquare,
  CheckCircle,
  MoreVertical,
  Download,
  Copy,
  Check,
  Smartphone,
  Apple,
  Zap,
} from "lucide-react";
import { usePWA } from "../../hooks/usePWA";

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isIOS?: boolean;
}

export function PwaInstallModal({ isOpen, onClose, isIOS: initialIsIOS = false }: PwaInstallModalProps) {
  const [activeTab, setActiveTab] = useState<"android" | "ios">(initialIsIOS ? "ios" : "android");
  const [copied, setCopied] = useState(false);
  const { hasDeferredPrompt, triggerInstall } = usePWA();

  if (!isOpen) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectAndroidInstall = async () => {
    const result = await triggerInstall();
    if (result === "accepted" || result === "prompted") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in"
      dir="rtl"
      onClick={onClose}
    >
      <div
        className="w-full max-w-100 rounded-3xl bg-white p-5 text-right text-text-primary shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-[#F36F21]">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-[#123A68]">
                تنزيل وتثبيت تطبيق بطريقك
              </h3>
              <p className="text-[10.5px] text-text-muted">
                يعمل على جميع أجهزة Android و iOS
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Device Switcher Tabs (iOS / Android) */}
        <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("android")}
            className={`flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "android"
                ? "bg-white text-[#123A68] shadow-xs"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Smartphone className="h-4 w-4 text-[#F36F21]" />
            <span>أندرويد (Android)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ios")}
            className={`flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "ios"
                ? "bg-white text-[#123A68] shadow-xs"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Apple className="h-4 w-4 text-[#123A68]" />
            <span>آيفون (Apple iOS)</span>
          </button>
        </div>

        {/* Tab 1: Android Guide & 1-Click Action */}
        {activeTab === "android" && (
          <div className="space-y-3 animate-fade-in text-xs text-text-secondary leading-relaxed">
            {hasDeferredPrompt && (
              <button
                type="button"
                onClick={handleDirectAndroidInstall}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md hover:bg-[#E05E12] active:scale-98 transition-all cursor-pointer mb-2"
              >
                <Zap className="h-4 w-4 fill-white" />
                <span>تثبيت فوري الآن على أندرويد</span>
              </button>
            )}

            <div className="flex items-start gap-2.5 rounded-2xl bg-[#F8FAFC] border border-slate-100 p-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                1
              </div>
              <p>
                افتح الموقع عبر متصفح <span className="font-bold text-[#123A68]">Chrome</span> أو <span className="font-bold text-[#123A68]">Samsung Internet</span>.
              </p>
            </div>

            <div className="flex items-start gap-2.5 rounded-2xl bg-[#F8FAFC] border border-slate-100 p-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                2
              </div>
              <p>
                اضغط على زر القائمة <MoreVertical className="inline h-4 w-4 mx-1 text-slate-700" /> في زاوية المتصفح العلوية.
              </p>
            </div>

            <div className="flex items-start gap-2.5 rounded-2xl bg-[#F8FAFC] border border-slate-100 p-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                3
              </div>
              <p>
                اختر <span className="font-bold text-[#F36F21]">"تثبيت التطبيق" (Install App)</span> أو <span className="font-bold text-[#123A68]">"إضافة إلى الشاشة الرئيسية"</span>.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Apple iOS Guide */}
        {activeTab === "ios" && (
          <div className="space-y-3 animate-fade-in text-xs text-text-secondary leading-relaxed">
            <div className="flex items-start gap-2.5 rounded-2xl bg-[#F8FAFC] border border-slate-100 p-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                1
              </div>
              <p>
                افتح الرابط في متصفح <span className="font-bold text-[#123A68]">Safari</span> على الآيفون.
              </p>
            </div>

            <div className="flex items-start gap-2.5 rounded-2xl bg-[#F8FAFC] border border-slate-100 p-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                2
              </div>
              <p>
                اضغط على زر المشاركة <Share className="inline h-4 w-4 mx-1 text-blue-600" /> في أسفل شاشة Safari.
              </p>
            </div>

            <div className="flex items-start gap-2.5 rounded-2xl bg-[#F8FAFC] border border-slate-100 p-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                3
              </div>
              <p>
                مرر للأسفل واختر <span className="font-bold text-[#123A68]">"إضافة إلى الصفحة الرئيسية"</span> <PlusSquare className="inline h-4 w-4 mx-1 text-slate-700" /> ثم اضغط <span className="font-bold text-[#F36F21]">"إضافة" (Add)</span>.
              </p>
            </div>
          </div>
        )}

        {/* Copy Link Helper */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-[#F8FAFC] p-2.5 text-xs">
          <span className="text-[11px] text-text-secondary font-medium truncate max-w-50">
            {window.location.origin}
          </span>
          <button
            type="button"
            onClick={handleCopyUrl}
            className="flex items-center gap-1 text-[11px] font-bold text-[#F36F21] hover:underline cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-600">تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>نسخ الرابط</span>
              </>
            )}
          </button>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-full items-center justify-center gap-1.5 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-md"
        >
          <CheckCircle className="h-4 w-4" />
          <span>تم، إغلاق الدليل</span>
        </button>
      </div>
    </div>
  );
}
