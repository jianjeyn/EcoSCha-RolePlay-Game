const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  topicId: { type: String, required: true },
  questionType: { type: String, enum: ['multiple_choice', 'true_false', 'short_essay'], required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  question: { type: String, required: true },
  options: [{
    id: String,
    text: String,
    isCorrect: Boolean
  }],
  correctAnswer: mongoose.Schema.Types.Mixed,
  sampleAnswers: [String],
  evaluationCriteria: [String],
  explanation: String,
  points: { type: Number, default: 10 },
  timeLimit: { type: Number, default: 60 },
  tags: [String],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);
