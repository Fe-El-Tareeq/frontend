import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";
import { ProfileDetailsCard } from "../../components/profile/ProfileDetailsCard";
import { ProfileStatsGrid } from "../../components/profile/ProfileStatsGrid";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { tokenBalance } = useWallet();

  const userInitials = profile?.fullName
    ? profile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "هم";

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-16 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <h1 className="text-xl font-black text-[#123A68]">الملف الشخصي</h1>

        {/* 1. Main Profile Card */}
        <ProfileDetailsCard
          fullName={profile?.fullName || "هديل محمد"}
          initials={userInitials}
          neighborhoodText={
            profile?.neighborhood?.name
              ? `غزة - ${profile.neighborhood.name}`
              : "غزة - الرمال"
          }
          phone={profile?.phone || "0599-123-456"}
          onEdit={() => navigate("/profile/edit")}
        />

        {/* 2. Statistics Card (2x2 Grid) */}
        <ProfileStatsGrid
          tokenBalance={tokenBalance || 47}
          tripsCount={12}
          errandsCount={23}
          rating={4.8}
        />

        {/* 3. Security Card */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-3">
          <h3 className="text-sm font-black text-[#123A68]">الأمان</h3>

          <button
            type="button"
            onClick={() => navigate("/settings/change-password")}
            className="flex w-full items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-[#F8FAFC] hover:bg-slate-100 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#123A68]">
              <Lock className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-primary">تغيير كلمة المرور</span>
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
