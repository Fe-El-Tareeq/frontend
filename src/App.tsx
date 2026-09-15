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
// APP
// =====================================================
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================================
            HOME
        ================================================= */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* =================================================
            LANDING PAGE
        ================================================= */}
        <Route
          path="/landing"
          element={<LandingPage />}
        />

        {/* =================================================
            AUTHENTICATION
        ================================================= */}

        {/* Login / Welcome */}
        <Route
          path="/welcome"
          element={<Welcome />}
        />

        {/* Register Step 1 */}
        <Route
          path="/register-step1"
          element={<RegisterStep1 />}
        />

        {/* Register Step 2 */}
        <Route
          path="/register-step2"
          element={<RegisterStep2 />}
        />

        {/* Register */}
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

        {/* =================================================
            TRIPS
        ================================================= */}

        {/* All Trips */}
        <Route
          path="/trips"
          element={<Trips />}
        />

        {/* Add New Trip */}
        <Route
          path="/add-trip"
          element={<AddTrip />}
        />

        {/* Trip Created Successfully */}
        <Route
          path="/trip-created"
          element={<TripCreated />}
        />

        {/* =================================================
            REQUESTS
        ================================================= */}

        {/* All Requests */}
        <Route
          path="/requests"
          element={<Requests />}
        />

        {/* Create Request */}
        <Route
          path="/create-request"
          element={<CreateRequest />}
        />

        {/* Add Category */}
        <Route
          path="/add-category"
          element={<AddCategory />}
        />

        {/* Request Created Successfully */}
        <Route
          path="/request-created"
          element={<RequestCreated />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;