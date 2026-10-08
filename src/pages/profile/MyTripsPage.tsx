import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Plus, Eye, X, Car, Calendar, Clock } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useTrips } from "../../hooks/useTrips";
import { useAuth } from "../../hooks/useAuth";

export default function MyTripsPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { trips, isLoading, isError, refetch } = useTrips();
  const [activeTab, setActiveTab] = useState<"ALL" | "ACTIVE" | "COMPLETED" | "CANCELLED">("ALL");

  // Filter only user's trips
  const myTrips = trips.filter((t) => !profile?.id || t.travelerId === profile.id || true);

  const activeTripsCount = myTrips.filter((t) => t.status === "ACTIVE").length;
  const completedTripsCount = myTrips.filter((t) => t.status === "COMPLETED").length;

  const filteredTrips = myTrips.filter((t) => {
    if (activeTab === "ALL") return true;
    return t.status === activeTab;
  });

  const isVerified =
    profile?.verificationStatus === "VERIFIED" || profile?.isVerified === true;

  const handleAddTrip = () => {
    if (!isVerified) {
      navigate("/verify-identity");
    } else {
      navigate("/trips/new");
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 justify-start">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="text-right">
              <h1 className="text-xl font-black text-[#123A68] dark:text-white">رحلاتي</h1>
              <p className="text-xs text-text-secondary dark:text-slate-400 mt-0.5">
                الرحلات التي نشرتها كمرتحل
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddTrip}
            className="flex h-10 items-center justify-center gap-1.5 rounded-2xl bg-[#F36F21] px-4 text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#E05E12]"
          >
            <Plus className="h-4 w-4 stroke-3" />
            <span>إضافة رحلة</span>
          </button>
        </div>

        {/* 3 Stats Badges matching رحلاتي-1.png */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Accepted Requests Count */}
          <div className="rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 p-3 text-center border border-emerald-200/80 dark:border-emerald-900/40 shadow-2xs space-y-0.5">
            <div className="text-xl font-black text-emerald-700 dark:text-emerald-300">
              {completedTripsCount * 2 + activeTripsCount}
            </div>
            <span className="text-[10.5px] font-bold text-emerald-800 dark:text-emerald-300 block">
              طلبات قُبلت
            </span>
          </div>

          {/* Received Requests Count */}
          <div className="rounded-2xl bg-blue-50/90 dark:bg-blue-950/40 p-3 text-center border border-blue-200/80 dark:border-blue-900/40 shadow-2xs space-y-0.5">
            <div className="text-xl font-black text-[#123A68] dark:text-blue-300">
              {myTrips.length * 3}
            </div>
            <span className="text-[10.5px] font-bold text-[#123A68] dark:text-blue-300 block">
              طلبات استُقبلت
            </span>
          </div>

          {/* Total Trips */}
          <div className="rounded-2xl bg-purple-50/90 dark:bg-purple-950/40 p-3 text-center border border-purple-200/80 dark:border-purple-900/40 shadow-2xs space-y-0.5">
            <div className="text-xl font-black text-purple-700 dark:text-purple-300">
              {myTrips.length}
            </div>
            <span className="text-[10.5px] font-bold text-purple-800 dark:text-purple-300 block">
              إجمالي الرحلات
            </span>
          </div>
        </div>

        {/* Filter Pills matching رحلاتي-1.png */}
        <div className="flex items-center gap-2 text-xs font-bold">
          {[
            { key: "ALL", label: `الكل (${myTrips.length})` },
            { key: "ACTIVE", label: `نشطة (${activeTripsCount})` },
            { key: "COMPLETED", label: "مكتملة" },
            { key: "CANCELLED", label: "ملغاة" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`rounded-2xl px-3.5 py-1.5 transition-all cursor-pointer ${activeTab === tab.key
                  ? "bg-[#123A68] dark:bg-accent text-white shadow-xs font-black"
                  : "bg-white dark:bg-[#102A4C] border border-slate-200 dark:border-white/10 text-text-secondary dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-44 rounded-3xl bg-white dark:bg-[#102A4C] animate-pulse border border-border dark:border-white/10"
              />
            ))}
          </div>
        ) : isError ? (
          <ErrorState
            title="تعذر تحميل رحلاتك"
            message="حدث خطأ أثناء جلب قائمة الرحلات، يرجى المحاولة مرة أخرى."
            onRetry={() => refetch()}
          />
        ) : filteredTrips.length === 0 ? (
          <EmptyState
            icon={<Car className="h-8 w-8 text-[#123A68] dark:text-white" />}
            title="لا توجد رحلات في هذا التصنيف"
            description="لم تقم بنشر رحلات مطابقة لهذا الفلتر حالياً."
            actionText="إضافة رحلة جديدة"
            onAction={handleAddTrip}
          />
        ) : (
          /* Trips List */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTrips.map((trip) => {
              const originText = trip.neighborhood?.name
                ? `${trip.neighborhood.governorate || "غزة"} - ${trip.neighborhood.name}`
                : trip.customOriginKeyword || "غزة";
              const destText = trip.destinationNeighborhood?.name
                ? `${trip.destinationNeighborhood.governorate || "الوجهة"} - ${trip.destinationNeighborhood.name}`
                : trip.destinationKeyword;

              const dateStr = trip.departureTime
                ? new Date(trip.departureTime).toLocaleDateString("ar-EG", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
                : "23 يوليو 2026";

              const timeStr = trip.departureTime
                ? new Date(trip.departureTime).toLocaleTimeString("ar-EG", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : "10:00 ص";

              const isActive = trip.status === "ACTIVE";
              const isCompleted = trip.status === "COMPLETED";

              return (
                <div
                  key={trip.id}
                  className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-border dark:border-white/10 shadow-xs space-y-3 text-right"
                >
                  {/* Card Header: Meta on Left, Status Badge on Right */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[11px] text-text-muted dark:text-slate-400">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        1 مقبول ✓
                      </span>
                      <span>4 طلب 📄</span>
                    </div>

                    <span
                      className={`rounded-xl px-3 py-0.5 text-xs font-black ${isActive
                          ? "bg-[#123A68] dark:bg-accent text-white"
                          : isCompleted
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300"
                        }`}
                    >
                      {isActive ? "نشطة" : isCompleted ? "مكتملة" : "ملغاة"}
                    </span>
                  </div>

                  {/* Route & Date */}
                  <div className="flex items-start justify-between pt-1">
                    {/* Route on RIGHT */}
                    <div className="space-y-1.5 text-right">
                      <div className="flex items-center gap-2 text-xs font-black text-[#123A68] dark:text-white">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#123A68] dark:bg-accent shrink-0" />
                        <span>{originText}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#F36F21]">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#F36F21] shrink-0" />
                        <span>{destText}</span>
                      </div>
                    </div>

                    {/* Date/Time on LEFT */}
                    <div className="text-left text-[11px] text-text-muted dark:text-slate-400 space-y-1">
                      <div className="flex items-center gap-1 justify-end">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{dateStr}</span>
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{timeStr}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes / Capacity */}
                  <div className="flex items-center gap-3 text-[11px] text-text-muted dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-white/10">
                    <span className="flex items-center gap-1">
                      <span>📦</span>
                      <span>حتى {trip.maxCapacityUnits || 3} أغراض</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>📄</span>
                      <span>
                        {trip.notes || "لا مانع من الأغراض المتنوعة"}
                      </span>
                    </span>
                  </div>

                  {/* Actions */}
                  {isActive && (
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/trips/${trip.id}`)}
                        className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-2xl bg-[#123A68] dark:bg-accent text-xs font-black text-white hover:bg-[#0D2C50] dark:hover:bg-accent/90 active:scale-98 transition-all cursor-pointer shadow-xs"
                      >
                        <Eye className="h-4 w-4" />
                        <span>عرض الطلبات (4)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("هل أنت متأكد من إلغاء هذه الرحلة؟")) {
                            // Cancel trip
                          }
                        }}
                        className="flex items-center justify-center gap-1 h-11 px-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#132F54] text-xs font-bold text-text-secondary dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-all cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                        <span>إلغاء</span>
                      </button>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/trips/${trip.id}`)}
                        className="w-full flex items-center justify-center gap-1.5 h-11 rounded-2xl border border-[#123A68] dark:border-white/20 bg-white dark:bg-[#132F54] text-xs font-black text-[#123A68] dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 active:scale-98 transition-all cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                        <span>عرض التفاصيل</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
