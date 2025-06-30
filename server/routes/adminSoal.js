const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/authAdmin');
const PaketSoal = require('../models/paket_soal');

router.use(authAdmin);
router.get('/:id', async (req, res) => {
  try {
    const paket = await PaketSoal.findByPk(req.params.id);
    if (!paket) {
      return res.status(404).json({ message: 'Paket soal tidak ditemukan.' });
    }
    res.json({ data: paket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data paket soal' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nama_paket } = req.body;

    if (!nama_paket) {
      return res.status(400).json({ message: 'Nama paket wajib diisi.' });
    }

    // Status otomatis 'belum'
    const newPaket = await PaketSoal.create({ nama_paket, status: 'belum' });

    res.status(201).json({
      message: 'Paket soal berhasil ditambahkan',
      data: newPaket,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menambah paket soal' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_paket, status } = req.body;

    // Validasi status jika dikirim
    if (status && !['siap', 'belum'].includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid.' });
    }

    const paket = await PaketSoal.findByPk(id);
    if (!paket) {
      return res.status(404).json({ message: 'Paket soal tidak ditemukan.' });
    }

    if (nama_paket) paket.nama_paket = nama_paket;
    if (status) paket.status = status;
    await paket.save();

    res.json({
      message: 'Paket soal berhasil diupdate',
      data: paket,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal update paket soal' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const paket = await PaketSoal.findByPk(req.params.id);
    if (!paket) {
      return res.status(404).json({ message: 'Paket soal tidak ditemukan.' });
    }
    await paket.destroy();
    res.json({ message: 'Paket soal berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus paket soal.' });
  }
});


module.exports = router;
