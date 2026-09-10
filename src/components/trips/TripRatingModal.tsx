import { useState } from "react";
import { X, Star } from "lucide-react";

interface TripRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetName: string;
  targetRole?: string;
  targetAvatar?: string;
  onSubmit: (rating: number, comment: string) => void;
}

export function TripRatingModal({
  isOpen,
  onClose,
  targetName,
  targetRole = "مسافر",
  targetAvatar,
  onSubmit,
}: TripRatingModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const getRatingLabel = (score: number) => {
    switch (score) {
      case 5:
        return "ممتاز جداً ⭐⭐⭐⭐⭐";
      case 4:
        return "جيد جداً ⭐⭐⭐⭐";
      case 3:
        return "جيد ⭐⭐⭐";
      case 2:
        return "مقبول ⭐⭐";
      case 1:
        return "سيء ⭐";
      default:
        return "";
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSubmit(rating, comment);
    }, 600);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setRating(5);
    setComment("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-right border border-border">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute left-4 top-4 rounded-full p-1.5 text-text-muted hover:bg-slate-100 hover:text-primary transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSubmitted ? (
          <div className="space-y-5">
            {/* Target Header */}
            <div className="text-center space-y-2 pt-2">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#123A68] text-lg font-black text-white shadow-md overflow-hidden">
                {targetAvatar ? (
                  <img
                    src={targetAvatar}
                    alt={targetName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  targetName.slice(0, 2)
                )}
              </div>
              <div>
                <h3 className="text-base font-black text-[#123A68]">
                  تقييم {targetName}
                </h3>
                <p className="text-xs text-text-secondary">
                  {targetRole} • شاركنا رأيك في التعامل والتوصيل
                </p>
              </div>
            </div>

            {/* Stars Selector */}
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-115 active:scale-95 cursor-pointer"
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          active
                            ? "fill-amber-400 text-amber-400 drop-shadow-xs"
                            : "text-slate-200 fill-slate-50"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <p className="text-xs font-bold text-amber-600">
                {getRatingLabel(hoverRating || rating)}
              </p>
            </div>

            {/* Feedback textarea */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-bold text-text-primary block">
                ملاحظاتك الإضافية (اختياري)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="اكتب تعليقك حول الالتزام بالوقت، التعامل، أو سلامة الأغراض..."
                rows={3}
                className="w-full resize-none rounded-2xl border border-border bg-slate-50/50 p-3 text-xs text-primary placeholder:text-text-muted focus:border-[#123A68] focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#123A68] text-xs font-bold text-white shadow-md hover:bg-[#0E2E54] active:scale-98 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-10 w-full items-center justify-center rounded-2xl text-xs font-medium text-text-secondary hover:bg-slate-100 transition-all cursor-pointer"
              >
                تخطي الآن
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
              <span className="text-2xl">✓</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-[#123A68]">
                شكراً لتقييمك!
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                ملاحظاتك تساهم في الحفاظ على مجتمع موثوق وآمن للجميع في بطريقك.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="flex h-11 w-full items-center justify-center rounded-2xl bg-[#123A68] text-xs font-bold text-white shadow-md transition-all cursor-pointer mt-3"
            >
              تم
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
