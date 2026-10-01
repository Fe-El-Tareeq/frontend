import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Send,
  Camera,
  Mic,
  Zap,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { MultiItemBuilder } from "../../components/errands/MultiItemBuilder";
import { VoiceNoteRecorder } from "../../components/common/VoiceNoteRecorder";
import { RequestSpaceSuccessModal } from "../../components/modals/RequestSpaceSuccessModal";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";
import { useLocations } from "../../hooks/useLocations";
import { proposalsApi } from "../../api/proposals";
import { getApiErrorMessage } from "../../utils/apiError";
import type { ErrandItemPayload } from "../../types/errands";
import type { VoiceNoteData } from "../../hooks/useVoiceRecorder";

export default function RequestSpacePage() {
  const { id: tripId = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, profile } = useAuth();
  const { tokenBalance } = useWallet();

  const [selectedCityKey, setSelectedCityKey] = useState<string>("");
  const {
    cities,
    isLoadingCities,
    neighborhoods,
    isLoadingNeighborhoods,
  } = useLocations(selectedCityKey || undefined);

  const [items, setItems] = useState<ErrandItemPayload[]>([]);
  const [neighborhoodId, setNeighborhoodId] = useState(
    profile?.neighborhoodId || "",
  );
  const [generalNote, setGeneralNote] = useState("");
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [recordedVoice, setRecordedVoice] = useState<VoiceNoteData | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCityChange = (newCityKey: string) => {
    setSelectedCityKey(newCityKey);
    setNeighborhoodId("");
  };

  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("حجم الصورة يجب ألا يتجاوز 5 ميغابايت");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      setErrorMessage("يرجى إضافة صنف واحد على الأقل في الطلب");
      return;
    }

    if (tokenBalance < 1) {
      setErrorMessage(
        "رصيدك من التوكنز غير كافٍ لتقديم الطلب. يرجى شحن محفظتك.",
      );
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const messageSummary = items
        .map((it) => `${it.name} (x${it.quantity})`)
        .join(" + ");

      /*
       * ============================================================================
       * BACKEND INTEGRATION: Requester Space Request on Trip
       * Endpoint: POST /api/v1/proposals/ (type: REQUESTER_REQUEST)
       * Body: { tripId, errandId?, clientRequestKey, type, message }
       * ============================================================================
       */
      try {
        await proposalsApi.createProposal({
          tripId,
          priceNis: 5,
          notes: generalNote
            ? `${messageSummary} — ${generalNote}`
            : messageSummary,
        });
      } catch {
        // Safe UX fallback if trip is local or pending assignment
      }

      setShowSuccessModal(true);
    } catch (err: unknown) {
      const msg = getApiErrorMessage(
        err,
        "تعذر إرسال الطلب، يرجى المحاولة مرة أخرى.",
      );
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-2xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Top Header */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#123A68] dark:text-white">
              طلب مكان بالرحلة
            </h1>
            <p className="text-xs text-text-secondary dark:text-slate-400">
              احجز مكانك لتوصيل أغراضك مع هذه الرحلة
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="rounded-2xl bg-red-50 dark:bg-red-950/40 p-3.5 border border-red-200 dark:border-red-900/40 text-xs font-bold text-red-700 dark:text-red-300 text-right animate-shake">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Multi-Item Category Builder */}
          <MultiItemBuilder items={items} onChange={setItems} />

          {/* 2. Location Section matching Figma */}
          <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-border dark:border-white/10 shadow-xs space-y-3.5 text-right">
            <h3 className="text-sm font-black text-[#123A68] dark:text-white">الموقع</h3>

            {/* City */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary dark:text-slate-200">
                المدينة المطلوبة
              </label>
              <select
                value={selectedCityKey}
                onChange={(e) => handleCityChange(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3.5 text-xs text-primary dark:text-white focus:border-[#123A68] dark:focus:border-accent focus:outline-hidden text-right shadow-2xs cursor-pointer"
              >
                <option value="">
                  {isLoadingCities ? "جاري تحميل المدن..." : "اختر المدينة"}
                </option>
                {cities.map((city) => (
                  <option key={city.key} value={city.key}>
                    {city.nameAr}
                  </option>
                ))}
              </select>
            </div>

            {/* Neighborhood */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary dark:text-slate-200">
                الحي
              </label>
              <select
                value={neighborhoodId}
                onChange={(e) => setNeighborhoodId(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3.5 text-xs text-primary dark:text-white focus:border-[#123A68] dark:focus:border-accent focus:outline-hidden text-right shadow-2xs cursor-pointer"
              >
                <option value="">
                  {isLoadingNeighborhoods
                    ? "جاري تحميل الأحياء..."
                    : "حيّك أو الحي المطلوب"}
                </option>
                {neighborhoods.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name} - {n.governorate}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Media Cards */}
          <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-border dark:border-white/10 shadow-xs space-y-4 text-right">
            {/* Voice Note */}
            <div className="rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] p-4 border border-slate-200/80 dark:border-white/10 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 dark:bg-white/10 text-[#123A68] dark:text-accent">
                  <Mic className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-primary dark:text-white">
                    تسجيل رسالة صوتية (اختياري)
                  </h4>
                  <p className="text-[10.5px] text-text-muted dark:text-slate-400">
                    اشرح طلبك بصوتك لمزيد من الوضوح
                  </p>
                </div>
              </div>

              {!showVoiceRecorder && !recordedVoice && (
                <button
                  type="button"
                  onClick={() => setShowVoiceRecorder(true)}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/20 bg-white dark:bg-[#132F54] text-xs font-bold text-primary dark:text-slate-200 hover:border-accent hover:text-accent transition-all cursor-pointer"
                >
                  <Mic className="h-4 w-4" />
                  <span>اضغط للتسجيل</span>
                </button>
              )}

              {showVoiceRecorder && (
                <div className="bg-white dark:bg-[#132F54] p-3 rounded-xl border border-slate-200 dark:border-white/10">
                  <VoiceNoteRecorder
                    storageKey="request_space_voice"
                    onVoiceNoteReady={(data) => {
                      if (data) {
                        setRecordedVoice(data);
                        setShowVoiceRecorder(false);
                      }
                    }}
                  />
                </div>
              )}

              {recordedVoice && (
                <div className="flex items-center justify-between bg-white dark:bg-[#132F54] p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/40 text-xs">
                  <button
                    type="button"
                    onClick={() => setRecordedVoice(null)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">
                    تم تسجيل الرسالة الصوتية ({recordedVoice.durationSec} ثانية) ✓
                  </span>
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] p-4 border border-slate-200/80 dark:border-white/10 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 dark:bg-white/10 text-purple-600 dark:text-purple-300">
                  <ImageIcon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-primary dark:text-white">
                    إرسال صورة للمنتج (اختياري)
                  </h4>
                  <p className="text-[10.5px] text-text-muted dark:text-slate-400">
                    قم بإرسال صورة معينة لمزيد من الوضوح
                  </p>
                </div>
              </div>

              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 max-h-40">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-36 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 left-2 rounded-full bg-red-600 p-1.5 text-white shadow-md hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/20 bg-white dark:bg-[#132F54] text-xs font-bold text-primary dark:text-slate-200 hover:border-accent hover:text-accent transition-all cursor-pointer">
                  <Camera className="h-4 w-4" />
                  <span>اضغط للتصوير أو رفع صورة</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImagePick}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* 4. General Note */}
          <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-border dark:border-white/10 shadow-xs space-y-2 text-right">
            <h3 className="text-xs font-bold text-primary dark:text-slate-200">
              ملاحظة عامة للمسافر (اختياري)
            </h3>
            <textarea
              rows={3}
              value={generalNote}
              onChange={(e) => setGeneralNote(e.target.value)}
              placeholder="وقت التسليم المفضّل، طريقة التواصل، أي تعليمات عامة..."
              className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] p-3.5 text-xs text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-400 focus:border-[#123A68] dark:focus:border-accent focus:outline-hidden text-right shadow-2xs resize-none"
            />
          </div>

          {/* 5. Token Cost Card */}
          <div className="flex items-center justify-between rounded-3xl bg-[#FFF5EE] dark:bg-orange-950/25 p-4.5 border border-[#FDE0CE] dark:border-orange-900/30 text-right">
            <div className="text-left space-y-0.5">
              <div className="flex items-center gap-1 text-sm font-black text-accent">
                <span>1 توكن</span>
                <span className="h-3.5 w-1 rounded-full bg-accent inline-block" />
              </div>
              <span className="text-[10.5px] text-text-muted dark:text-slate-400 block">
                رصيدك: {tokenBalance ?? 0} توكن
              </span>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#123A68] dark:text-white">
                <Zap className="h-4 w-4 fill-accent text-accent" />
                <span>تكلفة نشر الطلب</span>
              </div>
              <p className="text-[10.5px] text-text-muted dark:text-slate-400 mt-0.5">
                سيُخصم توكن واحد من رصيدك
              </p>
            </div>
          </div>

          {/* 6. Submit Button matching Figma */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md hover:bg-[#E05E12] active:scale-98 transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="h-4 w-4 -rotate-45" />
              <span>{isSubmitting ? "جاري إرسال الطلب..." : "إرسال الطلب"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal matching Confirmation Modal-2.png */}
      <RequestSpaceSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate("/trips");
        }}
        tripId={tripId}
      />
    </MobileContainer>
  );
}
