import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Car, Info } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useTrips } from "../../hooks/useTrips";

export default function CreateTrip() {
  const navigate = useNavigate();
  const { createTrip, isCreating } = useTrips();

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [city, setCity] = useState("غزة");
  const [neighborhood, setNeighborhood] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState("LIGHT");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /*
     * ============================================================================
     * BACKEND INTEGRATION IMPLEMENTATION: Create New Trip
     * Endpoint: POST /api/v1/trips
     * ============================================================================
     */
    try {
      await createTrip({
        originCity: city,
        originNeighborhoodId: neighborhood,
        destinationCity: destination,
        departureDate: date,
        departureTime: time,
        capacityText:
          capacity === "LIGHT"
            ? "أغراض خفيفة فقط"
            : capacity === "MEDIUM"
            ? "حمولة حتى 5 كجم"
            : "حمولة حتى 10 كجم",
        notes,
      });
      navigate("/trips");
    } catch {
      // Fallback demo redirect
      navigate("/trips");
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
              شارك رحلتك القادمة وساعد أبناء منطقتك
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs text-right">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Origin */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                منطقة الانطلاق <span className="text-[#F36F21]">*</span>
              </label>
              <input
                type="text"
                required
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="مثال: غزة - الرمال"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none text-right"
              />
            </div>

            {/* Destination */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                الوجهة <span className="text-[#F36F21]">*</span>
              </label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="مثال: رفح"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none text-right"
              />
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                المدينة
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary focus:border-accent focus:outline-none"
              >
                <option value="غزة">غزة</option>
                <option value="شمال غزة">شمال غزة</option>
                <option value="دير البلح">دير البلح</option>
                <option value="خان يونس">خان يونس</option>
                <option value="رفح">رفح</option>
              </select>
            </div>

            {/* Current neighborhood */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">الحي</label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="حيّك الحالي"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none text-right"
              />
            </div>

            {/* Departure Date */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                تاريخ المغادرة <span className="text-[#F36F21]">*</span>
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary focus:border-accent focus:outline-none"
              />
            </div>

            {/* Departure Time */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                وقت المغادرة <span className="text-[#F36F21]">*</span>
              </label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary focus:border-accent focus:outline-none"
              />
            </div>

            {/* Available capacity */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                السعة المتاحة للأغراض
              </label>
              <select
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary focus:border-accent focus:outline-none"
              >
                <option value="LIGHT">أغراض خفيفة فقط (حتى 2 كجم)</option>
                <option value="MEDIUM">أغراض متوسطة (حتى 5 كجم)</option>
                <option value="HEAVY">متاح للأغراض المتنوعة والثقيلة</option>
              </select>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                ملاحظات إضافية
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: لا مانع من الأغراض الثقيلة، أغراض خفيفة فقط..."
                className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-3.5 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none resize-none text-right"
              />
            </div>

            {/* Free Trip Notice Box */}
            <div className="flex items-start gap-2.5 rounded-2xl bg-blue-50 p-3.5 border border-blue-200 text-right">
              <Info className="h-4.5 w-4.5 text-[#123A68] shrink-0 mt-0.5" />
              <p className="text-[11.5px] text-[#123A68] leading-relaxed">
                نشر الرحلة مجاني تماماً! ستظهر رحلتك للمستخدمين في منطقتك فور النشر.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={isCreating}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all disabled:opacity-60 cursor-pointer"
              >
                <Car className="h-4 w-4" />
                <span>{isCreating ? "جاري النشر..." : "نشر الرحلة"}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-3 text-xs font-bold text-text-secondary hover:text-primary cursor-pointer"
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
