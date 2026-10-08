import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  Radio,
  AlertTriangle,
  Wallet,
  Bell,
  BarChart3,
  HelpCircle,
  ShieldCheck,
  Search,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { cn } from "../../utils/cn";

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { name: "نظرة عامة", path: "/admin", icon: LayoutGrid },
  { name: "المستخدمون", path: "/admin/users", icon: Users },
  { name: "الطلبات الحية", path: "/admin/live-orders", icon: Radio, badge: 47 },
  { name: "مركز النزاعات", path: "/admin/disputes", icon: AlertTriangle, badge: 2 },
  { name: "المحفظة", path: "/admin/wallet", icon: Wallet },
  { name: "الإشعارات", path: "/admin/notifications", icon: Bell },
  { name: "التقارير", path: "/admin/reports", icon: BarChart3 },
  { name: "الأسئلة الشائعة", path: "/admin/faqs", icon: HelpCircle },
  { name: "التحقق من الهوية", path: "/admin/verifications", icon: ShieldCheck, badge: 3 },
];

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Determine current active page title
  const currentTitle =
    NAV_ITEMS.find((item) =>
      item.path === "/admin"
        ? location.pathname === "/admin" || location.pathname === "/admin/"
        : location.pathname.startsWith(item.path),
    )?.name || "لوحة الإدارة";

  return (
    <div className="min-h-screen bg-[#071322] text-slate-100 flex flex-col lg:flex-row-reverse text-right font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Mobile Header Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0B1A2E] border-b border-[#18314E] z-40">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#18314E]"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-sm font-black text-white block">بطريقك</span>
            <span className="text-[10px] text-blue-400 font-bold block">لوحة الإدارة</span>
          </div>
          <div className="h-7 w-7 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-blue-400">
            <div className="h-2 w-2 rounded-full bg-blue-400" />
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-64 bg-[#091728] border-l border-[#162E4A] flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen lg:shrink-0",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0",
        )}
      >
        {/* Top Brand Logo */}
        <div>
          <div className="flex items-center justify-end gap-3 px-6 py-6 border-b border-[#162E4A]">
            <div className="text-right">
              <h2 className="text-base font-black text-white tracking-wide">بطريقك</h2>
              <p className="text-[11px] text-slate-400 font-medium">لوحة الإدارة</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-[#122F55] border-2 border-blue-500/40 flex items-center justify-center text-blue-400 shadow-md">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === "/admin"
                  ? location.pathname === "/admin" || location.pathname === "/admin/"
                  : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group",
                    isActive
                      ? "bg-[#143257] text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-[#0E233C]",
                  )}
                >
                  {/* Badge on left */}
                  <div>
                    {item.badge !== undefined && (
                      <span className="h-5 min-w-5 px-1.5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Icon & Label on right */}
                  <div className="flex items-center gap-2.5">
                    <span>{item.name}</span>
                    <Icon
                      className={cn(
                        "h-4.5 w-4.5 transition-colors",
                        isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-300",
                      )}
                    />
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Card */}
        <div className="p-4 border-t border-[#162E4A]">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0D2036] border border-[#162E4A]/80">
            <div className="text-right">
              <p className="text-xs font-black text-white leading-tight">مدير النظام</p>
              <p className="text-[10px] text-blue-400 font-mono font-medium dir-ltr text-left">bitareqk@gmail.com</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <Shield className="h-4 w-4" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:h-screen lg:overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#091728]/90 backdrop-blur-md border-b border-[#162E4A]">
          {/* Right in RTL: Page Title */}
          <h1 className="text-lg md:text-xl font-black text-white tracking-wide">
            {currentTitle}
          </h1>

          {/* Left in RTL: Live Indicator & Search Bar */}
          <div className="flex items-center gap-4">
            {/* Live Indicator */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-[#0E233C] px-3 py-1.5 rounded-lg border border-[#183659]">
              <span className="font-mono text-[11px] text-slate-400">{currentTime || "14:23"}</span>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>مباشر</span>
              </div>
            </div>

            {/* Quick Search */}
            <div className="relative hidden md:block w-64">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="بحث سريع..."
                className="w-full h-9 pr-9 pl-3 rounded-lg bg-[#0E233C] border border-[#183659] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all text-right"
              />
            </div>
          </div>
        </header>

        {/* Page Content View */}
        <main className="p-4 md:p-6 lg:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
