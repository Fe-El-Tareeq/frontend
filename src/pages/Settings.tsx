import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Settings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [offers, setOffers] = useState(true);
  const [messages, setMessages] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F7FA]">
      <Header />

      <main className="min-h-screen px-4 pb-12 pt-[105px] lg:mr-[256px] lg:px-8">
        <div className="mx-auto w-full max-w-[850px]">

          {/* العنوان */}
          <div className="mb-5">
            <h1 className="text-[25px] font-extrabold text-[#102F57]">
              الإعدادات
            </h1>
            <p className="mt-1 text-[13px] text-[#7B8794]">
              تحكم في تفضيلات حسابك وتجربتك داخل التطبيق
            </p>
          </div>

          {/* الإشعارات */}
          <section className="mb-4 rounded-[16px] bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-[17px] font-extrabold text-[#102F57]">
              الإشعارات
            </h2>

            <div className="space-y-4">

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#263F61]">
                    إشعارات الطلبات
                  </p>
                  <p className="mt-1 text-[12px] text-[#8B96A5]">
                    استلام إشعارات عند وصول طلبات جديدة
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setNotifications(!notifications)}
                  className={`relative h-[24px] w-[45px] rounded-full transition ${
                    notifications ? "bg-[#234A7D]" : "bg-[#D5DCE4]"
                  }`}
                >
                  <span
                    className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white transition ${
                      notifications ? "right-[3px]" : "right-[24px]"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#263F61]">
                    العروض الجديدة
                  </p>
                  <p className="mt-1 text-[12px] text-[#8B96A5]">
                    تنبيه عند استلام عرض على أحد طلباتك
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOffers(!offers)}
                  className={`relative h-[24px] w-[45px] rounded-full transition ${
                    offers ? "bg-[#234A7D]" : "bg-[#D5DCE4]"
                  }`}
                >
                  <span
                    className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white transition ${
                      offers ? "right-[3px]" : "right-[24px]"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#263F61]">
                    الرسائل
                  </p>
                  <p className="mt-1 text-[12px] text-[#8B96A5]">
                    إشعارات عند وصول رسائل جديدة
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setMessages(!messages)}
                  className={`relative h-[24px] w-[45px] rounded-full transition ${
                    messages ? "bg-[#234A7D]" : "bg-[#D5DCE4]"
                  }`}
                >
                  <span
                    className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white transition ${
                      messages ? "right-[3px]" : "right-[24px]"
                    }`}
                  />
                </button>
              </div>

            </div>
          </section>

          {/* المظهر */}
          <section className="mb-4 rounded-[16px] bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-[17px] font-extrabold text-[#102F57]">
              المظهر
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-[#263F61]">
                  الوضع الداكن
                </p>
                <p className="mt-1 text-[12px] text-[#8B96A5]">
                  تغيير مظهر التطبيق إلى الوضع الداكن
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className={`relative h-[24px] w-[45px] rounded-full transition ${
                  darkMode ? "bg-[#234A7D]" : "bg-[#D5DCE4]"
                }`}
              >
                <span
                  className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white transition ${
                    darkMode ? "right-[3px]" : "right-[24px]"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* اللغة */}
          <section className="mb-4 rounded-[16px] bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-[17px] font-extrabold text-[#102F57]">
              اللغة والمظهر
            </h2>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-[12px] border border-[#E3E8EF] p-4"
            >
              <div className="text-right">
                <p className="font-bold text-[#263F61]">
                  لغة التطبيق
                </p>
                <p className="mt-1 text-[12px] text-[#8B96A5]">
                  العربية
                </p>
              </div>

              <span className="text-[#8B96A5]">‹</span>
            </button>
          </section>

          {/* الدعم والقانون */}
          <section className="rounded-[16px] bg-white p-5 shadow-sm">

            <h2 className="mb-4 text-[17px] font-extrabold text-[#102F57]">
              الدعم والأمان
            </h2>

            <button
              type="button"
              onClick={() => navigate("/contact-support")}
              className="mb-2 flex w-full items-center justify-between rounded-[12px] border border-[#E3E8EF] p-4 text-right"
            >
              <div>
                <p className="font-bold text-[#263F61]">
                  التواصل مع الدعم
                </p>
                <p className="mt-1 text-[12px] text-[#8B96A5]">
                  تواصل معنا إذا واجهت أي مشكلة
                </p>
              </div>

              <span className="text-[#8B96A5]">‹</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/report-problem")}
              className="mb-2 flex w-full items-center justify-between rounded-[12px] border border-[#E3E8EF] p-4 text-right"
            >
              <div>
                <p className="font-bold text-[#263F61]">
                  الإبلاغ عن مشكلة
                </p>
                <p className="mt-1 text-[12px] text-[#8B96A5]">
                  أخبرنا عن أي مشكلة تواجهها
                </p>
              </div>

              <span className="text-[#8B96A5]">‹</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/legal-terms")}
              className="flex w-full items-center justify-between rounded-[12px] border border-[#E3E8EF] p-4 text-right"
            >
              <div>
                <p className="font-bold text-[#263F61]">
                  الشروط القانونية والخصوصية
                </p>
                <p className="mt-1 text-[12px] text-[#8B96A5]">
                  الشروط وسياسة الخصوصية
                </p>
              </div>

              <span className="text-[#8B96A5]">‹</span>
            </button>

          </section>

          <p className="mt-6 text-center text-[11px] text-[#A7B3C2]">
            الإصدار 1.0.0
          </p>

        </div>
      </main>
    </div>
  );
}

export default Settings;