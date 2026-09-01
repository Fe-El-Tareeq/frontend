import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA] text-[#123A68]"
    >

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 bg-white border-b border-[#E5E9EF]">

        <div className="mx-auto flex h-[58px] max-w-[1100px] items-center justify-between px-4">

          {/* Logo */}
          <img
            src="/logo.png"
            alt="بطريقك"
            className="h-[42px] w-[55px] object-contain"
          />

          {/* Navigation */}
          <nav className="hidden items-center gap-7 text-[13px] md:flex">

            <a href="#home" className="hover:text-[#FF7817]">
              الرئيسية
            </a>

            <a href="#how" className="hover:text-[#FF7817]">
              كيف تعمل؟
            </a>

            <a href="#features" className="hover:text-[#FF7817]">
              المميزات
            </a>

            <a href="#faq" className="hover:text-[#FF7817]">
              الأسئلة الشائعة
            </a>

          </nav>

          <button
            type="button"
            onClick={() => navigate("/welcome")}
            className="rounded-[10px] bg-[#FF7817] px-4 py-2 text-[12px] font-bold text-white"
          >
            تسجيل الدخول
          </button>

        </div>

      </header>


      {/* ================= HERO ================= */}

      <section
        id="home"
        className="relative overflow-hidden bg-[#123A68] px-5 py-14 text-white"
      >

        <div className="mx-auto max-w-[850px] text-center">

          <span className="inline-block rounded-full bg-[#FF7817]/20 px-4 py-2 text-[12px] text-[#FF9A50]">
            منصتك للتنقل والمشاركة
          </span>

          <h1 className="mt-5 text-[34px] font-bold leading-[1.4] md:text-[48px]">
            بطريقك...
            <br />

            <span className="text-[#FF7817]">
              غرضك يوصل
            </span>

            <br />

            مع شخص في الطريق
          </h1>

          <p className="mx-auto mt-5 max-w-[600px] text-[14px] leading-7 text-white/75">
            منصة تساعدك على إرسال أغراضك مع أشخاص مسافرين
            في نفس الطريق، بطريقة سهلة وآمنة وموثوقة.
          </p>


          {/* Buttons */}

          <div className="mt-7 flex justify-center gap-3">

            <button
              type="button"
              onClick={() => navigate("/register-step1")}
              className="rounded-[12px] bg-[#FF7817] px-6 py-3 text-[14px] font-bold text-white"
            >
              أنا مسافر
            </button>

            <button
              type="button"
              onClick={() => navigate("/welcome")}
              className="rounded-[12px] border border-white/30 px-6 py-3 text-[14px] font-bold text-white"
            >
              أحتاج غرضا
            </button>

          </div>


          {/* Statistics */}

          <div className="mx-auto mt-10 grid max-w-[500px] grid-cols-3 gap-5">

            <div>
              <p className="text-[22px] font-bold text-[#FF7817]">
                ٤.٨
              </p>

              <p className="text-[11px] text-white/60">
                تقييم المستخدمين
              </p>
            </div>

            <div>
              <p className="text-[22px] font-bold text-[#FF7817]">
                ٣٨٠+
              </p>

              <p className="text-[11px] text-white/60">
                رحلة ناجحة
              </p>
            </div>

            <div>
              <p className="text-[22px] font-bold text-[#FF7817]">
                ١٢٠٠+
              </p>

              <p className="text-[11px] text-white/60">
                مستخدم نشط
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section
        id="how"
        className="px-5 py-14"
      >

        <div className="mx-auto max-w-[1000px]">

          <div className="mb-9 text-center">

            <p className="text-[12px] font-bold text-[#FF7817]">
              كيف تعمل؟
            </p>

            <h2 className="mt-2 text-[25px] font-bold">
              ثلاث خطوات بسيطة
            </h2>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            {/* Step 1 */}

            <div className="rounded-[18px] border border-[#E5E9EF] bg-white p-6 shadow-sm">

              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-[#EEF5FF] text-[#123A68]">
                📍
              </div>

              <p className="mt-5 text-[13px] font-bold">
                ١. حدد وجهتك
              </p>

              <p className="mt-3 text-[12px] leading-6 text-[#7A8699]">
                اختر وجهتك والمكان الذي تريد إرسال الغرض
                منه وإليه بسهولة.
              </p>

            </div>


            {/* Step 2 */}

            <div className="rounded-[18px] border border-[#E5E9EF] bg-white p-6 shadow-sm">

              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-[#FFF1E8] text-[#FF7817]">
                🚗
              </div>

              <p className="mt-5 text-[13px] font-bold">
                ٢. اطلب أو شارك رحلتك
              </p>

              <p className="mt-3 text-[12px] leading-6 text-[#7A8699]">
                ابحث عن شخص يسافر في نفس طريقك أو شارك
                رحلتك مع الآخرين.
              </p>

            </div>


            {/* Step 3 */}

            <div className="rounded-[18px] border border-[#E5E9EF] bg-white p-6 shadow-sm">

              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-[#E8FAF5] text-[#00A88F]">
                ✓
              </div>

              <p className="mt-5 text-[13px] font-bold">
                ٣. تواصل واستلم
              </p>

              <p className="mt-3 text-[12px] leading-6 text-[#7A8699]">
                تواصل مع الطرف الآخر وتابع حالة الطلب
                حتى وصول الغرض.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="bg-white px-5 py-14"
      >

        <div className="mx-auto max-w-[950px]">

          <div className="text-center">

            <p className="text-[12px] font-bold text-[#FF7817]">
              لماذا بطريقك؟
            </p>

            <h2 className="mt-2 text-[25px] font-bold">
              مجتمع يبني الثقة بين الجيران
            </h2>

          </div>


          <div className="mt-10 grid gap-4 md:grid-cols-2">

            <div className="rounded-[16px] bg-[#F5F7FA] p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#123A68] text-white">
                  ✓
                </div>

                <div>
                  <h3 className="text-[14px] font-bold">
                    آمن وموثوق
                  </h3>

                  <p className="mt-1 text-[11px] leading-5 text-[#7A8699]">
                    نظام يساعدك على التعامل مع مستخدمين
                    موثوقين.
                  </p>
                </div>

              </div>

            </div>


            <div className="rounded-[16px] bg-[#F5F7FA] p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FF7817] text-white">
                  ⚡
                </div>

                <div>
                  <h3 className="text-[14px] font-bold">
                    سريع وفعال
                  </h3>

                  <p className="mt-1 text-[11px] leading-5 text-[#7A8699]">
                    ابحث عن الرحلات والطلبات القريبة
                    بسهولة.
                  </p>
                </div>

              </div>

            </div>


            <div className="rounded-[16px] bg-[#F5F7FA] p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#123A68] text-white">
                  👥
                </div>

                <div>
                  <h3 className="text-[14px] font-bold">
                    مجتمع متعاون
                  </h3>

                  <p className="mt-1 text-[11px] leading-5 text-[#7A8699]">
                    ساعد الآخرين واستفد من الرحلات
                    الموجودة حولك.
                  </p>
                </div>

              </div>

            </div>


            <div className="rounded-[16px] bg-[#F5F7FA] p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#00A88F] text-white">
                  📦
                </div>

                <div>
                  <h3 className="text-[14px] font-bold">
                    نظام نقل مرن
                  </h3>

                  <p className="mt-1 text-[11px] leading-5 text-[#7A8699]">
                    أرسل واستلم أغراضك بطريقة أسهل.
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* Statistics Cards */}

          <div className="mt-8 grid grid-cols-2 gap-4">

            <div className="rounded-[16px] bg-[#123A68] p-5 text-white">

              <p className="text-[24px] font-bold">
                ٣٨٠+
              </p>

              <p className="mt-1 text-[11px] text-white/70">
                رحلة ناجحة
              </p>

            </div>


            <div className="rounded-[16px] bg-[#FF7817] p-5 text-white">

              <p className="text-[24px] font-bold">
                ٩٨٪
              </p>

              <p className="mt-1 text-[11px] text-white/70">
                نسبة رضا المستخدمين
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FAQ ================= */}

      <section
        id="faq"
        className="px-5 py-14"
      >

        <div className="mx-auto max-w-[850px]">

          <div className="mb-8 text-center">

            <p className="text-[12px] font-bold text-[#FF7817]">
              الأسئلة الشائعة
            </p>

            <h2 className="mt-2 text-[24px] font-bold">
              أسئلة يسألها المستخدمون
            </h2>

          </div>


          <div className="space-y-3">

            <details className="rounded-[14px] bg-white p-4 shadow-sm">
              <summary className="cursor-pointer text-[13px] font-bold">
                كيف يمكنني طلب رحلة؟
              </summary>

              <p className="mt-3 text-[12px] leading-6 text-[#7A8699]">
                يمكنك البحث عن الرحلات المتاحة واختيار
                الرحلة المناسبة لك ثم التواصل مع صاحب الرحلة.
              </p>
            </details>


            <details className="rounded-[14px] bg-white p-4 shadow-sm">
              <summary className="cursor-pointer text-[13px] font-bold">
                هل يمكنني إضافة رحلة؟
              </summary>

              <p className="mt-3 text-[12px] leading-6 text-[#7A8699]">
                نعم، بعد إنشاء حساب يمكنك إضافة رحلتك
                ومشاركة تفاصيلها مع المستخدمين.
              </p>
            </details>


            <details className="rounded-[14px] bg-white p-4 shadow-sm">
              <summary className="cursor-pointer text-[13px] font-bold">
                هل يمكنني استخدام المنصة كمسافر فقط؟
              </summary>

              <p className="mt-3 text-[12px] leading-6 text-[#7A8699]">
                نعم، يمكنك استخدام المنصة للبحث عن الرحلات
                المناسبة لك.
              </p>
            </details>


            <details className="rounded-[14px] bg-white p-4 shadow-sm">
              <summary className="cursor-pointer text-[13px] font-bold">
                ما أنواع الأغراض المسموح بها؟
              </summary>

              <p className="mt-3 text-[12px] leading-6 text-[#7A8699]">
                يتم تحديد الأغراض المسموح بها وفقًا لسياسة
                المنصة وشروط الاستخدام.
              </p>
            </details>

          </div>

        </div>

      </section>


      {/* ================= CONTACT ================= */}

      <section className="px-5 py-14">

        <div className="mx-auto max-w-[850px]">

          <div className="text-center">

            <p className="text-[12px] font-bold text-[#FF7817]">
              تواصل معنا
            </p>

            <h2 className="mt-2 text-[24px] font-bold">
              نحن هنا لمساعدتك
            </h2>

            <p className="mt-3 text-[12px] leading-6 text-[#7A8699]">
              لديك سؤال أو تحتاج إلى مساعدة؟
              يمكنك التواصل معنا وسنكون سعداء بمساعدتك.
            </p>

          </div>


          {/* Contact information */}

          <div className="mt-7 grid gap-3 md:grid-cols-3">

            <div className="rounded-[14px] bg-white p-4 text-center shadow-sm">

              <p className="text-[20px]">
                ✉
              </p>

              <p className="mt-2 text-[12px] font-bold">
                البريد الإلكتروني
              </p>

              <p className="mt-1 text-[10px] text-[#7A8699]">
                support@batreeqak.com
              </p>

            </div>


            <div className="rounded-[14px] bg-white p-4 text-center shadow-sm">

              <p className="text-[20px]">
                ☎
              </p>

              <p className="mt-2 text-[12px] font-bold">
                الهاتف
              </p>

              <p className="mt-1 text-[10px] text-[#7A8699]">
                1200+
              </p>

            </div>


            <div className="rounded-[14px] bg-white p-4 text-center shadow-sm">

              <p className="text-[20px]">
                🌐
              </p>

              <p className="mt-2 text-[12px] font-bold">
                الموقع
              </p>

              <p className="mt-1 text-[10px] text-[#7A8699]">
                www.batreeqak.com
              </p>

            </div>

          </div>


          {/* Contact Form */}

          <div className="mt-6 rounded-[18px] bg-white p-5 shadow-sm">

            <h3 className="text-[16px] font-bold">
              أرسل رسالة
            </h3>


            <input
              type="text"
              placeholder="أدخل اسمك"
              className="mt-4 h-[45px] w-full rounded-[12px] border border-[#E3E7EC] bg-[#FAFBFC] px-4 text-[12px] outline-none focus:border-[#FF7817]"
            />


            <input
              type="email"
              placeholder="example@email.com"
              className="mt-3 h-[45px] w-full rounded-[12px] border border-[#E3E7EC] bg-[#FAFBFC] px-4 text-[12px] outline-none focus:border-[#FF7817]"
            />


            <textarea
              placeholder="اكتب رسالتك هنا..."
              className="mt-3 h-[100px] w-full resize-none rounded-[12px] border border-[#E3E7EC] bg-[#FAFBFC] p-4 text-[12px] outline-none focus:border-[#FF7817]"
            />


            <button
              type="button"
              className="mt-4 h-[45px] w-full rounded-[12px] bg-[#FF7817] text-[13px] font-bold text-white"
            >
              إرسال الرسالة
            </button>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="bg-[#123A68] px-5 py-12 text-center text-white">

        <h2 className="text-[24px] font-bold">
          ابدأ استخدام بطريقك اليوم
        </h2>

        <p className="mx-auto mt-3 max-w-[500px] text-[12px] leading-6 text-white/70">
          انضم إلى مجتمع بطريقك واستفد من الرحلات
          والطلبات القريبة منك.
        </p>


        <button
          type="button"
          onClick={() => navigate("/register-step1")}
          className="mt-6 rounded-[12px] bg-[#FF7817] px-6 py-3 text-[13px] font-bold text-white"
        >
          إنشاء حساب جديد
        </button>


        <br />


        <button
          type="button"
          onClick={() => navigate("/welcome")}
          className="mt-3 rounded-[12px] border border-white/30 px-6 py-3 text-[12px]"
        >
          تسجيل الدخول
        </button>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="bg-white px-5 py-6 text-center">

        <img
          src="/logo.png"
          alt="بطريقك"
          className="mx-auto h-[42px] w-[55px] object-contain"
        />

        <p className="mt-3 text-[10px] text-[#7A8699]">
          © 2026 بطريقك - جميع الحقوق محفوظة
        </p>

        <div className="mt-3 flex justify-center gap-5 text-[10px] text-[#7A8699]">

          <button type="button">
            الخصوصية
          </button>

          <button type="button">
            الشروط
          </button>

          <button type="button">
            الدعم
          </button>

        </div>

      </footer>

    </main>
  );
}

export default LandingPage;