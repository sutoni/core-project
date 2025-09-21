import { useState } from "react";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setSuccess("Registrasi berhasil! Silakan login.");
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (err) {
      setError("Registrasi gagal. Periksa data Anda.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Kiri: ilustrasi */}
      <div className="hidden md:flex w-1/2 bg-blue-600 items-center justify-center">
        <img
          src="/assets/register-illustration.svg"
          alt="Register Illustration"
          className="max-w-md"
        />
      </div>

      {/* Kanan: form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Create an Account ✨
          </h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-600 mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a href="./pages/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

