import { NavLink, useLocation, useNavigate } from "react-router-dom";

type SidebarProps = {
  onClose?: () => void;
};

function Sidebar({ onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // الصفحة الحالية
  const currentPath = location.pathname;

  // ---------------------------------------------------------
  // تحديد العنصر النشط
  // ---------------------------------------------------------

  const isDashboardActive = currentPath === "/dashboard";

  const isTripsActive = currentPath === "/trips";

  const isRequestsActive = currentPath === "/requests";

  const isMessagesActive = currentPath === "/messages";

  const isWalletActive = currentPath === "/wallet";

  const isProfileActive = currentPath === "/profile";

  const isSettingsActive = currentPath === "/settings";

  // ---------------------------------------------------------
  // شكل العنصر حسب حالته
  // ---------------------------------------------------------

  const getItemClass = (isActive: boolean) => {
    return `
      mb-1
      flex
      h-[48px]
      w-full
      items-center
      gap-4
      rounded-[15px]
      px-4
      transition-all
      duration-200
      ${
        isActive
          ? "bg-[#FF7817] font-bold text-white"
          : "text-white/75 hover:bg-white/10 hover:text-white"
      }
    `;
  };

  return (
    <aside
      className="
        fixed
        right-0
        top-0
        z-50
        h-screen
        w-[256px]
        bg-[#234A7D]
        text-white
      "
    >

      {/* =====================================================
          زر إغلاق Sidebar في الموبايل
      ===================================================== */}

      <div className="flex h-[45px] items-center justify-start px-4 lg:hidden">

        <button
          type="button"
          onClick={onClose}
          className="
            text-[28px]
            leading-none
            text-white
            transition
            hover:text-[#FF7817]
          "
        >
          ×
        </button>

      </div>


      {/* =====================================================
          LOGO
      ===================================================== */}

      <div
        className="
          flex
          h-[87px]
          items-center
          justify-center
          bg-white
        "
      >
        <img
          src="/logo.png"
          alt="بطريقك"
          className="h-[65px] w-[68px] object-contain"
        />
      </div>


      {/* =====================================================
          USER INFORMATION
      ===================================================== */}

      <div className="border-b border-white/10 px-4 py-4">

        <div className="flex items-center justify-between">

          {/* معلومات المستخدم */}

          <div className="text-right">

            <p className="text-[15px] font-bold text-white">
              {/* اسم المستخدم سيأتي من Backend */}
            </p>

            <p className="mt-1 text-[12px] text-white/60">
              {/* رقم الهاتف سيأتي من Backend */}
            </p>

          </div>


          {/* Avatar */}

          <div
            className="
              flex
              h-[40px]
              w-[40px]
              items-center
              justify-center
              rounded-full
              bg-[#FF7817]
              font-bold
              text-white
            "
          >
            هـم
          </div>

        </div>

      </div>


      {/* =====================================================
          MENU
      ===================================================== */}

      <nav className="px-3 pt-4">

        {/* ===================================================
            الرئيسية
        =================================================== */}

        <NavLink
          to="/dashboard"
          onClick={onClose}
          className={getItemClass(isDashboardActive)}
        >

          {/* Home Icon */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-9Z"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 21v-6h6v6"
            />
          </svg>

          <span>
            الرئيسية
          </span>

        </NavLink>


        {/* ===================================================
            الرحلات
        =================================================== */}

        <NavLink
          to="/trips"
          onClick={onClose}
          className={getItemClass(isTripsActive)}
        >

          {/* Car Icon */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13V9.5A2.5 2.5 0 0 1 7.5 7h9A2.5 2.5 0 0 1 19 9.5V13"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13h18"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13v4h14v-4"
            />

            <circle
              cx="7"
              cy="17"
              r="1.5"
            />

            <circle
              cx="17"
              cy="17"
              r="1.5"
            />

          </svg>

          <span>
            الرحلات
          </span>

        </NavLink>


        {/* ===================================================
            الطلبات
        =================================================== */}

        <NavLink
          to="/requests"
          onClick={onClose}
          className={getItemClass(isRequestsActive)}
        >

          {/* Box Icon */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >

            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="2"
            />

            <path d="M8 9h8" />

            <path d="M8 13h8" />

            <path d="M8 17h5" />

          </svg>

          <span>
            الطلبات
          </span>

        </NavLink>


        {/* ===================================================
            الرسائل
        =================================================== */}

        <NavLink
          to="/messages"
          onClick={onClose}
          className={getItemClass(isMessagesActive)}
        >

          {/* Message Icon */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-5 4v-4h-.5A2.5 2.5 0 0 1 3 13.5v-8Z"
            />

          </svg>

          <span>
            الرسائل
          </span>

        </NavLink>


        {/* ===================================================
            المحفظة
        =================================================== */}

        <NavLink
          to="/wallet"
          onClick={onClose}
          className={getItemClass(isWalletActive)}
        >

          {/* Wallet Icon */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >

            <rect
              x="3"
              y="6"
              width="18"
              height="13"
              rx="2"
            />

            <path d="M3 9h18" />

            <path d="M15 13h3" />

          </svg>

          <span>
            المحفظة
          </span>

        </NavLink>


        {/* ===================================================
            حسابي
        =================================================== */}

        <NavLink
          to="/profile"
          onClick={onClose}
          className={getItemClass(isProfileActive)}
        >

          {/* User Icon */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >

            <circle
              cx="12"
              cy="8"
              r="3"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 20a7 7 0 0 1 14 0"
            />

          </svg>

          <span>
            حسابي
          </span>

        </NavLink>


        {/* ===================================================
            الإعدادات
        =================================================== */}

        <NavLink
          to="/settings"
          onClick={onClose}
          className={getItemClass(isSettingsActive)}
        >

          {/* Settings Icon */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >

            <circle
              cx="12"
              cy="12"
              r="3"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.8 1.8-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2.55v-.1a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.8-1.8.06-.06A1.7 1.7 0 0 0 8.1 15a1.7 1.7 0 0 0-1.56-1.03h-.1v-2.55h.1A1.7 1.7 0 0 0 8.1 10.4a1.7 1.7 0 0 0-.34-1.88L7.7 8.46l1.8-1.8.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56V5.4h2.55v.1a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.8 1.8-.06.06A1.7 1.7 0 0 0 19.4 10.4a1.7 1.7 0 0 0 1.56 1.03h.1v2.55h-.1A1.7 1.7 0 0 0 19.4 15Z"
            />

          </svg>

          <span>
            الإعدادات
          </span>

        </NavLink>

      </nav>


      {/* =====================================================
          BOTTOM SECTION
      ===================================================== */}

      <div
        className="
          absolute
          bottom-0
          right-0
          w-full
          px-3
          pb-5
        "
      >

        {/* ===================================================
            الرصيد
        =================================================== */}

        <div
          className="
            mb-4
            flex
            h-[40px]
            items-center
            justify-between
            rounded-full
            border
            border-[#FF7817]
            px-4
          "
        >

          <span className="text-[12px] text-white">
            رصيد التوكيز
          </span>

          <span className="font-bold text-[#FF7817]">
            {/* الرصيد سيأتي من Backend */}
          </span>

        </div>


        {/* ===================================================
            تسجيل الخروج
        =================================================== */}

        <button
          type="button"
          onClick={() => {
            navigate("/welcome");
            onClose?.();
          }}
          className="
            flex
            h-[45px]
            w-full
            items-center
            gap-4
            rounded-[12px]
            px-4
            text-[#FF9696]
            transition
            hover:bg-white/10
          "
        >

          {/* Logout Icon */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H9"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 8l4 4-4 4"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 12H9"
            />

          </svg>

          <span>
            تسجيل الخروج
          </span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;