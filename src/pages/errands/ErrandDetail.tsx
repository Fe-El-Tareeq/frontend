import { useState, useRef, useEffect, type MouseEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { CancelErrandModal } from "../../components/modals/CancelErrandModal";
import { useErrandDetail, useErrands } from "../../hooks/useErrands";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";
import { PRESET_CATEGORIES } from "../../types/errands";

// Modular sub-components
import { ErrandDetailNavHeader } from "../../components/errands/detail/ErrandDetailNavHeader";
import { ErrandRequesterCard } from "../../components/errands/detail/ErrandRequesterCard";
import { ErrandCategorizedItems } from "../../components/errands/detail/ErrandCategorizedItems";
import { ErrandLocationNotesCard } from "../../components/errands/detail/ErrandLocationNotesCard";
import { ErrandVoicePlayer } from "../../components/errands/detail/ErrandVoicePlayer";
import { ErrandCostSummary } from "../../components/errands/detail/ErrandCostSummary";
import { ErrandActionButtons } from "../../components/errands/detail/ErrandActionButtons";
import { ErrandImageModal } from "../../components/errands/detail/ErrandImageModal";

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

  const handleSeek = (e: MouseEvent<HTMLDivElement>) => {
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
      <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-12 text-right">
        <Header />
        <div className="p-5">
          <div className="h-64 w-full animate-pulse rounded-3xl bg-white dark:bg-[#102A4C] border border-border dark:border-white/10" />
        </div>
      </MobileContainer>
    );
  }

  if (isError) {
    return (
      <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-12 text-right">
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
      <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-12 text-right">
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
    errand.voiceNoteUrl ||
      (errand.voiceNoteDurationSec && errand.voiceNoteDurationSec > 0),
  );
  const hasRealAudio = Boolean(
    errand.voiceNoteUrl && /^https?:\/\//i.test(errand.voiceNoteUrl),
  );

  const activeAudioSec = hasRealAudio ? currentTime : simulatedProgress;

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-28 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        <ErrandDetailNavHeader
          onBack={() => navigate("/errands")}
          isOwner={isOwner}
        />

        {/* Main Details Card */}
        <div className="rounded-[28px] bg-white dark:bg-[#102A4C] p-5 border border-slate-100 dark:border-white/10 shadow-xs space-y-4 text-right">
          <ErrandRequesterCard
            requesterName={requesterName}
            requesterInitials={requesterInitials}
            profileImageUrl={errand.requester?.profileImageUrl}
            isVerified={errand.requester?.isVerified}
            timeAgo={formatTimeAgo(errand.createdAt)}
            status={errand.status}
            isOwner={isOwner}
            isWaiting={isWaiting}
            onEdit={() => navigate(`/errands/${id}/edit`)}
          />

          <ErrandCategorizedItems
            groupedCategories={groupedCategories}
            formatSize={formatSize}
          />

          <ErrandLocationNotesCard
            cityName={cityName}
            neighborhoodName={neighborhoodName}
            generalNoteText={generalNoteText}
            attachedImages={attachedImages}
            onOpenImageModal={() => setShowImageModal(true)}
          />

          <ErrandVoicePlayer
            hasVoiceNote={hasVoiceNote}
            isPlaying={isPlaying}
            activeAudioSec={activeAudioSec}
            totalDuration={totalDuration}
            onTogglePlay={handleTogglePlay}
            onSeek={handleSeek}
            formatSeconds={formatSeconds}
          />

          <hr className="border-t border-slate-100 dark:border-white/10 my-2" />

          <ErrandCostSummary
            postTokenCost={errand.postTokenCost}
            tokenBalance={tokenBalance}
          />
        </div>

        <ErrandActionButtons
          isOwner={isOwner}
          isWaiting={isWaiting}
          isInProgress={isInProgress}
          isCompleted={isCompleted}
          onViewOffers={() => navigate(`/errands/${id}/offers`)}
          onTrackOrder={() => navigate(`/errands/${id}/tracking`)}
          onRateErrand={() => navigate(`/errands/${id}/rating`)}
          onOpenCancelModal={() => setShowCancelModal(true)}
          onSubmitOffer={() => {
            if (!isAuthenticated) {
              navigate("/login");
            } else {
              navigate(`/errands/${id}/offer`);
            }
          }}
        />
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
      <ErrandImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        attachedImages={attachedImages}
      />
    </MobileContainer>
  );
}
