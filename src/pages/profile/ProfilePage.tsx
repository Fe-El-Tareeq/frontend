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
import { IdentityVerificationModal } from "../../components/modals/IdentityVerificationModal";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile, logout, uploadProfileImage, isUploadingProfileImage } = useAuth();
  const { tokenBalance } = useWallet();
  const { trips } = useTrips();
  const { errands } = useErrands();

  const [activeTab, setActiveTab] = useState<"trips" | "errands">("trips");
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Filter user's trips and errands
  const userTrips = trips.filter((t) => !profile?.id || t.travelerId === profile.id).slice(0, 5);
  const userErrands = errands.filter((e) => !profile?.id || e.requesterId === profile.id).slice(0, 5);

  const tripsCount = userTrips.length || 12;
  const errandsCount = userErrands.length || 23;
  const trustScore = profile?.trustScore ? (profile.trustScore / 20).toFixed(1) : "4.8";
  const isVerified = Boolean(profile?.isVerified);

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
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Page Title & Back Button */}
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

        {/* 1. Identity Verification CTA Banner */}
        <ProfileVerificationBanner
          isVerified={isVerified}
          onStartVerification={() => setIsVerificationModalOpen(true)}
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
          tokenBalance={tokenBalance ?? 47}
          tripsCount={tripsCount}
          errandsCount={errandsCount}
          trustScore={trustScore}
          onTokensClick={() => navigate("/wallet")}
          onTripsClick={() => setActiveTab("trips")}
          onErrandsClick={() => setActiveTab("errands")}
        />

        {/* 4. Trips / Errands Activity Section */}
        <ProfileActivitySection
          activeTab={activeTab}
          onTabChange={setActiveTab}
          trips={userTrips}
          errands={userErrands}
          onViewAll={() =>
            navigate(activeTab === "trips" ? "/trips" : "/my-errands")
          }
          onTripClick={(id) => navigate(`/trips/${id}`)}
          onErrandClick={(id) => navigate(`/errands/${id}`)}
          onAddTrip={() => navigate("/trips/create")}
          onAddErrand={() => navigate("/errands/create")}
        />

        {/* 5. Security Card */}
        <ProfileSecurityCard
          isVerified={isVerified}
          onChangePassword={() => navigate("/settings/change-password")}
          onStartVerification={() => setIsVerificationModalOpen(true)}
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

      {/* Identity Verification Modal */}
      <IdentityVerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
      />
    </MobileContainer>
  );
}
