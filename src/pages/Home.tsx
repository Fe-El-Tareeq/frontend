import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Sparkles } from "lucide-react";
import { Header } from "../components/layout/Header";
import { MobileContainer } from "../components/layout/MobileContainer";
import { HomeGreeting } from "../components/home/HomeGreeting";
import { HomeStatsGrid } from "../components/home/HomeStatsGrid";
import {
  HomeActiveTrips,
  type HomeTripItem,
} from "../components/home/HomeActiveTrips";
import {
  HomeNearbyErrands,
  type HomeErrandItem,
} from "../components/home/HomeNearbyErrands";
import { HomeFloatingActions } from "../components/home/HomeFloatingActions";
import { useAuth } from "../hooks/useAuth";
import { useWallet } from "../hooks/useWallet";
import { useErrands } from "../hooks/useErrands";
import { useTrips } from "../hooks/useTrips";
import { usePWA } from "../hooks/usePWA";
import { PwaInstallModal } from "../components/pwa/PwaInstallModal";

export default function Home() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { tokenBalance, isLoadingWallet } = useWallet();
  const { errands, isLoading: isLoadingErrands } = useErrands();
  const { trips, isLoading: isLoadingTrips } = useTrips();
  const { isInstalled, isIOS, triggerInstall } = usePWA();
  const [showInstallModal, setShowInstallModal] = useState(false);

  const userCityNeighborhood = profile?.neighborhood?.name
    ? `غزة - ${profile.neighborhood.name}`
    : "غزة";

  const currentTokens = tokenBalance ?? 0;
  const activeTripsCount = trips.length;
  const activeErrandsCount = errands.length;

  const handleInstallClick = async () => {
    const result = await triggerInstall();
    if (result === "ios" || result === "fallback") {
      setShowInstallModal(true);
    }
  };

  // Slice first 3 dynamic trips
  const nearbyTrips: HomeTripItem[] = trips.slice(0, 3).map((t, idx) => {
    const travelerName = t.traveler?.fullName || "مسافر نشط";
    const initials = travelerName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
    const originLabel = t.neighborhood?.name
      ? `${t.neighborhood.governorate || "غزة"} - ${t.neighborhood.name}`
      : t.customOriginKeyword || "غزة";
    const destLabel = t.destinationNeighborhood?.name
      ? `${t.destinationNeighborhood.governorate || "الوجهة"} - ${t.destinationNeighborhood.name}`
      : t.destinationKeyword;

    return {
      id: t.id,
      travelerName,
      avatarInitials: initials,
      avatarBg:
        idx % 3 === 0
          ? "bg-[#F36F21]"
          : idx % 3 === 1
            ? "bg-red-600"
            : "bg-teal-600",
      rating: t.traveler?.trustScore
        ? Number((t.traveler.trustScore / 20).toFixed(1))
        : 5.0,
      time: new Date(t.departureTime).toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      from: originLabel,
      to: destLabel,
    };
  });

  // Slice first 3 dynamic errands
  const nearbyErrands: HomeErrandItem[] = errands.slice(0, 3).map((e, idx) => {
    const isWaiting = e.status === "OPEN";
    const isMatched = e.status === "MATCHED";
    const isCompleted = e.status === "COMPLETED";
    const requesterName = e.requester?.fullName || "صاحب الطلب";
    const initials = requesterName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
    const locationText = e.neighborhood
      ? `${e.neighborhood.name} ➔ ${e.destinationKeyword}`
      : e.destinationKeyword;

    return {
      id: e.id,
      title: e.title || e.itemsDescription,
      avatarInitials: initials,
      avatarBg:
        idx % 3 === 0
          ? "bg-purple-600"
          : idx % 3 === 1
            ? "bg-blue-600"
            : "bg-[#F36F21]",
      status: isWaiting
        ? "قيد الانتظار"
        : isMatched
          ? "تم التطابق"
          : isCompleted
            ? "مكتمل"
            : "جاري التوصيل",
      statusBadge: isWaiting
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : isMatched
          ? "bg-blue-50 text-blue-700 border-blue-200"
          : "bg-emerald-50 text-emerald-700 border-emerald-200",
      dateLocation: locationText,
    };
  });

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-28 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Welcome Greeting Banner */}
        <HomeGreeting
          userName={profile?.fullName || "بك في بطريقك"}
          neighborhoodName={userCityNeighborhood}
        />

        {/* PWA Download Banner on Home (for mobile/desktop users) */}
        {!isInstalled && (
          <div
            onClick={handleInstallClick}
            className="flex items-center justify-between gap-3 rounded-3xl bg-linear-to-r from-[#123A68] to-[#1D4A7F] p-4 text-white shadow-md hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer text-right"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F36F21] text-white shadow-xs">
                <Download className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-black text-white">
                    تثبيت تطبيق بطريقك على هاتفك
                  </h3>
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                </div>
                <p className="text-[10.5px] text-white/80 leading-tight mt-0.5">
                  استمتع بتجربة تطبيق أسرع بدون شريط المتصفح
                </p>
              </div>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-xl bg-white/15 px-3 py-1.5 text-[11px] font-black text-white hover:bg-white/25 transition-all"
            >
              تثبيت
            </button>
          </div>
        )}

        {/* 2x2 Stats Summary Grid matching Figma */}
        <HomeStatsGrid
          tokenBalance={isLoadingWallet ? 0 : currentTokens}
          activeTripsCount={isLoadingTrips ? 0 : activeTripsCount}
          myErrandsCount={isLoadingErrands ? 0 : activeErrandsCount}
          newMessagesCount={0}
          onNavigateWallet={() => navigate("/wallet")}
          onNavigateTrips={() => navigate("/trips")}
          onNavigateErrands={() => navigate("/errands")}
          onNavigateMessages={() => navigate("/messages")}
        />

        {/* Section 1: الرحلات المتاحة بالقرب منك */}
        <HomeActiveTrips
          trips={nearbyTrips}
          isLoading={isLoadingTrips}
          onViewAll={() => navigate("/trips")}
          onSelectTrip={(id) => navigate(`/trips/${id}`)}
        />

        {/* Section 2: الطلبات القريبة */}
        <HomeNearbyErrands
          errands={nearbyErrands}
          isLoading={isLoadingErrands}
          onViewAll={() => navigate("/errands")}
          onSelectErrand={(id) => navigate(`/errands/${id}`)}
          onCreateErrand={() => navigate("/errands/new")}
        />
      </div>

      {/* Sticky Dual Action Buttons at Bottom */}
      <HomeFloatingActions
        onCreateErrand={() => navigate("/errands/new")}
        onCreateTrip={() => navigate("/trips/new")}
      />

      {/* PWA Install Guide Modal */}
      <PwaInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        isIOS={isIOS}
      />
    </MobileContainer>
  );
}

