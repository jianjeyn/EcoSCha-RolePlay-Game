import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const CountdownPage = () => {
  const [count, setCount] = useState(3);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          // Navigate to choose topic page after countdown
          setTimeout(() => {
            navigate("/choose-topic-card");
          }, 1000);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  useEffect(() => {
    // Animation effect for each number
    setIsVisible(false);
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, [count]);

  const getCountdownImage = () => {
    switch (count) {
      case 3:
        return "/assets/images/icons/3.png";
      case 2:
        return "/assets/images/icons/2.png";
      case 1:
        return "/assets/images/icons/1.png";
      default:
        return null;
    }
  };

  return (
    <Background>
      <Header />

      {/* Countdown Display */}
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        {count > 0 && (
          <div
            className={`transition-all duration-300 transform ${
              isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            <img
              src={getCountdownImage()}
              alt={`Countdown ${count}`}
              className="w-64 h-64 object-contain animate-pulse"
            />
          </div>
        )}

        {count === 0 && (
          <div className="text-center">
            <div className="text-6xl font-bold text-yellow animate-bounce">
              START!
            </div>
          </div>
        )}
      </div>
    </Background>
  );
};

export default CountdownPage;
