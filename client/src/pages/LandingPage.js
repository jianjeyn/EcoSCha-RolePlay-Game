import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

//id = 1, asep eco citizen
//id = 2, ibu eneng eco citizen
//id = 3, kang raka green guardian
//id = 4, teh rani green guardian
//id = 5, mang karwa waste villain
//id = 6, yana waste villain
//id = 7, waste manager
//id = 8, sustainability guide

const LandingPage = () => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    const playerId = 8; // Default to 1 if not set

    if (parseInt(playerId) === 8) {
      // Player 8 is moderator (Sustainability Guide)
      navigate("/moderator-room");
    } else {
      // Players 1-7 are regular players
      navigate(`/role-explanation-room/${playerId}`);
    }
  };

  return (
    <Background>
      <Header />
      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[80vh] px-4">
        {/* Play Container with Logo */}
        <div className="relative flex justify-center">
          {/* Container Background */}
          <img
            src="/assets/images/container/play-container.png"
            alt="Play Container"
            className="w-auto h-auto max-w-2xl"
          />

          {/* Custom Play Button Overlay */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
            <button onClick={handlePlayClick} className="relative group">
              {/* Button Shadow */}
              <div className="absolute top-1.5 left-0 w-full h-full bg-red-900 rounded-xl"></div>

              {/* Main Button */}
              <div
                className="relative px-8 py-3 text-white font-bold text-lg rounded-xl transition-all duration-200 transform group-hover:translate-y-1 group-active:translate-y-2 flex items-center gap-3 shadow-lg"
                style={{ backgroundColor: "#982827" }}
              >
                {/* Play Icon */}
                <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>

                {/* Text */}
                <span
                  className="font-bold tracking-wide"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  PLAY
                </span>
              </div>
            </button>
          </div>
        </div>
      </main>
    </Background>
  );
};

export default LandingPage;
