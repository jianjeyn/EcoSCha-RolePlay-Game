import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const VotingPage = () => {
  // Handler for selecting a player
  const handlePlayerSelect = (playerId) => {
    setSelectedPlayer(playerId);
  };

  // Handler for confirming vote
  const handleConfirm = () => {
    if (selectedPlayer) {
      // You can add logic here to submit the vote, e.g., API call
      navigate("/leaderboard");
    }
  };
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [narratives, setNarratives] = useState([]);
  const [showNarrative, setShowNarrative] = useState(true);
  const navigate = useNavigate();
  // ...existing code...
  return (
    <>
      <div>
        <main className="container mx-auto py-8">
          <Header title="Voting" />
          {/* Voting Narratives */}
          {showNarrative && (
            <div className="mb-8">
              {narratives.map((narrative, idx) => (
                <div key={idx} className="bg-yellow-100 p-4 rounded-lg shadow mb-2 text-center text-lg font-semibold">
                  {narrative.text}
                </div>
              ))}
              <button onClick={() => setShowNarrative(false)} className="bg-green-600 text-white px-4 py-2 rounded mt-4">OK</button>
            </div>
          )}

          {/* Players Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {players.map((player) => {
              let playerColor = "#982827";
              let hoverColor = "hover:bg-red-700";
              if (player.id === 2 || player.id === 7) {
                playerColor = "#ffa722";
                hoverColor = "hover:bg-orange-600";
              } else if (player.id === 3 || player.id === 6) {
                playerColor = "#5f5e2c";
                hoverColor = "hover:bg-olive-600";
              } else if (player.id === 4 || player.id === 5) {
                playerColor = "#744d26";
                hoverColor = "hover:bg-brown-600";
              }
              return (
                <button
                  key={player.id}
                  onClick={() => handlePlayerSelect(player.id)}
                  className={`font-bold py-8 px-3 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 text-white text-lg ${selectedPlayer === player.id ? "ring-4 ring-yellow-400 scale-105" : ""} ${hoverColor}`}
                  style={{ backgroundColor: playerColor, fontFamily: "Poppins, sans-serif" }}
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
              className={`text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 ${selectedPlayer ? "hover:bg-red-700" : "opacity-50 cursor-not-allowed"}`}
              style={{ backgroundColor: "#982827", fontFamily: "Poppins, sans-serif" }}
            >
              OK
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default VotingPage;