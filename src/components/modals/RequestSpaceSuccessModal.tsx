import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RequestSpaceSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId?: string;
}

export function RequestSpaceSuccessModal({
  isOpen,
  onClose,
  tripId,
}: RequestSpaceSuccessModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-sm rounded-[28px] bg-white p-7 text-center shadow-xl space-y-4 text-right"
        dir="rtl"
      >
        {/* Peach circle with orange check */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF0E6]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-xs">
            <Check className="h-6 w-6 stroke-[3]" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-1 text-center">
          <h3 className="text-xl font-black text-[#123A68]">
            تم إرسال طلبك بنجاح
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed max-w-[240px] mx-auto">
            سيتم إشعارك فور موافقة السائق على مشاركتك بالرحلة
          </p>
        </div>

        {/* Buttons */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate(tripId ? `/trips/${tripId}` : "/trips");
            }}
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#F36F21] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer"
          >
            تتبع حالة الطلب
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/trips");
            }}
            className="w-full py-2.5 text-xs font-bold text-[#123A68] hover:text-[#F36F21] transition-colors cursor-pointer"
          >
            العودة للرحلات
          </button>
        </div>
      </div>
    </div>
  );
}
