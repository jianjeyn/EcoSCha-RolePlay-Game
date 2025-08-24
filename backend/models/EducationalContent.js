const mongoose = require('mongoose');

const EducationalContentSchema = new mongoose.Schema({
  contentId: { type: String, unique: true, required: true },
  type: { type: String, enum: ['video', 'news', 'article', 'infographic'], required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: String,
  description: String,
  topics: [String],
  duration: Number,
  source: String,
  publishDate: Date,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('EducationalContent', EducationalContentSchema);
