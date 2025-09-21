import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import Otp from "./pages/Otp";
import OtpPage from "./pages/OtpPage";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default ke Login */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
	<Route path="/OtpPage" element={<OtpPage />} /> {/* ✅ route baru */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

