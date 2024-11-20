const express = require('express')
const router = express.Router()
const SoalModel = require('../models/soal')

router.get('/', async (req, res) => {
  const soal = await SoalModel.findAll()

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

module.exports = router