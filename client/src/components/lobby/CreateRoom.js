import React, { useState, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import Modal from '../common/Modal';
import QRCodeGenerator from '../common/QRCodeGenerator';

const CreateRoom = ({ onRoomCreated }) => {
  const [roomData, setRoomData] = useState({
    name: '',
    description: '',
    maxPlayers: 15,
    isPrivate: false,
    password: '',
    gameMode: 'classic',
    difficulty: 'medium'
  });
  const [isCreating, setIsCreating] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [createdRoom, setCreatedRoom] = useState(null);
  
  const { socket } = useSocket();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoomData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const roomPayload = {
        ...roomData,
        hostId: user.id,
        hostName: user.name
      };

      socket.emit('create_room', roomPayload, (response) => {
        if (response.success) {
          setCreatedRoom(response.room);
          setShowQRCode(true);
          onRoomCreated?.(response.room);
        } else {
          alert('Failed to create room: ' + response.error);
        }
        setIsCreating(false);
      });
    } catch (error) {
      console.error('Error creating room:', error);
      setIsCreating(false);
    }
  };

  const getRoomURL = () => {
    if (!createdRoom) return '';
    return `${window.location.origin}/join/${createdRoom.id}`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Game Room</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Name
            </label>
            <input
              type="text"
              name="name"
              value={roomData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter room name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={roomData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="Describe your game room..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Players
              </label>
              <select
                name="maxPlayers"
                value={roomData.maxPlayers}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value={8}>8 Players</option>
                <option value={10}>10 Players</option>
                <option value={12}>12 Players</option>
                <option value={15}>15 Players</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Game Mode
              </label>
              <select
                name="gameMode"
                value={roomData.gameMode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="classic">Classic Mode</option>
                <option value="quick">Quick Mode</option>
                <option value="tournament">Tournament</option>
                <option value="educational">Educational Focus</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <div className="flex space-x-4">
              {['easy', 'medium', 'hard'].map((level) => (
                <label key={level} className="flex items-center">
                  <input
                    type="radio"
                    name="difficulty"
                    value={level}
                    checked={roomData.difficulty === level}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="capitalize">{level}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isPrivate"
              checked={roomData.isPrivate}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">
              Private Room (requires password)
            </label>
          </div>

          {roomData.isPrivate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={roomData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter room password"
                required={roomData.isPrivate}
              />
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isCreating}
              variant="primary"
            >
              {isCreating ? 'Creating...' : 'Create Room'}
            </Button>
          </div>
        </form>
      </div>

      {/* QR Code Modal */}
      <Modal
        isOpen={showQRCode}
        onClose={() => setShowQRCode(false)}
        title="Room Created Successfully!"
      >
        <div className="text-center space-y-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              {createdRoom?.name}
            </h3>
            <p className="text-green-600">Room ID: {createdRoom?.id}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Share this QR code for players to join quickly:
            </p>
            <QRCodeGenerator
              value={getRoomURL()}
              size={200}
              className="mx-auto"
            />
          </div>

          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-500 mb-1">Direct Link:</p>
            <p className="text-sm font-mono break-all">{getRoomURL()}</p>
          </div>

          <Button
            onClick={() => {
              navigator.clipboard.writeText(getRoomURL());
              alert('Room link copied to clipboard!');
            }}
            variant="secondary"
            size="sm"
          >
            Copy Link
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateRoom;
