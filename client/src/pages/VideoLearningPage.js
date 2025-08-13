import React from "react";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const VideoLearningPage = () => {
  return (
    <Background>
      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
        {/* Instruction Image */}
        <div className="mb-3 max-w-3xl w-full">
          <img
            src="/assets/images/icons/vid-instruction.png"
            alt="Video Learning Instruction"
            className="w-full h-auto rounded-3xl"
          />
        </div>

        {/* Video Thumbnail Only */}
        <div className="max-w-xl w-full">
          <img
            src="/assets/images/backgrounds/video-thumbnail.png"
            alt="Video Thumbnail"
            className="w-full h-auto rounded-2xl"
            onError={(e) => {
              e.target.src = "/assets/images/placeholder-video.png";
            }}
          />
        </div>
      </main>
    </Background>
  );
};

export default VideoLearningPage;
