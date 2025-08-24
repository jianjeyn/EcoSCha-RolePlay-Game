const mongoose = require('mongoose');
const LearningMaterialSchema = new mongoose.Schema({
  _id: String,
  type: String,
  title: String,
  videoUrl: String,
  embedUrl: String,
  thumbnailUrl: String,
  duration: String,
  startTime: String,
  description: String,
  summary: String,
  keyPoints: Array,
  category: String,
  tags: Array,
  sourceCredit: Object,
  watchTime: String,
  originalUrl: String,
  publishedDate: Date,
  author: String,
  region: String,
  readTime: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}, { collection: 'learning_materials' });
module.exports = mongoose.model('LearningMaterial', LearningMaterialSchema);
