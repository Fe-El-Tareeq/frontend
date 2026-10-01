import type { FC, FormEvent } from "react";
import { X, Send, Loader2, Check } from "lucide-react";

interface SupportEmailTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  emailTopic: string;
  setEmailTopic: (v: string) => void;
  emailMessage: string;
  setEmailMessage: (v: string) => void;
  emailSubmitting: boolean;
  emailError: string | null;
  emailSuccess: string | null;
  onSubmit: (e: FormEvent) => void;
}

export const SupportEmailTicketModal: FC<SupportEmailTicketModalProps> = ({
  isOpen,
  onClose,
  emailTopic,
  setEmailTopic,
  emailMessage,
  setEmailMessage,
  emailSubmitting,
  emailError,
  emailSuccess,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div
        className="relative max-w-md w-full bg-white dark:bg-[#102A4C] rounded-3xl p-5 shadow-xl space-y-4 animate-in zoom-in-95 duration-200 border border-transparent dark:border-white/10"
        dir="rtl"
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/10">
          <h3 className="text-sm font-black text-[#123A68] dark:text-white">
            إرسال تذكرة بريد إلكتروني
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {emailError && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-bold rounded-2xl border border-red-200 dark:border-red-900/50">
            {emailError}
          </div>
        )}

        {emailSuccess ? (
          <div className="py-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-3" />
            </div>
            <p className="text-xs font-black text-[#123A68] dark:text-white">{emailSuccess}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="space-y-1 text-right">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                موضوع الاستفسار
              </label>
              <select
                value={emailTopic}
                onChange={(e) => setEmailTopic(e.target.value)}
                required
                className="w-full h-11 px-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] text-xs font-bold text-slate-800 dark:text-white focus:bg-white dark:focus:bg-[#0B1E36] focus:border-[#123A68] dark:focus:border-[#38BDF8] focus:outline-none"
              >
                <option value="" className="dark:bg-[#0B1E36]">اختر موضوع الاستفسار...</option>
                <option value="PAYMENT_TOKEN" className="dark:bg-[#0B1E36]">الدفع والتوكنز</option>
                <option value="TRIP_ISSUE" className="dark:bg-[#0B1E36]">مشكلة في رحلة</option>
                <option value="ERRAND_DELIVERY" className="dark:bg-[#0B1E36]">توصيل غرض</option>
                <option value="ACCOUNT_SECURITY" className="dark:bg-[#0B1E36]">الحساب والأمان</option>
                <option value="OTHER" className="dark:bg-[#0B1E36]">أخرى</option>
              </select>
            </div>

            <div className="space-y-1 text-right">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                نص الرسالة
              </label>
              <textarea
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                required
                rows={4}
                placeholder="اكتب تفاصيل استفسارك أو مشكلتك..."
                className="w-full p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] text-xs font-bold text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#0B1E36] focus:border-[#123A68] dark:focus:border-[#38BDF8] focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={emailSubmitting}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-[#123A68] dark:bg-[#1E4E8C] text-xs font-black text-white hover:bg-[#0D2C50] dark:hover:bg-[#2563EB] active:scale-98 disabled:opacity-50 transition-all cursor-pointer shadow-md"
            >
              {emailSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>جاري الإرسال...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 -rotate-45" />
                  <span>إرسال الرسالة</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
