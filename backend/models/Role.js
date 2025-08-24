const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  roleId: { type: String, unique: true, required: true },
  roleName: { type: String, required: true },
  displayName: String,
  faction: { type: String, enum: ['good', 'evil', 'neutral'], required: true },
  count: { type: Number, required: true },
  description: String,
  backstory: String,
  abilities: [{
    abilityId: String,
    name: String,
    description: String,
    phaseUsed: String,
    cooldown: Number,
    usageLimit: Number
  }],
  specialQuote: String,
  cardImage: String,
  alternateCards: [{
    characterName: String,
    cardImage: String,
    backstory: String
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Role', RoleSchema);
