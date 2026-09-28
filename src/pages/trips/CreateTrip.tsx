import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Car, Info, ShieldAlert, ShieldCheck, Clock } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useTrips } from "../../hooks/useTrips";
import { useLocations } from "../../hooks/useLocations";
import { useAuth } from "../../hooks/useAuth";
import { getApiErrorMessage } from "../../utils/apiError";
import type { WeightClass } from "../../types/errands";

const createClientRequestKey = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : "req-" + Math.random().toString(36).substring(2, 15);

export default function CreateTrip() {
  const navigate = useNavigate();
  const { profile, isAuthenticated } = useAuth();
  const { createTrip, isCreating } = useTrips();
  const [selectedCity, setSelectedCity] = useState("غزة");
  const { cities, neighborhoods, isLoadingNeighborhoods } = useLocations(selectedCity);

  const isVerified = profile?.verificationStatus === "VERIFIED" || profile?.isVerified === true;
  const isPendingKyc = profile?.verificationStatus === "PENDING_REVIEW";

  const [destinationKeyword, setDestinationKeyword] = useState("");
  const [destinationNeighborhoodId, setDestinationNeighborhoodId] =
    useState("");
  const [departureDate, setDepartureDate] = useState(() =>
    new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().split("T")[0],
  );
  const [departureTime, setDepartureTime] = useState("10:00");
  const [capacityClass, setCapacityClass] = useState<WeightClass>("MEDIUM");
  const [capacityUnits, setCapacityUnits] = useState(2);
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!isVerified) {
      if (isPendingKyc) {
        setErrorMessage("طلب التحقق من هويتك قيد المراجعة حالياً من قبل إدارة المنصة. ستتمكن من نشر الرحلات فور اعتماده.");
      } else {
        setErrorMessage("يجب التحقق من الهوية أولاً لنشر رحلة كمسافر وفق معايير الأمان.");
        navigate("/verify-identity");
      }
      return;
    }

    setErrorMessage(null);

    try {
      const clientRequestKey = createClientRequestKey();

      const targetNeighborhoodId =
        destinationNeighborhoodId ||
        (neighborhoods.length > 0
          ? neighborhoods[0].id
          : "60a32850-bd3f-444a-84b4-c750abf6ecb6");

      const departureIso = new Date(
        `${departureDate}T${departureTime}:00`,
      ).toISOString();
      const returnIso = new Date(
        new Date(departureIso).getTime() + 4 * 60 * 60 * 1000,
      ).toISOString();

      await createTrip({
        clientRequestKey,
        originType: "DEFAULT_NEIGHBORHOOD",
        destinationKeyword: destinationKeyword || "وسط البلد",
        destinationNeighborhoodId: targetNeighborhoodId,
        departureTime: departureIso,
        expectedReturnTime: returnIso,
        maxCapacityClass: capacityClass,
        maxCapacityUnits: Number(capacityUnits) || 2,
        notes: notes.trim() ? notes.trim() : null,
      });

      navigate("/trips");
    } catch (err: unknown) {
      const msg = getApiErrorMessage(
        err,
        "تعذر إنشاء الرحلة، يرجى التأكد من اختيار موعد في المستقبل وتحديد الوجهة.",
      );
      setErrorMessage(msg);
      if (msg.includes("التحقق من الهوية") || msg.includes("Identity verification")) {
        navigate("/verify-identity");
      }
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
              إضافة رحلة جديدة
            </h1>
            <p className="text-xs text-text-secondary">
              شارك مسار رحلتك وساعد أهالي منطقتك بنقل أغراضهم
            </p>
          </div>
        </div>

        {/* Identity Verification Status Card */}
        {!isVerified && !isPendingKyc && (
          <div className="rounded-3xl bg-amber-50 p-4 border border-amber-200 text-right space-y-2.5">
            <div className="flex items-center gap-2 text-amber-900">
              <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />
              <h3 className="text-xs font-black">
                توثيق الهوية مطلوب لنشر الرحلات
              </h3>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              لضمان أمان المسافرين وأصحاب الطرود، يتطلب نشر الرحلات التحقق من الهوية الوطنية (صورة الهوية وسيلفي).
            </p>
            <button
              type="button"
              onClick={() => navigate("/verify-identity")}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-xs"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>توثيق الهوية الآن</span>
            </button>
          </div>
        )}

        {isPendingKyc && (
          <div className="flex items-start gap-2.5 rounded-3xl bg-blue-50 p-4 border border-blue-200 text-right text-blue-950">
            <Clock className="h-5 w-5 text-[#123A68] shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1">
              <h3 className="text-xs font-black text-[#123A68]">
                طلب التحقق من الهوية قيد المراجعة
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                مستنداتك قيد التدقيق حالياً من قبل فريق المنصة. ستتمكن من نشر رحلتك فور الاعتماد خلال 24 ساعة.
              </p>
            </div>
          </div>
        )}

        {isVerified && (
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-3.5 py-2.5 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>حسابك موثّق كمسافر معتمد ✓</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="rounded-2xl bg-red-50 p-3.5 border border-red-200 text-xs font-bold text-red-700 text-right animate-shake">
            {errorMessage}
          </div>
        )}

        {/* Main Form Card */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs text-right">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* 1. Destination Keyword */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                الوجهة المقصودة <span className="text-[#F36F21]">*</span>
              </label>
              <input
                type="text"
                required
                value={destinationKeyword}
                onChange={(e) => setDestinationKeyword(e.target.value)}
                placeholder="مثال: بالقرب من دوار النجمة، رفح"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary placeholder:text-text-muted focus:border-[#123A68] focus:outline-hidden text-right shadow-2xs"
              />
            </div>

            {/* 2. Destination City & Neighborhood */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-primary">
                  مدينة الوجهة <span className="text-[#F36F21]">*</span>
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setDestinationNeighborhoodId("");
                  }}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3 text-xs text-primary focus:border-[#123A68] focus:outline-hidden text-right shadow-2xs cursor-pointer"
                >
                  <option value="">
                    {isLoadingNeighborhoods ? "جاري التحميل..." : "اختر المدينة"}
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
                <label className="block text-xs font-bold text-primary">
                  حي الوجهة <span className="text-[#F36F21]">*</span>
                </label>
                <select
                  value={destinationNeighborhoodId}
                  onChange={(e) => setDestinationNeighborhoodId(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3 text-xs text-primary focus:border-[#123A68] focus:outline-hidden text-right shadow-2xs cursor-pointer"
                >
                  <option value="">
                    {isLoadingNeighborhoods
                      ? "جاري تحميل الأحياء..."
                      : "اختر الحي"}
                  </option>
                  {neighborhoods.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Departure Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-primary">
                  تاريخ الانطلاق <span className="text-[#F36F21]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3 text-xs text-primary focus:border-[#123A68] focus:outline-hidden text-right shadow-2xs cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-primary">
                  وقت الانطلاق <span className="text-[#F36F21]">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3 text-xs text-primary focus:border-[#123A68] focus:outline-hidden text-right shadow-2xs cursor-pointer"
                />
              </div>
            </div>

            {/* 4. Capacity Selection */}
            <div className="space-y-1 pt-1">
              <label className="block text-xs font-bold text-primary">
                فئة الحمولة المتاحة
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "LIGHT", label: "خفيف (طرود/أدوية)" },
                  { key: "MEDIUM", label: "متوسط (أكياس/مشتريات)" },
                  { key: "HEAVY", label: "ثقيل (صناديق كبيرة)" },
                ].map((cap) => (
                  <button
                    key={cap.key}
                    type="button"
                    onClick={() => setCapacityClass(cap.key as WeightClass)}
                    className={`rounded-2xl p-2.5 text-center text-xs font-bold transition-all cursor-pointer border ${
                      capacityClass === cap.key
                        ? "border-[#F36F21] bg-orange-50 text-[#F36F21] shadow-2xs"
                        : "border-slate-200 bg-white text-text-secondary hover:bg-slate-50"
                    }`}
                  >
                    {cap.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Capacity Units */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                عدد الأغراض المسموح بها
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={capacityUnits}
                onChange={(e) => setCapacityUnits(Number(e.target.value))}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary focus:border-[#123A68] focus:outline-hidden text-right shadow-2xs"
              />
            </div>

            {/* 6. Notes */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                ملاحظات إضافية (اختياري)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أية تفاصيل تخص موعد العودة أو نوع المركبة..."
                className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-3 text-xs text-primary placeholder:text-text-muted focus:border-[#123A68] focus:outline-hidden text-right shadow-2xs resize-none"
              />
            </div>

            {/* Pricing Hint Card */}
            <div className="flex items-center gap-2 rounded-2xl bg-blue-50 p-3 text-xs text-[#123A68]">
              <Info className="h-4 w-4 shrink-0 text-[#123A68]" />
              <span>
                سيتم احتساب أجر التوصيل العادل آلياً بناءً على مسار الرحلة
                والمنطقة.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isCreating}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white shadow-md hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer disabled:opacity-50"
            >
              <Car className="h-4 w-4" />
              <span>
                {isCreating ? "جاري نشر الرحلة..." : "نشر الرحلة الآن"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </MobileContainer>
  );
}
