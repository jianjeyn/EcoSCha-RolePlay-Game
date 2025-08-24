
import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Background from "../components/common/Background";
import Modal from "../components/common/Modal";
import axios from "axios";

const HomePage = () => {
  const [characterRoles, setCharacterRoles] = useState([]);
  const [news, setNews] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/characters")
      .then(res => setCharacterRoles(res.data));
    axios.get("http://localhost:3000/api/learning-materials/latest")
      .then(res => setNews(res.data));
  }, []);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCharacter(null);
  };

  const CharacterCard = ({ character }) => (
    <div className="transform hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => handleCharacterClick(character)}>
      <img
        src={character.cardImage || character.image || "/placeholder.svg"}
        alt={character.displayName || character.name}
        className="w-full h-auto rounded-lg shadow-lg"
      />
      <div className="mt-2 text-center font-bold text-gray-700">{character.displayName || character.name}</div>
    </div>
  );

  return (
    <Background>
      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 pb-24">
        {/* Game Description Section */}
        <section className="mb-8">
          <div className="flex justify-center">
            <img
              src="/assets/images/icons/game-desc.png"
              alt="EcoSCha Game Description"
              className="w-full max-w-6xl h-auto rounded-2xl"
            />
          </div>
        </section>

        {/* Character Roles Section */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <button
                className="text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:brightness-110"
                style={{ backgroundColor: "#F0BE01" }}
              >
                DAFTAR PERAN
              </button>
            </div>

            {/* Character roles in 2 rows of 4 */}
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 w-full">
                {characterRoles.slice(0, 4).map((character) => (
                  <CharacterCard key={character._id || character.id} character={character} />
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4 w-full">
                {characterRoles.slice(4, 8).map((character) => (
                  <CharacterCard key={character._id || character.id} character={character} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <button
                className="text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:brightness-110"
                style={{ backgroundColor: "#F0BE01" }}
              >
                BERITA HARI INI
              </button>
            </div>
            <ul className="divide-y divide-gray-200">
              {news.length === 0 && (
                <li className="py-6 text-center text-gray-400">Belum ada berita/video terbaru</li>
              )}
              {news.map((item, idx) => (
                <li key={item._id || idx} className="py-4 flex items-center justify-between">
                  <span className="font-semibold text-gray-800">{item.title}</span>
                  <a
                    href={item.type === "article" ? item.originalUrl : item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                  >
                    Baca/Watch
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      {/* Character Modal */}
      <Modal isOpen={showModal} onClose={closeModal} title={selectedCharacter?.displayName || selectedCharacter?.name} size="md">
        {selectedCharacter && (
          <div className="space-y-4">
            {selectedCharacter.cardImage && (
              <img src={selectedCharacter.cardImage} alt={selectedCharacter.displayName} className="w-full max-w-xs mx-auto rounded-xl" />
            )}
            <div>
              <strong>Role:</strong> {selectedCharacter.roleType}
            </div>
            <div>
              <strong>Deskripsi:</strong> {selectedCharacter.description}
            </div>
            {selectedCharacter.abilities && selectedCharacter.abilities.length > 0 && (
              <div>
                <strong>Abilities:</strong>
                <ul className="list-disc list-inside mt-2">
                  {selectedCharacter.abilities.map((ability, idx) => (
                    <li key={idx}>{ability.name}: {ability.description}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>
      </main>
      </Background>
  );
};

export default HomePage;
