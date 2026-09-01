import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

import Welcome from "./pages/auth/Welcome";
import RegisterStep1 from "./pages/auth/RegisterStep1";
import RegisterStep2 from "./pages/auth/RegisterStep2";
import Register from "./pages/auth/Register";

import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/landing"
          element={<LandingPage />}
        />

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

        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/trips"
            element={<Trips />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;