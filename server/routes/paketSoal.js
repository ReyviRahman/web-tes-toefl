const express = require('express');
const router = express.Router();
const PaketSoal = require('../models/paket_soal');

// GET /paket-soal - Ambil semua paket soal
router.get('/', async (req, res) => {
  try {
    const paketSoals = await PaketSoal.findAll({
      where: {
        status: 'siap'
      }
    });
    res.status(200).json(paketSoals);
  } catch (error) {
    console.error('Error fetching paket soal:', error);
    res.status(500).json({ message: 'Gagal mengambil data paket soal' });
  }
});

router.get('/:paketId', async (req, res) => {
  try {
    const paket = await PaketSoal.findByPk(req.params.paketId);
    if (!paket) {
      return res.status(404).json({ message: 'Paket tidak ditemukan' });
    }
    res.json(paket);
  } catch (err) {
    console.error('Gagal ambil paket:', err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

module.exports = router;
