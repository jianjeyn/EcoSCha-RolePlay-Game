import React, { useState } from "react";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const ModeratorNightPhasePage = () => {
  const [currentNight, setCurrentNight] = useState(1);
  const [currentStep, setCurrentStep] = useState(1); // Step 1: Deskripsi, Step 2: Instruksi

  const nightData = {
    1: {
      title: "MALAM 1",
      descriptionImage: "/assets/images/icons/nightphase-desc1.png",
      instructionsImage: "/assets/images/icons/nightphase-desc2.png",
    },
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      // Pindah ke step 2 (instruksi)
      setCurrentStep(2);
    } else {
      // Pindah ke malam berikutnya atau fase berikutnya
      if (currentNight < Object.keys(nightData).length) {
        setCurrentNight(currentNight + 1);
        setCurrentStep(1);
      } else {
        // Navigate to next phase
        console.log("Navigate to day phase");
      }
    }
  };

  return (
    <Background>
      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        {/* Phase Title */}
        <div className="text-center mb-8 relative">
          {/* Background Image */}
          <div
            className="inline-block transform scale-150"
            style={{
              backgroundImage:
                "url(/assets/images/icons/moderator-night-phase.png)",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "300px",
              height: "80px",
            }}
          ></div>

          {/* Text Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              top: "50%",
              transform: "scale(0.67)",
            }}
          >
            <span className="text-white font-bold text-4xl">Fase Malam</span>
          </div>
        </div>

        {/* Content Image with Badge */}
        <div className="text-center mb-8 relative">
          {/* Content Image */}
          <img
            src={
              currentStep === 1
                ? nightData[currentNight].descriptionImage
                : nightData[currentNight].instructionsImage
            }
            alt={currentStep === 1 ? "Night Description" : "Night Instructions"}
            className="w-full max-w-4xl h-auto rounded-3xl mx-auto"
          />

          {/* Night Number Badge - positioned inside image at top-left */}
          <div className="absolute z-10" style={{ top: "10%", left: "4%" }}>
            <div className="bg-yellow text-white font-bold py-2 px-6 rounded-2xl shadow-lg text-lg">
              {nightData[currentNight].title}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            className="text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
            style={{
              backgroundColor: "#982827",
              fontFamily: "Nunito, sans-serif",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#7a1f1e")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#982827")}
          >
            LANJUTKAN
          </button>
        </div>
      </main>
    </Background>
  );
};

export default ModeratorNightPhasePage;
