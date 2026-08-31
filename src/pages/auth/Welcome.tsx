import { useNavigate } from "react-router-dom";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { Button } from "../../components/ui/button/Button";
import { Sparkles, ShieldCheck, Truck } from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <MobileContainer className="justify-center items-center px-4 py-8 bg-background">
      <div className="w-full max-w-90 rounded-xl border border-[#E1E4E8] bg-white px-7 py-8 shadow-sm text-center">
        {/* App Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/logo.png"
            alt="بطريقك"
            className="h-18.75 w-19.5 object-contain drop-shadow-sm"
          />
        </div>

        {/* Brand Title & Tagline */}
        <h1 className="text-[26px] font-extrabold text-primary leading-tight">
          في الطريق
        </h1>
        <p className="mt-2 text-[14px] text-text-secondary leading-relaxed">
          شبكة التوصيل التضامنية بين الجيران في قطاع غزة
        </p>

        {/* Feature Highlights */}
        <div className="my-6 space-y-2.5 rounded-[16px] bg-background p-4 text-right text-[12.5px] text-primary border border-border/60">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-accent shrink-0" />
            <span>وصّل أغراض جيرانك أثناء خط سيرك واكسب أجر المشوار</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-success shrink-0" />
            <span>مجتمع آمن وموثوق بتقييمات وتأكيد هويات معتمد</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent shrink-0" />
            <span>احصل على 3 عملات ترحيبية مجانية فور التسجيل!</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button
            variant="accent"
            size="md"
            fullWidth
            onClick={() => navigate("/login")}
          >
            تسجيل الدخول
          </Button>

          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={() => navigate("/register-step1")}
          >
            إنشاء حساب جديد
          </Button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-2 text-[13px] font-medium text-text-secondary hover:text-primary transition-colors"
          >
            تصفح الطلبات كزائر
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
