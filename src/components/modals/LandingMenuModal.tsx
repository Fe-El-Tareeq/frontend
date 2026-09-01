import { useState } from "react";
import { ChevronLeft, Download, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePWA } from "../../hooks/usePWA";
import { PwaInstallModal } from "../pwa/PwaInstallModal";

interface LandingMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LandingMenuModal({ isOpen, onClose }: LandingMenuModalProps) {
  const navigate = useNavigate();
  const { isInstalled, isIOS, triggerInstall } = usePWA();
  const [showInstallModal, setShowInstallModal] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const result = await triggerInstall();
    if (result === "ios" || result === "fallback") {
      setShowInstallModal(true);
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-xs animate-fade-in"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm rounded-3xl bg-[#F8FAFC] p-4 text-center shadow-2xl space-y-3"
          dir="rtl"
        >
          {/* Top Brand Card */}
          <div className="flex items-center justify-center rounded-2xl bg-white p-4 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-[#123A68]">بطريقك</span>
              <img
                src="/logo.png"
                alt="بطريقك"
                className="h-8 w-8 object-contain"
              />
            </div>
          </div>

          {/* Download App Option (Highlighted) */}
          {!isInstalled && (
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-[#123A68] to-[#1E4E8C] p-4 text-white shadow-md hover:opacity-95 active:scale-98 transition-all text-right cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-[#F36F21]">
                  <Download className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black text-white">
                      تثبيت تطبيق بطريقك
                    </span>
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  </div>
                  <span className="text-[11px] text-white/75 block">
                    تنزيل على الهاتف لتجربة أسرع بدون متصفح
                  </span>
                </div>
              </div>
              <ChevronLeft className="h-5 w-5 text-white/80" />
            </button>
          )}

          {/* 1. Login Option Card */}
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/login");
            }}
            className="flex h-14 w-full items-center justify-between rounded-2xl bg-white px-5 border border-slate-200 text-sm font-black text-[#123A68] hover:border-[#F36F21] shadow-2xs active:scale-98 transition-all cursor-pointer"
          >
            <span>تسجيل الدخول</span>
            <ChevronLeft className="h-5 w-5 text-[#123A68]" />
          </button>

          {/* 2. Register Option Card */}
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/register-step1");
            }}
            className="flex h-14 w-full items-center justify-between rounded-2xl bg-white px-5 border border-slate-200 text-sm font-black text-[#123A68] hover:border-[#F36F21] shadow-2xs active:scale-98 transition-all cursor-pointer"
          >
            <span>إنشاء حساب جديد</span>
            <ChevronLeft className="h-5 w-5 text-[#123A68]" />
          </button>

          {/* 3. Home Solid Button */}
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/");
            }}
            className="flex h-14 w-full items-center justify-between rounded-2xl bg-[#F36F21] px-5 text-sm font-black text-white shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <span>الرئيسية</span>
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* PWA Install Modal Guide */}
      <PwaInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        isIOS={isIOS}
      />
    </>
  );
}
