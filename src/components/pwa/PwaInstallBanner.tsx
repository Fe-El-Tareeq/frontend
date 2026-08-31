import { useState } from "react";
import { Download, X } from "lucide-react";
import { usePWA } from "../../hooks/usePWA";
import { PwaInstallModal } from "./PwaInstallModal";

export function PwaInstallBanner() {
  const { isInstalled, isIOS, triggerInstall } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // If already installed or dismissed, don't show the banner
  if (isInstalled || isDismissed) {
    return null;
  }

  const handleInstallClick = async () => {
    const result = await triggerInstall();
    if (result === "ios" || result === "fallback") {
      setShowGuideModal(true);
    }
  };

  return (
    <>
      {/* Floating Bottom PWA Install Banner */}
      <div
        className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-[400px] animate-fade-in"
        dir="rtl"
      >
        <div className="flex items-center justify-between gap-3 rounded-3xl bg-[#123A68] p-3.5 text-white shadow-2xl ring-1 ring-white/10">
          <div className="flex items-center gap-3">
            {/* App Icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white p-1 shadow-sm">
              <img
                src="/logo.png"
                alt="بطريقك"
                className="h-full rounded-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>

            <div className="text-right">
              <h4 className="text-xs font-black text-white">تطبيق بطريقك</h4>
              <p className="text-[10px] text-white/75 leading-tight">
                ثبّت التطبيق على هاتفك لتجربة أسرع بدون إنترنت
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex h-9 items-center gap-1.5 rounded-xl bg-[#F36F21] px-3 text-[11px] font-black text-white shadow-md active:scale-95 transition-all hover:bg-[#E05E12] cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>تثبيت</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Universal Installation Instructions Modal */}
      <PwaInstallModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
        isIOS={isIOS}
      />
    </>
  );
}
