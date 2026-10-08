import React, { useState, useMemo } from "react";
import { Search, Eye, Ban, UserX, Star } from "lucide-react";
import { cn } from "../../utils/cn";

interface UserItem {
  id: string;
  name: string;
  region: string;
  status: "VERIFIED" | "PENDING" | "SUSPENDED" | "BANNED";
  statusText: string;
  rating: number;
  disputes: number;
  trips: number;
  role: "TRAVELER" | "REQUESTER";
}

const MOCK_USERS: UserItem[] = [
  {
    id: "u1",
    name: "أبو محمد الخضري",
    region: "مدينة غزة",
    status: "VERIFIED",
    statusText: "موثق",
    rating: 4.8,
    disputes: 0,
    trips: 34,
    role: "TRAVELER",
  },
  {
    id: "u2",
    name: "أم حسن النجار",
    region: "خان يونس",
    status: "VERIFIED",
    statusText: "موثق",
    rating: 4.5,
    disputes: 1,
    trips: 0,
    role: "REQUESTER",
  },
  {
    id: "u3",
    name: "محمد أبو سالم",
    region: "رفح",
    status: "SUSPENDED",
    statusText: "معلق",
    rating: 3.9,
    disputes: 2,
    trips: 12,
    role: "TRAVELER",
  },
  {
    id: "u4",
    name: "فاطمة الزيادة",
    region: "الوسطى",
    status: "VERIFIED",
    statusText: "موثق",
    rating: 5.0,
    disputes: 0,
    trips: 0,
    role: "REQUESTER",
  },
  {
    id: "u5",
    name: "يوسف حمدان",
    region: "شمال غزة",
    status: "BANNED",
    statusText: "موقوف",
    rating: 4.2,
    disputes: 3,
    trips: 8,
    role: "TRAVELER",
  },
  {
    id: "u6",
    name: "نور السمان",
    region: "مدينة غزة",
    status: "PENDING",
    statusText: "قيد التحقق",
    rating: 4.2,
    disputes: 0,
    trips: 0,
    role: "REQUESTER",
  },
  {
    id: "u7",
    name: "خالد الحرازين",
    region: "خان يونس",
    status: "VERIFIED",
    statusText: "موثق",
    rating: 4.6,
    disputes: 1,
    trips: 21,
    role: "TRAVELER",
  },
  {
    id: "u8",
    name: "مريم أبو حجير",
    region: "رفح",
    status: "VERIFIED",
    statusText: "موثق",
    rating: 4.3,
    disputes: 0,
    trips: 0,
    role: "REQUESTER",
  },
];

export const AdminUsersPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter((user) => {
      if (search.trim()) {
        const query = search.trim();
        if (!user.name.includes(query) && !user.region.includes(query)) {
          return false;
        }
      }
      if (roleFilter !== "ALL") {
        if (roleFilter === "TRAVELER" && user.role !== "TRAVELER") return false;
        if (roleFilter === "REQUESTER" && user.role !== "REQUESTER") return false;
      }
      if (statusFilter !== "ALL") {
        if (statusFilter === "VERIFIED" && user.status !== "VERIFIED") return false;
        if (statusFilter === "PENDING" && user.status !== "PENDING") return false;
        if (statusFilter === "SUSPENDED" && user.status !== "SUSPENDED") return false;
        if (statusFilter === "BANNED" && user.status !== "BANNED") return false;
      }
      return true;
    });
  }, [search, roleFilter, statusFilter]);

  return (
    <div className="space-y-6 text-right">
      {/* Backend Status Notice */}
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3.5 flex items-center justify-between text-xs text-amber-300">
        <span className="font-bold">حالة الـ API: قيد التطوير في الـ Backend</span>
        <span>
          ⚠️ مسار استعراض وإدارة المستخدمين (`GET /admin/users`) غير متوفر حالياً — إجراءات الحظر والتعليق معطلة مؤقتاً
        </span>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col lg:flex-row-reverse items-stretch lg:items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث بالاسم أو المنطقة..."
            className="w-full h-10 pr-10 pl-4 rounded-xl bg-[#0C1B2E] border border-[#162E4A] text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-all text-right"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status filters */}
          <div className="flex items-center gap-1.5 border-l border-[#162E4A] pl-3">
            {[
              { id: "ALL", label: "الكل" },
              { id: "VERIFIED", label: "موثق" },
              { id: "PENDING", label: "قيد التحقق" },
              { id: "SUSPENDED", label: "معلق" },
              { id: "BANNED", label: "موقوف" },
            ].map((pill) => (
              <button
                key={pill.id}
                type="button"
                onClick={() => setStatusFilter(pill.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  statusFilter === pill.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-[#0C1B2E] text-slate-400 hover:text-white border border-[#162E4A]",
                )}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Role filters */}
          <div className="flex items-center gap-1.5">
            {[
              { id: "ALL", label: "الكل" },
              { id: "TRAVELER", label: "مسافر" },
              { id: "REQUESTER", label: "طالب" },
            ].map((pill) => (
              <button
                key={pill.id}
                type="button"
                onClick={() => setRoleFilter(pill.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  roleFilter === pill.id
                    ? "bg-[#143257] text-white shadow-xs"
                    : "bg-[#0C1B2E] text-slate-400 hover:text-white border border-[#162E4A]",
                )}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#162E4A] bg-[#091728] text-slate-400 font-bold">
                <th className="p-4">الاسم</th>
                <th className="p-4">المنطقة</th>
                <th className="p-4 text-center">الحالة</th>
                <th className="p-4 text-center">التقييم</th>
                <th className="p-4 text-center">نزاعات</th>
                <th className="p-4 text-center">رحلات</th>
                <th className="p-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#162E4A]/60 font-semibold">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#0E2238] transition-colors">
                  <td className="p-4 text-white font-bold">{user.name}</td>
                  <td className="p-4 text-slate-300">{user.region}</td>
                  <td className="p-4 text-center">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[11px] font-bold inline-block",
                        user.status === "VERIFIED" && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                        user.status === "PENDING" && "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                        user.status === "SUSPENDED" && "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
                        user.status === "BANNED" && "bg-red-500/10 text-red-400 border border-red-500/20",
                      )}
                    >
                      {user.statusText}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {user.rating.toFixed(1)}
                    </span>
                  </td>
                  <td className="p-4 text-center font-mono">
                    <span className={cn(user.disputes > 0 ? "text-red-400 font-black" : "text-slate-400")}>
                      {user.disputes}
                    </span>
                  </td>
                  <td className="p-4 text-center font-mono text-slate-300">{user.trips}</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        title="عرض الملف"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#162E4A] transition-colors cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        disabled
                        title="تجميد الحساب (معطل - بانتظار مسار الـ BE)"
                        className="p-1.5 rounded-lg text-slate-600 cursor-not-allowed opacity-50"
                      >
                        <Ban className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        disabled
                        title="حظر الحساب (معطل - بانتظار مسار الـ BE)"
                        className="p-1.5 rounded-lg text-slate-600 cursor-not-allowed opacity-50"
                      >
                        <UserX className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
