import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
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
          <button onClick={() => {navigate("/profile"); setOpen(false);}} className="text-[#6B7A2C] font-semibold text-left">Profil</button>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
