import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const NarrativePage = () => {
  const navigate = useNavigate();
  const [narratives, setNarratives] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/api/game-narratives")
      .then(res => {
        // Urutkan narasi sesuai urutan di backend (bisa pakai kapanDibaca atau urutan array)
        setNarratives(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleNext = () => {
    // Narasi pertama: siswa ke /quiz, moderator ke /leaderboard
    if (currentIdx === 0) {
      const roleId = localStorage.getItem("roleId") || "eco_citizen";
      if (roleId === "sustainability_guide") {
        navigate("/leaderboard");
      } else {
        navigate("/quiz");
      }
    } else if (currentIdx === 1) {
      // Narasi kedua: masuk ke permainan inti (fase malam/pagi)
      const roleId = localStorage.getItem("roleId") || "eco_citizen";
      if (roleId === "sustainability_guide") {
        navigate("/moderator-night-phase");
      } else {
        navigate("/night-phase");
      }
    } else if (currentIdx < narratives.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Selesai semua narasi, lanjut ke quiz akhir (di akhir game)
      navigate("/quiz");
    }
  };

  if (loading) {
    return (
      <Background>
        <Header />
        <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
          <div className="text-white text-2xl font-bold">Memuat narasi...</div>
        </main>
      </Background>
    );
  }

  if (!narratives.length) {
    return (
      <Background>
        <Header />
        <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
          <div className="text-white text-2xl font-bold">Narasi tidak tersedia.</div>
        </main>
      </Background>
    );
  }

  const current = narratives[currentIdx];

  return (
    <Background>
      <Header />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="mb-8">
          <h1 className="text-white text-4xl font-bold font-poppins text-center tracking-wide">
            Narasi Permainan
          </h1>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl text-center">
          <div className="text-lg text-gray-800 font-poppins mb-8">
            <strong>{current.kapanDibaca}</strong>
            <br />
            {current.isiBacaan}
          </div>
          <button
            onClick={handleNext}
            className="bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 font-poppins"
          >
            {currentIdx < narratives.length - 1 ? "Lanjut Narasi" : "Selesai Membaca Narasi"}
          </button>
        </div>
      </main>
    </Background>
  );
};

export default NarrativePage;
