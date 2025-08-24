const mongoose = require('mongoose');
const CharacterSchema = new mongoose.Schema({
  _id: String,
  name: String,
  displayName: String,
  roleType: String,
  cardImage: String,
  description: String,
  abilities: [
    {
      name: String,
      description: String,
      cooldown: Number,
      usageLimit: String,
      icon: String
    }
  ],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}, { collection: 'characters' });
module.exports = mongoose.model('Character', CharacterSchema);
