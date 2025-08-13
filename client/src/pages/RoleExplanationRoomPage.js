// RoleExplanationRoomPage - Update import dan component
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const RoleExplanationRoomPage = () => {
  const { playerId } = useParams();
  const [roomCode, setRoomCode] = useState("A3HJGF89");
  const [generatedCode, setGeneratedCode] = useState("");
  const [currentPlayerRole, setCurrentPlayerRole] = useState("ECO CITIZEN1");

  useEffect(() => {
    // Get player ID from localStorage
    const playerIdFromUrl = playerId || localStorage.getItem("playerId") || 1;

    // Map player ID to role
    const playerRoleMap = {
      1: "ECO CITIZEN2", // Asep
      2: "ECO CITIZEN1", // Ibu Eneng
      3: "GREEN GUARDIAN1", // Kang Raka
      4: "GREEN GUARDIAN2", // Teh Rani
      5: "WASTE VILLAIN2", // Mang Karwa
      6: "WASTE VILLAIN1", // Yana
      7: "WASTE MANAGER", // Waste Manager
    };

    localStorage.setItem("playerId", playerIdFromUrl);
    setCurrentPlayerRole(
      playerRoleMap[parseInt(playerIdFromUrl)] || "ECO CITIZEN1"
    );
  }, [playerId]);

  const generateNewCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCode(result);
    setRoomCode(result);
  };

  const RoleCard = ({ role }) => {
    const roleData = {
      "ECO CITIZEN1": {
        image: "/assets/images/cards/ibu-eneng-eco-citizen.png",
      },
      "ECO CITIZEN2": {
        image: "/assets/images/cards/asep-eco-citizen.png",
      },
      "WASTE MANAGER": {
        image: "/assets/images/cards/waste-manager.png",
      },
      "GREEN GUARDIAN1": {
        image: "/assets/images/cards/kang-raka-green-guardian.png",
      },
      "GREEN GUARDIAN2": {
        image: "/assets/images/cards/teh-rani-green-guardian.png",
      },
      "WASTE VILLAIN1": {
        image: "/assets/images/cards/yana-waste-villain.png",
      },
      "WASTE VILLAIN2": {
        image: "/assets/images/cards/mang-karwa-waste-villain.png",
      },
    };

    const data = roleData[role] || roleData["ECO CITIZEN1"];

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
              src={data.image}
              alt={role}
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

  const roles = [
    "ECO CITIZEN1",
    "ECO CITIZEN2",
    "WASTE MANAGER",
    "GREEN GUARDIAN1",
    "GREEN GUARDIAN2",
    "WASTE VILLAIN1",
    "WASTE VILLAIN2",
  ];

  // Filter out current player role from "other roles" list
  const otherRoles = roles.filter((role) => role !== currentPlayerRole);

  return (
    <Background>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Phase Header */}
        <section className="mb-8">
          <div className="text-center">
            <div
              className="text-white font-bold py-4 px-8 rounded-2xl shadow-lg inline-block"
              style={{ backgroundColor: "#F0BE01" }}
            >
              <h1 className="text-2xl font-poppins">PERANMU ADALAH...</h1>
            </div>
          </div>
        </section>

        {/* Role Cards Grid */}
        <div className="space-y-8">
          {/* Current Player Role Card */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-1">
            {/* Left Column: Role Card - Takes 2 columns */}
            <div className="lg:col-span-2">
              <RoleCard role={currentPlayerRole} />
            </div>

            {/* Right Column: Role Description - Takes 3 columns */}
            <div className="lg:col-span-3 space-y-10">
              <RoleDescriptionSmall />
              {/* Room Code and Generate Button */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Room Code Display */}
                <div className="text-center ml-8">
                  <div className="bg-gray-100 rounded-xl p-6 shadow-lg w-full">
                    <span className="text-3xl font-bold text-gray-800 tracking-wider font-poppins">
                      {roomCode}
                    </span>
                  </div>
                </div>

                {/* Generate Code Button */}
                <div className="flex items-center justify-center -ml-4">
                  <button
                    onClick={generateNewCode}
                    className="text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 font-poppins"
                    style={{
                      backgroundColor: "#982827",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#7a1f1e")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#982827")
                    }
                  >
                    MASUKKAN
                    <br />
                    KODE
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Peran Lain Button */}
          <div className="text-center mb-8">
            <div
              className="text-white font-bold py-4 px-8 rounded-2xl shadow-lg inline-block"
              style={{ backgroundColor: "#F0BE01" }}
            >
              <h1 className="text-2xl font-poppins">PERAN LAIN</h1>
            </div>
          </div>

          {/* Other Role Cards (excluding current player role) */}
          {otherRoles.map((role, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6"
            >
              {/* Left Column: Role Card - Takes 2 columns */}
              <div className="lg:col-span-2">
                <RoleCard role={role} />
              </div>

              {/* Right Column: Role Description - Takes 3 columns */}
              <div className="lg:col-span-3">
                <RoleDescription />
              </div>
            </div>
          ))}
        </div>

        {/* Generated Code Feedback */}
        {generatedCode && (
          <div className="mt-6 text-center">
            <div className="bg-white rounded-xl p-4 shadow-lg inline-block">
              <p className="text-lg text-gray-800 font-poppins">
                Kode baru:{" "}
                <span className="font-bold text-green-600">
                  {generatedCode}
                </span>
              </p>
            </div>
          </div>
        )}
      </main>
    </Background>
  );
};

export default RoleExplanationRoomPage;
