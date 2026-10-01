import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, LogOut } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";
import { useTrips } from "../../hooks/useTrips";
import { useErrands } from "../../hooks/useErrands";
import { getApiErrorMessage } from "../../utils/apiError";
import { ProfileVerificationBanner } from "../../components/profile/ProfileVerificationBanner";
import { ProfileHeroCard } from "../../components/profile/ProfileHeroCard";
import { ProfileStats2x2 } from "../../components/profile/ProfileStats2x2";
import { ProfileActivitySection } from "../../components/profile/ProfileActivitySection";
import { ProfileSecurityCard } from "../../components/profile/ProfileSecurityCard";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile, logout, uploadProfileImage, isUploadingProfileImage } = useAuth();
  const { tokenBalance } = useWallet();
  const { trips } = useTrips();
  const { errands } = useErrands();

  const [activeTab, setActiveTab] = useState<"trips" | "errands">("trips");
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Filter user's trips and errands
  const userTrips = trips.filter((t) => !profile?.id || t.travelerId === profile.id).slice(0, 5);
  const userErrands = errands.filter((e) => !profile?.id || e.requesterId === profile.id).slice(0, 5);

  const tripsCount = userTrips.length;
  const errandsCount = userErrands.length;
  const trustScore = profile?.trustScore ? (profile.trustScore / 20).toFixed(1) : "5.0";
  const isVerified = profile?.verificationStatus === "VERIFIED" || profile?.isVerified === true;

  const handleImageSelected = async (file: File) => {
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
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Page Title & Back Button */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68] dark:text-white">الملف الشخصي</h1>
            <p className="text-xs text-text-secondary dark:text-slate-400 mt-0.5">
              بيانات حسابك ونشاطك على المنصة
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="الرجوع للخلف"
            className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
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

        {/* 1. Identity Verification CTA Banner */}
        <ProfileVerificationBanner
          isVerified={isVerified}
          onStartVerification={() => navigate("/verify-identity")}
        />

        {/* 2. Hero & Personal Details Info Card */}
        <ProfileHeroCard
          profile={profile}
          errandsCount={errandsCount}
          tripsCount={tripsCount}
          trustScore={trustScore}
          isUploadingImage={isUploadingProfileImage}
          onEditClick={() => navigate("/profile/edit")}
          onImageSelected={handleImageSelected}
        />

        {/* 3. 2x2 Stats Grid Card */}
        <ProfileStats2x2
          tokenBalance={tokenBalance ?? 0}
          tripsCount={tripsCount}
          errandsCount={errandsCount}
          trustScore={trustScore}
          onTokensClick={() => navigate("/wallet")}
          onTripsClick={() => navigate("/profile/trips")}
          onErrandsClick={() => navigate("/my-errands")}
        />

        {/* 4. Trips / Errands Activity Section */}
        <ProfileActivitySection
          activeTab={activeTab}
          onTabChange={setActiveTab}
          trips={userTrips}
          errands={userErrands}
          onViewAll={() =>
            navigate(activeTab === "trips" ? "/profile/trips" : "/my-errands")
          }
          onTripClick={(id) => navigate(`/trips/${id}`)}
          onErrandClick={(id) => navigate(`/errands/${id}`)}
          onAddTrip={() => navigate(isVerified ? "/trips/new" : "/verify-identity")}
          onAddErrand={() => navigate("/errands/new")}
        />

        {/* 5. Security Card */}
        <ProfileSecurityCard
          isVerified={isVerified}
          onChangePassword={() => navigate("/settings/change-password")}
          onStartVerification={() => navigate("/verify-identity")}
        />

        {/* Logout Option */}
        <div className="pt-2 text-center pb-4">
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
