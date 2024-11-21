const express = require('express')
const router = express.Router()
const SoalModel = require('../models/soal')

router.get('/', async (req, res) => {
  const soal = await SoalModel.findAll({
    attributes: {
      exclude: ['jawaban', 'createdAt', 'updatedAt'], 
    },
  })

  res.status(200).json({
    soal: soal,
    metadata: "Get All Soal"
  })
})

router.get('/getsoal', async (req, res) => {
  const { page } = req.query; // Mengambil parameter 'page'

  if (!page) {
    return res.status(400).json({ message: 'Page query parameter is required.' });
  }

  try {
    // Fetch soal berdasarkan page (hanya satu page)
    const soalPage = await SoalModel.findOne({
      where: { page: page },
    });

    if (!soalPage) {
      return res.status(404).json({ message: `No questions found for page ${page}` });
    }

    res.status(200).json({ soal: soalPage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the question.', error: error.message });
  }
});

router.post('/jawaban', async (req, res) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    // Ambil hanya kolom 'id', 'page', dan 'jawaban' dari semua soal
    const allSoal = await SoalModel.findAll({
      attributes: ['page', 'jawaban'], // Kolom yang diambil
    });

    let totalPoints = 0;

    // Loop melalui jawaban user dan bandingkan dengan soal
    for (const userAnswer of answers) {
      const { id, answer } = userAnswer;

      // Cari soal di memori berdasarkan id
      const soal = allSoal.find((q) => q.page === id);

      // Cocokkan jawaban user dengan jawaban di database
      if (soal && soal.jawaban === answer) {
        totalPoints += 1; // Tambah poin jika jawaban benar
      }
    }

    // Kirimkan total poin user
    res.status(200).json({ totalPoints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router