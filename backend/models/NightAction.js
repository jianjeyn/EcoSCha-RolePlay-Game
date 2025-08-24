const mongoose = require('mongoose');

const NightActionSchema = new mongoose.Schema({
  phase: { type: String, required: true },
  sequence: { type: Number, required: true },
  roleId: { type: String, required: true },
  instruction: { type: String, required: true },
  moderatorNote: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('NightAction', NightActionSchema);
