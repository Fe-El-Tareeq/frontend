import { useState } from "react";
import type { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Car,
  Package,
  MessageSquare,
  Wallet,
  User,
  Settings,
  LogOut,
  Zap,
  X,
  Download,
  ChevronLeft,
  Briefcase,
  Sun,
  Moon,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";
import { usePWA } from "../../hooks/usePWA";
import { useTheme } from "../../hooks/useTheme";
import { PwaInstallModal } from "../pwa/PwaInstallModal";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, logout } = useAuth();
  const { tokenBalance } = useWallet();
  const { isInstalled, isIOS, triggerInstall } = usePWA();
  const { theme, setTheme } = useTheme();
  const [showInstallModal, setShowInstallModal] = useState(false);

  const mainNavItems = [
    { label: "الرئيسية", path: "/home", icon: Home },
    { label: "الرحلات", path: "/trips", icon: Car },
    { label: "الطلبات", path: "/errands", icon: Package },
    {
      label: "الرسائل",
      path: "/messages",
      icon: MessageSquare,
    },
    { label: "المحفظة", path: "/wallet", icon: Wallet },
  ];

  const activityNavItems = [
    { label: "رحلاتي", path: "/profile/trips", icon: Car },
    { label: "طلباتي", path: "/my-errands", icon: Package },
    { label: "عروضي المقدمة", path: "/profile/my-offers", icon: Briefcase },
  ];

  const accountNavItems = [
    { label: "حسابي", path: "/profile", icon: User },
    { label: "الإعدادات", path: "/settings", icon: Settings },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    onClose();
  };

  const handleInstallApp = async () => {
    const result = await triggerInstall();
    if (result === "ios" || result === "fallback") {
      setShowInstallModal(true);
    } else if (result === "accepted" || result === "prompted") {
      onClose();
    }
  };

  const userInitials = profile?.fullName
    ? profile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "هم";

  return (
    <>
      {/* Backdrop (Mobile & Tablet only) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer / Permanent Desktop Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 lg:z-30 h-full w-72 max-w-[85vw] lg:max-w-none bg-[#123A68] dark:bg-[#0A192C] text-white flex flex-col justify-between p-5 shadow-2xl lg:shadow-md border-l border-transparent dark:border-white/5 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Section */}
        <div className="space-y-5 overflow-y-auto pr-1">
          {/* Header with Logo and Close */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleNavigate("/home")}
            >
              <img
                src="/logo.png"
                alt="بطريقك"
                className="h-8 w-8 object-contain bg-white dark:bg-[#102A4C] rounded-lg p-0.5"
              />
              <span className="text-lg font-black text-white">بطريقك</span>
            </div>
            {/* Close button on mobile/tablet */}
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors lg:hidden cursor-pointer"
              aria-label="إغلاق القائمة"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Profile Card */}
          <div
            onClick={() => handleNavigate("/profile")}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0D2C50] dark:bg-[#0E223D] border border-white/10 cursor-pointer hover:border-accent/40 transition-all"
          >
            <div className="text-right">
              <h3 className="text-sm font-bold text-white leading-tight">
                {profile?.fullName || "المستخدم"}
              </h3>
              <p className="text-xs text-white/70 mt-0.5">
                {profile?.neighborhood?.name
                  ? `${profile.neighborhood.governorate || "غزة"} - ${profile.neighborhood.name}`
                  : "غزة"}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123A68] dark:bg-[#1A3B66] border border-white/20 text-xs font-black text-white overflow-hidden">
              {profile?.profileImageUrl ? (
                <img
                  src={profile.profileImageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                userInitials
              )}
            </div>
          </div>

          {/* Main Navigation Links */}
          <nav className="space-y-1">
            <span className="text-[10.5px] font-bold text-white/50 px-2 uppercase tracking-wider block">
              القائمة الرئيسية
            </span>
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#F36F21] text-white shadow-xs font-black"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4.5 w-4.5" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Activity Section */}
          <nav className="space-y-1 pt-2 border-t border-white/10">
            <span className="text-[10.5px] font-bold text-white/50 px-2 uppercase tracking-wider block">
              نشاطي
            </span>
            {activityNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#F36F21] text-white shadow-xs font-black"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4.5 w-4.5" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Account Section */}
          <nav className="space-y-1 pt-2 border-t border-white/10">
            {accountNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#F36F21] text-white shadow-xs font-black"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4.5 w-4.5" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}

            {/* Install Web App Card (Prominent CTA) */}
            {!isInstalled && (
              <button
                type="button"
                onClick={handleInstallApp}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#F36F21] to-[#E05E12] text-white shadow-md hover:opacity-95 active:scale-98 transition-all mt-3 cursor-pointer text-right"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 text-white">
                    <Download className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-xs font-black block leading-tight">
                      تثبيت التطبيق على الهاتف
                    </span>
                    <span className="text-[10px] text-white/80 block">
                      تنزيل الـ Web App فوراً
                    </span>
                  </div>
                </div>
                <ChevronLeft className="h-4 w-4 text-white/80" />
              </button>
            )}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          {/* Theme Mode Switcher */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs font-bold text-white/80">المظهر:</span>
            <div className="flex items-center gap-1 bg-black/20 rounded-lg p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  theme === "light"
                    ? "bg-[#F36F21] text-white shadow-xs"
                    : "text-white/60 hover:text-white"
                }`}
                title="الوضع الفاتح"
              >
                <Sun className="h-3.5 w-3.5" />
                <span>فاتح</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  theme === "dark"
                    ? "bg-[#F36F21] text-white shadow-xs"
                    : "text-white/60 hover:text-white"
                }`}
                title="الوضع المظلم"
              >
                <Moon className="h-3.5 w-3.5" />
                <span>داكن</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("system")}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  theme === "system"
                    ? "bg-[#F36F21] text-white shadow-xs"
                    : "text-white/60 hover:text-white"
                }`}
                title="تلقائي حسب النظام"
              >
                <span>تلقائي</span>
              </button>
            </div>
          </div>

          {/* Token Balance Pill */}
          <div
            onClick={() => handleNavigate("/wallet")}
            className="flex items-center justify-between px-4 py-2.5 rounded-full bg-[#0D2C50] dark:bg-[#0E223D] border border-accent/60 cursor-pointer hover:border-accent transition-all"
          >
            <span className="text-xs font-bold text-white/80">
              رصيد التوكنز:
            </span>
            <div className="flex items-center gap-1.5 text-accent font-black text-sm">
              <Zap className="h-4 w-4 fill-accent" />
              <span>{tokenBalance ?? 0}</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5 rotate-180" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Installation Instructions Modal */}
      <PwaInstallModal
        isOpen={showInstallModal}
        onClose={() => {
          setShowInstallModal(false);
          onClose();
        }}
        isIOS={isIOS}
      />
    </>
  );
};

