import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function SupportChat() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessage("");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F7FA]">
      <Header />

      <main className="min-h-screen px-4 pb-6 pt-[105px] lg:mr-[256px] lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-130px)] max-w-[850px] flex-col">

          <div className="mb-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/contact-support")}
              className="text-[22px] text-[#234A7D]"
            >
              ←
            </button>

            <div>
              <h1 className="font-extrabold text-[#102F57]">
                الدعم الفني
              </h1>
              <p className="text-[11px] text-[#00A394]">
                ● متصل الآن
              </p>
            </div>
          </div>

          {/* المحادثة */}
          <div className="flex-1 rounded-[18px] bg-white p-4 shadow-sm">

            <div className="mb-4 text-center">
              <span className="rounded-full bg-[#EEF2F6] px-4 py-2 text-[11px] text-[#8B96A5]">
                اليوم
              </span>
            </div>

            <div className="mb-4 max-w-[75%] rounded-[15px] rounded-tr-[4px] bg-[#F0F3F7] p-4 text-[13px] leading-6 text-[#42536A]">
              مرحباً بك في دعم بطريقك 👋
              <br />
              كيف يمكننا مساعدتك اليوم؟
            </div>

            <div className="mb-4 mr-auto max-w-[75%] rounded-[15px] rounded-tl-[4px] bg-[#234A7D] p-4 text-[13px] leading-6 text-white">
              لدي مشكلة في عملية الدفع وأحتاج إلى المساعدة.
            </div>

            <div className="max-w-[75%] rounded-[15px] rounded-tr-[4px] bg-[#F0F3F7] p-4 text-[13px] leading-6 text-[#42536A]">
              بالتأكيد، سنساعدك في حل المشكلة.
              <br />
              يرجى إرسال تفاصيل العملية أو رقم الطلب.
            </div>

          </div>

          {/* إرسال الرسالة */}
          <div className="mt-3 flex items-center gap-2 rounded-[14px] bg-white p-2 shadow-sm">

            <button
              type="button"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#234A7D] text-white"
              onClick={sendMessage}
            >
              ↑
            </button>

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="اكتب رسالتك..."
              className="h-[42px] flex-1 bg-transparent px-3 text-right text-[13px] outline-none"
            />

            <button
              type="button"
              className="text-xl"
            >
              📎
            </button>

          </div>

        </div>
      </main>
    </div>
  );
}

export default SupportChat;