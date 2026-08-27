import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside
      dir="rtl"
      className="hidden lg:flex fixed right-0 top-0 z-40 h-screen w-[255px] flex-col bg-[#234A7D] text-white"
    >
      {/* Logo */}
      <div className="flex h-[130px] items-center justify-center bg-white">
        <img
          src="/logo.png"
          alt="بطريقك"
          className="h-[65px] w-[68px] object-contain"
        />
      </div>

      {/* User */}
      <div className="border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[15px] font-bold">
              هديل محمد
            </p>

            <p className="mt-1 text-[12px] text-white/60">
              غزة - الرمال
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-bold">
            هم
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-5">

        {/* Home */}
        <button
          onClick={() => navigate("/")}
          className="mb-2 flex h-[48px] w-full items-center justify-between rounded-[18px] bg-[#FF7817] px-4 font-bold"
        >
          <span>الرئيسية</span>
          <span className="text-[20px]">⌂</span>
        </button>

        {/* Trips */}
        <button
          onClick={() => navigate("/trips")}
          className="mb-2 flex h-[48px] w-full items-center justify-between rounded-[18px] px-4 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <span>الرحلات</span>
          <span className="text-[19px]">🚗</span>
        </button>

        {/* Orders */}
        <button
          onClick={() => navigate("/orders")}
          className="mb-2 flex h-[48px] w-full items-center justify-between rounded-[18px] px-4 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <span>الطلبات</span>
          <span className="text-[19px]">▣</span>
        </button>

        {/* Messages */}
        <button
          onClick={() => navigate("/messages")}
          className="mb-2 flex h-[48px] w-full items-center justify-between rounded-[18px] px-4 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <span className="flex items-center gap-2">
            الرسائل

            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF314B] text-[11px] text-white">
              3
            </span>
          </span>

          <span className="text-[19px]">□</span>
        </button>

        {/* Wallet */}
        <button
          onClick={() => navigate("/wallet")}
          className="mb-2 flex h-[48px] w-full items-center justify-between rounded-[18px] px-4 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <span>المحفظة</span>
          <span className="text-[19px]">▣</span>
        </button>

        {/* Account */}
        <button
          onClick={() => navigate("/account")}
          className="mb-2 flex h-[48px] w-full items-center justify-between rounded-[18px] px-4 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <span>حسابي</span>
          <span className="text-[19px]">♙</span>
        </button>

        {/* Settings */}
        <button
          onClick={() => navigate("/settings")}
          className="mb-2 flex h-[48px] w-full items-center justify-between rounded-[18px] px-4 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <span>الإعدادات</span>
          <span className="text-[19px]">⚙</span>
        </button>

      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 px-3 py-4">

        {/* Balance */}
        <div className="mb-4 flex h-[40px] items-center justify-between rounded-full border border-[#FF7817] px-4">
          <span className="text-[12px] text-white/70">
            رصيد التوكنز
          </span>

          <span className="font-bold text-[#FF7817]">
            ⚡ 47
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate("/welcome")}
          className="flex h-[45px] w-full items-center justify-between px-3 text-[#FF9B8F]"
        >
          <span>تسجيل الخروج</span>
          <span className="text-[20px]">↪</span>
        </button>

      </div>
    </aside>
  );
}

export default Sidebar;