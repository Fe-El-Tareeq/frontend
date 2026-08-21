import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Form } from "../../components/ui/form/Form";
import { Button } from "../../components/ui/button/Button";
import { useAuth } from "../../hooks/useAuth";

import { getApiErrorMessage } from "../../utils/apiError";

const forgotPasswordSchema = z.object({
  phone: z
    .string()
    .min(8, "رقم الهاتف يجب أن يتكون من 8 أرقام على الأقل")
    .max(20, "رقم الهاتف غير صالح"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { requestOtp, isRequestingOtp } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
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
    try {
      await requestOtp({ phone: data.phone });
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/verify-otp", {
          state: { phone: data.phone, isResetPassword: true },
        });
      }, 1500);
    } catch (err: unknown) {
      const msg = getApiErrorMessage(
        err,
        "تعذر إرسال رمز استعادة الحساب، يرجى التحقق من الرقم."
      );
      setErrorMessage(msg);
    }
  };

  return (
    <AuthLayout
      title="نسيت كلمة المرور؟"
      subtitle="أدخل رقم هاتفك المسجل وسنرسل لك رمزاً لتسجيل الدخول وتعيين كلمة مرور جديدة"
      showBack
      onBack={() => navigate("/welcome")}
      footerText="تذكرت كلمة المرور؟"
      footerActionText="العودة لتسجيل الدخول"
      onFooterAction={() => navigate("/welcome")}
    >
      {isSuccess && (
        <div className="mb-4 rounded-[14px] bg-success-light p-3.5 text-right text-[13px] font-bold text-success border border-success/20">
          تم إرسال رمز التحقق بنجاح! جاري توجيهك...
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 rounded-[12px] bg-error-light p-3 text-right text-[13px] font-medium text-error border border-error/20">
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
            className="text-right"
            {...register("phone")}
          />
          <Form.ErrorMessage />
        </Form.Field>

        <Button
          type="submit"
          variant="accent"
          size="md"
          fullWidth
          isLoading={isRequestingOtp}
          className="mt-4"
        >
          إرسال رمز التحقق
        </Button>
      </Form>
    </AuthLayout>
  );
}
