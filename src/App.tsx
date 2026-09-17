import { BrowserRouter, Routes, Route } from "react-router-dom";

// =====================================================
// PUBLIC PAGES
// =====================================================
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

// =====================================================
// AUTH PAGES
// =====================================================
import Welcome from "./pages/auth/Welcome";
import RegisterStep1 from "./pages/auth/RegisterStep1";
import RegisterStep2 from "./pages/auth/RegisterStep2";
import Register from "./pages/auth/Register";

// =====================================================
// DASHBOARD PAGES
// =====================================================
import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import AddTrip from "./pages/AddTrip";
import TripCreated from "./pages/TripCreated";

// =====================================================
// REQUESTS PAGES
// =====================================================
import Requests from "./pages/Requests";
import CreateRequest from "./pages/CreateRequest";
import AddCategory from "./pages/AddCategory";
import RequestCreated from "./pages/RequestCreated";

// =====================================================
// SETTINGS PAGES
// =====================================================
import Settings from "./pages/Settings";
import ContactSupport from "./pages/ContactSupport";
import SupportChat from "./pages/SupportChat";
import ReportProblem from "./pages/ReportProblem";
import ReportDetails from "./pages/ReportDetails";
import ReportSuccess from "./pages/ReportSuccess";
import LegalTerms from "./pages/LegalTerms";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================================
            PUBLIC
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
            AUTH
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
            DASHBOARD
        ================================================= */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

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
            REQUESTS
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
            SETTINGS
        ================================================= */}

        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* التواصل مع الدعم */}
        <Route
          path="/contact-support"
          element={<ContactSupport />}
        />

        {/* محادثة الدعم */}
        <Route
          path="/support-chat"
          element={<SupportChat />}
        />

        {/* الإبلاغ عن مشكلة */}
        <Route
          path="/report-problem"
          element={<ReportProblem />}
        />

        {/* تفاصيل المشكلة */}
        <Route
          path="/report-details"
          element={<ReportDetails />}
        />

        {/* نجاح إرسال البلاغ */}
        <Route
          path="/report-success"
          element={<ReportSuccess />}
        />

        {/* الشروط القانونية والخصوصية */}
        <Route
          path="/legal-terms"
          element={<LegalTerms />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;