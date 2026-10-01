import type { FC } from "react";
import { CheckCircle2, Edit2 } from "lucide-react";

interface ErrandRequesterCardProps {
  requesterName: string;
  requesterInitials: string;
  profileImageUrl?: string | null;
  isVerified?: boolean;
  timeAgo: string;
  status: string;
  isOwner: boolean;
  isWaiting: boolean;
  onEdit: () => void;
}

export const ErrandRequesterCard: FC<ErrandRequesterCardProps> = ({
  requesterName,
  requesterInitials,
  profileImageUrl,
  isVerified,
  timeAgo,
  status,
  isOwner,
  isWaiting,
  onEdit,
}) => {
  return (
    <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
      {/* Right: User Identity (RTL First) */}
      <div className="flex items-center gap-3">
        {/* Avatar Circle */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#123A68] text-sm font-bold text-white shrink-0 overflow-hidden shadow-2xs">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={requesterName}
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{requesterInitials}</span>
          )}
        </div>

        {/* User Name & Time */}
        <div className="text-right">
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-black text-[#123A68]">
              {requesterName}
            </h3>
            {isVerified && (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 fill-emerald-50" />
            )}
          </div>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            نشرت هذا الطلب {timeAgo}
          </p>
        </div>
      </div>

      {/* Left: Status Badge & Edit Button (RTL End) */}
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-3.5 py-1 text-xs font-bold border ${
            status === "OPEN"
              ? "bg-[#E8F8F0] text-[#10B981] border-[#D1F2E2]"
              : status === "MATCHED" || status === "IN_TRANSIT"
                ? "bg-blue-50 text-blue-600 border-blue-100"
                : status === "COMPLETED"
                  ? "bg-slate-100 text-slate-600 border-slate-200"
                  : "bg-red-50 text-red-600 border-red-100"
          }`}
        >
          {status === "OPEN"
            ? "مفتوح"
            : status === "MATCHED" || status === "IN_TRANSIT"
              ? "جارٍ التنفيذ"
              : status === "COMPLETED"
                ? "مكتمل"
                : "ملغي"}
        </span>

        {/* Edit Icon for Owner */}
        {isOwner && isWaiting && (
          <button
            type="button"
            onClick={onEdit}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-[#123A68] hover:border-slate-300 transition-colors cursor-pointer"
            title="تعديل الطلب"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
