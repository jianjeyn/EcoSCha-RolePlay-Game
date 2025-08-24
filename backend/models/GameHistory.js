const mongoose = require('mongoose');

const GameHistorySchema = new mongoose.Schema({
  sessionId: String,
  roomCode: String,
  players: Array,
  winnerFaction: String,
  achievementsAwarded: Array,
  startedAt: Date,
  endedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GameHistory', GameHistorySchema);
