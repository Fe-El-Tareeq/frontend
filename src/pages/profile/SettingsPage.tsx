import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Shield,
  HelpCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { authApi } from "../../api/auth";
import { useAuthStore } from "../../store/useAuthStore";
import { getApiErrorMessage } from "../../utils/apiError";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const [tripNotifications, setTripNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoadingSettings, setIsLoadingSettings] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch current notification preferences from backend
  useEffect(() => {
    let isMounted = true;
    const loadSettings = async () => {
      try {
        setIsLoadingSettings(true);
        const res = await authApi.getSettings();
        if (isMounted && res.data?.notifications) {
          const n = res.data.notifications;
          if (typeof n.tripAlerts === "boolean") setTripNotifications(n.tripAlerts);
          if (typeof n.chatAlerts === "boolean") setMessageNotifications(n.chatAlerts);
          if (typeof n.errandAlerts === "boolean") setOrderNotifications(n.errandAlerts);
        }
      } catch {
        // Fallback to default state if offline or settings endpoint not configured yet
      } finally {
        if (isMounted) setIsLoadingSettings(false);
      }
    };

    loadSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleToggleNotification = async (
    key: "tripAlerts" | "chatAlerts" | "errandAlerts",
    value: boolean,
  ) => {
    if (key === "tripAlerts") setTripNotifications(value);
    if (key === "chatAlerts") setMessageNotifications(value);
    if (key === "errandAlerts") setOrderNotifications(value);

    try {
      await authApi.updateNotificationSettings({
        notifications: {
          [key]: value,
        },
      });
    } catch {
      // Revert silently on network failure
    }
  };

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "هل أنت متأكد من رغبتك في تعطيل/حذف حسابك؟ سيتم إيقاف ظهور بياناتك وأنشطتك في المنصة.",
      )
    ) {
      try {
        setIsDeleting(true);
        await authApi.deactivateAccount();
        logout();
        alert("تم تعطيل الحساب بنجاح.");
        navigate("/login");
      } catch (err: unknown) {
        const msg = getApiErrorMessage(err, "تعذر تعطيل الحساب، يرجى المحاولة لاحقاً.");
        alert(msg);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="text-right">
          <h1 className="text-2xl font-black text-[#123A68]">الإعدادات</h1>
        </div>

        {/* Section 1: الإشعارات */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-4 text-right">
          <div className="flex items-center justify-between">
            {isLoadingSettings && (
              <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
            )}
            <h2 className="text-base font-black text-[#123A68]">الإشعارات</h2>
          </div>

          {/* Toggle 1: إشعارات الرحلات الجديدة */}
          <div className="flex items-center justify-between">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={tripNotifications}
                onChange={(e) =>
                  handleToggleNotification("tripAlerts", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-12 h-6.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.5px] after:left-[3px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-[#123A68]" />
            </label>

            <div className="text-right space-y-0.5">
              <span className="text-xs font-black text-[#123A68] block">
                إشعارات الرحلات الجديدة
              </span>
              <span className="text-[10.5px] text-text-muted">
                اعلمني عند إضافة رحلة في منطقتك
              </span>
            </div>
          </div>

          {/* Toggle 2: إشعارات الرسائل */}
          <div className="flex items-center justify-between pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={messageNotifications}
                onChange={(e) =>
                  handleToggleNotification("chatAlerts", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-12 h-6.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.5px] after:left-[3px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-[#123A68]" />
            </label>

            <div className="text-right space-y-0.5">
              <span className="text-xs font-black text-[#123A68] block">
                إشعارات الرسائل
              </span>
              <span className="text-[10.5px] text-text-muted">
                اعلمني عند استلام رسائل جديدة
              </span>
            </div>
          </div>

          {/* Toggle 3: إشعارات الطلبات */}
          <div className="flex items-center justify-between pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={orderNotifications}
                onChange={(e) =>
                  handleToggleNotification("errandAlerts", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-12 h-6.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.5px] after:left-[3px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-[#123A68]" />
            </label>

            <div className="text-right space-y-0.5">
              <span className="text-xs font-black text-[#123A68] block">
                إشعارات الطلبات
              </span>
              <span className="text-[10.5px] text-text-muted">
                اعلمني عند تطابق طلباتي
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: المظهر */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-3 text-right">
          <h2 className="text-base font-black text-[#123A68]">المظهر</h2>

          <div className="flex items-center justify-between">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only peer"
              />
              <div className="w-12 h-6.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.5px] after:left-[3px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-[#123A68]" />
            </label>

            <div className="text-right space-y-0.5">
              <span className="text-xs font-black text-[#123A68] block">
                الوضع المظلم
              </span>
              <span className="text-[10.5px] text-text-muted">
                تغيير مظهر التطبيق
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: القانوني والدعم */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-3 text-right">
          <h2 className="text-base font-black text-[#123A68]">القانوني والدعم</h2>

          <div className="space-y-2.5">
            {/* Item 1: الشروط والخصوصية */}
            <button
              type="button"
              onClick={() => navigate("/terms")}
              className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 text-slate-400" />
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-[#123A68]">
                  الشروط والخصوصية
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <Shield className="h-4.5 w-4.5" />
                </div>
              </div>
            </button>

            {/* Item 2: تواصل مع الدعم */}
            <button
              type="button"
              onClick={() => navigate("/settings/support")}
              className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 text-slate-400" />
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-[#123A68]">
                  تواصل مع الدعم
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <HelpCircle className="h-4.5 w-4.5" />
                </div>
              </div>
            </button>

            {/* Item 3: الإبلاغ عن مشكلة */}
            <button
              type="button"
              onClick={() => navigate("/settings/report-issue")}
              className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 text-slate-400" />
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-[#123A68]">
                  الإبلاغ عن مشكلة
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <AlertCircle className="h-4.5 w-4.5" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Section 4: عن التطبيق */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-3 text-right">
          <h2 className="text-base font-black text-[#123A68]">عن التطبيق</h2>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-[#123A68]">1.0.0</span>
              <span className="text-text-muted">الإصدار</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="font-bold text-[#123A68]">يوليو 2026</span>
              <span className="text-text-muted">آخر تحديث</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="font-bold text-[#123A68]">فريق بطريقك</span>
              <span className="text-text-muted">المطوّر</span>
            </div>
          </div>
        </div>

        {/* Delete Account */}
        <div className="text-center pt-2 pb-6">
          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="text-xs font-bold text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            {isDeleting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            <span>حذف الحساب</span>
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}


