import type { FC } from "react";

interface LandingFooterProps {
  onScrollTo: (sectionId: string) => void;
  onNavigateHome: () => void;
  onNavigateTerms: () => void;
}

export const LandingFooter: FC<LandingFooterProps> = ({
  onScrollTo,
  onNavigateHome,
  onNavigateTerms,
}) => {
  return (
    <footer className="pt-6 pb-4 text-center space-y-3">
      {/* Brand Logo & Name */}
      <div
        onClick={onNavigateHome}
        className="flex items-center justify-center gap-2 cursor-pointer select-none"
      >
        <span className="text-base font-black text-[#123A68]">بطريقك</span>
        <img src="/logo.png" alt="بطريقك" className="h-8 w-8 object-contain" />
      </div>

      {/* Copyright */}
      <p className="text-[11px] text-text-muted">
        2026 بطريقك - جميع الحقوق محفوظة
      </p>

      {/* Footer Navigation Links */}
      <div className="flex items-center justify-center gap-4 text-xs font-bold text-text-secondary pt-1">
        <button
          type="button"
          onClick={onNavigateTerms}
          className="hover:text-primary transition-colors cursor-pointer"
        >
          الشروط
        </button>
        <span>•</span>
        <button
          type="button"
          onClick={onNavigateTerms}
          className="hover:text-primary transition-colors cursor-pointer"
        >
          الخصوصية
        </button>
        <span>•</span>
        <button
          type="button"
          onClick={() => onScrollTo("about-platform")}
          className="hover:text-primary transition-colors cursor-pointer"
        >
          عن المنصة
        </button>
        <span>•</span>
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="hover:text-primary transition-colors cursor-pointer"
        >
          الرئيسية
        </button>
      </div>
    </footer>
  );
};
