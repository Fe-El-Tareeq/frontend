import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { supportApi } from "../../api/support";
import { getApiErrorMessage } from "../../utils/apiError";
import type { SupportConfig } from "../../types/support";

// Modular sub-components
import { SupportContactChannels } from "../../components/settings/support/SupportContactChannels";
import { SupportFaqAccordion } from "../../components/settings/support/SupportFaqAccordion";
import { SupportWorkingHoursCard } from "../../components/settings/support/SupportWorkingHoursCard";
import { SupportLiveChatModal } from "../../components/settings/support/SupportLiveChatModal";
import { SupportEmailTicketModal } from "../../components/settings/support/SupportEmailTicketModal";

const FAQ_LIST = [
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
  const [activeModal, setActiveModal] = useState<
    "CHAT" | "EMAIL" | "PHONE" | null
  >(null);
  const [supportConfig, setSupportConfig] = useState<SupportConfig | null>(null);

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
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    supportApi
      .getConfig()
      .then((res) => {
        if (isMounted && res.data) {
          setSupportConfig(res.data);
        }
      })
      .catch(() => {
        // Defaults
      });
    return () => {
      isMounted = false;
    };
  }, []);

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

  const handleSendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!emailTopic || !emailMessage.trim()) return;

    setEmailSubmitting(true);
    setEmailError(null);
    setEmailSuccess(null);

    try {
      await supportApi.createTicket({
        category: emailTopic,
        subject: emailTopic,
        message: emailMessage.trim(),
      });
      setEmailSuccess("تم إرسال رسالتك بنجاح وسيقوم فريق الدعم بالرد قريباً.");
      setTimeout(() => {
        setActiveModal(null);
        setEmailTopic("");
        setEmailMessage("");
        setEmailSuccess(null);
      }, 1800);
    } catch (err: unknown) {
      setEmailError(
        getApiErrorMessage(
          err,
          "تعذر إرسال التذكرة، يرجى المحاولة مرة أخرى لاحقاً.",
        ),
      );
    } finally {
      setEmailSubmitting(false);
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Title */}
        <div className="flex items-center justify-start">
          <button
            type="button"
            onClick={() => typeof window !== "undefined" && window.history.length > 1 ? navigate(-1) : navigate("/home")}
            aria-label="الرجوع للخلف"
            className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68] dark:text-white">
              مركز المساعدة والدعم
            </h1>
            <p className="text-xs text-text-secondary dark:text-slate-400 mt-0.5">
              فريقنا متواجد دائماً لمساعدتك والإجابة عن استفساراتك
            </p>
          </div>
        </div>

        {/* 4 Main Contact Channels */}
        <SupportContactChannels
          onOpenModal={(type) => {
            if (type === "PHONE") {
              const phone = supportConfig?.contactPhone || "0598877026";
              window.location.href = `tel:${phone}`;
            } else {
              setActiveModal(type);
            }
          }}
          onNavigateReport={() => navigate("/settings/report-issue")}
        />

        {/* Working Hours Card */}
        <SupportWorkingHoursCard />

        {/* FAQ Accordion */}
        <SupportFaqAccordion
          faqList={FAQ_LIST}
          expandedFaq={expandedFaq}
          onToggleFaq={(idx) =>
            setExpandedFaq(expandedFaq === idx ? null : idx)
          }
        />
      </div>

      {/* Modals */}
      <SupportLiveChatModal
        isOpen={activeModal === "CHAT"}
        onClose={() => setActiveModal(null)}
        chatMessages={chatMessages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        onSendMessage={handleSendChatMessage}
      />

      <SupportEmailTicketModal
        isOpen={activeModal === "EMAIL"}
        onClose={() => setActiveModal(null)}
        emailTopic={emailTopic}
        setEmailTopic={setEmailTopic}
        emailMessage={emailMessage}
        setEmailMessage={setEmailMessage}
        emailSubmitting={emailSubmitting}
        emailError={emailError}
        emailSuccess={emailSuccess}
        onSubmit={handleSendEmail}
      />
    </MobileContainer>
  );
}
