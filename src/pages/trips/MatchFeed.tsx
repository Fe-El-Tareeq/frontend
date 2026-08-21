import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Flame,
  Route,
  Zap,
} from "lucide-react";
import { AppLayout } from "../../components/layout/AppLayout";
import { Card } from "../../components/ui/card/Card";
import { Button } from "../../components/ui/button/Button";
import { WeightBadge } from "../../components/ui/badge/WeightBadge";
import type { WeightClass } from "../../types";

interface MockMatchItem {
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

  const [matches, setMatches] = useState<MockMatchItem[]>([
    {
      id: "match-1",
      title: "أدوية من صيدلية الشفاء",
      itemsDescription: "شريط خافض حرارة وعلبة فيتامينات للأطفال",
      destination: "صيدلية الشفاء - شارع الوحدة",
      neighborhood: "الرمال الشمالي",
      matchScore: 96,
      distanceCategory: "SAME_NEIGHBORHOOD",
      feeNis: 5,
      weightClass: "LIGHT",
      isUrgent: true,
      timeEstimate: "في طريقك تماماً (+2 دقيقة)",
    },
    {
      id: "match-2",
      title: "طرد من البريد المركزي",
      itemsDescription: "مغلف وثائق رسمية خفيف الوزن",
      destination: "مفترق السرايا - عمارة الأمل",
      neighborhood: "الرمال الجنوبي",
      matchScore: 88,
      distanceCategory: "SAME_NEIGHBORHOOD",
      feeNis: 7,
      weightClass: "LIGHT",
      isUrgent: false,
      timeEstimate: "انحراف طفيف (+5 دقائق)",
    },
    {
      id: "match-3",
      title: "مستلزمات مدرسية ومكتبية",
      itemsDescription: "دفاتر وأقلام من مكتبة اليازجي",
      destination: "مكتبة اليازجي - تل الهوا",
      neighborhood: "تل الهوا",
      matchScore: 74,
      distanceCategory: "ADJACENT_ZONE",
      feeNis: 5,
      weightClass: "MEDIUM",
      isUrgent: false,
      timeEstimate: "حي مجاور (+8 دقائق)",
    },
  ]);

  const handleAccept = (matchId: string) => {
    navigate(`/errands/${matchId}/tracking`);
  };

  const handleDismiss = (matchId: string) => {
    setMatches(matches.filter((m) => m.id !== matchId));
  };

  return (
    <AppLayout
      headerProps={{
        title: "الطلبات المطابقة لرحلتك",
        subtitle: `تم العثور على ${matches.length} طلبات على نفس خط سيرك`,
        showBack: true,
      }}
      showBottomNav={false}
    >
      <div className="space-y-4 pb-8">
        {/* Match Algorithm Banner */}
        <div className="rounded-[20px] bg-gradient-to-l from-primary via-primary to-primary-dark p-4 text-white shadow-md">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
            <span className="text-[14px] font-bold text-accent">
              محرك المطابقة الذكي
            </span>
          </div>
          <p className="mt-1 text-[12px] text-white/80 leading-relaxed">
            تم ترتيب هذه الطلبات حسب تطابقها العالي مع مسارك لتتمكن من كسب أجر التوصيل دون أن تنحرف عن طريقك!
          </p>
        </div>

        {/* Matches List */}
        {matches.length === 0 ? (
          <div className="rounded-[20px] bg-white p-8 text-center border border-border shadow-sm mt-8">
            <Route className="h-12 w-12 text-text-muted mx-auto mb-3" />
            <h3 className="text-[16px] font-bold text-primary">
              لا توجد طلبات أخرى مطابقة
            </h3>
            <p className="text-[13px] text-text-secondary mt-1 max-w-xs mx-auto">
              سنرسل لك إشعاراً فور ظهور أي طلب جديد على نفس خط مسارك.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => navigate("/")}
            >
              العودة للرئيسية
            </Button>
          </div>
        ) : (
          matches.map((item) => (
            <Card key={item.id} variant="elevated">
              <Card.Header>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 rounded-pill bg-accent-light px-2.5 py-0.5 text-[11px] font-extrabold text-accent border border-accent/20">
                      <Zap className="h-3.5 w-3.5" />
                      تطابق {item.matchScore}%
                    </span>
                    {item.isUrgent && (
                      <span className="inline-flex items-center gap-1 rounded-pill bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-600">
                        <Flame className="h-3 w-3" />
                        عاجل
                      </span>
                    )}
                  </div>
                  <Card.Title>{item.title}</Card.Title>
                </div>

                <div className="text-left">
                  <span className="text-[18px] font-extrabold text-accent block">
                    {item.feeNis} ₪
                  </span>
                  <span className="text-[10px] text-text-muted">أجر المشوار</span>
                </div>
              </Card.Header>

              <Card.Body>
                <p className="text-[13px] text-text-secondary leading-relaxed">
                  {item.itemsDescription}
                </p>

                <div className="mt-3 space-y-1.5 rounded-[12px] bg-background p-3 border border-border/50 text-[12px]">
                  <div className="flex items-center gap-1.5 text-primary">
                    <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                    <span className="font-bold">{item.destination}</span>
                    <span className="text-text-muted">({item.neighborhood})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-text-secondary">
                    <Clock className="h-3.5 w-3.5 text-text-muted shrink-0" />
                    <span>{item.timeEstimate}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <WeightBadge weightClass={item.weightClass} />
                  <span className="text-[11px] font-medium text-text-muted">
                    {item.distanceCategory === "SAME_NEIGHBORHOOD"
                      ? "نفس الحي"
                      : "حي مجاور"}
                  </span>
                </div>
              </Card.Body>

              <Card.Footer>
                <div className="flex gap-2 w-full">
                  <Button
                    variant="accent"
                    size="sm"
                    fullWidth
                    onClick={() => handleAccept(item.id)}
                    leftIcon={<CheckCircle className="h-4 w-4" />}
                  >
                    قبول وتوصيل ({item.feeNis} ₪)
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDismiss(item.id)}
                    className="text-text-muted hover:text-error px-3"
                    aria-label="تجاهل"
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          ))
        )}
      </div>
    </AppLayout>
  );
}
