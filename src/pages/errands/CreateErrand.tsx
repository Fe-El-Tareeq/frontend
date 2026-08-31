import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ChevronRight,
  MessageSquare,
  Mic,
  Zap,
  Package,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { Form } from "../../components/ui/form/Form";
import { Alert } from "../../components/ui/feedback/Alert";
import { useErrands } from "../../hooks/useErrands";
import { useWallet } from "../../hooks/useWallet";
import { useAuth } from "../../hooks/useAuth";
import { useLocations } from "../../hooks/useLocations";
import { getApiErrorMessage } from "../../utils/apiError";

const createErrandSchema = z.object({
  description: z
    .string()
    .min(3, "يرجى كتابة وصف دقيق للأغراض المطلوبة")
    .max(300, "الوصف طويل جداً (الحد الأقصى 300 حرف)"),
  city: z.string().optional(),
  neighborhoodId: z.string().min(1, "يرجى اختيار الحي"),
});

type CreateErrandFormData = z.infer<typeof createErrandSchema>;

export default function CreateErrand() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { tokenBalance } = useWallet();
  const { neighborhoods, isLoadingNeighborhoods } = useLocations();
  const { createErrand, isCreating } = useErrands();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateErrandFormData>({
    resolver: zodResolver(createErrandSchema),
    defaultValues: {
      description: "",
      city: "غزة",
      neighborhoodId: "",
    },
  });

  const descriptionValue = watch("description") || "";

  const onSubmit = async (data: CreateErrandFormData) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (tokenBalance < 1) {
      setErrorMessage("رصيدك من التوكنز غير كافٍ لنشر طلب جديد. يرجى شحن محفظتك.");
      return;
    }

    setErrorMessage(null);
    try {
      const clientRequestKey =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : "req-" + Math.random().toString(36).substring(2, 15);

      const defaultCategoryId = "60a32850-bd3f-444a-84b4-c750abf6ecb6";

      await createErrand({
        clientRequestKey,
        categoryId: defaultCategoryId,
        title: data.description.slice(0, 40) + "...",
        itemsDescription: data.description,
        destinationKeyword: data.city || "غزة",
        weightClass: "LIGHT",
        isUrgent: false,
        isInterZone: false,
      });

      navigate("/errands");
    } catch (err: unknown) {
      const msg = getApiErrorMessage(
        err,
        "تعذر نشر الطلب، يرجى التأكد من اكتمال بيانات ملفك الشخصي."
      );
      setErrorMessage(msg);
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-12 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title Header */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#123A68]">إنشاء طلب جديد</h1>
            <p className="text-xs text-text-secondary">
              صف ما تحتاجه وسيجدك المسافرون المناسبون
            </p>
          </div>
        </div>

        {errorMessage && (
          <Alert variant="error" onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        )}

        {/* Main Card */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs text-right">
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Description textarea */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-primary">
                ماذا تحتاج؟ <span className="text-[#F36F21]">*</span>
              </label>
              <textarea
                rows={4}
                maxLength={300}
                placeholder="صف طلبك بالتفصيل: نوع الغرض، الحجم، الأهمية، أي تعليمات خاصة..."
                className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-3.5 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none resize-none text-right"
                {...register("description")}
              />
              <div className="flex justify-between text-[10.5px] text-text-muted">
                <span>{errors.description?.message}</span>
                <span>{descriptionValue.length}/300 حرف</span>
              </div>
            </div>

            {/* City */}
            <div className="mt-3 space-y-1">
              <label className="block text-xs font-bold text-primary">
                المدينة المطلوبة
              </label>
              <select
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary focus:border-accent focus:outline-none"
                {...register("city")}
              >
                <option value="غزة">غزة</option>
                <option value="شمال غزة">شمال غزة</option>
                <option value="دير البلح">دير البلح</option>
                <option value="خان يونس">خان يونس</option>
                <option value="رفح">رفح</option>
              </select>
            </div>

            {/* Neighborhood */}
            <div className="mt-3 space-y-1">
              <label className="block text-xs font-bold text-primary">الحي</label>
              <select
                disabled={isLoadingNeighborhoods}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs text-primary focus:border-accent focus:outline-none"
                {...register("neighborhoodId")}
              >
                <option value="">
                  {isLoadingNeighborhoods
                    ? "جاري تحميل الأحياء..."
                    : "حيّك أو الحي المطلوب"}
                </option>
                {neighborhoods.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                ))}
              </select>
              {errors.neighborhoodId && (
                <p className="text-[11px] text-red-500 font-medium">
                  {errors.neighborhoodId.message}
                </p>
              )}
            </div>

            {/* Voice Note Option */}
            <div className="mt-4 rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200 space-y-2.5 text-right">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#123A68]">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="text-right">
                  <h4 className="text-xs font-black text-primary">
                    تسجيل رسالة صوتية (اختياري)
                  </h4>
                  <p className="text-[10.5px] text-text-muted">
                    اشرح طلبك بصوتك لمزيد من الوضوح
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`flex h-10 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed text-xs font-bold transition-all cursor-pointer ${
                  isRecording
                    ? "border-red-400 bg-red-50 text-red-600 animate-pulse"
                    : "border-slate-300 bg-white text-primary hover:border-accent"
                }`}
              >
                <Mic className="h-4 w-4" />
                <span>{isRecording ? "جاري التسجيل... اضغط للإيقاف" : "اضغط للتسجيل"}</span>
              </button>
            </div>

            {/* Token Fee Alert Box */}
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#FFF5EE] p-3.5 border border-[#FDE0CE]">
              <div className="flex items-center gap-2">
                <Zap className="h-4.5 w-4.5 text-[#F36F21] fill-[#F36F21]" />
                <div className="text-right">
                  <span className="text-xs font-black text-[#123A68] block">
                    تكلفة نشر الطلب
                  </span>
                  <span className="text-[10.5px] text-text-secondary">
                    سيخصم توكن واحد من رصيدك (رصيدك: {tokenBalance ?? 0} توكن)
                  </span>
                </div>
              </div>
              <span className="text-xs font-black text-[#F36F21]">1 توكن</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex items-center gap-3">
              <button
                type="submit"
                disabled={isCreating}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all disabled:opacity-60 cursor-pointer"
              >
                <Package className="h-4 w-4" />
                <span>{isCreating ? "جاري النشر..." : "نشر الطلب"}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-3 text-xs font-bold text-text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          </Form>
        </div>
      </div>
    </MobileContainer>
  );
}
