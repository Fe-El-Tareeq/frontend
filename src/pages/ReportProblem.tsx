import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function ReportProblem() {
  const navigate = useNavigate();

  const problems = [
    {
      icon: "💳",
      title: "مشكلة في الدفع",
      description: "حدثت مشكلة أثناء الدفع",
    },
    {
      icon: "🚚",
      title: "مشكلة في رحلة",
      description: "مشكلة متعلقة برحلة",
    },
    {
      icon: "📦",
      title: "مشكلة في الطلب",
      description: "مشكلة متعلقة بطلب",
    },
    {
      icon: "👤",
      title: "مشكلة في الحساب",
      description: "مشكلة في حسابي",
    },
    {
      icon: "🔒",
      title: "الأمان والخصوصية",
      description: "مشكلة متعلقة بالأمان",
    },
    {
      icon: "⚙️",
      title: "مشكلة تقنية",
      description: "التطبيق لا يعمل بشكل صحيح",
    },
  ];

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
            الإبلاغ عن مشكلة
          </h1>

          <p className="mt-1 text-[13px] text-[#7B8794]">
            اختر نوع المشكلة التي تريد الإبلاغ عنها
          </p>

          <div className="mt-5 rounded-[13px] border border-[#FFD0C9] bg-[#FFF2F0] p-4 text-[12px] leading-6 text-[#C94A3D]">
            إذا كانت المشكلة متعلقة بعملية دفع أو رصيد، يرجى الاحتفاظ
            برقم العملية لتسهيل حل المشكلة.
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">

            {problems.map((problem, index) => (
              <button
                key={index}
                type="button"
                onClick={() => navigate("/report-details")}
                className="rounded-[14px] bg-white p-4 text-right shadow-sm transition hover:-translate-y-0.5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF1F9] text-lg">
                  {problem.icon}
                </div>

                <p className="font-extrabold text-[#263F61]">
                  {problem.title}
                </p>

                <p className="mt-1 text-[11px] leading-5 text-[#8B96A5]">
                  {problem.description}
                </p>
              </button>
            ))}

          </div>

        </div>
      </main>
    </div>
  );
}

export default ReportProblem;