import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const ModeratorLeaderboardStartgamePage = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "PLAYER 1",
      role: "ECO CITIZEN",
      points: 0,
      isAlive: true,
    },
    {
      id: 2,
      name: "PLAYER 2",
      role: "ECO CITIZEN",
      points: 0,
      isAlive: true,
    },
    {
      id: 3,
      name: "PLAYER 3",
      role: "GREEN GUARDIAN",
      points: 0,
      isAlive: true,
    },
    {
      id: 4,
      name: "PLAYER 4",
      role: "GREEN GUARDIAN",
      points: 0,
      isAlive: true,
    },
    {
      id: 5,
      name: "PLAYER 5",
      role: "WASTE MANAGER",
      points: 0,
      isAlive: true,
    },
    {
      id: 6,
      name: "PLAYER 6",
      role: "WASTE VILLAIN",
      points: 0,
      isAlive: true,
    },
    {
      id: 7,
      name: "PLAYER 7",
      role: "WASTE VILLAIN",
      points: 0,
      isAlive: true,
    },
    {
      id: 8,
      name: "PLAYER 8",
      role: "ECO CITIZEN",
      points: 0,
      isAlive: true,
    },
  ]);

  const startGame = () => {
    console.log("Starting game...");
    navigate("/countdown");
  };

  return (
    <Background>
      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Leaderboard Section */}
        <div className="bg-light-gray rounded-3xl shadow-2xl p-8 mb-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-white font-bold py-4 px-8 rounded-2xl shadow-lg inline-block text-2xl bg-yellow">
              PERINGKAT SAAT INI
            </div>
          </div>

          {/* Players List */}
          <div className="space-y-4">
            {players.map((player, index) => (
              <div key={player.id} className="flex items-center">
                {/* Rank Number */}
                <div className="text-3xl font-bold text-dark-green w-12 text-center mr-4">
                  {index + 1}
                </div>
                {/* Player Info Bar */}
                <div className="flex-1 text-white font-bold py-4 px-6 rounded-2xl shadow-lg flex items-center justify-between bg-dark-red">
                  <div className="flex items-center">
                    <span className="text-white mr-2">{player.name}</span>
                    <span className="font-bold text-yellow">
                      ({player.role})
                    </span>
                  </div>

                  <div className="flex items-center">
                    {/* Trophy Icon */}
                    {index === 0 && (
                      <div className="mr-3">
                        <img
                          src="/assets/images/icons/trophy.png"
                          alt="Trophy"
                          className="w-8 h-8"
                        />
                      </div>
                    )}
                    <span className="text-xl font-bold">
                      {player.points} PTS
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Start Game Section */}
        <div className="bg-light-gray rounded-3xl shadow-2xl p-6 text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-dark-green mb-4">
            MULAI PERMAINAN?
          </h2>

          <button onClick={startGame} className="relative group">
            {/* Button Shadow */}
            <div className="absolute top-1.5 left-0 w-full h-full bg-red-900 rounded-xl"></div>

            {/* Main Button */}
            <div className="relative px-8 py-3 text-white font-bold text-lg rounded-xl transition-all duration-200 transform group-hover:translate-y-1 group-active:translate-y-2 flex items-center gap-3 shadow-lg bg-dark-red">
              {/* Play Icon */}
              <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>

              {/* Text */}
              <span
                className="font-bold tracking-wide"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                PLAY
              </span>
            </div>
          </button>
        </div>
      </main>
    </Background>
  );
};

export default ModeratorLeaderboardStartgamePage;
