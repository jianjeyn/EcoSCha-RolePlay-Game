import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // Get user from localStorage (or context if available)
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <button
        className="p-2 hover:bg-black/10 rounded-lg transition-colors duration-200 hover:scale-105 transform"
        onClick={() => setOpen(!open)}
      >
        <img
          src="/assets/images/icons/hamburgerbutton.png"
          alt="Menu"
          className="w-10 h-10 transition-transform duration-200 hover:brightness-110"
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg py-4 px-6 flex flex-col space-y-4 z-50">
          <button onClick={() => {navigate("/"); setOpen(false);}} className="text-[#6B7A2C] font-semibold text-left">Halaman Utama</button>
          <button onClick={() => {navigate("/landing"); setOpen(false);}} className="text-[#6B7A2C] font-semibold text-left">Mulai Permainan</button>
          <button onClick={() => {navigate("/guide"); setOpen(false);}} className="text-[#6B7A2C] font-semibold text-left">Petunjuk</button>
          {user ? (
            <>
              <button onClick={() => {navigate("/profile"); setOpen(false);}} className="text-[#6B7A2C] font-semibold text-left">Profil</button>
              <button
                onClick={() => {
                  localStorage.clear();
                  setOpen(false);
                  navigate("/");
                }}
                className="text-[#982827] font-semibold text-left border border-[#982827] rounded px-2 py-1 mt-2"
              >Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => {navigate("/login"); setOpen(false);}} className="text-[#6B7A2C] font-semibold text-left">Login</button>
              <button onClick={() => {navigate("/register"); setOpen(false);}} className="text-[#6B7A2C] font-semibold text-left">Daftar</button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
