import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Form } from "../../components/ui/form/Form";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "كلمة المرور يجب أن تتكون من 6 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "يرجى تأكيد كلمة المرور"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

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
    setIsSuccess(true);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <AuthLayout title="" showBack={true}>
      {isSuccess && (
        <div className="mb-4 rounded-xl bg-emerald-50 p-3.5 text-center text-xs font-bold text-emerald-700 border border-emerald-200">
          تم تغيير كلمة المرور بنجاح! جاري التوجيه لتسجيل الدخول...
        </div>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* New Password */}
        <Form.Field
          name="password"
          error={errors.password?.message}
          required
        >
          <Form.PasswordInput
            placeholder="كلمة المرور الجديدة"
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
          <Form.PasswordInput
            placeholder="تأكيد كلمة المرور الجديدة"
            className="h-12 rounded-2xl bg-[#F8FAFC] border-slate-200"
            {...register("confirmPassword")}
          />
          <Form.ErrorMessage />
        </Form.Field>

        {/* Save Button (Deep Navy) */}
        <button
          type="submit"
          className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all"
        >
          حفظ
        </button>
      </Form>
    </AuthLayout>
  );
}
