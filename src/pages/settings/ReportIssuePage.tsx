import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  AlertCircle,
  Package,
  XCircle,
  UserX,
  Clock,
  RefreshCw,
  MoreHorizontal,
  Home,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { supportApi } from "../../api/support";
import { chatApi } from "../../api/chat";

// Modular sub-components
import {
  ReportStep1CategorySelection,
  type IssueCategory,
} from "../../components/settings/report/ReportStep1CategorySelection";
import {
  ReportStep2DetailsForm,
  type RecentUser,
} from "../../components/settings/report/ReportStep2DetailsForm";
import { ReportStep3SuccessConfirmation } from "../../components/settings/report/ReportStep3SuccessConfirmation";

const CATEGORIES: IssueCategory[] = [
  {
    id: "fraud",
    title: "احتيال أو نصب",
    subtitle: "محاولة خداع أو نصب مالي",
    icon: AlertCircle,
    colorClass: "text-rose-600",
    iconBgClass: "bg-rose-500 text-white",
  },
  {
    id: "prohibited_item",
    title: "غرض محظور أو خطر",
    subtitle: "نقل مواد مخالفة للقانون",
    icon: Package,
    colorClass: "text-orange-600",
    iconBgClass: "bg-orange-500 text-white",
  },
  {
    id: "abuse",
    title: "سلوك مسيء أو تهديد",
    subtitle: "إساءة لفظية أو تحرش",
    icon: XCircle,
    colorClass: "text-rose-600",
    iconBgClass: "bg-rose-500 text-white",
  },
  {
    id: "fake_account",
    title: "حساب وهمي",
    subtitle: "انتحال هوية شخص آخر",
    icon: UserX,
    colorClass: "text-amber-600",
    iconBgClass: "bg-amber-500 text-white",
  },
  {
    id: "punctuality",
    title: "عدم التزام بالموعد",
    subtitle: "مسافر لم يحضر أو لم يُسلّم",
    icon: Clock,
    colorClass: "text-[#123A68]",
    iconBgClass: "bg-[#123A68] text-white",
  },
  {
    id: "damaged_item",
    title: "غرض تالف أو مفقود",
    subtitle: "ضرر أو فقدان خلال النقل",
    icon: Package,
    colorClass: "text-purple-600",
    iconBgClass: "bg-purple-600 text-white",
  },
  {
    id: "tech_issue",
    title: "خلل تقني",
    subtitle: "مشكلة في التطبيق أو الموقع",
    icon: RefreshCw,
    colorClass: "text-emerald-600",
    iconBgClass: "bg-emerald-600 text-white",
  },
  {
    id: "other",
    title: "أخرى",
    subtitle: "مشكلة لا تندرج في الفئات",
    icon: MoreHorizontal,
    colorClass: "text-slate-600",
    iconBgClass: "bg-slate-600 text-white",
  },
];

export default function ReportIssuePage() {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<string>("fraud");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [description, setDescription] = useState("");
  const [priority, setPriority] =
    useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [attachChatLogs, setAttachChatLogs] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportReferenceId, setReportReferenceId] =
    useState<string>("RPT-V04SIJ");

  useEffect(() => {
    let isMounted = true;
    chatApi
      .getRooms()
      .then((res) => {
        if (isMounted && res.data?.rooms && res.data.rooms.length > 0) {
          const users: RecentUser[] = res.data.rooms
            .filter((room) => room.peer)
            .map((room) => {
              const name = room.peer?.fullName || "مستخدم";
              const initials = name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2);
              return {
                id: room.peer?.id || room.id,
                name,
                role: room.assignment?.errand?.title
                  ? `طلب: ${room.assignment.errand.title}`
                  : "محادثة سابقة",
                avatar: initials || "م",
                color: "bg-[#123A68]",
              };
            });
          setRecentUsers(users);
        } else if (isMounted) {
          setRecentUsers([]);
        }
      })
      .catch(() => {
        if (isMounted) setRecentUsers([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedCategory =
    CATEGORIES.find((c) => c.id === selectedCategoryId) || CATEGORIES[0];

  const handleSubmitReport = async (e: FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await supportApi.createReport({
        type: "FRAUD_OR_SCAM",
        description: description.trim(),
        reportedUserId: selectedUser || undefined,
        attachChatHistory: attachChatLogs,
      });

      if (res.data?.report?.id) {
        setReportReferenceId(res.data.report.id.slice(0, 8).toUpperCase());
      }
      setStep(3);
    } catch {
      setStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68] dark:text-white">
              الإبلاغ عن مشكلة
            </h1>
            <p className="text-xs text-text-secondary dark:text-slate-400 mt-0.5">
              نأخذ جميع البلاغات بجدية لحماية مجتمع بطريقك
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-accent dark:hover:text-accent transition-colors cursor-pointer"
              title="الصفحة الرئيسية"
            >
              <Home className="h-4 w-4" />
              <span>الرئيسية</span>
            </button>
            <button
              type="button"
              onClick={() => typeof window !== "undefined" && window.history.length > 1 ? navigate(-1) : navigate("/home")}
              aria-label="الرجوع للخلف"
              className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {step === 1 && (
          <ReportStep1CategorySelection
            categories={CATEGORIES}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
            onProceed={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <ReportStep2DetailsForm
            selectedCategory={selectedCategory}
            recentUsers={recentUsers}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            description={description}
            setDescription={setDescription}
            priority={priority}
            setPriority={setPriority}
            attachChatLogs={attachChatLogs}
            setAttachChatLogs={setAttachChatLogs}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmitReport}
            onPrev={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <ReportStep3SuccessConfirmation
            reportReferenceId={reportReferenceId}
            onGoHome={() => navigate("/home")}
            onGoSupport={() => navigate("/settings/support")}
          />
        )}
      </div>
    </MobileContainer>
  );
}
