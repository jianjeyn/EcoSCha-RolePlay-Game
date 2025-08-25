import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const VotingPage = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [timer, setTimer] = useState("05:00");
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [narratives, setNarratives] = useState([]);
  const [showNarrative, setShowNarrative] = useState(true);
  useEffect(() => {
    // Ambil data user dari backend
    axios.get("http://localhost:3000/api/users")
      .then(res => {
        setPlayers(res.data.filter(u => u.isAlive !== false));
        setLoading(false);
      })
      .catch(() => setLoading(false));
    // Ambil narasi voting
    axios.get("http://localhost:3000/api/narratives?phase=voting")
      .then(res => setNarratives(res.data))
      .catch(() => {});
  }, []);

  const handlePlayerSelect = (playerId) => {
// ...existing code...
              >
                OK
              </button>
            </div>
          </>
        )}
      </main>
    </Background>
  );

        {/* Players Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {players.map((player) => {
            // Determine player color based on ID
            let playerColor = "#982827"; // Default red
            let hoverColor = "hover:bg-red-700";

            if (player.id === 2 || player.id === 7) {
              playerColor = "#ffa722"; // Orange
              hoverColor = "hover:bg-orange-600";
            } else if (player.id === 3 || player.id === 6) {
              playerColor = "#5f5e2c"; // Olive
              hoverColor = "hover:bg-olive-600";
            } else if (player.id === 4 || player.id === 5) {
              playerColor = "#744d26"; // Brown
              hoverColor = "hover:bg-brown-600";
            }

            return (
              <button
                key={player.id}
                onClick={() => handlePlayerSelect(player.id)}
                className={`
                  font-bold py-8 px-3 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 text-white text-lg
                  ${
                    selectedPlayer === player.id
                      ? "ring-4 ring-yellow-400 scale-105"
                      : ""
                  }
                  ${hoverColor}
                `}
                style={{
                  backgroundColor: playerColor,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {player.name}
              </button>
            );
          })}
        </div>

        {/* OK Button */}
        <div className="text-center">
          <button
            onClick={handleConfirm}
            disabled={!selectedPlayer}
            className={`
              text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105
              ${
                selectedPlayer
                  ? "hover:bg-red-700"
                  : "opacity-50 cursor-not-allowed"
              }
            `}
            style={{
              backgroundColor: "#982827",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            OK
          </button>
        </div>
      </main>
    </Background>
  );
};

export default VotingPage;
