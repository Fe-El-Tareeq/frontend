import type { FC } from "react";

interface LandingSubNavProps {
  onScrollTo: (sectionId: string) => void;
}

export const LandingSubNav: FC<LandingSubNavProps> = ({ onScrollTo }) => {
  return (
    <div className="sticky top-14 z-30 flex items-center justify-between bg-[#123A68] px-4 py-2.5 text-xs font-bold text-white shadow-sm overflow-x-auto scrollbar-none">
      <button
        type="button"
        onClick={() => onScrollTo("how-it-works")}
        className="px-2 py-0.5 hover:text-[#F36F21] transition-colors shrink-0 cursor-pointer"
      >
        كيف يعمل
      </button>
      <button
        type="button"
        onClick={() => onScrollTo("about-platform")}
        className="px-2 py-0.5 hover:text-[#F36F21] transition-colors shrink-0 cursor-pointer"
      >
        عن المنصة
      </button>
      <button
        type="button"
        onClick={() => onScrollTo("faqs")}
        className="px-2 py-0.5 hover:text-[#F36F21] transition-colors shrink-0 cursor-pointer"
      >
        أسئلة شائعة
      </button>
      <button
        type="button"
        onClick={() => onScrollTo("contact")}
        className="px-2 py-0.5 hover:text-[#F36F21] transition-colors shrink-0 cursor-pointer"
      >
        تواصل معنا
      </button>
    </div>
  );
};
