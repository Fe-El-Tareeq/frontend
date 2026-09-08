import { useNavigate } from "react-router-dom";

function TripCreated() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4"
    >
      <div
        className="
          w-full max-w-[350px]
          rounded-[20px]
          bg-white
          px-5 py-7
          text-center
          shadow-sm
        "
      >

        {/* Success Icon */}
        <div
          className="
            mx-auto
            flex h-[80px] w-[80px]
            items-center justify-center
            rounded-full
            bg-[#DDF8E8]
          "
        >
          <div
            className="
              flex h-[31px] w-[31px]
              items-center justify-center
              rounded-full
              bg-[#20C466]
              text-white
            "
          >
            ✓
          </div>
        </div>

        {/* Title */}
        <h1
          className="
            mt-5
            text-[25px]
            font-bold
            text-[#102F57]
          "
        >
          تم نشر الرحلة
        </h1>

        {/* Description */}
        <p
          className="
            mt-2
            text-[14px]
            leading-7
            text-[#5F6672]
          "
        >
          رحلتك أصبحت ظاهرة للمستخدمين حسب المناطق
        </p>

        {/* Trip Info */}
        <div
          className="
            mt-5
            rounded-[14px]
            border border-[#D9E0E8]
            bg-[#F7F9FB]
            px-3 py-3
          "
        >

          <div className="flex items-center justify-between">

            <div className="text-[18px] text-[#102F57]">
              التقاح
              <span className="mx-2 text-[#7D8794]">
                ←
              </span>
              النصر
            </div>

            <span
              className="
                rounded-full
                bg-[#DDF4E9]
                px-3 py-1
                text-[11px]
                font-bold
                text-[#159B5B]
              "
            >
              ✓ تم النشر
            </span>

          </div>

          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              text-[13px]
              text-[#596273]
            "
          >
            <span>
              📅 اليوم
            </span>

            <span>
              •
            </span>

            <span>
              4 مقاعد
            </span>
          </div>

        </div>

        {/* View Trip */}
        <button
          type="button"
          onClick={() => navigate("/trips")}
          className="
            mt-6
            h-[49px]
            w-full
            rounded-[10px]
            bg-[#FF7817]
            text-[16px]
            font-bold
            text-white
          "
        >
          عرض رحلتي
        </button>

        {/* Home */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="
            mt-5
            text-[14px]
            text-[#71809A]
          "
        >
          الرئيسية
        </button>

      </div>
    </div>
  );
}

export default TripCreated;