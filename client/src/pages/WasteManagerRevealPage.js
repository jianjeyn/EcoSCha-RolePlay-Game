import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const WasteManagerRevealPage = () => {
  const location = useLocation();
  const selectedPlayerFromState = location.state?.selectedPlayer;

  const [revealedPlayer, setRevealedPlayer] = useState({
    name: selectedPlayerFromState?.name || "Player 1",
    role: "ECO CITIZEN", // This could be randomized or determined by game logic
    image: "/assets/images/cards/eco-citizen.png",
  });
  const [isFlipped, setIsFlipped] = useState(false);

  // Role mapping for different players
  const roleMapping = {
    1: {
      role: "ECO CITIZEN",
      image: "/assets/images/cards/ibu-eneng-eco-citizen.png",
    },
    2: {
      role: "ECO-CITIZEN",
      image: "/assets/images/cards/asep-eco-citizen.png",
    },
    3: {
      role: "WASTE-VILLAIN",
      image: "/assets/images/cards/yana-waste-villain.png",
    },
    4: {
      role: "WASTE-VILLAIN",
      image: "/assets/images/cards/mang-karwa-waste-villain.png",
    },
    5: {
      role: "GREEN-GUARDIAN",
      image: "/assets/images/cards/kang-raka-green-guardian.png",
    },
    6: {
      role: "GREEN-GUARDIAN",
      image: "/assets/images/cards/teh-rani-green-guardian.png",
    },
  };

  useEffect(() => {
    // Set player data based on selected player
    if (selectedPlayerFromState) {
      const playerRole =
        roleMapping[selectedPlayerFromState.id] || roleMapping[1];
      setRevealedPlayer({
        name: selectedPlayerFromState.name,
        role: playerRole.role,
        image: playerRole.image,
      });
    }

    // Start flip animation after component mounts
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedPlayerFromState]);

  const handleOK = () => {
    // Navigate back or to next phase
    console.log("Role revealed, continue game");
    // You could navigate back to the night phase or continue the game flow
  };

  return (
    <Background>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        {/* Title Banner */}
        <div className="bg-yellow text-white font-bold py-4 px-8 rounded-2xl shadow-lg mb-8 text-xl font-poppins">
          PERAN {revealedPlayer.name.toUpperCase()} ADALAH...
        </div>

        {/* Flip Card Container */}
        <div
          className="relative inline-block mb-8"
          style={{ perspective: "1000px" }}
        >
          <div
            className={`relative transition-transform duration-1000 transform-style-preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
              width: "max-content",
              height: "max-content",
            }}
          >
            {/* Card Back (initially visible) */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src="/assets/images/backgrounds/card-back.png"
                alt="Card Back"
                className="w-auto h-auto max-w-xs"
                onError={(e) => {
                  e.target.src = "/assets/images/backgrounds/card-bg.png";
                }}
              />
            </div>

            {/* Card Front (role card) */}
            <div
              className="backface-hidden rotate-y-180"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="relative inline-block">
                {/* Card Background */}
                <img
                  src="/assets/images/backgrounds/card-bg.png"
                  alt="Card Background"
                  className="w-auto h-auto max-w-xs"
                />
                {/* Character Image Overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: "translate(-4px, -4px)" }}
                >
                  <img
                    src={revealedPlayer.image}
                    alt={revealedPlayer.role}
                    className="w-auto h-auto max-w-[88%] max-h-[88%] object-contain rounded-xl"
                    onError={(e) => {
                      e.target.src = "/assets/images/placeholder-character.png";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OK Button - Only show after flip is complete
        {isFlipped && (
          <div className="text-center animate-fade-in">
            <button
              onClick={handleOK}
              className="text-white font-bold py-4 px-12 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 text-xl font-poppins"
              style={{ 
                backgroundColor: '#982827',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#7a1f1e'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#982827'}
            >
              OK
            </button>
          </div>
        )} */}
      </main>
    </Background>
  );
};

export default WasteManagerRevealPage;
