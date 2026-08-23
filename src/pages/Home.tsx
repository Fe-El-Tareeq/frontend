import { useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { MobileContainer } from "../components/layout/MobileContainer";
import { useAuth } from "../hooks/useAuth";
import { useWallet } from "../hooks/useWallet";
import { useTrips } from "../hooks/useTrips";
import { useErrands } from "../hooks/useErrands";
import { HomeGreeting } from "../components/home/HomeGreeting";
import { HomeStatsGrid } from "../components/home/HomeStatsGrid";
import { HomeActiveTrips } from "../components/home/HomeActiveTrips";
import { HomeNearbyErrands } from "../components/home/HomeNearbyErrands";
import { HomeFloatingActions } from "../components/home/HomeFloatingActions";

export default function Home() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { tokenBalance } = useWallet();
  const { trips: backendTrips } = useTrips();
  const { errands: backendErrands } = useErrands();

  /*
   * ============================================================================
   * BACKEND INTEGRATION:
   * 1. Errands (Endpoint GET /api/v1/errands exists):
   *    Live data is retrieved directly. If empty ([]), EmptyState is displayed.
   * 2. Trips (Endpoint pending backend implementation):
   *    Static preview data is used until backend endpoint is deployed.
   * ============================================================================
   */

  // Live Errands directly from Backend API (No fake fallback)
  const displayErrands = (backendErrands || []).slice(0, 3).map((e) => ({
    id: e.id,
    title: e.title || e.itemsDescription || "طلب توصيل",
    neighborhood: e.neighborhood?.name
      ? `غزة - ${e.neighborhood.name}`
      : "غزة",
    date: new Date(e.createdAt).toLocaleDateString("ar-EG", {
      month: "short",
      day: "numeric",
    }),
    status: e.status,
    statusText:
      e.status === "OPEN"
        ? "مفتوح"
        : e.status === "MATCHED"
        ? "تم التطابق"
        : "مكتمل",
    statusBg:
      e.status === "OPEN"
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-blue-50 text-blue-700 border-blue-200",
    avatarInitials: e.requester?.fullName
      ? e.requester.fullName.slice(0, 2)
      : "سخ",
    avatarBg: "bg-[#123A68]",
  }));

  // Static preview trips while backend endpoint GET /api/v1/trips is pending
  const staticFallbackTrips = [
    {
      id: "trip-1",
      travelerName: "محمد أبو ريدة",
      avatarInitials: "مر",
      avatarBg: "bg-[#123A68]",
      from: "غزة - الرمال",
      to: "رفح",
      rating: 4.8,
      time: "9:30 صباحاً",
    },
    {
      id: "trip-2",
      travelerName: "خالد السعدي",
      avatarInitials: "خس",
      avatarBg: "bg-[#F36F21]",
      from: "دير البلح",
      to: "خان يونس",
      rating: 4.9,
      time: "1:00 ظهراً",
    },
  ];

  const displayTrips =
    backendTrips && backendTrips.length > 0
      ? backendTrips.slice(0, 3).map((t) => ({
          id: t.id,
          travelerName: t.traveler?.fullName || "محمد أبو ريدة",
          avatarInitials: t.traveler?.fullName
            ? t.traveler.fullName.slice(0, 2)
            : "مر",
          avatarBg: "bg-[#123A68]",
          from: t.originNeighborhood
            ? `${t.originCity} - ${t.originNeighborhood}`
            : t.originCity,
          to: t.destinationNeighborhood
            ? `${t.destinationCity} - ${t.destinationNeighborhood}`
            : t.destinationCity,
          rating: t.traveler?.trustScore ? Number((t.traveler.trustScore / 20).toFixed(1)) : 4.8,
          time: t.departureTime || "9:30 صباحاً",
        }))
      : staticFallbackTrips;

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* User Greeting */}
        <HomeGreeting
          userName={profile?.fullName || "المستخدم"}
          neighborhoodName={
            profile?.neighborhood?.name
              ? `غزة - ${profile.neighborhood.name}`
              : "غزة - الرمال"
          }
        />

        {/* 4 Stats Cards */}
        <HomeStatsGrid
          tokenBalance={tokenBalance ?? 0}
          activeTripsCount={displayTrips.length}
          myErrandsCount={displayErrands.length}
          newMessagesCount={0}
          onNavigateWallet={() => navigate("/wallet")}
          onNavigateTrips={() => navigate("/trips")}
          onNavigateErrands={() => navigate("/errands")}
          onNavigateMessages={() => navigate("/messages")}
        />

        {/* Available Trips (Static placeholder until trips endpoint is live) */}
        <HomeActiveTrips
          trips={displayTrips}
          onViewAll={() => navigate("/trips")}
          onSelectTrip={(id) => navigate(`/trips/${id}`)}
        />

        {/* Nearby Errands (Live data from backend, EmptyState if empty) */}
        <HomeNearbyErrands
          errands={displayErrands}
          onViewAll={() => navigate("/errands")}
          onSelectErrand={(id) => navigate(`/errands/${id}`)}
        />
      </div>

      {/* Floating Action Buttons */}
      <HomeFloatingActions
        onCreateErrand={() => navigate("/create-errand")}
        onCreateTrip={() => navigate("/trips/create")}
      />
    </MobileContainer>
  );
}