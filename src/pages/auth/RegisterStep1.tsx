import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Form } from "../../components/ui/form/Form";

const step1Schema = z.object({
  fullName: z
    .string()
    .min(3, "الاسم الكامل يجب أن يتكون من 3 أحرف على الأقل")
    .max(50, "الاسم طويل جداً"),
  phone: z
    .string()
    .min(8, "رقم الهاتف يجب أن يتكون من 8 أرقام على الأقل")
    .max(20, "رقم الهاتف غير صالح"),
  password: z
    .string()
    .min(6, "كلمة المرور يجب ألا تقل عن 6 أحرف"),
});

type Step1FormData = z.infer<typeof step1Schema>;

export default function RegisterStep1() {
  const location = useLocation();
  const navigate = useNavigate();

  // Restore existing input if user navigated back from Step 2
  const existingData = location.state as {
    fullName?: string;
    phone?: string;
    password?: string;
  } | null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: existingData?.fullName || "",
      phone: existingData?.phone || "",
      password: existingData?.password || "",
    },
  });

  const onSubmit = (data: Step1FormData) => {
    navigate("/register-step2", {
      state: {
        fullName: data.fullName,
        phone: data.phone,
        password: data.password,
      },
    });
  };

  return (
    <AuthLayout
      title="إنشاء حساب جديد"
      subtitle="انضم إلى مجتمع بطريقك"
      currentStep={1}
      totalSteps={2}
      showBack={true}
      onBack={() => navigate("/welcome")}
      footerText="لديك حساب بالفعل؟"
      footerActionText="تسجيل الدخول"
      onFooterAction={() => navigate("/login")}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <Form.Field name="fullName" error={errors.fullName?.message} required>
          <Form.Label>الاسم الكامل</Form.Label>
          <Form.Input
            placeholder="هديل محمد"
            className="h-12 rounded-2xl bg-[#F8FAFC] border-slate-200"
            {...register("fullName")}
          />
          <Form.ErrorMessage />
        </Form.Field>

        {/* Phone */}
        <Form.Field name="phone" error={errors.phone?.message} required>
          <Form.Label>رقم الهاتف</Form.Label>
          <Form.Input
            type="tel"
            placeholder="05XX-XXX-XXX"
            dir="ltr"
            className="text-right h-12 rounded-2xl bg-[#F8FAFC] border-slate-200"
            {...register("phone")}
          />
          <Form.ErrorMessage />
        </Form.Field>

        {/* Password */}
        <Form.Field name="password" error={errors.password?.message} required>
          <Form.Label>كلمة المرور</Form.Label>
          <Form.PasswordInput
            placeholder="يجب أن تتكون من 6 أرقام و حرف كبير على الأقل و رمز مميز ."
            className="h-12 rounded-2xl bg-[#F8FAFC] border-slate-200 text-xs"
            {...register("password")}
          />
          <Form.ErrorMessage />
        </Form.Field>

        {/* Next Button (Orange matching Figma) */}
        <button
          type="submit"
          className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all"
        >
          التالي
        </button>
      </Form>
    </AuthLayout>
  );
}