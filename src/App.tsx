import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

// Auth Pages
import Welcome from "./pages/auth/Welcome";
import RegisterStep1 from "./pages/auth/RegisterStep1";
import RegisterStep2 from "./pages/auth/RegisterStep2";
import Register from "./pages/auth/Register";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import AddTrip from "./pages/AddTrip";
import TripCreated from "./pages/TripCreated";
import Requests from "./pages/Requests";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================================
            HOME
        ========================================= */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* =========================================
            LANDING PAGE
        ========================================= */}
        <Route
          path="/landing"
          element={<LandingPage />}
        />

        {/* =========================================
            AUTHENTICATION
        ========================================= */}

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

        {/* =========================================
            DASHBOARD
        ========================================= */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* =========================================
            TRIPS
        ========================================= */}

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

        {/* =========================================
            REQUESTS
        ========================================= */}

        <Route
          path="/requests"
          element={<Requests />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;