import React from 'react';

const Background = ({ children }) => {
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: "#EDFDC1",
        backgroundImage:
          "url(/assets/images/backgrounds/Background_atas.png), url(/assets/images/backgrounds/Background_bawah.png)",
        backgroundPosition: "top center, bottom center",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "100% auto, 100% auto",
      }}
    >
      {children}
    </div>
  );
};

export default Background;