import { useState } from "react";
import type { FC } from "react";
import { Menu, Download } from "lucide-react";
import { usePWA } from "../../hooks/usePWA";
import { PwaInstallModal } from "../pwa/PwaInstallModal";

interface LandingHeaderProps {
  onOpenMenu: () => void;
  onNavigateHome: () => void;
}

export const LandingHeader: FC<LandingHeaderProps> = ({
  onOpenMenu,
  onNavigateHome,
}) => {
  const { isInstalled, isIOS, triggerInstall } = usePWA();
  const [showInstallModal, setShowInstallModal] = useState(false);

  const handleInstallClick = async () => {
    const result = await triggerInstall();
    if (result === "ios" || result === "fallback") {
      setShowInstallModal(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex h-15 items-center justify-between bg-white px-4 border-b border-border/60 shadow-2xs">
        {/* Right side in RTL: Brand Logo & Title */}
        <div
          onClick={onNavigateHome}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <img
            src="/logo.png"
            alt="بطريقك"
            className="h-8 w-8 object-contain"
          />
          <span className="text-base font-black text-[#123A68]">بطريقك</span>
        </div>

        {/* Left side in RTL: Install App Button & Hamburger Menu Icon */}
        <div className="flex items-center gap-2">
          {!isInstalled && (
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 rounded-full bg-[#FFF5EE] px-3 py-1.5 border border-[#FDE0CE] text-xs font-black text-[#F36F21] hover:bg-[#FEECE0] active:scale-95 transition-all cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>تثبيت التطبيق</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenMenu}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-[#123A68] hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="القائمة الرئيسية"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* PWA Install Modal */}
      <PwaInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        isIOS={isIOS}
      />
    </>
  );
};
