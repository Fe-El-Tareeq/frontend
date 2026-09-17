import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function ReportSuccess() {
  const navigate = useNavigate();

  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F7FA]">
      <Header />

      <main className="flex min-h-screen items-center justify-center px-4 pb-12 pt-[82px] lg:mr-[256px]">

        <div className="w-full max-w-[500px] rounded-[20px] bg-white p-7 text-center shadow-sm">

          <div className="mx-auto flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#00A394] text-[38px] text-white shadow-lg">
            ✓
          </div>

          <h1 className="mt-6 text-[24px] font-extrabold text-[#102F57]">
            تم إرسال البلاغ
          </h1>

          <p className="mt-3 text-[13px] leading-7 text-[#7B8794]">
            تم استلام بلاغك بنجاح وسيقوم فريق الدعم بمراجعته والرد عليك
            في أقرب وقت ممكن.
          </p>

          <div className="mt-5 rounded-[14px] bg-[#F5F7FA] p-4 text-right">

            <div className="flex justify-between border-b border-[#E3E8EF] py-3">
              <span className="text-[12px] text-[#8B96A5]">
                رقم البلاغ
              </span>

              <span className="text-[12px] font-bold text-[#263F61]">
                #RPT-123456
              </span>
            </div>

            <div className="flex justify-between py-3">
              <span className="text-[12px] text-[#8B96A5]">
                الحالة
              </span>

              <span className="text-[12px] font-bold text-[#00A394]">
                قيد المراجعة
              </span>
            </div>

          </div>

          <button
            type="button"
            onClick={() => navigate("/settings")}
            className="mt-5 h-[48px] w-full rounded-[12px] bg-[#234A7D] font-bold text-white"
          >
            العودة إلى الإعدادات
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mt-3 h-[48px] w-full rounded-[12px] bg-[#F0F3F7] font-bold text-[#234A7D]"
          >
            الرئيسية
          </button>

        </div>

      </main>
    </div>
  );
}

export default ReportSuccess;