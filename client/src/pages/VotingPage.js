import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const VotingPage = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [timer, setTimer] = useState("05:00");
  const navigate = useNavigate();

  const players = [
    { id: 1, name: "Player 1", isAlive: true },
    { id: 2, name: "Player 2", isAlive: true },
    { id: 3, name: "Player 3", isAlive: true },
    { id: 4, name: "Player 4", isAlive: true },
    { id: 5, name: "Player 5", isAlive: true },
    { id: 6, name: "Player 6", isAlive: true },
    { id: 7, name: "Player 7", isAlive: true },
    { id: 8, name: "Player 8", isAlive: true },
  ];

  const handlePlayerSelect = (playerId) => {
    setSelectedPlayer(playerId);
  };

  const handleConfirm = () => {
    if (selectedPlayer) {
      console.log(`Voted for player ${selectedPlayer}`);
      // Handle voting logic here
      // navigate to next phase or show results
    }
  };

  return (
    <Background>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Instruction Card with Day Badge and Timer */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 relative">
          {/* Day Badge - positioned at top left corner */}
          <div className="absolute -top-4 -left-4 bg-yellow text-white font-bold py-3 px-12 rounded-xl shadow-lg text-lg z-10">
            SIANG 1
          </div>

          {/* Timer - positioned at top right corner */}
          <div
            className="absolute -top-4 -right-4 text-white font-bold py-3 px-6 rounded-lg text-lg z-10"
            style={{ backgroundColor: "#982827" }}
          >
            {timer}
          </div>

          {/* Instruction Text */}
          <div className="text-gray-800 text-base font-poppins pt-4">
            Diskusikan bersama teman untuk memilih salah satu warga yang
            dicurigai sebagai Waste Villain dan akan dieliminasi:
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {players.map((player) => {
            // Determine player color based on ID
            let playerColor = "#982827"; // Default red
            let hoverColor = "hover:bg-red-700";

            if (player.id === 2 || player.id === 7) {
              playerColor = "#ffa722"; // Orange
              hoverColor = "hover:bg-orange-600";
            } else if (player.id === 3 || player.id === 6) {
              playerColor = "#5f5e2c"; // Olive
              hoverColor = "hover:bg-olive-600";
            } else if (player.id === 4 || player.id === 5) {
              playerColor = "#744d26"; // Brown
              hoverColor = "hover:bg-brown-600";
            }

            return (
              <button
                key={player.id}
                onClick={() => handlePlayerSelect(player.id)}
                className={`
                  font-bold py-8 px-3 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 text-white text-lg
                  ${
                    selectedPlayer === player.id
                      ? "ring-4 ring-yellow-400 scale-105"
                      : ""
                  }
                  ${hoverColor}
                `}
                style={{
                  backgroundColor: playerColor,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {player.name}
              </button>
            );
          })}
        </div>

        {/* OK Button */}
        <div className="text-center">
          <button
            onClick={handleConfirm}
            disabled={!selectedPlayer}
            className={`
              text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105
              ${
                selectedPlayer
                  ? "hover:bg-red-700"
                  : "opacity-50 cursor-not-allowed"
              }
            `}
            style={{
              backgroundColor: "#982827",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            OK
          </button>
        </div>
      </main>
    </Background>
  );
};

export default VotingPage;
