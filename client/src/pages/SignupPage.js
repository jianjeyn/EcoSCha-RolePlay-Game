import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Background from "../components/common/Background";


const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Ambil character dari query param (hasil scan QR)
  const params = new URLSearchParams(location.search);
  const character = params.get("character") || "";
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    character: character,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, formData);
      // Setelah register, login otomatis
      try {
        const loginRes = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", loginRes.data.token);
        if (loginRes.data.user && loginRes.data.user._id) {
          localStorage.setItem("userId", loginRes.data.user._id);
          localStorage.setItem("character", formData.character); // Simpan karakter spesifik
          if (formData.character) {
            navigate("/landing");
          } else {
            navigate("/"); // Atau ke halaman utama/profil
          }
        } else {
          alert("Akun berhasil dibuat, tapi login otomatis gagal. Silakan login manual.");
          navigate("/login");
        }
      } catch (loginErr) {
        alert("Akun berhasil dibuat, tapi login otomatis gagal. Silakan login manual.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Register gagal: " + (err.response?.data?.error || err.message));
    }
  // ...existing code...
  }

  return (
    <Background>
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div
          className="relative z-10 flex flex-col items-center justify-center"
          style={{
            backgroundImage: "url('/assets/images/container/form-container.png')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "auto",
            height: "auto",
            minWidth: "600px",
            minHeight: "500px",
            padding: "80px 60px 40px 60px",
          }}
        >
          <div className="space-y-4 w-full max-w-md mt-24">
            {/* Username Input */}
            <div>
          <input
            type="text"
            name="username"
            placeholder="Nama"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-6 py-4 bg-gray-200 rounded-2xl border-none outline-none text-gray-700 placeholder-gray-500 text-lg focus:bg-gray-100 transition-colors duration-200"
          />
        </div>

        {/* Email Input */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-6 py-4 bg-gray-200 rounded-2xl border-none outline-none text-gray-700 placeholder-gray-500 text-lg focus:bg-gray-100 transition-colors duration-200"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-6 py-4 bg-gray-200 rounded-2xl border-none outline-none text-gray-700 placeholder-gray-500 text-lg focus:bg-gray-100 transition-colors duration-200 pr-12"
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
          </button>
        </div>

        {/* Login Link */}
        <div className="text-right">
          <button
            type="button"
            className="text-blue-600 hover:text-blue-800 text-sm transition-colors duration-200 bg-transparent border-none cursor-pointer"
            onClick={() => {
              const params = new URLSearchParams(location.search);
              const character = params.get('character');
              if (character) {
                navigate(`/login?character=${character}`);
              } else {
                navigate('/login');
              }
            }}
          >
            Sudah memiliki akun?
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg mt-4"
        >
          Daftar
        </button>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default SignupPage;
