// RoleExplanationRoomPage - Update import dan component
import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Background from "../components/common/Background";
import Footer from "../components/common/Footer";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


const RoleExplanationRoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const characterParam = params.get("character") || params.get("role") || localStorage.getItem("character") || "";

  const sessionId = params.get("sessionId") || localStorage.getItem("sessionId");
  const userId = localStorage.getItem("userId");
  const [profile, setProfile] = useState(null);
  const [mainCharacter, setMainCharacter] = useState(null);
  const [otherCharacters, setOtherCharacters] = useState([]);
  const [generatedCode, setGeneratedCode] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [inputRoomCode, setInputRoomCode] = useState("");

  useEffect(() => {
    // Jika ada param character, ambil data karakter langsung
    if (characterParam) {
      // Mapping param ke nama karakter spesifik
      let targetName = "";
      if (characterParam === "waste_manager") targetName = "Pak Harsa";
      else if (characterParam === "sustainability_guide") targetName = "Kang Alam";
      else if (characterParam === "asep_eco_citizen") targetName = "Asep";
      else if (characterParam === "ibu_eneng_eco_citizen") targetName = "Ibu Eneng";
      else if (characterParam === "kang_raka_green_guardian") targetName = "Kang Raka";
      else if (characterParam === "teh_rani_green_guardian") targetName = "Teh Rani";
      else if (characterParam === "mang_karwa_waste_villain") targetName = "Mang Karwa";
      else if (characterParam === "yana_waste_villain") targetName = "Yana";
      // Fallback: ambil kata pertama dari param
      else targetName = characterParam.split('_')[0];

      axios.get(`${process.env.REACT_APP_API_URL}/api/characters`).then(charRes => {
        const allCharacters = charRes.data;
        // Cari karakter dengan name persis (case-insensitive)
        const foundChar = allCharacters.find(c => c.name.toLowerCase() === targetName.toLowerCase());
        setMainCharacter(foundChar);
        setOtherCharacters(allCharacters.filter(c => c !== foundChar));
      });
      return;
    }
    // Jika tidak ada param character, fallback ke session
    if (sessionId && userId) {
      const token = localStorage.getItem("token");
      axios.get(`${process.env.REACT_APP_API_URL}/api/gameSession/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        const session = res.data;
        const player = session.players.find(p => p.userId._id === userId);
        axios.get(`${process.env.REACT_APP_API_URL}/api/characters`).then(charRes => {
          const allCharacters = charRes.data;
          const userCharacter = allCharacters.find(c => c._id === player.characterId);
          setProfile({
            ...player,
            character: userCharacter,
            characterList: allCharacters
          });
          setOtherCharacters(allCharacters.filter(c => c._id !== player.characterId));
        });
      });
    }
  }, [characterParam, sessionId, userId]);

  const generateNewCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCode(result);
    setRoomCode(result);
  };

  const handleSubmitRoomCode = (e) => {
    e.preventDefault();
    setRoomCode(inputRoomCode);
    navigate("/leaderboard");
  };

  const handleStartGame = () => {
    navigate("/leaderboard");
  };

  const RoleCard = ({ character }) => {
    if (!character) return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-xl font-bold text-red-700 mb-2">Karakter tidak ditemukan</div>
        <div className="text-gray-600">Pastikan param dan data karakter di database sudah benar.</div>
      </div>
    );
    return (
      <div className="flex justify-center">
        <div className="relative inline-block">
          {/* Card Background */}
          <img
            src="/assets/images/backgrounds/card-bg.png"
            alt="Card Background"
            className="w-auto h-auto max-w-xs rounded-2xl"
          />
          {/* Role Image Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: "translate(-4px, -4px)" }}
          >
            <img
              src={character.cardImage}
              alt={character.name}
              className="w-auto h-auto max-w-[90%] max-h-[90%] object-contain rounded-2xl"
            />
          </div>
        </div>
      </div>
    );
  };

  const RoleDescription = () => {
    return (
      <div className="w-full" style={{ marginLeft: "-5%" }}>
        <img
          src="/assets/images/icons/moderator-role-desc.png"
          alt="Role Description"
          className="w-full h-auto rounded-xl mx-auto"
        />
      </div>
    );
  };

  return (
    <Background>
      <Header />
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <section className="mb-8">
          <div className="text-center">
            <div className="text-white font-bold py-4 px-8 rounded-2xl shadow-lg inline-block" style={{ backgroundColor: "#F0BE01" }}>
              <h1 className="text-2xl font-poppins">PERANMU ADALAH...</h1>
            </div>
          </div>
        </section>
        {/* Karakter utama user di atas */}
        {(mainCharacter || profile?.character) ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-1 mb-8">
            <div className="lg:col-span-2">
              <RoleCard character={mainCharacter || profile.character} />
            </div>
            <div className="lg:col-span-3 space-y-10">
              <div className="w-full" style={{ marginLeft: "-5%" }}>
                <img src="/assets/images/icons/moderator-role-desc.png" alt="Role Description" className="w-4/5 h-auto rounded-xl mx-auto" />
              </div>
              {/* Room code section hanya untuk moderator jika dari session */}
              {profile?.user?.roleId === "sustainability_guide" ? (
                <div className="flex items-center justify-center">
                  <button
                    onClick={generateNewCode}
                    className="text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 font-poppins"
                    style={{ backgroundColor: "#982827" }}
                    onMouseEnter={e => (e.target.style.backgroundColor = "#7a1f1e")}
                    onMouseLeave={e => (e.target.style.backgroundColor = "#982827")}
                  >
                    GENERATE KODE ROOM
                  </button>
                  {generatedCode && (
                    <div className="ml-4 bg-gray-100 rounded-xl p-6 shadow-lg">
                      <span className="text-3xl font-bold text-gray-800 tracking-wider font-poppins">{generatedCode}</span>
                    </div>
                  )}
                  {/* Tombol mulai game untuk moderator */}
                  <button
                    onClick={handleStartGame}
                    className="ml-4 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 font-poppins"
                    style={{ backgroundColor: "#1e40af" }}
                  >
                    MULAI GAME
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {/* Section khusus penjelasan kartu lain (tanpa input/output kode room) */}
        <section className="mt-12">
          <div className="text-center mb-8">
            <div className="text-white font-bold py-4 px-8 rounded-2xl shadow-lg inline-block" style={{ backgroundColor: "#F0BE01" }}>
              <h1 className="text-2xl font-poppins">PERAN LAIN</h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherCharacters.map((character, index) => (
              <div key={index} className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6">
                <RoleCard character={character} />
                <div className="mt-4 w-full">
                  <div className="font-bold text-lg text-gray-800 text-center mb-2">{character.displayName || character.name}</div>
                  <div className="text-gray-700 text-center mb-2"><strong>Role:</strong> {character.roleType}</div>
                  <div className="text-gray-700 text-center mb-2"><strong>Deskripsi:</strong> {character.description || character.desc || "Deskripsi tidak tersedia"}</div>
                  {character.abilities && character.abilities.length > 0 && (
                    <div className="text-gray-700 text-center mt-2">
                      <strong>Abilities:</strong>
                      <ul className="list-disc list-inside mt-2">
                        {character.abilities.map((ability, idx) => (
                          <li key={idx}>{ability.name}: {ability.description}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Generated Code Feedback */}
        {generatedCode && (
          <div className="mt-6 text-center">
            <div className="bg-white rounded-xl p-4 shadow-lg inline-block">
              <p className="text-lg text-gray-800 font-poppins">
                Kode baru: <span className="font-bold text-green-600">{generatedCode}</span>
              </p>
            </div>
          </div>
        )}
      <Footer />
      </main>
      <Footer />
    </Background>
  );
};

export default RoleExplanationRoomPage;
