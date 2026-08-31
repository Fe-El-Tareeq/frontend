import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Package,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useErrandDetail } from "../../hooks/useErrands";

interface IncomingOffer {
  id: string;
  travelerName: string;
  avatarInitials: string;
  avatarBg: string;
  tripsCount: number;
  rating: number;
  timeAgo: string;
  route: string;
  dateTime: string;
  quote: string;
  status: "NEW" | "ACCEPTED" | "REJECTED";
}

export default function IncomingOffersPage() {
  const { id = "errand-1" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { errand } = useErrandDetail(id);

  const [activeTab, setActiveTab] = useState<"ALL" | "NEW" | "ACCEPTED" | "REJECTED">("ALL");

  const [offers, setOffers] = useState<IncomingOffer[]>([
    {
      id: "offer-1",
      travelerName: "أحمد خالد",
      avatarInitials: "أخ",
      avatarBg: "bg-[#F36F21]",
      tripsCount: 45,
      rating: 4.9,
      timeAgo: "منذ 5 دقائق",
      route: "غزة - الرمال ➔ رفح",
      dateTime: "22 يوليو • 1:00 ص",
      quote:
        "يمكنني نقل غرضك بكل أمان، لدي خبرة طويلة في هذا المسار وأوصل في الوقت المحدد دائماً",
      status: "NEW",
    },
    {
      id: "offer-2",
      travelerName: "محمد يوسف",
      avatarInitials: "مي",
      avatarBg: "bg-emerald-600",
      tripsCount: 78,
      rating: 5.0,
      timeAgo: "منذ 12 دقيقة",
      route: "دير البلح ➔ رفح",
      dateTime: "22 يوليو • 11:00 ص",
      quote:
        "أنا مسافر لرفح هذا الصباح، يسعدني أخذ غرضك معي بكل سهولة.",
      status: "NEW",
    },
    {
      id: "offer-3",
      travelerName: "عمر نبيل",
      avatarInitials: "عن",
      avatarBg: "bg-[#F36F21]",
      tripsCount: 31,
      rating: 4.7,
      timeAgo: "منذ 25 دقيقة",
      route: "غزة - النصر ➔ رفح",
      dateTime: "22 يوليو • 2:00 م",
      quote: "رحلتي بعد الظهر إن كان الوقت مناسباً فأنا متاح.",
      status: "NEW",
    },
    {
      id: "offer-4",
      travelerName: "ليلى حسن",
      avatarInitials: "لح",
      avatarBg: "bg-purple-600",
      tripsCount: 19,
      rating: 4.6,
      timeAgo: "منذ 40 دقيقة",
      route: "غزة - التفاح ➔ خان يونس",
      dateTime: "22 يوليو • 9:00 ص",
      quote: "وجهتي خان يونس وليس رفح لكن يمكنني التنسيق معك.",
      status: "REJECTED",
    },
    {
      id: "offer-5",
      travelerName: "نور إبراهيم",
      avatarInitials: "نإ",
      avatarBg: "bg-teal-600",
      tripsCount: 56,
      rating: 4.8,
      timeAgo: "منذ ساعة",
      route: "رفح ➔ بيت حانون",
      dateTime: "22 يوليو • 3:30 م",
      quote: "رحلة مباشرة لرفح، سأكون حريصاً على سلامة غرضك تماماً.",
      status: "NEW",
    },
  ]);

  const handleAccept = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: "ACCEPTED" } : o))
    );
    navigate(`/errands/${id}/tracking`);
  };

  const handleReject = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: "REJECTED" } : o))
    );
  };

  const filteredOffers = offers.filter((o) => {
    if (activeTab === "NEW") return o.status === "NEW";
    if (activeTab === "ACCEPTED") return o.status === "ACCEPTED";
    if (activeTab === "REJECTED") return o.status === "REJECTED";
    return true;
  });

  const newCount = offers.filter((o) => o.status === "NEW").length;
  const acceptedCount = offers.filter((o) => o.status === "ACCEPTED").length;

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-black text-[#123A68]">العروض الواردة</h1>
          </div>

          <span className="flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-[#F36F21] border border-orange-200">
            <span>🔔</span>
            <span>{newCount} جديد</span>
          </span>
        </div>

        {/* Active Errand Summary Header Card */}
        <div className="rounded-3xl bg-white p-4 border border-border shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#123A68] text-white">
                <Package className="h-5 w-5" />
              </div>
              <div className="text-right">
                <h3 className="text-xs font-black text-[#123A68] line-clamp-1">
                  {errand?.title || "توصيل دواء من صيدلية في رفح إلى..."}
                </h3>
                <p className="text-[10.5px] text-text-muted">
                  22 يوليو • {errand?.neighborhood?.name || "الرمال"}
                </p>
              </div>
            </div>

            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10.5px] font-bold text-amber-700 border border-amber-200">
              قيد الانتظار
            </span>
          </div>

          {/* Mini Stats 3 columns */}
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="rounded-2xl bg-[#F8FAFC] p-2 border border-slate-100">
              <span className="text-base font-black text-emerald-600 block">
                {acceptedCount}
              </span>
              <span className="text-[10px] text-text-muted">مقبول</span>
            </div>

            <div className="rounded-2xl bg-orange-50/60 p-2 border border-orange-100">
              <span className="text-base font-black text-[#F36F21] block">
                {newCount}
              </span>
              <span className="text-[10px] text-[#F36F21] font-bold">بانتظارك</span>
            </div>

            <div className="rounded-2xl bg-[#F8FAFC] p-2 border border-slate-100">
              <span className="text-base font-black text-[#123A68] block">
                {offers.length}
              </span>
              <span className="text-[10px] text-text-muted">إجمالي العروض</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="grid grid-cols-4 gap-1.5 bg-white p-1.5 rounded-2xl border border-border shadow-xs text-xs font-bold text-center">
          <button
            type="button"
            onClick={() => setActiveTab("ALL")}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "ALL"
                ? "bg-[#123A68] text-white shadow-2xs"
                : "text-text-secondary hover:text-primary"
            }`}
          >
            الكل ({offers.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("NEW")}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "NEW"
                ? "bg-[#123A68] text-white shadow-2xs"
                : "text-text-secondary hover:text-primary"
            }`}
          >
            جديد ({newCount})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ACCEPTED")}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "ACCEPTED"
                ? "bg-[#123A68] text-white shadow-2xs"
                : "text-text-secondary hover:text-primary"
            }`}
          >
            مقبول
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("REJECTED")}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === "REJECTED"
                ? "bg-[#123A68] text-white shadow-2xs"
                : "text-text-secondary hover:text-primary"
            }`}
          >
            مرفوض
          </button>
        </div>

        {/* Offer Cards List */}
        <div className="space-y-3.5 pt-1">
          {filteredOffers.map((offer) => {
            const isRejected = offer.status === "REJECTED";

            return (
              <div
                key={offer.id}
                className={`rounded-3xl bg-white p-4.5 border transition-all ${
                  isRejected
                    ? "border-slate-200 opacity-60 bg-slate-50/70"
                    : "border-border shadow-xs hover:border-[#F36F21]/40"
                }`}
              >
                {isRejected && (
                  <div className="mb-2 text-[11px] font-bold text-red-500 bg-red-50 py-1 px-3 rounded-full inline-block border border-red-100">
                    تم رفض هذا العرض ✕
                  </div>
                )}

                {/* Traveler Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${offer.avatarBg} text-xs font-black text-white`}
                    >
                      {offer.avatarInitials}
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-black text-primary">
                          {offer.travelerName}
                        </h4>
                        <span className="flex items-center gap-0.5 text-[10.5px] font-bold text-amber-500">
                          ⭐ {offer.rating}
                        </span>
                      </div>
                      <p className="text-[10.5px] text-text-muted">
                        {offer.tripsCount} رحلة
                      </p>
                    </div>
                  </div>

                  <span className="text-[10.5px] text-text-muted">
                    {offer.timeAgo}
                  </span>
                </div>

                {/* Route & Date */}
                <div className="my-2.5 rounded-2xl bg-[#F8FAFC] p-3 border border-slate-100 text-xs text-right space-y-1">
                  <div className="font-bold text-[#123A68]">{offer.route}</div>
                  <div className="text-[10.5px] text-text-muted">
                    {offer.dateTime}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs text-text-secondary leading-relaxed text-right italic bg-amber-50/40 p-2.5 rounded-xl border border-amber-100/60">
                  "{offer.quote}"
                </p>

                {/* Actions */}
                {!isRejected && (
                  <div className="mt-3.5 flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleAccept(offer.id)}
                      className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 text-xs font-black text-white hover:bg-emerald-700 active:scale-98 transition-all cursor-pointer shadow-xs"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>قبول العرض</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleReject(offer.id)}
                      className="flex h-11 px-3.5 items-center justify-center gap-1 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:text-red-600 hover:border-red-200 active:scale-98 transition-all cursor-pointer"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span>رفض</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/chat/${offer.id}`)}
                      className="flex h-11 px-3.5 items-center justify-center gap-1 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-[#123A68] hover:border-[#123A68] active:scale-98 transition-all cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>مراسلة</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </MobileContainer>
  );
}
