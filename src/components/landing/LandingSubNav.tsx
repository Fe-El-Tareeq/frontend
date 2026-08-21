import type { FC } from "react";

interface LandingSubNavProps {
  onScrollTo: (sectionId: string) => void;
}

export const LandingSubNav: FC<LandingSubNavProps> = ({ onScrollTo }) => {
  return (
    <div className="sticky top-14 z-30 flex items-center justify-between bg-[#123A68] px-3 py-2.5 text-[11px] font-bold text-white shadow-sm overflow-x-auto scrollbar-none">
      <button
        onClick={() => onScrollTo("how-it-works")}
        className="px-2 py-0.5 hover:text-accent transition-colors shrink-0"
      >
        كيف يعمل
      </button>
      <button
        onClick={() => onScrollTo("why-us")}
        className="px-2 py-0.5 hover:text-accent transition-colors shrink-0"
      >
        لماذا بطريقك
      </button>
      <button
        onClick={() => onScrollTo("faqs")}
        className="px-2 py-0.5 hover:text-accent transition-colors shrink-0"
      >
        أسئلة شائعة
      </button>
      <button
        onClick={() => onScrollTo("contact")}
        className="px-2 py-0.5 hover:text-accent transition-colors shrink-0"
      >
        تواصل معنا
      </button>
    </div>
  );
};
