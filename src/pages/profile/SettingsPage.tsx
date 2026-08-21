import { useState } from "react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { SettingsNotificationToggle } from "../../components/profile/SettingsNotificationToggle";

export default function SettingsPage() {
  const [tripNotifs, setTripNotifs] = useState(true);
  const [msgNotifs, setMsgNotifs] = useState(true);
  const [errandNotifs, setErrandNotifs] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-16 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <h1 className="text-xl font-black text-[#123A68]">الإعدادات</h1>

        {/* 1. Notifications Card */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-4">
          <h2 className="text-sm font-black text-[#123A68]">الإشعارات</h2>

          <SettingsNotificationToggle
            title="إشعارات الرحلات الجديدة"
            description="اعلمني عند إضافة رحلة في منطقتك"
            checked={tripNotifs}
            onChange={setTripNotifs}
          />

          <SettingsNotificationToggle
            title="إشعارات الرسائل"
            description="اعلمني عند استلام رسائل جديدة"
            checked={msgNotifs}
            onChange={setMsgNotifs}
          />

          <SettingsNotificationToggle
            title="إشعارات الطلبات"
            description="اعلمني عند تطابق طلباتي"
            checked={errandNotifs}
            onChange={setErrandNotifs}
            borderBottom={false}
          />
        </div>

        {/* 2. Theme Card */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-3">
          <h2 className="text-sm font-black text-[#123A68]">المظهر</h2>

          <div className="flex items-center justify-between">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#123A68]" />
            </label>

            <div className="text-right">
              <h3 className="text-xs font-bold text-primary">الوضع المظلم</h3>
              <p className="text-[10.5px] text-text-muted">تغيير مظهر التطبيق</p>
            </div>
          </div>
        </div>

        {/* 3. About App Card */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-3">
          <h2 className="text-sm font-black text-[#123A68]">عن التطبيق</h2>

          <div className="space-y-2.5 text-xs divide-y divide-slate-100">
            <div className="flex justify-between items-center pt-1">
              <span className="font-bold text-primary">1.0.0</span>
              <span className="text-text-muted">الإصدار</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-primary">يوليو 2026</span>
              <span className="text-text-muted">آخر تحديث</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-primary">فريق بطريقك</span>
              <span className="text-text-muted">المطوّر</span>
            </div>
          </div>
        </div>

        {/* Delete Account */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => alert("يرجى التواصل مع الدعم الفني لحذف الحساب")}
            className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
          >
            حذف الحساب
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
