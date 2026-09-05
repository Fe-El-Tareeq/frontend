import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Calendar,
  Clock,
  Send,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { SubmitOfferSuccessModal } from "../../components/modals/SubmitOfferSuccessModal";
import { VoiceNoteRecorder } from "../../components/common/VoiceNoteRecorder";
import { useLocations } from "../../hooks/useLocations";
import { errandsApi } from "../../api/errands";
import type { VoiceNoteData } from "../../hooks/useVoiceRecorder";

export default function SubmitOfferPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { neighborhoods } = useLocations();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [origin, setOrigin] = useState("");
  const [proposedPrice, setProposedPrice] = useState("");
  const [message, setMessage] = useState("");
  const [recordedVoice, setRecordedVoice] = useState<VoiceNoteData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (id) {
        await errandsApi.submitOffer(id, {
          priceNis: Number(proposedPrice) || 0,
          departureTime: `${date} ${time}`,
          notes: message + (recordedVoice ? ` [ملاحظة صوتية: ${recordedVoice.durationSec} ثانية]` : ""),
        });
      }
      setShowSuccessModal(true);
    } catch {
      setShowSuccessModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
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
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs text-right">
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
                أجر التوصيل المقترح بالشيكل (اختياري)
              </label>
              <input
                type="number"
                value={proposedPrice}
                onChange={(e) => setProposedPrice(e.target.value)}
                placeholder="مثال: 5 شيكل"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none text-right"
              />
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
                className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-3.5 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none resize-none text-right"
              />
              <div className="text-left text-[10.5px] text-text-muted">
                {message.length}/150 حرف
              </div>
            </div>

            {/* Voice Note Option */}
            <VoiceNoteRecorder
              storageKey={`offer_${id || "draft"}`}
              onVoiceNoteReady={(note) => setRecordedVoice(note)}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all disabled:opacity-60 cursor-pointer shadow-md"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? "جاري الإرسال..." : "إرسال العرض الآن"}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <SubmitOfferSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate("/errands");
        }}
      />
    </MobileContainer>
  );
}
