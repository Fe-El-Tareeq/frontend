import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { ChangePasswordSuccessModal } from "../../components/modals/ChangePasswordSuccessModal";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/useAuthStore";
import { translateApiError } from "../../i18n";

export default function ChangePasswordPage() {
  const { changePassword, isChangingPassword } = useAuth();
  const refreshToken = useAuthStore((state) => state.refreshToken);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError("يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }

    try {
      await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
        refreshToken: refreshToken || "",
      });
      setShowSuccessModal(true);
    } catch (err: unknown) {
      setError(translateApiError(err));
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header title="تغيير كلمة المرور" showBack={true} />

      <div className="w-full max-w-3xl md:max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6 flex-1">
        <div className="w-full max-w-md mx-auto space-y-4 pt-4">
          {/* Error Alert if any */}
          {error && (
            <div className="rounded-2xl bg-red-50 dark:bg-red-950/40 p-3.5 border border-red-200 dark:border-red-900/40 text-xs font-bold text-red-600 dark:text-red-300 text-right">
              {error}
            </div>
          )}

          {/* Main Form Card */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-border/80 dark:border-white/10 shadow-xs space-y-4 text-right">
              {/* Current Password */}
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="كلمة المرور الحالية"
                  className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] pr-4 pl-11 text-xs text-primary dark:text-white focus:border-accent focus:outline-none text-right placeholder:text-slate-500 placeholder:font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-white cursor-pointer"
                >
                  {showCurrent ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>

              {/* New Password */}
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="كلمة المرور الجديدة"
                  className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] pr-4 pl-11 text-xs text-primary dark:text-white focus:border-accent focus:outline-none text-right placeholder:text-slate-500 placeholder:font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-white cursor-pointer"
                >
                  {showNew ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>

              {/* Confirm New Password */}
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="تأكيد كلمة المرور الجديدة"
                  className="h-12 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] pr-4 pl-11 text-xs text-primary dark:text-white focus:border-accent focus:outline-none text-right placeholder:text-slate-500 placeholder:font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-text-muted dark:text-slate-400 hover:text-primary dark:hover:text-white cursor-pointer"
                >
                  {showConfirm ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Helper Text below Card matching Figma */}
            <p className="text-[11px] text-text-secondary dark:text-slate-400 text-center leading-relaxed px-2">
              يجب أن تتكون من 6 أرقام و حرف كبير على الأقل و رمز مميز .
            </p>

            {/* Submit Button (Deep Navy matching Figma) */}
            <button
              type="submit"
              disabled={isChangingPassword}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-2xl bg-[#123A68] dark:bg-[#1E4E8C] text-xs font-black text-white hover:bg-[#0D2C50] dark:hover:bg-[#123A68] active:scale-98 transition-all disabled:opacity-60 cursor-pointer shadow-md"
            >
              {isChangingPassword ? "جاري الحفظ..." : "حفظ"}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <ChangePasswordSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </MobileContainer>
  );
}
