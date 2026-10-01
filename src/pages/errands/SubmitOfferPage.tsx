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
import { getApiErrorMessage } from "../../utils/apiError";
import type { VoiceNoteData } from "../../hooks/useVoiceRecorder";

export default function SubmitOfferPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("");
  const { cities, isLoadingCities, neighborhoods, isLoadingNeighborhoods } =
    useLocations(selectedCity || undefined);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [origin, setOrigin] = useState("");
  const [proposedPrice, setProposedPrice] = useState("");
  const [message, setMessage] = useState("");
  const [recordedVoice, setRecordedVoice] = useState<VoiceNoteData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (id) {
        await errandsApi.submitOffer(id, {
          priceNis: Number(proposedPrice) || 0,
          departureTime: `${date} ${time}`,
          notes:
            message +
            (recordedVoice
              ? ` [ملاحظة صوتية: ${recordedVoice.durationSec} ثانية]`
              : ""),
        });
      }
      setShowSuccessModal(true);
    } catch (err: unknown) {
      const msg = getApiErrorMessage(
        err,
        "تعذر إرسال العرض، يرجى التأكد من البيانات والمحاولة مجدداً.",
      );
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#123A68] dark:text-white">
              تقديم عرض للطلب
            </h1>
            <p className="text-xs text-text-secondary dark:text-slate-400">
              اعرض مساعدتك في توصيل هذا الطلب
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="rounded-2xl bg-red-50 dark:bg-red-950/40 p-3.5 border border-red-200 dark:border-red-900/40 text-xs font-bold text-red-700 dark:text-red-300 text-right animate-shake">
            {errorMessage}
          </div>
        )}

        {/* Form Card */}
        <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-border dark:border-white/10 shadow-xs text-right">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Trip Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-primary dark:text-white">
                  تاريخ الرحلة <span className="text-[#F36F21]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] pr-10 pl-3 text-xs text-primary dark:text-white focus:border-accent focus:outline-none"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-muted dark:text-slate-400">
                    <Calendar className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-primary dark:text-white">
                  وقت المغادرة <span className="text-[#F36F21]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] pr-10 pl-3 text-xs text-primary dark:text-white focus:border-accent focus:outline-none"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-muted dark:text-slate-400">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* City & Neighborhood Selection */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-primary dark:text-white">
                  مدينة الانطلاق <span className="text-[#F36F21]">*</span>
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setOrigin("");
                  }}
                  className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3 text-xs text-primary dark:text-white focus:border-[#123A68] dark:focus:border-accent focus:outline-hidden text-right shadow-2xs cursor-pointer"
                >
                  <option value="">
                    {isLoadingCities ? "جاري التحميل..." : "اختر المدينة"}
                  </option>
                  {cities && cities.length > 0 ? (
                    cities.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.nameAr}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="gaza">غزة</option>
                      <option value="north_gaza">شمال غزة</option>
                      <option value="deir_al_balah">دير البلح</option>
                      <option value="khan_younis">خان يونس</option>
                      <option value="rafah">رفح</option>
                    </>
                  )}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-primary dark:text-white">
                  حي الانطلاق <span className="text-[#F36F21]">*</span>
                </label>
                <select
                  required
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3 text-xs text-primary dark:text-white focus:border-accent focus:outline-none"
                >
                  <option value="">
                    {isLoadingNeighborhoods
                      ? "جاري تحميل الأحياء..."
                      : "اختر الحي"}
                  </option>
                  {neighborhoods.map((n) => (
                    <option key={n.id} value={n.name}>
                      {n.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Proposed Price */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary dark:text-white">
                أجر التوصيل المقترح بالشيكل (اختياري)
              </label>
              <input
                type="number"
                value={proposedPrice}
                onChange={(e) => setProposedPrice(e.target.value)}
                placeholder="مثال: 5 شيكل"
                className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3.5 text-xs text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-500 focus:border-accent focus:outline-none text-right"
              />
            </div>

            {/* Message to Requester */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary dark:text-white">
                رسالة للمرسل
              </label>
              <textarea
                rows={3}
                maxLength={150}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="عرّف نفسك باختصار و اشرح كيف يمكنك مساعدته..."
                className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] p-3.5 text-xs text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-500 focus:border-accent focus:outline-none resize-none text-right"
              />
              <div className="text-left text-[10.5px] text-text-muted dark:text-slate-400">
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
