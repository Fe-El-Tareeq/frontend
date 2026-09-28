import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  Pause,
  Send,
  Zap,
  Package,
  MapPin,
  Eye,
  Star,
  Trash2,
  Edit2,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { CancelErrandModal } from "../../components/modals/CancelErrandModal";
import { useErrandDetail, useErrands } from "../../hooks/useErrands";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";
import { PRESET_CATEGORIES } from "../../types/errands";

const formatSize = (size?: string) => {
  switch (size) {
    case "ENVELOPE":
      return "ظرف";
    case "SMALL":
      return "صغير";
    case "MEDIUM":
      return "متوسط";
    case "LARGE":
      return "كبير";
    default:
      return "صغير";
  }
};

const formatTimeAgo = (dateStr?: string) => {
  if (!dateStr) return "منذ 40 دقيقة";
  const date = new Date(dateStr);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (isNaN(diffSec) || diffSec < 60) return "الآن";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `منذ ${diffMin} دقيقة`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  const diffDays = Math.floor(diffHours / 24);
  return `منذ ${diffDays} يوم`;
};

const getInitials = (name?: string | null) => {
  if (!name) return "فع";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return parts[0].slice(0, 1) + parts[1].slice(0, 1);
  }
  return parts[0].slice(0, 2);
};

export default function ErrandDetail() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, profile } = useAuth();
  const { tokenBalance } = useWallet();
  const { cancelErrand, isCancelling } = useErrands();

  const { errand, isLoading, isError } = useErrandDetail(id);

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(13); // Default sample matching mockup (13s / 18s)
  const audioIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioDuration = errand?.voiceNoteDurationSec || 18;

  // Modals state
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const isOwner = Boolean(profile?.id && errand?.requesterId === profile.id);

  // Manage voice note audio playback simulation / live audio
  useEffect(() => {
    if (isPlaying) {
      audioIntervalRef.current = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= audioDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isPlaying, audioDuration]);

  if (isLoading) {
    return (
      <MobileContainer className="bg-[#F8FAFC] pb-12 text-right">
        <Header />
        <div className="p-5">
          <div className="h-64 w-full animate-pulse rounded-3xl bg-white border border-border" />
        </div>
      </MobileContainer>
    );
  }

  if (isError) {
    return (
      <MobileContainer className="bg-[#F8FAFC] pb-12 text-right">
        <Header />
        <div className="p-5">
          <ErrorState
            title="تعذر تحميل تفاصيل الطلب"
            message="حدث خطأ أثناء جلب بيانات الطلب من الخادم."
            onRetry={() => window.location.reload()}
          />
        </div>
      </MobileContainer>
    );
  }

  if (!errand) {
    return (
      <MobileContainer className="bg-[#F8FAFC] pb-12 text-right">
        <Header />
        <div className="p-5">
          <EmptyState
            icon={<Package className="h-7 w-7 text-[#123A68]" />}
            title="الطلب غير موجود"
            description="لم نتمكن من العثور على تفاصيل هذا الطلب، ربما تم إنجازه أو حذفه."
            actionText="العودة للطلبات"
            onAction={() => navigate("/errands")}
          />
        </div>
      </MobileContainer>
    );
  }

  const isWaiting = errand.status === "OPEN";
  const isInProgress =
    errand.status === "MATCHED" || errand.status === "IN_TRANSIT";
  const isCompleted = errand.status === "COMPLETED";

  // Parse items from errand
  const rawItems = (errand as any).items || [];
  const displayItems =
    rawItems.length > 0
      ? rawItems.map((it: any) => {
        const matchedCategory = PRESET_CATEGORIES.find(
          (c) => c.id === it.categoryId || c.name === it.category?.name,
        );
        return {
          id: it.id,
          name: it.name,
          itemNote: it.itemNote || it.description,
          quantity: it.quantity || 1,
          size: it.size || "SMALL",
          isUrgent: Boolean(it.isUrgent),
          categoryName:
            it.category?.name ||
            matchedCategory?.name ||
            "دواء / صيدلية",
          categoryIcon: matchedCategory?.icon || "💊",
          categoryConfig: matchedCategory || PRESET_CATEGORIES[0],
        };
      })
      : [
        {
          id: "default-single-item",
          name: errand.title || "دواء اكامول",
          itemNote:
            errand.itemsDescription?.split("— ملاحظة عامة:")[0]?.trim() ||
            "بدي شريطين سعر الشريط 5ش",
          quantity: 2,
          size:
            errand.weightClass === "HEAVY"
              ? "LARGE"
              : errand.weightClass === "MEDIUM"
                ? "MEDIUM"
                : "SMALL",
          isUrgent: errand.isUrgent,
          categoryName: errand.category?.name || "دواء / صيدلية",
          categoryIcon: "💊",
          categoryConfig: PRESET_CATEGORIES[0],
        },
      ];

  // Group items by category name
  const groupedCategories = displayItems.reduce((acc: any, it: any) => {
    const key = it.categoryName;
    if (!acc[key]) {
      acc[key] = {
        name: it.categoryName,
        icon: it.categoryIcon,
        config: it.categoryConfig,
        items: [],
      };
    }
    acc[key].items.push(it);
    return acc;
  }, {});

  // Extract general notes
  const generalNotes =
    errand.itemsDescription && errand.itemsDescription.includes("— ملاحظة عامة:")
      ? errand.itemsDescription.split("— ملاحظة عامة:")[1]?.trim()
      : errand.itemsDescription || "يرجى توصيله لباب المنزل";

  // Attached images
  const attachedImages =
    (errand as any).images?.map((img: any) => img.imageUrl) ||
    (errand as any).imageUrls ||
    [];

  // Format audio seconds as 0:SS
  const formatAudioTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-28 text-right">
      <Header />

      <div className="px-4 pt-3 space-y-4">
        {/* Main Details Card - Exactly Matching Design */}
        <div className="rounded-[28px] bg-white p-5 border border-slate-100 shadow-xs space-y-4 text-right">
          {/* Top User Header Row */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            {/* Left Actions: Status Badge & Edit Button */}
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-3.5 py-1 text-xs font-bold border ${errand.status === "OPEN"
                    ? "bg-[#E8F8F0] text-[#10B981] border-[#D1F2E2]"
                    : errand.status === "MATCHED" ||
                      errand.status === "IN_TRANSIT"
                      ? "bg-blue-50 text-blue-600 border-blue-100"
                      : errand.status === "COMPLETED"
                        ? "bg-slate-100 text-slate-600 border-slate-200"
                        : "bg-red-50 text-red-600 border-red-100"
                  }`}
              >
                {errand.status === "OPEN"
                  ? "مفتوح"
                  : errand.status === "MATCHED" ||
                    errand.status === "IN_TRANSIT"
                    ? "جارٍ التنفيذ"
                    : errand.status === "COMPLETED"
                      ? "مكتمل"
                      : "ملغي"}
              </span>

              {/* Edit Icon for Owner */}
              {isOwner && isWaiting && (
                <button
                  type="button"
                  onClick={() => navigate(`/errands/${id}/edit`)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-[#123A68] hover:border-slate-300 transition-colors cursor-pointer"
                  title="تعديل الطلب"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Right User Identity */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <h3 className="text-base font-black text-[#123A68]">
                  {errand.requester?.fullName ||
                    (isOwner ? profile?.fullName : "هديل محمد")}
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  نشرت هذا الطلب {formatTimeAgo(errand.createdAt)}
                </p>
              </div>

              {/* Avatar Circle */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#123A68] text-sm font-bold text-white shrink-0">
                {errand.requester?.profileImageUrl ? (
                  <img
                    src={errand.requester.profileImageUrl}
                    alt="User"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(
                    errand.requester?.fullName ||
                    (isOwner ? profile?.fullName : "هديل محمد"),
                  )
                )}
              </div>
            </div>
          </div>

          {/* Categorized Items Cards */}
          <div className="space-y-3">
            {Object.values(groupedCategories).map((group: any) => {
              const config = group.config;
              return (
                <div
                  key={group.name}
                  className={`rounded-2xl border ${config.cardBorder || "border-red-200"} overflow-hidden bg-white shadow-2xs`}
                >
                  {/* Category Header */}
                  <div
                    className={`flex items-center justify-between px-4 py-2.5 ${config.headerBg || "bg-red-50/80"} border-b ${config.headerBorder || "border-red-200/60"}`}
                  >
                    <span className="text-xs font-bold text-red-500">
                      {group.items.length}{" "}
                      {group.items.length === 1
                        ? "غرض"
                        : group.items.length === 2
                          ? "غرضان"
                          : "أغراض"}
                    </span>
                    <div className="flex items-center gap-1.5 font-bold text-sm text-red-600">
                      <span>{group.name}</span>
                      <span>{group.icon || "💊"}</span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="p-4 space-y-3">
                    {group.items.map((item: any, idx: number) => (
                      <div
                        key={item.id || idx}
                        className={`flex items-start justify-between gap-4 ${idx > 0
                            ? "pt-3 border-t border-slate-100"
                            : ""
                          }`}
                      >
                        {/* Left Metadata: Urgent badge, Quantity, Size */}
                        <div className="flex flex-col items-start gap-1 shrink-0 text-left">
                          {item.isUrgent && (
                            <span className="rounded-full bg-red-100/80 px-2.5 py-0.5 text-[10px] font-black text-red-600 self-start">
                              عاجل
                            </span>
                          )}
                          <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                            <span>الكمية:</span>
                            <span className="font-bold text-slate-700">
                              {item.quantity}x
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                            <span>الحجم:</span>
                            <span className="font-bold text-slate-700">
                              {formatSize(item.size)}
                            </span>
                          </div>
                        </div>

                        {/* Right Content: Title & Notes */}
                        <div className="space-y-1 text-right flex-1">
                          <h4 className="text-sm font-black text-[#123A68]">
                            {item.name}
                          </h4>
                          {item.itemNote && (
                            <p className="text-xs text-slate-400 font-medium">
                              "{item.itemNote}"
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 1. City Card */}
          <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-100/80 text-right space-y-0.5">
            <span className="text-[11px] text-slate-400 font-medium block">
              المدينة المطلوبة
            </span>
            <span className="text-base font-black text-[#123A68] block">
              {errand.destinationKeyword || "غزة"}
            </span>
          </div>

          {/* 2. Neighborhood Card */}
          <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-100/80 text-right space-y-0.5">
            <span className="text-[11px] text-slate-400 font-medium block">
              الحي
            </span>
            <span className="text-base font-black text-[#123A68] block">
              {(errand as any).destinationNeighborhood?.name ||
                errand.neighborhood?.name ||
                "الرمال"}
            </span>
          </div>

          {/* 3. General Notes from Requester with Image Thumbnail Icon */}
          <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-100/80 text-right flex items-center justify-between gap-3">
            {/* Image Thumbnail Icon on Left */}
            <button
              type="button"
              onClick={() => setShowImageModal(true)}
              className="p-1 text-slate-400 hover:text-[#123A68] transition-colors rounded-xl cursor-pointer shrink-0"
              title="عرض الصورة المرفقة"
            >
              <ImageIcon className="h-6 w-6 stroke-[1.6]" />
            </button>

            {/* Notes text on Right */}
            <div className="space-y-0.5 text-right flex-1">
              <span className="text-[11px] text-slate-400 font-medium block">
                ملاحظات عامة من الطالب
              </span>
              <p className="text-sm font-black text-[#123A68]">
                {generalNotes}
              </p>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-t border-slate-100 my-2" />

          {/* Voice Note Player (رسالة صوتية) */}
          <div className="space-y-1.5 text-right">
            <span className="text-xs text-slate-500 font-medium block">
              رسالة صوتية
            </span>
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#F8FAFC] p-3 border border-slate-100/80">
              {/* Duration on the left in RTL */}
              <span className="text-xs font-bold text-slate-500 min-w-10">
                {formatAudioTime(audioProgress)}
              </span>

              {/* Interactive Audio Progress Bar */}
              <div
                className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  setAudioProgress(Math.floor(ratio * audioDuration));
                }}
              >
                <div
                  className="h-full bg-[#F36F21] rounded-full transition-all duration-150"
                  style={{
                    width: `${Math.min(100, (audioProgress / audioDuration) * 100)}%`,
                  }}
                />
              </div>

              {/* Orange Play / Pause Button on the right in RTL */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-xs hover:bg-[#E05E12] active:scale-95 transition-all cursor-pointer shrink-0"
              >
                {isPlaying ? (
                  <Pause className="h-4.5 w-4.5 fill-current" />
                ) : (
                  <Play className="h-4.5 w-4.5 fill-current mr-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-t border-slate-100 my-2" />

          {/* Posting Cost Footer */}
          <div className="flex items-center justify-between pt-1">
            {/* Left: User Balance */}
            <span className="text-xs text-slate-400 font-medium">
              رصيدك: {tokenBalance ?? 47} توكن
            </span>

            {/* Right: Errand Posting Cost */}
            <div className="text-right space-y-0.5">
              <span className="text-[11px] text-slate-400 font-medium block">
                تكلفة نشر الطلب
              </span>
              <div className="flex items-center justify-end gap-1 font-black text-sm text-[#123A68]">
                <span>توكن واحد</span>
                <Zap className="h-4 w-4 fill-[#F36F21] text-[#F36F21]" />
              </div>
            </div>
          </div>
        </div>

        {/* Owner View Action Buttons */}
        {isOwner && (
          <div className="space-y-2 pt-1">
            {isWaiting && (
              <button
                type="button"
                onClick={() => navigate(`/errands/${id}/offers`)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#0D2C50]"
              >
                <Eye className="h-4 w-4" />
                <span>عرض العروض الواردة على هذا الطلب</span>
              </button>
            )}

            {isInProgress && (
              <button
                type="button"
                onClick={() => navigate(`/errands/${id}/tracking`)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#E05E12]"
              >
                <MapPin className="h-4 w-4" />
                <span>تتبع حالة توصيل الطلب</span>
              </button>
            )}

            {isCompleted && (
              <button
                type="button"
                onClick={() => navigate(`/errands/${id}/rating`)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-emerald-700"
              >
                <Star className="h-4 w-4 fill-current" />
                <span>تقييم تجربة التوصيل والمسافر</span>
              </button>
            )}

            {/* Cancel errand option for owner if still open */}
            {isWaiting && (
              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50/50 text-xs font-bold text-red-600 active:scale-98 transition-all cursor-pointer hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                <span>إلغاء هذا الطلب</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Cancel Errand Modal */}
      <CancelErrandModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        isCancelling={isCancelling}
        onConfirm={async () => {
          try {
            await cancelErrand(id);
            navigate("/errands");
          } catch {
            // Handled
          }
        }}
      />

      {/* Image Preview Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative max-w-sm w-full bg-white rounded-3xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-xs font-bold text-primary">
                الصورة المرفقة للطلب
              </h3>
            </div>
            {attachedImages.length > 0 ? (
              <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-72">
                <img
                  src={attachedImages[0]}
                  alt="Errand attachment"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-text-muted space-y-2">
                <ImageIcon className="h-10 w-10 text-slate-300 mx-auto" />
                <p>لم يتم إرفاق صور إضافية مع هذا الطلب.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sticky Bottom Offer Proposal Button for non-owners */}
      {!isOwner && isWaiting && (
        <div className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-107.5 bg-white/95 backdrop-blur-md border-t border-border p-3.5 shadow-lg">
          <button
            type="button"
            onClick={() => {
              if (!isAuthenticated) {
                navigate("/login");
              } else {
                navigate(`/errands/${id}/offer`);
              }
            }}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#E05E12]"
          >
            <Send className="h-4 w-4 -rotate-45" />
            <span>قدم عرضك لتوصيل الطلب (1 توكن)</span>
          </button>
        </div>
      )}
    </MobileContainer>
  );
}


