import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight, ThumbsUp, ThumbsDown, Package } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
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
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { errand } = useErrandDetail(id);

  const [activeTab, setActiveTab] = useState<
    "ALL" | "NEW" | "ACCEPTED" | "REJECTED"
  >("ALL");

  /*
   * ============================================================================
   * BACKEND INTEGRATION: Matching Travelers & Errand Offers
   * Endpoint: GET /api/v1/matching/errands/:id?limit=10
   * Acceptance Endpoint: POST /api/v1/assignments (Body: { errandId, tripId })
   * When empty or pending, renders EmptyState from design system without mock data.
   * ============================================================================
   */
  const [offers, setOffers] = useState<IncomingOffer[]>([]);

  const filteredOffers = offers.filter((o) => {
    if (activeTab === "ALL") return true;
    return o.status === activeTab;
  });

  const handleAcceptOffer = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: "ACCEPTED" } : o)),
    );
    navigate(`/errands/${id}/tracking`);
  };

  const handleRejectOffer = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: "REJECTED" } : o)),
    );
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#123A68]">
              العروض الواردة
            </h1>
            <p className="text-xs text-text-secondary">
              عروض التوصيل المقدمة لطلبك من المسافرين
            </p>
          </div>
        </div>

        {/* Top Summary Banner */}
        <div className="rounded-3xl bg-[#123A68] p-4 text-white shadow-md text-right space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] text-white/80">
              {errand?.title || "طلب توصيل"}
            </span>
            <span className="rounded-full bg-blue-500/30 px-2.5 py-0.5 text-[10px] font-black text-blue-200">
              إجمالي العروض
            </span>
          </div>
          <div className="text-2xl font-black text-white">
            {offers.length}{" "}
            <span className="text-xs font-normal">عرض متاح</span>
          </div>
        </div>

        {/* Tab Badges */}
        <div className="flex items-center gap-2 text-xs font-bold">
          {[
            { key: "ALL", label: "الكل" },
            { key: "NEW", label: "جديدة" },
            { key: "ACCEPTED", label: "مقبولة" },
            { key: "REJECTED", label: "مرفوضة" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`rounded-xl px-3.5 py-1.5 transition-all cursor-pointer ${
                activeTab === tab.key
                  ? "bg-[#123A68] text-white shadow-xs"
                  : "bg-white border border-slate-200 text-text-secondary hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Offers List or Empty State */}
        {filteredOffers.length === 0 ? (
          <EmptyState
            icon={<Package className="h-8 w-8 text-[#123A68]" />}
            title="لا توجد عروض واردة حالياً"
            description="سيقوم المسافرون المتجهون لنفس مسار طلبك بتقديم عروض توصيل قريباً فور مراجعة الطلب."
            actionText="العودة للطلبات"
            onAction={() => navigate("/errands")}
          />
        ) : (
          <div className="space-y-3">
            {filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="rounded-3xl bg-white p-4.5 border border-border shadow-xs space-y-3 text-right"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${offer.avatarBg} text-xs font-black text-white`}
                    >
                      {offer.avatarInitials}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-primary">
                        {offer.travelerName}
                      </h3>
                      <p className="text-[10.5px] text-text-muted">
                        ⭐ {offer.rating} • {offer.tripsCount} رحلة سابقة
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-text-muted">
                    {offer.timeAgo}
                  </span>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed bg-slate-50 p-3 rounded-2xl">
                  "{offer.quote}"
                </p>

                <div className="flex items-center justify-between text-[11px] text-text-muted pt-1 border-t border-slate-100">
                  <span>{offer.route}</span>
                  <span className="font-bold text-[#123A68]">
                    {offer.dateTime}
                  </span>
                </div>

                {offer.status === "NEW" && (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleAcceptOffer(offer.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl bg-emerald-600 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 active:scale-98 transition-all cursor-pointer"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>قبول العرض</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRejectOffer(offer.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-98 transition-all cursor-pointer"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span>رفض</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
