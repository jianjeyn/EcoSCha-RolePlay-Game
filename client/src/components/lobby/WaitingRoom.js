import React, { useState, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import QRCodeGenerator from '../common/QRCodeGenerator';

const WaitingRoom = ({ room, onGameStart, onLeaveRoom }) => {
  const [roomData, setRoomData] = useState(room);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  const { socket } = useSocket();
  const { user } = useAuth();

  const isHost = user && roomData && user.id === roomData.hostId;

  useEffect(() => {
    if (socket && roomData) {
      // Listen for room updates
      socket.on('room_updated', (updatedRoom) => {
        if (updatedRoom.id === roomData.id) {
          setRoomData(updatedRoom);
        }
      });

      // Listen for chat messages
      socket.on('room_message', (message) => {
        setMessages(prev => [...prev, message]);
      });

      // Listen for game start
      socket.on('game_started', (gameData) => {
        onGameStart?.(gameData);
      });

      // Listen for player joined
      socket.on('player_joined', (playerData) => {
        setMessages(prev => [...prev, {
          type: 'system',
          content: `${playerData.name} joined the room`,
          timestamp: Date.now()
        }]);
      });

      // Listen for player left
      socket.on('player_left', (playerData) => {
        setMessages(prev => [...prev, {
          type: 'system',
          content: `${playerData.name} left the room`,
          timestamp: Date.now()
        }]);
      });

      return () => {
        socket.off('room_updated');
        socket.off('room_message');
        socket.off('game_started');
        socket.off('player_joined');
        socket.off('player_left');
      };
    }
  }, [socket, roomData, onGameStart]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      socket.emit('send_room_message', {
        roomId: roomData.id,
        message: newMessage.trim()
      });
      setNewMessage('');
    }
  };

  const handleStartGame = () => {
    if (socket && isHost) {
      if (roomData.players.length < 4) {
        alert('Need at least 4 players to start the game!');
        return;
      }
      socket.emit('start_game', { roomId: roomData.id });
    }
  };

  const handleLeaveRoom = () => {
    if (socket) {
      socket.emit('leave_room', { roomId: roomData.id });
      onLeaveRoom?.();
    }
  };

  const handleKickPlayer = (playerId) => {
    if (socket && isHost && playerId !== user.id) {
      socket.emit('kick_player', { roomId: roomData.id, playerId });
    }
  };

  const getRoomURL = () => {
    return `${window.location.origin}/join/${roomData.id}`;
  };

  const copyRoomLink = () => {
    navigator.clipboard.writeText(getRoomURL());
    alert('Room link copied to clipboard!');
  };

  if (!roomData) {
    return <div>Loading room...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Room Info and Players */}
      <div className="lg:col-span-2 space-y-6">
        {/* Room Header */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{roomData.name}</h1>
              <p className="text-gray-600">Room ID: {roomData.id}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">
                {roomData.players.length}/{roomData.maxPlayers} Players
              </div>
              <div className="text-sm text-gray-600 capitalize">
                {roomData.gameMode} • {roomData.difficulty}
              </div>
            </div>
          </div>

          {roomData.description && (
            <p className="text-gray-600 mb-4">{roomData.description}</p>
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={copyRoomLink} variant="secondary" size="sm">
              📋 Copy Link
            </Button>
            <Button onClick={handleLeaveRoom} variant="danger" size="sm">
              Leave Room
            </Button>
            {isHost && (
              <Button
                onClick={handleStartGame}
                variant="primary"
                disabled={roomData.players.length < 4}
              >
                Start Game ({roomData.players.length < 4 ? `Need ${4 - roomData.players.length} more` : 'Ready'})
              </Button>
            )}
          </div>
        </div>

        {/* Players List */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Players</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {roomData.players.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {player.name}
                      {player.id === roomData.hostId && (
                        <span className="ml-2 text-yellow-500">👑</span>
                      )}
                      {player.id === user?.id && (
                        <span className="ml-2 text-xs text-blue-600">(You)</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {player.ready ? '✅ Ready' : '⏳ Waiting'}
                    </div>
                  </div>
                </div>
                
                {isHost && player.id !== user?.id && (
                  <Button
                    onClick={() => handleKickPlayer(player.id)}
                    variant="danger"
                    size="sm"
                  >
                    Kick
                  </Button>
                )}
              </div>
            ))}
            
            {/* Empty slots */}
            {Array.from({ length: roomData.maxPlayers - roomData.players.length }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="p-3 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500"
              >
                <div className="text-sm">Waiting for player...</div>
              </div>
            ))}
          </div>
        </div>

        {/* Game Rules */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Game Rules</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <span className="font-semibold text-blue-600">1.</span>
              <span>Each player will receive a unique role with specific objectives</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-semibold text-blue-600">2.</span>
              <span>Answer environmental questions to earn points and advance your goals</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-semibold text-blue-600">3.</span>
              <span>Collaborate or compete based on your role's objectives</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-semibold text-blue-600">4.</span>
              <span>Use strategy and knowledge to achieve victory conditions</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-semibold text-blue-600">5.</span>
              <span>Learn about environmental conservation through gameplay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat and QR Code */}
      <div className="space-y-6">
        {/* QR Code for joining */}
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Invite Players</h3>
          <QRCodeGenerator
            value={getRoomURL()}
            size={150}
            className="mx-auto mb-4"
          />
          <p className="text-xs text-gray-500 break-all">{getRoomURL()}</p>
        </div>

        {/* Chat */}
        <div className="bg-white rounded-xl shadow-lg flex flex-col h-96">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Room Chat</h3>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {messages.map((message, index) => (
              <div key={index} className={`text-sm ${
                message.type === 'system' 
                  ? 'text-gray-500 italic text-center'
                  : 'text-gray-900'
              }`}>
                {message.type === 'system' ? (
                  message.content
                ) : (
                  <div>
                    <span className="font-semibold text-blue-600">{message.playerName}:</span>
                    <span className="ml-2">{message.content}</span>
                  </div>
                )}
              </div>
            ))}
            
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm">
                No messages yet. Say hello to other players!
              </div>
            )}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
              <Button type="submit" size="sm">Send</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
