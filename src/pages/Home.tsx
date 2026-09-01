import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Car,
  Zap,
  Package,
  MessageSquare,
  ArrowLeft,
  Download,
  Sparkles,
} from "lucide-react";
import { Header } from "../components/layout/Header";
import { MobileContainer } from "../components/layout/MobileContainer";
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
  const nearbyTrips = trips.slice(0, 3).map((t, idx) => {
    const travelerName = t.traveler?.fullName || "مسافر نشط";
    const initials = travelerName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
    const originLabel = t.neighborhood?.name
      ? `${t.neighborhood.governorate || "غزة"} - ${t.neighborhood.name}`
      : (t.customOriginKeyword || "غزة");
    const destLabel = t.destinationNeighborhood?.name
      ? `${t.destinationNeighborhood.governorate || "الوجهة"} - ${t.destinationNeighborhood.name}`
      : t.destinationKeyword;

    return {
      id: t.id,
      travelerName,
      avatarInitials: initials,
      avatarBg: idx % 3 === 0 ? "bg-[#F36F21]" : idx % 3 === 1 ? "bg-red-600" : "bg-teal-600",
      rating: t.traveler?.trustScore ? Number((t.traveler.trustScore / 20).toFixed(1)) : 5.0,
      time: new Date(t.departureTime).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
      from: originLabel,
      to: destLabel,
    };
  });

  // Slice first 3 dynamic errands
  const nearbyErrands = errands.slice(0, 3).map((e, idx) => {
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
      avatarBg: idx % 3 === 0 ? "bg-purple-600" : idx % 3 === 1 ? "bg-blue-600" : "bg-[#F36F21]",
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
        <div className="text-right space-y-0.5">
          <h1 className="text-xl font-black text-[#123A68] flex items-center gap-1.5">
            <span>مرحباً بك في بطريقك</span>
            <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs text-text-secondary">
            إليك ملخص نشاطك اليوم في {userCityNeighborhood}
          </p>
        </div>

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

        {/* 2x2 Stats Summary Grid matching Batch 4 image 3 */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Token Balance (Orange) */}
          <div
            onClick={() => navigate("/wallet")}
            className="flex items-center justify-between rounded-3xl bg-white p-4 border border-border shadow-2xs hover:border-[#F36F21]/40 transition-all cursor-pointer text-right"
          >
            <div>
              <span className="text-[11px] text-text-muted block">
                رصيد التوكنز
              </span>
              <div className="text-2xl font-black text-[#F36F21]">
                {isLoadingWallet ? "..." : currentTokens}
              </div>
              <span className="text-[10px] text-text-muted">توكن متاح</span>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-[#F36F21]">
              <Zap className="h-5 w-5 fill-[#F36F21]" />
            </div>
          </div>

          {/* Card 2: Active Trips (Navy) */}
          <div
            onClick={() => navigate("/trips")}
            className="flex items-center justify-between rounded-3xl bg-white p-4 border border-border shadow-2xs hover:border-[#123A68]/40 transition-all cursor-pointer text-right"
          >
            <div>
              <span className="text-[11px] text-text-muted block">
                الرحلات النشطة
              </span>
              <div className="text-2xl font-black text-[#123A68]">
                {isLoadingTrips ? "..." : activeTripsCount}
              </div>
              <span className="text-[10px] text-text-muted">رحلة معلنة</span>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#123A68]">
              <Car className="h-5 w-5" />
            </div>
          </div>

          {/* Card 3: Current Errands (Teal) */}
          <div
            onClick={() => navigate("/errands")}
            className="flex items-center justify-between rounded-3xl bg-white p-4 border border-border shadow-2xs hover:border-teal-500/40 transition-all cursor-pointer text-right"
          >
            <div>
              <span className="text-[11px] text-text-muted block">
                طلباتي الحالية
              </span>
              <div className="text-2xl font-black text-teal-700">
                {isLoadingErrands ? "..." : activeErrandsCount}
              </div>
              <span className="text-[10px] text-text-muted">طلب مسجل</span>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
              <Package className="h-5 w-5" />
            </div>
          </div>

          {/* Card 4: New Messages (Purple) */}
          <div
            onClick={() => navigate("/messages")}
            className="flex items-center justify-between rounded-3xl bg-white p-4 border border-border shadow-2xs hover:border-purple-500/40 transition-all cursor-pointer text-right"
          >
            <div>
              <span className="text-[11px] text-text-muted block">
                الرسائل والمحادثات
              </span>
              <div className="text-2xl font-black text-purple-700">
                0
              </div>
              <span className="text-[10px] text-text-muted">محادثة نشطة</span>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-700">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Section 1: الرحلات المتاحة بالقرب منك */}
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-[#123A68]">
              الرحلات المتاحة بالقرب منك
            </h2>
            <button
              type="button"
              onClick={() => navigate("/trips")}
              className="flex items-center gap-1 text-xs font-black text-[#123A68] hover:text-[#F36F21] transition-colors cursor-pointer"
            >
              <span>عرض الكل</span>
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
          </div>

          {isLoadingTrips ? (
            <div className="space-y-2.5">
              {[1, 2].map((i) => (
                <div key={i} className="h-16 rounded-3xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : nearbyTrips.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 text-center border border-slate-100 shadow-2xs space-y-2">
              <Car className="h-7 w-7 text-slate-400 mx-auto" />
              <p className="text-xs font-bold text-text-secondary">لا توجد رحلات متاحة في منطقتك حالياً</p>
              <button
                type="button"
                onClick={() => navigate("/trips/new")}
                className="inline-flex items-center gap-1 text-xs font-black text-[#F36F21] hover:underline"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>أضف رحلتك الأولى الآن</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {nearbyTrips.map((t) => (
                <div
                  key={t.id}
                  onClick={() => navigate(`/trips/${t.id}`)}
                  className="flex items-center justify-between rounded-3xl bg-white p-3.5 border border-border shadow-2xs hover:border-slate-300 transition-all cursor-pointer text-right"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${t.avatarBg} text-xs font-black text-white`}
                    >
                      {t.avatarInitials}
                    </div>
                    <div className="text-right">
                      <h3 className="text-xs font-black text-primary">
                        {t.travelerName}
                      </h3>
                      <p className="text-[11px] text-text-muted">
                        {t.from} ➔ {t.to}
                      </p>
                    </div>
                  </div>

                  <div className="text-left space-y-0.5">
                    <span className="text-[11px] font-bold text-amber-500 block">
                      ⭐ {t.rating}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      {t.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: الطلبات القريبة */}
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-[#123A68]">
              الطلبات القريبة
            </h2>
            <button
              type="button"
              onClick={() => navigate("/errands")}
              className="flex items-center gap-1 text-xs font-black text-[#123A68] hover:text-[#F36F21] transition-colors cursor-pointer"
            >
              <span>عرض الكل</span>
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
          </div>

          {isLoadingErrands ? (
            <div className="space-y-2.5">
              {[1, 2].map((i) => (
                <div key={i} className="h-16 rounded-3xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : nearbyErrands.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 text-center border border-slate-100 shadow-2xs space-y-2">
              <Package className="h-7 w-7 text-slate-400 mx-auto" />
              <p className="text-xs font-bold text-text-secondary">لا توجد طلبات توصيل مسجلة حالياً</p>
              <button
                type="button"
                onClick={() => navigate("/errands/new")}
                className="inline-flex items-center gap-1 text-xs font-black text-[#F36F21] hover:underline"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>أنشئ طلب توصيل جديد</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {nearbyErrands.map((e) => (
                <div
                  key={e.id}
                  onClick={() => navigate(`/errands/${e.id}`)}
                  className="flex items-center justify-between rounded-3xl bg-white p-3.5 border border-border shadow-2xs hover:border-slate-300 transition-all cursor-pointer text-right"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${e.avatarBg} text-xs font-black text-white`}
                    >
                      {e.avatarInitials}
                    </div>
                    <div className="text-right">
                      <h3 className="text-xs font-black text-primary line-clamp-1 max-w-50">
                        {e.title}
                      </h3>
                      <p className="text-[11px] text-text-muted">
                        {e.dateLocation}
                      </p>
                    </div>
                  </div>

                  <div className="text-left">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold border ${e.statusBadge}`}
                    >
                      {e.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Dual Action Buttons at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-107.5 bg-white/95 backdrop-blur-md border-t border-border p-3.5 shadow-lg">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigate("/errands/new")}
            className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md hover:bg-[#E05E12] active:scale-98 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>إنشاء طلب جديد</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/trips/new")}
            className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-[#123A68] text-xs font-black text-white shadow-md hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer"
          >
            <Car className="h-4 w-4" />
            <span>إضافة رحلة</span>
          </button>
        </div>
      </div>

      {/* PWA Install Guide Modal */}
      <PwaInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        isIOS={isIOS}
      />
    </MobileContainer>
  );
}