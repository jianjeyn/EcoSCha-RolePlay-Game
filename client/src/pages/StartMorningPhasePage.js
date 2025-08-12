import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartMorningPhasePage = () => {
  const navigate = useNavigate();

  const handleStartMorningPhase = () => {
    // Get player ID from localStorage or state management
    const playerId = localStorage.getItem('playerId') || 8;
    
    if (parseInt(playerId) === 8) {
      // Player 8 is moderator (Sustainability Guide)
      navigate('/moderator-morning-phase');
    } else {
      // Players 1-7 are regular players
      navigate('/morning-phase');
    }
  };

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

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center relative" style={{ height: 'calc(100vh - 100px)' }}>
        
        {/* Center Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto text-center">
          {/* Question Text */}
          <h1 className="text-2xl font-bold text-gray-700 mb-6" style={{ color: '#515025' }}>
            SELESAI MENONTON VIDEO?
          </h1>
          
          {/* Start Morning Phase Button */}
          <div className="flex justify-center">
            <button
              onClick={handleStartMorningPhase}
              className="text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
              style={{ 
                backgroundColor: '#982827',
                fontFamily: 'Poppins, sans-serif'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#7a1f1e'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#982827'}
            >
              <span className="text-2xl">▶</span>
              MULAI FASE SIANG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMorningPhasePage;