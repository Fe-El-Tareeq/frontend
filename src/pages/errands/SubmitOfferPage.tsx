import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Calendar,
  Clock,
  MessageSquare,
  Mic,
  Send,
  Zap,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useLocations } from "../../hooks/useLocations";
import { useWallet } from "../../hooks/useWallet";

export default function SubmitOfferPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { neighborhoods } = useLocations();
  const { tokenBalance } = useWallet();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [origin, setOrigin] = useState("");
  const [proposedPrice, setProposedPrice] = useState("");
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/errands/${id}`);
    }, 1000);
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary hover:text-accent transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#123A68]">
              تقديم عرض للطلب
            </h1>
            <p className="text-xs text-text-secondary">
              اعرض مساعدتك في توصيل هذا الطلب
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Trip Date */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                تاريخ الرحلة <span className="text-[#F36F21]">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] pr-11 pl-4 text-xs text-primary focus:border-accent focus:outline-none"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-text-muted">
                  <Calendar className="h-4.5 w-4.5" />
                </div>
              </div>
            </div>

            {/* Departure Time */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                وقت المغادرة <span className="text-[#F36F21]">*</span>
              </label>
              <div className="relative">
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] pr-11 pl-4 text-xs text-primary focus:border-accent focus:outline-none"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-text-muted">
                  <Clock className="h-4.5 w-4.5" />
                </div>
              </div>
            </div>

            {/* Origin */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                منطقة الانطلاق <span className="text-[#F36F21]">*</span>
              </label>
              <select
                required
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary focus:border-accent focus:outline-none"
              >
                <option value="">مثال: الرمال</option>
                {neighborhoods.map((n) => (
                  <option key={n.id} value={n.name}>
                    {n.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Proposed Price */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                السعر المقترح (اختياري)
              </label>
              <input
                type="text"
                value={proposedPrice}
                onChange={(e) => setProposedPrice(e.target.value)}
                placeholder="مثال: مجاني، أو حدد مبلغ للتوصيل"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
              >
              </input>
            </div>

            {/* Message to Requester */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                رسالة للمرسل
              </label>
              <textarea
                rows={3}
                maxLength={150}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="عرّف نفسك باختصار و اشرح كيف يمكنك مساعدته..."
                className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-3.5 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none resize-none"
              />
              <div className="text-left text-[10.5px] text-text-muted">
                {message.length}/150 حرف
              </div>
            </div>

            {/* Voice Note Option */}
            <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-[#123A68]">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-primary">
                    تسجيل رسالة صوتية (اختياري)
                  </h4>
                  <p className="text-[10.5px] text-text-muted">
                    اشرح طلبك بصوتك لمزيد من الوضوح
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`flex h-10 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed text-xs font-bold transition-all ${
                  isRecording
                    ? "border-red-400 bg-red-50 text-red-600 animate-pulse"
                    : "border-slate-300 bg-white text-primary hover:border-accent"
                }`}
              >
                <Mic className="h-4 w-4" />
                <span>
                  {isRecording
                    ? "جاري التسجيل... اضغط للإيقاف"
                    : "اضغط للتسجيل"}
                </span>
              </button>
            </div>

            {/* Token Fee Box */}
            <div className="flex items-center justify-between rounded-2xl bg-[#FFF5EE] p-3.5 border border-[#FDE0CE]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#F36F21]">
                <Zap className="h-4 w-4 fill-[#F36F21]" />
                <span>توكن واحد</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-[#123A68] block">
                  تكلفة تقديم العرض
                </span>
                <span className="text-[10.5px] text-text-secondary">
                  رصيدك {tokenBalance || 47} توكن
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all disabled:opacity-60"
              >
                <Send className="h-4 w-4 -rotate-45" />
                <span>{isSubmitting ? "جاري الإرسال..." : "إرسال العرض"}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-3 text-xs font-bold text-text-secondary hover:text-primary"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
    </MobileContainer>
  );
}
