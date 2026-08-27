import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import Welcome from "./pages/auth/Welcome";
import Register from "./pages/auth/Register";
import RegisterStep1 from "./pages/auth/RegisterStep1";
import RegisterStep2 from "./pages/auth/RegisterStep2";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* صفحة شعار التطبيق */}
        <Route path="/" element={<Home />} />

        {/* صفحة الاختيار: تسجيل الدخول أو إنشاء حساب */}
        <Route path="/welcome" element={<Welcome />} />

        {/* تسجيل الدخول */}
        <Route path="/register" element={<Register />} />

        {/* إنشاء الحساب - الخطوة الأولى */}
        <Route
          path="/register-step1"
          element={<RegisterStep1 />}
        />

        {/* إنشاء الحساب - الخطوة الثانية */}
        <Route
          path="/register-step2"
          element={<RegisterStep2 />}
        />

        {/* الصفحة الرئيسية بعد تسجيل الدخول */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;