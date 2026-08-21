import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Form } from "../../components/ui/form/Form";
import { useAuth } from "../../hooks/useAuth";
import { getApiErrorMessage } from "../../utils/apiError";

const loginSchema = z.object({
  phone: z
    .string()
    .min(8, "رقم الهاتف يجب أن يتكون من 8 أرقام على الأقل")
    .max(20, "رقم الهاتف غير صالح"),
  password: z.string().min(1, "يرجى إدخال كلمة المرور"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);
    try {
      await login(data);
      navigate("/", { replace: true });
    } catch (err: unknown) {
      const serverMessage = getApiErrorMessage(
        err,
        "تعذر تسجيل الدخول، يرجى التأكد من صحة البيانات."
      );
      setErrorMessage(serverMessage);

      // If phone number is unverified, redirect to OTP verification
      const axiosErr = err as { response?: { status?: number } };
      if (serverMessage.includes("verified") || axiosErr?.response?.status === 403) {
        navigate("/verify-otp", { state: { phone: data.phone } });
      }
    }
  };

  return (
    <AuthLayout
      title="أهلاً بعودتك!"
      subtitle="سجّل دخولك للمتابعة"
      showBack={false}
      footerText="ليس لديك حساب؟"
      footerActionText="إنشاء حساب جديد"
      onFooterAction={() => navigate("/register-step1")}
    >
      {errorMessage && (
        <div className="mb-4 rounded-xl bg-red-50 p-3 text-right text-xs font-bold text-red-600 border border-red-100">
          {errorMessage}
        </div>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
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
            placeholder="••••••••"
            className="h-12 rounded-2xl bg-[#F8FAFC] border-slate-200"
            {...register("password")}
          />
          <Form.ErrorMessage />
        </Form.Field>

        {/* Forgot Password Link */}
        <div className="text-right pt-0.5">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-xs font-bold text-[#123A68] hover:text-[#F36F21] transition-colors"
          >
            نسيت كلمة المرور؟
          </button>
        </div>

        {/* Submit Button (Deep Navy matching Figma) */}
        <button
          type="submit"
          disabled={isLoggingIn}
          className="mt-3 flex h-12 w-full items-center justify-center rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all disabled:opacity-60"
        >
          {isLoggingIn ? "جاري التحقق..." : "تسجيل الدخول"}
        </button>
      </Form>
    </AuthLayout>
  );
}