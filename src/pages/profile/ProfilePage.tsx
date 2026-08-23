import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";
import { useErrands } from "../../hooks/useErrands";
import { useTrips } from "../../hooks/useTrips";
import { ProfileDetailsCard } from "../../components/profile/ProfileDetailsCard";
import { ProfileStatsGrid } from "../../components/profile/ProfileStatsGrid";

export default function ProfilePage() {
  const navigate = useNavigate();

  /*
   * ============================================================================
   * BACKEND INTEGRATION: User Profile & Account Data
   * Endpoints:
   * - GET /api/v1/users/me   (User profile & trustScore)
   * - GET /api/v1/wallet     (Live token balance)
   * - GET /api/v1/errands    (User errands count)
   * - GET /api/v1/trips      (User trips count)
   * ============================================================================
   */
  const { profile, isLoadingProfile } = useAuth();
  const { tokenBalance } = useWallet();
  const { errands: backendErrands } = useErrands();
  const { trips: backendTrips } = useTrips();

  const userInitials = profile?.fullName
    ? profile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "";

  const liveRating = profile?.trustScore
    ? (profile.trustScore / 20).toFixed(1)
    : "5.0";

  const errandsCount = backendErrands?.length || 0;
  const tripsCount = backendTrips?.length || 0;

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-16 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <h1 className="text-xl font-black text-[#123A68]">الملف الشخصي</h1>

        {isLoadingProfile ? (
          <div className="space-y-4">
            <div className="h-64 w-full animate-pulse rounded-3xl bg-white border border-border" />
            <div className="h-44 w-full animate-pulse rounded-3xl bg-white border border-border" />
          </div>
        ) : (
          <>
            {/* 1. Main Profile Card with Live Data */}
            <ProfileDetailsCard
              fullName={profile?.fullName || ""}
              initials={userInitials}
              neighborhoodText={
                profile?.neighborhood?.name
                  ? `غزة - ${profile.neighborhood.name}`
                  : profile?.neighborhoodId
                  ? "غزة"
                  : ""
              }
              cityText={profile?.neighborhood?.governorate || "غزة"}
              phone={profile?.phone || ""}
              errandsCount={errandsCount}
              tripsCount={tripsCount}
              rating={liveRating}
              onEdit={() => navigate("/profile/edit")}
            />

            {/* 2. Statistics Card (2x2 Grid) with Live Data */}
            <ProfileStatsGrid
              tokenBalance={tokenBalance ?? 0}
              tripsCount={tripsCount}
              errandsCount={errandsCount}
              rating={liveRating}
            />

            {/* 3. Security Card */}
            <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-3">
              <h3 className="text-sm font-black text-[#123A68]">الأمان</h3>

              <button
                type="button"
                onClick={() => navigate("/settings/change-password")}
                className="flex w-full items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-[#F8FAFC] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#123A68]">
                  <Lock className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-primary">تغيير كلمة المرور</span>
              </button>
            </div>
          </>
        )}
      </div>
    </MobileContainer>
  );
}
