import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Car,
  MessageSquare,
  Package,
  Zap,
  Bell,
  BellRing,
  ChevronRight,
  CheckCheck,
  Send,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { useNotifications } from "../../hooks/useNotifications";
import type {
  AppNotification,
  NotificationType,
} from "../../store/useNotificationStore";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    permission,
    requestPermission,
    sendNotification,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");
  const [testSent, setTestSent] = useState(false);

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "unread") return !n.isRead;
    if (activeTab === "read") return n.isRead;
    return true;
  });

  const handleNotificationClick = (item: AppNotification) => {
    markAsRead(item.id);
    if (item.actionUrl) {
      navigate(item.actionUrl);
    }
  };

  const handleEnablePhoneNotifications = async () => {
    const granted = await requestPermission();
    if (granted) {
      sendNotification({
        title: "تم تفعيل إشعارات الهاتف! 🎉",
        body: "ستصلك الآن تنبيهات الرحلات والطلبات والرسائل أولاً بأول.",
        type: "SYSTEM",
      });
    }
  };

  const handleSendTestNotification = async () => {
    setTestSent(true);
    await sendNotification({
      title: "رحلة جديدة قريبة منك 🚗",
      body: "أحمد خالد يسافر من غزة إلى رفح غداً ١٠:٠٠ ص",
      type: "TRIP",
      actionUrl: "/trips",
      timeAgo: "الآن",
    });
    setTimeout(() => setTestSent(false), 3000);
  };

  // Helper to render exact icon pill matching Figma cards
  const renderIconPill = (type: NotificationType, isRead: boolean) => {
    const isUnread = !isRead;

    const iconClasses = isUnread
      ? "h-5 w-5 text-white"
      : "h-5 w-5 text-[#64748B]";
    const containerClasses = isUnread
      ? "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#123A68] shadow-xs"
      : "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9]";

    switch (type) {
      case "TRIP":
        return (
          <div className={containerClasses}>
            <Car className={iconClasses} />
          </div>
        );
      case "MESSAGE":
        return (
          <div className={containerClasses}>
            <MessageSquare className={iconClasses} />
          </div>
        );
      case "ERRAND":
        return (
          <div className={containerClasses}>
            <Package className={iconClasses} />
          </div>
        );
      case "WALLET":
        return (
          <div className={containerClasses}>
            <Zap className={iconClasses} />
          </div>
        );
      default:
        return (
          <div className={containerClasses}>
            <Bell className={iconClasses} />
          </div>
        );
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Page Header (Title + Mark All As Read) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-xl font-black text-[#123A68]">
                بطاقات الإشعارات
              </h1>
              {unreadCount > 0 && (
                <span className="text-[11px] font-bold text-text-muted">
                  لديك {unreadCount} إشعار غير مقروء
                </span>
              )}
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="flex items-center gap-1 text-xs font-bold text-[#F36F21] hover:underline cursor-pointer"
            >
              <CheckCheck className="h-4 w-4" />
              <span>تحديد الكل كمقروء</span>
            </button>
          )}
        </div>

        {/* PWA Phone Notifications Permission Banner */}
        {permission !== "granted" && (
          <div className="rounded-3xl bg-gradient-to-r from-[#123A68] to-[#0A1F38] p-4 text-white shadow-md space-y-2.5 animate-fade-in">
            <div className="flex items-start justify-between gap-3">
              <button
                type="button"
                onClick={handleEnablePhoneNotifications}
                className="flex items-center gap-1.5 rounded-xl bg-[#F36F21] px-3.5 py-2 text-xs font-black text-white shadow-md hover:bg-[#E05E12] active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <BellRing className="h-4 w-4" />
                <span>تفعيل التنبيهات</span>
              </button>

              <div className="text-right">
                <h3 className="text-xs font-black text-white">
                  إشعارات الهاتف الفورية (PWA Push)
                </h3>
                <p className="text-[10.5px] text-white/75 leading-relaxed mt-0.5">
                  فعّل الإشعارات لتصلك تنبيهات العروض والرسائل والرحلات مباشرة
                  على شاشة قفل هاتفك.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs & Test Notification CTA */}
        <div className="flex items-center justify-between gap-2">
          {/* Tabs */}
          <div className="flex items-center gap-1 rounded-2xl bg-slate-100 p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`rounded-xl px-3 py-1.5 transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-white text-[#123A68] shadow-2xs font-black"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              الكل ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("unread")}
              className={`rounded-xl px-3 py-1.5 transition-all cursor-pointer ${
                activeTab === "unread"
                  ? "bg-white text-[#123A68] shadow-2xs font-black"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              غير مقروءة ({unreadCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("read")}
              className={`rounded-xl px-3 py-1.5 transition-all cursor-pointer ${
                activeTab === "read"
                  ? "bg-white text-[#123A68] shadow-2xs font-black"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              مقروءة ({notifications.length - unreadCount})
            </button>
          </div>

          {/* Test Notification Button */}
          <button
            type="button"
            onClick={handleSendTestNotification}
            disabled={testSent}
            title="تجربة إرسال إشعار فوري على الهاتف أو المتصفح"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-text-secondary hover:bg-slate-50 hover:text-primary active:scale-95 transition-all cursor-pointer shadow-2xs"
          >
            <Send className="h-3 w-3 text-[#F36F21]" />
            <span>{testSent ? "تم الإرسال!" : "إشعار تجريبي"}</span>
          </button>
        </div>

        {/* Notifications List (Matching Exact Figma Cards) */}
        {filteredNotifications.length === 0 ? (
          <EmptyState
            icon={<Bell className="h-7 w-7 text-[#123A68]" />}
            title="لا توجد إشعارات"
            description={
              activeTab === "unread"
                ? "لقد قمت بقراءة جميع الإشعارات."
                : "ستظهر هنا كافة تنبيهات الرحلات والطلبات والرسائل الجديدة."
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`flex items-center justify-between gap-3.5 rounded-3xl bg-white p-4.5 border transition-all cursor-pointer hover:border-slate-300 hover:shadow-xs active:scale-[0.99] ${
                  !item.isRead
                    ? "border-slate-200/90 shadow-2xs"
                    : "border-slate-100 opacity-90"
                }`}
              >
                {/* Right Group: Icon Pill + Texts */}
                <div className="flex items-center gap-3.5 overflow-hidden">
                  {renderIconPill(item.type, item.isRead)}

                  <div className="text-right space-y-0.5 min-w-0">
                    <h3 className="text-sm font-black text-[#123A68] truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-1 leading-snug">
                      {item.body}
                    </p>
                    <span className="text-[10.5px] text-text-muted font-medium block">
                      {item.timeAgo}
                    </span>
                  </div>
                </div>

                {/* Left Group: Orange Unread Indicator Dot */}
                {!item.isRead && (
                  <div className="flex items-center pr-1 shrink-0">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F36F21] ring-4 ring-orange-50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
