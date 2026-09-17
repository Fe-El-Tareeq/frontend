import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function ContactSupport() {
  const navigate = useNavigate();

  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F7FA]">
      <Header />

      <main className="min-h-screen px-4 pb-12 pt-[105px] lg:mr-[256px] lg:px-8">
        <div className="mx-auto max-w-[850px]">

          <button
            type="button"
            onClick={() => navigate("/settings")}
            className="mb-4 text-[22px] text-[#234A7D]"
          >
            ←
          </button>

          <h1 className="text-[24px] font-extrabold text-[#102F57]">
            التواصل مع الدعم
          </h1>

          <p className="mt-1 text-[13px] text-[#7B8794]">
            نحن هنا لمساعدتك والإجابة عن استفساراتك
          </p>

          {/* حالة الدعم */}
          <div className="mt-5 rounded-[16px] border border-[#B8F0D7] bg-[#ECFFF7] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00A394] text-white">
                ✓
              </div>

              <div>
                <p className="font-extrabold text-[#087A68]">
                  الدعم متاح الآن
                </p>
                <p className="text-[12px] text-[#5C7C74]">
                  متوسط وقت الرد أقل من 10 دقائق
                </p>
              </div>
            </div>
          </div>

          {/* طرق التواصل */}
          <div className="mt-4 grid grid-cols-3 gap-3">

            <button
              type="button"
              onClick={() => navigate("/support-chat")}
              className="rounded-[14px] bg-white p-4 shadow-sm"
            >
              <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F0FA] text-xl">
                💬
              </div>
              <p className="font-bold text-[#263F61]">
                محادثة
              </p>
            </button>

            <button
              type="button"
              className="rounded-[14px] bg-white p-4 shadow-sm"
            >
              <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-[#E8FFF8] text-xl">
                📞
              </div>
              <p className="font-bold text-[#263F61]">
                اتصال
              </p>
            </button>

            <button
              type="button"
              className="rounded-[14px] bg-white p-4 shadow-sm"
            >
              <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF1E8] text-xl">
                ✉️
              </div>
              <p className="font-bold text-[#263F61]">
                بريد
              </p>
            </button>

          </div>

          {/* الأسئلة */}
          <section className="mt-5 rounded-[16px] bg-white p-5 shadow-sm">

            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-extrabold text-[#102F57]">
                الأسئلة الشائعة
              </h2>

              <span className="text-[#FF7817]">?</span>
            </div>

            {[
              "كيف أقوم بإنشاء طلب جديد؟",
              "كيف يمكنني إضافة رحلة؟",
              "كيف يتم الدفع؟",
              "كيف أسحب رصيدي؟",
              "ماذا أفعل إذا واجهت مشكلة؟",
            ].map((question, index) => (
              <button
                key={index}
                type="button"
                className="flex w-full items-center justify-between border-b border-[#EEF1F5] py-4 text-right last:border-b-0"
              >
                <span className="text-[13px] font-bold text-[#42536A]">
                  {question}
                </span>

                <span className="text-[#9AA5B3]">
                  ‹
                </span>
              </button>
            ))}

          </section>

          <button
            type="button"
            onClick={() => navigate("/support-chat")}
            className="mt-5 h-[50px] w-full rounded-[12px] bg-[#234A7D] font-bold text-white"
          >
            بدء محادثة مع الدعم
          </button>

        </div>
      </main>
    </div>
  );
}

export default ContactSupport;