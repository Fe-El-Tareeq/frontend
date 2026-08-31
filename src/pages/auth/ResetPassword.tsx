import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Form } from "../../components/ui/form/Form";
import { ResetPasswordSuccessModal } from "../../components/modals/ResetPasswordSuccessModal";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "كلمة المرور يجب أن تتكون من 8 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "يرجى تأكيد كلمة المرور"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    setShowSuccessModal(true);
  };

  return (
    <AuthLayout
      title="تعيين كلمة مرور جديدة"
      subtitle="أدخل كلمة المرور الجديدة لحسابك"
      showBack={true}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* New Password */}
        <Form.Field
          name="password"
          error={errors.password?.message}
          required
        >
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
            يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، وحرف كبير، ورقم، ورمز خاص.
          </p>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-md"
        >
          حفظ كلمة المرور
        </button>
      </Form>

      {/* Success Modal */}
      <ResetPasswordSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </AuthLayout>
  );
}
