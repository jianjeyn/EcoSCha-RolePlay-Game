import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DiscussionSessionPage = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      // Timer finished
      console.log('Discussion session ended');
      navigate('/voting'); // Replace with your desired navigation
    }
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
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
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
        
        {/* Session Title */}
        <div className="mb-12">
          <h1 className="text-white text-6xl font-bold font-poppins text-center tracking-wide">
            SESI DISKUSI
          </h1>
        </div>

        {/* Timer Display */}
        <div 
          className="text-white font-bold py-8 px-16 rounded-3xl shadow-2xl text-6xl font-poppins"
          style={{ 
            backgroundColor: timeLeft <= 60 ? '#dc2626' : '#982827',
            transition: 'background-color 0.3s ease'
          }}
        >
          {formatTime(timeLeft)}
        </div>
      </main>
    </div>
  );
};

export default DiscussionSessionPage;