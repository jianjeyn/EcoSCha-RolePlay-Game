import React, { useState, useEffect } from "react";
import Modal from "../components/common/Modal";
import axios from "axios";
import Header from "../components/common/Header";
import Background from "../components/common/Background";
import { useNavigate } from "react-router-dom";

const LeaderboardStart = () => {
  const [players, setPlayers] = useState([]);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementText, setAchievementText] = useState("");
  const navigate = useNavigate();
  const roleId = localStorage.getItem("roleId") || "eco_citizen";

  useEffect(() => {
    // Fetch leaderboard data from backend (top users by gameScore)
  axios.get(`${process.env.REACT_APP_API_URL}/api/users`)
      .then(res => {
        // Sort users by gameScore (if available)
        const sorted = res.data.sort((a, b) => (b.gameScore || 0) - (a.gameScore || 0));
        setPlayers(sorted);
        // Achievement popup logic
        const myUsername = localStorage.getItem("username");
        const myIndex = sorted.findIndex(u => u.username === myUsername);
        if (myIndex >= 0 && myIndex < 3) {
          setAchievementText(`Selamat! Kamu masuk TOP ${myIndex+1} di leaderboard!`);
          setShowAchievement(true);
          // Update achievement ke backend
          axios.post(`${process.env.REACT_APP_API_URL}/api/achievements`, {
            username: myUsername,
            achievement: `TOP ${myIndex+1} Leaderboard`
          }).catch(() => {});
        }
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

  const [quizTime, setQuizTime] = useState(300); // default 5 menit
  const [quizFinished, setQuizFinished] = useState(false);

  const handleStartGame = () => {
    // Moderator klik mulai, ke halaman narasi berikutnya
    navigate("/narrative");
  };

  const handleAddTime = () => {
    setQuizTime(quizTime + 60); // tambah 1 menit
  };

  const handleFinishQuiz = () => {
    setQuizFinished(true);
    // Setelah quiz selesai, tampilkan leaderboard dan tombol mulai narasi berikutnya
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
            {players.map((player, index) => {
              // Highlight top 3
              let bgColor = "bg-dark-red";
              if (index === 0) bgColor = "bg-yellow text-dark-red border-4 border-yellow-700";
              else if (index === 1) bgColor = "bg-gray-300 text-dark-red border-4 border-gray-500";
              else if (index === 2) bgColor = "bg-orange-300 text-dark-red border-4 border-orange-500";
              return (
                <div key={player._id || index} className="flex items-center">
                  {/* Rank Number */}
                  <div className="text-3xl font-bold text-dark-green w-12 text-center mr-4">
                    {index + 1}
                  </div>
                  {/* Player Info Bar */}
                  <div className={`flex-1 font-bold py-4 px-6 rounded-2xl shadow-lg flex items-center justify-between ${bgColor}`}>
                    <div className="flex items-center">
                      <span className="mr-2">{player.username}</span>
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
              );
            })}
          </div>
        </div>
        {/* Tombol kontrol quiz khusus moderator */}
        {roleId === "sustainability_guide" && !quizFinished && (
          <div className="text-center mt-8 flex flex-col gap-4 items-center">
            <div className="text-lg text-gray-800 mb-2">Sisa waktu quiz: {Math.floor(quizTime/60)}:{(quizTime%60).toString().padStart(2,"0")}</div>
            <button
              onClick={handleAddTime}
              className="bg-yellow text-dark-red font-bold py-2 px-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 font-poppins"
            >
              Tambah Waktu 1 Menit
            </button>
            <button
              onClick={handleFinishQuiz}
              className="bg-red-700 text-white font-bold py-2 px-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 font-poppins"
            >
              Selesai Quiz
            </button>
          </div>
        )}
        {/* Setelah quiz selesai, moderator bisa mulai narasi berikutnya */}
        {roleId === "sustainability_guide" && quizFinished && (
          <div className="text-center mt-8">
            <button
              onClick={handleStartGame}
              className="bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 font-poppins"
            >
              Mulai Narasi Berikutnya
            </button>
          </div>
        )}
      {/* Achievement Popup */}
      {showAchievement && (
        <Modal onClose={() => setShowAchievement(false)}>
          <div className="text-center p-8">
            <img src="/assets/images/icons/trophy.png" alt="Trophy" className="mx-auto mb-4 w-16 h-16" />
            <div className="text-2xl font-bold text-yellow mb-2">Achievement Unlocked!</div>
            <div className="text-lg text-dark-green">{achievementText}</div>
            <button
              className="mt-6 px-6 py-2 bg-yellow text-dark-red rounded-full font-bold shadow-lg"
              onClick={() => setShowAchievement(false)}
            >Tutup</button>
          </div>
        </Modal>
      )}
    </main>
    </Background>
  );
};

export default LeaderboardStart;
