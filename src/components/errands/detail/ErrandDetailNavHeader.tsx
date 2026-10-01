import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface ErrandDetailNavHeaderProps {
  onBack: () => void;
  isOwner: boolean;
}

export const ErrandDetailNavHeader: FC<ErrandDetailNavHeaderProps> = ({
  onBack,
  isOwner,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between pb-1">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-black text-[#123A68] hover:text-[#F36F21] transition-colors cursor-pointer py-1.5 px-2 rounded-xl hover:bg-slate-100 -mr-2"
        >
          <ChevronRight className="h-5 w-5 stroke-[2.5]" />
          <span>العودة للطلبات</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/home")}
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-accent transition-colors cursor-pointer py-1.5 px-2 rounded-xl hover:bg-slate-100"
          title="الصفحة الرئيسية"
        >
          <Home className="h-4 w-4" />
          <span>الرئيسية</span>
        </button>
      </div>

      <span className="text-xs font-bold text-slate-400">
        {isOwner ? "إدارة الطلب" : "عرض تفاصيل الطلب"}
      </span>
    </div>
  );
};
