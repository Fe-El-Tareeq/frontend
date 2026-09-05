import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ShieldCheck,
  Edit2,
  Lock,
  LogOut,
  Camera,
  Loader2,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";
import { getApiErrorMessage } from "../../utils/apiError";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile, logout, uploadProfileImage, isUploadingProfileImage } = useAuth();
  const { tokenBalance } = useWallet();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const userInitials = profile?.fullName
    ? profile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "هم";

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadStatus(null);
      try {
        await uploadProfileImage(file);
        setUploadStatus({ type: "success", message: "تم تحديث الصورة الشخصية بنجاح!" });
        setTimeout(() => setUploadStatus(null), 3000);
      } catch (err: unknown) {
        const msg = getApiErrorMessage(err, "تعذر تحديث الصورة الشخصية، يرجى المحاولة لاحقاً.");
        setUploadStatus({ type: "error", message: msg });
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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
          <h1 className="text-xl font-black text-[#123A68]">الملف الشخصي</h1>
        </div>

        {/* Upload feedback banner */}
        {uploadStatus && (
          <div
            className={`rounded-2xl p-3 text-xs font-bold text-right border ${
              uploadStatus.type === "success"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {uploadStatus.message}
          </div>
        )}

        {/* Profile Card with Avatar & Name */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs text-center space-y-3">
          <div className="relative mx-auto w-20">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#123A68] text-xl font-black text-white shadow-md mx-auto overflow-hidden">
              {isUploadingProfileImage ? (
                <Loader2 className="h-7 w-7 animate-spin text-white" />
              ) : profile?.profileImageUrl ? (
                <img
                  src={profile.profileImageUrl}
                  alt={profile.fullName || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                userInitials
              )}
            </div>

            <button
              type="button"
              disabled={isUploadingProfileImage}
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-xs hover:bg-[#E05E12] transition-colors cursor-pointer disabled:opacity-50"
            >
              {isUploadingProfileImage ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Camera className="h-3.5 w-3.5" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="space-y-0.5">
            <h2 className="text-base font-black text-[#123A68]">
              {profile?.fullName || "المستخدم"}
            </h2>
            <p className="text-xs text-text-secondary">
              {profile?.neighborhood?.name
                ? `${profile.neighborhood.governorate || "غزة"} - ${profile.neighborhood.name}`
                : "غزة"}
            </p>
            <span className="text-[10.5px] text-text-muted block">
              عضو في بطريقك
            </span>
          </div>
        </div>

        {/* 2x2 Stats Summary Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Stat 1: Rating (Amber) */}
          <div className="rounded-3xl bg-white p-4 border border-border shadow-2xs text-right space-y-0.5">
            <span className="text-[11px] text-text-muted block">درجة الثقة</span>
            <div className="text-2xl font-black text-amber-500">
              {profile?.trustScore ? (profile.trustScore / 20).toFixed(1) : "5.0"}
            </div>
            <span className="text-[10px] text-text-muted">⭐ ممتاز</span>
          </div>

          {/* Stat 2: Tokens (Teal) */}
          <div
            onClick={() => navigate("/wallet")}
            className="rounded-3xl bg-white p-4 border border-border shadow-2xs text-right space-y-0.5 cursor-pointer hover:border-accent transition-all"
          >
            <span className="text-[11px] text-text-muted block">رصيد التوكنز</span>
            <div className="text-2xl font-black text-teal-700">
              {tokenBalance ?? 0}
            </div>
            <span className="text-[10px] text-text-muted">توكن متاح ⚡</span>
          </div>
        </div>

        {/* Verification Status Card */}
        <div className="flex items-center justify-between rounded-3xl bg-white p-4.5 border border-border shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="text-right">
              <h3 className="text-xs font-black text-primary">حساب موثّق</h3>
              <p className="text-[11px] text-text-muted">
                تم التحقق من رقم الهاتف بنجاح
              </p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10.5px] font-bold text-emerald-700 border border-emerald-200">
            مؤكد ✓
          </span>
        </div>

        {/* Action Buttons List */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => navigate("/profile/edit")}
            className="flex h-13 w-full items-center justify-between rounded-3xl bg-white px-4.5 border border-border shadow-2xs hover:border-[#123A68]/30 transition-all cursor-pointer text-right"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#123A68]">
                <Edit2 className="h-4.5 w-4.5" />
              </div>
              <span className="text-xs font-bold text-primary">
                تعديل الملف الشخصي
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-text-muted rotate-180" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile/change-password")}
            className="flex h-13 w-full items-center justify-between rounded-3xl bg-white px-4.5 border border-border shadow-2xs hover:border-[#123A68]/30 transition-all cursor-pointer text-right"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#F36F21]">
                <Lock className="h-4.5 w-4.5" />
              </div>
              <span className="text-xs font-bold text-primary">
                تغيير كلمة المرور
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-text-muted rotate-180" />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex h-13 w-full items-center justify-between rounded-3xl bg-white px-4.5 border border-red-100 shadow-2xs hover:bg-red-50/50 transition-all cursor-pointer text-right text-red-600"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <LogOut className="h-4.5 w-4.5" />
              </div>
              <span className="text-xs font-bold">تسجيل الخروج</span>
            </div>
            <ChevronRight className="h-4 w-4 text-red-400 rotate-180" />
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
