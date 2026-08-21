import { useState } from "react";
import type { FC } from "react";
import { ChevronDown } from "lucide-react";

export const FaqSection: FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "كيف أضمن سلامة غرضي؟",
      a: "يعتمد النظام على التحقق من الهوية ونظام تقييم متبادل صارم يوضح سجل وموثوقية كل مسافر وطالب قبل قبول أي مشوار.",
    },
    {
      q: "ما هي تكلفة نشر طلب؟",
      a: "نشر الطلب يخصم 1 توكن فقط من رصيدك، ويحصل كل مستخدم جديد على 3 توكنز مجاناً عند التسجيل للبدء فوراً.",
    },
    {
      q: "هل يمكنني استخدام المنصة كمسافر فقط؟",
      a: "نعم بالطبع، يمكنك تسجيل رحلاتك اليومية ونقاط انطلاقك ووجهتك دون الحاجة لنشر طلبات، وستكسب أجر التوصيل مباشرة.",
    },
    {
      q: "ما هي أنواع الأغراض المسموح بها؟",
      a: "الأدوية، المستندات الرسمية، الطرود الخفيفة والمتوسطة، ومستلزمات البقالة والاحتياجات اليومية المسموح بها قانونياً.",
    },
  ];

  return (
    <section id="faqs" className="space-y-3 pt-2">
      <div className="text-center space-y-1">
        <h2 className="text-base font-black text-[#123A68]">الأسئلة الشائعة</h2>
        <p className="text-xs text-text-secondary">
          إجابات عن أكثر الاستفسارات تكراراً
        </p>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, i) => {
          const isOpen = openFaq === i;
          return (
            <div
              key={i}
              className="rounded-3xl bg-white border border-border overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : i)}
                className="flex w-full items-center justify-between p-4 text-right transition-colors hover:bg-slate-50"
              >
                <ChevronDown
                  className={`h-4 w-4 text-primary transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="text-xs font-black text-[#123A68] flex-1 mr-2 text-right">
                  {faq.q}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 text-right border-t border-slate-100 pt-3">
                  <p className="text-[11.5px] text-text-secondary leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
