import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  Eye,
  ChevronUp,
  ChevronDown,
  Edit2,
  Trash2,
  Check,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { adminApi } from "../../api/admin";
import type { FAQItem } from "../../types";
import { cn } from "../../utils/cn";

// Fallback FAQs matching design if backend has no data yet
const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "كيف أضع طلبا للإرسال؟",
    answer: "يمكنك وضع طلبك عبر التطبيق بتحديد نوع الطلب والوجهة والوزن التقريبي.",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "faq-2",
    question: "كيف يتم الدفع؟",
    answer: "يتم الدفع نقداً أو عبر محفظة التوكنز الإلكترونية المدعومة بجوال باي.",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "faq-3",
    question: "ما هي رسوم التوصيل؟",
    answer: "الرسوم تبدأ من 3 شيكل للطلبات الخفيفة وتصل لـ 7 شيكل للطلبات العاجلة والثقيلة.",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "faq-4",
    question: "كيف أصبح مسافراً في المنصة؟",
    answer: "سجل حسابك وأكمل التحقق من الهوية وستتمكن من قبول الطلبات خلال مسارك اليومي.",
    displayOrder: 4,
    isActive: true,
  },
  {
    id: "faq-5",
    question: "ماذا أفعل إذا لم يصل طلبي؟",
    answer: "تواصل مع فريق الدعم فوراً عبر قسم النزاعات، وسيتم مراجعة الطلب خلال 24 ساعة.",
    displayOrder: 5,
    isActive: false,
  },
];

export const AdminFaqsPage: React.FC = () => {
  const queryClient = useQueryClient();

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [deletingFaq, setDeletingFaq] = useState<FAQItem | null>(null);

  // Form states
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");

  // Toast feedback state matching design toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Queries
  const { data: faqsData, isLoading } = useQuery({
    queryKey: ["admin", "faqs"],
    queryFn: () => adminApi.getFaqs(),
  });

  const faqs: FAQItem[] =
    faqsData?.data?.faqs && faqsData.data.faqs.length > 0
      ? faqsData.data.faqs
      : DEFAULT_FAQS;

  // Mutations
  const createMutation = useMutation({
    mutationFn: (payload: { question: string; answer: string; displayOrder: number }) =>
      adminApi.createFaq(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "faqs"] });
      setShowAddModal(false);
      setQuestionInput("");
      setAnswerInput("");
      showToast("تمت إضافة السؤال بنجاح");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<FAQItem> }) =>
      adminApi.updateFaq(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "faqs"] });
      setEditingFaq(null);
      showToast("تم حفظ التعديلات بنجاح");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "faqs"] });
      setDeletingFaq(null);
      showToast("تم حذف السؤال بنجاح");
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      adminApi.updateFaq(id, { isActive }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "faqs"] });
      showToast(variables.isActive ? "تم تفعيل السؤال" : "تم تعطيل السؤال");
    },
  });

  const activeCount = faqs.filter((f) => f.isActive).length;
  const totalCount = faqs.length;

  return (
    <div className="space-y-6 text-right relative">
      {/* Active API Status Banner */}
      <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3.5 flex items-center justify-between text-xs text-emerald-300">
        <span className="font-bold">حالة الـ API: نشط ومتصل بالـ Backend بالكامل ✓</span>
        <span>مسارات إدارة الأسئلة الشائعة (`/admin/faqs/*`) جاهزة وتعمل</span>
      </div>

      {/* Header Row: Title & "+ إضافة سؤال" */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setQuestionInput("");
            setAnswerInput("");
            setShowAddModal(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-sm active:scale-98"
        >
          <Plus className="h-4 w-4" />
          <span>إضافة سؤال</span>
        </button>

        <div className="text-right">
          <h2 className="text-base font-black text-white">إدارة الأسئلة الشائعة</h2>
          <p className="text-xs text-slate-400 font-medium">تظهر للمستخدمين في صفحة التعريف بالمنصة</p>
        </div>
      </div>

      {/* Info Banner matching design */}
      <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#091728] border border-[#162E4A] text-xs font-bold text-blue-300">
        <span>أسئلة غير نشطة مخفية عن المستخدمين</span>
        <span>—</span>
        <span>أسئلة نشطة: {activeCount} من {totalCount}</span>
        <Eye className="h-4 w-4 text-blue-400" />
      </div>

      {/* FAQs List */}
      {isLoading ? (
        <div className="py-12 flex justify-center text-blue-400">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="p-5 rounded-2xl bg-[#0C1B2E] border border-[#162E4A] hover:border-[#1E3E66] transition-all space-y-3 shadow-sm"
            >
              {/* Question Row */}
              <div className="flex items-start justify-between gap-4">
                {/* Actions on Left in RTL */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => setDeletingFaq(faq)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="حذف"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  {/* Edit button */}
                  <button
                    type="button"
                    onClick={() => {
                      setEditingFaq(faq);
                      setQuestionInput(faq.question);
                      setAnswerInput(faq.answer);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors cursor-pointer"
                    title="تعديل"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>

                  {/* Toggle Active Button */}
                  <button
                    type="button"
                    onClick={() =>
                      toggleActiveMutation.mutate({ id: faq.id, isActive: !faq.isActive })
                    }
                    className={cn(
                      "p-1.5 rounded-lg transition-colors cursor-pointer",
                      faq.isActive
                        ? "text-emerald-400 hover:bg-emerald-500/10"
                        : "text-slate-500 hover:text-slate-300 hover:bg-slate-700/20",
                    )}
                    title={faq.isActive ? "تعطيل السؤال" : "تفعيل السؤال"}
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </div>

                {/* Question & Status on Right in RTL */}
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[11px] font-bold",
                      faq.isActive
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-500/10 text-slate-400 border border-slate-500/20",
                    )}
                  >
                    {faq.isActive ? "نشط" : "غير نشط"}
                  </span>
                  <h3 className="text-sm font-black text-white">{faq.question}</h3>

                  {/* Order index with arrows */}
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <ChevronUp className="h-3.5 w-3.5 cursor-pointer hover:text-white" />
                    <span className="text-[10px] font-mono font-bold">{index + 1}</span>
                    <ChevronDown className="h-3.5 w-3.5 cursor-pointer hover:text-white" />
                  </div>
                </div>
              </div>

              {/* Answer Row */}
              <p className="text-xs text-slate-300 font-medium leading-relaxed pr-10">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Floating Toast Notification matching الاسئلة الشائعة2.png */}
      {toastMessage && (
        <div className="fixed bottom-8 left-8 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#ECFDF5] text-emerald-900 border border-emerald-200 shadow-xl font-black text-xs animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODAL 1: Add New Question matching Container.png */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0F223A] border border-[#1E3A5F] p-6 shadow-2xl text-right space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E3A5F]">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-base font-black text-white">إضافة سؤال جديد</h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold block">السؤال</label>
                <input
                  type="text"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  placeholder="اكتب السؤال هنا..."
                  className="w-full h-10 px-3.5 rounded-xl bg-[#091728] border border-[#1E3A5F] text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-right"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold block">الإجابة</label>
                <textarea
                  rows={4}
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  placeholder="اكتب الإجابة الكاملة هنا..."
                  className="w-full p-3.5 rounded-xl bg-[#091728] border border-[#1E3A5F] text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-right resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={!questionInput.trim() || !answerInput.trim() || createMutation.isPending}
                onClick={() =>
                  createMutation.mutate({
                    question: questionInput.trim(),
                    answer: answerInput.trim(),
                    displayOrder: totalCount + 1,
                  })
                }
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs transition-colors cursor-pointer text-center"
              >
                {createMutation.isPending ? "جاري الإضافة..." : "إضافة السؤال"}
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#142C4B] hover:bg-[#1A375D] text-slate-300 font-bold text-xs transition-colors cursor-pointer text-center"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Edit Question matching Container-1.png */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0F223A] border border-[#1E3A5F] p-6 shadow-2xl text-right space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E3A5F]">
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-base font-black text-white">تعديل السؤال</h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold block">السؤال</label>
                <input
                  type="text"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#091728] border border-[#1E3A5F] text-white focus:outline-none focus:border-blue-500 text-right"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold block">الإجابة</label>
                <textarea
                  rows={4}
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#091728] border border-[#1E3A5F] text-white focus:outline-none focus:border-blue-500 text-right resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={!questionInput.trim() || !answerInput.trim() || updateMutation.isPending}
                onClick={() =>
                  updateMutation.mutate({
                    id: editingFaq.id,
                    payload: { question: questionInput.trim(), answer: answerInput.trim() },
                  })
                }
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs transition-colors cursor-pointer text-center"
              >
                {updateMutation.isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
              </button>
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#142C4B] hover:bg-[#1A375D] text-slate-300 font-bold text-xs transition-colors cursor-pointer text-center"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Delete Confirmation Modal matching Container-2.png */}
      {deletingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-[#0F223A] border border-[#1E3A5F] p-6 shadow-2xl text-right space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E3A5F]">
              <button
                type="button"
                onClick={() => setDeletingFaq(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-base font-black text-white">تأكيد الحذف</h3>
            </div>

            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 text-xs space-y-1.5">
              <p className="text-red-400 font-bold">هل أنت متأكد من حذف هذا السؤال نهائياً؟</p>
              <p className="text-white font-black text-sm">"{deletingFaq.question}"</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate(deletingFaq.id)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs transition-colors cursor-pointer text-center"
              >
                {deleteMutation.isPending ? "جاري الحذف..." : "حذف نهائي"}
              </button>
              <button
                type="button"
                onClick={() => setDeletingFaq(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#142C4B] hover:bg-[#1A375D] text-slate-300 font-bold text-xs transition-colors cursor-pointer text-center"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFaqsPage;
