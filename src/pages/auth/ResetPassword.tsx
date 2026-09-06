import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Form } from "../../components/ui/form/Form";
import { ResetPasswordSuccessModal } from "../../components/modals/ResetPasswordSuccessModal";
import { useAuth } from "../../hooks/useAuth";
import { getApiErrorMessage } from "../../utils/apiError";

const resetPasswordSchema = z
  .object({
    phone: z.string().min(8, "رقم الهاتف غير صالح"),
    otp: z
      .string()
      .length(6, "رمز التحقق يجب أن يتكون من 6 أرقام")
      .regex(/^\d+$/, "رمز التحقق يجب أن يحتوي على أرقام فقط"),
    password: z
      .string()
      .min(8, "كلمة المرور يجب أن تتكون من 8 أحرف على الأقل")
      .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
      .regex(/[0-9]/, "يجب أن تحتوي على رقم واحد على الأقل")
      .regex(/[^A-Za-z0-9]/, "يجب أن تحتوي على رمز خاص واحد على الأقل"),
    confirmPassword: z.string().min(1, "يرجى تأكيد كلمة المرور"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetPassword, isResetPasswordPending } = useAuth();
  const phoneFromState = (location.state as { phone?: string })?.phone || "";

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      phone: phoneFromState,
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setErrorMessage(null);
    try {
      await resetPassword({
        phone: data.phone,
        otp: data.otp,
        newPassword: data.password,
      });
      setShowSuccessModal(true);
    } catch (err: unknown) {
      setErrorMessage(
        getApiErrorMessage(err, "تعذر إعادة تعيين كلمة المرور، يرجى التأكد من الرمز والمحاولة ثانية.")
      );
    }
  };

  return (
    <AuthLayout
      title="تعيين كلمة مرور جديدة"
      subtitle="أدخل رمز التحقق وكلمة المرور الجديدة لحسابك"
      showBack={true}
      onBack={() => navigate(-1)}
    >
      {errorMessage && (
        <div className="mb-4 rounded-md bg-error-light p-3 text-right text-[13px] font-medium text-error border border-error/20">
          {errorMessage}
        </div>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Phone if not in state */}
        {!phoneFromState && (
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
        )}

        {/* OTP Code */}
        <Form.Field name="otp" error={errors.otp?.message} required>
          <Form.Label>رمز التحقق (OTP)</Form.Label>
          <Form.Input
            type="text"
            maxLength={6}
            placeholder="123456"
            dir="ltr"
            className="text-center font-mono tracking-widest text-lg font-bold"
            {...register("otp")}
          />
          <Form.ErrorMessage />
        </Form.Field>

        {/* New Password */}
        <Form.Field name="password" error={errors.password?.message} required>
          <Form.Label>كلمة المرور الجديدة</Form.Label>
          <Form.PasswordInput
            placeholder="••••••••"
            className="h-12 rounded-2xl bg-[#F8FAFC] border-slate-200"
            {...register("password")}
          />
          <Form.ErrorMessage />
        </Form.Field>

        {/* Confirm New Password */}
        <Form.Field
          name="confirmPassword"
          error={errors.confirmPassword?.message}
          required
        >
          <Form.Label>تأكيد كلمة المرور</Form.Label>
          <Form.PasswordInput
            placeholder="••••••••"
            className="h-12 rounded-2xl bg-[#F8FAFC] border-slate-200"
            {...register("confirmPassword")}
          />
          <Form.ErrorMessage />
        </Form.Field>

        {/* Password Hint */}
        <div className="rounded-2xl bg-orange-50/70 p-3.5 border border-orange-200/70 text-right space-y-1">
          <span className="text-[11px] font-bold text-[#F36F21] block">
            شروط كلمة المرور:
          </span>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، وحرف كبير، ورقم، ورمز
            خاص.
          </p>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={isResetPasswordPending}
          className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-md disabled:opacity-50"
        >
          {isResetPasswordPending ? "جاري الحفظ..." : "حفظ كلمة المرور"}
        </button>
      </Form>

      {/* Success Modal */}
      <ResetPasswordSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate("/login");
        }}
      />
    </AuthLayout>
  );
}
