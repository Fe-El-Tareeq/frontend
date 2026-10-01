import { useState, useRef, useEffect } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronLeft,
  CheckCheck,
  Car,
  Package,
  MessageSquare,
  Zap,
} from "lucide-react";
import { useNotifications } from "../../hooks/useNotifications";
import type {
  AppNotification,
  NotificationType,
} from "../../store/useNotificationStore";
import { cn } from "../../utils/cn";

interface NotificationDropdownProps {
  className?: string;
}

export const NotificationDropdown: FC<NotificationDropdownProps> = ({
  className,
}) => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleBellClick = () => {
    // On small mobile screens (< 768px), navigate directly to notifications page
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      navigate("/notifications");
      return;
    }
    // On desktop, toggle dropdown list
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (item: AppNotification) => {
    markAsRead(item.id);
    setIsOpen(false);
    if (item.actionUrl) {
      navigate(item.actionUrl);
    } else {
      navigate("/notifications");
    }
  };

  const handleViewMore = () => {
    setIsOpen(false);
    navigate("/notifications");
  };

  const renderIconPill = (type: NotificationType, isRead: boolean) => {
    const isUnread = !isRead;
    const iconClasses = isUnread
      ? "h-4 w-4 text-white"
      : "h-4 w-4 text-[#64748B] dark:text-slate-400";
    const containerClasses = isUnread
      ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#123A68] dark:bg-[#1E4E8C] shadow-2xs"
      : "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-[#0B1E36]";

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

  // Only take top 3 notifications for desktop dropdown
  const topNotifications = notifications.slice(0, 3);

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={handleBellClick}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-[#0B1E36] border border-border dark:border-white/10 text-primary dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#132F54] transition-colors cursor-pointer",
          isOpen && "ring-2 ring-accent/30 bg-slate-100 dark:bg-[#132F54]",
        )}
        aria-label="الإشعارات"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Bell className="h-5 w-5 text-text-secondary dark:text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[#F36F21] px-1 text-[10px] font-black text-white shadow-xs animate-scale-in">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Desktop Dropdown Popover */}
      {isOpen && (
        <div
          dir="rtl"
          className="absolute left-0 mt-2 w-80 sm:w-92 rounded-2xl bg-white dark:bg-[#102A4C] border border-border dark:border-white/10 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 max-w-[calc(100vw-2rem)]"
          role="region"
          aria-label="قائمة الإشعارات المختصرة"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 dark:border-white/10 bg-slate-50/80 dark:bg-[#0B1E36]/80 backdrop-blur-xs">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-primary dark:text-white">
                الإشعارات
              </span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-[#F36F21]/15 text-[#F36F21]">
                  {unreadCount} جديد
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  markAllAsRead();
                }}
                className="text-[11px] font-bold text-accent hover:underline flex items-center gap-1 cursor-pointer"
                title="تمييز جميع الإشعارات كمقروءة"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                <span>تحديد الكل كمقروء</span>
              </button>
            )}
          </div>

          {/* List of maximum 3 notifications */}
          {topNotifications.length === 0 ? (
            <div className="py-8 px-4 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-[#0B1E36] flex items-center justify-center mb-2">
                <Bell className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              </div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                لا توجد إشعارات حالياً
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                ستصلك التنبيهات والرحلات هنا فور وصولها
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/40 dark:divide-white/5 max-h-[360px] overflow-y-auto">
              {topNotifications.map((notif) => (
                <div
                  key={notif.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleItemClick(notif)}
                  onKeyDown={(e) => e.key === "Enter" && handleItemClick(notif)}
                  className={cn(
                    "flex items-start gap-3 p-3.5 hover:bg-slate-50 dark:hover:bg-[#132F54]/70 transition-colors cursor-pointer text-right group",
                    !notif.isRead
                      ? "bg-[#FFF8F3] dark:bg-[#F36F21]/5"
                      : "bg-transparent",
                  )}
                >
                  {renderIconPill(notif.type, notif.isRead)}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span
                        className={cn(
                          "text-xs truncate",
                          !notif.isRead
                            ? "font-black text-primary dark:text-white"
                            : "font-bold text-slate-700 dark:text-slate-300",
                        )}
                      >
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">
                        {notif.timeAgo}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-secondary dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {notif.body}
                    </p>
                  </div>

                  {!notif.isRead && (
                    <span
                      className="w-2 h-2 rounded-full bg-[#F36F21] shrink-0 mt-1.5 shadow-2xs"
                      title="غير مقروء"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Footer: View More Button */}
          <div className="p-2.5 border-t border-border/60 dark:border-white/10 bg-slate-50/70 dark:bg-[#0B1E36]/70">
            <button
              type="button"
              onClick={handleViewMore}
              className="w-full py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black text-accent hover:bg-orange-50 dark:hover:bg-[#F36F21]/15 transition-all cursor-pointer group"
            >
              <span>عرض المزيد من الإشعارات</span>
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
