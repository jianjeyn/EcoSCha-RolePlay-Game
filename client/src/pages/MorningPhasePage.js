import React from "react";
import Header from "../components/common/Header";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Background from "../components/common/Background";

const MorningPhasePage = () => {
  const [narratives, setNarratives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNarrative, setShowNarrative] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:3000/api/narratives?phase=morning")
      .then(res => {
        setNarratives(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  return (
    <Background>
      <Header />
      {/* Narasi Fase Pagi */}
      {loading ? (
        <div className="text-center text-lg text-gray-700">Memuat narasi...</div>
      ) : showNarrative && narratives.length > 0 ? (
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 text-center">
          <div className="text-xl font-bold text-dark-green mb-4">Narasi Fase Pagi</div>
          <div className="text-lg text-gray-800 mb-4">{narratives[0].isiBacaan}</div>
          <button
            onClick={() => setShowNarrative(false)}
            className="bg-yellow text-dark-red font-bold py-2 px-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >Lanjutkan</button>
        </div>
      ) : null}
      {/* ...existing code... */}
      {!showNarrative && (
        <div className="flex flex-col items-center justify-center relative" style={{ height: "calc(100vh - 100px)" }}>
          <div className="relative">
            <img src="/assets/images/icons/morning-phase.png" alt="Morning Phase" className="w-auto h-auto max-w-lg max-h-96 object-contain" />
            <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateY(40px)" }}>
              <h1 className="text-white text-5xl font-bold font-poppins text-center">Fase Siang</h1>
            </div>
          </div>
        </div>
      )}
    </Background>
  );
};

export default MorningPhasePage;
