import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ShieldCheck,
  Edit2,
  Lock,
  LogOut,
  Camera,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile, logout } = useAuth();
  const { tokenBalance } = useWallet();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      alert("تم رفع الصورة بنجاح وتحديث الملف الشخصي.");
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

        {/* Profile Card with Avatar & Name */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs text-center space-y-3">
          <div className="relative mx-auto w-20">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#123A68] text-xl font-black text-white shadow-md mx-auto">
              {profile?.profileImageUrl ? (
                <img
                  src={profile.profileImageUrl}
                  alt={profile.fullName || "User"}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                userInitials
              )}
            </div>

            <button
              type="button"
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-xs hover:bg-[#E05E12] transition-colors cursor-pointer"
            >
              <Camera className="h-3.5 w-3.5" />
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
              {profile?.fullName || "هديل محمد"}
            </h2>
            <p className="text-xs text-text-secondary">
              {profile?.neighborhood?.name
                ? `غزة - ${profile.neighborhood.name}`
                : "غزة - الرمال"}
            </p>
            <span className="text-[10.5px] text-text-muted block">
              عضو منذ 2024
            </span>
          </div>
        </div>

        {/* 2x2 Stats Summary Grid matching Batch 3 image 1 */}
        <div className="grid grid-cols-2 gap-3">
          {/* Stat 1: Trips (Navy) */}
          <div className="rounded-3xl bg-white p-4 border border-border shadow-2xs text-right space-y-0.5">
            <span className="text-[11px] text-text-muted block">الرحلات</span>
            <div className="text-2xl font-black text-[#123A68]">12</div>
            <span className="text-[10px] text-text-muted">منجزة</span>
          </div>

          {/* Stat 2: Errands (Orange) */}
          <div className="rounded-3xl bg-white p-4 border border-border shadow-2xs text-right space-y-0.5">
            <span className="text-[11px] text-text-muted block">الطلبات</span>
            <div className="text-2xl font-black text-[#F36F21]">8</div>
            <span className="text-[10px] text-text-muted">منجزة</span>
          </div>

          {/* Stat 3: Rating (Amber) */}
          <div className="rounded-3xl bg-white p-4 border border-border shadow-2xs text-right space-y-0.5">
            <span className="text-[11px] text-text-muted block">التقييم</span>
            <div className="text-2xl font-black text-amber-500">4.8</div>
            <span className="text-[10px] text-text-muted">ممتاز ⭐</span>
          </div>

          {/* Stat 4: Tokens (Teal) */}
          <div
            onClick={() => navigate("/wallet")}
            className="rounded-3xl bg-white p-4 border border-border shadow-2xs text-right space-y-0.5 cursor-pointer hover:border-accent transition-all"
          >
            <span className="text-[11px] text-text-muted block">التوكنز</span>
            <div className="text-2xl font-black text-teal-700">
              {tokenBalance ?? 47}
            </div>
            <span className="text-[10px] text-text-muted">توكن متاح ⚡</span>
          </div>
        </div>

        {/* User Information Details Card */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-3.5 text-xs text-right">
          <h3 className="text-sm font-black text-[#123A68] pb-1 border-b border-slate-100">
            البيانات الشخصية
          </h3>

          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-primary">
              {profile?.phone || "059 123 4567"}
            </span>
            <span className="text-text-muted">رقم الهاتف</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-primary">غزة</span>
            <span className="text-text-muted">المدينة</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-primary">
              {profile?.neighborhood?.name || "الرمال"}
            </span>
            <span className="text-text-muted">الحي</span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <ShieldCheck className="h-4 w-4" />
              <span>موثّق</span>
            </span>
            <span className="text-text-muted">حالة الحساب</span>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            type="button"
            onClick={() => navigate("/profile/edit")}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-md"
          >
            <Edit2 className="h-4 w-4" />
            <span>تعديل الملف الشخصي</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/settings/change-password")}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white border border-slate-200 text-xs font-black text-primary hover:border-[#123A68] active:scale-98 transition-all cursor-pointer shadow-2xs"
          >
            <Lock className="h-4 w-4" />
            <span>تغيير كلمة المرور</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-red-50 border border-red-200 text-xs font-black text-red-600 hover:bg-red-100 active:scale-98 transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
