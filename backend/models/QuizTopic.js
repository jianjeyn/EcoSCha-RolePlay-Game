const mongoose = require('mongoose');
const QuizTopicSchema = new mongoose.Schema({
  _id: String,
  topicId: Number,
  topicNumber: String,
  topicName: String,
  topicTitle: String,
  cardImage: String,
  route: String,
  description: String,
  difficulty: String,
  questions: Array,
  totalQuestions: Number,
  totalPoints: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}, { collection: 'quiz_topics' });
module.exports = mongoose.model('QuizTopic', QuizTopicSchema);
