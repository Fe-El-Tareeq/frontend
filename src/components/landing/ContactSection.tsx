import { useState } from "react";
import type { FC } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const ContactSection: FC = () => {
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setName("");
    setContactInfo("");
    setMessage("");
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="space-y-4 pt-4 text-right">
      {/* Section Header */}
      <div className="space-y-1">
        <span className="text-xs font-black text-[#F36F21] block">
          تواصل معنا
        </span>
        <h2 className="text-2xl font-black text-[#123A68] dark:text-white">نحن هنا لمساعدتك</h2>
        <p className="text-xs text-text-secondary dark:text-slate-300 leading-relaxed">
          فريق الدعم متاح للإجابة على استفساراتك ومساعدتك على مدار الساعة.
        </p>
      </div>

      {/* 3 Contact Info Rows */}
      <div className="space-y-3 pt-1">
        {/* Email */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#123A68] dark:bg-[#1E4E8C] text-white">
            <Mail className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[11px] text-text-muted dark:text-slate-400 block">
              البريد الإلكتروني
            </span>
            <span className="text-xs font-bold text-[#123A68] dark:text-white">
              support@bitareeqak.ps
            </span>
          </div>
        </div>

        {/* WhatsApp / Phone */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#123A68] dark:bg-[#1E4E8C] text-white">
            <Phone className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[11px] text-text-muted dark:text-slate-400 block">
              واتساب والدعم الفني
            </span>
            <span className="text-xs font-bold text-[#123A68] dark:text-white" dir="ltr">
              +970 59 123 4567
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#123A68] dark:bg-[#1E4E8C] text-white">
            <MapPin className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[11px] text-text-muted dark:text-slate-400 block">المقر</span>
            <span className="text-xs font-bold text-[#123A68] dark:text-white">
              غزة، فلسطين
            </span>
          </div>
        </div>
      </div>

      {/* Message Form Card */}
      <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3.5">
        <h3 className="text-sm font-black text-[#123A68] dark:text-white">أرسل رسالة</h3>

        {isSubmitted && (
          <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-center text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
            تم إرسال رسالتك بنجاح! سنرد عليك في أقرب وقت.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-text-muted dark:text-slate-400 block">
              الاسم الكامل
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك"
              className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3.5 text-xs text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-500 focus:border-accent focus:outline-none"
            />
          </div>

          {/* Contact info */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-text-muted dark:text-slate-400 block">
              البريد أو الهاتف
            </label>
            <input
              type="text"
              required
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="your@email.com / 059..."
              className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3.5 text-xs text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-500 focus:border-accent focus:outline-none"
            />
          </div>

          {/* Message */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-text-muted dark:text-slate-400 block">
              الرسالة
            </label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] p-3 text-xs text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-500 focus:border-accent focus:outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all shadow-md cursor-pointer"
          >
            <Send className="h-4 w-4 -rotate-45" />
            <span>إرسال رسالتك</span>
          </button>
        </form>
      </div>
    </section>
  );
};
