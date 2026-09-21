import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Form } from "../../components/ui/form/Form";
import { OtpCodeInput } from "../../components/auth/OtpCodeInput";
import { Alert } from "../../components/ui/feedback/Alert";
import { useAuth } from "../../hooks/useAuth";
import { getApiErrorMessage } from "../../utils/apiError";

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "رمز التحقق يجب أن يتكون من 6 أرقام")
    .regex(/^\d{6}$/, "رمز التحقق يجب أن يحتوي على أرقام فقط"),
});

type OtpFormData = z.infer<typeof otpSchema>;

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = location.state as {
    phone?: string;
    fullName?: string;
    isResetPassword?: boolean;
  } | null;

  const phone = stateData?.phone;
  const isResetPassword = stateData?.isResetPassword;

  const { verifyOtp, isVerifyingOtp, requestOtp, isRequestingOtp } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    if (!phone) {
      navigate("/", { replace: true });
    }
  }, [phone, navigate]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = watch("otp") || "";

  const onSubmit = async (data: OtpFormData) => {
    if (!phone) return;
    setErrorMessage(null);

    try {
      if (isResetPassword) {
        navigate("/reset-password", {
          state: { phone, otp: data.otp },
        });
      } else {
        await verifyOtp({
          phone,
          otp: data.otp,
        });
        navigate("/home", { replace: true });
      }
    } catch (err: unknown) {
      const msg = getApiErrorMessage(
        err,
        "رمز التحقق غير صحيح أو قد انتهت صلاحيته.",
      );
      setErrorMessage(msg);
    }
  };

  const handleResendOtp = async () => {
    if (!phone || resendTimer > 0) return;
    setErrorMessage(null);
    try {
      await requestOtp({ phone });
      setResendTimer(60);
    } catch (err: unknown) {
      const msg = getApiErrorMessage(
        err,
        "تعذر إعادة إرسال الرمز، يرجى المحاولة لاحقاً.",
      );
      setErrorMessage(msg);
    }
  };

  const handleBack = () => {
    if (isResetPassword) {
      navigate("/forgot-password");
    } else {
      navigate("/register-step2", {
        state: {
          phone: stateData?.phone,
          fullName: stateData?.fullName,
        },
      });
    }
  };

  return (
    <AuthLayout
      title="لا داعي للقلق !"
      subtitle={`سيتم إرسال كود لرقم الهاتف ${phone || ""} لتأكيد امتلاك للحساب ...`}
      showBack={true}
      onBack={handleBack}
    >
      {errorMessage && (
        <div className="mb-4">
          <Alert variant="error" onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        </div>
      )}

      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Field name="otp" error={errors.otp?.message} required>
          {/* 6-box OTP visual entry */}
          <div className="py-2">
            <OtpCodeInput
              value={otpValue}
              onChange={(val) => {
                setValue("otp", val, { shouldValidate: true });
              }}
              error={Boolean(errors.otp)}
            />
          </div>

          <Form.Input
            type="text"
            className="sr-only"
            {...register("otp")}
          />
          <Form.ErrorMessage className="justify-center text-center" />
        </Form.Field>

        {/* Resend Timer */}
        <div className="flex items-center justify-between text-xs pt-1 px-1">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendTimer > 0 || isRequestingOtp}
            className={`font-bold transition-colors cursor-pointer ${
              resendTimer > 0
                ? "text-text-muted cursor-not-allowed opacity-70"
                : "text-[#F36F21] hover:underline"
            }`}
          >
            {isRequestingOtp ? "جاري الإرسال..." : "إعادة إرسال الرمز"}
          </button>

          {resendTimer > 0 && (
            <span className="text-text-muted font-mono font-medium" dir="ltr">
              00:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isVerifyingOtp}
          className="mt-5 flex h-12 w-full items-center justify-center rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all disabled:opacity-60 cursor-pointer shadow-md"
        >
          {isVerifyingOtp
            ? "جاري التحقق..."
            : isResetPassword
              ? "تعيين كلمة مرور جديدة"
              : "تأكيد الحساب والدخول"}
        </button>
      </Form>
    </AuthLayout>
  );
}
