import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const DiscussionSessionPage = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      // Timer finished
      console.log("Discussion session ended");
      navigate("/voting"); // Replace with your desired navigation
    }
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Background>
      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
        {/* Session Title */}
        <div className="mb-12">
          <h1 className="text-white text-6xl font-bold font-poppins text-center tracking-wide">
            SESI DISKUSI
          </h1>
        </div>

        {/* Timer Display */}
        <div
          className="text-white font-bold py-8 px-16 rounded-3xl shadow-2xl text-6xl font-poppins"
          style={{
            backgroundColor: timeLeft <= 60 ? "#dc2626" : "#982827",
            transition: "background-color 0.3s ease",
          }}
        >
          {formatTime(timeLeft)}
        </div>
      </main>
    </Background>
  );
};

export default DiscussionSessionPage;
