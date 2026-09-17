import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

export default function PaymentCard() {
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
              عنوان الصفحة
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
              Progress
          ========================= */}
          <div className="flex items-center justify-between mb-6">
            {["السلة", "الدفع", "التأكيد"].map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-2"
              >
                <div
                  className={`
                    w-7
                    h-7
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-xs
                    font-bold
                    ${
                      index === 1
                        ? "bg-[#FF7817] text-white"
                        : "bg-[#123A68] text-white"
                    }
                  `}
                >
                  {index + 1}
                </div>

                <span className="text-xs text-[#6B7C93]">
                  {step}
                </span>
              </div>
            ))}
          </div>

          {/* =========================
              Payment Card
          ========================= */}
          <div
            className="
              bg-white
              rounded-2xl
              p-5
              border
              border-[#E3E8EF]
            "
          >
            {/* =========================
                Card Preview
            ========================= */}
            <div
              className="
                h-48
                rounded-2xl
                bg-[#123A68]
                p-5
                text-white
                shadow-lg
              "
            >
              <div className="flex justify-between">
                <span className="text-sm opacity-80">
                  بطاقة الدفع
                </span>

                <span>💳</span>
              </div>

              <div className="mt-10 text-xl tracking-[5px]">
                •••• •••• •••• 1234
              </div>

              <div className="flex justify-between mt-7 text-xs">
                <span>بطاقة المستخدم</span>
                <span>12/28</span>
              </div>
            </div>

            {/* =========================
                Form
            ========================= */}
            <div className="space-y-4 mt-6">

              {/* رقم البطاقة */}
              <div>
                <label className="text-sm font-bold block mb-2">
                  رقم البطاقة
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="0000 0000 0000 0000"
                  className="
                    w-full
                    h-12
                    rounded-xl
                    border
                    border-[#E3E8EF]
                    px-4
                    outline-none
                    focus:border-[#123A68]
                  "
                />
              </div>

              {/* اسم حامل البطاقة */}
              <div>
                <label className="text-sm font-bold block mb-2">
                  اسم حامل البطاقة
                </label>

                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  className="
                    w-full
                    h-12
                    rounded-xl
                    border
                    border-[#E3E8EF]
                    px-4
                    outline-none
                    focus:border-[#123A68]
                  "
                />
              </div>

              {/* تاريخ الانتهاء + CVV */}
              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label className="text-sm font-bold block mb-2">
                    تاريخ الانتهاء
                  </label>

                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="
                      w-full
                      h-12
                      rounded-xl
                      border
                      border-[#E3E8EF]
                      px-4
                      outline-none
                      focus:border-[#123A68]
                    "
                  />
                </div>

                <div>
                  <label className="text-sm font-bold block mb-2">
                    CVV
                  </label>

                  <input
                    type="password"
                    inputMode="numeric"
                    placeholder="•••"
                    className="
                      w-full
                      h-12
                      rounded-xl
                      border
                      border-[#E3E8EF]
                      px-4
                      outline-none
                      focus:border-[#123A68]
                    "
                  />
                </div>

              </div>
            </div>

            {/* =========================
                Continue
            ========================= */}
            <button
              type="button"
              onClick={() => navigate("/wallet/payment-qr")}
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
              المتابعة للدفع
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}