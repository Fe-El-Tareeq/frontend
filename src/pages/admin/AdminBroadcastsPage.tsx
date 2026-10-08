import React, { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "../../utils/cn";

const AUDIENCE_OPTIONS = [
  { id: "ALL", label: "الكل", reach: 324 },
  { id: "GAZA", label: "مدينة غزة", reach: 142 },
  { id: "KHAN_YOUNIS", label: "خان يونس", reach: 89 },
  { id: "MIDDLE", label: "الوسطى", reach: 51 },
  { id: "RAFAH", label: "رفح", reach: 32 },
  { id: "NORTH", label: "شمال غزة", reach: 68 },
];

const MOCK_BROADCAST_HISTORY = [
  {
    id: "b1",
    target: "الكل",
    message: "تنبيه: صيانة مجدولة من 2-4 م",
    reach: 324,
    time: "09:00",
  },
  {
    id: "b2",
    target: "رفح",
    message: "تمت إضافة 5 مسافرين جدد في رفح",
    reach: 89,
    time: "أمس",
  },
  {
    id: "b3",
    target: "خان يونس",
    message: "تذكير: الالتزام بأوقات التوصيل المتفق عليها",
    reach: 112,
    time: "قبل يومين",
  },
];

export const AdminBroadcastsPage: React.FC = () => {
  const [selectedAudience, setSelectedAudience] = useState("ALL");
  const [messageText, setMessageText] = useState("");

  const currentReach =
    AUDIENCE_OPTIONS.find((a) => a.id === selectedAudience)?.reach || 324;

  return (
    <div className="space-y-6 text-right">
      {/* Backend Status Notice */}
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3.5 flex items-center justify-between text-xs text-amber-300">
        <span className="font-bold">حالة الـ API: قيد التطوير في الـ Backend</span>
        <span>
          ⚠️ مسار إرسال الإشعارات الجماعية (`POST /admin/notifications/broadcast`) غير متوفر حالياً — زر الإرسال معطل
        </span>
      </div>

      {/* Card 1: Create Broadcast Notification */}
      <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] p-6 shadow-sm space-y-5">
        <div className="text-right">
          <h3 className="text-base font-black text-white">إنشاء إشعار جماعي</h3>
        </div>

        {/* Target Audience Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-blue-400 font-mono">
              الوصول المتوقع: {currentReach} مستخدم
            </span>
            <span className="text-slate-400">الجمهور المستهدف:</span>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {AUDIENCE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedAudience(opt.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  selectedAudience === opt.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-[#091728] text-slate-400 hover:text-white border border-[#162E4A]",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div className="space-y-1.5">
          <div className="relative">
            <textarea
              rows={4}
              maxLength={160}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="اكتب نص الإشعار هنا..."
              className="w-full p-4 rounded-xl bg-[#081525] border border-[#162E4A] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all text-right resize-none"
            />
            <span className="absolute left-3 bottom-3 text-[11px] font-mono text-slate-500">
              {messageText.length}/160 حرف
            </span>
          </div>
        </div>

        {/* Send Button matching Button.png */}
        <div className="flex justify-start">
          <button
            type="button"
            disabled
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#143257] text-slate-400 font-bold text-xs opacity-60 cursor-not-allowed border border-[#1C4273]"
            title="معطل - بانتظار مسار الإرسال في الـ Backend"
          >
            <Send className="h-4 w-4" />
            <span>إرسال الإشعار (معطل - بانتظار الـ BE)</span>
          </button>
        </div>
      </div>

      {/* Card 2: Broadcast Sent Log */}
      <div className="rounded-2xl bg-[#0C1B2E] border border-[#162E4A] p-6 shadow-sm space-y-4">
        <h3 className="text-base font-black text-white">سجل الإشعارات المُرسلة</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#162E4A] text-slate-400 font-bold pb-3">
                <th className="py-3 px-4">المنطقة</th>
                <th className="py-3 px-4">الرسالة</th>
                <th className="py-3 px-4 text-center">الوصول</th>
                <th className="py-3 px-4 text-center">الوقت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#162E4A]/60 font-medium">
              {MOCK_BROADCAST_HISTORY.map((item) => (
                <tr key={item.id} className="hover:bg-[#0E2238] transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-300 font-bold text-[11px]">
                      {item.target}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-white font-bold">{item.message}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-slate-300 font-bold">
                    {item.reach}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-slate-400">
                    {item.time}
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

export default AdminBroadcastsPage;
