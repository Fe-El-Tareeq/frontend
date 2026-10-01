import type { FC } from "react";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export interface IssueCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  colorClass: string;
  iconBgClass: string;
}

interface ReportStep1CategorySelectionProps {
  categories: IssueCategory[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  onProceed: () => void;
}

export const ReportStep1CategorySelection: FC<
  ReportStep1CategorySelectionProps
> = ({ categories, selectedCategoryId, onSelectCategory, onProceed }) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-200 text-right">
      {/* Red Alert Banner */}
      <div className="rounded-3xl bg-rose-500 p-5 text-white shadow-md space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/80">خطوة 1 من 2</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/20 text-white">
            <ShieldAlert className="h-5 w-5" />
          </div>
        </div>
        <h2 className="text-base font-black">حدد نوع المشكلة</h2>
        <p className="text-xs text-white/90 leading-relaxed">
          اختر الفئة الأنسب لبلاغك لضمان توجيهه للمختصين بأسرع وقت
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategoryId === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center justify-between p-4 rounded-3xl border transition-all cursor-pointer text-right ${
                isSelected
                  ? "bg-white dark:bg-[#102A4C] border-[#123A68] dark:border-accent ring-2 ring-[#123A68]/15 dark:ring-accent/20 shadow-sm"
                  : "bg-white dark:bg-[#102A4C] border-slate-200/90 dark:border-white/10 shadow-2xs hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              {/* Category Info on RIGHT */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${cat.iconBgClass} shadow-2xs shrink-0`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-right">
                  <h4 className="text-xs font-black text-[#123A68] dark:text-white">
                    {cat.title}
                  </h4>
                  <p className="text-[10.5px] text-text-muted dark:text-slate-400 mt-0.5">
                    {cat.subtitle}
                  </p>
                </div>
              </div>

              {/* Radio Indicator on LEFT */}
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all shrink-0 ${
                  isSelected
                    ? "border-[#123A68] dark:border-accent bg-[#123A68] dark:bg-accent text-white"
                    : "border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0B1E36]"
                }`}
              >
                {isSelected && (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Next Step Button */}
      <button
        type="button"
        onClick={onProceed}
        className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-[#123A68] dark:bg-accent text-xs font-black text-white hover:bg-[#0D2C50] dark:hover:bg-accent/90 active:scale-98 transition-all cursor-pointer shadow-md"
      >
        <span>متابعة لتفاصيل البلاغ</span>
        <ArrowLeft className="h-4 w-4" />
      </button>
    </div>
  );
};
