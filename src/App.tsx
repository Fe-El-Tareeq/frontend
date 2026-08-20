import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Welcome from "./pages/auth/Welcome";
import RegisterStep1 from "./pages/auth/RegisterStep1";
import RegisterStep2 from "./pages/auth/RegisterStep2";
import Register from "./pages/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/welcome" element={<Welcome />} />

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;