import React, { useState, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import Button from '../common/Button';
import Loading from '../common/Loading';

const RoomList = ({ onJoinRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    gameMode: 'all',
    difficulty: 'all',
    showFull: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      // Request room list on component mount
      socket.emit('get_rooms');

      // Listen for room list updates
      socket.on('rooms_list', (roomsData) => {
        setRooms(roomsData);
        setLoading(false);
      });

      // Listen for room updates
      socket.on('room_updated', (updatedRoom) => {
        setRooms(prev => prev.map(room => 
          room.id === updatedRoom.id ? updatedRoom : room
        ));
      });

      // Listen for room deletion
      socket.on('room_deleted', (roomId) => {
        setRooms(prev => prev.filter(room => room.id !== roomId));
      });

      return () => {
        socket.off('rooms_list');
        socket.off('room_updated');
        socket.off('room_deleted');
      };
    }
  }, [socket]);

  const handleJoinRoom = (room) => {
    if (room.players.length >= room.maxPlayers) {
      alert('Room is full!');
      return;
    }

    if (room.isPrivate) {
      const password = prompt('Enter room password:');
      if (!password) return;
      
      socket.emit('join_room', { roomId: room.id, password }, (response) => {
        if (response.success) {
          onJoinRoom?.(room);
        } else {
          alert('Failed to join room: ' + response.error);
        }
      });
    } else {
      socket.emit('join_room', { roomId: room.id }, (response) => {
        if (response.success) {
          onJoinRoom?.(room);
        } else {
          alert('Failed to join room: ' + response.error);
        }
      });
    }
  };

  const filteredRooms = rooms.filter(room => {
    // Search filter
    if (searchTerm && !room.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Game mode filter
    if (filter.gameMode !== 'all' && room.gameMode !== filter.gameMode) {
      return false;
    }

    // Difficulty filter
    if (filter.difficulty !== 'all' && room.difficulty !== filter.difficulty) {
      return false;
    }

    // Show full rooms filter
    if (!filter.showFull && room.players.length >= room.maxPlayers) {
      return false;
    }

    return true;
  });

  const getRoomStatusColor = (room) => {
    if (room.status === 'playing') return 'text-red-600 bg-red-100';
    if (room.players.length >= room.maxPlayers) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  const getRoomStatusText = (room) => {
    if (room.status === 'playing') return 'In Game';
    if (room.players.length >= room.maxPlayers) return 'Full';
    return 'Open';
  };

  if (loading) {
    return <Loading message="Loading available rooms..." />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={filter.gameMode}
              onChange={(e) => setFilter(prev => ({ ...prev, gameMode: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Modes</option>
              <option value="classic">Classic</option>
              <option value="quick">Quick</option>
              <option value="tournament">Tournament</option>
              <option value="educational">Educational</option>
            </select>

            <select
              value={filter.difficulty}
              onChange={(e) => setFilter(prev => ({ ...prev, difficulty: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filter.showFull}
                onChange={(e) => setFilter(prev => ({ ...prev, showFull: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Show full rooms</span>
            </label>
          </div>
        </div>
      </div>

      {/* Room List */}
      <div className="space-y-4">
        {filteredRooms.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No rooms found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filter.gameMode !== 'all' || filter.difficulty !== 'all' 
                ? 'Try adjusting your filters or search term.'
                : 'Be the first to create a room!'}
            </p>
            <Button href="/create-room" variant="primary">
              Create New Room
            </Button>
          </div>
        ) : (
          filteredRooms.map(room => (
            <div key={room.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{room.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoomStatusColor(room)}`}>
                      {getRoomStatusText(room)}
                    </span>
                    {room.isPrivate && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        🔒 Private
                      </span>
                    )}
                  </div>
                  
                  {room.description && (
                    <p className="text-gray-600 mb-3">{room.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>Host: {room.hostName}</span>
                    <span>Mode: {room.gameMode}</span>
                    <span>Difficulty: {room.difficulty}</span>
                    <span>Players: {room.players.length}/{room.maxPlayers}</span>
                  </div>
                </div>
                
                <div className="ml-6">
                  <Button
                    onClick={() => handleJoinRoom(room)}
                    disabled={room.status === 'playing' || (room.players.length >= room.maxPlayers && !filter.showFull)}
                    variant={room.status === 'playing' ? 'secondary' : 'primary'}
                  >
                    {room.status === 'playing' ? 'In Game' : 
                     room.players.length >= room.maxPlayers ? 'Full' : 'Join'}
                  </Button>
                </div>
              </div>
              
              {/* Players List */}
              {room.players.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {room.players.map((player, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {player.name}
                        {player.id === room.hostId && ' 👑'}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Refresh Button */}
      <div className="mt-6 text-center">
        <Button
          onClick={() => {
            setLoading(true);
            socket.emit('get_rooms');
          }}
          variant="secondary"
        >
          Refresh Rooms
        </Button>
      </div>
    </div>
  );
};

export default RoomList;
