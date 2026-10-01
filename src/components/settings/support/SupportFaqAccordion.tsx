import type { FC } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface SupportFaqAccordionProps {
  faqList: FaqItem[];
  expandedFaq: number | null;
  onToggleFaq: (index: number) => void;
}

export const SupportFaqAccordion: FC<SupportFaqAccordionProps> = ({
  faqList,
  expandedFaq,
  onToggleFaq,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] text-text-muted dark:text-slate-400">{faqList.length} أسئلة</span>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-black text-[#123A68] dark:text-white">الأسئلة الشائعة</h2>
          <HelpCircle className="h-4 w-4 text-[#123A68] dark:text-[#38BDF8]" />
        </div>
      </div>

      <div className="space-y-2">
        {faqList.map((item, index) => {
          const isOpen = expandedFaq === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all ${
                isOpen
                  ? "bg-white dark:bg-[#102A4C] border-[#123A68]/30 dark:border-white/20 shadow-xs"
                  : "bg-white dark:bg-[#102A4C] border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              <button
                type="button"
                onClick={() => onToggleFaq(index)}
                className="w-full flex items-center justify-between p-4 text-right cursor-pointer"
              >
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#123A68] dark:text-[#38BDF8]" : ""
                  }`}
                />
                <span className="text-xs font-bold text-[#123A68] dark:text-white flex-1 pr-2">
                  {item.question}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/10 text-right animate-in fade-in duration-150">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
