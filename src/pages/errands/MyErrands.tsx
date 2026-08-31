import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Package,
  Search,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useErrands } from "../../hooks/useErrands";

export default function MyErrands() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [regionFilter, setRegionFilter] = useState("ALL");

  const { errands: backendErrands, isLoading, isError, refetch } = useErrands();

  // Fallback demo data matching Figma Batch 3 image 3
  const staticFallbackErrands = [
    {
      id: "errand-1",
      requesterName: "فاطمة علي",
      avatarInitials: "فع",
      avatarBg: "bg-purple-600",
      status: "PENDING",
      statusLabel: "قيد الانتظار",
      statusBadge: "bg-amber-50 text-amber-700 border-amber-200",
      date: "23 يوليو",
      description: "توصيل دواء من صيدلية في رفح إلى منزلي في غزة - الرمال",
      location: "الرمال",
    },
    {
      id: "errand-2",
      requesterName: "خالد عبدالله",
      avatarInitials: "خع",
      avatarBg: "bg-purple-600",
      status: "MATCHED",
      statusLabel: "تم التطابق",
      statusBadge: "bg-blue-50 text-blue-700 border-blue-200",
      date: "22 يوليو",
      description: "توصيل وثائق رسمية من ديوان الموظفين في خان يونس",
      location: "الشجاعية",
    },
    {
      id: "errand-3",
      requesterName: "رنا سعيد",
      avatarInitials: "رس",
      avatarBg: "bg-[#F36F21]",
      status: "COMPLETED",
      statusLabel: "مكتمل",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      date: "21 يوليو",
      description: "شراء مستلزمات مدرسية من محلات خان يونس",
      location: "بيت لاهيا",
    },
    {
      id: "errand-4",
      requesterName: "ياسر حمدان",
      avatarInitials: "يح",
      avatarBg: "bg-red-600",
      status: "PENDING",
      statusLabel: "قيد الانتظار",
      statusBadge: "bg-amber-50 text-amber-700 border-amber-200",
      date: "20 يوليو",
      description: "توصيل طرود صغيرة من مكتب البريد المركزي",
      location: "رفح",
    },
    {
      id: "errand-5",
      requesterName: "منى فارس",
      avatarInitials: "مف",
      avatarBg: "bg-[#123A68]",
      status: "CANCELLED",
      statusLabel: "ملغي",
      statusBadge: "bg-red-50 text-red-700 border-red-200",
      date: "19 يوليو",
      description: "شراء ملابس أطفال من سوق الشجاعية",
      location: "الرمال",
    },
  ];

  const displayErrands =
    backendErrands && backendErrands.length > 0
      ? backendErrands.map((e) => ({
          id: e.id,
          requesterName: e.requester?.fullName || "مستخدم مسجل",
          avatarInitials: e.requester?.fullName
            ? e.requester.fullName.slice(0, 2)
            : "مس",
          avatarBg: "bg-[#123A68]",
          status: e.status,
          statusLabel:
            e.status === "OPEN"
              ? "قيد الانتظار"
              : e.status === "MATCHED"
              ? "تم التطابق"
              : e.status === "COMPLETED"
              ? "مكتمل"
              : "ملغي",
          statusBadge:
            e.status === "OPEN"
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : e.status === "MATCHED"
              ? "bg-blue-50 text-blue-700 border-blue-200"
              : e.status === "COMPLETED"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-red-50 text-red-700 border-red-200",
          date: new Date(e.createdAt).toLocaleDateString("ar-EG", {
            day: "numeric",
            month: "short",
          }),
          description: e.itemsDescription || e.title,
          location: e.neighborhood?.name || e.destinationKeyword || "غزة",
        }))
      : staticFallbackErrands;

  const filteredErrands = displayErrands.filter((e) => {
    if (searchQuery && !e.description.includes(searchQuery) && !e.requesterName.includes(searchQuery)) {
      return false;
    }
    if (statusFilter !== "ALL" && e.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title Header with "+ إنشاء طلب جديد" and "العروض الواردة" */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68]">طلبات الأغراض</h1>
            <span className="text-xs text-text-muted">
              {filteredErrands.length} طلب
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/errands/incoming-offers")}
              className="flex h-10 items-center justify-center rounded-2xl bg-[#123A68] px-3.5 text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-xs"
            >
              <span>العروض الواردة</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/errands/new")}
              className="flex h-10 items-center justify-center gap-1 rounded-2xl bg-[#F36F21] px-3.5 text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all cursor-pointer shadow-md"
            >
              <Plus className="h-4 w-4" />
              <span>إنشاء طلب جديد</span>
            </button>
          </div>
        </div>

        {/* Filter Card */}
        <div className="rounded-3xl bg-white p-4 border border-border shadow-xs space-y-2.5 text-right">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الطلبات..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] pr-10 pl-4 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none text-right"
            />
            <Search className="absolute right-3.5 top-3.5 h-4 w-4 text-text-muted pointer-events-none" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3 text-xs text-primary focus:border-accent focus:outline-none"
            >
              <option value="ALL">كل الحالات ⌵</option>
              <option value="PENDING">قيد الانتظار</option>
              <option value="MATCHED">تم التطابق</option>
              <option value="COMPLETED">مكتمل</option>
              <option value="CANCELLED">ملغي</option>
            </select>

            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-3 text-xs text-primary focus:border-accent focus:outline-none"
            >
              <option value="ALL">كل المناطق ⌵</option>
              <option value="غزة">غزة</option>
              <option value="الرمال">الرمال</option>
              <option value="الشجاعية">الشجاعية</option>
              <option value="رفح">رفح</option>
              <option value="خان يونس">خان يونس</option>
            </select>
          </div>
        </div>

        {/* Errands List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-36 w-full animate-pulse rounded-3xl bg-white border border-border"
              />
            ))}
          </div>
        ) : isError ? (
          <ErrorState
            title="تعذر تحميل الطلبات"
            message="حدث خطأ أثناء جلب قائمة الطلبات."
            onRetry={() => refetch()}
          />
        ) : filteredErrands.length === 0 ? (
          <EmptyState
            icon={<Package className="h-7 w-7 text-[#123A68]" />}
            title="لا توجد طلبات مطابقة"
            description="لم نتمكن من العثور على أي طلبات تطابق الفلتر الحالي."
            actionText="إنشاء طلب جديد"
            onAction={() => navigate("/errands/new")}
          />
        ) : (
          <div className="space-y-3 pt-1">
            {filteredErrands.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl bg-white p-4.5 border border-border shadow-xs space-y-3 hover:border-[#123A68]/30 transition-all text-right"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${item.avatarBg} text-xs font-black text-white`}
                    >
                      {item.avatarInitials}
                    </div>
                    <div className="text-right">
                      <h3 className="text-xs font-black text-primary">
                        {item.requesterName}
                      </h3>
                      <span className="text-[10px] text-text-muted">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-bold border ${item.statusBadge}`}
                  >
                    {item.statusLabel}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-primary leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Footer Location & View Details */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-text-muted flex items-center gap-1">
                    <span>📍</span>
                    <span>{item.location}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => navigate(`/errands/${item.id}`)}
                    className="flex h-9 px-4 items-center justify-center rounded-xl bg-blue-50/60 text-xs font-black text-[#123A68] hover:bg-blue-100 active:scale-98 transition-all cursor-pointer"
                  >
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
