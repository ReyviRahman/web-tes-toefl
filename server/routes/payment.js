const express = require('express');
const router = express.Router();
const multer = require('multer');
const Payment = require('../models/payment');
const verifyToken = require('../middleware/verifyToken');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN; 
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/bukti');
  },
  filename: (req, file, cb) => {
    const uniqueName = `bukti_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Upload bukti pembayaran
router.post('/upload', verifyToken, upload.single('bukti'), async (req, res) => {
  const userNohp = req.user.nohp;
  const { paket_soal_id } = req.body;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: `Notifikasi Pembayaran Masuk!\n\nUser: ${userNohp}\nPaket ID: ${paket_soal_id}\nStatus: pending`,
    });

    const payment = await Payment.create({
      userNohp,
      paket_soal_id,
      status: 'pending',
      buktiBayar: req.file.filename
    });

    res.status(201).json({
      message: 'Bukti pembayaran berhasil diunggah. Tunggu verifikasi admin.',
      payment
    });
  } catch (err) {
    console.error('Gagal upload bukti:', err);
    res.status(500).json({ message: 'Gagal menyimpan bukti pembayaran' });
  }
});

module.exports = router;
