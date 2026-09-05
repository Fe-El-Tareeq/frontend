import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Send, Info } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { RequestSpaceSuccessModal } from "../../components/modals/RequestSpaceSuccessModal";
import { VoiceNoteRecorder } from "../../components/common/VoiceNoteRecorder";
import { tripsApi } from "../../api/trips";
import { useAuth } from "../../hooks/useAuth";
import type { VoiceNoteData } from "../../hooks/useVoiceRecorder";

export default function RequestSpacePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useAuth();

  const [description, setDescription] = useState("");
  const [size, setSize] = useState("LIGHT");
  const [pickupPoint, setPickupPoint] = useState("");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [notes, setNotes] = useState("");
  const [recordedVoice, setRecordedVoice] = useState<VoiceNoteData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (id) {
        await tripsApi.bookSpace(id, {
          notes: `${description} (${size}) - نقطة الاستلام: ${pickupPoint} - هاتف: ${phone}. ${notes}${
            recordedVoice ? ` [ملاحظة صوتية: ${recordedVoice.durationSec} ثانية]` : ""
          }`,
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
    <MobileContainer className="bg-[#F8FAFC] pb-16 text-right">
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
              طلب مكان بالرحلة
            </h1>
            <p className="text-xs text-text-secondary">
              احجز مكانك لتوصيل أغراضك مع هذه الرحلة
            </p>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs text-right">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Description */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                وصف الأغراض <span className="text-[#F36F21]">*</span>
              </label>
              <textarea
                rows={3}
                required
                maxLength={150}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="مثال: طرد صغير، أدوية، مستندات مهمة..."
                className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-3.5 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none resize-none text-right"
              />
              <div className="text-left text-[10.5px] text-text-muted">
                {description.length}/150 حرف
              </div>
            </div>

            {/* Approximate size */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                الحجم أو الوزن التقريبي
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary focus:border-accent focus:outline-none"
              >
                <option value="LIGHT">خفيف (أقل من 1 كجم)</option>
                <option value="MEDIUM">متوسط (1 - 4 كجم)</option>
                <option value="HEAVY">كبير أو ثقيل (أكثر من 4 كجم)</option>
              </select>
            </div>

            {/* Pickup point */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                نقطة الاستلام
              </label>
              <input
                type="text"
                value={pickupPoint}
                onChange={(e) => setPickupPoint(e.target.value)}
                placeholder="حيّك أو أقرب نقطة التقاء"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none text-right"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                رقم التواصل <span className="text-[#F36F21]">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05X XXX XXXX"
                dir="ltr"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary text-right placeholder:text-text-muted focus:border-accent focus:outline-none"
              />
            </div>

            {/* Voice note option */}
            <VoiceNoteRecorder
              storageKey={`space_${id || "draft"}`}
              onVoiceNoteReady={(note) => setRecordedVoice(note)}
            />

            {/* Additional notes */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                ملاحظات إضافية
              </label>
              <textarea
                rows={2}
                maxLength={100}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أي تعليمات أو تفاصيل أخرى تود إضافتها..."
                className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-3.5 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none resize-none text-right"
              />
            </div>

            {/* Security Tip Box */}
            <div className="rounded-2xl bg-blue-50/50 p-3 border border-blue-100 flex items-start gap-2.5 text-right">
              <Info className="h-4 w-4 text-[#123A68] shrink-0 mt-0.5" />
              <p className="text-[11px] text-text-secondary leading-relaxed">
                سيتلقى السائق إشعاراً فورياً بطلبك. لن يتم مشاركة أي معلومات حساسة
                حتى يتم تأكيد الحجز المتبادل.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all disabled:opacity-60 cursor-pointer shadow-md"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? "جاري الإرسال..." : "إرسال طلب الحجز"}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <RequestSpaceSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate("/trips");
        }}
      />
    </MobileContainer>
  );
}
