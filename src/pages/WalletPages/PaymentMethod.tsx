import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

export default function PaymentMethod() {
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
              طريقة الدفع
            </h1>
          </div>

          {/* المحتوى */}
          <div
            className="
              bg-white
              rounded-2xl
              border
              border-[#E3E8EF]
              p-5
            "
          >
            <h2 className="font-bold text-lg text-[#123A68]">
              اختر طريقة الدفع
            </h2>

            {/* طرق الدفع */}
            <div className="space-y-3 mt-5">

              {/* البطاقة البنكية */}
              <button
                type="button"
                onClick={() =>
                  navigate("/wallet/payment-card")
                }
                className="
                  w-full
                  p-4
                  rounded-xl
                  border-2
                  border-[#123A68]
                  flex
                  items-center
                  justify-between
                  bg-white
                "
              >
                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      bg-[#F5F7FA]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    💳
                  </div>

                  <div className="text-right">
                    <p className="font-bold">
                      بطاقة بنكية
                    </p>

                    <p className="text-xs text-[#6B7C93]">
                      Visa / Mastercard
                    </p>
                  </div>

                </div>

                <span className="text-[#22B573]">
                  ✓
                </span>
              </button>

              {/* الدفع الإلكتروني */}
              <button
                type="button"
                className="
                  w-full
                  p-4
                  rounded-xl
                  border
                  border-[#E3E8EF]
                  flex
                  items-center
                  justify-between
                  bg-white
                "
              >
                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      bg-[#F5F7FA]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    📱
                  </div>

                  <div className="text-right">
                    <p className="font-bold">
                      الدفع الإلكتروني
                    </p>

                    <p className="text-xs text-[#6B7C93]">
                      الدفع عبر المحفظة
                    </p>
                  </div>

                </div>

                <span>
                  ○
                </span>
              </button>

            </div>

            {/* الإجمالي */}
            <div
              className="
                bg-[#F5F7FA]
                rounded-xl
                p-4
                mt-6
                flex
                justify-between
              "
            >
              <span className="text-[#6B7C93]">
                الإجمالي
              </span>

              <strong>
                10 شيكل
              </strong>
            </div>

            {/* متابعة الدفع */}
            <button
              type="button"
              onClick={() =>
                navigate("/wallet/payment-card")
              }
              className="
                w-full
                bg-[#123A68]
                text-white
                rounded-xl
                py-3
                mt-5
                font-bold
                hover:bg-[#0D3158]
                transition
              "
            >
              متابعة الدفع
            </button>

          </div>
        </div>
      </main>
    </div>
  );
}