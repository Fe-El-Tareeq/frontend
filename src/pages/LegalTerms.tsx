import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function LegalTerms() {
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
            الشروط القانونية والخصوصية
          </h1>

          <p className="mt-1 text-[13px] text-[#7B8794]">
            يرجى قراءة الشروط والسياسات بعناية قبل استخدام التطبيق
          </p>

          {/* مقدمة */}
          <section className="mt-5 rounded-[16px] bg-white p-5 shadow-sm">

            <h2 className="mb-3 text-[17px] font-extrabold text-[#102F57]">
              شروط الاستخدام
            </h2>

            <p className="text-[13px] leading-7 text-[#5C6675]">
              باستخدامك لتطبيق بطريقك، فإنك توافق على الالتزام بشروط
              الاستخدام والسياسات الموضحة في هذه الصفحة. تم تصميم
              التطبيق لربط الأشخاص الذين يحتاجون إلى أغراض مع الأشخاص
              الذين يسافرون إلى نفس المناطق.
            </p>

          </section>

          {/* الحساب */}
          <section className="mt-4 rounded-[16px] bg-white p-5 shadow-sm">

            <h2 className="mb-3 text-[17px] font-extrabold text-[#102F57]">
              مسؤولية المستخدم
            </h2>

            <p className="text-[13px] leading-7 text-[#5C6675]">
              يتحمل المستخدم مسؤولية صحة البيانات والمعلومات التي
              يقدمها داخل التطبيق، كما يلتزم بعدم استخدام التطبيق
              لأي أغراض غير قانونية أو مخالفة للأنظمة المعمول بها.
            </p>

            <div className="mt-4 rounded-[12px] bg-[#FFF2F0] p-4 text-[12px] leading-6 text-[#C94A3D]">
              يمنع استخدام التطبيق لنقل المواد المحظورة أو الخطرة أو
              أي مواد تخالف القوانين والأنظمة.
            </div>

          </section>

          {/* الخصوصية */}
          <section className="mt-4 rounded-[16px] bg-white p-5 shadow-sm">

            <h2 className="mb-3 text-[17px] font-extrabold text-[#102F57]">
              سياسة الخصوصية
            </h2>

            <p className="text-[13px] leading-7 text-[#5C6675]">
              نحترم خصوصية المستخدمين ونعمل على حماية البيانات الشخصية
              التي يتم تقديمها أثناء استخدام التطبيق. قد يتم استخدام
              بعض البيانات اللازمة لتقديم الخدمات وتحسين تجربة المستخدم.
            </p>

          </section>

          {/* البيانات */}
          <section className="mt-4 rounded-[16px] bg-white p-5 shadow-sm">

            <h2 className="mb-3 text-[17px] font-extrabold text-[#102F57]">
              البيانات التي يتم جمعها
            </h2>

            <ul className="space-y-3 text-[13px] leading-6 text-[#5C6675]">
              <li>• الاسم ومعلومات الحساب.</li>
              <li>• رقم الهاتف ومعلومات التواصل.</li>
              <li>• معلومات الرحلات والطلبات.</li>
              <li>• معلومات المعاملات داخل التطبيق.</li>
              <li>• البيانات اللازمة لتقديم الدعم الفني.</li>
            </ul>

          </section>

          {/* الأمان */}
          <section className="mt-4 rounded-[16px] bg-white p-5 shadow-sm">

            <h2 className="mb-3 text-[17px] font-extrabold text-[#102F57]">
              حماية البيانات
            </h2>

            <p className="text-[13px] leading-7 text-[#5C6675]">
              نتخذ الإجراءات المناسبة للمساعدة في حماية معلومات
              المستخدمين من الوصول غير المصرح به أو الاستخدام أو
              التعديل أو الكشف غير المصرح به.
            </p>

          </section>

          {/* التواصل */}
          <section className="mt-4 rounded-[16px] bg-white p-5 shadow-sm">

            <h2 className="mb-3 text-[17px] font-extrabold text-[#102F57]">
              التواصل معنا
            </h2>

            <p className="text-[13px] leading-7 text-[#5C6675]">
              إذا كان لديك أي سؤال حول شروط الاستخدام أو سياسة
              الخصوصية، يمكنك التواصل مع فريق الدعم من خلال صفحة
              التواصل مع الدعم داخل التطبيق.
            </p>

          </section>

          <div className="mt-5 rounded-[14px] bg-[#EAF1F9] p-4 text-center text-[11px] leading-6 text-[#52657C]">
            آخر تحديث للسياسة: 2026
          </div>

        </div>
      </main>
    </div>
  );
}

export default LegalTerms;