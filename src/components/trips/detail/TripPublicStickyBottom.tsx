import type { FC } from "react";
import { Share2 } from "lucide-react";

interface TripPublicStickyBottomProps {
  onShare: () => void;
  onRequestSpace: () => void;
}

export const TripPublicStickyBottom: FC<TripPublicStickyBottomProps> = ({
  onShare,
  onRequestSpace,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:right-72 z-30 mx-auto w-full max-w-[430px] md:max-w-md lg:max-w-lg bg-white/95 dark:bg-[#102A4C]/95 backdrop-blur-md border-t md:border border-border dark:border-white/10 p-3.5 shadow-xl md:rounded-3xl md:bottom-4 lg:bottom-6 transition-all">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onShare}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B1E36] text-primary dark:text-white hover:bg-slate-50 dark:hover:bg-[#132F54] transition-colors cursor-pointer"
        >
          <Share2 className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={onRequestSpace}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#E05E12]"
        >
          <span>اطلب مكانك بالرحلة</span>
        </button>
      </div>
    </div>
  );
};
