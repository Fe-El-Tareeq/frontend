import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { ChangePasswordSuccessModal } from "../../components/modals/ChangePasswordSuccessModal";

export default function ChangePasswordPage() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 600);
  };

  return (
    <MobileContainer className="min-h-screen bg-[#F8FAFC] pb-8 text-right">
      {/* Top Header */}
      <header className="flex h-14 items-center justify-between px-5 bg-white border-b border-border/40 shadow-2xs">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-xs font-bold text-text-secondary hover:text-primary transition-colors cursor-pointer"
        >
          رجوع
        </button>

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 cursor-pointer"
        >
          <span className="text-sm font-black text-primary">بطريقك</span>
          <img
            src="/logo.png"
            alt="بطريقك"
            className="h-7 w-7 object-contain"
          />
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-[360px] space-y-4">
          {/* Error Alert if any */}
          {error && (
            <div className="rounded-2xl bg-red-50 p-3.5 border border-red-200 text-xs font-bold text-red-600 text-right">
              {error}
            </div>
          )}

          {/* Main Form Card */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-3xl bg-white p-5 border border-border/80 shadow-xs space-y-4 text-right">
              {/* Current Password */}
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="كلمة المرور الحالية"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] pr-4 pl-11 text-xs text-primary focus:border-accent focus:outline-none text-right placeholder:text-slate-500 placeholder:font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-text-muted hover:text-primary cursor-pointer"
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
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] pr-4 pl-11 text-xs text-primary focus:border-accent focus:outline-none text-right placeholder:text-slate-500 placeholder:font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-text-muted hover:text-primary cursor-pointer"
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
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] pr-4 pl-11 text-xs text-primary focus:border-accent focus:outline-none text-right placeholder:text-slate-500 placeholder:font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-text-muted hover:text-primary cursor-pointer"
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
            <p className="text-[11px] text-text-secondary text-center leading-relaxed px-2">
              يجب أن تتكون من 6 أرقام و حرف كبير على الأقل و رمز مميز .
            </p>

            {/* Submit Button (Deep Navy matching Figma) */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all disabled:opacity-60 cursor-pointer shadow-md"
            >
              {isSubmitting ? "جاري الحفظ..." : "حفظ"}
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
