const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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

exports.register = async (req, res) => {
  try {
    const { username, email, password, character } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Semua field wajib diisi.' });
    }
    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email sudah terdaftar.' });
    }
    let roleId = '';
    if (character) {
      if (character.includes('eco_citizen')) roleId = 'eco_citizen';
      else if (character.includes('green_guardian')) roleId = 'green_guardian';
      else if (character.includes('waste_villain')) roleId = 'waste_villain';
      else if (character.includes('waste_manager')) roleId = 'waste_manager';
      else if (character.includes('sustainability_guide')) roleId = 'sustainability_guide';
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, roleId });
    await user.save();
    res.status(201).json({ message: 'Registrasi berhasil', user: { _id: user._id, username, email, roleId } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email tidak ditemukan.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Password salah.' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '7d' });
    res.json({
      message: 'Login berhasil',
      token,
      user: { _id: user._id, username: user.username, email: user.email, roleId: user.roleId }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


