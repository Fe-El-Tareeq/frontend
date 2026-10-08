import React, { useState } from "react";
import { Clock, X, AlertOctagon } from "lucide-react";
import { cn } from "../../utils/cn";

interface DisputeItem {
  id: string;
  code: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  severityText: string;
  status: "OPEN" | "UNDER_REVIEW" | "RESOLVED";
  statusText: string;
  title: string;
  requester: string;
  traveler: string;
  amount: string;
  timeAgo: string;
}

const MOCK_DISPUTES: DisputeItem[] = [
  {
    id: "d1",
    code: "r007",
    severity: "HIGH",
    severityText: "عالية",
    status: "OPEN",
    statusText: "مفتوح",
    title: "المسافر لم يسلم الطرد",
    requester: "أم ياسمين",
    traveler: "محمد أبو سالم",
    amount: "7 ₪",
    timeAgo: "5 س",
  },
  {
    id: "d2",
    code: "r011",
    severity: "MEDIUM",
    severityText: "متوسطة",
    status: "OPEN",
    statusText: "مفتوح",
    title: "البضاعة وصلت ناقصة",
    requester: "أبو خالد",
    traveler: "عمر الأسطل",
    amount: "5 ₪",
    timeAgo: "يوم",
  },
  {
    id: "d3",
    code: "r015",
    severity: "LOW",
    severityText: "منخفضة",
    status: "UNDER_REVIEW",
    statusText: "قيد المراجعة",
    title: "تأخر التسليم أكثر من 4 ساعات",
    requester: "سلمى حبيب",
    traveler: "ناصر الغول",
    amount: "3 ₪",
    timeAgo: "يومان",
  },
];

export const AdminDisputesPage: React.FC = () => {
  const [selectedDispute, setSelectedDispute] = useState<DisputeItem | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleActionClick = (actionName: string) => {
    setActionNotice(`⚠️ إجراء (${actionName}) معطل حالياً — في انتظار استكمال مسار الـ Backend`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  return (
    <div className="space-y-6 text-right">
      {/* Backend Status Notice */}
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3.5 flex items-center justify-between text-xs text-amber-300">
        <span className="font-bold">حالة الـ API: مسارات قرارات النزاع قيد التطوير في الـ BE</span>
        <span>
          ⚠️ مسارات استرداد المبالغ والتعويضات والإنذارات معطلة مؤقتاً بانتظار مسار الـ Backend
        </span>
      </div>

      {actionNotice && (
        <div className="rounded-xl bg-blue-500/10 border border-blue-500/30 p-3 text-xs font-bold text-blue-300 animate-in fade-in">
          {actionNotice}
        </div>
      )}

      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Open Disputes (Red) */}
        <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] p-5 shadow-sm text-center">
          <span className="text-4xl font-black text-red-500 block">2</span>
          <span className="text-xs font-bold text-slate-400 block mt-1">نزاعات مفتوحة</span>
        </div>

        {/* Under Review (Yellow) */}
        <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] p-5 shadow-sm text-center">
          <span className="text-4xl font-black text-yellow-500 block">1</span>
          <span className="text-xs font-bold text-slate-400 block mt-1">قيد المراجعة</span>
        </div>

        {/* Resolved this week (Green) */}
        <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] p-5 shadow-sm text-center">
          <span className="text-4xl font-black text-emerald-500 block">8</span>
          <span className="text-xs font-bold text-slate-400 block mt-1">محلولة هذا الأسبوع</span>
        </div>
      </div>

      {/* Main Layout: List + Drawer */}
      <div className="flex flex-col lg:flex-row-reverse gap-6 items-start">
        {/* Disputes List */}
        <div className="flex-1 w-full space-y-3.5">
          {MOCK_DISPUTES.map((dispute) => {
            const isSelected = selectedDispute?.id === dispute.id;
            return (
              <div
                key={dispute.id}
                onClick={() => setSelectedDispute(dispute)}
                className={cn(
                  "p-5 rounded-2xl bg-[#0C1B2E] border transition-all cursor-pointer space-y-3 shadow-sm",
                  isSelected
                    ? "border-blue-500 bg-[#0E233C]"
                    : "border-[#162E4A] hover:border-slate-600",
                )}
              >
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{dispute.timeAgo}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400 font-bold">
                      {dispute.code}
                    </span>
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
                        dispute.status === "OPEN"
                          ? "bg-red-500/10 text-red-400 border-red-500/30"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
                      )}
                    >
                      {dispute.statusText}
                    </span>
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-[11px] font-bold",
                        dispute.severity === "HIGH" && "bg-red-600 text-white",
                        dispute.severity === "MEDIUM" && "bg-amber-600 text-white",
                        dispute.severity === "LOW" && "bg-teal-600 text-white",
                      )}
                    >
                      {dispute.severityText}
                    </span>
                  </div>
                </div>

                {/* Dispute Title */}
                <h3 className="text-sm md:text-base font-black text-white">
                  {dispute.title}
                </h3>

                {/* Details Footer */}
                <div className="flex items-center justify-between text-xs text-slate-300 font-medium pt-1 border-t border-[#162E4A]/60">
                  <span className="font-bold text-amber-400 font-mono">
                    {dispute.amount}
                  </span>
                  <div className="flex items-center gap-4">
                    <span>
                      المسافر: <strong className="text-white">{dispute.traveler}</strong>
                    </span>
                    <span>
                      الطالب: <strong className="text-white">{dispute.requester}</strong>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dispute Actions Drawer matching state=2.png */}
        {selectedDispute && (
          <div className="w-full lg:w-80 rounded-2xl bg-[#0A1A2C] border border-[#162E4A] p-5 space-y-4 shadow-xl shrink-0 animate-in fade-in">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#162E4A]">
              <button
                type="button"
                onClick={() => setSelectedDispute(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#162E4A] transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
              <h4 className="text-sm font-black text-white">إجراءات النزاع</h4>
            </div>

            {/* Dispute Summary Box */}
            <div className="p-3.5 rounded-xl bg-[#071322] border border-[#162E4A] space-y-2 text-xs">
              <h5 className="font-black text-white">{selectedDispute.title}</h5>
              <div className="flex justify-between text-slate-400">
                <span className="text-white font-bold">{selectedDispute.requester}</span>
                <span>الطالب</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span className="text-white font-bold">{selectedDispute.traveler}</span>
                <span>المسافر</span>
              </div>
              <div className="flex justify-between text-slate-400 pt-1 border-t border-[#162E4A]/60">
                <span className="text-amber-400 font-black font-mono">متفق عليه</span>
                <span>المبلغ</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <p className="text-[11px] font-bold text-slate-400">الإجراءات المتاحة:</p>

              {/* Action 1: Refund Requester */}
              <button
                type="button"
                onClick={() => handleActionClick("استرداد المبلغ للطالب")}
                className="w-full py-2.5 px-3 rounded-xl bg-teal-900/60 hover:bg-teal-800 text-teal-200 border border-teal-700/50 font-bold text-xs transition-colors cursor-pointer text-center"
              >
                استرداد المبلغ للطالب
              </button>

              {/* Action 2: Compensate Traveler */}
              <button
                type="button"
                onClick={() => handleActionClick("تعويض محفظة المسافر")}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/50 font-bold text-xs transition-colors cursor-pointer text-center"
              >
                تعويض محفظة المسافر
              </button>

              {/* Action 3: Send Warning */}
              <button
                type="button"
                onClick={() => handleActionClick("إرسال تحذير للمسافر")}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-700/50 font-bold text-xs transition-colors cursor-pointer text-center"
              >
                إرسال تحذير للمسافر
              </button>

              {/* Action 4: Ban Traveler */}
              <button
                type="button"
                onClick={() => handleActionClick("حظر المسافر")}
                className="w-full py-2.5 px-3 rounded-xl bg-red-950/70 hover:bg-red-900 text-red-300 border border-red-800/60 font-bold text-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <AlertOctagon className="h-3.5 w-3.5" />
                <span>حظر المسافر</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDisputesPage;
