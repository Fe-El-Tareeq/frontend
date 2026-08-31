import { useNavigate } from "react-router-dom";
import {
  Plus,
  Car,
  Zap,
  Package,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import { Header } from "../components/layout/Header";
import { MobileContainer } from "../components/layout/MobileContainer";
import { useAuth } from "../hooks/useAuth";
import { useWallet } from "../hooks/useWallet";
import { useErrands } from "../hooks/useErrands";
import { useTrips } from "../hooks/useTrips";

export default function Home() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { tokenBalance } = useWallet();
  const { errands } = useErrands();
  const { trips } = useTrips();

  const userCityNeighborhood = profile?.neighborhood?.name
    ? `غزة - ${profile.neighborhood.name}`
    : "غزة - الرمال";

  const currentTokens = tokenBalance ?? 47;
  const activeTripsCount = trips.length > 0 ? trips.length : 3;
  const activeErrandsCount = errands.length > 0 ? errands.length : 2;

  // Nearby Trips (Preview 3 items matching Figma)
  const nearbyTrips = [
    {
      id: "trip-1",
      travelerName: "أحمد خالد",
      avatarInitials: "أخ",
      avatarBg: "bg-[#F36F21]",
      rating: 4.9,
      time: "1:00 ص",
      from: "غزة - الرمال",
      to: "رفح",
    },
    {
      id: "trip-2",
      travelerName: "سارة عمر",
      avatarInitials: "سع",
      avatarBg: "bg-red-600",
      rating: 4.7,
      time: "2:00 م",
      from: "غزة - الشجاعية",
      to: "خان يونس",
    },
    {
      id: "trip-3",
      travelerName: "محمد يوسف",
      avatarInitials: "مي",
      avatarBg: "bg-teal-600",
      rating: 5.0,
      time: "9:00 ص",
      from: "دير البلح",
      to: "بيت لاهيا",
    },
  ];

  // Nearby Errands (Preview 3 items matching Figma)
  const nearbyErrands = [
    {
      id: "errand-1",
      title: "توصيل دواء من صيدلية في رفح إلى...",
      avatarInitials: "فع",
      avatarBg: "bg-purple-600",
      status: "قيد الانتظار",
      statusBadge: "bg-amber-50 text-amber-700 border-amber-200",
      dateLocation: "الرمال - 23 يوليو",
    },
    {
      id: "errand-2",
      title: "توصيل وثائق رسمية من ديوان المو...",
      avatarInitials: "خع",
      avatarBg: "bg-purple-600",
      status: "تم التطابق",
      statusBadge: "bg-blue-50 text-blue-700 border-blue-200",
      dateLocation: "الشجاعية - 22 يوليو",
    },
    {
      id: "errand-3",
      title: "شراء مستلزمات مدرسية من محلات خ...",
      avatarInitials: "رس",
      avatarBg: "bg-[#F36F21]",
      status: "مكتمل",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dateLocation: "بيت لاهيا - 21 يوليو",
    },
  ];

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
                {currentTokens}
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
                {activeTripsCount}
              </div>
              <span className="text-[10px] text-text-muted">رحلة هذا الأسبوع</span>
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
                {activeErrandsCount}
              </div>
              <span className="text-[10px] text-text-muted">طلب قيد التنفيذ</span>
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
                الرسائل الجديدة
              </span>
              <div className="text-2xl font-black text-purple-700">
                0
              </div>
              <span className="text-[10px] text-text-muted">رسالة غير مقروءة</span>
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

          <div className="space-y-2.5">
            {nearbyErrands.map((e) => (
              <div
                key={e.id}
                onClick={() => navigate(`/errands/${e.id}`)}
                className="flex items-center justify-between rounded-3xl bg-white p-3.5 border border-border shadow-2xs hover:border-slate-300 transition-all cursor-pointer text-right"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${e.avatarBg} text-xs font-black text-white`}
                  >
                    {e.avatarInitials}
                  </div>
                  <div className="text-right flex-1 min-w-0">
                    <h3 className="text-xs font-black text-primary truncate">
                      {e.title}
                    </h3>
                    <p className="text-[10px] text-text-muted">
                      {e.dateLocation}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${e.statusBadge}`}
                >
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Dual Action Buttons at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-[430px] bg-white/95 backdrop-blur-md border-t border-border p-3.5 shadow-lg">
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
    </MobileContainer>
  );
}