import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ShieldCheck, Lock, Car, Info, Home } from "lucide-react";
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
  const { profile, isAuthenticated, isLoadingProfile } = useAuth();
  const { createTrip, isCreating } = useTrips();
  const [selectedCity, setSelectedCity] = useState("غزة");
  const { cities, neighborhoods, isLoadingNeighborhoods } = useLocations(selectedCity);

  const isVerified = profile?.verificationStatus === "VERIFIED" || profile?.isVerified === true;
  const isPendingKyc = profile?.verificationStatus === "PENDING_REVIEW";

  // Redirect unverified users immediately to identity verification page
  useEffect(() => {
    if (!isLoadingProfile && isAuthenticated && profile) {
      if (!isVerified) {
        navigate("/verify-identity", { replace: true });
      }
    }
  }, [isLoadingProfile, isAuthenticated, profile, isVerified, navigate]);

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
      navigate("/verify-identity");
      return;
    }

    if (profile && profile.email && !profile.emailVerifiedAt && !profile.phoneVerifiedAt) {
      setErrorMessage("يجب التحقق من البريد الإلكتروني للحساب قبل إنشاء رحلة.");
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

  // If user is not verified, render the blocked access screen and do not show trip form
  if (!isVerified) {
    return (
      <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
        <Header />

        <div className="w-full max-w-lg mx-auto px-4 md:px-6 pt-8 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-6 border border-slate-200 dark:border-white/10 shadow-sm text-center space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-600 dark:text-amber-400">
              <Lock className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-black text-[#123A68] dark:text-white">
                توثيق الهوية مطلوب لإضافة رحلة
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                {isPendingKyc
                  ? "طلب التحقق من هويتك قيد المراجعة حالياً من قبل إدارة المنصة. ستتمكن من إضافة ونشر الرحلات فور اعتماد حسابك."
                  : "لحماية مجتمع بطريقك وضمان أمان شحنات الأهالي، يشترط توثيق الهوية الوطنية قبل التمكن من نشر مسارات الرحلات."}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate("/verify-identity")}
                className="w-full flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] shadow-md transition-all cursor-pointer"
              >
                <ShieldCheck className="h-4.5 w-4.5" />
                <span>{isPendingKyc ? "عرض حالة التوثيق" : "الانتقال لتوثيق الهوية الآن"}</span>
              </button>
            </div>
          </div>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-2xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => typeof window !== "undefined" && window.history.length > 1 ? navigate(-1) : navigate("/home")}
              className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
              aria-label="رجوع"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-xl font-black text-[#123A68] dark:text-white">
                إضافة رحلة جديدة
              </h1>
              <p className="text-xs text-text-secondary dark:text-slate-400">
                شارك مسار رحلتك وساعد أهالي منطقتك بنقل أغراضهم
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/home")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-accent dark:hover:text-accent transition-colors cursor-pointer"
            title="الصفحة الرئيسية"
          >
            <Home className="h-4 w-4" />
            <span>الرئيسية</span>
          </button>
        </div>

        {/* Verified Badge */}
        <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 px-3.5 py-2.5 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>حسابك موثّق كمسافر معتمد ✓</span>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="rounded-2xl bg-red-50 dark:bg-red-950/30 p-3.5 border border-red-200 dark:border-red-800/40 text-xs font-bold text-red-700 dark:text-red-300 text-right animate-shake">
            {errorMessage}
          </div>
        )}

        {/* Main Form Card */}
        <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-border dark:border-white/10 shadow-xs text-right">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* 1. Destination Keyword */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary dark:text-white">
                الوجهة المقصودة <span className="text-[#F36F21]">*</span>
              </label>
              <input
                type="text"
                required
                value={destinationKeyword}
                onChange={(e) => setDestinationKeyword(e.target.value)}
                placeholder="مثال: بالقرب من دوار النجمة، رفح"
                className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3.5 text-xs text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-500 focus:border-[#123A68] dark:focus:border-accent focus:outline-hidden text-right shadow-2xs"
              />
            </div>

            {/* 2. Destination City & Neighborhood */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-primary dark:text-white">
                  مدينة الوجهة <span className="text-[#F36F21]">*</span>
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setDestinationNeighborhoodId("");
                  }}
                  className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3 text-xs text-primary dark:text-white focus:border-[#123A68] dark:focus:border-accent focus:outline-hidden text-right shadow-2xs cursor-pointer"
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
                <label className="block text-xs font-bold text-primary dark:text-white">
                  حي الوجهة <span className="text-[#F36F21]">*</span>
                </label>
                <select
                  value={destinationNeighborhoodId}
                  onChange={(e) => setDestinationNeighborhoodId(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3 text-xs text-primary dark:text-white focus:border-[#123A68] dark:focus:border-accent focus:outline-hidden text-right shadow-2xs cursor-pointer"
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
                <label className="block text-xs font-bold text-primary dark:text-white">
                  تاريخ الانطلاق <span className="text-[#F36F21]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3 text-xs text-primary dark:text-white focus:border-[#123A68] dark:focus:border-accent focus:outline-hidden text-right shadow-2xs cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-primary dark:text-white">
                  وقت الانطلاق <span className="text-[#F36F21]">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3 text-xs text-primary dark:text-white focus:border-[#123A68] dark:focus:border-accent focus:outline-hidden text-right shadow-2xs cursor-pointer"
                />
              </div>
            </div>

            {/* 4. Capacity Selection */}
            <div className="space-y-1 pt-1">
              <label className="block text-xs font-bold text-primary dark:text-white">
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
                        ? "border-[#F36F21] bg-orange-50 dark:bg-orange-950/40 text-[#F36F21] dark:text-orange-400 shadow-2xs"
                        : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B1E36] text-text-secondary dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                    }`}
                  >
                    {cap.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Capacity Units */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary dark:text-white">
                عدد الأغراض المسموح بها
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={capacityUnits}
                onChange={(e) => setCapacityUnits(Number(e.target.value))}
                className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3.5 text-xs text-primary dark:text-white focus:border-[#123A68] dark:focus:border-accent focus:outline-hidden text-right shadow-2xs"
              />
            </div>

            {/* 6. Notes */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary dark:text-white">
                ملاحظات إضافية (اختياري)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أية تفاصيل تخص موعد العودة أو نوع المركبة..."
                className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] p-3 text-xs text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-500 focus:border-[#123A68] dark:focus:border-accent focus:outline-hidden text-right shadow-2xs resize-none"
              />
            </div>

            {/* Pricing Hint Card */}
            <div className="flex items-center gap-2 rounded-2xl bg-blue-50 dark:bg-blue-950/30 p-3 text-xs text-[#123A68] dark:text-blue-300 border border-transparent dark:border-blue-800/40">
              <Info className="h-4 w-4 shrink-0 text-[#123A68] dark:text-blue-300" />
              <span>
                سيتم احتساب أجر التوصيل العادل آلياً بناءً على مسار الرحلة
                والمنطقة.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isCreating}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] dark:bg-[#1E4E8C] text-xs font-black text-white shadow-md hover:bg-[#0D2C50] dark:hover:bg-[#123A68] active:scale-98 transition-all cursor-pointer disabled:opacity-50"
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
