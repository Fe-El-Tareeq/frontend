import type { FC } from "react";
import { Edit3, Star } from "lucide-react";

interface ProfileDetailsCardProps {
  fullName: string;
  initials: string;
  neighborhoodText: string;
  phone: string;
  onEdit: () => void;
}

export const ProfileDetailsCard: FC<ProfileDetailsCardProps> = ({
  fullName,
  initials,
  neighborhoodText,
  phone,
  onEdit,
}) => {
  return (
    <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-4 text-center">
      {/* Avatar with Edit Badge */}
      <div className="relative mx-auto h-20 w-20">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#123A68] text-xl font-black text-white shadow-sm">
          {initials}
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-xs hover:bg-[#E05E12] transition-colors"
        >
          <Edit3 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Name & Location */}
      <div className="space-y-0.5">
        <h2 className="text-base font-black text-primary">{fullName}</h2>
        <p className="text-xs text-text-muted">{neighborhoodText}</p>
      </div>

      {/* Mini Stats Summary */}
      <div className="flex items-center justify-center gap-3 text-xs text-text-secondary border-y border-slate-100 py-2.5">
        <span>23 طلب</span>
        <span>•</span>
        <span>12 رحلة</span>
        <span>•</span>
        <div className="flex items-center gap-1 font-bold text-primary">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>4.8 تقييم</span>
        </div>
      </div>

      {/* Edit Button */}
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F8FAFC] border border-slate-200 text-xs font-bold text-primary hover:bg-slate-100 transition-colors"
      >
        <Edit3 className="h-3.5 w-3.5" />
        <span>تعديل</span>
      </button>

      {/* Form Readonly Details */}
      <div className="space-y-3 pt-2 text-right">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-text-muted block">
            الاسم الكامل
          </label>
          <div className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 flex items-center text-xs font-bold text-primary">
            {fullName}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-text-muted block">
            رقم الهاتف
          </label>
          <div
            className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 flex items-center text-xs font-bold text-primary"
            dir="ltr"
          >
            {phone}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-text-muted block">
            المدينة
          </label>
          <div className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 flex items-center text-xs font-bold text-primary">
            غزة
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-text-muted block">
            الحي
          </label>
          <div className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 flex items-center text-xs font-bold text-primary">
            {neighborhoodText.replace("غزة - ", "")}
          </div>
        </div>
      </div>
    </div>
  );
};
