const mongoose = require('mongoose');

// Get all narratives from collection 'game_narratives'
exports.getNarratives = async (req, res) => {
  try {
    const Narrative = mongoose.connection.collection('game_narratives');
    const narratives = await Narrative.find({}).toArray();
    res.json(narratives);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all educational content from collection 'learning_materials'
exports.getEducationalContent = async (req, res) => {
  try {
    const Material = mongoose.connection.collection('learning_materials');
    const content = await Material.find({}).toArray();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all quiz topics from collection 'quiz_topics'
exports.getQuizTopics = async (req, res) => {
  try {
    const Quiz = mongoose.connection.collection('quiz_topics');
    const topics = await Quiz.find({}).toArray();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getIntermezzoContent = (req, res) => {
  // ...implement get intermezzo content logic...
  res.json({ message: 'Get intermezzo content endpoint' });
};
