import type { FC } from "react";
import { Lock, Shield, ChevronLeft } from "lucide-react";

interface ProfileSecurityCardProps {
  isVerified?: boolean;
  onChangePassword: () => void;
  onStartVerification: () => void;
}

export const ProfileSecurityCard: FC<ProfileSecurityCardProps> = ({
  isVerified = false,
  onChangePassword,
  onStartVerification,
}) => {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-3 text-right">
      <h2 className="text-sm font-black text-[#123A68] dark:text-white">الأمان</h2>

      {/* Item 1: Change Password */}
      <button
        type="button"
        onClick={onChangePassword}
        className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer text-right"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-[#102A4C] border border-slate-200 dark:border-white/10 shadow-2xs text-[#123A68] dark:text-white">
            <Lock className="h-4 w-4" />
          </div>
          <span className="text-xs font-black text-[#123A68] dark:text-white">
            تغيير كلمة المرور
          </span>
        </div>

        <ChevronLeft className="h-4 w-4 text-slate-400 dark:text-slate-500" />
      </button>

      {/* Item 2: Identity Verification Status */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl border border-orange-200 dark:border-orange-900/40 bg-[#FFF7ED] dark:bg-orange-950/20">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-950/40 text-[#F36F21]">
            <Shield className="h-4.5 w-4.5" />
          </div>
          <div className="text-right">
            <span className="text-xs font-black text-[#123A68] dark:text-white block">
              التحقق من الهوية
            </span>
            <span className="text-[10.5px] font-bold text-[#F36F21]">
              {isVerified ? "مكتمل وموثق ✓" : "غير مكتمل"}
            </span>
          </div>
        </div>

        {!isVerified && (
          <button
            type="button"
            onClick={onStartVerification}
            className="rounded-full bg-[#F36F21] px-3 py-1 text-[11px] font-black text-white hover:bg-[#E05E12] transition-colors cursor-pointer"
          >
            بدء التحقق
          </button>
        )}
      </div>
    </div>
  );
};
