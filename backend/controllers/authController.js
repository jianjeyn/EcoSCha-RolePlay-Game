const mongoose = require('mongoose');
// Get user profile & character info
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });
    // Ambil data karakter utama user dari collection 'characters'
    const Character = mongoose.connection.collection('characters');
    const character = await Character.findOne({ roleId: user.roleId });
    // Ambil semua karakter lain untuk penjelasan
    const characterList = await Character.find({}).toArray();
    res.json({ user, character, characterList });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.register = (req, res) => {
  // ...implement registration logic...
  res.json({ message: 'Register endpoint' });
};

exports.login = (req, res) => {
  // ...implement login logic...
  res.json({ message: 'Login endpoint' });
};

exports.profile = (req, res) => {
  // ...implement profile logic...
  res.json({ message: 'Profile endpoint' });
};
