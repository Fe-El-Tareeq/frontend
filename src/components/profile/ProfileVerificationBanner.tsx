import type { FC } from "react";
import { Shield } from "lucide-react";

interface ProfileVerificationBannerProps {
  onStartVerification: () => void;
  isVerified?: boolean;
}

export const ProfileVerificationBanner: FC<ProfileVerificationBannerProps> = ({
  onStartVerification,
  isVerified = false,
}) => {
  if (isVerified) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-l from-[#EA580C] to-[#F36F21] p-4.5 text-white shadow-md space-y-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onStartVerification}
          className="rounded-full bg-white px-3.5 py-1.5 text-xs font-black text-[#EA580C] shadow-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
        >
          بدء التحقق
        </button>

        <div className="flex items-center gap-3 text-right">
          <div>
            <h3 className="text-sm font-black text-white">وثّق هويتك الآن</h3>
            <p className="text-[10.5px] text-white/85">
              فتح كافة ميزات التطبيق وبناء الثقة
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 text-white shadow-xs">
            <Shield className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-white/20 text-[10.5px] text-white/90">
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-6 rounded-full bg-white" />
          <div className="h-1.5 w-6 rounded-full bg-white/40" />
          <div className="h-1.5 w-6 rounded-full bg-white/40" />
        </div>
        <span>خطوة 1 من 3 • سهل وسريع</span>
      </div>
    </div>
  );
};
