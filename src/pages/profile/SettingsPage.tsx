import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Shield,
  HelpCircle,
  AlertCircle,
  Loader2,
  Sun,
  Moon,
  Laptop,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { authApi } from "../../api/auth";
import { useAuthStore } from "../../store/useAuthStore";
import { useTheme } from "../../hooks/useTheme";
import { getApiErrorMessage } from "../../utils/apiError";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { theme, setTheme } = useTheme();

  const [tripNotifications, setTripNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);
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
          const tripVal = n.newTripsEnabled ?? n.tripAlerts;
          const chatVal = n.chatMessagesEnabled ?? n.chatAlerts;
          const reqVal = n.requestUpdatesEnabled ?? n.errandAlerts;
          if (typeof tripVal === "boolean") setTripNotifications(tripVal);
          if (typeof chatVal === "boolean") setMessageNotifications(chatVal);
          if (typeof reqVal === "boolean") setOrderNotifications(reqVal);
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
    key: "trip" | "chat" | "order",
    value: boolean,
  ) => {
    if (key === "trip") setTripNotifications(value);
    if (key === "chat") setMessageNotifications(value);
    if (key === "order") setOrderNotifications(value);

    try {
      const payload =
        key === "trip"
          ? { newTripsEnabled: value, tripAlerts: value }
          : key === "chat"
            ? { chatMessagesEnabled: value, chatAlerts: value }
            : { requestUpdatesEnabled: value, errandAlerts: value };

      await authApi.updateNotificationSettings({
        notifications: payload,
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
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-3xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Title */}
        <div className="text-right">
          <h1 className="text-2xl font-black text-[#123A68] dark:text-white">الإعدادات</h1>
        </div>

        {/* Section 1: المظهر */}
        <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-4 text-right">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-[#123A68] dark:text-white">المظهر</h2>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {/* Light Mode Button */}
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                theme === "light"
                  ? "bg-orange-50/50 dark:bg-orange-950/20 border-accent text-accent shadow-xs"
                  : "bg-slate-50/70 dark:bg-[#0B1E36]/60 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              <Sun className={`h-5 w-5 mb-1.5 ${theme === "light" ? "text-accent" : "text-slate-500 dark:text-slate-400"}`} />
              <span className="text-xs font-bold">فاتح</span>
            </button>

            {/* Dark Mode Button */}
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-orange-50/50 dark:bg-orange-950/20 border-accent text-accent shadow-xs"
                  : "bg-slate-50/70 dark:bg-[#0B1E36]/60 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              <Moon className={`h-5 w-5 mb-1.5 ${theme === "dark" ? "text-accent" : "text-slate-500 dark:text-slate-400"}`} />
              <span className="text-xs font-bold">داكن</span>
            </button>

            {/* System Mode Button */}
            <button
              type="button"
              onClick={() => setTheme("system")}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                theme === "system"
                  ? "bg-orange-50/50 dark:bg-orange-950/20 border-accent text-accent shadow-xs"
                  : "bg-slate-50/70 dark:bg-[#0B1E36]/60 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              <Laptop className={`h-5 w-5 mb-1.5 ${theme === "system" ? "text-accent" : "text-slate-500 dark:text-slate-400"}`} />
              <span className="text-xs font-bold">تلقائي</span>
            </button>
          </div>
        </div>

        {/* Section 2: الإشعارات */}
        <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-4 text-right">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-[#123A68] dark:text-white">الإشعارات</h2>
            {isLoadingSettings && (
              <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
            )}
          </div>

          {/* Toggle 1: إشعارات الرحلات الجديدة */}
          <div className="flex items-center justify-between">
            <div className="text-right space-y-0.5">
              <span className="text-xs font-black text-[#123A68] dark:text-white block">
                إشعارات الرحلات الجديدة
              </span>
              <span className="text-[10.5px] text-text-muted dark:text-slate-400">
                اعلمني عند إضافة رحلة في منطقتك
              </span>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={tripNotifications}
                onChange={(e) =>
                  handleToggleNotification("trip", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-12 h-6.5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.5px] after:right-0.75 after:bg-white after:border-slate-300 dark:after:border-slate-600 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-[#123A68] dark:peer-checked:bg-accent" />
            </label>
          </div>

          {/* Toggle 2: إشعارات الرسائل */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-right space-y-0.5">
              <span className="text-xs font-black text-[#123A68] dark:text-white block">
                إشعارات الرسائل
              </span>
              <span className="text-[10.5px] text-text-muted dark:text-slate-400">
                اعلمني عند استلام رسائل جديدة
              </span>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={messageNotifications}
                onChange={(e) =>
                  handleToggleNotification("chat", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-12 h-6.5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.5px] after:right-0.75 after:bg-white after:border-slate-300 dark:after:border-slate-600 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-[#123A68] dark:peer-checked:bg-accent" />
            </label>
          </div>

          {/* Toggle 3: إشعارات الطلبات */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-right space-y-0.5">
              <span className="text-xs font-black text-[#123A68] dark:text-white block">
                إشعارات الطلبات
              </span>
              <span className="text-[10.5px] text-text-muted dark:text-slate-400">
                اعلمني عند تطابق طلباتي
              </span>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={orderNotifications}
                onChange={(e) =>
                  handleToggleNotification("order", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-12 h-6.5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.5px] after:right-0.75 after:bg-white after:border-slate-300 dark:after:border-slate-600 after:border after:rounded-full after:h-5.5 after:w-5.5 after:transition-all peer-checked:bg-[#123A68] dark:peer-checked:bg-accent" />
            </label>
          </div>
        </div>

        {/* Section 3: القانوني والدعم */}
        <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-3 text-right">
          <h2 className="text-base font-black text-[#123A68] dark:text-white">القانوني والدعم</h2>

          <div className="space-y-2.5">
            {/* Item 1: الشروط والخصوصية */}
            <button
              type="button"
              onClick={() => navigate("/terms")}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0B1E36]/40 hover:bg-slate-50 dark:hover:bg-[#0B1E36] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 text-right">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <Shield className="h-4.5 w-4.5" />
                </div>
                <span className="text-xs font-black text-[#123A68] dark:text-white">
                  الشروط والخصوصية
                </span>
              </div>
              <ChevronLeft className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            </button>

            {/* Item 2: تواصل مع الدعم */}
            <button
              type="button"
              onClick={() => navigate("/settings/support")}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0B1E36]/40 hover:bg-slate-50 dark:hover:bg-[#0B1E36] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 text-right">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <HelpCircle className="h-4.5 w-4.5" />
                </div>
                <span className="text-xs font-black text-[#123A68] dark:text-white">
                  تواصل مع الدعم
                </span>
              </div>
              <ChevronLeft className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            </button>

            {/* Item 3: الإبلاغ عن مشكلة */}
            <button
              type="button"
              onClick={() => navigate("/settings/report-issue")}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0B1E36]/40 hover:bg-slate-50 dark:hover:bg-[#0B1E36] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 text-right">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <AlertCircle className="h-4.5 w-4.5" />
                </div>
                <span className="text-xs font-black text-[#123A68] dark:text-white">
                  الإبلاغ عن مشكلة
                </span>
              </div>
              <ChevronLeft className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            </button>
          </div>
        </div>

        {/* Section 4: عن التطبيق */}
        <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-2xs space-y-3 text-right">
          <h2 className="text-base font-black text-[#123A68] dark:text-white">عن التطبيق</h2>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between pt-1">
              <span className="text-text-muted dark:text-slate-400">الإصدار</span>
              <span className="font-bold text-[#123A68] dark:text-white">1.0.0</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/10">
              <span className="text-text-muted dark:text-slate-400">آخر تحديث</span>
              <span className="font-bold text-[#123A68] dark:text-white">أكتوبر 2026</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/10">
              <span className="text-text-muted dark:text-slate-400">المطوّر</span>
              <span className="font-bold text-[#123A68] dark:text-white">فريق بطريقك</span>
            </div>
          </div>
        </div>

        {/* Delete Account */}
        <div className="text-center pt-2 pb-6">
          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="text-xs font-bold text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            {isDeleting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            <span>حذف الحساب</span>
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}

