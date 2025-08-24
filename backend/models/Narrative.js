const mongoose = require('mongoose');

const NarrativeSchema = new mongoose.Schema({
  narrativeId: { type: String, unique: true, required: true },
  phase: { type: String, required: true },
  title: String,
  content: { type: String, required: true },
  language: { type: String, default: 'mixed' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Narrative', NarrativeSchema);
