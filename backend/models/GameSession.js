const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  roleId: String,
  roleName: String,
  characterName: String,
  score: Number,
  quizScore: Number,
  gameScore: Number,
  isAlive: Boolean,
  isReady: Boolean,
  joinedAt: Date,
  lastActive: Date,
  votingHistory: Array,
  actionHistory: Array
});

const GameSessionSchema = new mongoose.Schema({
  sessionId: { type: String, unique: true, required: true },
  roomCode: { type: String, required: true },
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  gameConfig: Object,
  players: [PlayerSchema],
  gameState: Object,
  startedAt: Date,
  endedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GameSession', GameSessionSchema);
