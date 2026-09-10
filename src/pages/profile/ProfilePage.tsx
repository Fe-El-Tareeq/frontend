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
  Car,
  Package,
  Plus,
  ArrowLeft,
  Calendar,
  Clock,
  Coins,
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
  const [uploadStatus, setUploadStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-black text-[#123A68]">الملف الشخصي</h1>
          </div>
          <button
            onClick={() => navigate("/profile/edit")}
            className="flex items-center gap-1 text-xs font-bold text-[#F36F21] hover:text-[#E05E12] cursor-pointer"
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>تعديل</span>
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

        {/* Profile Hero Card with Avatar & Name */}
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

          <div className="space-y-1">
            <h2 className="text-base font-black text-[#123A68]">
              {profile?.fullName || "المستخدم"}
            </h2>
            <p className="text-xs text-text-secondary">
              {profile?.neighborhood?.name
                ? `${profile.neighborhood.governorate || "خان يونس"} - ${profile.neighborhood.name}`
                : "محافظة خان يونس - الحي الياباني"}
            </p>
            <div className="flex items-center justify-center gap-2 pt-1 text-[11px] font-bold text-text-muted">
              <span>{errandsCount} طلب</span>
              <span>•</span>
              <span>{tripsCount} رحلة</span>
              <span>•</span>
              <span className="text-amber-500">⭐ {trustScore}</span>
            </div>
          </div>
        </div>

        {/* Personal Details Readonly Card with Edit trigger */}
        <div className="rounded-3xl bg-white p-4.5 border border-border shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h3 className="text-xs font-black text-[#123A68]">البيانات الشخصية</h3>
            <button
              type="button"
              onClick={() => navigate("/profile/edit")}
              className="flex items-center gap-1 text-[11px] font-bold text-[#F36F21] hover:underline cursor-pointer"
            >
              <Edit2 className="h-3 w-3" />
              <span>تعديل</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10.5px] text-text-muted block">الاسم الكامل</span>
              <span className="font-bold text-primary block mt-0.5 truncate">
                {profile?.fullName || "غير محدد"}
              </span>
            </div>

            <div>
              <span className="text-[10.5px] text-text-muted block">رقم الهاتف</span>
              <span className="font-bold text-primary block mt-0.5 dir-ltr text-right truncate">
                {profile?.phone || "059-XXXXXXX"}
              </span>
            </div>

            <div>
              <span className="text-[10.5px] text-text-muted block">المحافظة</span>
              <span className="font-bold text-primary block mt-0.5 truncate">
                {profile?.neighborhood?.governorate || "خان يونس"}
              </span>
            </div>

            <div>
              <span className="text-[10.5px] text-text-muted block">الحي</span>
              <span className="font-bold text-primary block mt-0.5 truncate">
                {profile?.neighborhood?.name || "الحي الياباني"}
              </span>
            </div>
          </div>
        </div>

        {/* 4-Stat Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Stat 1: Tokens */}
          <div
            onClick={() => navigate("/wallet")}
            className="rounded-3xl bg-white p-4 border border-border shadow-2xs text-right space-y-1 cursor-pointer hover:border-[#123A68]/40 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-text-muted">رصيد التوكنز</span>
              <Coins className="h-4 w-4 text-[#F36F21]" />
            </div>
            <div className="text-xl font-black text-[#123A68]">
              {tokenBalance ?? 50}{" "}
              <span className="text-xs font-normal text-text-muted">توكن</span>
            </div>
            <span className="text-[10px] font-bold text-[#F36F21] block group-hover:underline">
              شحن الرصيد ←
            </span>
          </div>

          {/* Stat 2: Trips */}
          <div
            onClick={() => setActiveTab("trips")}
            className="rounded-3xl bg-white p-4 border border-border shadow-2xs text-right space-y-1 cursor-pointer hover:border-border transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-text-muted">الرحلات</span>
              <Car className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-xl font-black text-[#123A68]">
              {tripsCount}
            </div>
            <span className="text-[10px] text-text-muted block">رحلة منجزة</span>
          </div>

          {/* Stat 3: Errands */}
          <div
            onClick={() => setActiveTab("errands")}
            className="rounded-3xl bg-white p-4 border border-border shadow-2xs text-right space-y-1 cursor-pointer hover:border-border transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-text-muted">الطلبات</span>
              <Package className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-xl font-black text-[#123A68]">
              {errandsCount}
            </div>
            <span className="text-[10px] text-text-muted block">طلب موصل</span>
          </div>

          {/* Stat 4: Rating */}
          <div className="rounded-3xl bg-white p-4 border border-border shadow-2xs text-right space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-text-muted">درجة الثقة</span>
              <span className="text-amber-500 text-xs">⭐</span>
            </div>
            <div className="text-xl font-black text-amber-500">
              {trustScore}
            </div>
            <span className="text-[10px] text-text-muted block">ممتاز (45 تقييم)</span>
          </div>
        </div>

        {/* Verification Status Card */}
        <div className="flex items-center justify-between rounded-3xl bg-white p-4 border border-border shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="text-right">
              <h3 className="text-xs font-black text-primary">حساب موثّق</h3>
              <p className="text-[11px] text-text-muted">
                تم التحقق من الهوية ورقم الهاتف
              </p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10.5px] font-bold text-emerald-700 border border-emerald-200">
            مؤكد ✓
          </span>
        </div>

        {/* Activity Tabs Switcher */}
        <div className="space-y-3 pt-2">
          <div className="flex rounded-2xl bg-slate-200/70 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("trips")}
              className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "trips"
                  ? "bg-white text-[#123A68] shadow-xs"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              رحلاتي ({tripsCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("errands")}
              className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "errands"
                  ? "bg-white text-[#123A68] shadow-xs"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              طلباتي ({errandsCount})
            </button>
          </div>

          {/* Tab 1: Trips List */}
          {activeTab === "trips" && (
            <div className="space-y-2.5">
              {/* Add New Trip Dashed Button */}
              <button
                type="button"
                onClick={() => navigate("/trips/create")}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-[#123A68]/30 bg-blue-50/30 text-xs font-black text-[#123A68] hover:bg-blue-50/70 hover:border-[#123A68]/50 transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>أضف رحلة جديدة</span>
              </button>

              {userTrips.length > 0 ? (
                userTrips.map((trip) => {
                  const origin = trip.neighborhood?.name
                    ? `${trip.neighborhood.governorate || "غزة"} - ${trip.neighborhood.name}`
                    : trip.customOriginKeyword || "غزة";
                  const dest = trip.destinationNeighborhood?.name
                    ? `${trip.destinationNeighborhood.governorate || "الوجهة"} - ${trip.destinationNeighborhood.name}`
                    : trip.destinationKeyword;

                  return (
                    <div
                      key={trip.id}
                      onClick={() => navigate(`/trips/${trip.id}`)}
                      className="rounded-3xl bg-white p-4 border border-border shadow-xs hover:border-[#123A68]/40 transition-all cursor-pointer space-y-2.5 text-right"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-[#123A68]" />
                          <span className="text-xs font-black text-[#123A68]">
                            {trip.status === "ACTIVE" ? "رحلة نشطة" : "مكتملة"}
                          </span>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            trip.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {trip.status === "ACTIVE" ? "متاحة للحجز" : "منتهية"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs font-bold text-primary pt-1">
                        <span className="truncate max-w-[120px]">{origin}</span>
                        <ArrowLeft className="h-4 w-4 text-text-muted shrink-0" />
                        <span className="truncate max-w-[120px]">{dest}</span>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-text-muted">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>اليوم • 10:00 ص</span>
                        </div>
                        <span className="text-[#F36F21] font-bold">
                          {trip.maxCapacityClass === "LIGHT"
                            ? "متبقي مقعدين"
                            : "متاح نقل أغراض"}
                        </span>
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
            </div>
          )}

          {/* Tab 2: Errands List */}
          {activeTab === "errands" && (
            <div className="space-y-2.5">
              {/* Add New Errand Dashed Button */}
              <button
                type="button"
                onClick={() => navigate("/errands/create")}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-[#F36F21]/40 bg-orange-50/30 text-xs font-black text-[#F36F21] hover:bg-orange-50/70 hover:border-[#F36F21]/60 transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>أنشئ طلباً جديداً</span>
              </button>

              {userErrands.length > 0 ? (
                userErrands.map((errand) => {
                  const pickup = errand.neighborhood?.name
                    ? `${errand.neighborhood.governorate || "غزة"} - ${errand.neighborhood.name}`
                    : "غزة";
                  const dropoff = errand.destinationKeyword || "الوجهة";

                  return (
                    <div
                      key={errand.id}
                      onClick={() => navigate(`/errands/${errand.id}`)}
                      className="rounded-3xl bg-white p-4 border border-border shadow-xs hover:border-[#F36F21]/40 transition-all cursor-pointer space-y-2.5 text-right"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-[#F36F21]" />
                          <span className="text-xs font-black text-primary truncate max-w-[150px]">
                            {errand.title || errand.itemsDescription || "طلب توصيل غرض"}
                          </span>
                        </div>
                        <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold text-[#F36F21] border border-orange-200">
                          {errand.status === "MATCHED"
                            ? "تم قبول السائق"
                            : errand.status === "COMPLETED"
                              ? "تم التسليم ✓"
                              : "بانتظار سائق"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs font-bold text-primary pt-1">
                        <span className="truncate max-w-[120px]">{pickup}</span>
                        <ArrowLeft className="h-4 w-4 text-text-muted shrink-0" />
                        <span className="truncate max-w-[120px]">{dropoff}</span>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-text-muted">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>اليوم</span>
                        </div>
                        <span className="text-emerald-700 font-bold">
                          {errand.calculatedFeeNis ? `${errand.calculatedFeeNis} ₪` : "+15 توكن مكافأة"}
                        </span>
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
            </div>
          )}
        </div>

        {/* Security & Action Buttons List */}
        <div className="space-y-2.5 pt-2">
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
