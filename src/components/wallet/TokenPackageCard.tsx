import type { FC } from "react";
import { Zap, Check, ArrowLeft } from "lucide-react";
import type { TokenPackage } from "../../pages/wallet/BuyTokensPackages";

interface TokenPackageCardProps {
  pkg: TokenPackage;
  onSelect: (pkg: TokenPackage) => void;
}

export const TokenPackageCard: FC<TokenPackageCardProps> = ({
  pkg,
  onSelect,
}) => {
  return (
    <div
      className={`relative flex flex-col justify-between h-full rounded-3xl p-5 border transition-all ${pkg.isPopular
          ? "bg-white dark:bg-[#102A4C] border-[#F36F21] shadow-md ring-1 ring-[#F36F21]/20"
          : "bg-white dark:bg-[#102A4C] border-slate-200/90 dark:border-white/10 shadow-xs hover:border-[#123A68]/30 dark:hover:border-accent/40"
        }`}
    >
      {pkg.isPopular && (
        <span className="absolute -top-3 right-8 rounded-full bg-[#F36F21] px-3 py-0.5 text-[10.5px] font-black text-white shadow-xs">
          ★ الأكثر شيوعاً
        </span>
      )}

      <div className="flex flex-col flex-1">
        {/* Card Header */}
        <div className="flex items-start justify-between min-h-[44px]">
          <div className="text-right space-y-0.5">
            <h3 className="text-base font-black text-[#123A68] dark:text-white">{pkg.name}</h3>
            <p className="text-[11px] text-text-muted dark:text-slate-400">{pkg.subtitle}</p>
          </div>

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-2xl shrink-0 ${pkg.isPopular
                ? "bg-orange-500 text-white"
                : "bg-[#123A68] dark:bg-[#132F54] text-white"
              }`}
          >
            <Zap className="h-5 w-5 fill-white" />
          </div>
        </div>

        {/* Pricing Section */}
        <div className="my-3 space-y-1">
          <div className="flex items-baseline gap-1 text-right">
            <span className="text-3xl font-black text-[#123A68] dark:text-white">
              {pkg.tokens}
            </span>
            <span className="text-xs font-bold text-text-muted dark:text-slate-400">توكن</span>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#123A68] dark:text-white">
              {pkg.priceNis}
            </span>
            <span className="text-base font-black text-[#123A68] dark:text-white">₪</span>
          </div>

          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-start gap-1 min-h-[32px] leading-snug">
            <Check className="h-3.5 w-3.5 inline text-emerald-600 dark:text-emerald-400 stroke-3 shrink-0 mt-0.5" />
            <span>{pkg.ratePerToken}</span>
          </p>
        </div>

        <hr className="border-slate-100 dark:border-white/10 my-3" />

        {/* Features */}
        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pb-5 text-right flex-1">
          {pkg.features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 dark:bg-[#0B1E36] text-slate-500 dark:text-slate-400 text-[10px] font-bold shrink-0">
                <Check className="h-2.5 w-2.5 stroke-3" />
              </span>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Select Button Pinned to Bottom */}
      <button
        type="button"
        onClick={() => onSelect(pkg)}
        className={`flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-xs font-black transition-all active:scale-98 cursor-pointer mt-auto ${pkg.isPopular
            ? "bg-[#F36F21] text-white shadow-md hover:bg-[#E05E12]"
            : "bg-[#123A68] dark:bg-accent text-white shadow-xs hover:bg-[#0D2C50] dark:hover:bg-[#E05E12]"
          }`}
      >
        <span>اختر هذه الباقة</span>
        <ArrowLeft className="h-4 w-4" />
      </button>
    </div>
  );
};
