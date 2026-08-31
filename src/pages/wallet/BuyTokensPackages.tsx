import { useNavigate } from "react-router-dom";
import { ChevronRight, Zap, ArrowLeft, ShieldCheck, RefreshCw, Sparkles } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";

export interface TokenPackage {
  id: string;
  name: string;
  subtitle: string;
  tokens: number;
  priceUsd: number;
  ratePerToken: string;
  isPopular?: boolean;
  features: string[];
}

export const TOKEN_PACKAGES: TokenPackage[] = [
  {
    id: "pkg-basic",
    name: "الباقة الأساسية",
    subtitle: "للاستخدام الخفيف والتجربة",
    tokens: 5,
    priceUsd: 5,
    ratePerToken: "1.00$ لكل توكن",
    features: ["نشر الطلبات فوراً", "صلاحية 3 أشهر"],
  },
  {
    id: "pkg-medium",
    name: "الباقة المتوسطة",
    subtitle: "الأكثر شيوعاً للمستخدم العادي",
    tokens: 20,
    priceUsd: 15,
    ratePerToken: "0.75$ لكل توكن",
    isPopular: true,
    features: ["نشر الطلبات فوراً", "صلاحية 3 أشهر", "خصم 25%"],
  },
  {
    id: "pkg-pro",
    name: "الباقة الاحترافية",
    subtitle: "للمستخدمين الدائمين والنشطين",
    tokens: 50,
    priceUsd: 30,
    ratePerToken: "0.60$ لكل توكن",
    features: ["نشر الطلبات فوراً", "صلاحية 3 أشهر", "خصم 40%", "أولوية في البحث"],
  },
  {
    id: "pkg-enterprise",
    name: "الباقة المؤسسية",
    subtitle: "لأصحاب الأعمال والاستخدام المكثف",
    tokens: 100,
    priceUsd: 50,
    ratePerToken: "0.50$ لكل توكن",
    features: ["نشر الطلبات فوراً", "صلاحية 3 أشهر", "خصم 50%", "أولوية في البحث"],
  },
];

export default function BuyTokensPackages() {
  const navigate = useNavigate();

  const handleSelectPackage = (pkg: TokenPackage) => {
    navigate("/wallet/payment-method", { state: { package: pkg } });
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#123A68]">شراء توكنز</h1>
            <p className="text-xs text-text-secondary">
              اختر الحزمة الأنسب لاحتياجاتك
            </p>
          </div>
        </div>

        {/* 4-Step Progress Bar (Step 1 Active) */}
        <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 border border-border shadow-2xs text-[11px] font-bold text-center">
          <div className="flex items-center gap-1.5 text-primary">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#123A68] text-white text-[10px]">
              1
            </span>
            <span>اختر الباقة</span>
          </div>
          <span className="text-slate-300">──</span>
          <div className="flex items-center gap-1 text-text-muted">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px]">
              2
            </span>
            <span>طريقة الدفع</span>
          </div>
          <span className="text-slate-300">──</span>
          <div className="flex items-center gap-1 text-text-muted">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px]">
              3
            </span>
            <span>إتمام الدفع</span>
          </div>
          <span className="text-slate-300">──</span>
          <div className="flex items-center gap-1 text-text-muted">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px]">
              4
            </span>
            <span>تم الشراء</span>
          </div>
        </div>

        {/* Packages Cards */}
        <div className="space-y-3.5 pt-1">
          {TOKEN_PACKAGES.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-5 border transition-all ${
                  pkg.isPopular
                    ? "bg-white border-[#F36F21] shadow-md ring-1 ring-[#F36F21]/20"
                    : "bg-white border-border shadow-xs hover:border-[#123A68]/30"
                }`}
              >
                {pkg.isPopular && (
                  <span className="absolute -top-3 right-6 rounded-full bg-[#F36F21] px-3 py-0.5 text-[10.5px] font-black text-white shadow-xs">
                    ⭐ الأكثر شيوعاً
                  </span>
                )}

                <div className="flex items-start justify-between">
                  <div className="text-right space-y-0.5">
                    <h3 className="text-base font-black text-[#123A68]">
                      {pkg.name}
                    </h3>
                    <p className="text-[11px] text-text-muted">{pkg.subtitle}</p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-[#F36F21]">
                    <Zap className="h-5 w-5 fill-[#F36F21]" />
                  </div>
                </div>

                <div className="my-3.5 flex items-baseline justify-between border-y border-slate-100 py-3">
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#123A68]">
                      {pkg.tokens}
                    </span>
                    <span className="text-xs font-bold text-text-muted mr-1.5">
                      توكن
                    </span>
                  </div>

                  <div className="text-left">
                    <span className="text-xl font-black text-[#F36F21]">
                      {pkg.priceUsd}$
                    </span>
                    <p className="text-[10px] text-emerald-600 font-bold">
                      ✓ {pkg.ratePerToken}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-1.5 text-xs text-text-secondary pb-4">
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Select Button */}
                <button
                  type="button"
                  onClick={() => handleSelectPackage(pkg)}
                  className={`flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-xs font-black transition-all active:scale-98 cursor-pointer ${
                    pkg.isPopular
                      ? "bg-[#F36F21] text-white shadow-md hover:bg-[#E05E12]"
                      : "bg-[#123A68] text-white shadow-xs hover:bg-[#0D2C50]"
                  }`}
                >
                  <span>اختر هذه الباقة</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Badges */}
        <div className="flex items-center justify-around rounded-2xl bg-white p-3.5 border border-slate-200 text-[10.5px] font-bold text-text-muted">
          <div className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-[#F36F21]" />
            <span>تفعيل فوري بعد الدفع</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <RefreshCw className="h-3.5 w-3.5 text-blue-600" />
            <span>استرداد خلال 7 أيام</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>دفع آمن ومشفر</span>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
