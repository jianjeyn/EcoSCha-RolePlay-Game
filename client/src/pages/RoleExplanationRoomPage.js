// RoleExplanationRoomPage - Update import dan component
import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Background from "../components/common/Background";
import Footer from "../components/common/Footer";
import { useNavigate, useLocation } from "react-router-dom";


const RoleExplanationRoomPage = () => {
  // Mapping param ke key karakter
  const paramToKey = {
    "1": "asep_eco_citizen",
    "2": "ibu_eneng_eco_citizen",
    "3": "kang_raka_green_guardian",
    "4": "teh_rani_green_guardian",
    "5": "mang_karwa_waste_villain",
    "6": "yana_waste_villain",
    "7": "waste_manager",
    "8": "sustainability_guide",
    "asep": "asep_eco_citizen",
    "eneng": "ibu_eneng_eco_citizen",
    "raka": "kang_raka_green_guardian",
    "rani": "teh_rani_green_guardian",
    "karwa": "mang_karwa_waste_villain",
    "yana": "yana_waste_villain",
    "harsa": "waste_manager",
    "alam": "sustainability_guide",
    "eco_citizen": "asep_eco_citizen",
    "waste_villain": "mang_karwa_waste_villain",
    "green_guardian": "kang_raka_green_guardian",
    "waste_manager": "waste_manager",
    "sustainability_guide": "sustainability_guide"
  };
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const characterParam = params.get("character") || params.get("role") || localStorage.getItem("character") || "";

  const sessionId = params.get("sessionId") || localStorage.getItem("sessionId");
  const userId = localStorage.getItem("userId");
  const [profile, setProfile] = useState(null);
  const [mainCharacter, setMainCharacter] = useState(null);
  const [otherCharacters, setOtherCharacters] = useState([]);

  // Data karakter manual
  const characterData = [
    {
      key: "asep_eco_citizen",
      name: "Asep",
      displayName: "Asep Eco Citizen",
      roleType: "Eco Citizen",
      cardImage: "/assets/images/cards/asep-eco-citizen.png",
      description: "Asep adalah warga desa yang peduli lingkungan.",
      abilities: [{ name: "Edukasi", description: "Memberi edukasi ke warga lain." }]
    },
    {
      key: "ibu_eneng_eco_citizen",
      name: "Ibu Eneng",
      displayName: "Ibu Eneng Eco Citizen",
      roleType: "Eco Citizen",
      cardImage: "/assets/images/cards/ibu-eneng-eco-citizen.png",
      description: "Ibu Eneng aktif mengajak warga memilah sampah.",
      abilities: [{ name: "Motivasi", description: "Mendorong warga lain untuk ikut memilah." }]
    },
    {
      key: "kang_raka_green_guardian",
      name: "Kang Raka",
      displayName: "Kang Raka Green Guardian",
      roleType: "Green Guardian",
      cardImage: "/assets/images/cards/kang-raka-green-guardian.png",
      description: "Kang Raka menjaga kebersihan desa.",
      abilities: [{ name: "Patroli", description: "Memantau area desa dari sampah liar." }]
    },
    {
      key: "teh_rani_green_guardian",
      name: "Teh Rani",
      displayName: "Teh Rani Green Guardian",
      roleType: "Green Guardian",
      cardImage: "/assets/images/cards/teh-rani-green-guardian.png",
      description: "Teh Rani mengajak anak-anak peduli lingkungan.",
      abilities: [{ name: "Kampanye", description: "Mengadakan kampanye lingkungan." }]
    },
    {
      key: "mang_karwa_waste_villain",
      name: "Mang Karwa",
      displayName: "Mang Karwa Waste Villain",
      roleType: "Waste Villain",
      cardImage: "/assets/images/cards/mang-karwa-waste-villain.png",
      description: "Mang Karwa suka buang sampah sembarangan.",
      abilities: [{ name: "Sabotase", description: "Mengacaukan sistem pengelolaan sampah." }]
    },
    {
      key: "yana_waste_villain",
      name: "Yana",
      displayName: "Yana Waste Villain",
      roleType: "Waste Villain",
      cardImage: "/assets/images/cards/yana-waste-villain.png",
      description: "Yana sering membakar sampah di kebun.",
      abilities: [{ name: "Bakar Sampah", description: "Membakar sampah secara ilegal." }]
    },
    {
      key: "waste_manager",
      name: "Pak Harsa",
      displayName: "Pak Harsa Waste Manager",
      roleType: "Waste Manager",
      cardImage: "/assets/images/cards/waste-manager.png",
      description: "Pak Harsa mengelola TPS desa.",
      abilities: [{ name: "Koordinasi", description: "Mengatur jadwal pengangkutan sampah." }]
    },
    {
      key: "sustainability_guide",
      name: "Kang Alam",
      displayName: "Kang Alam Sustainability Guide",
      roleType: "Sustainability Guide",
      cardImage: "/assets/images/cards/sustainability-guide.png",
      description: "Kang Alam membimbing warga menuju desa lestari.",
      abilities: [{ name: "Bimbingan", description: "Memberi arahan ke semua peran." }]
    }
  ];
  const [generatedCode, setGeneratedCode] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [inputRoomCode, setInputRoomCode] = useState("");

  useEffect(() => {
    // Ambil data karakter dari mapping manual
    if (characterParam) {
      // Mapping param ke key karakter
      const mappedKey = paramToKey[characterParam] || characterParam;
      const foundChar = characterData.find(c => c.key === mappedKey);
      setMainCharacter(foundChar || characterData[0]); // default ke Asep jika tidak ketemu
      setOtherCharacters(characterData.filter(c => c.key !== (foundChar ? foundChar.key : characterData[0].key)));
    }
  }, [characterParam]);

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
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="text-xl font-bold text-red-700 mb-2">Karakter tidak ditemukan</div>
            <div className="text-gray-600">Pastikan param dan data karakter di database sudah benar.</div>
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
      <Footer />
    </Background>
  );
};

export default RoleExplanationRoomPage;