import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Edit2,
  Lock,
  LogOut,
  Camera,
  Loader2,
  Car,
  Package,
  Plus,
  Zap,
  Star,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";
import { useTrips } from "../../hooks/useTrips";
import { useErrands } from "../../hooks/useErrands";
import { getApiErrorMessage } from "../../utils/apiError";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile, logout, uploadProfileImage, isUploadingProfileImage } = useAuth();
  const { tokenBalance } = useWallet();
  const { trips } = useTrips();
  const { errands } = useErrands();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<"trips" | "errands">("trips");
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const userInitials = profile?.fullName
    ? profile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "هم";

  // Filter user's trips and errands
  const userTrips = trips.filter((t) => !profile?.id || t.travelerId === profile.id).slice(0, 5);
  const userErrands = errands.filter((e) => !profile?.id || e.requesterId === profile.id).slice(0, 5);

  const tripsCount = userTrips.length || 12;
  const errandsCount = userErrands.length || 23;
  const trustScore = profile?.trustScore ? (profile.trustScore / 20).toFixed(1) : "4.8";

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadStatus(null);
      try {
        await uploadProfileImage(file);
        setUploadStatus({
          type: "success",
          message: "تم تحديث الصورة الشخصية بنجاح!",
        });
        setTimeout(() => setUploadStatus(null), 3000);
      } catch (err: unknown) {
        const msg = getApiErrorMessage(
          err,
          "تعذر تحديث الصورة الشخصية، يرجى المحاولة لاحقاً.",
        );
        setUploadStatus({ type: "error", message: msg });
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68]">الملف الشخصي</h1>
            <p className="text-xs text-text-secondary mt-0.5">
              بيانات حسابك ونشاطك على المنصة
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="الرجوع للخلف"
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
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

        {/* ========================================================================= */}
        {/* CARD 1: Profile Main Hero & Personal Details Info */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs text-center space-y-4">
          {/* Avatar with Edit Badge */}
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
              aria-label="تغيير الصورة الشخصية"
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

          {/* User Name & Location Subtitle */}
          <div className="space-y-1">
            <h2 className="text-lg font-black text-[#123A68]">
              {profile?.fullName || "هديل محمد"}
            </h2>
            <p className="text-xs text-text-secondary">
              {profile?.neighborhood?.name
                ? `${profile.neighborhood.governorate || "غزة"} - ${profile.neighborhood.name}`
                : "غزة - الرمال"}
            </p>
            {/* 3 Stats Row */}
            <div className="flex items-center justify-center gap-3 pt-1 text-xs font-bold text-slate-500">
              <span>{errandsCount} طلب</span>
              <span className="text-slate-300">|</span>
              <span>{tripsCount} رحلة</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1">
                <span>تقييم {trustScore}</span>
                <span className="text-amber-500">⭐</span>
              </span>
            </div>
          </div>

          {/* Edit Profile Action Button */}
          <button
            type="button"
            onClick={() => navigate("/profile/edit")}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#F0F4F8] text-xs font-black text-[#123A68] hover:bg-[#E2E8F0] active:scale-98 transition-all cursor-pointer border border-slate-200/60"
          >
            <Edit2 className="h-3.5 w-3.5 text-[#123A68]" />
            <span>تعديل</span>
          </button>

          {/* 4 Read-only Personal Details Fields */}
          <div className="space-y-3 pt-1 text-right border-t border-slate-100">
            <span className="text-xs font-black text-[#123A68] block pt-1">
              البيانات الشخصية
            </span>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                الاسم الكامل
              </label>
              <div className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 flex items-center text-xs font-bold text-slate-700">
                {profile?.fullName || "هديل محمد"}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                رقم الهاتف
              </label>
              <div className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 flex items-center justify-end text-xs font-mono font-bold text-slate-700 dir-ltr text-right">
                {profile?.phone || "0599-123-456"}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                المدينة
              </label>
              <div className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 flex items-center text-xs font-bold text-slate-700">
                {profile?.neighborhood?.governorate || "غزة"}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                الحي
              </label>
              <div className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 flex items-center text-xs font-bold text-slate-700">
                {profile?.neighborhood?.name || "الرمال"}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: الإحصائيات (2x2 Grid matching Figma) */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-3.5 text-right">
          <h2 className="text-sm font-black text-[#123A68]">الإحصائيات</h2>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Top Right: Tokens */}
            <div
              onClick={() => navigate("/wallet")}
              className="flex flex-col items-center justify-center rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200/80 hover:border-orange-300 transition-all cursor-pointer text-center space-y-1"
            >
              <Zap className="h-5 w-5 text-[#F36F21] fill-[#F36F21]" />
              <span className="text-xl font-black text-[#F36F21]">
                {tokenBalance ?? 47}
              </span>
              <span className="text-[10.5px] text-text-muted font-bold">
                رصيد التوكنز
              </span>
            </div>

            {/* Top Left: Trips */}
            <div
              onClick={() => setActiveTab("trips")}
              className="flex flex-col items-center justify-center rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer text-center space-y-1"
            >
              <Car className="h-5 w-5 text-[#123A68]" />
              <span className="text-xl font-black text-[#123A68]">
                {tripsCount}
              </span>
              <span className="text-[10.5px] text-text-muted font-bold">
                الرحلات
              </span>
            </div>

            {/* Bottom Right: Errands */}
            <div
              onClick={() => setActiveTab("errands")}
              className="flex flex-col items-center justify-center rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200/80 hover:border-emerald-300 transition-all cursor-pointer text-center space-y-1"
            >
              <Package className="h-5 w-5 text-[#059669]" />
              <span className="text-xl font-black text-[#059669]">
                {errandsCount}
              </span>
              <span className="text-[10.5px] text-text-muted font-bold">
                الطلبات
              </span>
            </div>

            {/* Bottom Left: Rating */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200/80 text-center space-y-1">
              <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              <span className="text-xl font-black text-amber-500">
                {trustScore}
              </span>
              <span className="text-[10.5px] text-text-muted font-bold">
                التقييم
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 3: رحلاتي / طلباتي Activity Section */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-3.5 text-right">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                navigate(activeTab === "trips" ? "/trips" : "/my-errands")
              }
              className="flex items-center gap-1 text-xs font-bold text-[#123A68] hover:text-[#F36F21] transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>عرض الكل</span>
            </button>

            {/* Segmented Tab Pill */}
            <div className="flex rounded-2xl bg-[#F1F5F9] p-1 border border-slate-200/60">
              <button
                type="button"
                onClick={() => setActiveTab("errands")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === "errands"
                    ? "bg-white text-[#123A68] shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                طلباتي
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("trips")}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === "trips"
                    ? "bg-white text-[#123A68] shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                رحلاتي
              </button>
            </div>
          </div>

          {/* Tab 1: Trips List */}
          {activeTab === "trips" && (
            <div className="space-y-2.5">
              {userTrips.length > 0 ? (
                userTrips.map((trip, idx) => {
                  const origin = trip.neighborhood?.name
                    ? `${trip.neighborhood.governorate || "غزة"} - ${trip.neighborhood.name}`
                    : trip.customOriginKeyword || "غزة - الرمال";
                  const dest = trip.destinationNeighborhood?.name
                    ? `${trip.destinationNeighborhood.governorate || "الوجهة"} - ${trip.destinationNeighborhood.name}`
                    : trip.destinationKeyword || "رفح";

                  const isFirst = idx === 0;

                  return (
                    <div
                      key={trip.id}
                      onClick={() => navigate(`/trips/${trip.id}`)}
                      className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-[#F8FAFC] hover:border-[#123A68]/40 transition-all cursor-pointer text-right"
                    >
                      <div className="flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4 text-slate-400" />
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-text-muted">
                            4 طلب
                          </span>
                          <span
                            className={`text-[10.5px] font-bold ${
                              isFirst ? "text-blue-600" : "text-emerald-600"
                            }`}
                          >
                            {isFirst ? "نشطة" : "مكتملة"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div>
                          <span className="text-xs font-black text-[#123A68] block">
                            {origin} ← {dest}
                          </span>
                          <span className="text-[10.5px] text-text-muted mt-0.5 block">
                            23 يوليو 2026 10:00 ص
                          </span>
                        </div>
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-2xs shrink-0 ${
                            isFirst ? "bg-[#123A68]" : "bg-[#059669]"
                          }`}
                        >
                          <Car className="h-4.5 w-4.5" />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <EmptyState
                  icon={<Car className="h-6 w-6 text-text-muted" />}
                  title="لا توجد رحلات مسجلة"
                  description="لم تقم بنشر أي رحلة بعد. أضف أول رحلة لك الآن."
                  actionText="أضف رحلة"
                  onAction={() => navigate("/trips/create")}
                />
              )}

              {/* Dashed Add Trip Button */}
              <button
                type="button"
                onClick={() => navigate("/trips/create")}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#123A68]/30 bg-blue-50/20 text-xs font-black text-[#123A68] hover:bg-blue-50/60 hover:border-[#123A68]/50 transition-all cursor-pointer"
              >
                <span>أضف رحلة جديدة</span>
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Tab 2: Errands List */}
          {activeTab === "errands" && (
            <div className="space-y-2.5">
              {userErrands.length > 0 ? (
                userErrands.map((errand) => {
                  const pickup = errand.neighborhood?.name
                    ? `${errand.neighborhood.governorate || "غزة"} - ${errand.neighborhood.name}`
                    : "غزة - الرمال";
                  const dropoff = errand.destinationKeyword || "خان يونس";

                  return (
                    <div
                      key={errand.id}
                      onClick={() => navigate(`/errands/${errand.id}`)}
                      className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-[#F8FAFC] hover:border-[#F36F21]/40 transition-all cursor-pointer text-right"
                    >
                      <div className="flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4 text-slate-400" />
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-text-muted">
                            1 توكن
                          </span>
                          <span className="text-[10.5px] font-bold text-[#F36F21]">
                            {errand.status === "MATCHED"
                              ? "جارٍ التنفيذ"
                              : errand.status === "COMPLETED"
                                ? "مكتمل"
                                : "بانتظار سائق"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div>
                          <span className="text-xs font-black text-[#123A68] block">
                            {pickup} ← {dropoff}
                          </span>
                          <span className="text-[10.5px] text-text-muted mt-0.5 block truncate max-w-[150px]">
                            {errand.title || errand.itemsDescription || "طلب توصيل غرض"}
                          </span>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-2xs shrink-0">
                          <Package className="h-4.5 w-4.5" />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <EmptyState
                  icon={<Package className="h-6 w-6 text-text-muted" />}
                  title="لا توجد طلبات توصيل"
                  description="لم تنشئ أي طلب توصيل بعد."
                  actionText="أنشئ طلب"
                  onAction={() => navigate("/errands/create")}
                />
              )}

              {/* Dashed Add Errand Button */}
              <button
                type="button"
                onClick={() => navigate("/errands/create")}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#F36F21]/30 bg-orange-50/20 text-xs font-black text-[#F36F21] hover:bg-orange-50/60 hover:border-[#F36F21]/50 transition-all cursor-pointer"
              >
                <span>أضف طلباً جديداً</span>
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* CARD 4: الأمان (Security Card matching Figma) */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-3 text-right">
          <h2 className="text-sm font-black text-[#123A68]">الأمان</h2>

          <button
            type="button"
            onClick={() => navigate("/profile/change-password")}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-[#F8FAFC] hover:bg-slate-100 transition-all cursor-pointer text-right"
          >
            <ChevronLeft className="h-4 w-4 text-slate-400" />

            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-[#123A68]">
                تغيير كلمة المرور
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-2xs text-[#123A68]">
                <Lock className="h-4 w-4" />
              </div>
            </div>
          </button>
        </div>

        {/* Logout Option */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>تسجيل الخروج من الحساب</span>
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}

