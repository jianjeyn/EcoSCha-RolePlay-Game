import React from "react";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const WaitingNarrativePage = () => {
  return (
    <Background>
      <Header />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="mb-8">
          <h1 className="text-white text-4xl font-bold font-poppins text-center tracking-wide">
            Menunggu moderator membacakan narasi...
          </h1>
        </div>
        <div className="text-center">
          <img src="/assets/images/icons/vid-instruction.png" alt="Menunggu" className="w-40 h-40 mx-auto mb-6 animate-bounce" />
          <p className="text-lg text-gray-200 font-poppins">Narasi akan segera dimulai. Silakan tunggu instruksi dari moderator.</p>
        </div>
      </main>
    </Background>
  );
};

export default WaitingNarrativePage;
