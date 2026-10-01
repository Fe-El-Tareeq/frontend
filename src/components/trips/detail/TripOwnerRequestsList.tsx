import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Check, MessageSquare, ThumbsUp, ThumbsDown, Car } from "lucide-react";
import { EmptyState } from "../../ui/feedback/EmptyState";

export interface TripRequestItem {
  id: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  requesterName: string;
  requesterInitials: string;
  requesterAvatarBg: string;
  requesterRating: number;
  timeAgo: string;
  itemsSummary: string;
  sizeLabel: string;
  weightLabel: string;
  isUrgent: boolean;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

interface TripOwnerRequestsListProps {
  groupedCategories: {
    category: { id: string; name: string; icon: string };
    requests: TripRequestItem[];
  }[];
  isCompleted: boolean;
  onAccept: (req: TripRequestItem) => void;
  onReject: (req: TripRequestItem) => void;
}

export const TripOwnerRequestsList: FC<TripOwnerRequestsListProps> = ({
  groupedCategories,
  isCompleted,
  onAccept,
  onReject,
}) => {
  const navigate = useNavigate();

  if (groupedCategories.length === 0) {
    return (
      <EmptyState
        icon={<Car className="h-8 w-8 text-[#123A68] dark:text-white" />}
        title="لا توجد طلبات في هذا التصنيف"
        description="ستظهر الطلبات الجديدة التي يقدمها المستخدمون هنا فور استلامها."
      />
    );
  }

  return (
    <div className="space-y-4">
      {groupedCategories.map(({ category, requests: catReqs }) => (
        <div key={category.id} className="space-y-2">
          {/* Category Header */}
          <div className="flex items-center justify-between rounded-full bg-red-50/70 dark:bg-red-950/40 px-4 py-2 border border-red-200/60 dark:border-red-900/40 text-xs">
            <span className="text-[11px] font-black text-red-700 dark:text-red-300 bg-white dark:bg-[#102A4C] px-2 py-0.5 rounded-full border border-red-200 dark:border-red-800/50">
              {catReqs.length} طلب
            </span>
            <div className="flex items-center gap-1.5 font-black text-red-700 dark:text-red-300">
              <span>{category.name}</span>
              <span>{category.icon}</span>
            </div>
          </div>

          {/* Category Items */}
          <div className="space-y-2.5">
            {catReqs.map((req) => {
              const isReqAccepted = req.status === "ACCEPTED";
              const isReqPending = req.status === "PENDING";
              const isReqRejected = req.status === "REJECTED";

              return (
                <div
                  key={req.id}
                  className={`rounded-3xl border shadow-xs p-4.5 space-y-3 text-right ${isReqAccepted
                      ? "bg-white dark:bg-[#102A4C] border-emerald-300 dark:border-emerald-600/50 ring-2 ring-emerald-100 dark:ring-emerald-950/40"
                      : isReqRejected
                        ? "bg-white dark:bg-[#102A4C] border-red-200 dark:border-red-900/40"
                        : "bg-white dark:bg-[#102A4C] border-slate-200 dark:border-white/10"
                    }`}
                >
                  {/* Top accepted indicator */}
                  {isReqAccepted && (
                    <div className="flex items-center justify-center gap-1 text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800/40">
                      <Check className="h-4 w-4 stroke-3" />
                      <span>قبلت هذا الطلب</span>
                    </div>
                  )}

                  {/* Requester Info */}
                  <div className="flex items-center justify-between">
                    {/* Requester on RIGHT */}
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-black text-white shrink-0 ${req.requesterAvatarBg}`}
                      >
                        {req.requesterInitials}
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-black text-primary dark:text-white">
                            {req.requesterName}
                          </h4>
                          <span className="text-xs font-bold text-amber-500">
                            ⭐ {req.requesterRating}
                          </span>
                        </div>
                        <span className="text-[10px] text-text-muted dark:text-slate-400">
                          {req.timeAgo}
                        </span>
                      </div>
                    </div>

                    {/* Status on LEFT */}
                    <span
                      className={`rounded-xl px-2.5 py-0.5 text-[10.5px] font-black shrink-0 ${isReqAccepted
                          ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                          : isReqRejected
                            ? "bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300"
                            : "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                        }`}
                    >
                      {isReqAccepted
                        ? "مقبول"
                        : isReqRejected
                          ? "مرفوض"
                          : "بانتظار ردك"}
                    </span>
                  </div>

                  {/* Summary description */}
                  <p className="text-xs text-primary dark:text-slate-200 font-bold text-right">
                    {req.itemsSummary}
                  </p>

                  {/* Badges */}
                  <div className="flex items-center gap-2 text-[10.5px]">
                    {req.isUrgent && (
                      <span className="rounded-full bg-red-50 dark:bg-red-950/40 px-2 py-0.2 font-black text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/40">
                        ⚡ عاجل
                      </span>
                    )}
                    <span className="rounded-lg bg-slate-100 dark:bg-[#0B1E36] px-2 py-0.5 text-text-muted dark:text-slate-300 border border-transparent dark:border-white/5 font-bold">
                      {req.sizeLabel}
                    </span>
                    <span className="rounded-lg bg-slate-100 dark:bg-[#0B1E36] px-2 py-0.5 text-text-muted dark:text-slate-300 border border-transparent dark:border-white/5 font-bold">
                      {req.weightLabel} 📦
                    </span>
                  </div>

                  {/* Actions */}
                  {isReqAccepted && (
                    <button
                      type="button"
                      onClick={() => navigate(`/chat/${req.id}`)}
                      className="w-full flex items-center justify-center gap-2 h-11 rounded-2xl bg-[#123A68] dark:bg-accent text-xs font-black text-white hover:bg-[#0D2C50] dark:hover:bg-accent/90 active:scale-98 transition-all cursor-pointer shadow-xs"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>التواصل معه</span>
                    </button>
                  )}

                  {isReqPending && (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onAccept(req)}
                        className="flex-1 flex items-center justify-center gap-1.5 h-11 rounded-2xl bg-emerald-600 text-xs font-black text-white hover:bg-emerald-700 active:scale-98 transition-all cursor-pointer shadow-xs"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>قبول</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onReject(req)}
                        className="px-4 flex items-center justify-center gap-1.5 h-11 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#132F54] text-xs font-bold text-text-secondary dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 active:scale-98 transition-all cursor-pointer"
                      >
                        <ThumbsDown className="h-4 w-4" />
                        <span>رفض</span>
                      </button>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="flex items-center justify-center gap-1 text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800/40">
                      <Check className="h-4 w-4" />
                      <span>تم التوصيل بنجاح</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
