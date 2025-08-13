import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const LeaderboardStart = () => {
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

  const getRoleColor = (role) => {
    const colors = {
      "ECO CITIZEN": "#F0BE01",
      "GREEN GUARDIAN": "#F0BE01",
      "WASTE MANAGER": "#F0BE01",
      "WASTE VILLAIN": "#F0BE01",
    };
    return colors[role] || "#F0BE01";
  };

  return (
    <Background>
      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 py-16">
        {/* Leaderboard Section */}
        <div className="bg-light-gray rounded-3xl shadow-2xl p-8">
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
      </main>
    </Background>
  );
};

export default LeaderboardStart;
