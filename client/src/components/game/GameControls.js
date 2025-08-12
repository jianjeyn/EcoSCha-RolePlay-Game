import React, { useState, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import Modal from '../common/Modal';

const GameControls = ({ gameState, onGameAction, onEndGame }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [gameSettings, setGameSettings] = useState({
    soundEnabled: true,
    animationsEnabled: true,
    autoEndTurn: false,
    showHints: true
  });

  const { socket } = useSocket();
  const { user } = useAuth();

  const isHost = user && gameState && user.id === gameState.hostId;
  const currentPlayer = gameState?.players?.find(p => p.id === user?.id);
  const isCurrentTurn = gameState?.currentPlayer === user?.id;

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('ecoscha-game-settings');
    if (savedSettings) {
      setGameSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (setting, value) => {
    const newSettings = { ...gameSettings, [setting]: value };
    setGameSettings(newSettings);
    localStorage.setItem('ecoscha-game-settings', JSON.stringify(newSettings));
  };

  const handlePauseGame = () => {
    if (socket && isHost) {
      socket.emit('pause_game', { gameId: gameState.id });
    }
  };

  const handleResumeGame = () => {
    if (socket && isHost) {
      socket.emit('resume_game', { gameId: gameState.id });
    }
  };

  const handleEndGame = () => {
    if (socket && isHost && window.confirm('Are you sure you want to end the game?')) {
      socket.emit('end_game', { gameId: gameState.id });
      onEndGame?.();
    }
  };

  const handleLeaveGame = () => {
    if (socket && window.confirm('Are you sure you want to leave the game?')) {
      socket.emit('leave_game', { gameId: gameState.id, playerId: user.id });
      onEndGame?.();
    }
  };

  return (
    <>
      {/* Quick Actions Bar */}
      <div className="fixed top-4 right-4 z-40">
        <div className="flex items-center space-x-2">
          {/* Turn Timer */}
          {gameState?.turnTimeRemaining && (
            <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
              gameState.turnTimeRemaining <= 10
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              ⏰ {gameState.turnTimeRemaining}s
            </div>
          )}

          {/* Current Turn Indicator */}
          {isCurrentTurn && (
            <div className="px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
              🎯 Your Turn
            </div>
          )}

          {/* Game Status */}
          {gameState?.status === 'paused' && (
            <div className="px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
              ⏸️ Paused
            </div>
          )}

          {/* Menu Button */}
          <Button
            onClick={() => setShowMenu(true)}
            variant="secondary"
            size="sm"
          >
            ⚙️ Menu
          </Button>
        </div>
      </div>

      {/* Quick Turn Actions (for current player) */}
      {isCurrentTurn && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
          <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-blue-500">
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => onGameAction?.('draw_card')}
                variant="primary"
                size="sm"
              >
                Draw Card
              </Button>
              
              <Button
                onClick={() => onGameAction?.('end_turn')}
                variant="secondary"
                size="sm"
              >
                End Turn
              </Button>
              
              {currentPlayer?.role?.specialAbility?.available && (
                <Button
                  onClick={() => onGameAction?.('use_special_ability')}
                  variant="success"
                  size="sm"
                >
                  Use Ability
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Game Menu Modal */}
      <Modal
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        title="Game Menu"
      >
        <div className="space-y-4">
          {/* Game Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Game Information</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Room: {gameState?.roomName}</div>
              <div>Round: {gameState?.currentRound} of {gameState?.maxRounds}</div>
              <div>Players: {gameState?.players?.length}</div>
              <div>Status: {gameState?.status || 'Active'}</div>
            </div>
          </div>

          {/* Menu Actions */}
          <div className="space-y-2">
            <Button
              onClick={() => {
                setShowSettings(true);
                setShowMenu(false);
              }}
              variant="secondary"
              className="w-full"
            >
              ⚙️ Settings
            </Button>
            
            <Button
              onClick={() => {
                setShowHelp(true);
                setShowMenu(false);
              }}
              variant="secondary"
              className="w-full"
            >
              ❓ Help & Rules
            </Button>

            {/* Host Controls */}
            {isHost && (
              <div className="border-t pt-4 space-y-2">
                <h4 className="font-medium text-gray-700">Host Controls</h4>
                
                {gameState?.status === 'paused' ? (
                  <Button
                    onClick={handleResumeGame}
                    variant="success"
                    className="w-full"
                  >
                    ▶️ Resume Game
                  </Button>
                ) : (
                  <Button
                    onClick={handlePauseGame}
                    variant="secondary"
                    className="w-full"
                  >
                    ⏸️ Pause Game
                  </Button>
                )}
                
                <Button
                  onClick={handleEndGame}
                  variant="danger"
                  className="w-full"
                >
                  🏁 End Game
                </Button>
              </div>
            )}

            {/* Player Actions */}
            <div className="border-t pt-4">
              <Button
                onClick={handleLeaveGame}
                variant="danger"
                className="w-full"
              >
                🚪 Leave Game
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Game Settings"
      >
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Audio & Visual</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-gray-700">Sound Effects</span>
                <input
                  type="checkbox"
                  checked={gameSettings.soundEnabled}
                  onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                  className="rounded"
                />
              </label>
              
              <label className="flex items-center justify-between">
                <span className="text-gray-700">Animations</span>
                <input
                  type="checkbox"
                  checked={gameSettings.animationsEnabled}
                  onChange={(e) => handleSettingChange('animationsEnabled', e.target.checked)}
                  className="rounded"
                />
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Gameplay</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-gray-700">Auto-end turn when done</span>
                <input
                  type="checkbox"
                  checked={gameSettings.autoEndTurn}
                  onChange={(e) => handleSettingChange('autoEndTurn', e.target.checked)}
                  className="rounded"
                />
              </label>
              
              <label className="flex items-center justify-between">
                <span className="text-gray-700">Show gameplay hints</span>
                <input
                  type="checkbox"
                  checked={gameSettings.showHints}
                  onChange={(e) => handleSettingChange('showHints', e.target.checked)}
                  className="rounded"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => setShowSettings(false)}
              variant="primary"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </Modal>

      {/* Help Modal */}
      <Modal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        title="How to Play EcoSCha"
      >
        <div className="space-y-6 max-h-96 overflow-y-auto">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Game Overview</h3>
            <p className="text-gray-600 text-sm">
              EcoSCha is an environmental education role-playing card game where players take on different 
              roles to address environmental challenges and promote sustainable practices.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Basic Rules</h3>
            <ol className="text-gray-600 text-sm space-y-1 list-decimal list-inside">
              <li>Each player has a unique role with specific objectives</li>
              <li>Take turns drawing cards and playing actions</li>
              <li>Answer environmental questions to earn points</li>
              <li>Use strategy to achieve your role's goals</li>
              <li>Collaborate or compete based on your objectives</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Card Types</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-blue-100 rounded"></span>
                <span className="text-sm text-gray-600">Action Cards - Perform immediate effects</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-green-100 rounded"></span>
                <span className="text-sm text-gray-600">Resource Cards - Provide ongoing benefits</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-purple-100 rounded"></span>
                <span className="text-sm text-gray-600">Special Cards - Unique role abilities</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Winning Conditions</h3>
            <p className="text-gray-600 text-sm">
              Victory depends on your role! Some roles win by collaboration, others by competition. 
              Check your role card for specific objectives and victory conditions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Tips for New Players</h3>
            <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
              <li>Read your role carefully and understand your objectives</li>
              <li>Pay attention to the environmental status indicators</li>
              <li>Don't forget to use your special abilities</li>
              <li>Communicate with other players when beneficial</li>
              <li>Learn from each game to improve your strategy</li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GameControls;
