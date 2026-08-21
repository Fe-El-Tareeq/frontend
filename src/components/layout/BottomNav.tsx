import { useLocation, useNavigate } from "react-router-dom";
import { Home, Compass, Plus, Wallet, User } from "lucide-react";
import { cn } from "../../utils/cn";

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: "home",
      label: "الطلبات",
      path: "/",
      icon: Home,
    },
    {
      id: "trips",
      label: "الرحلات",
      path: "/trips",
      icon: Compass,
    },
    {
      id: "create",
      label: "طلب جديد",
      path: "/errands/new",
      isCenterAction: true,
      icon: Plus,
    },
    {
      id: "wallet",
      label: "المحفظة",
      path: "/wallet",
      icon: Wallet,
    },
    {
      id: "profile",
      label: "حسابي",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto w-full max-w-107.5 border-t border-border/70 bg-white/95 backdrop-blur-md pb-safe">
      <div className="flex h-16.5 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/" || location.pathname === "/errands"
              : location.pathname.startsWith(item.path);

          const Icon = item.icon;

          if (item.isCenterAction) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.path)}
                className="group relative -top-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition-transform active:scale-90 hover:bg-accent-hover focus:outline-none"
                aria-label="إضافة طلب جديد"
              >
                <Plus className="h-7 w-7 transition-transform group-hover:rotate-90 duration-300" />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-1 flex-col items-center justify-center py-1 transition-colors focus:outline-none",
                isActive
                  ? "text-accent font-bold"
                  : "text-text-secondary hover:text-primary font-medium"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform",
                  isActive && "scale-110"
                )}
              />
              <span className="mt-1 text-xs leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
