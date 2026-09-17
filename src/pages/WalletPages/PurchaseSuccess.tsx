import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

export default function PurchaseSuccess() {
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
          flex
          items-start
          justify-center
        "
      >
        <div
          className="
            bg-white
            w-full
            max-w-md
            rounded-3xl
            p-6
            text-center
            border
            border-[#E3E8EF]
            shadow-sm
          "
        >
          {/* =========================
              Success Icon
          ========================= */}
          <div
            className="
              w-20
              h-20
              mx-auto
              rounded-full
              bg-[#E8F7F0]
              flex
              items-center
              justify-center
              text-4xl
              text-[#22B573]
            "
          >
            ✓
          </div>

          {/* العنوان */}
          <h1
            className="
              text-2xl
              font-bold
              text-[#123A68]
              mt-5
            "
          >
            تم الشراء بنجاح!
          </h1>

          <p className="text-[#6B7C93] mt-2">
            تمت إضافة النقاط إلى محفظتك بنجاح 🎉
          </p>

          {/* =========================
              تفاصيل الباقة
          ========================= */}
          <div
            className="
              bg-[#F5F7FA]
              rounded-2xl
              p-5
              mt-6
            "
          >
            <p className="text-sm text-[#6B7C93]">
              الباقة المشتراة
            </p>

            <p
              className="
                text-3xl
                font-bold
                text-[#FF7817]
                mt-2
              "
            >
              25

              <span
                className="
                  text-sm
                  text-[#123A68]
                  mr-2
                "
              >
                نقطة
              </span>
            </p>

            <div
              className="
                border-t
                border-[#E3E8EF]
                mt-4
                pt-4
                text-sm
              "
            >
              <div className="flex justify-between">
                <span className="text-[#6B7C93]">
                  المبلغ
                </span>

                <strong>
                  10 شيكل
                </strong>
              </div>

              <div className="flex justify-between mt-3">
                <span className="text-[#6B7C93]">
                  رقم العملية
                </span>

                <strong>
                  #BT-10245
                </strong>
              </div>
            </div>
          </div>

          {/* =========================
              الرصيد الحالي
          ========================= */}
          <div
            className="
              bg-[#123A68]
              text-white
              rounded-xl
              p-4
              mt-5
            "
          >
            <p className="text-sm text-white/70">
              الرصيد الحالي
            </p>

            <p className="text-3xl font-bold mt-1">
              97

              <span className="text-sm mr-2 font-normal">
                نقطة
              </span>
            </p>
          </div>

          {/* =========================
              العودة للمحفظة
          ========================= */}
          <button
            type="button"
            onClick={() => navigate("/wallet")}
            className="
              w-full
              bg-[#FF7817]
              text-white
              rounded-xl
              py-3
              mt-5
              font-bold
              hover:bg-[#e9680d]
              transition
            "
          >
            العودة إلى المحفظة
          </button>

          {/* =========================
              المعاملات
          ========================= */}
          <button
            type="button"
            onClick={() => navigate("/wallet")}
            className="
              w-full
              bg-[#F5F7FA]
              text-[#123A68]
              rounded-xl
              py-3
              mt-3
              font-bold
              hover:bg-[#E9EDF2]
              transition
            "
          >
            عرض المعاملات
          </button>
        </div>
      </main>
    </div>
  );
}