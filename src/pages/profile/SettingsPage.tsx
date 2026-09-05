import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Bell,
  Moon,
  Info,
  Trash2,
  Download,
  Smartphone,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { SettingsNotificationToggle } from "../../components/profile/SettingsNotificationToggle";
import { usePWA } from "../../hooks/usePWA";
import { PwaInstallModal } from "../../components/pwa/PwaInstallModal";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { isInstalled, isIOS, triggerInstall } = usePWA();
  const [showInstallModal, setShowInstallModal] = useState(false);

  const [appNotifications, setAppNotifications] = useState(true);
  const [offerNotifications, setOfferNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleDeleteAccount = () => {
    if (
      confirm(
        "هل أنت متأكد من رغبتك في حذف حسابك نهائياً؟ هذا الإجراء لا يمكن التراجع عنه.",
      )
    ) {
      alert("تم إرسال طلب حذف الحساب للإدارة.");
    }
  };

  const handleInstallClick = async () => {
    const result = await triggerInstall();
    if (result === "ios" || result === "fallback") {
      setShowInstallModal(true);
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-black text-[#123A68]">الإعدادات</h1>
        </div>

        {/* Section 0: تثبيت التطبيق على الهاتف */}
        {!isInstalled && (
          <div className="rounded-3xl bg-gradient-to-r from-[#123A68] to-[#0A1F38] p-5 text-white shadow-md space-y-3">
            <div className="flex items-center justify-between">
              {/* Right item in RTL: Icon and Title */}
              <div className="flex items-center gap-3 text-right">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-[#F36F21]">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white">
                    تطبيق بطريقك على هاتفك
                  </h3>
                  <p className="text-[10px] text-white/70">
                    تصفح أسرع وإشعارات فورية
                  </p>
                </div>
              </div>

              {/* Left item in RTL: Install Button */}
              <button
                type="button"
                onClick={handleInstallClick}
                className="flex items-center gap-1.5 rounded-xl bg-[#F36F21] px-3.5 py-2 text-xs font-black text-white shadow-md hover:bg-[#E05E12] active:scale-95 transition-all cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>تثبيت الآن</span>
              </button>
            </div>
          </div>
        )}

        {/* Section 1: الإشعارات والتنبيهات */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-4 text-right">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Bell className="h-4.5 w-4.5 text-[#123A68]" />
            <h2 className="text-sm font-black text-[#123A68]">
              الإشعارات والتنبيهات
            </h2>
          </div>

          <SettingsNotificationToggle
            title="إشعارات التطبيق"
            description="تلقي إشعارات عامة وتحديثات مهمة"
            checked={appNotifications}
            onChange={setAppNotifications}
          />

          <SettingsNotificationToggle
            title="عروض الطلبات"
            description="تنبيه عند تقديم عرض جديد على طلبك"
            checked={offerNotifications}
            onChange={setOfferNotifications}
          />

          <SettingsNotificationToggle
            title="الرسائل والمحادثات"
            description="تنبيه فوري عند استلام رسالة جديدة"
            checked={messageNotifications}
            onChange={setMessageNotifications}
            borderBottom={false}
          />
        </div>

        {/* Section 2: المظهر واللغة */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-4 text-right">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Moon className="h-4.5 w-4.5 text-[#123A68]" />
            <h2 className="text-sm font-black text-[#123A68]">المظهر واللغة</h2>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="text-right">
              <span className="text-xs font-bold text-primary block">
                الوضع الليلي
              </span>
              <span className="text-[10.5px] text-text-muted">
                تفعيل المظهر الداكن المريح للعين
              </span>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#123A68]" />
            </label>
          </div>

          {/* Language Selector */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="text-right">
              <span className="text-xs font-bold text-primary block">
                لغة التطبيق
              </span>
              <span className="text-[10.5px] text-text-muted">
                اللغة الافتراضية للواجهة
              </span>
            </div>

            <select className="h-9 rounded-xl border border-slate-200 bg-[#F8FAFC] px-3 text-xs font-bold text-primary focus:border-accent focus:outline-none cursor-pointer">
              <option value="ar">العربية ⌵</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        {/* Section 3: عن التطبيق */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-3.5 text-right">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Info className="h-4.5 w-4.5 text-[#123A68]" />
            <h2 className="text-sm font-black text-[#123A68]">عن التطبيق</h2>
          </div>

          <button
            type="button"
            onClick={() => navigate("/terms")}
            className="flex w-full items-center justify-between text-xs font-bold text-primary hover:text-[#F36F21] transition-colors cursor-pointer"
          >
            <span>شروط الاستخدام</span>
            <ChevronLeft className="h-4 w-4 text-text-muted" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/terms")}
            className="flex w-full items-center justify-between text-xs font-bold text-primary hover:text-[#F36F21] transition-colors cursor-pointer"
          >
            <span>سياسة الخصوصية</span>
            <ChevronLeft className="h-4 w-4 text-text-muted" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/landing")}
            className="flex w-full items-center justify-between text-xs font-bold text-primary hover:text-[#F36F21] transition-colors cursor-pointer"
          >
            <span>الأسئلة الشائعة</span>
            <ChevronLeft className="h-4 w-4 text-text-muted" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/landing")}
            className="flex w-full items-center justify-between text-xs font-bold text-primary hover:text-[#F36F21] transition-colors cursor-pointer"
          >
            <span>تواصل معنا</span>
            <ChevronLeft className="h-4 w-4 text-text-muted" />
          </button>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-primary">إصدار التطبيق</span>
            <span className="font-mono text-text-muted font-bold">
              1.0.0 (بيتا)
            </span>
          </div>
        </div>

        {/* Section 4: حذف الحساب */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-3 text-right">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-red-600">
            <Trash2 className="h-4.5 w-4.5" />
            <h2 className="text-sm font-black">حذف الحساب</h2>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">
            سيؤدي حذف حسابك إلى مسح كافة بياناتك وسجل رحلاتك وطلباتك نهائياً ولا
            يمكن استرجاعها.
          </p>

          <button
            type="button"
            onClick={handleDeleteAccount}
            className="mt-2 flex h-11 w-full items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-xs font-bold text-red-600 hover:bg-red-100 active:scale-98 transition-all cursor-pointer"
          >
            طلب حذف الحساب
          </button>
        </div>
      </div>

      {/* Installation Instructions Modal */}
      <PwaInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        isIOS={isIOS}
      />
    </MobileContainer>
  );
}
