import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

export default function PaymentConfirm() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA]"
    >
      {/* Header + Sidebar */}
      <Header />

      <main
        className="
          min-h-screen
          pt-[105px]
          px-5
          pb-10
          lg:mr-[256px]
        "
      >
        <div className="max-w-2xl mx-auto">

          {/* العنوان */}
          <div className="flex items-center gap-4 mb-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-white
                border
                border-[#E3E8EF]
                text-[#123A68]
                text-xl
                shadow-sm
              "
            >
              ←
            </button>

            <h1 className="font-bold text-xl text-[#123A68]">
              إتمام الدفع
            </h1>
          </div>

          {/* البطاقة */}
          <div
            className="
              bg-white
              rounded-2xl
              border
              border-[#E3E8EF]
              p-5
            "
          >
            {/* التنبيه */}
            <div
              className="
                bg-[#FFF1E8]
                border
                border-[#FF7817]/30
                rounded-xl
                p-4
                text-sm
                text-[#123A68]
              "
            >
              يرجى التأكد من بيانات العملية قبل تأكيد الدفع.
            </div>

            {/* تفاصيل العملية */}
            <h2 className="font-bold mt-6 mb-4">
              تفاصيل العملية
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-[#6B7C93]">
                  طريقة الدفع
                </span>

                <span className="font-bold">
                  بطاقة بنكية
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#6B7C93]">
                  المبلغ
                </span>

                <span className="font-bold">
                  25 نقطة
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#6B7C93]">
                  رقم العملية
                </span>

                <span className="font-bold">
                  #BT-10245
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#6B7C93]">
                  التاريخ
                </span>

                <span className="font-bold">
                  اليوم
                </span>
              </div>

            </div>

            {/* تأكيد */}
            <button
              type="button"
              onClick={() => navigate("/wallet/success")}
              className="
                w-full
                bg-[#123A68]
                text-white
                rounded-xl
                py-3
                mt-7
                font-bold
                hover:bg-[#0D3158]
                transition
              "
            >
              تأكيد الدفع
            </button>

          </div>
        </div>
      </main>
    </div>
  );
}