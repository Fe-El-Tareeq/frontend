import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronRight, Loader2, Save } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useAuth } from "../../hooks/useAuth";
import { useLocations } from "../../hooks/useLocations";
import { getApiErrorMessage } from "../../utils/apiError";

const editProfileSchema = z.object({
  fullName: z.string().min(2, "الاسم يجب ألا يقل عن حرفين"),
  neighborhoodId: z.string().min(1, "يرجى اختيار الحي"),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

export default function EditProfile() {
  const navigate = useNavigate();
  const { profile, updateProfile, isUpdatingProfile } = useAuth();
  const [selectedCity, setSelectedCity] = useState("غزة");
  const { cities, neighborhoods, isLoadingNeighborhoods } = useLocations(selectedCity);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: profile?.fullName || "",
      neighborhoodId: profile?.neighborhoodId || "",
    },
  });

  // Sync profile when loaded
  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName || "",
        neighborhoodId: profile.neighborhoodId || "",
      });
      if (profile.neighborhood?.governorate) {
        setSelectedCity(profile.neighborhood.governorate);
      }
    }
  }, [profile, reset]);

  const onSubmit = async (data: EditProfileFormData) => {
    setErrorMessage(null);
    setSuccessMessage(false);
    try {
      const targetNeighborhoodId =
        data.neighborhoodId ||
        profile?.neighborhoodId ||
        (neighborhoods.length > 0 ? neighborhoods[0].id : "");

      await updateProfile({
        fullName: data.fullName,
        neighborhoodId: targetNeighborhoodId,
      });
      setSuccessMessage(true);
      setTimeout(() => {
        navigate("/profile");
      }, 1200);
    } catch (err: unknown) {
      const msg = getApiErrorMessage(
        err,
        "تعذر حفظ التعديلات، يرجى المحاولة لاحقاً.",
      );
      setErrorMessage(msg);
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-3xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl md:text-2xl font-black text-[#123A68] dark:text-white">
              تعديل الملف الشخصي
            </h1>
            <p className="text-xs md:text-sm text-text-secondary dark:text-slate-400 mt-0.5">
              تحديث الاسم والحي السكني النشط
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="الرجوع للخلف"
            className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Feedback alerts */}
        {successMessage && (
          <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-3.5 border border-emerald-200 dark:border-emerald-800/40 text-xs md:text-sm font-bold text-emerald-800 dark:text-emerald-300 text-right">
            تم حفظ التعديلات بنجاح!
          </div>
        )}

        {errorMessage && (
          <div className="rounded-2xl bg-rose-50 dark:bg-rose-950/40 p-3.5 border border-rose-200 dark:border-rose-800/40 text-xs md:text-sm font-bold text-rose-800 dark:text-rose-300 text-right">
            {errorMessage}
          </div>
        )}

        {/* Form Card */}
        <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right">
            {/* Phone Number (Read-only) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                رقم الهاتف (غير قابل للتعديل)
              </label>
              <input
                type="text"
                value={profile?.phone || ""}
                disabled
                dir="ltr"
                className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0B1E36]/60 px-4 text-right text-xs font-mono font-bold text-slate-500 dark:text-slate-400 cursor-not-allowed"
              />
            </div>

            {/* Email (Read-only) */}
            {profile?.email && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  البريد الإلكتروني (غير قابل للتعديل)
                </label>
                <input
                  type="text"
                  value={profile.email}
                  disabled
                  dir="ltr"
                  className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0B1E36]/60 px-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 cursor-not-allowed"
                />
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                الاسم الكامل *
              </label>
              <input
                type="text"
                placeholder="أدخل اسمك الكامل"
                {...register("fullName")}
                className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-4 text-xs font-bold text-[#123A68] dark:text-white focus:outline-none focus:border-[#123A68] dark:focus:border-accent"
              />
              {errors.fullName && (
                <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                المدينة *
              </label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setValue("neighborhoodId", "");
                }}
                className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3 text-xs font-bold text-[#123A68] dark:text-white focus:outline-none focus:border-[#123A68] dark:focus:border-accent cursor-pointer text-right"
              >
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

            {/* Neighborhood */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                الحي السكني *
              </label>
              <select
                disabled={isLoadingNeighborhoods}
                {...register("neighborhoodId")}
                className="h-11 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3 text-xs font-bold text-[#123A68] dark:text-white focus:outline-none focus:border-[#123A68] dark:focus:border-accent cursor-pointer text-right"
              >
                <option value="">
                  {isLoadingNeighborhoods
                    ? "جاري تحميل الأحياء..."
                    : "اختر الحي / المنطقة"}
                </option>
                {neighborhoods.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                ))}
              </select>
              {errors.neighborhoodId && (
                <p className="text-[11px] font-bold text-rose-600 mt-1">
                  {errors.neighborhoodId.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 disabled:opacity-60 transition-all cursor-pointer shadow-md"
              >
                {isUpdatingProfile ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>جاري الحفظ...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>حفظ التعديلات</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MobileContainer>
  );
}
