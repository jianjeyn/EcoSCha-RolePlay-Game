import React from 'react';

const VideoLearningPage = () => {
  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url(/assets/images/backgrounds/signup-bg.png)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Header */}
      <header className="w-full relative">
        <img
          src="/assets/images/navbar/navbar.png"
          alt="EcoSCha Navbar"
          className="w-full h-auto object-cover shadow-lg"
        />
        {/* Hamburger Menu Button */}
        <button className="absolute top-4 right-4 p-2 hover:bg-black/10 rounded-lg transition-colors duration-200 hover:scale-105 transform">
          <img
            src="/assets/images/icons/hamburgerbutton.png"
            alt="Menu"
            className="w-12 h-12 transition-transform duration-200 hover:brightness-110"
          />
        </button>
      </header>

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
              e.target.src = '/assets/images/placeholder-video.png';
            }}
          />
        </div>
      </main>
    </div>
  );
};
export default VideoLearningPage;