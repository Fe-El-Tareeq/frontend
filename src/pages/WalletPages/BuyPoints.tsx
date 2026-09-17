import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const packages = [
  {
    points: 10,
    price: 5,
    popular: false,
  },
  {
    points: 25,
    price: 10,
    popular: true,
  },
  {
    points: 50,
    price: 15,
    popular: false,
  },
  {
    points: 100,
    price: 25,
    popular: false,
  },
];

export default function BuyPoints() {
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

          {/* زر الرجوع والعنوان */}
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
              شراء نقاط
            </h1>
          </div>

          {/* =========================
              عنوان الصفحة
          ========================= */}
          <div className="text-center mb-7">
            <h2 className="text-2xl font-bold text-[#123A68]">
              اختر باقة النقاط
            </h2>

            <p className="text-sm text-[#6B7C93] mt-2">
              استخدم النقاط لإتمام طلباتك ورحلاتك
            </p>
          </div>

          {/* =========================
              الباقات
          ========================= */}
          <div className="space-y-4">
            {packages.map((item) => (
              <div
                key={item.points}
                className={`
                  relative
                  bg-white
                  rounded-2xl
                  p-5
                  border
                  transition
                  ${
                    item.popular
                      ? "border-[#FF7817] shadow-md"
                      : "border-[#E3E8EF]"
                  }
                `}
              >
                {/* الأكثر طلبًا */}
                {item.popular && (
                  <span
                    className="
                      absolute
                      -top-3
                      right-5
                      bg-[#FF7817]
                      text-white
                      px-4
                      py-1
                      rounded-full
                      text-xs
                      font-bold
                    "
                  >
                    الأكثر طلبًا
                  </span>
                )}

                {/* معلومات الباقة */}
                <div className="flex justify-between items-start">

                  <div>
                    {/* أيقونة */}
                    <div
                      className="
                        w-10
                        h-10
                        rounded-xl
                        bg-[#123A68]
                        text-white
                        flex
                        items-center
                        justify-center
                      "
                    >
                      ⚡
                    </div>

                    <h3 className="font-bold mt-3 text-[#123A68]">
                      الباقة الأساسية
                    </h3>

                    <p className="text-xs text-[#A7B3C2] mt-1">
                      مناسبة للاستخدام اليومي
                    </p>
                  </div>

                  {/* عدد النقاط */}
                  <div className="text-left">
                    <strong className="text-2xl text-[#123A68]">
                      {item.points}
                    </strong>

                    <span className="text-xs mr-1 text-[#6B7C93]">
                      نقطة
                    </span>
                  </div>
                </div>

                {/* السعر والشراء */}
                <div className="flex justify-between items-center mt-5">

                  <span className="font-bold text-[#123A68]">
                    {item.price} شيكل
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/wallet/payment-method")
                    }
                    className={`
                      px-5
                      py-2.5
                      rounded-xl
                      text-sm
                      font-bold
                      transition
                      ${
                        item.popular
                          ? "bg-[#FF7817] text-white hover:bg-[#e9680d]"
                          : "bg-[#123A68] text-white hover:bg-[#0D3158]"
                      }
                    `}
                  >
                    شراء الباقة
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}