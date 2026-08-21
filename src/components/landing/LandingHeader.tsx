import type { FC } from "react";
import { Menu } from "lucide-react";

interface LandingHeaderProps {
  onOpenMenu: () => void;
  onNavigateHome: () => void;
}

export const LandingHeader: FC<LandingHeaderProps> = ({
  onOpenMenu,
  onNavigateHome,
}) => {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between bg-white px-4 border-b border-border/60 shadow-2xs">
      <button
        type="button"
        onClick={onOpenMenu}
        className="p-1 text-primary hover:text-accent transition-colors"
        aria-label="القائمة"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div
        onClick={onNavigateHome}
        className="flex items-center gap-2 cursor-pointer"
      >
        <span className="text-base font-black text-primary">بطريقك</span>
        <img
          src="/logo.png"
          alt="بطريقك"
          className="h-8 w-8 object-contain"
        />
      </div>
    </header>
  );
};
