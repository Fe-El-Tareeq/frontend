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
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, logout } = useAuth();
  const { tokenBalance } = useWallet();

  const navItems = [
    { label: "الرئيسية", path: "/", icon: Home },
    { label: "الرحلات", path: "/trips", icon: Car },
    { label: "الطلبات", path: "/errands", icon: Package },
    {
      label: "الرسائل",
      path: "/messages",
      icon: MessageSquare,
      badge: 3,
    },
    { label: "المحفظة", path: "/wallet", icon: Wallet },
    { label: "حسابي", path: "/profile", icon: User },
    { label: "الإعدادات", path: "/settings", icon: Settings },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate("/welcome");
    onClose();
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
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-[#123A68] text-white flex flex-col justify-between p-5 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Section */}
        <div className="space-y-6">
          {/* Header with Logo and Close */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="بطريقك"
                className="h-8 w-8 object-contain bg-white rounded-lg p-0.5"
              />
              <span className="text-lg font-black text-white">بطريقك</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Profile Card */}
          <div
            onClick={() => handleNavigate("/profile")}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0D2C50] border border-white/10 cursor-pointer hover:border-accent/40 transition-all"
          >
            <div className="text-right">
              <h3 className="text-sm font-bold text-white leading-tight">
                {profile?.fullName || "هديل محمد"}
              </h3>
              <p className="text-xs text-white/70 mt-0.5">
                {profile?.neighborhood?.name
                  ? `غزة - ${profile.neighborhood.name}`
                  : "غزة - الرمال"}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123A68] border border-white/20 text-xs font-black text-white">
              {userInitials}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-black text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          {/* Token Balance Pill */}
          <div
            onClick={() => handleNavigate("/wallet")}
            className="flex items-center justify-between px-4 py-3 rounded-full bg-[#0D2C50] border border-accent/60 cursor-pointer hover:border-accent transition-all"
          >
            <span className="text-xs font-bold text-white/80">رصيد التوكنز:</span>
            <div className="flex items-center gap-1.5 text-accent font-black text-sm">
              <Zap className="h-4 w-4 fill-accent" />
              <span>{tokenBalance || 47}</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-bold text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="h-5 w-5 rotate-180" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
};
