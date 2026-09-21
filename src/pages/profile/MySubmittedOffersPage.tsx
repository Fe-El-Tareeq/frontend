import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Send,
  MessageSquare,
  Search,
  X,
  Sparkles,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useSentProposals, useProposalsMutations } from "../../hooks/useProposals";

interface SubmittedOfferItem {
  id: string;
  recipientName: string;
  avatarInitials: string;
  avatarBg: string;
  rating: number;
  timeAgo: string;
  errandTitle: string;
  origin: string;
  destination: string;
  date: string;
  quoteMessage: string;
  phone?: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

export default function MySubmittedOffersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"ALL" | "PENDING" | "ACCEPTED" | "REJECTED">("ALL");

  const { proposals: backendProposals, isLoading, isError, refetch } = useSentProposals();
  const { withdrawProposal, isWithdrawing } = useProposalsMutations();

  const formattedOffers: SubmittedOfferItem[] = backendProposals.map((p, idx) => {
    const recipientName = p.proposer?.fullName || "مستخدم بطريقك";
    const initials = recipientName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);

    const dateStr = p.createdAt
      ? new Date(p.createdAt).toLocaleDateString("ar-EG", {
          day: "numeric",
          month: "short",
        })
      : "اليوم";

    return {
      id: p.id,
      recipientName,
      avatarInitials: initials,
      avatarBg:
        idx % 3 === 0
          ? "bg-[#123A68]"
          : idx % 3 === 1
            ? "bg-purple-600"
            : "bg-[#F36F21]",
      rating: 5.0,
      timeAgo: dateStr,
      errandTitle: "طلب توصيل أغراض",
      origin: "غزة",
      destination: "الوجهة",
      date: dateStr,
      quoteMessage: p.notes || "عرض توصيل أغراض المسار",
      status: p.status === "ACCEPTED" ? "ACCEPTED" : p.status === "REJECTED" ? "REJECTED" : "PENDING",
    };
  });

  const totalCount = formattedOffers.length;
  const pendingCount = formattedOffers.filter((o) => o.status === "PENDING").length;
  const acceptedCount = formattedOffers.filter((o) => o.status === "ACCEPTED").length;
  const rejectedCount = formattedOffers.filter((o) => o.status === "REJECTED").length;
  const acceptanceRate = totalCount > 0 ? Math.round((acceptedCount / totalCount) * 100) : 0;

  const filteredOffers = formattedOffers.filter((o) => {
    if (activeTab === "ALL") return true;
    return o.status === activeTab;
  });

  const handleWithdraw = async (offerId: string) => {
    if (confirm("هل أنت متأكد من سحب هذا العرض؟")) {
      try {
        await withdrawProposal(offerId);
      } catch {
        // Fallback handled by query invalidation
      }
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/errands")}
            className="flex items-center gap-1 text-xs font-bold text-[#123A68] hover:text-accent transition-colors"
          >
            <Search className="h-4 w-4" />
            <span>تصفح الطلبات</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <h1 className="text-xl font-black text-[#123A68]">عروضي المقدّمة</h1>
              <p className="text-xs text-text-secondary mt-0.5">
                العروض التي قدّمتها على طلبات المستخدمين
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* 4 Stats Counters matching عروضي المقدمة-1.png */}
        <div className="grid grid-cols-4 gap-2">
          {/* Total */}
          <div className="rounded-2xl bg-white p-2.5 text-center border border-slate-200/90 shadow-2xs space-y-0.5">
            <div className="text-lg font-black text-[#123A68]">{totalCount}</div>
            <span className="text-[10px] font-bold text-text-muted block">
              إجمالي
            </span>
          </div>

          {/* Pending */}
          <div className="rounded-2xl bg-amber-50/80 p-2.5 text-center border border-amber-200/80 shadow-2xs space-y-0.5">
            <div className="text-lg font-black text-amber-700">{pendingCount}</div>
            <span className="text-[10px] font-bold text-amber-800 block">
              بانتظار
            </span>
          </div>

          {/* Accepted */}
          <div className="rounded-2xl bg-emerald-50/80 p-2.5 text-center border border-emerald-200/80 shadow-2xs space-y-0.5">
            <div className="text-lg font-black text-emerald-700">{acceptedCount}</div>
            <span className="text-[10px] font-bold text-emerald-800 block">
              مقبول
            </span>
          </div>

          {/* Rejected */}
          <div className="rounded-2xl bg-red-50/80 p-2.5 text-center border border-red-200/80 shadow-2xs space-y-0.5">
            <div className="text-lg font-black text-red-600">{rejectedCount}</div>
            <span className="text-[10px] font-bold text-red-800 block">
              مرفوض
            </span>
          </div>
        </div>

        {/* Acceptance Rate Card matching عروضي المقدمة-1.png */}
        <div className="rounded-3xl bg-white p-4 border border-slate-200/90 shadow-2xs flex items-center justify-between text-right">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#123A68]">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="flex-1 pr-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] text-text-muted">
                {acceptedCount} من {totalCount} عرض تم قبوله
              </span>
              <span className="font-black text-[#123A68]">
                معدل القبول {acceptanceRate}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-[#F36F21] rounded-full transition-all duration-500"
                style={{ width: `${acceptanceRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs matching عروضي المقدمة-1.png */}
        <div className="flex items-center gap-2 text-xs font-bold">
          {[
            { key: "ALL", label: `الكل (${totalCount})` },
            { key: "PENDING", label: `بالانتظار (${pendingCount})` },
            { key: "ACCEPTED", label: `مقبول (${acceptedCount})` },
            { key: "REJECTED", label: `مرفوض (${rejectedCount})` },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`rounded-2xl px-3.5 py-1.5 transition-all cursor-pointer ${
                activeTab === tab.key
                  ? "bg-[#123A68] text-white shadow-xs font-black"
                  : "bg-white border border-slate-200 text-text-secondary hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-3 pt-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 rounded-3xl bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <ErrorState
            title="تعذر تحميل العروض"
            message="حدث خطأ أثناء جلب قائمة عروضك من الخادم."
            onRetry={refetch}
          />
        )}

        {/* Offers List */}
        {!isLoading && !isError && filteredOffers.length === 0 ? (
          <EmptyState
            icon={<Send className="h-8 w-8 text-[#123A68]" />}
            title="لا توجد عروض في هذا التصنيف"
            description="لم تقم بتقديم عروض مطابقة لهذا الفلتر حالياً."
            actionText="تصفح طلبات الأغراض"
            onAction={() => navigate("/errands")}
          />
        ) : !isLoading && !isError ? (
          <div className="space-y-3.5">
            {filteredOffers.map((offer) => {
              const isPending = offer.status === "PENDING";
              const isAccepted = offer.status === "ACCEPTED";
              const isRejected = offer.status === "REJECTED";

              return (
                <div
                  key={offer.id}
                  className={`rounded-3xl border shadow-xs space-y-3 p-4.5 text-right transition-all ${
                    isAccepted
                      ? "bg-white border-emerald-300 ring-2 ring-emerald-100"
                      : isRejected
                        ? "bg-white border-red-200"
                        : "bg-white border-amber-200"
                  }`}
                >
                  {/* Status Banner Top */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] text-text-muted">
                      {offer.timeAgo}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {isPending && (
                        <span className="flex items-center gap-1 font-bold text-amber-700">
                          <span>بانتظار الرد</span>
                          <span className="h-2 w-2 rounded-full bg-amber-500" />
                        </span>
                      )}
                      {isAccepted && (
                        <span className="flex items-center gap-1 font-black text-emerald-700">
                          <span>تم قبولك! 🎉</span>
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                      )}
                      {isRejected && (
                        <span className="flex items-center gap-1 font-bold text-red-600">
                          <span>تم الرفض</span>
                          <span className="h-2 w-2 rounded-full bg-red-500" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Requester Row */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-xl px-2.5 py-0.5 text-[10.5px] font-black ${
                        isAccepted
                          ? "bg-emerald-100 text-emerald-800"
                          : isRejected
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {isAccepted
                        ? "تم القبول!"
                        : isRejected
                          ? "تم الرفض"
                          : "بانتظار الرد"}
                    </span>

                    <div className="flex items-center gap-2.5">
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="text-xs font-bold text-amber-500">
                            ⭐ {offer.rating}
                          </span>
                          <h4 className="text-xs font-black text-primary">
                            {offer.recipientName}
                          </h4>
                        </div>
                        <p className="text-[10.5px] text-text-muted">
                          {offer.errandTitle}
                        </p>
                      </div>

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-black text-white ${offer.avatarBg}`}
                      >
                        {offer.avatarInitials}
                      </div>
                    </div>
                  </div>

                  {/* Route Bar */}
                  <div className="rounded-xl bg-slate-50 p-2.5 text-xs text-text-muted flex items-center justify-between">
                    <span>📅 {offer.date}</span>
                    <div className="flex items-center gap-1.5 text-primary font-bold">
                      <span>{offer.origin}</span>
                      <span>➔</span>
                      <span className="text-[#F36F21]">{offer.destination}</span>
                    </div>
                  </div>

                  {/* Quote / Reason */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-text-muted block">
                      رسالتي للطالب
                    </span>
                    <p className="text-xs text-text-secondary bg-[#F8FAFC] p-3 rounded-2xl border border-slate-100 italic">
                      "{offer.quoteMessage}"
                    </p>
                  </div>

                  {/* Action depending on variant matching عروضي المقدمة-1.png */}
                  {isPending && (
                    <button
                      type="button"
                      disabled={isWithdrawing}
                      onClick={() => handleWithdraw(offer.id)}
                      className="w-full flex items-center justify-center gap-1.5 h-10 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-text-secondary hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span>{isWithdrawing ? "جاري سحب العرض..." : "سحب العرض"}</span>
                    </button>
                  )}

                  {isAccepted && (
                    <div className="rounded-2xl bg-emerald-50/80 p-3 border border-emerald-200 text-right flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => navigate(`/chat/${offer.id}`)}
                        className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-black text-white hover:bg-emerald-700 active:scale-98 transition-all cursor-pointer"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>راسله</span>
                      </button>

                      <div className="text-right">
                        <span className="text-xs font-black text-emerald-800 block">
                          يمكنك التواصل مع الطالب
                        </span>
                        <span className="text-[11px] text-emerald-700 font-mono">
                          {offer.phone || "059-xxx-xxxx"}
                        </span>
                      </div>
                    </div>
                  )}

                  {isRejected && (
                    <div className="space-y-2">
                      <div className="rounded-xl bg-slate-50 p-2.5 text-[11px] text-text-muted border border-slate-200/60">
                        اختار الطالب مسافراً آخر، يمكنك تصفح الطلبات المفتوحة وتقديم عروض جديدة.
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate("/errands")}
                        className="w-full flex items-center justify-center gap-1.5 h-10 rounded-2xl border border-[#123A68] bg-white text-xs font-black text-[#123A68] hover:bg-slate-50 active:scale-98 transition-all cursor-pointer"
                      >
                        <Search className="h-3.5 w-3.5" />
                        <span>تصفح الطلبات</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </MobileContainer>
  );
}
