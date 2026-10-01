import type { FC } from "react";
import { Edit3, Star } from "lucide-react";

interface ProfileDetailsCardProps {
  fullName: string;
  initials: string;
  neighborhoodText: string;
  cityText?: string;
  phone: string;
  errandsCount: number;
  tripsCount: number;
  rating: number | string;
  onEdit: () => void;
}

export const ProfileDetailsCard: FC<ProfileDetailsCardProps> = ({
  fullName,
  initials,
  neighborhoodText,
  cityText = "غزة",
  phone,
  errandsCount,
  tripsCount,
  rating,
  onEdit,
}) => {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-border dark:border-white/10 shadow-xs space-y-4 text-center">
      {/* Avatar with Edit Badge */}
      <div className="relative mx-auto h-20 w-20">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#123A68] text-xl font-black text-white shadow-sm">
          {initials}
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-xs hover:bg-[#E05E12] transition-colors cursor-pointer"
        >
          <Edit3 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Name & Location */}
      <div className="space-y-0.5">
        <h2 className="text-base font-black text-primary dark:text-white">
          {fullName || "المستخدم"}
        </h2>
        <p className="text-xs text-text-muted dark:text-slate-400">
          {neighborhoodText || "قطاع غزة"}
        </p>
      </div>

      {/* Mini Stats Summary from Real Data */}
      <div className="flex items-center justify-center gap-3 text-xs text-text-secondary dark:text-slate-400 border-y border-slate-100 dark:border-white/10 py-2.5">
        <span>{errandsCount} طلب</span>
        <span>•</span>
        <span>{tripsCount} رحلة</span>
        <span>•</span>
        <div className="flex items-center gap-1 font-bold text-primary dark:text-white">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{rating} تقييم</span>
        </div>
      </div>

      {/* Edit Button */}
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F8FAFC] dark:bg-[#0B1E36] border border-slate-200 dark:border-white/10 text-xs font-bold text-primary dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
      >
        <Edit3 className="h-3.5 w-3.5" />
        <span>تعديل</span>
      </button>

      {/* Form Readonly Details */}
      <div className="space-y-3 pt-2 text-right">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-text-muted dark:text-slate-400 block">
            الاسم الكامل
          </label>
          <div className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3.5 flex items-center text-xs font-bold text-primary dark:text-white">
            {fullName || "لم يتم تعيين الاسم"}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-text-muted dark:text-slate-400 block">
            رقم الهاتف
          </label>
          <div
            className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3.5 flex items-center text-xs font-bold text-primary dark:text-white"
            dir="ltr"
          >
            {phone || "—"}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-text-muted dark:text-slate-400 block">
            المدينة
          </label>
          <div className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3.5 flex items-center text-xs font-bold text-primary dark:text-white">
            {cityText}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-text-muted dark:text-slate-400 block">
            الحي
          </label>
          <div className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3.5 flex items-center text-xs font-bold text-primary dark:text-white">
            {neighborhoodText.replace("غزة - ", "") || "غير محدد"}
          </div>
        </div>
      </div>
    </div>
  );
};
