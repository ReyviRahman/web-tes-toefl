const express = require('express')
const router = express.Router()
const SoalModel = require('../models/soal')
const UserModel = require('../models/users')
const Question = require('../models/question')

router.get('/', async (req, res) => {
  const soal = await SoalModel.findAll({
    attributes: {
      exclude: ['jawaban', 'createdAt', 'updatedAt', 'q_reading', 'no_soal'], 
    },
    include: {
      model: Question,
      as: 'readingQuestion',
      attributes: ['reading']
    }
  })

  res.status(200).json({
    soal: soal,
    metadata: "Get All Soal"
  })
})

router.put('/timers', async (req, res) => {
  const { nohp, timeUjian } = req.body;
  const user = await UserModel.findByPk(nohp);
  if (user.timeUjian === null) {
    await user.update({ timeUjian });
    return res.status(200).json({
      message: "timeUjian updated successfully",
      timeUjian: timeUjian,
    });
  }

  res.status(200).json({
    message: "timeUjian already set, no update performed",
    timeUjian: user.timeUjian,
  });
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
    const { nohp, answers } = req.body;
    
    if (!Array.isArray(answers)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    const user = await UserModel.findByPk(nohp)
    if (user.lastScore !== -1) {
      return res.status(200).json({ totalPoints : user.lastScore})
    }

    // Ambil hanya kolom 'page' dan 'jawaban' dari semua soal
    const allSoal = await SoalModel.findAll({
      attributes: ['page', 'jawaban'], // Kolom yang diambil
    });

    let totalPoints = 0;
    const processedIds = new Set(); // Untuk melacak id yang sudah diproses

    // Loop melalui jawaban user dan bandingkan dengan soal
    for (const userAnswer of answers) {
      const { id, answer } = userAnswer;

      // Lewati jika id sudah diproses sebelumnya
      if (processedIds.has(id)) {
        continue;
      }

      // Tandai id sebagai sudah diproses
      processedIds.add(id);

      // Cari soal di memori berdasarkan id
      const soal = allSoal.find((q) => q.page === id);

      // Cocokkan jawaban user dengan jawaban di database
      if (soal && soal.jawaban === answer) {
        totalPoints += 1; // Tambah poin jika jawaban benar
      }
    }

    await user.update({ lastScore: totalPoints})

    // Kirimkan total poin user
    res.status(200).json({ totalPoints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = router