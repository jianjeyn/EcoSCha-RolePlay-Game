const Character = require('../models/Character');

// Get all characters
exports.getAll = async (req, res) => {
  try {
    const characters = await Character.find({});
    res.json(characters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get character by ID
exports.getById = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) return res.status(404).json({ error: 'Character not found' });
    res.json(character);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get characters by roleType (e.g. /api/characters/role/eco_citizen)
exports.getByRoleType = async (req, res) => {
  try {
    const characters = await Character.find({ roleType: req.params.roleType });
    res.json(characters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
