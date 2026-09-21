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
  const { neighborhoods, isLoadingNeighborhoods } = useLocations();
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
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
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68]">
              تعديل الملف الشخصي
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              تحديث الاسم والحي السكني النشط
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="الرجوع للخلف"
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Feedback alerts */}
        {successMessage && (
          <div className="rounded-2xl bg-emerald-50 p-3.5 border border-emerald-200 text-xs font-bold text-emerald-800 text-right">
            تم حفظ التعديلات بنجاح!
          </div>
        )}

        {errorMessage && (
          <div className="rounded-2xl bg-rose-50 p-3.5 border border-rose-200 text-xs font-bold text-rose-800 text-right">
            {errorMessage}
          </div>
        )}

        {/* Form Card */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right">
            {/* Phone Number (Read-only) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                رقم الهاتف (غير قابل للتعديل)
              </label>
              <input
                type="text"
                value={profile?.phone || ""}
                disabled
                dir="ltr"
                className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 text-right text-xs font-mono font-bold text-slate-500 cursor-not-allowed"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                الاسم الكامل *
              </label>
              <input
                type="text"
                placeholder="أدخل اسمك الكامل"
                {...register("fullName")}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 text-xs font-bold text-[#123A68] focus:outline-none focus:border-[#123A68]"
              />
              {errors.fullName && (
                <p className="text-[11px] font-bold text-rose-600 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Neighborhood */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                الحي السكني *
              </label>
              <select
                disabled={isLoadingNeighborhoods}
                {...register("neighborhoodId")}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3 text-xs font-bold text-[#123A68] focus:outline-none focus:border-[#123A68] cursor-pointer text-right"
              >
                <option value="">
                  {isLoadingNeighborhoods
                    ? "جاري تحميل الأحياء..."
                    : "اختر الحي / المنطقة"}
                </option>
                {neighborhoods.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name} - {n.governorate}
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
