import { useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { MobileContainer } from "../components/layout/MobileContainer";
import { useAuth } from "../hooks/useAuth";
import { useWallet } from "../hooks/useWallet";
import LandingPage from "./LandingPage";
import { HomeGreeting } from "../components/home/HomeGreeting";
import { HomeStatsGrid } from "../components/home/HomeStatsGrid";
import { HomeActiveTrips } from "../components/home/HomeActiveTrips";
import { HomeNearbyErrands } from "../components/home/HomeNearbyErrands";
import { HomeFloatingActions } from "../components/home/HomeFloatingActions";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, profile } = useAuth();
  const { tokenBalance } = useWallet();

  // If visitor is unauthenticated, render the Landing Page
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  // Active trips near user
  const nearbyTrips = [
    {
      id: "trip-1",
      travelerName: "أحمد خالد",
      avatarInitials: "أخ",
      avatarBg: "bg-[#F36F21]",
      from: "رفح",
      to: "غزة - الرمال",
      rating: 4.9,
      time: "10:00 ص",
    },
    {
      id: "trip-2",
      travelerName: "سارة عمر",
      avatarInitials: "سع",
      avatarBg: "bg-[#E11D48]",
      from: "غزة - الشجاعية",
      to: "خان يونس",
      rating: 4.7,
      time: "2:00 م",
    },
    {
      id: "trip-3",
      travelerName: "محمد يوسف",
      avatarInitials: "مي",
      avatarBg: "bg-[#0D9488]",
      from: "بيت لاهيا",
      to: "دير البلح",
      rating: 5.0,
      time: "9:00 ص",
    },
  ];

  // Nearby errands
  const nearbyErrands = [
    {
      id: "errand-1",
      title: "توصيل دواء من صيدلية في رفح إلى...",
      neighborhood: "الرمال",
      date: "23 يوليو",
      status: "PENDING",
      statusText: "قيد الانتظار",
      statusBg: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
      avatarInitials: "فع",
      avatarBg: "bg-[#8B5CF6]",
    },
    {
      id: "errand-2",
      title: "توصيل وثائق رسمية من ديوان الموظفين...",
      neighborhood: "الشجاعية",
      date: "22 يوليو",
      status: "MATCHED",
      statusText: "تم التطابق",
      statusBg: "bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]",
      avatarInitials: "خع",
      avatarBg: "bg-[#8B5CF6]",
    },
    {
      id: "errand-3",
      title: "شراء مستلزمات مدرسية من محلات د...",
      neighborhood: "بيت لاهيا",
      date: "21 يوليو",
      status: "COMPLETED",
      statusText: "مكتمل",
      statusBg: "bg-[#D1FAE5] text-[#065F46] border-[#A7F3D0]",
      avatarInitials: "رس",
      avatarBg: "bg-[#F36F21]",
    },
  ];

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* 1. Greeting */}
        <HomeGreeting
          userName={profile?.fullName || "هديل محمد"}
          neighborhoodName={
            profile?.neighborhood?.name
              ? `غزة - ${profile.neighborhood.name}`
              : "غزة - الرمال"
          }
        />

        {/* 2. Four Stats Overview Cards */}
        <HomeStatsGrid
          tokenBalance={tokenBalance || 47}
          activeTripsCount={3}
          myErrandsCount={2}
          newMessagesCount={0}
          onNavigateWallet={() => navigate("/wallet")}
          onNavigateTrips={() => navigate("/trips")}
          onNavigateErrands={() => navigate("/errands")}
          onNavigateMessages={() => navigate("/messages")}
        />

        {/* 3. Available Trips */}
        <HomeActiveTrips
          trips={nearbyTrips}
          onViewAll={() => navigate("/trips")}
          onSelectTrip={(id) => navigate(`/trips/${id}`)}
        />

        {/* 4. Nearby Errands */}
        <HomeNearbyErrands
          errands={nearbyErrands}
          onViewAll={() => navigate("/errands")}
          onSelectErrand={(id) => navigate(`/errands/${id}`)}
        />
      </div>

      {/* 5. Sticky Bottom Action Buttons */}
      <HomeFloatingActions
        onCreateErrand={() => navigate("/errands/new")}
        onCreateTrip={() => navigate("/trips/new")}
      />
    </MobileContainer>
  );
}