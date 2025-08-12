import React, { useState, useEffect } from 'react';

const ModeratorRoom = () => {
  const [roomCode, setRoomCode] = useState('A3HJGF89');
  const [currentRole, setCurrentRole] = useState('SUSTAINABILITY GUIDE');
  const [generatedCode, setGeneratedCode] = useState('');

  const generateNewCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCode(result);
    setRoomCode(result);
  };

  const RoleCard = ({ role }) => {
    const roleData = {
      'SUSTAINABILITY GUIDE': {
        image: '/assets/images/cards/sustainability-guide.png',
      }
    };

    const data = roleData[role] || roleData['SUSTAINABILITY GUIDE'];

    return (
      <div className="flex justify-center">
        <img 
          src={data.image} 
          alt={role}
          className="w-auto h-auto rounded-2xl shadow-lg"
          style={{ maxWidth: '75%', maxHeight: '75%' }}
        />
      </div>
    );
  };

  const RoleDescription = ({ role }) => {
    return (
      <div className="w-full">
        <img 
          src="/assets/images/icons/moderator-role-desc.png" 
          alt="Role Description"
          className="w-full h-auto rounded-2xl"
        />
      </div>
    );
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
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Phase Header */}
        <section className="mb-8">
          <div className="text-center">
            <div className="text-white font-bold py-4 px-8 rounded-2xl shadow-lg inline-block" style={{ backgroundColor: '#F0BE01' }}>
              <h1 className="text-2xl">PERANMU ADALAH...</h1>
            </div>
          </div>
        </section>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-1 mb-8">
          {/* Left Column: Role Card - Takes 2 columns */}
          <div className="lg:col-span-2">
            <RoleCard role={currentRole} />
          </div>

          {/* Right Column: Role Description + Bottom Elements - Takes 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Role Description */}
            <div>
              <RoleDescription role={currentRole} />
            </div>

            {/* Room Code and Generate Button Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {/* Room Code Display */}
              <div className="text-center ml-8">
                <div className="bg-gray-100 rounded-xl p-6 shadow-lg w-full">
                  <span className="text-3xl font-bold text-gray-800 tracking-wider">
                    {roomCode}
                  </span>
                </div>
              </div>

              {/* Generate Code Button */}
              <div className="flex items-center justify-center -ml-4">
                <button
                  onClick={generateNewCode}
                  className="text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
                  style={{ 
                    backgroundColor: '#982827',
                    fontFamily: 'Nunito, sans-serif'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#7a1f1e'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#982827'}
                >
                  GENERATE<br />KODE
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* Generated Code Feedback */}
        {generatedCode && (
          <div className="mt-6 text-center">
            <div className="bg-white rounded-xl p-4 shadow-lg inline-block">
              <p className="text-lg text-gray-800">
                Kode baru: <span className="font-bold text-green-600">{generatedCode}</span>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ModeratorRoom;