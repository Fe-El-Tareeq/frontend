import React, { useState } from "react";
import { Download, FileText } from "lucide-react";

export const AdminReportsPage: React.FC = () => {
  const [fromDate, setFromDate] = useState("2024-06-01");
  const [toDate, setToDate] = useState("2024-06-15");

  return (
    <div className="space-y-6 text-right">
      {/* Backend Status Notice */}
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3.5 flex items-center justify-between text-xs text-amber-300">
        <span className="font-bold">حالة الـ API: قيد التطوير في الـ Backend</span>
        <span>
          ⚠️ مسارات تجميع التقارير وتصدير Excel/PDF (`/admin/reports/*`) غير متوفرة حالياً في الـ BE
        </span>
      </div>

      {/* Top Filter and Export Bar */}
      <div className="flex flex-col md:flex-row-reverse items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0C1B2E] border border-[#162E4A]">
        {/* Title */}
        <h3 className="text-sm font-black text-white">التقارير والإحصائيات</h3>

        {/* Date Inputs & Export Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Range */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <span>من</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="h-9 px-2.5 rounded-lg bg-[#081525] border border-[#162E4A] text-white text-xs font-mono"
            />
            <span>إلى</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="h-9 px-2.5 rounded-lg bg-[#081525] border border-[#162E4A] text-white text-xs font-mono"
            />
          </div>

          {/* Export Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              title="تصدير Excel (معطل - بانتظار مسار الـ BE)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-bold opacity-60 cursor-not-allowed"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Excel</span>
            </button>
            <button
              type="button"
              disabled
              title="تصدير PDF (معطل - بانتظار مسار الـ BE)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/40 text-slate-300 border border-slate-600/40 text-xs font-bold opacity-60 cursor-not-allowed"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chart 1: Weekly Orders */}
      <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              <span>إجمالي</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span>مكتمل</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span>ملغي</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black text-white">الطلبات الأسبوعية</h4>
            <p className="text-[11px] text-slate-400 font-medium">المكتملة، الملغاة، الإجمالية</p>
          </div>
        </div>

        {/* Bar Chart Representation */}
        <div className="h-56 pt-6">
          <div className="h-44 flex items-end justify-between gap-3 px-4 border-b border-[#162E4A]">
            {[
              { day: "السبت", val: 65 },
              { day: "الأحد", val: 78 },
              { day: "الإثنين", val: 92 },
              { day: "الثلاثاء", val: 98 },
              { day: "الأربعاء", val: 108 },
              { day: "الخميس", val: 92 },
              { day: "الجمعة", val: 70 },
            ].map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-4.5 rounded-t-md bg-red-500 shadow-sm transition-all hover:bg-red-400"
                  style={{ height: `${(d.val / 120) * 100}%` }}
                />
                <span className="text-[11px] font-bold text-slate-400">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Demand Map by Region */}
      <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] p-6 shadow-sm space-y-4">
        <div>
          <h4 className="text-sm font-black text-white">خريطة الطلب بالمناطق</h4>
          <p className="text-[11px] text-slate-400 font-medium">مستوى الطلب — بدون GPS</p>
        </div>

        <div className="space-y-3 pt-2">
          {[
            {
              region: "شمال غزة",
              count: "23 طلب",
              level: "منخفض",
              levelColor: "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40",
              dotColor: "bg-emerald-400",
            },
            {
              region: "مدينة غزة",
              count: "48 طلب",
              level: "مرتفع",
              levelColor: "bg-red-950/60 text-red-400 border border-red-800/40",
              dotColor: "bg-red-500",
            },
            {
              region: "الوسطى",
              count: "31 طلب",
              level: "متوسط",
              levelColor: "bg-yellow-950/60 text-yellow-400 border border-yellow-800/40",
              dotColor: "bg-yellow-400",
            },
            {
              region: "خان يونس",
              count: "36 طلب",
              level: "مرتفع",
              levelColor: "bg-red-950/60 text-red-400 border border-red-800/40",
              dotColor: "bg-red-500",
            },
            {
              region: "رفح",
              count: "29 طلب",
              level: "متوسط",
              levelColor: "bg-yellow-950/60 text-yellow-400 border border-yellow-800/40",
              dotColor: "bg-yellow-400",
            },
          ].map((item) => (
            <div
              key={item.region}
              className={`flex items-center justify-between p-3.5 rounded-xl ${item.levelColor}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-black">{item.count}</span>
                <span className="text-xs font-bold">{item.level}</span>
                <div className="flex items-center gap-1 mr-2">
                  <span className={`h-2 w-2 rounded-full ${item.dotColor}`} />
                  <span className={`h-2 w-2 rounded-full ${item.dotColor}`} />
                  <span className={`h-2 w-2 rounded-full ${item.dotColor}`} />
                </div>
              </div>
              <span className="text-xs font-black">{item.region}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;
