import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ShieldAlert,
  AlertCircle,
  Package,
  XCircle,
  UserX,
  Clock,
  RefreshCw,
  MoreHorizontal,
  ArrowLeft,
  Check,
  Send,
  MessageSquare,
  Search,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";

interface IssueCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  colorClass: string;
  iconBgClass: string;
}

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

const RECENT_USERS = [
  {
    id: "usr-1",
    name: "أحمد خالد",
    role: "مسافر • غزة -> رفح • 23 يوليو",
    avatar: "أخ",
    color: "bg-orange-500",
  },
  {
    id: "usr-2",
    name: "محمد يوسف",
    role: "مسافر • دير البلح -> رفح • 23 يوليو",
    avatar: "مي",
    color: "bg-emerald-600",
  },
  {
    id: "usr-3",
    name: "فاطمة علي",
    role: "طالب خدمة",
    avatar: "فع",
    color: "bg-purple-600",
  },
];

export default function ReportIssuePage() {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("fraud");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [attachChatLogs, setAttachChatLogs] = useState(true);

  const selectedCategory =
    CATEGORIES.find((c) => c.id === selectedCategoryId) || CATEGORIES[0];

  const handleStep1Proceed = () => {
    if (selectedCategoryId) {
      setStep(2);
    }
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    setStep(3);
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Header Title and Step Stepper */}
        {step !== 3 && (
          <div className="flex items-center justify-between">
            <div className="text-right">
              <h1 className="text-xl font-black text-[#123A68]">
                الإبلاغ عن مشكلة
              </h1>
              <p className="text-xs text-text-secondary mt-0.5">
                {step === 1
                  ? "الخطوة 1 من 2 — اختر نوع المشكلة"
                  : "الخطوة 2 من 2 — تفاصيل البلاغ"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (step === 2) setStep(1);
                else navigate(-1);
              }}
              aria-label="الرجوع للخلف"
              className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 1: Select Category */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div className="space-y-4">
            {/* Privacy Alert */}
            <div className="flex items-start gap-2.5 rounded-3xl bg-[#FFF1F2] p-4 border border-[#FECDD3] text-rose-800 text-xs text-right">
              <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5 text-rose-600" />
              <p className="leading-relaxed">
                جميع البلاغات تُعالج بسرية تامة. نلتزم بالتحقيق في كل بلاغ
                واتخاذ الإجراء المناسب خلال 24–48 ساعة.
              </p>
            </div>

            <div className="text-right">
              <h2 className="text-sm font-black text-[#123A68]">
                ما نوع المشكلة التي تواجهها؟
              </h2>
            </div>

            {/* 8 Category Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategoryId === cat.id;
                const IconComp = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`flex flex-col items-end justify-between rounded-3xl p-4 border transition-all text-right cursor-pointer min-h-[115px] ${
                      isSelected
                        ? "bg-white border-[#123A68] ring-2 ring-[#123A68]/20 shadow-md"
                        : "bg-white border-slate-200/90 shadow-2xs hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl ${cat.iconBgClass} shadow-xs mb-2`}
                    >
                      <IconComp className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-xs font-black text-[#123A68] block">
                        {cat.title}
                      </h3>
                      <p className="text-[10px] text-text-muted mt-0.5 leading-tight">
                        {cat.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Proceed Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleStep1Proceed}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-md"
              >
                <span>متابعة — إدخال التفاصيل</span>
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: Report Details */}
        {/* ========================================================================= */}
        {step === 2 && (
          <form onSubmit={handleSubmitReport} className="space-y-4">
            {/* Privacy Alert */}
            <div className="flex items-start gap-2.5 rounded-3xl bg-[#FFF1F2] p-4 border border-[#FECDD3] text-rose-800 text-xs text-right">
              <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5 text-rose-600" />
              <p className="leading-relaxed">
                جميع البلاغات تُعالج بسرية تامة. نلتزم بالتحقيق في كل بلاغ
                واتخاذ الإجراء المناسب خلال 24–48 ساعة.
              </p>
            </div>

            {/* Selected Category Banner */}
            <div className="flex items-center justify-between rounded-3xl bg-white p-4 border border-slate-200/90 shadow-2xs">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-black text-[#123A68] hover:text-[#F36F21] underline cursor-pointer"
              >
                تغيير
              </button>

              <div className="flex items-center gap-3 text-right">
                <div>
                  <h3 className="text-xs font-black text-[#123A68]">
                    {selectedCategory.title}
                  </h3>
                  <p className="text-[10px] text-text-muted">
                    {selectedCategory.subtitle}
                  </p>
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${selectedCategory.iconBgClass} shadow-xs`}
                >
                  <selectedCategory.icon className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Optional User Selector */}
            <div className="space-y-2 text-right">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">
                  (اختياري)
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <span>المستخدم المُبلَّغ عنه</span>
                  <Search className="h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>

              <div className="space-y-2">
                {RECENT_USERS.map((u) => {
                  const isChecked = selectedUser === u.id;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() =>
                        setSelectedUser(isChecked ? null : u.id)
                      }
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer text-right ${
                        isChecked
                          ? "bg-white border-[#123A68] ring-1 ring-[#123A68]/20"
                          : "bg-white border-slate-200/80 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                          isChecked
                            ? "border-[#123A68] bg-[#123A68] text-white"
                            : "border-slate-300"
                        }`}
                      >
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div>
                          <span className="text-xs font-black text-[#123A68] block">
                            {u.name}
                          </span>
                          <span className="text-[10px] text-text-muted block">
                            {u.role}
                          </span>
                        </div>
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-xl text-white font-black text-xs ${u.color}`}
                        >
                          {u.avatar}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-1.5 text-right">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted font-mono">
                  {description.length}/500
                </span>
                <label className="font-bold text-slate-700">
                  وصف المشكلة *
                </label>
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                required
                rows={4}
                placeholder="اشرح ما حدث بالتفصيل: متى؟ كيف؟ ما الضرر الذي لحق بك؟ كلما وصفت أكثر كان تعاملنا أسرع..."
                className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-xs text-right focus:outline-none focus:border-[#123A68] shadow-2xs resize-none"
              />
            </div>

            {/* Priority Level */}
            <div className="space-y-2 text-right">
              <label className="text-xs font-bold text-slate-700 block">
                مستوى الأولوية
              </label>

              <div className="grid grid-cols-3 gap-2">
                {/* Low */}
                <button
                  type="button"
                  onClick={() => setPriority("LOW")}
                  className={`rounded-2xl p-3 border text-center transition-all cursor-pointer ${
                    priority === "LOW"
                      ? "border-amber-500 bg-amber-50/50 text-amber-800 ring-1 ring-amber-400"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  <span className="text-xs font-black block">منخفضة</span>
                  <span className="text-[9.5px] text-text-muted block mt-0.5">
                    استفسار • لا خطر فوري
                  </span>
                </button>

                {/* Medium */}
                <button
                  type="button"
                  onClick={() => setPriority("MEDIUM")}
                  className={`rounded-2xl p-3 border text-center transition-all cursor-pointer ${
                    priority === "MEDIUM"
                      ? "border-amber-500 bg-amber-50/50 text-amber-800 ring-2 ring-amber-400 shadow-xs"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  <span className="text-xs font-black block text-amber-600">
                    متوسطة
                  </span>
                  <span className="text-[9.5px] text-text-muted block mt-0.5">
                    مشكلة تؤثر على تجربتك
                  </span>
                </button>

                {/* High */}
                <button
                  type="button"
                  onClick={() => setPriority("HIGH")}
                  className={`rounded-2xl p-3 border text-center transition-all cursor-pointer ${
                    priority === "HIGH"
                      ? "border-rose-500 bg-rose-50/50 text-rose-800 ring-2 ring-rose-400 shadow-xs"
                      : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  <span className="text-xs font-black block text-rose-600">
                    عالية
                  </span>
                  <span className="text-[9.5px] text-text-muted block mt-0.5">
                    خطر مباشر أو انتهاك صريح
                  </span>
                </button>
              </div>
            </div>

            {/* Attach Chat Logs Toggle */}
            <div className="flex items-center justify-between rounded-3xl bg-white p-4 border border-slate-200/90 shadow-2xs">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={attachChatLogs}
                  onChange={() => setAttachChatLogs(!attachChatLogs)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#123A68]" />
              </label>

              <div className="text-right space-y-0.5">
                <span className="text-xs font-black text-[#123A68] block">
                  إرفاق سجل المحادثات
                </span>
                <span className="text-[10px] text-text-muted">
                  يساعدنا في التحقق من البلاغ بشكل أسرع
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#E11D48] text-xs font-black text-white hover:bg-rose-700 active:scale-98 transition-all cursor-pointer shadow-md"
              >
                <Send className="h-4 w-4" />
                <span>إرسال البلاغ</span>
              </button>
            </div>

            <p className="text-center text-[10px] text-slate-400">
              البلاغات الكيدية قد تؤدي إلى تعليق حسابك. جميع البلاغات تُعالج
              بسرية تامة.
            </p>
          </form>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: Confirmation (Frame 15.png) */}
        {/* ========================================================================= */}
        {step === 3 && (
          <div className="space-y-4 pt-4 text-center">
            {/* Big Green Success Badge */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#10B981] text-white shadow-lg">
                <Check className="h-8 w-8 stroke-[3]" />
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-[#123A68]">
                تم استلام بلاغك
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed px-4">
                سنتواصل معك خلال 24–48 ساعة. شكراً على مساعدتك في الحفاظ على
                سلامة المجتمع.
              </p>
            </div>

            {/* Report Details Card */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-3 text-xs text-right">
              <h3 className="text-sm font-black text-[#123A68] pb-1 border-b border-slate-100">
                تفاصيل البلاغ
              </h3>

              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-[#123A68]">
                  RPT-V04SIJ
                </span>
                <span className="text-text-muted">رقم البلاغ</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-[#123A68]">
                  {selectedCategory.title}
                </span>
                <span className="text-text-muted">نوع المشكلة</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-600">
                  {priority === "HIGH"
                    ? "عالية"
                    : priority === "MEDIUM"
                    ? "متوسطة"
                    : "منخفضة"}
                </span>
                <span className="text-text-muted">مستوى الأولوية</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">
                  {new Date().toLocaleTimeString("ar-EG", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="text-text-muted">وقت الإرسال</span>
              </div>
            </div>

            {/* Warning Alert Note */}
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-[#FFFBEB] p-3 border border-[#FDE68A] text-[#92400E] text-[11px] font-bold">
              <span>احتفظ برقم البلاغ RPT-V04SIJ للمتابعة مع فريق الدعم.</span>
              <AlertCircle className="h-4 w-4 text-[#D97706] shrink-0" />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={() => navigate("/settings/support")}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-md"
              >
                <MessageSquare className="h-4 w-4" />
                <span>التواصل مع الدعم</span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/home")}
                className="flex h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white text-xs font-black text-[#123A68] hover:bg-slate-100 active:scale-98 transition-all cursor-pointer"
              >
                العودة للرئيسية
              </button>
            </div>
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
