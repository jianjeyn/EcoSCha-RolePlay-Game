import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModeratorMorningPhase = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [currentStep, setCurrentStep] = useState(1); // Step 1: Deskripsi, Step 2: Instruksi
  const navigate = useNavigate();

  const morningData = {
    1: {
      title: "SIANG 1",
      descriptionImage: "/assets/images/icons/morningphase-desc1.png",
      instructionsImage: "/assets/images/icons/morningphase-desc2.png"
    }
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      // Pindah ke step 2 (instruksi)
      setCurrentStep(2);
    } else {
      // Navigate to discussion phase
      console.log("Navigate to discussion phase");
      navigate('/discussion-session'); // Uncomment when navigation is ready
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
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-16">

        {/* Phase Title */}
        <div className="text-center mb-8 relative">
          {/* Background Image */}
          <div 
            className="inline-block transform scale-150"
            style={{
              backgroundImage: 'url(/assets/images/icons/moderator-morning-phase.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '300px',
              height: '80px'
            }}
          >
          </div>
          
          {/* Text Overlay */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              top: '50%',
              transform: 'scale(0.67)'
            }}
          >
            <span className="text-white font-bold text-4xl">
              Fase Siang
            </span>
          </div>
        </div>

        {/* Content Image with Badge */}
        <div className="text-center mb-8 relative">
          {/* Content Image */}
          <img
            src={currentStep === 1 ? morningData[currentDay].descriptionImage : morningData[currentDay].instructionsImage}
            alt={currentStep === 1 ? "Morning Description" : "Morning Instructions"}
            className="w-full max-w-4xl h-auto rounded-3xl mx-auto"
          />
          
          {/* Day Number Badge - positioned inside image at top-left */}
          <div className="absolute z-10" style={{ top: '7%', left: '4%' }}>
            <div className="bg-yellow text-white font-bold py-2 px-6 rounded-2xl shadow-lg text-lg">
              {morningData[currentDay].title}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            className="text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
            style={{ 
              backgroundColor: '#982827',
              fontFamily: 'Nunito, sans-serif'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#7a1f1e'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#982827'}
          >
            {currentStep === 1 ? 'LANJUTKAN' : 'MULAI DISKUSI'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ModeratorMorningPhase;