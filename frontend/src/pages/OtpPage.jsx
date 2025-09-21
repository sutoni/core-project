import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function OtpPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // ambil email dari Login.jsx

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/verify-otp", { email, otp });
      localStorage.setItem("token", res.data.token); // simpan token
      navigate("/dashboard"); // redirect ke dashboard
    } catch (err) {
      setError(err.response?.data?.message || "OTP tidak valid");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setMessage("");
    setResendLoading(true);

    try {
      const res = await api.post("/resend-otp", { email });
      setMessage(res.data.message || "OTP baru sudah dikirim ke email Anda");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengirim ulang OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Verifikasi OTP</h2>
      <p>Kode OTP sudah dikirim ke email: <b>{email}</b></p>

      <form onSubmit={handleVerify}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Masukkan kode OTP"
            required
            maxLength={6}
            style={{ width: "100%", padding: "8px", textAlign: "center", fontSize: "18px", letterSpacing: "6px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: loading ? "#aaa" : "#333",
            color: "#fff",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: "10px",
          }}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <button
        onClick={handleResend}
        disabled={resendLoading}
        style={{
          width: "100%",
          padding: "10px",
          background: resendLoading ? "#aaa" : "#555",
          color: "#fff",
          border: "none",
          cursor: resendLoading ? "not-allowed" : "pointer",
        }}
      >
        {resendLoading ? "Mengirim..." : "Kirim Ulang OTP"}
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
    </div>
  );
}

