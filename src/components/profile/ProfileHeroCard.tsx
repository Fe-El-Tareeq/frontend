import { type FC, type ChangeEvent, useRef } from "react";
import { Edit2, Camera, Loader2 } from "lucide-react";
import type { UserProfile } from "../../types/auth";

interface ProfileHeroCardProps {
  profile?: UserProfile | null;
  errandsCount: number;
  tripsCount: number;
  trustScore: string;
  isUploadingImage?: boolean;
  onEditClick: () => void;
  onImageSelected: (file: File) => void;
}

export const ProfileHeroCard: FC<ProfileHeroCardProps> = ({
  profile,
  errandsCount,
  tripsCount,
  trustScore,
  isUploadingImage = false,
  onEditClick,
  onImageSelected,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userInitials = profile?.fullName
    ? profile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "هم";

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs text-center space-y-4">
      {/* Avatar with Edit Badge */}
      <div className="relative mx-auto w-20">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#123A68] text-xl font-black text-white shadow-md mx-auto overflow-hidden">
          {isUploadingImage ? (
            <Loader2 className="h-7 w-7 animate-spin text-white" />
          ) : profile?.profileImageUrl ? (
            <img
              src={profile.profileImageUrl}
              alt={profile.fullName || "User"}
              className="h-full w-full object-cover"
            />
          ) : (
            userInitials
          )}
        </div>

        <button
          type="button"
          disabled={isUploadingImage}
          onClick={() => fileInputRef.current?.click()}
          aria-label="تغيير الصورة الشخصية"
          className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-xs hover:bg-[#E05E12] transition-colors cursor-pointer disabled:opacity-50"
        >
          {isUploadingImage ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Camera className="h-3.5 w-3.5" />
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* User Name & Location Subtitle */}
      <div className="space-y-1">
        <h2 className="text-lg font-black text-[#123A68] dark:text-white">
          {profile?.fullName || "هديل محمد"}
        </h2>
        <p className="text-xs text-text-secondary dark:text-slate-400">
          {profile?.neighborhood?.name
            ? `${profile.neighborhood.governorate || "غزة"} - ${profile.neighborhood.name}`
            : "غزة - الرمال"}
        </p>

        {/* 3 Stats Row */}
        <div className="flex items-center justify-center gap-3 pt-1 text-xs font-bold text-slate-500 dark:text-slate-400">
          <span>{errandsCount} طلب</span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span>{tripsCount} رحلة</span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span className="flex items-center gap-1">
            <span>تقييم {trustScore}</span>
            <span className="text-amber-500">⭐</span>
          </span>
        </div>
      </div>

      {/* Edit Profile Action Button */}
      <button
        type="button"
        onClick={onEditClick}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#F0F4F8] dark:bg-[#0B1E36] text-xs font-black text-[#123A68] dark:text-white hover:bg-[#E2E8F0] dark:hover:bg-white/5 active:scale-98 transition-all cursor-pointer border border-slate-200/60 dark:border-white/10"
      >
        <Edit2 className="h-3.5 w-3.5 text-[#123A68] dark:text-slate-300" />
        <span>تعديل</span>
      </button>

      {/* 4 Read-only Personal Details Fields matching Figma */}
      <div className="space-y-3 pt-1 text-right border-t border-slate-100 dark:border-white/10">
        <span className="text-xs font-black text-[#123A68] dark:text-white block pt-1">
          البيانات الشخصية
        </span>

        <div>
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
            الاسم الكامل
          </label>
          <div className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-4 flex items-center text-xs font-bold text-slate-700 dark:text-slate-200">
            {profile?.fullName || "هديل محمد"}
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
            رقم الهاتف
          </label>
          <div className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-4 flex items-center justify-between text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
            <span dir="ltr">{profile?.phone || "0599-123-456"}</span>
          </div>
        </div>

        {profile?.email && (
          <div>
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
              البريد الإلكتروني
            </label>
            <div className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-4 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
              <span className="truncate" dir="ltr">{profile.email}</span>
              {profile.emailVerifiedAt ? (
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold shrink-0 mr-2">
                  مؤكد
                </span>
              ) : (
                <span className="text-[10px] bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold shrink-0 mr-2">
                  غير مؤكد
                </span>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
            المدينة
          </label>
          <div className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-4 flex items-center text-xs font-bold text-slate-700 dark:text-slate-200">
            {profile?.neighborhood?.governorate || "غزة"}
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
            الحي
          </label>
          <div className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-4 flex items-center text-xs font-bold text-slate-700 dark:text-slate-200">
            {profile?.neighborhood?.name || "الرمال"}
          </div>
        </div>
      </div>
    </div>
  );
};
