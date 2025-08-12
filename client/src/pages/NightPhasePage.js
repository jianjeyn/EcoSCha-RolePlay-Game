import React from 'react';

const NightPhasePage = () => {
  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url(/assets/images/backgrounds/signup-bg.png)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Header */}
      <header className="w-full relative">
        <img
          src="/assets/images/navbar/navbar.png"
          alt="EcoSCha Navbar"
          className="w-full h-auto object-cover shadow-lg"
        />
        {/* Hamburger Menu Button */}
        <button className="absolute top-4 right-4 p-2 hover:bg-black/10 rounded-lg transition-colors duration-200 hover:scale-105 transform">
          <img
            src="/assets/images/icons/hamburgerbutton.png"
            alt="Menu"
            className="w-12 h-12 transition-transform duration-200 hover:brightness-110"
          />
        </button>
      </header>

      {/* Night Phase Content */}
      <div className="flex flex-col items-center justify-center relative" style={{ height: 'calc(100vh - 100px)' }}>
        
        {/* Night Phase Image */}
        <div className="relative">
          <img
            src="/assets/images/icons/nightphase.png"
            alt="Night Phase"
            className="w-auto h-auto max-w-lg max-h-96 object-contain"
          />
          
          {/* Phase Title Overlay */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateY(40px)' }}>
            <h1 className="text-white text-5xl font-bold font-poppins text-center">
              Fase Malam
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NightPhasePage;