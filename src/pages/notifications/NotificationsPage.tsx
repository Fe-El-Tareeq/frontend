import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Car, CheckCheck, ChevronRight, MessageSquare, Package, WifiOff, Zap } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useNotifications } from "../../hooks/useNotifications";
import type { AppNotification, NotificationTab, NotificationType } from "../../types";

const tabs: Array<{ value: NotificationTab; label: string }> = [
  { value: "all", label: "الكل" },
  { value: "unread", label: "غير مقروءة" },
  { value: "trips", label: "رحلات" },
  { value: "errands", label: "طلبات" },
  { value: "messages", label: "رسائل" },
];

function iconFor(type: NotificationType) {
  if (type === "NEW_TRIP_IN_AREA") return Car;
  if (type === "NEW_CHAT_MESSAGE") return MessageSquare;
  if (type === "PAYMENT_CONFIRMED") return Zap;
  if (type.includes("ASSIGNMENT") || type === "NEW_PROPOSAL") return Package;
  return Bell;
}

function actionUrl(item: AppNotification) {
  if (item.type === "NEW_CHAT_MESSAGE" && item.metadata?.roomId) return `/chat/${item.metadata.roomId}`;
  if (item.metadata?.errandId) return `/errands/${item.metadata.errandId}`;
  if (item.type === "NEW_TRIP_IN_AREA") return "/trips";
  return null;
}

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<NotificationTab>("all");
  const data = useNotifications(tab);

  const openNotification = async (item: AppNotification) => {
    if (!data.isOffline && !item.isRead) await data.markAsRead(item.id);
    const url = actionUrl(item);
    if (url) navigate(url);
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />
      <div className="space-y-4 px-4 pt-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => navigate(-1)} aria-label="رجوع" className="p-1 text-primary">
              <ChevronRight className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-xl font-black text-[#123A68]">الإشعارات</h1>
              <p className="text-[11px] font-bold text-text-muted">
                {data.unreadCount} غير مقروءة{data.isOffline ? " · عدد محفوظ وقديم" : ""}
              </p>
            </div>
          </div>
          {data.unreadCount > 0 && (
            <button type="button" disabled={data.isOffline} onClick={() => void data.markAllAsRead()} title={data.isOffline ? "يتطلب اتصالاً بالإنترنت" : "تحديد الكل كمقروء"} className="flex items-center gap-1 text-xs font-bold text-[#F36F21] disabled:cursor-not-allowed disabled:opacity-40">
              <CheckCheck className="h-4 w-4" /><span>قراءة الكل</span>
            </button>
          )}
        </div>

        {data.isOffline && (
          <div className="flex items-center gap-2 border-y border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
            <WifiOff className="h-4 w-4 shrink-0" />
            <span>يتم عرض آخر إشعارات محفوظة. إجراءات القراءة متاحة عند عودة الاتصال.</span>
          </div>
        )}

        <div className="flex gap-1 overflow-x-auto rounded-lg bg-slate-100 p-1 text-xs font-bold">
          {tabs.map((item) => (
            <button key={item.value} type="button" onClick={() => setTab(item.value)} className={`shrink-0 px-3 py-2 ${tab === item.value ? "bg-white text-[#123A68] shadow-xs" : "text-text-muted"}`}>
              {item.label}
            </button>
          ))}
        </div>

        {data.isError && data.notifications.length === 0 ? (
          <ErrorState title="تعذر تحميل الإشعارات" message="تحقق من الاتصال وحاول مرة أخرى." />
        ) : data.notifications.length === 0 && !data.isLoading ? (
          <EmptyState icon={<Bell className="h-7 w-7 text-[#123A68]" />} title="لا توجد إشعارات" description="ستظهر الإشعارات الجديدة هنا." />
        ) : (
          <div className="space-y-3">
            {data.notifications.map((item) => {
              const Icon = iconFor(item.type);
              return (
                <button key={item.id} type="button" onClick={() => void openNotification(item)} className="flex w-full items-center gap-3 border-b border-slate-200 bg-white p-4 text-right">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.isRead ? "bg-slate-100 text-slate-500" : "bg-[#123A68] text-white"}`}><Icon className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1">
                    <strong className="block truncate text-sm text-[#123A68]">{item.title}</strong>
                    <span className="block line-clamp-2 text-xs text-text-secondary">{item.message}</span>
                    <time className="mt-1 block text-[10px] text-text-muted">{new Date(item.createdAt).toLocaleString("ar")}</time>
                  </span>
                  {!item.isRead && <span className="h-2.5 w-2.5 rounded-full bg-[#F36F21]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
