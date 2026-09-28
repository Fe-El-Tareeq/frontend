import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
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
  CheckCircle2,
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
  if (!dateStr) return "منذ لحظات";
  const date = new Date(dateStr);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (isNaN(diffSec) || diffSec < 60) return "منذ لحظات";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `منذ ${diffMin} دقيقة`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  const diffDays = Math.floor(diffHours / 24);
  return `منذ ${diffDays} يوم`;
};

const getInitials = (name?: string | null) => {
  if (!name || name === "مستخدم") return "ط";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] || "") + (parts[1][0] || "");
  }
  return name.slice(0, 2);
};

const formatSeconds = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

const ENGLISH_TO_ARABIC_CATEGORIES: Record<string, string> = {
  medication: "دواء / صيدلية",
  medicine: "دواء / صيدلية",
  pharmacy: "دواء / صيدلية",
  documents: "وثائق / أوراق",
  papers: "وثائق / أوراق",
  parcel: "طرد / بضاعة عامة",
  "general parcel": "طرد / بضاعة عامة",
  groceries: "مواد غذائية",
  food: "مواد غذائية",
  clothes: "ملابس / أحذية",
  clothing: "ملابس / أحذية",
  electronics: "إلكترونيات / شواحن",
  "baby supplies": "مستلزمات أطفال",
  "baby care": "مستلزمات أطفال",
  water: "مياه",
  "household supplies": "مستلزمات منزلية",
  home: "مستلزمات منزلية",
  other: "أخرى",
};

const resolveCategory = (
  categoryId?: string | null,
  categoryName?: string | null,
) => {
  if (categoryId) {
    const byId = PRESET_CATEGORIES.find((c) => c.id === categoryId);
    if (byId) return byId;
  }
  if (categoryName) {
    const trimmed = categoryName.trim().toLowerCase();
    const arabicName = ENGLISH_TO_ARABIC_CATEGORIES[trimmed] || categoryName;
    const byName = PRESET_CATEGORIES.find(
      (c) =>
        c.name === arabicName ||
        c.name.toLowerCase() === trimmed ||
        c.name.includes(categoryName) ||
        categoryName.includes(c.name),
    );
    if (byName) return byName;
  }
  return PRESET_CATEGORIES[0];
};

export default function ErrandDetail() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, profile } = useAuth();
  const { tokenBalance } = useWallet();
  const { cancelErrand, isCancelling } = useErrands();

  const { errand, isLoading, isError } = useErrandDetail(id);

  // Audio player state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const simIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Modals state
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const isOwner = Boolean(profile?.id && errand?.requesterId === profile.id);

  // Real or simulated audio duration
  const totalDuration = errand?.voiceNoteDurationSec || 18;

  // Real audio playback integration
  useEffect(() => {
    if (errand?.voiceNoteUrl && /^https?:\/\//i.test(errand.voiceNoteUrl)) {
      const audio = new Audio(errand.voiceNoteUrl);
      audioRef.current = audio;

      audio.ontimeupdate = () => {
        setCurrentTime(Math.round(audio.currentTime));
      };
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };
      audio.onerror = () => {
        setIsPlaying(false);
      };

      return () => {
        audio.pause();
        audioRef.current = null;
      };
    }
  }, [errand?.voiceNoteUrl]);

  // Simulated audio playback fallback
  useEffect(() => {
    if (!audioRef.current && isPlaying) {
      simIntervalRef.current = setInterval(() => {
        setSimulatedProgress((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
    }
    return () => {
      if (simIntervalRef.current) clearInterval(simIntervalRef.current);
    };
  }, [isPlaying, totalDuration]);

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = Math.floor(ratio * totalDuration);

    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    } else {
      setSimulatedProgress(targetTime);
    }
  };

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

  // Dynamic Requester Info
  const requesterName =
    errand.requester?.fullName ||
    (isOwner ? profile?.fullName : null) ||
    "مستخدم مسجل";
  const requesterInitials = getInitials(requesterName);

  // Dynamic Items from API with strict Arabic category resolution
  const rawItems = errand.items || [];
  const displayItems =
    rawItems.length > 0
      ? rawItems.map((it: any, idx: number) => {
        const catConfig = resolveCategory(
          it.categoryId || it.category?.id || errand.categoryId,
          it.categoryName || it.category?.name || errand.category?.name,
        );
        return {
          id: it.id || `item-${idx}`,
          name: it.name,
          itemNote: it.itemNote || it.description || null,
          quantity: it.quantity || 1,
          size: it.size || "SMALL",
          isUrgent: Boolean(it.isUrgent),
          categoryName: catConfig.name,
          categoryIcon: catConfig.icon,
          categoryConfig: catConfig,
        };
      })
      : [
        {
          id: "legacy-single-item",
          name: errand.title || "طلب توصيل أغراض",
          itemNote:
            errand.itemsDescription &&
              !errand.itemsDescription.startsWith("— ملاحظة عامة:")
              ? errand.itemsDescription.split("— ملاحظة عامة:")[0]?.trim() ||
              null
              : null,
          quantity: 1,
          size:
            errand.weightClass === "HEAVY"
              ? "LARGE"
              : errand.weightClass === "MEDIUM"
                ? "MEDIUM"
                : "SMALL",
          isUrgent: errand.isUrgent,
          categoryName: resolveCategory(
            errand.categoryId,
            errand.category?.name,
          ).name,
          categoryIcon: resolveCategory(
            errand.categoryId,
            errand.category?.name,
          ).icon,
          categoryConfig: resolveCategory(
            errand.categoryId,
            errand.category?.name,
          ),
        },
      ];

  // Group items by Arabic category
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

  // Dynamic General Notes from API
  const generalNoteText = (() => {
    if (!errand.itemsDescription) return null;
    if (errand.itemsDescription.includes("— ملاحظة عامة:")) {
      const parts = errand.itemsDescription.split("— ملاحظة عامة:");
      return parts[1]?.trim() || null;
    }
    if (rawItems.length > 0) {
      return errand.itemsDescription.trim();
    }
    return null;
  })();

  // Locations from API
  const cityName =
    errand.destinationKeyword ||
    errand.destinationNeighborhood?.governorate ||
    errand.neighborhood?.governorate ||
    "غير محدد";

  const neighborhoodName =
    errand.destinationNeighborhood?.name ||
    errand.neighborhood?.name ||
    errand.destinationKeyword ||
    "غير محدد";

  // Attached Images from API
  const attachedImages: string[] = [
    ...(errand.images?.map((img) => img.imageUrl) || []),
    ...(errand.imageUrls || []),
  ].filter(Boolean);

  const hasVoiceNote = Boolean(
    errand.voiceNoteUrl || (errand.voiceNoteDurationSec && errand.voiceNoteDurationSec > 0),
  );
  const hasRealAudio = Boolean(
    errand.voiceNoteUrl && /^https?:\/\//i.test(errand.voiceNoteUrl),
  );

  const activeAudioSec = hasRealAudio ? currentTime : simulatedProgress;

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-28 text-right">
      <Header />

      {/* Navigation Top Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <button
          type="button"
          onClick={() => navigate("/errands")}
          className="flex items-center gap-1 text-xs font-black text-[#123A68] hover:text-[#F36F21] transition-colors cursor-pointer py-1.5 px-2 rounded-xl hover:bg-slate-100 -mr-2"
        >
          <ChevronRight className="h-5 w-5 stroke-[2.5]" />
          <span>العودة للطلبات</span>
        </button>

        <span className="text-xs font-bold text-slate-400">
          {isOwner ? "إدارة الطلب" : "عرض تفاصيل الطلب"}
        </span>
      </div>

      <div className="px-4 pt-1 space-y-4">
        {/* Main Details Card */}
        <div className="rounded-[28px] bg-white p-5 border border-slate-100 shadow-xs space-y-4 text-right">
          {/* Top User Header Row */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            {/* Right: User Identity (RTL First) */}
            <div className="flex items-center gap-3">
              {/* Avatar Circle */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#123A68] text-sm font-bold text-white shrink-0 overflow-hidden shadow-2xs">
                {errand.requester?.profileImageUrl ? (
                  <img
                    src={errand.requester.profileImageUrl}
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
                  {errand.requester?.isVerified && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 fill-emerald-50" />
                  )}
                </div>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  نشرت هذا الطلب {formatTimeAgo(errand.createdAt)}
                </p>
              </div>
            </div>

            {/* Left: Status Badge & Edit Button (RTL End) */}
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
          </div>

          {/* Categorized Items Cards */}
          <div className="space-y-3">
            {Object.values(groupedCategories).map((group: any) => {
              const config = group.config || PRESET_CATEGORIES[0];
              return (
                <div
                  key={group.name}
                  className={`rounded-2xl border ${config.cardBorder} overflow-hidden bg-white shadow-2xs`}
                >
                  {/* Category Header with tab color and switched layout matching MultiItemBuilder */}
                  <div
                    className={`flex items-center justify-between px-3.5 py-2.5 ${config.headerBg} border-b ${config.headerBorder}`}
                  >
                    <span
                      className={`text-[11px] font-black ${config.textColor} bg-white px-2 py-0.5 rounded-full border ${config.badgeBorder}`}
                    >
                      {group.items.length}{" "}
                      {group.items.length === 1
                        ? "غرض"
                        : group.items.length === 2
                          ? "غرضان"
                          : "أغراض"}
                    </span>

                    <div
                      className={`flex items-center gap-1.5 text-xs font-black ${config.textColor}`}
                    >
                      <span>{group.icon || "📦"}</span>
                      <span>{group.name}</span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className={`divide-y ${config.dividerColor} bg-white`}>
                    {group.items.map((item: any, idx: number) => (
                      <div
                        key={item.id || idx}
                        className="flex items-start justify-between gap-4 p-4"
                      >
                        {/* Right: Title & Note */}
                        <div className="space-y-1 text-right flex-1">
                          <h4 className="text-sm font-black text-[#123A68]">
                            {item.name}
                          </h4>
                          {item.itemNote && (
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">
                              "{item.itemNote}"
                            </p>
                          )}
                        </div>

                        {/* Left in RTL: Urgent badge, Quantity, Size */}
                        <div className="flex flex-col items-end gap-1 shrink-0 text-left">
                          {item.isUrgent && (
                            <span className="rounded-full bg-red-100/80 px-2.5 py-0.5 text-[10px] font-black text-red-600">
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
              {cityName}
            </span>
          </div>

          {/* 2. Neighborhood Card */}
          <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-100/80 text-right space-y-0.5">
            <span className="text-[11px] text-slate-400 font-medium block">
              الحي
            </span>
            <span className="text-base font-black text-[#123A68] block">
              {neighborhoodName}
            </span>
          </div>

          {/* 3. General Notes & Image Attachment Card */}
          <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-100/80 text-right flex items-center justify-between gap-3">
            {/* Notes Text on Right */}
            <div className="space-y-0.5 text-right flex-1">
              <span className="text-[11px] text-slate-400 font-medium block">
                ملاحظات عامة من الطالب
              </span>
              <p className="text-sm font-black text-[#123A68] leading-relaxed">
                {generalNoteText || "لا توجد ملاحظات إضافية."}
              </p>
            </div>

            {/* Attached Image Thumbnail Icon on Left */}
            {attachedImages.length > 0 ? (
              <button
                type="button"
                onClick={() => setShowImageModal(true)}
                className="relative flex items-center justify-center h-11 w-11 rounded-xl border border-slate-200 bg-white hover:border-[#123A68] transition-all cursor-pointer shrink-0 overflow-hidden shadow-2xs group"
                title="عرض الصور المرفقة"
              >
                <img
                  src={attachedImages[0]}
                  alt="Thumbnail"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                />
              </button>
            ) : (
              <div
                className="p-1.5 text-slate-300 rounded-xl shrink-0 cursor-default"
                title="لا توجد صور مرفقة"
              >
                <ImageIcon className="h-6 w-6 stroke-[1.5]" />
              </div>
            )}
          </div>

          {/* Voice Note Player (Rendered when available) */}
          {hasVoiceNote && (
            <>
              <hr className="border-t border-slate-100 my-2" />
              <div className="space-y-1.5 text-right">
                <span className="text-xs text-slate-500 font-medium block">
                  رسالة صوتية
                </span>
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#F8FAFC] p-3 border border-slate-100/80">
                  {/* Play / Pause Button on the Right in RTL */}
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-xs hover:bg-[#E05E12] active:scale-95 transition-all cursor-pointer shrink-0"
                  >
                    {isPlaying ? (
                      <Pause className="h-4.5 w-4.5 fill-current" />
                    ) : (
                      <Play className="h-4.5 w-4.5 fill-current mr-0.5" />
                    )}
                  </button>

                  {/* Interactive Audio Progress Bar */}
                  <div
                    className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden cursor-pointer"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-[#F36F21] rounded-full transition-all duration-150"
                      style={{
                        width: `${Math.min(
                          100,
                          (activeAudioSec / (totalDuration || 1)) * 100,
                        )}%`,
                      }}
                    />
                  </div>

                  {/* Duration on the Left in RTL */}
                  <span className="text-xs font-bold text-slate-500 min-w-10 text-left">
                    {formatSeconds(activeAudioSec || totalDuration)}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Divider */}
          <hr className="border-t border-slate-100 my-2" />

          {/* Posting Cost Footer */}
          <div className="flex items-center justify-between pt-1">
            {/* Right in RTL: Errand Posting Cost */}
            <div className="text-right space-y-0.5">
              <span className="text-[11px] text-slate-400 font-medium block">
                تكلفة نشر الطلب
              </span>
              <div className="flex items-center justify-start gap-1 font-black text-sm text-[#123A68]">
                <span>
                  {errand.postTokenCost === 1
                    ? "توكن واحد"
                    : `${errand.postTokenCost || 1} توكن`}
                </span>
                <Zap className="h-4 w-4 fill-[#F36F21] text-[#F36F21]" />
              </div>
            </div>

            {/* Left in RTL: User Balance */}
            {tokenBalance !== null && tokenBalance !== undefined && (
              <span className="text-xs text-slate-400 font-medium">
                رصيدك: {tokenBalance} توكن
              </span>
            )}
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
          <div className="relative max-w-sm w-full bg-white rounded-3xl p-4 space-y-3" dir="rtl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-primary">
                الصور المرفقة للطلب
              </h3>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {attachedImages.length > 0 ? (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {attachedImages.map((url, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 max-h-64">
                    <img
                      src={url}
                      alt={`Errand attachment ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
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
