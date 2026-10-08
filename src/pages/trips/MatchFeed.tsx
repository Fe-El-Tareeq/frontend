import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, MapPin, CheckCircle, XCircle, Zap, ChevronRight } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { Card } from "../../components/ui/card/Card";
import { Button } from "../../components/ui/button/Button";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { WeightBadge } from "../../components/ui/badge/WeightBadge";
import type { WeightClass } from "../../types";

interface MatchItem {
  id: string;
  title: string;
  itemsDescription: string;
  destination: string;
  neighborhood: string;
  matchScore: number;
  distanceCategory: "SAME_NEIGHBORHOOD" | "ADJACENT_ZONE";
  feeNis: number;
  weightClass: WeightClass;
  isUrgent: boolean;
  timeEstimate: string;
}

export default function MatchFeed() {
  const navigate = useNavigate();

  /*
   * ============================================================================
   * BACKEND INTEGRATION: Trip Matching Errands Feed
   * Endpoint: GET /api/v1/matching/trips/:id?limit=10
   * Response schema: { matches: [{ errand: Errand, score: number }], limit, recalculatedAt }
   * When empty or pending, renders EmptyState from design system without mock data.
   * ============================================================================
   */
  const [matches, setMatches] = useState<MatchItem[]>([]);

  const handleAccept = (matchId: string) => {
    navigate(`/errands/${matchId}/tracking`);
  };

  const handleDismiss = (matchId: string) => {
    setMatches((prev) => prev.filter((m) => m.id !== matchId));
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Title */}
        <div className="flex items-center gap-2 justify-start">
          <button
            type="button"
            onClick={() => typeof window !== "undefined" && window.history.length > 1 ? navigate(-1) : navigate("/trips")}
            className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
            aria-label="رجوع"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-[#123A68] dark:text-white">
              الطلبات المطابقة لرحلتك
            </h1>
            <p className="text-xs text-text-secondary dark:text-slate-400 mt-0.5">
              تم العثور على {matches.length} طلبات على نفس خط سيرك
            </p>
          </div>
        </div>

        {/* Match Algorithm Banner */}
        <div className="rounded-3xl bg-linear-to-l from-[#123A68] to-[#1D4A7F] p-4.5 text-white shadow-md">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
            <span className="text-xs font-bold text-amber-300">
              خوارزمية التطابق الذكي
            </span>
          </div>
          <p className="mt-1 text-xs text-white/80 leading-relaxed">
            يتم ترتيب الطلبات وفقاً لأقرب مسار زمني ومكاني لخط سير رحلتك.
          </p>
        </div>

        {/* Empty State or Matches List */}
        {matches.length === 0 ? (
          <EmptyState
            icon={<Sparkles className="h-8 w-8 text-[#123A68]" />}
            title="لا توجد طلبات مطابقة حالياً"
            description="ستظهر هنا الطلبات المتوافقة مع مسار ووقت رحلتك تلقائياً فور توفرها."
            actionText="العودة للرحلات"
            onAction={() => navigate("/trips")}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((item) => (
              <Card key={item.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-primary">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      {item.itemsDescription}
                    </p>
                  </div>
                  <WeightBadge weightClass={item.weightClass} />
                </div>

                <div className="flex items-center justify-between text-xs text-text-secondary pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-text-muted" />
                    <span>{item.destination}</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-[#F36F21]">
                    <Zap className="h-3.5 w-3.5" />
                    <span>{item.feeNis} شيكل</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleAccept(item.id)}
                  >
                    <CheckCircle className="h-4 w-4 ml-1" />
                    قبول التوصيل
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDismiss(item.id)}
                  >
                    <XCircle className="h-4 w-4 ml-1" />
                    تخطي
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
