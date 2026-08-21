import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Truck,
  Coins,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { AppLayout } from "../../components/layout/AppLayout";

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: "ERRAND" | "TRIP" | "WALLET" | "SYSTEM";
  createdAt: string;
  isRead: boolean;
  actionUrl?: string;
}

export default function NotificationsPage() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "notif-1",
      title: "تم قبول مشوارك!",
      body: "وافق المسافر عمر خليل على توصيل طلب الأدوية وهو في الطريق إلى الصيدلية.",
      type: "ERRAND",
      createdAt: "منذ 5 دقائق",
      isRead: false,
      actionUrl: "/errands/1/tracking",
    },
    {
      id: "notif-2",
      title: "تمت إضافة 3 عملات ترحيبية 🎉",
      body: "أهلاً بك في مجتمع في الطريق! تم شحن محفظتك بـ 3 عملات مجانية لنشر أولى طلباتك.",
      type: "WALLET",
      createdAt: "منذ ساعتين",
      isRead: false,
      actionUrl: "/wallet",
    },
    {
      id: "notif-3",
      title: "طلب جديد متطابق مع مسارك",
      body: "يوجد طلب توصيل جديد بالقرب من مسارك من الجامعة إلى السرايا بأجر 5 ₪.",
      type: "TRIP",
      createdAt: "أمس",
      isRead: true,
      actionUrl: "/trips/match-feed",
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "ERRAND":
        return <Truck className="h-5 w-5 text-accent" />;
      case "WALLET":
        return <Coins className="h-5 w-5 text-success" />;
      case "TRIP":
        return <Sparkles className="h-5 w-5 text-primary" />;
      default:
        return <Bell className="h-5 w-5 text-text-muted" />;
    }
  };

  return (
    <AppLayout
      headerProps={{
        title: "مركز الإشعارات",
        subtitle: "تنبيهات الطلبات والرحلات والمحفظة",
        showBack: true,
      }}
      showBottomNav={false}
    >
      <div className="space-y-4 pb-8">
        {/* Actions header */}
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-text-secondary font-medium">
            لديك {notifications.filter((n) => !n.isRead).length} إشعارات جديدة
          </span>
          <button
            type="button"
            onClick={markAllRead}
            className="text-[12px] font-bold text-accent hover:underline"
          >
            تحديد الكل كمقروء
          </button>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="rounded-[20px] bg-white p-8 text-center border border-border shadow-sm mt-8">
            <Bell className="h-12 w-12 text-text-muted mx-auto mb-3" />
            <h3 className="text-[16px] font-bold text-primary">
              لا توجد إشعارات حالياً
            </h3>
            <p className="text-[13px] text-text-secondary mt-1 max-w-xs mx-auto">
              ستصلك هنا التنبيهات فور قبول طلباتك أو عند مطابقة مشاوير في منطقتك.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => n.actionUrl && navigate(n.actionUrl)}
                className={`flex items-start justify-between p-4 rounded-[18px] border transition-all cursor-pointer ${
                  !n.isRead
                    ? "bg-white border-accent/40 shadow-sm"
                    : "bg-white/70 border-border/70 text-text-secondary"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-background">
                    {getIcon(n.type)}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-[14px] font-bold ${
                          !n.isRead ? "text-primary" : "text-text-secondary"
                        }`}
                      >
                        {n.title}
                      </h4>
                      {!n.isRead && (
                        <span className="h-2 w-2 rounded-full bg-accent" />
                      )}
                    </div>
                    <p className="text-[12px] text-text-secondary mt-1 leading-relaxed">
                      {n.body}
                    </p>
                    <span className="text-[10px] text-text-muted mt-1.5 block">
                      {n.createdAt}
                    </span>
                  </div>
                </div>

                {n.actionUrl && (
                  <ChevronLeft className="h-5 w-5 text-text-muted shrink-0 mt-2" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
