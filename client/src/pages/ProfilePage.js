import React from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/common/Header";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) return;
    // Ambil data user
    axios.get(`http://localhost:3000/api/users?username=${username}`)
      .then(res => {
        setUser(res.data[0] || {});
      });
    // Ambil achievement
    axios.get(`http://localhost:3000/api/achievements?username=${username}`)
      .then(res => {
        setAchievements(res.data);
      });
    // Ambil game history
    axios.get(`http://localhost:3000/api/game-session/by-user`)
      .then(res => {
        // Format riwayat game
        const history = res.data.map(session => ({
          date: new Date(session.startedAt).toLocaleDateString('id-ID'),
          role: session.players.find(p => p.username === username)?.roleId || '-',
          score: session.players.find(p => p.username === username)?.gameScore || 0,
          rank: session.players.findIndex(p => p.username === username) + 1,
          status: session.endedAt ? (session.players.find(p => p.username === username)?.isAlive ? "Menang" : "Kalah") : "Berlangsung"
        }));
        setGameHistory(history);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F6FFD7] text-lg">Memuat profil...</div>;
  }
  return (
    <div className="min-h-screen bg-[#F6FFD7] pb-8 relative z-[0]">
      <Header user={user} />
      <div className="flex justify-center mt-8">
        <div
          className="relative w-[90vw] max-w-2xl rounded-xl shadow-lg p-6"
          style={{
            backgroundImage:
              "url(/assets/images/container/background_profile.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "200px",
          }}
        >
          <div
            className="flex items-center space-x-4 mb-4 h-full"
            style={{ minHeight: "100%" }}
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-gray-200">
              {/* Avatar image here if available */}
            </div>
            <div>
              <div className="text-xl font-bold text-white drop-shadow-[1.5px_1px_1px_rgba(0,0,0,0.5)]">
                {user.name || user.username}
              </div>
              <div className="bg-[#EDFDC1] rounded-full px-4 py-1 text-[#5F5E2C] mt-2 inline-block text-sm font-medium">
                {user.email}
              </div>
            </div>
            <button className="ml-auto p-2 hover:bg-yellow-100 transition">
              <img
                src="/assets/images/icons/edit.png"
                alt="Edit Profile"
                className="w-7 h-7 object-contain"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 w-full max-w-2xl mx-auto">
        <div className="font-bold text-lg text-[#6B7A2C] mb-2 text-left">
          Pencapaian
        </div>
        <div className="flex justify-center">
          <div className="flex items-center space-x-6">
            <button className="text-[#6B7A2C] text-2xl font-bold">&#8592;</button>
            {achievements.map((ach, idx) => (
              <div key={idx} className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-400 text-3xl font-bold">
                {ach?.achievement || <span>-</span>}
              </div>
            ))}
            <button className="text-[#6B7A2C] text-2xl font-bold">&#8594;</button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div className="w-[90vw] max-w-2xl bg-[#F6FFD7] rounded-xl shadow-lg p-6">
          <div className="font-bold text-lg text-[#6B7A2C] mb-2">Riwayat Permainan</div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-[#6B7A2C] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#6B7A2C] text-white">
                  <th className="py-2 px-4 font-semibold">Tanggal</th>
                  <th className="py-2 px-4 font-semibold">Peran</th>
                  <th className="py-2 px-4 font-semibold">Skor</th>
                  <th className="py-2 px-4 font-semibold">Peringkat</th>
                  <th className="py-2 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {gameHistory.map((game, idx) => (
                  <tr key={idx} className="text-center border-b border-[#E6E6E6]">
                    <td className="py-2 px-4">{game.date}</td>
                    <td className="py-2 px-4">{game.role}</td>
                    <td className="py-2 px-4">{game.score}</td>
                    <td className="py-2 px-4">{game.rank}</td>
                    <td className="py-2 px-4" style={{ color: game.status === "Menang" ? "#6B7A2C" : game.status === "Berlangsung" ? "#F0BE01" : "#C0392B" }}>{game.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <img src="/assets/images/backgrounds/Background_bawah.png" alt="" className="absolute left-0 bottom-0 w-full pointer-events-none -z-10" style={{ objectFit: "cover" }} />
    </div>
  );
};

export default ProfilePage;
export default ProfilePage;
