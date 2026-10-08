import React from "react";
import { Radio, Users, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export const AdminOverviewPage: React.FC = () => {
  return (
    <div className="space-y-6 text-right">
      {/* Backend Status Notice */}
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3.5 flex items-center justify-between text-xs text-amber-300">
        <span className="font-bold">حالة الـ API: قيد التطوير في الـ Backend</span>
        <span>
          ⚠️ مسارات الإحصائيات (`/admin/overview/*`) غير متوفرة في الـ BE حالياً — يتم عرض واجهة التصميم كمعاينة مطابقة
        </span>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Orders */}
        <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">
              +12 عن أمس
            </span>
            <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Radio className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-white block">47</span>
            <span className="text-xs font-bold text-slate-400 block mt-1">طلبات نشطة</span>
          </div>
        </div>

        {/* Card 2: New Users */}
        <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">
              +4 عن أمس
            </span>
            <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Users className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-white block">12</span>
            <span className="text-xs font-bold text-slate-400 block mt-1">مستخدمون جدد</span>
          </div>
        </div>

        {/* Card 3: Completed Today */}
        <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
              +8%
            </span>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-white block">89</span>
            <span className="text-xs font-bold text-slate-400 block mt-1">مكتملة اليوم</span>
          </div>
        </div>

        {/* Card 4: Urgent Waiting */}
        <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-md">
              يحتاج تدخلاً
            </span>
            <div className="h-9 w-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <AlertCircle className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-red-500 block">8</span>
            <span className="text-xs font-bold text-slate-400 block mt-1">عاجلة بانتظار</span>
          </div>
        </div>
      </div>

      {/* Chart 1: Orders throughout the day */}
      <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              <span>إجمالي</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span>عاجل</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black text-white">الطلبات خلال اليوم</h3>
            <p className="text-[11px] text-slate-400 font-medium">توزيع بالساعة</p>
          </div>
        </div>

        {/* SVG Curve Chart */}
        <div className="h-52 w-full pt-4">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 700 180" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="40" x2="700" y2="40" stroke="#162E4A" strokeDasharray="4 4" strokeWidth="1" />
            <line x1="0" y1="80" x2="700" y2="80" stroke="#162E4A" strokeDasharray="4 4" strokeWidth="1" />
            <line x1="0" y1="120" x2="700" y2="120" stroke="#162E4A" strokeDasharray="4 4" strokeWidth="1" />
            <line x1="0" y1="160" x2="700" y2="160" stroke="#162E4A" strokeWidth="1" />

            {/* Gradient Area under curve */}
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Path filled */}
            <path
              d="M 20 150 C 150 140, 250 80, 350 40 C 450 40, 550 90, 680 110 L 680 160 L 20 160 Z"
              fill="url(#areaGradient)"
            />

            {/* Red Curve Line */}
            <path
              d="M 20 150 C 150 140, 250 80, 350 40 C 450 40, 550 90, 680 110"
              fill="none"
              stroke="#EF4444"
              strokeWidth="3"
            />
          </svg>

          {/* Time axis */}
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mt-2 px-3">
            <span>6ص</span>
            <span>8ص</span>
            <span>10ص</span>
            <span>12ظ</span>
            <span>2م</span>
            <span>4م</span>
            <span>6م</span>
          </div>
        </div>
      </div>

      {/* Chart 2: Orders by Region */}
      <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] p-6 shadow-sm space-y-4">
        <div className="text-right">
          <h3 className="text-sm font-black text-white">الطلبات بالمنطقة</h3>
          <p className="text-[11px] text-slate-400 font-medium">اليوم</p>
        </div>

        <div className="space-y-3 pt-2">
          {[
            { region: "شمال غزة", value: 38, max: 60 },
            { region: "مدينة غزة", value: 50, max: 60 },
            { region: "الوسطى", value: 42, max: 60 },
            { region: "خان يونس", value: 58, max: 60 },
            { region: "رفح", value: 30, max: 60 },
          ].map((item) => (
            <div key={item.region} className="flex items-center gap-4 text-xs font-bold">
              <span className="w-20 text-slate-400 text-right">{item.region}</span>
              <div className="flex-1 h-3 rounded-full bg-[#122A46] overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${(item.value / item.max) * 100}%` }}
                />
              </div>
              <span className="w-8 text-slate-400 font-mono text-left">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Urgent Orders waiting for traveler */}
      <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] p-6 shadow-sm space-y-4">
        <div className="text-right">
          <h3 className="text-sm font-black text-white">طلبات عاجلة — بانتظار مسافر</h3>
          <p className="text-[11px] text-red-400 font-bold">تحتاج تدخلاً فورياً</p>
        </div>

        <div className="space-y-2.5">
          {[
            {
              title: "دواء ضغط + أنسولين",
              region: "مدينة غزة",
              badge: "انتظار",
              badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
              time: "8 دق",
            },
            {
              title: "ضمادات وأدوية جرح عاجل",
              region: "شمال غزة",
              badge: "انتظار",
              badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
              time: "3 دق",
            },
            {
              title: "حليب أطفال (عاجل)",
              region: "رفح",
              badge: "منازعة",
              badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
              time: "5 س",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#091728] border border-[#162E4A] text-xs font-bold hover:border-blue-500/40 transition-colors"
            >
              {/* Left: Time and status badge */}
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {item.time}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full border text-[11px] ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <span className="text-slate-400 font-normal">{item.region}</span>
              </div>

              {/* Right: Title with bullet */}
              <div className="flex items-center gap-2">
                <span className="text-white">{item.title}</span>
                <span className="h-2 w-2 rounded-full bg-red-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
