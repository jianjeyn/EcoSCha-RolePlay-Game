const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  achievementId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  nameId: String,
  description: String,
  descriptionId: String,
  icon: String,
  category: String,
  rarity: { type: String, enum: ['bronze', 'silver', 'gold', 'legendary'] },
  points: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', AchievementSchema);
