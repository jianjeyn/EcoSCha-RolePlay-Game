import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WasteVillainPage = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [currentAction, setCurrentAction] = useState('eliminate'); // 'eliminate', 'heal', 'reveal'
  const [currentPlayerId, setCurrentPlayerId] = useState(1); // ID pemain yang sedang bermain
  const navigate = useNavigate();

  // Total 7 pemain (tanpa Sustainability Guide yang jadi moderator)
  const allPlayers = [
    { id: 1, name: 'Player 1', isAlive: true },
    { id: 2, name: 'Player 2', isAlive: true },
    { id: 3, name: 'Player 3', isAlive: true },
    { id: 4, name: 'Player 4', isAlive: true },
    { id: 5, name: 'Player 5', isAlive: true },
    { id: 6, name: 'Player 6', isAlive: true },
    { id: 7, name: 'Player 7', isAlive: true },
  ];

  // Filter out current player - hanya tampilkan 6 pemain lain
  const selectablePlayers = allPlayers.filter(player => player.id !== currentPlayerId);

  const actionTexts = {
    eliminate: 'Pilih satu warga yang akan dieliminasi:',
    heal: 'Pilih satu warga yang ingin diselamatkan:',
    reveal: 'Pilih satu warga yang ingin dilihat rolenya:'
  };

  const handlePlayerSelect = (playerId) => {
    setSelectedPlayer(playerId);
  };

  const handleConfirm = () => {
    if (selectedPlayer) {
      console.log(`Selected player ${selectedPlayer} for action: ${currentAction}`);
      
      // Handle the action based on currentAction
      if (currentAction === 'reveal') {
        // Navigate to WasteManagerRevealPage with selected player data
        navigate('/waste-manager-reveal', { 
          state: { 
            selectedPlayer: allPlayers.find(p => p.id === selectedPlayer)
          } 
        });
      } else if (currentAction === 'eliminate') {
        // Handle elimination logic
        console.log('Player eliminated');
      } else if (currentAction === 'heal') {
        // Handle healing logic
        console.log('Player healed');
      }
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
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        
        {/* Instruction Card with Night Badge and Timer */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 relative">
          {/* Night Badge - positioned at top left corner */}
          <div className="absolute -top-4 -left-4 bg-yellow text-white font-bold py-3 px-12 rounded-xl shadow-lg text-lg z-10">
            MALAM 1
          </div>

          {/* Instruction Text */}
          <div className="text-gray-800 text-base font-poppins pt-4">
            {actionTexts[currentAction]}
          </div>
        </div>

         {/* Players Grid - 2 rows with 3 players each */}
        <div className="space-y-4 mb-8">
          {/* First row - 3 players */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            {selectablePlayers.slice(0, 3).map((player) => {
              // Determine player color based on ID
              let playerColor = '#982827'; // Default red
              let hoverColor = 'hover:bg-red-700';
              
              if (player.id === 2 || player.id === 7) {
                playerColor = '#ffa722'; // Orange
                hoverColor = 'hover:bg-orange-600';
              } else if (player.id === 3 || player.id === 6) {
                playerColor = '#982827'; // Red (changed from green)
                hoverColor = 'hover:bg-red-700';
              } else if (player.id === 4 || player.id === 5) {
                playerColor = '#744d26'; // Brown
                hoverColor = 'hover:bg-brown-600';
              }

              return (
                <button
                  key={player.id}
                  onClick={() => handlePlayerSelect(player.id)}
                  className={`
                    font-bold py-8 px-3 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 text-white text-lg
                    ${selectedPlayer === player.id 
                      ? 'ring-4 ring-yellow-400 scale-105' 
                      : ''
                    }
                    ${hoverColor}
                  `}
                  style={{ 
                    backgroundColor: playerColor,
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  {player.name}
                </button>
              );
            })}
          </div>
          
          {/* Second row - 3 players */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            {selectablePlayers.slice(3, 6).map((player) => {
              // Determine player color based on ID
              let playerColor = '#982827'; // Default red
              let hoverColor = 'hover:bg-red-700';
              
              if (player.id === 2 || player.id === 6) {
                playerColor = '#ffa722'; // Orange
                hoverColor = 'hover:bg-orange-600';
              } else if (player.id === 3 || player.id === 7) {
                playerColor = '#982827'; // Red (changed from green)
                hoverColor = 'hover:bg-red-700';
              } else if (player.id === 4 || player.id === 5) {
                playerColor = '#744d26'; // Brown
                hoverColor = 'hover:bg-brown-600';
              }

              return (
                <button
                  key={player.id}
                  onClick={() => handlePlayerSelect(player.id)}
                  className={`
                    font-bold py-8 px-3 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 text-white text-lg
                    ${selectedPlayer === player.id 
                      ? 'ring-4 ring-yellow-400 scale-105' 
                      : ''
                    }
                    ${hoverColor}
                  `}
                  style={{ 
                    backgroundColor: playerColor,
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  {player.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* OK Button */}
        <div className="text-center">
          <button
            onClick={handleConfirm}
            disabled={!selectedPlayer}
            className={`
              text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105
              ${selectedPlayer ? 'hover:bg-red-700' : 'opacity-50 cursor-not-allowed'}
            `}
            style={{ 
              backgroundColor: '#982827',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            OK
          </button>
        </div>
      </main>
    </div>
  );
};

export default WasteVillainPage;