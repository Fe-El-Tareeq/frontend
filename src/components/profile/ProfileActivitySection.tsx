import type { FC } from "react";
import { ChevronLeft, Car, Package, Plus } from "lucide-react";
import { EmptyState } from "../ui/feedback/EmptyState";
import type { Trip } from "../../types/trips";
import type { Errand } from "../../types/errands";

interface ProfileActivitySectionProps {
  activeTab: "trips" | "errands";
  onTabChange: (tab: "trips" | "errands") => void;
  trips: Trip[];
  errands: Errand[];
  onViewAll: () => void;
  onTripClick: (tripId: string) => void;
  onErrandClick: (errandId: string) => void;
  onAddTrip: () => void;
  onAddErrand: () => void;
}

export const ProfileActivitySection: FC<ProfileActivitySectionProps> = ({
  activeTab,
  onTabChange,
  trips,
  errands,
  onViewAll,
  onTripClick,
  onErrandClick,
  onAddTrip,
  onAddErrand,
}) => {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-3.5 text-right">
      <div className="flex items-center justify-between">
        {/* Segmented Tab Pill */}
        <div className="flex rounded-2xl bg-[#F1F5F9] dark:bg-[#0B1E36] p-1 border border-slate-200/60 dark:border-white/10">
          <button
            type="button"
            onClick={() => onTabChange("errands")}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${activeTab === "errands"
                ? "bg-white dark:bg-[#102A4C] text-[#123A68] dark:text-white shadow-xs"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
              }`}
          >
            طلباتي
          </button>
          <button
            type="button"
            onClick={() => onTabChange("trips")}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${activeTab === "trips"
                ? "bg-white dark:bg-[#102A4C] text-[#123A68] dark:text-white shadow-xs"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
              }`}
          >
            رحلاتي
          </button>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center gap-1 text-xs font-bold text-[#123A68] dark:text-slate-300 hover:text-[#F36F21] dark:hover:text-[#F36F21] transition-colors cursor-pointer"
        >
          <span>عرض الكل</span>
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Tab 1: Trips List */}
      {activeTab === "trips" && (
        <div className="space-y-2.5">
          {trips.length > 0 ? (
            trips.map((trip, idx) => {
              const origin = trip.neighborhood?.name
                ? `${trip.neighborhood.governorate || "غزة"} - ${trip.neighborhood.name}`
                : trip.customOriginKeyword || "غزة - الرمال";
              const dest = trip.destinationNeighborhood?.name
                ? `${trip.destinationNeighborhood.governorate || "الوجهة"} - ${trip.destinationNeighborhood.name}`
                : trip.destinationKeyword || "رفح";

              const isFirst = idx === 0;

              return (
                <div
                  key={trip.id}
                  onClick={() => onTripClick(trip.id)}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] hover:border-[#123A68]/40 dark:hover:border-white/20 transition-all cursor-pointer text-right"
                >
                  <div className="flex items-center gap-2">
                    <ChevronLeft className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-text-muted dark:text-slate-400">
                        4 طلب
                      </span>
                      <span
                        className={`text-[10.5px] font-bold ${isFirst ? "text-blue-600 dark:text-blue-400" : "text-emerald-600 dark:text-emerald-400"
                          }`}
                      >
                        {isFirst ? "نشطة" : "مكتملة"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-xs font-black text-[#123A68] dark:text-white block">
                        {origin} ← {dest}
                      </span>
                      <span className="text-[10.5px] text-text-muted dark:text-slate-400 mt-0.5 block">
                        23 يوليو 2026 10:00 ص
                      </span>
                    </div>
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-2xs shrink-0 ${isFirst ? "bg-[#123A68]" : "bg-[#059669]"
                        }`}
                    >
                      <Car className="h-4.5 w-4.5" />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState
              icon={<Car className="h-6 w-6 text-text-muted dark:text-slate-400" />}
              title="لا توجد رحلات مسجلة"
              description="لم تقم بنشر أي رحلة بعد. أضف أول رحلة لك الآن."
              actionText="أضف رحلة"
              onAction={onAddTrip}
            />
          )}

          {/* Dashed Add Trip Button */}
          <button
            type="button"
            onClick={onAddTrip}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#123A68]/30 dark:border-white/20 bg-blue-50/20 dark:bg-blue-950/20 text-xs font-black text-[#123A68] dark:text-blue-300 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 hover:border-[#123A68]/50 transition-all cursor-pointer"
          >
            <span>أضف رحلة جديدة</span>
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Tab 2: Errands List */}
      {activeTab === "errands" && (
        <div className="space-y-2.5">
          {errands.length > 0 ? (
            errands.map((errand) => {
              const pickup = errand.neighborhood?.name
                ? `${errand.neighborhood.governorate || "غزة"} - ${errand.neighborhood.name}`
                : "غزة - الرمال";
              const dropoff = errand.destinationKeyword || "خان يونس";

              return (
                <div
                  key={errand.id}
                  onClick={() => onErrandClick(errand.id)}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] hover:border-[#F36F21]/40 dark:hover:border-white/20 transition-all cursor-pointer text-right"
                >
                  <div className="flex items-center gap-2">
                    <ChevronLeft className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-text-muted dark:text-slate-400">
                        1 توكن
                      </span>
                      <span className="text-[10.5px] font-bold text-[#F36F21]">
                        {errand.status === "MATCHED"
                          ? "جارٍ التنفيذ"
                          : errand.status === "COMPLETED"
                            ? "مكتمل"
                            : "بانتظار سائق"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-xs font-black text-[#123A68] dark:text-white block">
                        {pickup} ← {dropoff}
                      </span>
                      <span className="text-[10.5px] text-text-muted dark:text-slate-400 mt-0.5 block truncate max-w-37.5">
                        {errand.title || errand.itemsDescription || "طلب توصيل غرض"}
                      </span>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-2xs shrink-0">
                      <Package className="h-4.5 w-4.5" />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState
              icon={<Package className="h-6 w-6 text-text-muted dark:text-slate-400" />}
              title="لا توجد طلبات توصيل"
              description="لم تنشئ أي طلب توصيل بعد."
              actionText="أنشئ طلب"
              onAction={onAddErrand}
            />
          )}

          {/* Dashed Add Errand Button */}
          <button
            type="button"
            onClick={onAddErrand}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#F36F21]/30 dark:border-white/20 bg-orange-50/20 dark:bg-orange-950/20 text-xs font-black text-[#F36F21] dark:text-orange-400 hover:bg-orange-50/60 dark:hover:bg-orange-950/40 hover:border-[#F36F21]/50 transition-all cursor-pointer"
          >
            <span>أضف طلباً جديداً</span>
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
