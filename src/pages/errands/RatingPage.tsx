import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star, CheckCircle, ShieldCheck, Heart, Package } from "lucide-react";
import { AppLayout } from "../../components/layout/AppLayout";
import { Card } from "../../components/ui/card/Card";
import { Button } from "../../components/ui/button/Button";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { useErrandDetail } from "../../hooks/useErrands";

export default function RatingPage() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();

  /*
   * ============================================================================
   * BACKEND INTEGRATION: Submit Rating for Assignment
   * Endpoint: POST /api/v1/ratings
   * Body schema:
   *   {
   *     assignmentId: string,
   *     ratingStars: number (1-5),
   *     comments?: string,
   *     feedbackTags?: string[],
   *     paymentModalityConfirmed: "CASH" | "BARTER"
   *   }
   * ============================================================================
   */
  const { errand, isLoading } = useErrandDetail(id);

  const [ratingStars, setRatingStars] = useState<number>(5);
  const [paymentModality, setPaymentModality] = useState<"CASH" | "BARTER">(
    "CASH",
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "سريع",
    "لبق ومحترم",
  ]);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const availableTags = [
    "سريع جداً",
    "حريص على الأغراض",
    "لبق ومحترم",
    "ملتزم بالوقت",
    "تواصل ممتاز",
    "أمانة وثقة",
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }, 800);
  };

  if (isLoading) {
    return (
      <AppLayout
        headerProps={{
          title: "تقييم تجربة التوصيل",
          showBack: true,
        }}
        showBottomNav={false}
      >
        <div className="space-y-4 pb-8">
          <div className="h-48 w-full animate-pulse rounded-[20px] bg-white border border-border" />
        </div>
      </AppLayout>
    );
  }

  if (!errand && id) {
    return (
      <AppLayout
        headerProps={{
          title: "تقييم تجربة التوصيل",
          showBack: true,
        }}
        showBottomNav={false}
      >
        <EmptyState
          icon={<Package className="h-7 w-7 text-[#123A68]" />}
          title="الطلب غير موجود"
          description="لم نتمكن من العثور على هذا الطلب لتقييمه."
          actionText="العودة للرئيسية"
          onAction={() => navigate("/home")}
        />
      </AppLayout>
    );
  }

  if (isDone) {
    return (
      <AppLayout
        headerProps={{
          title: "شكراً لتقييمك!",
          showBack: false,
        }}
        showBottomNav={false}
      >
        <div className="rounded-[20px] bg-white p-8 text-center border border-border shadow-md mt-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4 animate-bounce border border-emerald-200">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h2 className="text-[20px] font-extrabold text-primary">
            تم تسجيل تقييمك بنجاح!
          </h2>
          <p className="text-[13px] text-text-secondary mt-2 leading-relaxed">
            مساهمتك في التقييم تعزز من موثوقية وأمان مجتمع "بطريقك".
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      headerProps={{
        title: "تقييم تجربة التوصيل",
        subtitle: `طلب رقم #${id.substring(0, 8)}`,
        showBack: true,
      }}
      showBottomNav={false}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pb-8 text-right">
        {/* Traveler Profile Header */}
        <Card variant="elevated">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#123A68] text-white text-[20px] font-extrabold shadow-md mb-2">
              {errand?.requester?.fullName
                ? errand.requester.fullName.slice(0, 1)
                : "م"}
            </div>
            <h3 className="text-[17px] font-bold text-primary">
              {errand?.requester?.fullName || "المسافر المسجل"}
            </h3>
            <p className="text-[12px] text-text-secondary">
              قام بتوصيل أغراضك بنجاح
            </p>

            {/* Interactive 5-Star Rating */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRatingStars(star)}
                  className="p-1 text-amber-400 hover:scale-125 transition-transform focus:outline-none cursor-pointer"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= ratingStars
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="mt-1 text-[13px] font-bold text-[#F36F21] block">
              {ratingStars === 5 && "ممتاز جداً (5/5)"}
              {ratingStars === 4 && "جيد جداً (4/5)"}
              {ratingStars === 3 && "متوسط (3/5)"}
              {ratingStars <= 2 && "بحاجة لتحسين"}
            </span>
          </div>
        </Card>

        {/* Payment Confirmation Modality */}
        <Card>
          <Card.Header>
            <Card.Title>تأكيد استلام وتصفية الأجر</Card.Title>
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
          </Card.Header>

          <Card.Body>
            <label className="block text-[13px] text-text-secondary mb-2 text-right">
              كيف تمت محاسبة المسافر على المشوار؟
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentModality("CASH")}
                className={`p-3 rounded-[14px] border-2 font-bold text-[13px] transition-all cursor-pointer ${
                  paymentModality === "CASH"
                    ? "border-[#F36F21] bg-amber-50 text-[#F36F21] shadow-sm"
                    : "border-slate-200 bg-[#F8FAFC] text-primary"
                }`}
              >
                💵 نقداً (كاش)
              </button>

              <button
                type="button"
                onClick={() => setPaymentModality("BARTER")}
                className={`p-3 rounded-[14px] border-2 font-bold text-[13px] transition-all cursor-pointer ${
                  paymentModality === "BARTER"
                    ? "border-[#F36F21] bg-amber-50 text-[#F36F21] shadow-sm"
                    : "border-slate-200 bg-[#F8FAFC] text-primary"
                }`}
              >
                🤝 خدمة متبادلة (مقايضة)
              </button>
            </div>
          </Card.Body>
        </Card>

        {/* Feedback Tags */}
        <Card>
          <Card.Header>
            <Card.Title>ما أكثر ما أعجبك في المسافر؟</Card.Title>
            <Heart className="h-4 w-4 text-red-500" />
          </Card.Header>

          <Card.Body>
            <div className="flex flex-wrap gap-2 pt-1">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#F36F21] bg-[#F36F21] text-white shadow-sm"
                        : "border-slate-200 bg-white text-text-secondary hover:border-slate-300"
                    }`}
                  >
                    {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                  </button>
                );
              })}
            </div>
          </Card.Body>
        </Card>

        {/* Comments Box */}
        <Card>
          <Card.Header>
            <Card.Title>ملاحظات إضافية (اختياري)</Card.Title>
          </Card.Header>

          <Card.Body>
            <textarea
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="اكتب كلمة شكر أو أي تفاصيل ترغب بمشاركتها..."
              maxLength={150}
              className="w-full rounded-[14px] border border-slate-200 bg-[#FAFBFC] p-3 text-right text-[13px] text-primary outline-none focus:border-accent focus:bg-white resize-none"
            />
            <span className="text-[11px] text-text-muted block text-left">
              {comments.length}/150 حرف
            </span>
          </Card.Body>
        </Card>

        {/* Submit */}
        <Button
          type="submit"
          variant="accent"
          size="md"
          fullWidth
          isLoading={isSubmitting}
          className="mt-2 cursor-pointer"
        >
          إرسال التقييم
        </Button>
      </form>
    </AppLayout>
  );
}
