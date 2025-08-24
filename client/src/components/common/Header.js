import React, { useState, useEffect, useRef } from "react";

const Header = ({ user, onLogout }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  // Measure header height
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeaderHeight(entry.target.offsetHeight);
      }
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        resizeObserver.unobserve(headerRef.current);
      }
    };
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isSticky && <div style={{ height: `${headerHeight}px` }} />}
      <header
        ref={headerRef}
        className={`w-full ${
          isSticky ? "fixed top-0 left-0 z-50" : "relative"
        } transition-all duration-300`}
      >
        <img
          src="/assets/images/navbar/navbar.png"
          alt="EcoSCha Navbar"
          className="w-full h-auto object-cover"
        />
        {/* Navbar Buttons */}
        <nav className="absolute top-2 right-8 flex space-x-6 z-10">
          <a
            href="/"
            className="px-4 py-2 rounded-full text-[#6B7A2C] font-semibold hover:bg-yellow-300 transition"
          >
            Halaman Utama
          </a>
          <a
            href="/landing"
            className="px-4 py-2 rounded-full text-[#6B7A2C] font-semibold hover:bg-yellow-300 transition"
          >
            Mulai Permainan
          </a>
          <a
            href="/guide"
            className="px-4 py-2 rounded-full text-[#6B7A2C] font-semibold hover:bg-yellow-300 transition"
          >
            Petunjuk
          </a>
          <a
            href="/profile"
            className="px-4 py-2 rounded-full text-[#6B7A2C] font-semibold hover:bg-yellow-300 transition"
          >
            Profil
          </a>
        </nav>
        {/* Hamburger Menu Button
        <button className="absolute top-0 right-4 p-2 hover:bg-black/10 rounded-lg transition-colors duration-200 hover:scale-105 transform">
          <img
            src="/assets/images/icons/hamburgerbutton.png"
            alt="Menu"
            className="w-10 h-10 transition-transform duration-200 hover:brightness-110"
          />
        </button> */}

        {/* User info - conditionally rendered if user exists
        {user && (
          <div className="absolute top-0 left-4 flex items-center space-x-4 p-2">
            <span className="text-sm text-white">Welcome, {user.name}</span>
            <button
              onClick={onLogout}
              className="text-sm bg-primary-700 hover:bg-primary-800 px-3 py-1 rounded-md transition-colors text-white"
            >
              Logout
            </button>
          </div>
        )} */}
      </header>
    </>
  );
};

export default Header;
