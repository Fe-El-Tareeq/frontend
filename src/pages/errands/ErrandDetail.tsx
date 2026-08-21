import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Play,
  Pause,
  Send,
  Zap,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useErrands } from "../../hooks/useErrands";
import { useAuth } from "../../hooks/useAuth";
import { useWallet } from "../../hooks/useWallet";

export default function ErrandDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { tokenBalance } = useWallet();
  const { errands, isLoading, isError } = useErrands();
  const errand = errands.find((e) => e.id === id) || {
    id: id || "errand-1",
    title: "توصيل دواء من صيدلية في غزة",
    itemsDescription: "محتاجة حد يجيب شحنة أدوية من صيدلية في غزة لعيلتي في دير البلح، الكمية صغيرة ومحتاجة إنها توصل بسرعة.",
    destinationKeyword: "دير البلح",
    neighborhood: { name: "وسط البلد" },
    requester: { fullName: "سارة خليل", trustScore: 98 },
    calculatedFeeNis: 5,
    createdAt: new Date().toISOString(),
  };
  const [isPlaying, setIsPlaying] = useState(false);

  if (isLoading) {
    return (
      <MobileContainer className="bg-[#F8FAFC] pb-12 text-right">
        <Header />
        <div className="p-5">
          <div className="h-64 w-full animate-pulse rounded-3xl bg-white border border-border" />
        </div>
      </MobileContainer>
    );
  }

  if (isError || !errand) {
    return (
      <MobileContainer className="bg-[#F8FAFC] pb-12 text-right">
        <Header />
        <div className="p-5 text-center">
          <div className="rounded-3xl bg-white p-8 border border-border">
            <h2 className="text-sm font-bold text-primary">الطلب غير موجود</h2>
            <button
              onClick={() => navigate("/errands")}
              className="mt-4 px-4 py-2 rounded-xl bg-[#F36F21] text-xs font-black text-white"
            >
              العودة للطلبات
            </button>
          </div>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Top Header */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary hover:text-accent transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#123A68]">تفاصيل الطلب</h1>
            <p className="text-xs text-text-secondary">
              راجع تفاصيل الطلب قبل حجز مكانك أو تقديم عرضك
            </p>
          </div>
        </div>

        {/* Main Details Card matching تفاصيل الطلب.png */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-4">
          {/* Requester Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
              مفتوح
            </span>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <h3 className="text-sm font-black text-primary">
                  {errand.requester?.fullName || "سارة خليل"}
                </h3>
                <p className="text-[10.5px] text-text-muted">
                  نشرت الطلب منذ 40 دقيقة
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#123A68] text-xs font-black text-white">
                {errand.requester?.fullName
                  ? errand.requester.fullName.slice(0, 2)
                  : "سخ"}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-text-muted block">
              ماذا تحتاج؟
            </span>
            <p className="text-xs text-primary leading-relaxed">
              {errand.itemsDescription ||
                "محتاجة حد يجيب شحنة أدوية من صيدلية في غزة لعيلتي في دير البلح، الكمية صغيرة ومحتاجة إنها توصل بسرعة."}
            </p>
          </div>

          {/* City Box */}
          <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200">
            <span className="text-[10.5px] text-text-muted block">
              المدينة المطلوبة
            </span>
            <span className="text-xs font-black text-[#123A68] mt-0.5 block">
              {errand.destinationKeyword || "دير البلح"}
            </span>
          </div>

          {/* Neighborhood Box */}
          <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200">
            <span className="text-[10.5px] text-text-muted block">الحي</span>
            <span className="text-xs font-black text-[#123A68] mt-0.5 block">
              {errand.neighborhood?.name || "وسط البلد"}
            </span>
          </div>

          {/* Voice Note Player Component */}
          <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200 space-y-2">
            <span className="text-[10.5px] text-text-muted block">رسالة صوتية</span>
            <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-text-muted">0:18</span>

              {/* Progress bar */}
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-[#F36F21] rounded-full transition-all duration-300 ${
                    isPlaying ? "w-3/4" : "w-1/3"
                  }`}
                />
              </div>

              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-xs hover:bg-[#E05E12] transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 mr-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* Token fee info */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-[11px] text-text-muted">
              رصيدك: {tokenBalance || 47} توكن
            </span>
            <div className="flex items-center gap-1 font-bold text-[#123A68]">
              <span>تكلفة نشر الطلب</span>
              <div className="flex items-center gap-0.5 text-[#F36F21]">
                <Zap className="h-3.5 w-3.5 fill-[#F36F21]" />
                <span>توكن واحد</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-[430px] bg-white/95 backdrop-blur-md border-t border-border p-3.5 shadow-lg">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              if (!isAuthenticated) navigate("/login");
              else navigate(`/errands/${id}/offer`);
            }}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all"
          >
            <span>قدم عرضك لتوصيل الطلب</span>
          </button>

          <button
            type="button"
            onClick={() => navigate(`/chat/${id}`)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-primary hover:border-accent hover:text-accent shadow-xs active:scale-95 transition-all"
          >
            <Send className="h-5 w-5 -rotate-45" />
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
