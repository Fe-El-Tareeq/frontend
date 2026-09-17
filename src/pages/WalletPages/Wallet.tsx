import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const transactions = [
  {
    name: "شراء نقاط",
    date: "اليوم، 10:30 ص",
    amount: "- 25",
    status: "مكتملة",
    type: "expense",
  },
  {
    name: "إضافة رصيد",
    date: "أمس، 04:20 م",
    amount: "+ 50",
    status: "مكتملة",
    type: "income",
  },
  {
    name: "طلب غرض",
    date: "أمس، 01:15 م",
    amount: "- 10",
    status: "مكتملة",
    type: "expense",
  },
  {
    name: "استرداد",
    date: "02 سبتمبر",
    amount: "+ 25",
    status: "مكتملة",
    type: "income",
  },
];

export default function Wallet() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA] text-[#123A68]"
    >
      {/* =========================
          Header + Sidebar
      ========================= */}
      <Header />

      {/* =========================
          المحتوى الرئيسي
      ========================= */}
      <main
        className="
          min-h-screen
          pt-[105px]
          pb-10
          px-5
          lg:mr-[256px]
        "
      >
        <div className="max-w-5xl mx-auto">

          {/* =========================
              عنوان الصفحة
          ========================= */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
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

              <h1 className="text-xl font-bold">
                المحفظة
              </h1>
            </div>

            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="
                w-10
                h-10
                rounded-full
                bg-white
                border
                border-[#E3E8EF]
                flex
                items-center
                justify-center
              "
            >
              ⚙
            </button>
          </div>

          {/* =========================
              Balance Card
          ========================= */}
          <section
            className="
              rounded-2xl
              bg-[#123A68]
              text-white
              p-6
              shadow-sm
            "
          >
            <div className="flex justify-between items-start">

              <div>
                <p className="text-sm text-white/70">
                  الرصيد الحالي
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  47

                  <span className="text-lg mr-2 font-normal">
                    نقطة
                  </span>
                </h2>
              </div>

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                "
              >
                💰
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/wallet/buy-points")}
              className="
                mt-6
                w-full
                bg-[#FF7817]
                hover:bg-[#FF8A32]
                transition
                rounded-xl
                py-3
                font-bold
              "
            >
              شراء نقاط
            </button>
          </section>

          {/* =========================
              Quick Actions
          ========================= */}
          <section className="grid grid-cols-2 gap-3 mt-5">

            {/* طرق الدفع */}
            <button
              type="button"
              onClick={() =>
                navigate("/wallet/payment-method")
              }
              className="
                bg-white
                border
                border-[#E3E8EF]
                rounded-2xl
                p-4
                text-right
              "
            >
              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-[#FFF1E8]
                  flex
                  items-center
                  justify-center
                  mb-3
                "
              >
                💳
              </div>

              <h3 className="font-bold">
                طرق الدفع
              </h3>

              <p className="text-xs text-[#6B7C93] mt-1">
                إدارة بطاقات الدفع
              </p>
            </button>

            {/* شراء نقاط */}
            <button
              type="button"
              onClick={() =>
                navigate("/wallet/buy-points")
              }
              className="
                bg-white
                border
                border-[#E3E8EF]
                rounded-2xl
                p-4
                text-right
              "
            >
              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-[#E8F7F0]
                  flex
                  items-center
                  justify-center
                  mb-3
                "
              >
                ⚡
              </div>

              <h3 className="font-bold">
                شراء نقاط
              </h3>

              <p className="text-xs text-[#6B7C93] mt-1">
                اختر الباقة المناسبة
              </p>
            </button>

          </section>

          {/* =========================
              Transactions
          ========================= */}
          <section
            className="
              bg-white
              rounded-2xl
              border
              border-[#E3E8EF]
              mt-5
              overflow-hidden
            "
          >
            {/* عنوان المعاملات */}
            <div
              className="
                flex
                justify-between
                items-center
                p-5
                border-b
                border-[#E3E8EF]
              "
            >
              <h2 className="font-bold">
                آخر المعاملات
              </h2>

              <button
                type="button"
                className="text-sm text-[#FF7817]"
              >
                عرض الكل
              </button>
            </div>

            {/* قائمة المعاملات */}
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="
                  flex
                  items-center
                  justify-between
                  p-4
                  border-b
                  last:border-b-0
                  border-[#E3E8EF]
                "
              >
                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-[#F5F7FA]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {transaction.type === "income"
                      ? "↙"
                      : "↗"}
                  </div>

                  <div>
                    <p className="font-bold text-sm">
                      {transaction.name}
                    </p>

                    <p className="text-xs text-[#A7B3C2] mt-1">
                      {transaction.date}
                    </p>
                  </div>
                </div>

                <div className="text-left">

                  <p
                    className={`
                      font-bold
                      ${
                        transaction.type === "income"
                          ? "text-[#22B573]"
                          : "text-[#E74C3C]"
                      }
                    `}
                  >
                    {transaction.amount} نقطة
                  </p>

                  <span className="text-[10px] text-[#22B573]">
                    {transaction.status}
                  </span>

                </div>
              </div>
            ))}
          </section>

        </div>
      </main>
    </div>
  );
}