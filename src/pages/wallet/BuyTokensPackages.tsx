import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Zap,
  ArrowLeft,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Check,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";

export interface TokenPackage {
  id: string;
  name: string;
  subtitle: string;
  tokens: number;
  priceNis: number;
  ratePerToken: string;
  isPopular?: boolean;
  features: string[];
}

export const TOKEN_PACKAGES: TokenPackage[] = [
  {
    id: "pkg-basic",
    name: "الباقة الأساسية",
    subtitle: "للاستخدام الخفيف والتجريب",
    tokens: 10,
    priceNis: 5,
    ratePerToken: "2 ₪ لكل توكن مع 2 توكن هدية من منصة بطريقك",
    features: ["نشر الطلبات فوراً", "صلاحية 3 أشهر"],
  },
  {
    id: "pkg-medium",
    name: "الباقة المتوسطة",
    subtitle: "الأكثر شيوعاً للمستخدم العادي",
    tokens: 25,
    priceNis: 10,
    ratePerToken: "2 ₪ لكل توكن نسبة التوفير 20%",
    isPopular: true,
    features: ["نشر الطلبات فوراً", "صلاحية 3 أشهر", "خصم 20%"],
  },
  {
    id: "pkg-pro",
    name: "الباقة الاحترافية",
    subtitle: "للمستخدمين الدائمين والنشطين",
    tokens: 50,
    priceNis: 15,
    ratePerToken: "2 ₪ لكل توكن نسبة التوفير 40%",
    features: [
      "نشر الطلبات فوراً",
      "صلاحية 3 أشهر",
      "خصم 40%",
      "أولوية في البحث",
    ],
  },
  {
    id: "pkg-enterprise",
    name: "الباقة المؤسسية",
    subtitle: "لأصحاب الأعمال والاستخدام المكثف",
    tokens: 100,
    priceNis: 25,
    ratePerToken: "2 ₪ لكل توكن نسبة التوفير 50%",
    features: [
      "نشر الطلبات فوراً",
      "صلاحية 3 أشهر",
      "خصم 50%",
      "أولوية في البحث",
    ],
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
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68]">شراء توكنز</h1>
            <p className="text-xs text-text-secondary mt-0.5">
              اختر الباقة الأنسب لاحتياجك
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

        {/* 4-Step Progress Bar (Step 1 Active) */}
        <div className="flex items-center justify-between rounded-2xl bg-white p-3 border border-slate-200/80 shadow-2xs text-[11px] font-bold text-center">
          <div className="flex items-center gap-1.5 text-[#123A68] font-black">
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
        <div className="space-y-4 pt-1">
          {TOKEN_PACKAGES.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-5 border transition-all ${
                  pkg.isPopular
                    ? "bg-white border-[#F36F21] shadow-md ring-1 ring-[#F36F21]/20"
                    : "bg-white border-slate-200/90 shadow-xs hover:border-[#123A68]/30"
                }`}
              >
                {pkg.isPopular && (
                  <span className="absolute -top-3 right-8 rounded-full bg-[#F36F21] px-3 py-0.5 text-[10.5px] font-black text-white shadow-xs">
                    ★ الأكثر شيوعاً
                  </span>
                )}

                <div className="flex items-start justify-between">
                  <div className="text-right space-y-0.5">
                    <h3 className="text-base font-black text-[#123A68]">
                      {pkg.name}
                    </h3>
                    <p className="text-[11px] text-text-muted">
                      {pkg.subtitle}
                    </p>
                  </div>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                      pkg.isPopular
                        ? "bg-orange-500 text-white"
                        : "bg-[#123A68] text-white"
                    }`}
                  >
                    <Zap className="h-5 w-5 fill-white" />
                  </div>
                </div>

                <div className="my-3 space-y-1">
                  <div className="flex items-baseline gap-1 text-right">
                    <span className="text-3xl font-black text-[#123A68]">
                      {pkg.tokens}
                    </span>
                    <span className="text-xs font-bold text-text-muted">
                      توكن
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#123A68]">
                      {pkg.priceNis}
                    </span>
                    <span className="text-base font-black text-[#123A68]">
                      ₪
                    </span>
                  </div>

                  <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 inline text-emerald-600 stroke-[3]" />
                    <span>{pkg.ratePerToken}</span>
                  </p>
                </div>

                <hr className="border-slate-100 my-3" />

                {/* Features */}
                <div className="space-y-2 text-xs text-slate-600 pb-4 text-right">
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
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
            <Sparkles className="h-3.5 w-3.5 text-[#123A68]" />
            <span>تفعيل فوري بعد الدفع</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1">
            <RefreshCw className="h-3.5 w-3.5 text-blue-600" />
            <span>استرداد خلال 7 أيام</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
            <span>دفع آمن ومشفر</span>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
