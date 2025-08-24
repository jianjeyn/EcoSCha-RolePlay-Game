const LearningMaterial = require('../models/LearningMaterial');

exports.getAll = async (req, res) => {
  try {
    const materials = await LearningMaterial.find({});
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get 5 latest news/videos
exports.getLatest = async (req, res) => {
  try {
    const latest = await LearningMaterial.find({ $or: [ { type: "article" }, { type: "video" } ] })
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
