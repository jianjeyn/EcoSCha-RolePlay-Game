const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  topicId: { type: String, unique: true, required: true },
  topicName: { type: String, required: true },
  topicNameEn: String,
  description: String,
  icon: String,
  color: String,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
  questionCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Topic', TopicSchema);
