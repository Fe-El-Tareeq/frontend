import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Loader2 } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { paymentsApi } from "../../api/payments";

// Modular sub-components
import { PaymentStepper } from "../../components/wallet/PaymentStepper";
import { TokenPackageCard } from "../../components/wallet/TokenPackageCard";
import { WalletTrustBadges } from "../../components/wallet/WalletTrustBadges";

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
  const [packages, setPackages] = useState<TokenPackage[]>(TOKEN_PACKAGES);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchBackendPackages = async () => {
      try {
        setIsLoading(true);
        const res = await paymentsApi.getPackages();
        if (isMounted && res.data?.packages && res.data.packages.length > 0) {
          const mapped: TokenPackage[] = res.data.packages.map((p) => ({
            id: p.id,
            name: p.name,
            subtitle: p.bonusTokens
              ? `يشمل ${p.bonusTokens} توكن هدية`
              : "الخيار الأفضل للبدء",
            tokens: p.totalTokens || p.tokenAmount + (p.bonusTokens || 0),
            priceNis: p.priceNis,
            ratePerToken: `${(
              p.priceNis / (p.totalTokens || p.tokenAmount || 1)
            ).toFixed(1)} ₪ لكل توكن`,
            isPopular: p.tokenAmount === 25 || p.totalTokens === 25,
            features: [
              "نشر الطلبات فوراً",
              "صلاحية 3 أشهر",
              ...(p.bonusTokens ? [`+${p.bonusTokens} توكن هدية`] : []),
            ],
          }));
          setPackages(mapped);
        }
      } catch (err) {
        if (isMounted) {
          console.error(
            "Failed to fetch packages from backend, using static packages.",
            err,
          );
          setPackages(TOKEN_PACKAGES);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchBackendPackages();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectPackage = (pkg: TokenPackage) => {
    navigate("/wallet/payment-method", { state: { package: pkg } });
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Title */}
        <div className="flex items-center justify-start">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="الرجوع للخلف"
            className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68] dark:text-white">شراء توكنز</h1>
            <p className="text-xs text-text-secondary dark:text-slate-400 mt-0.5">
              اختر الباقة الأنسب لاحتياجك
            </p>
          </div>
        </div>

        {/* 4-Step Progress Stepper */}
        <PaymentStepper currentStep={1} />

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {isLoading && (
            <div className="flex justify-center py-6 col-span-full">
              <Loader2 className="h-7 w-7 animate-spin text-[#123A68] dark:text-accent" />
            </div>
          )}

          {packages.map((pkg) => (
            <TokenPackageCard
              key={pkg.id}
              pkg={pkg}
              onSelect={handleSelectPackage}
            />
          ))}
        </div>

        {/* Bottom Trust Badges */}
        <WalletTrustBadges />
      </div>
    </MobileContainer>
  );
}
