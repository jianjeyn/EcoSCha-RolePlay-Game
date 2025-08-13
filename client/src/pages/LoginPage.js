import React, { useState } from "react";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <Background>
      <Header />

      {/* Login Form - Using Asset Image */}
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div
          className="relative z-10 flex flex-col items-center justify-center"
          style={{
            backgroundImage:
              "url('/assets/images/container/form-container.png')",
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
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-gray-200 rounded-2xl border-none outline-none text-gray-700 placeholder-gray-500 text-lg focus:bg-gray-100 transition-colors duration-200"
              />
            </div>

            {/* Signup Link */}
            <div className="text-right">
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 text-sm transition-colors duration-200 bg-transparent border-none cursor-pointer"
              >
                Belum memiliki akun?
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg mt-4"
            >
              Masuk
            </button>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default LoginPage;
