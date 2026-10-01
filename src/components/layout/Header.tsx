import { useState } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MapPin, Zap, ChevronRight, Home } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";
import { Sidebar } from "./Sidebar";
import { NotificationDropdown } from "./NotificationDropdown";
import { cn } from "../../utils/cn";

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showWalletBadge?: boolean;
  showNotificationBell?: boolean;
  className?: string;
}

export const Header: FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  className,
}) => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { tokenBalance } = useWallet();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== "undefined" && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };

  const userInitials = profile?.fullName
    ? profile.fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
    : "";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-30 flex h-16 items-center justify-between bg-white dark:bg-[#102A4C] px-4 md:px-6 lg:px-8 border-b border-border/50 dark:border-white/10 transition-all shadow-2xs",
          className,
        )}
      >
        {/* If simple back mode is enabled */}
        {showBack ? (
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1 text-sm font-bold text-primary dark:text-slate-200 hover:text-accent dark:hover:text-accent transition-colors cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
                <span>رجوع</span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/home")}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0B1E36] border border-border dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-accent dark:hover:text-accent hover:bg-slate-100 dark:hover:bg-[#132F54] transition-colors cursor-pointer"
                title="العودة للصفحة الرئيسية"
                aria-label="الرئيسية"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">الرئيسية</span>
              </button>
            </div>

            {title && (
              <h1 className="text-base md:text-lg font-extrabold text-primary dark:text-white truncate max-w-50 sm:max-w-md">
                {title}
              </h1>
            )}

            <button
              type="button"
              onClick={() => navigate("/home")}
              className="flex items-center gap-1.5 hover:opacity-85 transition-opacity cursor-pointer"
              title="الصفحة الرئيسية"
              aria-label="الصفحة الرئيسية"
            >
              <img
                src="/logo.png"
                alt="بطريقك"
                className="h-8 w-8 object-contain"
              />
              <span className="text-sm font-black text-primary dark:text-white">بطريقك</span>
            </button>
          </div>
        ) : (
          /* Standard Authenticated App Header Matching Figma */
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            {/* Right Group: Menu, Home Link & Location Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-[#0B1E36] border border-border dark:border-white/10 text-primary dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#132F54] transition-colors active:scale-95 lg:hidden cursor-pointer"
                aria-label="القائمة الجانبية"
              >
                <Menu className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/profile/edit")}
                className="flex h-10 items-center gap-1.5 px-3 rounded-xl bg-slate-50 dark:bg-[#0B1E36] border border-border dark:border-white/10 text-primary dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#132F54] transition-colors active:scale-95 cursor-pointer"
                aria-label="تحديد الحي"
                title={
                  profile?.neighborhood?.name
                    ? `حي ${profile.neighborhood.name}`
                    : "تحديد الموقع"
                }
              >
                <MapPin className="h-5 w-5 text-accent shrink-0" />
                <span className="hidden sm:inline text-xs font-bold text-text-secondary dark:text-slate-300">
                  {profile?.neighborhood?.name || "تحديد الحي"}
                </span>
              </button>
            </div>

            {/* Left Group: Notification Bell Dropdown, Token Pill & Avatar */}
            <div className="flex items-center gap-2.5">
              <NotificationDropdown />

              {/* Token Balance Pill */}
              <button
                type="button"
                onClick={() => navigate("/wallet")}
                className="flex items-center gap-1.5 rounded-full bg-[#FFF5EE] dark:bg-[#F36F21]/15 px-3.5 py-1.5 border border-[#FDE0CE] dark:border-[#F36F21]/30 text-xs font-black text-accent hover:bg-[#FEECE0] dark:hover:bg-[#F36F21]/25 transition-colors cursor-pointer"
              >
                <Zap className="h-4 w-4 fill-accent text-accent" />
                <span>{tokenBalance ?? 0}</span>
              </button>

              {/* User Avatar Circle */}
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123A68] dark:bg-[#1E4E8C] text-xs font-black text-white shadow-xs hover:opacity-90 transition-opacity overflow-hidden cursor-pointer"
              >
                {profile?.profileImageUrl ? (
                  <img
                    src={profile.profileImageUrl}
                    alt={profile.fullName || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  userInitials
                )}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Slide-out Sidebar Drawer */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};
