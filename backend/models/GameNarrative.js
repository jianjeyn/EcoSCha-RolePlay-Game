const mongoose = require('mongoose');
const GameNarrativeSchema = new mongoose.Schema({
  _id: String,
  kapanDibaca: String,
  isiBacaan: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}, { collection: 'game_narratives' });
module.exports = mongoose.model('GameNarrative', GameNarrativeSchema);
