import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AppLayout } from "../../components/layout/AppLayout";
import { Form } from "../../components/ui/form/Form";
import { Button } from "../../components/ui/button/Button";
import { Alert } from "../../components/ui/feedback/Alert";
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
    <AppLayout
      headerProps={{
        title: "تعديل الملف الشخصي",
        subtitle: "تحديث الاسم والحي السكني النشط",
        showBack: true,
      }}
      showBottomNav={false}
    >
      <div className="space-y-4 pb-8">
        {successMessage && (
          <Alert variant="success">تم حفظ التعديلات بنجاح!</Alert>
        )}

        {errorMessage && (
          <Alert variant="error" onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        )}

        <div className="rounded-xl bg-white p-6 border border-border shadow-sm">
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Phone Number (Read-only) */}
            <div className="mb-3">
              <label className="block text-[13px] font-medium text-text-secondary mb-1 text-right">
                رقم الهاتف (غير قابل للتعديل)
              </label>
              <input
                type="text"
                value={profile?.phone || ""}
                disabled
                dir="ltr"
                className="h-12.5 w-full rounded-[16px] border border-border bg-background px-4 text-right text-[14px] text-text-muted font-mono"
              />
            </div>

            {/* Full Name */}
            <Form.Field
              name="fullName"
              error={errors.fullName?.message}
              required
            >
              <Form.Label>الاسم الكامل</Form.Label>
              <Form.Input
                placeholder="أدخل اسمك الكامل"
                {...register("fullName")}
              />
              <Form.ErrorMessage />
            </Form.Field>

            {/* Neighborhood */}
            <Form.Field
              name="neighborhoodId"
              error={errors.neighborhoodId?.message}
              required
            >
              <Form.Label>الحي السكني</Form.Label>
              <Form.Select
                disabled={isLoadingNeighborhoods}
                {...register("neighborhoodId")}
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
              </Form.Select>
              <Form.ErrorMessage />
            </Form.Field>

            <Button
              type="submit"
              variant="accent"
              size="md"
              fullWidth
              isLoading={isUpdatingProfile}
              className="mt-6"
            >
              حفظ التعديلات
            </Button>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
}
