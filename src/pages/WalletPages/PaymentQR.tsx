import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

export default function PaymentQR() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA]"
    >
      {/* =========================
          Header + Sidebar
      ========================= */}
      <Header />

      {/* =========================
          المحتوى
      ========================= */}
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

          {/* =========================
              العنوان
          ========================= */}
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

          {/* =========================
              QR Card
          ========================= */}
          <div
            className="
              bg-white
              rounded-2xl
              border
              border-[#E3E8EF]
              p-6
              text-center
            "
          >
            {/* حالة الدفع */}
            <div
              className="
                inline-flex
                px-4
                py-2
                rounded-full
                bg-[#E8F7F0]
                text-[#22B573]
                text-sm
                mb-5
              "
            >
              تم إنشاء رمز الدفع
            </div>

            <h2 className="font-bold text-lg text-[#123A68]">
              امسح رمز QR لإتمام الدفع
            </h2>

            {/* QR Code */}
            <div
              className="
                w-64
                h-64
                mx-auto
                my-7
                border-8
                border-white
                shadow-md
                rounded-xl
                flex
                items-center
                justify-center
                bg-[#F5F7FA]
              "
            >
              <div className="grid grid-cols-9 gap-1">
                {Array.from({ length: 81 }).map((_, i) => (
                  <div
                    key={i}
                    className={`
                      w-4
                      h-4
                      ${
                        // شكل ثابت حتى لا يتغير الـ QR
                        // في كل إعادة رسم للصفحة
                        (i * 17 + 7) % 3 === 0 ||
                        (i * 11 + 5) % 7 === 0
                          ? "bg-[#123A68]"
                          : "bg-white"
                      }
                    `}
                  />
                ))}
              </div>
            </div>

            {/* التعليمات */}
            <div
              className="
                text-right
                space-y-3
                text-sm
                text-[#6B7C93]
              "
            >
              <p>● افتح تطبيق الدفع أو الكاميرا</p>
              <p>● وجه الكاميرا نحو رمز QR</p>
              <p>● تأكد من قيمة العملية قبل الدفع</p>
            </div>

            {/* زر الدفع */}
            <button
              type="button"
              onClick={() =>
                navigate("/wallet/payment-confirm")
              }
              className="
                w-full
                bg-[#123A68]
                text-white
                rounded-xl
                py-3
                mt-6
                font-bold
                hover:bg-[#0D3158]
                transition
              "
            >
              تم الدفع
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}