import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "../../components/layout/AuthLayout";
import { Form } from "../../components/ui/form/Form";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "يرجى إدخال كلمة المرور الحالية"),
    newPassword: z
      .string()
      .min(6, "كلمة المرور يجب أن تتكون من 6 أرقام وحرف كبير ورمز مميز على الأقل"),
    confirmPassword: z.string().min(1, "يرجى تأكيد كلمة المرور"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    setIsSuccess(true);
    setTimeout(() => {
      navigate("/profile");
    }, 1500);
  };

  return (
    <AuthLayout title="" showBack={true}>
      {isSuccess && (
        <div className="mb-4 rounded-xl bg-emerald-50 p-3.5 text-center text-xs font-bold text-emerald-700 border border-emerald-200">
          تم تحديث كلمة المرور بنجاح!
        </div>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Old Password */}
        <Form.Field
          name="oldPassword"
          error={errors.oldPassword?.message}
          required
        >
          <Form.PasswordInput
            placeholder="كلمة المرور الحالية"
            className="h-12 rounded-2xl bg-[#F8FAFC] border-slate-200"
            {...register("oldPassword")}
          />
          <Form.ErrorMessage />
        </Form.Field>

        {/* New Password */}
        <Form.Field
          name="newPassword"
          error={errors.newPassword?.message}
          required
        >
          <Form.PasswordInput
            placeholder="كلمة المرور الجديدة"
            className="h-12 rounded-2xl bg-[#F8FAFC] border-slate-200"
            {...register("newPassword")}
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

        {/* Hint text matching Figma */}
        <p className="text-center text-[11px] text-text-muted pt-1">
          يجب أن تتكون من 6 أرقام و حرف كبير على الأقل و رمز مميز .
        </p>

        {/* Save Button */}
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
