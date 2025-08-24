const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
  roleId: { type: String, required: true },
  qrData: { type: String, required: true },
  qrImage: String,
  generatedAt: { type: Date, default: Date.now },
  expiresAt: Date,
  isActive: { type: Boolean, default: true },
  usageCount: { type: Number, default: 0 },
  maxUsage: Number
}, { timestamps: true });

module.exports = mongoose.model('QRCode', QRCodeSchema);
