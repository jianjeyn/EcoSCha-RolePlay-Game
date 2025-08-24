const QuizTopic = require('../models/QuizTopic');

exports.getAll = async (req, res) => {
  try {
    const topics = await QuizTopic.find({});
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all questions for a topic
exports.getQuestions = async (req, res) => {
  try {
    const topic = await QuizTopic.findById(req.params.id);
    if (!topic) return res.status(404).json({ error: 'Topic not found' });
    res.json(topic.questions || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
