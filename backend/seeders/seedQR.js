const mongoose = require('mongoose');
require('dotenv').config();
const QRCodeModel = require('../models/QRCode');
const { qrCodes } = require('./characters');

async function seedQR() {
  console.log('MONGODB_URI:', process.env.MONGODB_URI);
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is undefined. Pastikan file .env sudah ada dan variabel sudah diisi.');
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Connected to MongoDB');

  await QRCodeModel.deleteMany({});
  // Filter hanya data yang punya roleId dan qrData
  const validQRCodes = qrCodes.filter(qr => qr.roleId && qr.qrData);
  if (validQRCodes.length !== qrCodes.length) {
    console.warn('Ada data QRCode yang tidak valid dan tidak diinsert:', qrCodes.filter(qr => !qr.roleId || !qr.qrData));
  }
  await QRCodeModel.insertMany(validQRCodes);

  console.log('QR codes seeded!');
  mongoose.disconnect();
}

seedQR().catch(err => {
  console.error('Seeding error:', err);
  mongoose.disconnect();
});
