const GameNarrative = require('../models/GameNarrative');
exports.getAll = async (req, res) => {
  try {
    const narratives = await GameNarrative.find({});
    res.json(narratives);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
