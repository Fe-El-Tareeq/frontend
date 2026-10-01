import type { FC, FormEvent } from "react";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import type { IssueCategory } from "./ReportStep1CategorySelection";

export interface RecentUser {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
}

interface ReportStep2DetailsFormProps {
  selectedCategory: IssueCategory;
  recentUsers: RecentUser[];
  selectedUser: string | null;
  setSelectedUser: (v: string | null) => void;
  description: string;
  setDescription: (v: string) => void;
  priority: "LOW" | "MEDIUM" | "HIGH";
  setPriority: (v: "LOW" | "MEDIUM" | "HIGH") => void;
  attachChatLogs: boolean;
  setAttachChatLogs: (v: boolean) => void;
  isSubmitting: boolean;
  onSubmit: (e: FormEvent) => void;
  onPrev: () => void;
}

export const ReportStep2DetailsForm: FC<ReportStep2DetailsFormProps> = ({
  selectedCategory,
  recentUsers,
  selectedUser,
  setSelectedUser,
  description,
  setDescription,
  priority,
  setPriority,
  attachChatLogs,
  setAttachChatLogs,
  isSubmitting,
  onSubmit,
  onPrev,
}) => {
  const Icon = selectedCategory.icon;

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 animate-in fade-in duration-200 text-right"
    >
      {/* Category Reminder Pill */}
      <div className="flex items-center justify-between p-3.5 rounded-3xl bg-white dark:bg-[#102A4C] border border-slate-200/90 dark:border-white/10 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${selectedCategory.iconBgClass} shrink-0`}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div className="text-right">
            <span className="text-xs font-black text-[#123A68] dark:text-white block">
              {selectedCategory.title}
            </span>
            <span className="text-[10px] text-text-muted dark:text-slate-400 block">
              الفئة المحددة
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onPrev}
          className="text-[11px] font-bold text-[#123A68] dark:text-accent hover:underline cursor-pointer"
        >
          تغيير الفئة
        </button>
      </div>

      {/* Select Associated User */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-3">
        <label className="text-xs font-black text-[#123A68] dark:text-white block">
          الشخص المعني بالبلاغ (اختياري)
        </label>
        {recentUsers.length > 0 ? (
          <div className="space-y-2">
            {recentUsers.map((user) => {
              const isUserSelected = selectedUser === user.id;
              return (
                <div
                  key={user.id}
                  onClick={() =>
                    setSelectedUser(isUserSelected ? null : user.id)
                  }
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                    isUserSelected
                      ? "bg-[#F0F7FF] dark:bg-[#0B1E36] border-[#123A68] dark:border-accent ring-1 ring-[#123A68]/15 dark:ring-accent/20"
                      : "bg-[#F8FAFC] dark:bg-[#0B1E36]/60 border-slate-200/80 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-white text-[11px] font-black shrink-0 ${user.color}`}
                    >
                      {user.avatar}
                    </div>
                    <div className="text-right">
                      <h5 className="text-xs font-bold text-[#123A68] dark:text-white">
                        {user.name}
                      </h5>
                      <span className="text-[10px] text-text-muted dark:text-slate-400">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full border shrink-0 ${
                      isUserSelected
                        ? "border-[#123A68] dark:border-accent bg-[#123A68] dark:bg-accent text-white"
                        : "border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0B1E36]"
                    }`}
                  >
                    {isUserSelected && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] border border-slate-100 dark:border-white/10 text-center space-y-1">
            <p className="text-xs font-bold text-text-secondary dark:text-slate-300">
              لا يوجد أشخاص مرتبطون في سجل المحادثات حالياً
            </p>
            <p className="text-[10.5px] text-text-muted dark:text-slate-400">
              يمكنك كتابة بيانات الشخص في تفاصيل البلاغ أدناه
            </p>
          </div>
        )}
      </div>

      {/* Description Textarea */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-2">
        <label className="text-xs font-black text-[#123A68] dark:text-white block">
          تفاصيل البلاغ <span className="text-rose-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          placeholder="اشرح ما حدث بدقة مع ذكر التواريخ وأي تفاصيل تساعد فريق المراجعة..."
          className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-text-muted dark:placeholder:text-slate-400 focus:bg-white dark:focus:bg-[#0B1E36] focus:border-[#123A68] dark:focus:border-accent focus:outline-none resize-none text-right"
        />
      </div>

      {/* Priority Picker */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-3">
        <label className="text-xs font-black text-[#123A68] dark:text-white block">
          مستوى الأهمية
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { key: "LOW", label: "عادي" },
              {
                key: "MEDIUM",
                label: "متوسط",
              },
              {
                key: "HIGH",
                label: "عاجل جداً",
              },
            ] as const
          ).map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPriority(p.key)}
              className={`py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                priority === p.key
                  ? "bg-[#123A68] dark:bg-accent text-white shadow-xs"
                  : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Attach Chat Logs Toggle */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-4 border border-slate-200/90 dark:border-white/10 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="h-4 w-4 text-[#123A68] dark:text-accent shrink-0" />
          <div className="text-right">
            <span className="text-xs font-bold text-[#123A68] dark:text-white block">
              إرفاق سجل المحادثات تلقائياً
            </span>
            <span className="text-[10.5px] text-text-muted dark:text-slate-400 block">
              يساعد فريق التحقيق في اتخاذ القرار بشكل أسرع
            </span>
          </div>
        </div>
        <input
          type="checkbox"
          checked={attachChatLogs}
          onChange={(e) => setAttachChatLogs(e.target.checked)}
          className="h-4 w-4 rounded accent-[#123A68] dark:accent-accent cursor-pointer"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2.5 pt-1">
        <button
          type="submit"
          disabled={!description.trim() || isSubmitting}
          className="flex-1 h-12 flex items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 disabled:opacity-40 transition-all cursor-pointer shadow-md"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>جاري إرسال البلاغ...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4 -rotate-45" />
              <span>إرسال البلاغ لفريق الأمان</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onPrev}
          className="px-5 h-12 flex items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#132F54] text-xs font-black text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 active:scale-98 transition-all cursor-pointer"
        >
          السابق
        </button>
      </div>
    </form>
  );
};
