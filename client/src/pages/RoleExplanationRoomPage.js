// RoleExplanationRoomPage - Update import dan component
import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Background from "../components/common/Background";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


const RoleExplanationRoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Ambil role dari query param
  const params = new URLSearchParams(location.search);
  const roleId = params.get("role") || localStorage.getItem("roleId") || "eco_citizen";
  const [profile, setProfile] = useState(null);
  const [roomCode, setRoomCode] = useState("");
  const [inputRoomCode, setInputRoomCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    // Fetch user profile
    axios.get("http://localhost:3000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const userProfile = res.data;
      // Fetch all characters
      axios.get("http://localhost:3000/api/characters")
        .then(charRes => {
          // Find user's character by roleId from query/localStorage
          const userCharacter = charRes.data.find(c => c.roleType === roleId);
          userProfile.character = userCharacter;
          userProfile.characterList = charRes.data;
          setProfile(userProfile);
        });
    });
  }, [roleId]);

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

  const RoleCard = ({ character }) => (
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

  const RoleDescriptionSmall = () => {
    return (
      <div className="w-full" style={{ marginLeft: "-5%" }}>
        <img
          src="/assets/images/icons/moderator-role-desc.png"
          alt="Role Description"
          className="w-4/5 h-auto rounded-xl mx-auto"
        />
      </div>
    );
  };

  // Ambil karakter lain dari database (selain karakter utama user)
  const otherCharacters = profile?.characterList?.filter(c => c.roleId !== profile?.character?.roleId) || [];

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
        {profile?.character && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-1 mb-8">
            <div className="lg:col-span-2">
              <RoleCard character={profile.character} />
            </div>
            <div className="lg:col-span-3 space-y-10">
              <div className="w-full" style={{ marginLeft: "-5%" }}>
                <img src="/assets/images/icons/moderator-role-desc.png" alt="Role Description" className="w-4/5 h-auto rounded-xl mx-auto" />
              </div>
              {/* Room code section */}
              {profile.user.roleId === "sustainability_guide" ? (
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
              ) : (
                <form onSubmit={handleSubmitRoomCode} className="flex items-center justify-center">
                  <input
                    type="text"
                    value={inputRoomCode}
                    onChange={e => setInputRoomCode(e.target.value)}
                    placeholder="Masukkan kode room dari moderator"
                    className="px-6 py-4 bg-gray-200 rounded-2xl border-none outline-none text-gray-700 placeholder-gray-500 text-lg focus:bg-gray-100 transition-colors duration-200 mr-4"
                  />
                  <button
                    type="submit"
                    className="text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 font-poppins"
                    style={{ backgroundColor: "#982827" }}
                  >
                    MASUK ROOM
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
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
      </main>
    </Background>
  );
};

export default RoleExplanationRoomPage;
