import React, { useState, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

const GameBoard = ({ gameState, onGameAction }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showRoleInfo, setShowRoleInfo] = useState(false);
  
  const { socket } = useSocket();
  const { user } = useAuth();

  const currentPlayer = gameState?.players?.find(p => p.id === user?.id);
  const isCurrentTurn = gameState?.currentPlayer === user?.id;

  useEffect(() => {
    if (socket) {
      socket.on('game_updated', (updatedGameState) => {
        // Handle game state updates
        console.log('Game updated:', updatedGameState);
      });

      socket.on('turn_changed', (turnData) => {
        console.log('Turn changed:', turnData);
      });

      socket.on('card_played', (cardData) => {
        console.log('Card played:', cardData);
      });

      return () => {
        socket.off('game_updated');
        socket.off('turn_changed');
        socket.off('card_played');
      };
    }
  }, [socket]);

  const handlePlayCard = (card) => {
    if (!isCurrentTurn || !socket) return;
    
    socket.emit('play_card', {
      gameId: gameState.id,
      cardId: card.id,
      playerId: user.id
    });
    
    setSelectedCard(null);
  };

  const handleEndTurn = () => {
    if (!isCurrentTurn || !socket) return;
    
    socket.emit('end_turn', {
      gameId: gameState.id,
      playerId: user.id
    });
  };

  const handleUseSpecialAbility = () => {
    if (!isCurrentTurn || !socket || !currentPlayer?.role?.specialAbility) return;
    
    socket.emit('use_special_ability', {
      gameId: gameState.id,
      playerId: user.id,
      abilityType: currentPlayer.role.specialAbility.type
    });
  };

  if (!gameState || !currentPlayer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading game...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* Game Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">EcoSCha Game</h1>
              <p className="text-gray-600">Round {gameState.currentRound} of {gameState.maxRounds}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{currentPlayer.score}</div>
                <div className="text-sm text-gray-600">Your Score</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{currentPlayer.environmentalImpact || 0}</div>
                <div className="text-sm text-gray-600">Impact Points</div>
              </div>
              
              <Button
                onClick={() => setShowRoleInfo(!showRoleInfo)}
                variant="secondary"
                size="sm"
              >
                {showRoleInfo ? 'Hide' : 'Show'} Role Info
              </Button>
            </div>
          </div>
          
          {/* Turn Indicator */}
          <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-blue-100 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                {isCurrentTurn ? (
                  <span className="text-green-800 font-semibold">🎯 Your Turn!</span>
                ) : (
                  <span className="text-blue-800">
                    Waiting for {gameState.players.find(p => p.id === gameState.currentPlayer)?.name}'s turn
                  </span>
                )}
              </div>
              
              {gameState.timeRemaining && (
                <div className="text-sm text-gray-600">
                  Time: {Math.floor(gameState.timeRemaining / 60)}:{(gameState.timeRemaining % 60).toString().padStart(2, '0')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Role Information Panel */}
        {showRoleInfo && (
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Role</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-600">{currentPlayer.role.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{currentPlayer.role.description}</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-700">Objectives:</h5>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    {currentPlayer.role.objectives?.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span>•</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {currentPlayer.role.specialAbility && (
                  <div>
                    <h5 className="font-medium text-gray-700">Special Ability:</h5>
                    <div className="text-sm text-gray-600 mt-1">
                      <p className="font-medium">{currentPlayer.role.specialAbility.name}</p>
                      <p>{currentPlayer.role.specialAbility.description}</p>
                      
                      {isCurrentTurn && currentPlayer.role.specialAbility.available && (
                        <Button
                          onClick={handleUseSpecialAbility}
                          variant="primary"
                          size="sm"
                          className="mt-2"
                        >
                          Use Ability
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Game Area */}
        <div className={showRoleInfo ? 'lg:col-span-2' : 'lg:col-span-3'}>
          {/* Game Board Center */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Game Board</h3>
            
            {/* Current Environmental Challenge */}
            {gameState.currentChallenge && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                <h4 className="font-semibold text-yellow-800">Current Challenge</h4>
                <p className="text-yellow-700 mt-1">{gameState.currentChallenge.description}</p>
                {gameState.currentChallenge.effects && (
                  <div className="text-sm text-yellow-600 mt-2">
                    Effects: {gameState.currentChallenge.effects.join(', ')}
                  </div>
                )}
              </div>
            )}
            
            {/* Environmental Status */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {['air', 'water', 'soil', 'biodiversity'].map((resource) => (
                <div key={resource} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">
                    {resource === 'air' && '🌬️'}
                    {resource === 'water' && '💧'}
                    {resource === 'soil' && '🌱'}
                    {resource === 'biodiversity' && '🦋'}
                  </div>
                  <div className="text-sm text-gray-600 capitalize">{resource}</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {gameState.environmentalStatus?.[resource] || 50}%
                  </div>
                </div>
              ))}
            </div>
            
            {/* Action Buttons */}
            {isCurrentTurn && (
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleEndTurn} variant="secondary">
                  End Turn
                </Button>
                <Button onClick={() => onGameAction?.('draw_card')} variant="primary">
                  Draw Card
                </Button>
                {selectedCard && (
                  <Button onClick={() => handlePlayCard(selectedCard)} variant="success">
                    Play {selectedCard.name}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Player's Hand */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Cards</h3>
            
            {currentPlayer.hand && currentPlayer.hand.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPlayer.hand.map((card) => (
                  <div
                    key={card.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedCard?.id === card.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${!isCurrentTurn ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => isCurrentTurn && setSelectedCard(card)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{card.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        card.type === 'action' ? 'bg-blue-100 text-blue-800' :
                        card.type === 'resource' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {card.type}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2">{card.description}</p>
                    
                    {card.cost && (
                      <div className="text-xs text-gray-500">
                        Cost: {card.cost} energy
                      </div>
                    )}
                    
                    {card.impact && (
                      <div className="text-xs text-green-600">
                        Impact: +{card.impact} points
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No cards in hand</p>
                {isCurrentTurn && (
                  <Button
                    onClick={() => onGameAction?.('draw_card')}
                    variant="primary"
                    className="mt-2"
                  >
                    Draw Card
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Players Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Players</h3>
            
            <div className="space-y-3">
              {gameState.players?.map((player) => (
                <div
                  key={player.id}
                  className={`p-3 rounded-lg border ${
                    player.id === gameState.currentPlayer
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">
                        {player.name}
                        {player.id === user?.id && ' (You)'}
                      </div>
                      <div className="text-xs text-gray-600">{player.role?.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{player.score}</div>
                      <div className="text-xs text-gray-600">
                        {player.hand?.length || 0} cards
                      </div>
                    </div>
                  </div>
                  
                  {player.id === gameState.currentPlayer && (
                    <div className="mt-2 text-xs text-blue-600 font-medium">
                      🎯 Current turn
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
