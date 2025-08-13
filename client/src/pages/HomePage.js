import Header from "../components/common/Header";
import Background from "../components/common/Background";

const HomePage = () => {
  // Character roles data
  const characterRoles = [
    {
      id: 1,
      name: "pak harsa",
      description:
        "Bertanggung jawab mengelola dan mengidentifikasi masalah sampah",
      image: "/assets/images/cards/waste-manager.png",
      role: "WASTE MANAGER",
    },
    {
      id: 2,
      name: "raka",
      description: "Pemandu yang mengarahkan diskusi dan solusi berkelanjutan",
      image: "/assets/images/cards/sustainability-guide.png",
      role: "SUSTAINABILITY GUIDE",
    },
    {
      id: 3,
      name: "asep",
      description:
        "Warga peduli lingkungan yang aktif dalam aksi pro-lingkungan",
      image: "/assets/images/cards/asep-eco-citizen.png",
      role: "ECO CITIZEN",
    },
    {
      id: 4,
      name: "ibu eneng",
      description:
        "Warga peduli lingkungan yang aktif dalam aksi pro-lingkungan",
      image: "/assets/images/cards/ibu-eneng-eco-citizen.png",
      role: "ECO CITIZEN",
    },
    {
      id: 5,
      name: "kang raka",
      description:
        "Penjaga lingkungan yang melindungi ekosistem dari kerusakan",
      image: "/assets/images/cards/kang-raka-green-guardian.png",
      role: "GREEN GUARDIAN",
    },
    {
      id: 6,
      name: "teh rani",
      description:
        "Penjaga lingkungan yang melindungi ekosistem dari kerusakan",
      image: "/assets/images/cards/teh-rani-green-guardian.png",
      role: "GREEN GUARDIAN",
    },
    {
      id: 7,
      name: "yana",
      description: "Karakter yang merusak lingkungan secara diam-diam",
      image: "/assets/images/cards/yana-waste-villain.png",
      role: "WASTE VILLAIN",
    },
    {
      id: 8,
      name: "mang karwa",
      description: "Karakter yang merusak lingkungan secara diam-diam",
      image: "/assets/images/cards/mang-karwa-waste-villain.png",
      role: "WASTE VILLAIN",
    },
  ];

  const CharacterCard = ({ character }) => (
    <div className="transform hover:scale-105 transition-transform duration-300">
      <img
        src={character.image || "/placeholder.svg"}
        alt={character.name}
        className="w-full h-auto rounded-lg shadow-lg"
      />
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
              {/* First row - 4 characters */}
              <div className="grid grid-cols-4 gap-4 w-full">
                {characterRoles.slice(0, 4).map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>

              {/* Second row - 4 characters */}
              <div className="grid grid-cols-4 gap-4 w-full">
                {characterRoles.slice(4, 8).map((character) => (
                  <CharacterCard key={character.id} character={character} />
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

            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-4">📰</div>
                <p>Berita akan ditampilkan di sini</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      </Background>
  );
};

export default HomePage;
