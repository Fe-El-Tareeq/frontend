import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Form } from "../../components/ui/form/Form";
import { useAuth } from "../../hooks/useAuth";
import { getApiErrorMessage } from "../../utils/apiError";
import { translateSuccessMessage } from "../../i18n";

const forgotPasswordSchema = z.object({
  phone: z
    .string()
    .min(8, "رقم الهاتف يجب أن يتكون من 8 أرقام على الأقل")
    .max(20, "رقم الهاتف غير صالح"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { forgotPassword, isForgotPasswordPending } = useAuth();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const res = await forgotPassword({ phone: data.phone });
      setSuccessMessage(
        translateSuccessMessage(
          res.message,
          "إذا كان الحساب مسجلاً، تم إرسال رمز استعادة كلمة المرور.",
        ),
      );
      setTimeout(() => {
        navigate("/verify-otp", {
          state: { phone: data.phone, isResetPassword: true },
        });
      }, 1000);
    } catch (err: unknown) {
      const msg = getApiErrorMessage(
        err,
        "تعذر إرسال رمز استعادة الحساب، يرجى التحقق من الرقم.",
      );
      setErrorMessage(msg);
    }
  };

  return (
    <AuthLayout
      title="نسيت كلمة المرور؟"
      subtitle="أدخل رقم هاتفك المسجل وسنرسل لك رمزاً لتسجيل الدخول وتعيين كلمة مرور جديدة"
      showBack
      onBack={() => navigate("/login")}
      footerText="تذكرت كلمة المرور؟"
      footerActionText="العودة لتسجيل الدخول"
      onFooterAction={() => navigate("/login")}
    >
      {successMessage && (
        <div className="mb-4 rounded-[14px] bg-success-light p-3.5 text-right text-[13px] font-bold text-success border border-success/20">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 rounded-md bg-error-light p-3 text-right text-[13px] font-medium text-error border border-error/20">
          {errorMessage}
        </div>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
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

        <button
          type="submit"
          disabled={isForgotPasswordPending}
          className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all disabled:opacity-60 cursor-pointer shadow-md"
        >
          {isForgotPasswordPending ? "جاري الإرسال..." : "إرسال رمز التحقق"}
        </button>
      </Form>
    </AuthLayout>
  );
}
