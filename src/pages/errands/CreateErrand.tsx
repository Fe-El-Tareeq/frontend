import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Camera,
  Mic,
  Package,
  Zap,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { MultiItemBuilder } from "../../components/errands/MultiItemBuilder";
import { VoiceNoteRecorder } from "../../components/common/VoiceNoteRecorder";
import { useErrands } from "../../hooks/useErrands";
import { useWallet } from "../../hooks/useWallet";
import { useAuth } from "../../hooks/useAuth";
import { useLocations } from "../../hooks/useLocations";
import { getApiErrorMessage } from "../../utils/apiError";
import type { ErrandItemPayload } from "../../types/errands";
import type { VoiceNoteData } from "../../hooks/useVoiceRecorder";

const createClientRequestKey = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default function CreateErrand() {
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
  const { createErrand, isCreating } = useErrands();

  const [items, setItems] = useState<ErrandItemPayload[]>([]);
  const [neighborhoodId, setNeighborhoodId] = useState(
    profile?.neighborhoodId || "",
  );
  const [generalNote, setGeneralNote] = useState("");
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [recordedVoice, setRecordedVoice] = useState<VoiceNoteData | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedCityName =
    cities.find((c) => c.key === selectedCityKey)?.nameAr ||
    cities[0]?.nameAr ||
    "غزة";

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

  const handleCityChange = (newCityKey: string) => {
    setSelectedCityKey(newCityKey);
    setNeighborhoodId("");
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
        "رصيدك من التوكنز غير كافٍ لنشر طلب جديد. يرجى شحن محفظتك.",
      );
      return;
    }

    setErrorMessage(null);
    try {
      const clientRequestKey = createClientRequestKey();
      const targetNeighborhoodId =
        neighborhoodId ||
        profile?.neighborhoodId ||
        (neighborhoods.length > 0
          ? neighborhoods[0].id
          : "60a32850-bd3f-444a-84b4-c750abf6ecb6");

      // Build overall title & description from items
      const mainTitle = items.map((it) => it.name).join(" + ");
      const itemsSummary = items
        .map(
          (it) =>
            `${it.categoryName || ""}: ${it.name} (كمية ${it.quantity}x)` +
            (it.itemNote ? ` [${it.itemNote}]` : ""),
        )
        .join(" | ");

      const fullDescription = generalNote.trim()
        ? `${itemsSummary} — ملاحظة عامة: ${generalNote.trim()}`
        : itemsSummary;

      // Sanitize items according to backend strict errandItemSchema:
      // only { categoryId, name, description?, quantity, size, isUrgent?, itemNote? }
      const sanitizedItems = items.map((it) => ({
        categoryId: it.categoryId || "ffcb81e7-6ee6-4be3-9de2-188b1da4f395",
        name: it.name.trim(),
        description: it.description?.trim() || null,
        quantity: Math.max(1, Number(it.quantity) || 1),
        size: it.size,
        isUrgent: Boolean(it.isUrgent),
        itemNote: it.itemNote?.trim() || null,
      }));

      // Top level payload strictly conforms to backend createErrandSchema:
      // voiceNoteUrl and imageUrls must be valid HTTP/HTTPS URLs (not Base64 data URLs)
      const isHttpUrl = (val?: string | null): boolean =>
        Boolean(val && /^https?:\/\//i.test(val));

      await createErrand({
        clientRequestKey,
        pickupNeighborhoodId: targetNeighborhoodId,
        destinationKeyword: selectedCityName,
        title: mainTitle.slice(0, 80),
        itemsDescription: fullDescription.slice(0, 1000),
        isInterZone: false,
        voiceNoteUrl: isHttpUrl(recordedVoice?.base64)
          ? recordedVoice!.base64
          : null,
        voiceNoteDurationSec: isHttpUrl(recordedVoice?.base64)
          ? recordedVoice?.durationSec || null
          : null,
        imageUrls: isHttpUrl(imagePreview) ? [imagePreview!] : [],
        items: sanitizedItems,
      });

      navigate("/errands");
    } catch (err: unknown) {
      const msg = getApiErrorMessage(
        err,
        "تعذر نشر الطلب، يرجى مراجعة البيانات المدخلة والمحاولة مجدداً.",
      );
      setErrorMessage(msg);
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Top Header */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#123A68]">
              إنشاء طلب جديد
            </h1>
            <p className="text-xs text-text-secondary">
              صف ما تحتاجه وسيجدك المسافرون المناسبون
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="rounded-2xl bg-red-50 p-3.5 border border-red-200 text-xs font-bold text-red-700 text-right animate-shake">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Multi-Item Builder matching Component 36 & Figma */}
          <MultiItemBuilder items={items} onChange={setItems} />

          {/* 2. Location Section matching Figma */}
          <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-3.5 text-right">
            <h3 className="text-sm font-black text-[#123A68]">الموقع</h3>

            {/* City */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                المدينة المطلوبة
              </label>
              <select
                value={selectedCityKey}
                onChange={(e) => handleCityChange(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary focus:border-[#123A68] focus:outline-hidden text-right shadow-2xs cursor-pointer"
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
              <label className="block text-xs font-bold text-primary">
                الحي
              </label>
              <select
                value={neighborhoodId}
                onChange={(e) => setNeighborhoodId(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary focus:border-[#123A68] focus:outline-hidden text-right shadow-2xs cursor-pointer"
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

          {/* 3. Media Cards: Voice Note & Image Upload matching Figma */}
          <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-4 text-right">
            {/* Voice Note Card */}
            <div className="rounded-2xl bg-[#F8FAFC] p-4 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#123A68]">
                  <Mic className="h-4.5 w-4.5" />
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

              {!showVoiceRecorder && !recordedVoice && (
                <button
                  type="button"
                  onClick={() => setShowVoiceRecorder(true)}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-white text-xs font-bold text-primary hover:border-accent hover:text-accent transition-all cursor-pointer"
                >
                  <Mic className="h-4 w-4" />
                  <span>اضغط للتسجيل</span>
                </button>
              )}

              {showVoiceRecorder && (
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <VoiceNoteRecorder
                    storageKey="errand_create_voice"
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
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-emerald-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setRecordedVoice(null)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <span className="font-bold text-emerald-700">
                    تم تسجيل الرسالة الصوتية ({recordedVoice.durationSec} ثانية) ✓
                  </span>
                </div>
              )}
            </div>

            {/* Image Upload Card */}
            <div className="rounded-2xl bg-[#F8FAFC] p-4 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <ImageIcon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-primary">
                    إرسال صورة للمنتج (اختياري)
                  </h4>
                  <p className="text-[10.5px] text-text-muted">
                    قم بإرسال صورة معينة لمزيد من الوضوح
                  </p>
                </div>
              </div>

              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-h-40">
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
                <label className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-white text-xs font-bold text-primary hover:border-accent hover:text-accent transition-all cursor-pointer">
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

          {/* 4. General Note Section matching Figma */}
          <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-2 text-right">
            <h3 className="text-xs font-bold text-primary">
              ملاحظة عامة للمسافر (اختياري)
            </h3>
            <textarea
              rows={3}
              value={generalNote}
              onChange={(e) => setGeneralNote(e.target.value)}
              placeholder="وقت التسليم المفضّل، طريقة التواصل، أي تعليمات عامة..."
              className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-3.5 text-xs text-primary placeholder:text-text-muted focus:border-[#123A68] focus:outline-hidden text-right shadow-2xs resize-none"
            />
          </div>

          {/* 5. Token Cost Card matching Figma */}
          <div className="flex items-center justify-between rounded-3xl bg-[#FFF5EE] p-4.5 border border-[#FDE0CE] text-right">
            <div className="text-left space-y-0.5">
              <div className="flex items-center gap-1 text-sm font-black text-accent">
                <span>1 توكن</span>
                <span className="h-3.5 w-1 rounded-full bg-accent inline-block" />
              </div>
              <span className="text-[10.5px] text-text-muted block">
                رصيدك: {tokenBalance ?? 0} توكن
              </span>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#123A68]">
                <Zap className="h-4 w-4 fill-accent text-accent" />
                <span>تكلفة نشر الطلب</span>
              </div>
              <p className="text-[10.5px] text-text-muted mt-0.5">
                سيُخصم توكن واحد من رصيدك
              </p>
            </div>
          </div>

          {/* 6. Actions */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={isCreating}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md hover:bg-[#E05E12] active:scale-98 transition-all cursor-pointer disabled:opacity-50"
            >
              <Package className="h-4 w-4" />
              <span>{isCreating ? "جاري نشر الطلب..." : "نشر الطلب"}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full py-2 text-center text-xs font-bold text-text-secondary hover:text-primary transition-colors cursor-pointer"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </MobileContainer>
  );
}
