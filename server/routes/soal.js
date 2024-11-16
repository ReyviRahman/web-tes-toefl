const express = require('express')
const router = express.Router()
const SoalModel = require('../models/soal')

router.get('/', async (req, res) => {
  const soal = await SoalModel.findAll()

  res.status(200).json({
    data: soal,
    metadata: "test soal endpoint"
  })
})

router.post('/', async (req, res) => {
  const { soal, pilihan, jawaban } = req.body;

  // Validasi input
  if (!soal || !pilihan || !jawaban) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  try {
    // Menyimpan soal baru ke database
    const newSoal = await SoalModel.create({
      soal,
      pilihan,
      jawaban
    });

    res.status(201).json({
      message: 'Soal berhasil ditambahkan',
      data: newSoal
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan soal', error: error.message });
  }
});

module.exports = router