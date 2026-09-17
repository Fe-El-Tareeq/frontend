import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function ReportDetails() {
  const navigate = useNavigate();

  const [details, setDetails] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const submitReport = () => {
    if (!details.trim()) return;

    navigate("/report-success");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F7FA]">
      <Header />

      <main className="min-h-screen px-4 pb-12 pt-[105px] lg:mr-[256px] lg:px-8">
        <div className="mx-auto max-w-[850px]">

          <button
            type="button"
            onClick={() => navigate("/report-problem")}
            className="mb-4 text-[22px] text-[#234A7D]"
          >
            ←
          </button>

          <h1 className="text-[24px] font-extrabold text-[#102F57]">
            تفاصيل المشكلة
          </h1>

          <p className="mt-1 text-[13px] text-[#7B8794]">
            أخبرنا بالتفصيل عما حدث لنتمكن من مساعدتك
          </p>

          {/* نوع المشكلة */}
          <div className="mt-5 rounded-[15px] bg-white p-5 shadow-sm">

            <label className="mb-2 block text-[13px] font-bold text-[#263F61]">
              نوع المشكلة
            </label>

            <div className="rounded-[11px] border border-[#E3E8EF] bg-[#FAFBFC] p-3 text-[13px] font-bold text-[#263F61]">
              مشكلة في الدفع
            </div>

            {/* رقم الطلب */}
            <label className="mb-2 mt-5 block text-[13px] font-bold text-[#263F61]">
              رقم الطلب أو العملية
            </label>

            <input
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="اختياري"
              className="h-[48px] w-full rounded-[11px] border border-[#E3E8EF] px-4 text-right text-[13px] outline-none focus:border-[#234A7D]"
            />

            {/* التفاصيل */}
            <label className="mb-2 mt-5 block text-[13px] font-bold text-[#263F61]">
              وصف المشكلة
            </label>

            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="اكتب تفاصيل المشكلة هنا..."
              className="min-h-[150px] w-full resize-none rounded-[11px] border border-[#E3E8EF] p-4 text-right text-[13px] outline-none focus:border-[#234A7D]"
            />

            {/* إرفاق */}
            <button
              type="button"
              className="mt-4 flex h-[48px] w-full items-center justify-center gap-2 rounded-[11px] border border-dashed border-[#B8C3D0] text-[13px] font-bold text-[#617086]"
            >
              📎 إرفاق صورة أو ملف
            </button>

          </div>

          {/* تنبيه */}
          <div className="mt-4 rounded-[13px] bg-[#FFF7E8] p-4 text-[12px] leading-6 text-[#9A6A15]">
            يرجى عدم مشاركة كلمات المرور أو رموز التحقق أو أي معلومات
            مالية حساسة في وصف المشكلة.
          </div>

          <button
            type="button"
            onClick={submitReport}
            className="mt-5 h-[50px] w-full rounded-[12px] bg-[#E74C3C] font-bold text-white"
          >
            إرسال البلاغ
          </button>

        </div>
      </main>
    </div>
  );
}

export default ReportDetails;