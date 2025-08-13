import React from "react";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const NightPhasePage = () => {
  return (
    <Background>
      <Header />

      {/* Night Phase Content */}
      <div
        className="flex flex-col items-center justify-center relative"
        style={{ height: "calc(100vh - 100px)" }}
      >
        {/* Night Phase Image */}
        <div className="relative">
          <img
            src="/assets/images/icons/nightphase.png"
            alt="Night Phase"
            className="w-auto h-auto max-w-lg max-h-96 object-contain"
          />

          {/* Phase Title Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: "translateY(40px)" }}
          >
            <h1 className="text-white text-5xl font-bold font-poppins text-center">
              Fase Malam
            </h1>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default NightPhasePage;
