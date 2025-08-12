import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChooseTopicCardPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const cards = [
    { id: 1, number: '1', topic: 'UDARA', image: 'card1.png', route: '/question/FirstTopicPage' },
    { id: 2, number: '2', topic: 'HUTAN', image: 'card2.png', route: '/question/SecondTopicPage' },
    { id: 3, number: '3', topic: 'AIR', image: 'card3.png', route: '/question/ThirdTopicPage' },
    { id: 4, number: '4', topic: 'SAMPAH', image: 'card4.png', route: '/question/FourthTopicPage' },
    { id: 5, number: '5', topic: 'UDARA', image: 'card5.png', route: '/question/FifthTopicPage' },
    { id: 6, number: '6', topic: 'UDARA', image: 'card6.png', route: '/question/SixthTopicPage' },
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card.id);
    
    // Navigate to specific topic page
    setTimeout(() => {
      navigate(card.route);
    }, 500); // Small delay to show selection animation
  };

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
      <main className="relative z-10 max-w-3xl mx-auto px-12 py-12">
        {/* Content Container */}
        <div className="bg-light-gray rounded-3xl shadow-2xl p-10">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="bg-yellow text-white font-bold py-2 px-4 rounded-2xl shadow-lg inline-block text-lg">
              PILIH SALAH SATU KARTU PERTANYAAN
            </div>
          </div>

          {/* Cards Grid */}
          <div className="max-w-sm mx-auto">
            {/* Top Row - 3 cards shifted left */}
            <div className="grid grid-cols-3 gap-8 mb-3 -ml-[15%]">
              {cards.slice(0, 3).map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className={`transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                    selectedCard === card.id ? 'ring-4 ring-yellow scale-105' : ''
                  } rounded-lg overflow-hidden`}
                >
                  <img
                    src={`/assets/images/topic-card/${card.image}`}
                    alt={`Card ${card.number} - ${card.topic}`}
                    className="w-full h-auto object-contain"
                  />
                </button>
              ))}
            </div>
            
            {/* Bottom Row - 3 cards shifted right */}
            <div className="grid grid-cols-3 gap-8 -mr-[15%]">
              {cards.slice(3, 6).map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className={`transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                    selectedCard === card.id ? 'ring-4 ring-yellow scale-105' : ''
                  } rounded-lg overflow-hidden`}
                >
                  <img
                    src={`/assets/images/topic-card/${card.image}`}
                    alt={`Card ${card.number} - ${card.topic}`}
                    className="w-full h-auto object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChooseTopicCardPage;