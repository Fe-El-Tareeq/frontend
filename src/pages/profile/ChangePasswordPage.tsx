import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Eye, EyeOff, Lock } from "lucide-react";
import { Header } from "../../components/layout/Header";
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
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#123A68]">
              تغيير كلمة المرور
            </h1>
            <p className="text-xs text-text-secondary">
              أدخل كلمة المرور الحالية ثم الجديدة
            </p>
          </div>
        </div>

        {/* Error Alert if any */}
        {error && (
          <div className="rounded-2xl bg-red-50 p-3.5 border border-red-200 text-xs font-bold text-red-600 text-right">
            {error}
          </div>
        )}

        {/* Main Form Card */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs text-right">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                كلمة المرور الحالية <span className="text-[#F36F21]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] pr-4 pl-11 text-xs text-primary focus:border-accent focus:outline-none text-right"
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
            </div>

            {/* New Password */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                كلمة المرور الجديدة <span className="text-[#F36F21]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] pr-4 pl-11 text-xs text-primary focus:border-accent focus:outline-none text-right"
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
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                تأكيد كلمة المرور الجديدة{" "}
                <span className="text-[#F36F21]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] pr-4 pl-11 text-xs text-primary focus:border-accent focus:outline-none text-right"
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

            {/* Hint Box matching Batch 4 & 5 */}
            <div className="rounded-2xl bg-orange-50/70 p-3.5 border border-orange-200/70 text-right space-y-1">
              <span className="text-[11px] font-bold text-[#F36F21] block">
                شروط كلمة المرور:
              </span>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، وحرف كبير، ورقم،
                ورمز خاص.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all disabled:opacity-60 cursor-pointer shadow-md"
              >
                <Lock className="h-4 w-4" />
                <span>
                  {isSubmitting ? "جاري الحفظ..." : "حفظ كلمة المرور"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-3 text-xs font-bold text-text-secondary hover:text-primary cursor-pointer"
              >
                إلغاء
              </button>
            </div>
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
