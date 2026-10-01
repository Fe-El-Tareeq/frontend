import { useState } from "react";
import type { FC } from "react";
import { ChevronDown } from "lucide-react";

export const FaqSection: FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "كيف أضمن سلامة غرضي؟",
      a: "يعتمد النظام على التحقق من الهوية ونظام تقييم متبادل صارم يوضح سجل وموثوقية كل مسافر وطالب قبل قبول أي مشوار، مع إمكانية التتبع المباشر.",
    },
    {
      q: "ما هي تكلفة نشر طلب؟",
      a: "نشر الطلب يخصم 1 توكن فقط من رصيدك، ويحصل كل مستخدم جديد على 3 توكنز مجاناً عند التسجيل للبدء فوراً دون أي اشتراكات معقدة.",
    },
    {
      q: "هل يمكنني استخدام المنصة كمسافر فقط؟",
      a: "نعم بالطبع، يمكنك تسجيل رحلاتك اليومية ونقاط انطلاقك ووجهتك دون الحاجة لنشر طلبات، وستكسب أجر التوصيل مباشرة من أصحاب الطلبات.",
    },
    {
      q: "ما هي أنواع الأغراض المسموح بنقلها؟",
      a: "الأدوية، المستندات الرسمية، الطرود الخفيفة والمتوسطة، ومستلزمات البقالة والاحتياجات اليومية المسموح بها قانونياً والتي تتناسب مع سعة المسافر.",
    },
  ];

  return (
    <section id="faqs" className="space-y-4 pt-4 text-right">
      {/* Section Header */}
      <div className="text-center space-y-1">
        <span className="text-xs font-black text-[#F36F21] block">
          الأسئلة الشائعة
        </span>
        <h2 className="text-2xl font-black text-[#123A68]">
          أسئلة يسألها المستخدمون
        </h2>
      </div>

      {/* Accordions */}
      <div className="space-y-2.5">
        {faqs.map((faq, i) => {
          const isOpen = openFaq === i;
          return (
            <div
              key={i}
              className="rounded-3xl bg-white border border-slate-200/80 overflow-hidden transition-all shadow-xs text-right"
            >
              {/* Question button: Text on the RIGHT (1st child in RTL), Chevron on the LEFT (2nd child in RTL) */}
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : i)}
                className="flex w-full items-center justify-between p-4.5 text-right transition-colors hover:bg-slate-50 cursor-pointer"
              >
                <span className="text-xs font-black text-[#123A68] flex-1 text-right">
                  {faq.q}
                </span>

                <ChevronDown
                  className={`h-4.5 w-4.5 text-[#123A68] shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#F36F21]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4.5 pb-4.5 text-right border-t border-slate-100 pt-3 bg-[#F8FAFC]/50">
                  <p className="text-xs text-text-secondary leading-relaxed">
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
