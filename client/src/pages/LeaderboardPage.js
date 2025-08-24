import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const LeaderboardStart = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from backend (top users by gameScore)
    axios.get("http://localhost:3000/api/users")
      .then(res => {
        // Sort users by gameScore (if available)
        const sorted = res.data.sort((a, b) => (b.gameScore || 0) - (a.gameScore || 0));
        setPlayers(sorted);
      })
      .catch(err => {
        setPlayers([]);
        console.error("Failed to fetch leaderboard:", err);
      });
  }, []);

  const getRoleColor = (role) => {
    const colors = {
      "eco_citizen": "#F0BE01",
      "green_guardian": "#F0BE01",
      "waste_manager": "#F0BE01",
      "waste_villain": "#F0BE01",
      "sustainability_guide": "#F0BE01"
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
              <div key={player._id || index} className="flex items-center">
                {/* Rank Number */}
                <div className="text-3xl font-bold text-dark-green w-12 text-center mr-4">
                  {index + 1}
                </div>
                {/* Player Info Bar */}
                <div className="flex-1 text-white font-bold py-4 px-6 rounded-2xl shadow-lg flex items-center justify-between bg-dark-red">
                  <div className="flex items-center">
                    <span className="text-white mr-2">{player.username}</span>
                    <span className="font-bold text-yellow">
                      ({player.roleId})
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
                      {(player.gameScore || 0)} PTS
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
