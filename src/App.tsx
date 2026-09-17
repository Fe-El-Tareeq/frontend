import { BrowserRouter, Routes, Route } from "react-router-dom";

// =====================================================
// الصفحات الرئيسية
// =====================================================
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

// =====================================================
// صفحات التسجيل والدخول
// =====================================================
import Welcome from "./pages/auth/Welcome";
import RegisterStep1 from "./pages/auth/RegisterStep1";
import RegisterStep2 from "./pages/auth/RegisterStep2";
import Register from "./pages/auth/Register";

// =====================================================
// صفحات لوحة التحكم والرحلات
// =====================================================
import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import AddTrip from "./pages/AddTrip";
import TripCreated from "./pages/TripCreated";

// =====================================================
// صفحات الطلبات
// =====================================================
import Requests from "./pages/Requests";
import CreateRequest from "./pages/CreateRequest";
import AddCategory from "./pages/AddCategory";
import RequestCreated from "./pages/RequestCreated";

// =====================================================
// صفحات الإعدادات والدعم
// =====================================================
import Settings from "./pages/Settings";
import ContactSupport from "./pages/ContactSupport";
import SupportChat from "./pages/SupportChat";
import ReportProblem from "./pages/ReportProblem";
import ReportDetails from "./pages/ReportDetails";
import ReportSuccess from "./pages/ReportSuccess";
import LegalTerms from "./pages/LegalTerms";

// =====================================================
// صفحات المحفظة
// =====================================================
import Wallet from "./pages/WalletPages/Wallet";
import PaymentCard from "./pages/WalletPages/PaymentCard";
import PaymentQR from "./pages/WalletPages/PaymentQR";
import PaymentConfirm from "./pages/WalletPages/PaymentConfirm";
import BuyPoints from "./pages/WalletPages/BuyPoints";
import PaymentMethod from "./pages/WalletPages/PaymentMethod";
import PurchaseSuccess from "./pages/WalletPages/PurchaseSuccess";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================================
            الصفحة الرئيسية
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/landing"
          element={<LandingPage />}
        />


        {/* =================================================
            تسجيل الدخول وإنشاء الحساب
        ================================================= */}

        <Route
          path="/welcome"
          element={<Welcome />}
        />

        <Route
          path="/register-step1"
          element={<RegisterStep1 />}
        />

        <Route
          path="/register-step2"
          element={<RegisterStep2 />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =================================================
            لوحة التحكم
        ================================================= */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* =================================================
            الرحلات
        ================================================= */}

        <Route
          path="/trips"
          element={<Trips />}
        />

        <Route
          path="/add-trip"
          element={<AddTrip />}
        />

        <Route
          path="/trip-created"
          element={<TripCreated />}
        />


        {/* =================================================
            الطلبات
        ================================================= */}

        <Route
          path="/requests"
          element={<Requests />}
        />

        <Route
          path="/create-request"
          element={<CreateRequest />}
        />

        <Route
          path="/add-category"
          element={<AddCategory />}
        />

        <Route
          path="/request-created"
          element={<RequestCreated />}
        />


        {/* =================================================
            الإعدادات
        ================================================= */}

        <Route
          path="/settings"
          element={<Settings />}
        />


        {/* =================================================
            الدعم الفني
        ================================================= */}

        <Route
          path="/contact-support"
          element={<ContactSupport />}
        />

        <Route
          path="/support-chat"
          element={<SupportChat />}
        />


        {/* =================================================
            الإبلاغ عن مشكلة
        ================================================= */}

        <Route
          path="/report-problem"
          element={<ReportProblem />}
        />

        <Route
          path="/report-details"
          element={<ReportDetails />}
        />

        <Route
          path="/report-success"
          element={<ReportSuccess />}
        />


        {/* =================================================
            الشروط والخصوصية
        ================================================= */}

        <Route
          path="/legal-terms"
          element={<LegalTerms />}
        />


        {/* =================================================
            المحفظة
        ================================================= */}

        <Route
          path="/wallet"
          element={<Wallet />}
        />

        <Route
          path="/wallet/payment-card"
          element={<PaymentCard />}
        />

        <Route
          path="/wallet/payment-qr"
          element={<PaymentQR />}
        />

        <Route
          path="/wallet/payment-confirm"
          element={<PaymentConfirm />}
        />

        <Route
          path="/wallet/buy-points"
          element={<BuyPoints />}
        />

        <Route
          path="/wallet/payment-method"
          element={<PaymentMethod />}
        />

        <Route
          path="/wallet/success"
          element={<PurchaseSuccess />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;