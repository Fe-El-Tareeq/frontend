import { useState } from "react";
import type { FC } from "react";
import { Send, Phone, Mail, Globe } from "lucide-react";

export const ContactSection: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="space-y-4 pt-2">
      <div className="text-center space-y-1">
        <h2 className="text-base font-black text-[#123A68]">تواصل معنا</h2>
        <p className="text-xs text-text-secondary">
          نحن هنا للإجابة عن أسئلتك ومساعدتك دائماً
        </p>
      </div>

      <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-4 text-right">
        {/* Contact Info Badges */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-slate-50 p-2.5 border border-slate-200/80">
            <Phone className="h-4 w-4 text-primary mx-auto mb-1" />
            <span className="text-[10px] font-bold text-text-secondary block" dir="ltr">
              059X-XXX-XXX
            </span>
          </div>
          <div className="rounded-2xl bg-slate-50 p-2.5 border border-slate-200/80">
            <Mail className="h-4 w-4 text-accent mx-auto mb-1" />
            <span className="text-[10px] font-bold text-text-secondary block">
              الدعم الفني
            </span>
          </div>
          <div className="rounded-2xl bg-slate-50 p-2.5 border border-slate-200/80">
            <Globe className="h-4 w-4 text-emerald-600 mx-auto mb-1" />
            <span className="text-[10px] font-bold text-text-secondary block">
              غزة، فلسطين
            </span>
          </div>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {isSubmitted && (
            <div className="rounded-xl bg-emerald-50 p-2.5 text-center text-xs font-bold text-emerald-700 border border-emerald-200">
              شكراً لتواصلك! تم استلام رسالتك وسنرد قريباً.
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold text-text-muted block mb-1">
              الاسم
            </label>
            <input
              type="text"
              required
              placeholder="اسمك الكريم"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-text-muted block mb-1">
              رقم الهاتف
            </label>
            <input
              type="tel"
              required
              placeholder="059X-XXX-XXX"
              dir="ltr"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary text-right placeholder:text-text-muted focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-text-muted block mb-1">
              الرسالة
            </label>
            <textarea
              rows={3}
              required
              placeholder="اكتب استفسارك أو اقتراحك هنا..."
              className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-3 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all shadow-md"
          >
            <Send className="h-4 w-4 -rotate-45" />
            <span>إرسال الرسالة</span>
          </button>
        </form>
      </div>
    </section>
  );
};
