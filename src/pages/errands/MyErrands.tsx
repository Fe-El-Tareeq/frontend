import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { ErrandFeedCard } from "../../components/errands/ErrandFeedCard";
import type { ErrandCardData } from "../../components/errands/ErrandFeedCard";
import { ErrandFilterBar } from "../../components/errands/ErrandFilterBar";

export default function MyErrands() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [zoneFilter, setZoneFilter] = useState("ALL");

  const errands: ErrandCardData[] = [
    {
      id: "errand-1",
      title: "توصيل دواء من صيدلية في رفح إلى الرمال",
      requesterName: "فاطمة علي",
      avatarInitials: "فع",
      avatarBg: "bg-[#8B5CF6]",
      from: "رفح",
      to: "غزة - الرمال",
      date: "23 يوليو 2024",
      status: "PENDING",
      statusText: "قيد الانتظار",
      statusClass: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
      priceNis: 5,
    },
    {
      id: "errand-2",
      title: "توصيل وثائق رسمية من ديوان الموظفين إلى الشجاعية",
      requesterName: "خالد عبد الله",
      avatarInitials: "خع",
      avatarBg: "bg-[#8B5CF6]",
      from: "غزة - تل الهوا",
      to: "غزة - الشجاعية",
      date: "22 يوليو 2024",
      status: "MATCHED",
      statusText: "تم التطابق",
      statusClass: "bg-[#DBEAFE] text-[#1E40AF] border-[#BFDBFE]",
      priceNis: 7,
    },
    {
      id: "errand-3",
      title: "شراء مستلزمات مدرسية من مكتبة القدس",
      requesterName: "رنا سمير",
      avatarInitials: "رس",
      avatarBg: "bg-[#F36F21]",
      from: "خان يونس",
      to: "دير البلح",
      date: "21 يوليو 2024",
      status: "COMPLETED",
      statusText: "مكتمل",
      statusClass: "bg-[#D1FAE5] text-[#065F46] border-[#A7F3D0]",
      priceNis: 10,
    },
    {
      id: "errand-4",
      title: "توصيل طرد ملابس وأحذية عائلية",
      requesterName: "يوسف النجار",
      avatarInitials: "ين",
      avatarBg: "bg-[#0D9488]",
      from: "شمال غزة",
      to: "غزة - النصر",
      date: "20 يوليو 2024",
      status: "CANCELLED",
      statusText: "ملغي",
      statusClass: "bg-[#FFE4E6] text-[#BE123C] border-[#FECDD3]",
      priceNis: 8,
    },
  ];

  const filteredErrands = errands.filter((e) => {
    if (searchQuery && !e.title.includes(searchQuery) && !e.requesterName.includes(searchQuery)) {
      return false;
    }
    if (statusFilter !== "ALL" && e.status !== statusFilter) {
      return false;
    }
    if (zoneFilter !== "ALL" && !e.from.includes(zoneFilter) && !e.to.includes(zoneFilter)) {
      return false;
    }
    return true;
  });

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-16 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title Header with Action Button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/errands/new")}
            className="flex h-11 items-center justify-center gap-1.5 rounded-2xl bg-[#F36F21] px-4 text-xs font-black text-white shadow-md active:scale-98 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>إنشاء طلب</span>
          </button>

          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68]">الطلبات</h1>
            <p className="text-xs text-text-secondary">
              {filteredErrands.length} طلب متاح
            </p>
          </div>
        </div>

        {/* Filter Card */}
        <ErrandFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          zoneFilter={zoneFilter}
          onZoneChange={setZoneFilter}
        />

        {/* Errand Cards List */}
        <div className="space-y-3.5 pt-1">
          {filteredErrands.map((errand) => (
            <ErrandFeedCard
              key={errand.id}
              errand={errand}
              onViewDetails={(id) => navigate(`/errands/${id}`)}
            />
          ))}
        </div>
      </div>
    </MobileContainer>
  );
}
