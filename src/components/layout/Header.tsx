import { useState } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MapPin, Bell, Zap, ChevronRight } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";
import { useNotifications } from "../../hooks/useNotifications";
import { Sidebar } from "./Sidebar";
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
  const { unreadCount } = useNotifications();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
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
      <header
        className={cn(
          "sticky top-0 z-30 flex h-16 items-center justify-between bg-white px-4 border-b border-border/50 transition-all shadow-2xs",
          className,
        )}
      >
        {/* If simple back mode is enabled */}
        {showBack ? (
          <div className="flex w-full items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1 text-sm font-bold text-primary hover:text-accent transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
              <span>رجوع</span>
            </button>

            {title && (
              <h1 className="text-base font-extrabold text-primary">{title}</h1>
            )}

            <div className="flex items-center gap-1.5">
              <img
                src="/logo.png"
                alt="بطريقك"
                className="h-8 w-8 object-contain"
              />
              <span className="text-sm font-black text-primary">بطريقك</span>
            </div>
          </div>
        ) : (
          /* Standard Authenticated App Header Matching Figma */
          <div className="flex w-full items-center justify-between">
            {/* Right Group: Menu & Location Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-border text-primary hover:bg-slate-100 transition-colors active:scale-95"
                aria-label="القائمة الجانبية"
              >
                <Menu className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/profile/edit")}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-border text-primary hover:bg-slate-100 transition-colors active:scale-95"
                aria-label="تحديد الحي"
                title={
                  profile?.neighborhood?.name
                    ? `حي ${profile.neighborhood.name}`
                    : "تحديد الموقع"
                }
              >
                <MapPin className="h-5 w-5 text-accent" />
              </button>
            </div>

            {/* Left Group: Notification Bell, Token Pill & Avatar */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => navigate("/notifications")}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-border text-primary hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="الإشعارات"
              >
                <Bell className="h-5 w-5 text-text-secondary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[#F36F21] px-1 text-[10px] font-black text-white shadow-xs animate-scale-in">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {/* Token Balance Pill */}
              <button
                type="button"
                onClick={() => navigate("/wallet")}
                className="flex items-center gap-1.5 rounded-full bg-[#FFF5EE] px-3.5 py-1.5 border border-[#FDE0CE] text-xs font-black text-accent hover:bg-[#FEECE0] transition-colors"
              >
                <Zap className="h-4 w-4 fill-accent text-accent" />
                <span>{tokenBalance ?? 0}</span>
              </button>

              {/* User Avatar Circle */}
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123A68] text-xs font-black text-white shadow-xs hover:opacity-90 transition-opacity overflow-hidden"
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
