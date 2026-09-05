import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronRight } from "lucide-react";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Form } from "../../components/ui/form/Form";
import { useLocations } from "../../hooks/useLocations";
import { useAuth } from "../../hooks/useAuth";
import { getApiErrorMessage } from "../../utils/apiError";

const step2Schema = z.object({
  city: z.string().optional(),
  neighborhoodId: z.string().min(1, "يرجى اختيار الحي / المنطقة"),
  terms: z.boolean().refine((val) => val === true, {
    message: "يجب الموافقة على الشروط وسياسة الخصوصية للمتابعة",
  }),
});

type Step2FormData = z.infer<typeof step2Schema>;

export default function RegisterStep2() {
  const location = useLocation();
  const navigate = useNavigate();
  const step1Data = location.state as {
    fullName?: string;
    phone?: string;
    password?: string;
  } | null;

  const { neighborhoods, isLoadingNeighborhoods } = useLocations();
  const { register: registerApi, isRegistering } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!step1Data?.phone || !step1Data?.password || !step1Data?.fullName) {
      navigate("/register-step1", { replace: true });
    }
  }, [step1Data, navigate]);

  const handleGoBackToStep1 = () => {
    navigate("/register-step1", {
      state: {
        fullName: step1Data?.fullName,
        phone: step1Data?.phone,
        password: step1Data?.password,
      },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      city: "غزة",
      neighborhoodId: "",
      terms: true,
    },
  });

  const onSubmit = async (data: Step2FormData) => {
    if (!step1Data) return;
    setErrorMessage(null);

    try {
      const targetNeighborhoodId =
        data.neighborhoodId ||
        (neighborhoods.length > 0
          ? neighborhoods[0].id
          : "60a32850-bd3f-444a-84b4-c750abf6ecb6");

      await registerApi({
        fullName: step1Data.fullName!,
        phone: step1Data.phone!,
        password: step1Data.password!,
        neighborhoodId: targetNeighborhoodId,
      });

      navigate("/verify-otp", {
        state: {
          phone: step1Data.phone,
          fullName: step1Data.fullName,
        },
      });
    } catch (err: unknown) {
      const msg = getApiErrorMessage(
        err,
        "تعذر إتمام عملية التسجيل، يرجى المحاولة مرة أخرى.",
      );
      setErrorMessage(msg);
    }
  };

  return (
    <AuthLayout
      title="إنشاء حساب جديد"
      subtitle="انضم إلى مجتمع بطريقك"
      currentStep={2}
      totalSteps={2}
      showBack={true}
      onBack={handleGoBackToStep1}
      footerText="لديك حساب بالفعل؟"
      footerActionText="تسجيل الدخول"
      onFooterAction={() => navigate("/login")}
    >
      {errorMessage && (
        <div className="mb-4 rounded-xl bg-red-50 p-3 text-right text-xs font-bold text-red-600 border border-red-100">
          {errorMessage}
        </div>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* City Field */}
        <Form.Field name="city">
          <Form.Label>المدينة</Form.Label>
          <Form.Select
            className="h-12 rounded-2xl bg-[#F8FAFC] border-slate-200"
            {...register("city")}
          >
            <option value="غزة">غزة</option>
            <option value="شمال غزة">شمال غزة</option>
            <option value="دير البلح">دير البلح</option>
            <option value="خان يونس">خان يونس</option>
            <option value="رفح">رفح</option>
          </Form.Select>
        </Form.Field>

        {/* Neighborhood Field */}
        <Form.Field
          name="neighborhoodId"
          error={errors.neighborhoodId?.message}
          required
        >
          <Form.Label>الحي</Form.Label>
          <Form.Select
            disabled={isLoadingNeighborhoods}
            className="h-12 rounded-2xl bg-[#F8FAFC] border-slate-200"
            {...register("neighborhoodId")}
          >
            <option value="">
              {isLoadingNeighborhoods
                ? "جاري تحميل الأحياء..."
                : "مثال: الرمال"}
            </option>
            {neighborhoods.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </Form.Select>
          <Form.ErrorMessage />
        </Form.Field>

        {/* Terms Box (Figma rounded box style) */}
        <div className="my-3 rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200">
          <label className="flex items-start gap-2.5 cursor-pointer text-right">
            <input
              type="checkbox"
              className="h-4 w-4 mt-0.5 rounded accent-[#F36F21] cursor-pointer"
              {...register("terms")}
            />
            <span className="text-[11px] text-text-secondary leading-relaxed">
              بإنشاء الحساب، أوافق على{" "}
              <span className="font-bold text-[#123A68] hover:underline">
                شروط الاستخدام
              </span>{" "}
              و{" "}
              <span className="font-bold text-[#123A68] hover:underline">
                سياسة الخصوصية
              </span>
            </span>
          </label>
          {errors.terms && (
            <p className="mt-1 text-[11px] text-red-500 font-medium">
              {errors.terms.message}
            </p>
          )}
        </div>

        {/* Create Account & Previous Step Buttons */}
        <div className="mt-4 space-y-2">
          <button
            type="submit"
            disabled={isRegistering}
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all disabled:opacity-60"
          >
            {isRegistering ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
          </button>

          <button
            type="button"
            onClick={handleGoBackToStep1}
            className="flex h-10 w-full items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-text-secondary hover:bg-slate-50 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
            <span>الرجوع للخطوة السابقة (تعديل البيانات)</span>
          </button>
        </div>
      </Form>
    </AuthLayout>
  );
}
