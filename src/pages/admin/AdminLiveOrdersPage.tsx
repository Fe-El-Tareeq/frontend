import React, { useState, useMemo } from "react";
import { cn } from "../../utils/cn";

interface LiveOrderItem {
  id: string;
  description: string;
  origin: string;
  status: "WAITING" | "MATCHED" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED" | "DISPUTED";
  statusText: string;
  isUrgent: boolean;
  requester: string;
  traveler: string;
  timeAgo: string;
}

const MOCK_LIVE_ORDERS: LiveOrderItem[] = [
  {
    id: "lo1",
    description: "دواء ضغط + أنسولين",
    origin: "مدينة غزة",
    status: "WAITING",
    statusText: "انتظار",
    isUrgent: true,
    requester: "أم حسن",
    traveler: "—",
    timeAgo: "8 دق",
  },
  {
    id: "lo2",
    description: "وثائق رسمية",
    origin: "رفح",
    status: "MATCHED",
    statusText: "مطابقة",
    isUrgent: false,
    requester: "فاطمة",
    traveler: "أبو محمد",
    timeAgo: "25 دق",
  },
  {
    id: "lo3",
    description: "طحين وسكر (5 كغ)",
    origin: "الوسطى",
    status: "IN_TRANSIT",
    statusText: "قيد التوصيل",
    isUrgent: false,
    requester: "نور",
    traveler: "خالد",
    timeAgo: "1 س",
  },
  {
    id: "lo4",
    description: "ضمادات وأدوية جرح عاجل",
    origin: "شمال غزة",
    status: "WAITING",
    statusText: "انتظار",
    isUrgent: true,
    requester: "أبو ياسر",
    traveler: "—",
    timeAgo: "3 دق",
  },
  {
    id: "lo5",
    description: "مستلزمات أطفال رضع",
    origin: "خان يونس",
    status: "COMPLETED",
    statusText: "مكتمل",
    isUrgent: false,
    requester: "أم خالد",
    traveler: "يوسف",
    timeAgo: "2 س",
  },
  {
    id: "lo6",
    description: "شحن هاتف وبطارية",
    origin: "مدينة غزة",
    status: "CANCELLED",
    statusText: "ملغي",
    isUrgent: false,
    requester: "سامر",
    traveler: "—",
    timeAgo: "3 س",
  },
  {
    id: "lo7",
    description: "حليب أطفال (عاجل)",
    origin: "رفح",
    status: "DISPUTED",
    statusText: "منازعة",
    isUrgent: true,
    requester: "أم ياسمين",
    traveler: "محمد أبو سالم",
    timeAgo: "5 س",
  },
];

export const AdminLiveOrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ALL" | "URGENT" | "UNMATCHED" | "DISPUTED">("ALL");

  const filteredOrders = useMemo(() => {
    return MOCK_LIVE_ORDERS.filter((order) => {
      if (activeTab === "URGENT") return order.isUrgent;
      if (activeTab === "UNMATCHED") return order.traveler === "—";
      if (activeTab === "DISPUTED") return order.status === "DISPUTED";
      return true;
    });
  }, [activeTab]);

  return (
    <div className="space-y-6 text-right">
      {/* Backend Status Notice */}
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3.5 flex items-center justify-between text-xs text-amber-300">
        <span className="font-bold">حالة الـ API: قيد التطوير في الـ Backend</span>
        <span>
          ⚠️ مسار البث المباشر للطلبات (`GET /admin/errands/live`) غير متوفر حالياً — المعروض محاكاة حية مطابقة
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {[
          { id: "ALL", label: "الكل" },
          { id: "URGENT", label: "عاجل" },
          { id: "UNMATCHED", label: "غير مطابق" },
          { id: "DISPUTED", label: "منازعة" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-[#0C1B2E] text-slate-400 hover:text-white border border-[#162E4A]",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Live Orders Table */}
      <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#162E4A] bg-[#091728] text-slate-400 font-bold">
                <th className="p-4">الوصف</th>
                <th className="p-4">من</th>
                <th className="p-4 text-center">الحالة</th>
                <th className="p-4 text-center">عاجل</th>
                <th className="p-4 text-center">الطالب</th>
                <th className="p-4 text-center">المسافر</th>
                <th className="p-4 text-center">منذ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#162E4A]/60 font-semibold">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#0E2238] transition-colors">
                  <td className="p-4 text-white font-bold">{order.description}</td>
                  <td className="p-4 text-slate-300">{order.origin}</td>
                  <td className="p-4 text-center">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[11px] font-bold inline-block",
                        order.status === "WAITING" && "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                        order.status === "MATCHED" && "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                        order.status === "IN_TRANSIT" && "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
                        order.status === "COMPLETED" && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                        order.status === "CANCELLED" && "bg-slate-500/10 text-slate-400 border border-slate-500/20",
                        order.status === "DISPUTED" && "bg-red-500/10 text-red-400 border border-red-500/20",
                      )}
                    >
                      {order.statusText}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {order.isUrgent ? (
                      <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 text-[11px] font-bold">
                        عاجل
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">عادي</span>
                    )}
                  </td>
                  <td className="p-4 text-center text-slate-300">{order.requester}</td>
                  <td className="p-4 text-center text-slate-300">{order.traveler}</td>
                  <td className="p-4 text-center font-mono text-slate-400">{order.timeAgo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLiveOrdersPage;
