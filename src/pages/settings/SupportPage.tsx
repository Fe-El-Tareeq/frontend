import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronDown,
  MessageSquare,
  Mail,
  Phone,
  HelpCircle,
  AlertCircle,
  Send,
  X,
  Clock,
  Globe,
  Hourglass,
  Users,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    question: "كيف أسترد التوكنز غير المستخدمة؟",
    answer:
      "يمكنك استرداد التوكنز غير المستخدمة خلال 7 أيام من تاريخ الشراء بالتواصل المباشر مع فريق الدعم الفني.",
  },
  {
    question: "ماذا أفعل إن لم يصل غرضي؟",
    answer:
      "يمكنك رفع بلاغ فوري من قسم 'الإبلاغ عن مشكلة' أو التواصل مباشرة مع الدعم لفتح تذكرة تحقيق ومتابعة السائق.",
  },
  {
    question: "كيف أُلغي رحلة بعد نشرها؟",
    answer:
      "يمكنك إلغاء الرحلة من صفحة تفاصيل الرحلة قبل ساعتين من موعد الانطلاق دون أي خصم للتوكنز.",
  },
  {
    question: "هل يمكن تحويل التوكنز لحساب آخر؟",
    answer:
      "التوكنز مخصصة للحساب المشتري ولا يمكن تحويلها بين الحسابات لضمان أمان العمليات المالية.",
  },
  {
    question: "كيف أُغيّر رقم هاتفي المسجّل؟",
    answer:
      "يمكنك طلب تعديل رقم الهاتف المسجل من خلال صفحة تعديل الملف الشخصي مع تأكيد رمز التحقق OTP.",
  },
  {
    question: "كم يستغرق إضافة التوكنز بعد الدفع؟",
    answer:
      "عبر رمز QR يتم التفعيل فورياً، وعبر التحويل البنكي يتم التفعيل خلال 1-2 يوم عمل بعد التحقق من الإيصال.",
  },
];

export default function SupportPage() {
  const navigate = useNavigate();

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<"CHAT" | "EMAIL" | "PHONE" | null>(
    null,
  );

  // Chat Modal State
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: "bot" | "user"; text: string; time: string }>
  >([
    {
      sender: "bot",
      text: "مرحباً بك في دعم بطريقك! أنا هنا لمساعدتك. كيف يمكنني خدمتك اليوم؟",
      time: "10:30",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  // Email Modal State
  const [emailTopic, setEmailTopic] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSendChatMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const timeNow = new Date().toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMsgs = [
      ...chatMessages,
      { sender: "user" as const, text, time: timeNow },
    ];
    setChatMessages(newMsgs);
    setChatInput("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "شكراً على تواصلك! تم تسجيل رسالتك وسيرد أحد وكلائنا خلال دقائق. رقم تذكرتك: #TKT-X5L47Z",
          time: new Date().toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 800);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailTopic || !emailMessage.trim()) return;
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setActiveModal(null);
      setEmailTopic("");
      setEmailMessage("");
      alert("تم إرسال رسالتك لفريق الدعم بنجاح!");
    }, 1200);
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68]">
              التواصل مع الدعم
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              فريقنا جاهز لمساعدتك
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="الرجوع للخلف"
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Availability Banner */}
        <div className="flex items-center justify-between rounded-2xl bg-[#E6F9EE] px-4 py-3 border border-emerald-200/80 text-[11px] font-bold text-emerald-800">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>فريق الدعم متاح الآن</span>
          </div>
          <span className="text-emerald-300">•</span>
          <span>متوسط الرد: 5 دقائق</span>
          <span className="text-emerald-300">•</span>
          <span>3 وكلاء متاحون</span>
        </div>

        {/* 3 Contact Action Cards */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Card 1: دردشة مباشرة */}
          <button
            type="button"
            onClick={() => setActiveModal("CHAT")}
            className="relative flex flex-col items-center justify-center rounded-3xl bg-white p-3.5 border border-slate-200/90 shadow-2xs hover:border-[#123A68]/40 transition-all cursor-pointer text-center space-y-2"
          >
            <span className="absolute -top-2.5 right-3 rounded-full bg-[#F36F21] px-2 py-0.5 text-[9px] font-black text-white shadow-xs">
              الأسرع
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#123A68] text-white shadow-xs">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-black text-[#123A68] block">
                دردشة مباشرة
              </span>
              <span className="text-[10px] text-text-muted mt-0.5 block">
                رد فوري • متاح الآن
              </span>
            </div>
          </button>

          {/* Card 2: بريد إلكتروني */}
          <button
            type="button"
            onClick={() => setActiveModal("EMAIL")}
            className="flex flex-col items-center justify-center rounded-3xl bg-white p-3.5 border border-slate-200/90 shadow-2xs hover:border-orange-400 transition-all cursor-pointer text-center space-y-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F36F21] text-white shadow-xs">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-black text-[#123A68] block">
                بريد إلكتروني
              </span>
              <span className="text-[10px] text-text-muted mt-0.5 block">
                رد خلال 24 ساعة
              </span>
            </div>
          </button>

          {/* Card 3: اتصال هاتفي */}
          <button
            type="button"
            onClick={() => setActiveModal("PHONE")}
            className="flex flex-col items-center justify-center rounded-3xl bg-white p-3.5 border border-slate-200/90 shadow-2xs hover:border-emerald-400 transition-all cursor-pointer text-center space-y-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#059669] text-white shadow-xs">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-black text-[#123A68] block">
                اتصال هاتفي
              </span>
              <span className="text-[10px] text-text-muted mt-0.5 block">
                الأحد–الخميس 9ص–5م
              </span>
            </div>
          </button>
        </div>

        {/* FAQ Accordion Section */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-3.5 text-right">
          <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <HelpCircle className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-[#123A68]">
                الأسئلة الشائعة
              </h2>
              <p className="text-[10.5px] text-text-muted">
                إجابات سريعة للأكثر أسئلة تكراراً
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={idx} className="py-2.5">
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-right text-xs font-black text-[#123A68] hover:text-[#F36F21] transition-colors cursor-pointer gap-2"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180 text-[#F36F21]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <p className="mt-2 text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Complaint Banner */}
        <div className="flex items-center justify-between rounded-3xl bg-[#FFF1F2] p-4 border border-[#FECDD3] text-right">
          <button
            type="button"
            onClick={() => navigate("/settings/report-issue")}
            className="rounded-xl bg-[#E11D48] px-4 py-2 text-xs font-black text-white shadow-xs hover:bg-rose-700 active:scale-95 transition-all cursor-pointer"
          >
            إبلاغ
          </button>

          <div className="flex items-center gap-2.5">
            <div className="space-y-0.5">
              <h3 className="text-xs font-black text-[#E11D48]">
                لديك شكوى أو انتهاك؟
              </h3>
              <p className="text-[10.5px] text-rose-800">
                أبلغ عن محتوى مسيء أو انتهاك لشروط الاستخدام
              </p>
            </div>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-[#E11D48]">
              <AlertCircle className="h-4.5 w-4.5" />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. Live Chat Modal (Container_margin.png) */}
      {/* ========================================================================= */}
      {activeModal === "CHAT" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-[520px]">
            {/* Chat Top Header */}
            <div className="flex items-center justify-between bg-[#123A68] p-4 text-white">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2.5 text-right">
                <div>
                  <h3 className="text-xs font-black text-white">
                    وكيل دعم بطريقك
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>متصل الآن</span>
                  </div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
                  <HelpCircle className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-start" : "items-end"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                      msg.sender === "user"
                        ? "bg-[#123A68] text-white rounded-br-none"
                        : "bg-white text-slate-800 border border-slate-200 rounded-bl-none text-right"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9.5px] text-slate-400 mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Topic Chips */}
            <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold">
              {["مشكلة في الدفع", "طلب مفقود", "إلغاء طلب", "استفسار عام"].map(
                (chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendChatMessage(chip)}
                    className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-[#123A68] hover:text-white transition-all cursor-pointer"
                  >
                    {chip}
                  </button>
                ),
              )}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSendChatMessage()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123A68] text-white hover:bg-[#0D2C50] active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>

              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                placeholder="اكتب رسالتك..."
                className="h-10 flex-1 rounded-xl bg-slate-100 px-3 text-xs text-right focus:outline-none focus:ring-1 focus:ring-[#123A68]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. Email Ticket Modal (Container_margin-1.png) */}
      {/* ========================================================================= */}
      {activeModal === "EMAIL" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl p-5 border border-slate-200 space-y-4 text-right">
            <div className="flex items-start justify-between">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-sm font-black text-[#123A68]">
                    مراسلة فريق الدعم
                  </h3>
                  <p className="text-[10px] text-text-muted">
                    رد خلال 24 ساعة • support@btareeqak.com
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-xs">
                  <Mail className="h-5 w-5" />
                </div>
              </div>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-3.5 text-right">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  موضوع الرسالة *
                </label>
                <select
                  value={emailTopic}
                  onChange={(e) => setEmailTopic(e.target.value)}
                  required
                  className="w-full h-11 rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3 text-xs font-bold text-[#123A68] focus:outline-none focus:border-[#123A68] cursor-pointer text-right"
                >
                  <option value="">اختر موضوع استفسارك</option>
                  <option value="PAYMENT">مشكلة في الدفع أو التوكنز</option>
                  <option value="ACCOUNT">مشكلة في الحساب والبيانات</option>
                  <option value="ORDER">استفسار بخصوص طلب أو رحلة</option>
                  <option value="FEEDBACK">اقتراح أو ملاحظة عامة</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  رسالتك *
                </label>
                <textarea
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  rows={4}
                  required
                  placeholder="اشرح مشكلتك بالتفصيل... كلما كانت التفاصيل أوضح كان ردنا أسرع وأدق."
                  className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-3 text-xs text-right focus:outline-none focus:border-[#123A68] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={emailSent}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-md disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                <span>{emailSent ? "جاري الإرسال..." : "إرسال الرسالة"}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. Phone Call Modal (Container_margin-2.png) */}
      {/* ========================================================================= */}
      {activeModal === "PHONE" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-200 text-right">
            {/* Green Header */}
            <div className="relative bg-[#059669] p-6 text-white text-center space-y-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-3 left-3 p-1 rounded-full text-white/80 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 shadow-inner">
                <Phone className="h-7 w-7 text-white" />
              </div>

              <div>
                <span className="text-xs text-white/80 block">رقم الدعم الموحّد</span>
                <h3 className="text-2xl font-black text-white tracking-wider mt-0.5">
                  059-WASEL
                </h3>
                <span className="text-[11px] text-white/70 block dir-ltr mt-0.5">
                  (0599-92735)
                </span>
              </div>
            </div>

            {/* Info Rows */}
            <div className="p-5 space-y-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#123A68]">
                  الأحد–الخميس 9:00 ص – 5:00 م
                </span>
                <div className="flex items-center gap-2 text-text-muted">
                  <span>ساعات العمل</span>
                  <Clock className="h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="font-bold text-[#123A68]">العربية</span>
                <div className="flex items-center gap-2 text-text-muted">
                  <span>اللغة</span>
                  <Globe className="h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="font-bold text-[#123A68]">أقل من 3 دقائق</span>
                <div className="flex items-center gap-2 text-text-muted">
                  <span>متوسط وقت الانتظار</span>
                  <Hourglass className="h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="font-bold text-[#059669]">3 وكلاء الآن</span>
                <div className="flex items-center gap-2 text-text-muted">
                  <span>الوكلاء المتاحون</span>
                  <Users className="h-4 w-4 text-slate-400" />
                </div>
              </div>

              {/* Call Button */}
              <div className="pt-2">
                <a
                  href="tel:059992735"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#059669] text-xs font-black text-white hover:bg-emerald-700 active:scale-98 transition-all cursor-pointer shadow-md"
                >
                  <Phone className="h-4 w-4" />
                  <span>اتصل الآن</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </MobileContainer>
  );
}
