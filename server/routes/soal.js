const express = require('express')
const router = express.Router()
const SoalModel = require('../models/soal')
const UserModel = require('../models/users')
const Question = require('../models/question')
const ExamHistory = require('../models/exam_history');

router.get('/', async (req, res) => {
  const soal = await SoalModel.findAll({
    attributes: {
      exclude: ['jawaban', 'createdAt', 'updatedAt', 'q_reading'], 
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

// router.put('/timers', async (req, res) => {
//   const { nohp } = req.body;
//   const user = await UserModel.findByPk(nohp);

//   // selalu pakai waktu server
//   const server_now = Date.now();

//   let { start_time, end_time } = user;

//   if (user.end_time === null) {
//     start_time = server_now;
//     // end_time   = start_time + 115 * 60 * 1000; 
//     end_time = start_time + 60 * 60 * 1000;
//     await user.update({ start_time, end_time });
//   }

//   res.status(200).json({
//     end_time,
//     server_now,
//     secondsRemaining: Math.floor((end_time - server_now) / 1000)
//   });
// });

router.put('/timers', async (req, res) => {
  const { nohp } = req.body;
  const user = await UserModel.findByPk(nohp);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const server_now = Date.now();
  const sessions = ['listening', 'written', 'reading'];
  const durationMap = {
    listening: 5000,     // 1 jam
    written:   5000,     // 30 menit
    reading:   5 * 60 * 1000,     // 15 menit
  };
  // const durationMap = {
  //   listening: 40 * 60 * 1000,      30 menit
  //   written:   25 * 60 * 1000,      25 menit
  //   reading:   55 * 60 * 1000,      55 menit
  // };

  let { sesi, start_time, end_time } = user;

  // 1) Jika belum pernah memulai sesi apapun, inisialisasi sesi pertama
  if (end_time === null) {
    sesi = sessions[0];
    start_time = server_now;
    end_time = server_now + durationMap[sesi];
    await user.update({ sesi, start_time, end_time });
  }
  // 2) Jika waktu sekarang sudah melewati end_time, pindah ke sesi berikutnya
  else if (server_now >= end_time) {
    const currentIdx = sessions.indexOf(sesi);
    const nextIdx = currentIdx + 1;

    if (nextIdx < sessions.length) {
      // masih ada sesi selanjutnya
      sesi = sessions[nextIdx];
      start_time = server_now;
      end_time = server_now + durationMap[sesi];
      await user.update({ sesi, start_time, end_time });
    } else {
      // semua sesi sudah selesai
      // kamu bisa handle finished di sini, misal:
      return res.status(200).json({
        message: 'All sessions completed',
        server_now,
        secondsRemaining: 0,
        sesi: 'finished'
      });
    }
  }

  // 3) Hitung sisa detik
  const secondsRemaining = Math.max(
    0,
    Math.floor((end_time - server_now) / 1000)
  );

  return res.status(200).json({
    sesi,
    end_time,
    server_now,
    secondsRemaining,
  });
});

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
  const listeningMap = {
    0: 24,
    1: 25,
    2: 26,
    3: 27,
    4: 28,
    5: 29,
    6: 30,
    7: 31,
    8: 32,
    9: 32,
    10: 33,
    11: 35,
    12: 37,
    13: 38,
    14: 39,
    15: 41,
    16: 41,
    17: 42,
    18: 43,
    19: 44,
    20: 45,
    21: 45,
    22: 46,
    23: 47,
    24: 47,
    25: 48,
    26: 48,
    27: 49,
    28: 49,
    29: 50,
    30: 51,
    31: 51,
    32: 52,
    33: 52,
    34: 53,
    35: 54,
    36: 54,
    37: 55,
    38: 56,
    39: 57,
    40: 57,
    41: 58,
    42: 59,
    43: 60,
    44: 61,
    45: 62,
    46: 63,
    47: 65,
    48: 66,
    49: 67,
    50: 68
  };
  
  const writtenMap = {
    0: 20,
    1: 20,
    2: 21,
    3: 22,
    4: 23,
    5: 25,
    6: 26,
    7: 27,
    8: 29,
    9: 31,
    10: 33,
    11: 35,
    12: 36,
    13: 37,
    14: 38,
    15: 40,
    16: 40,
    17: 41,
    18: 42,
    19: 43,
    20: 44,
    21: 45,
    22: 46,
    23: 47,
    24: 48,
    25: 49,
    26: 50,
    27: 51,
    28: 52,
    29: 53,
    30: 54,
    31: 55,
    32: 56,
    33: 57,
    34: 58,
    35: 60,
    36: 61,
    37: 63,
    38: 65,
    39: 67,
    40: 68,
  };
  
  const readingMap = {
    0: 21,
    1: 22,
    2: 23,
    3: 23,
    4: 24,
    5: 25,
    6: 26,
    7: 27,
    8: 28,
    9: 28,
    10: 29,
    11: 30,
    12: 31,
    13: 32,
    14: 34,
    15: 35,
    16: 36,
    17: 37,
    18: 38,
    19: 39,
    20: 40,
    21: 41,
    22: 42,
    23: 43,
    24: 43,
    25: 44,
    26: 45,
    27: 46,
    28: 46,
    29: 47,
    30: 48,
    31: 48,
    32: 49,
    33: 50,
    34: 51,
    35: 52,
    36: 52,
    37: 53,
    38: 54,
    39: 54,
    40: 55,
    41: 56,
    42: 57,
    43: 58,
    44: 59,
    45: 60,
    46: 61,
    47: 63,
    48: 65,
    49: 66,
    50: 67,
  };

  try {
    const { nohp, answers } = req.body;
    
    if (!Array.isArray(answers)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    const user = await UserModel.findByPk(nohp)
    if (user.lastScore !== -1) {
      return res.status(200).json({ toeflScore : user.lastScore, scoreListening : user.listening, scoreWritten: user.written, scoreReading: user.reading})
    }

    // Ambil hanya kolom 'page' dan 'jawaban' dari semua soal
    const allSoal = await SoalModel.findAll({
      attributes: ['page', 'jawaban'], // Kolom yang diambil
    });

    let totalPoints = 0;
    let listeningCorrect = 0;
    let writtenCorrect = 0;
    let readingCorrect = 0;
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
        if (id >= 1 && id <= 50) {
          listeningCorrect += 1;
        } else if (id >= 52 && id <= 92) {
          writtenCorrect += 1;
        } else if (id >= 94 && id <= 143) {
          readingCorrect += 1;
        }
        totalPoints += 1; // Tambah poin jika jawaban benar
      }
    }

    let scoreListening = listeningMap[listeningCorrect]
    let scoreWritten = writtenMap[writtenCorrect]
    let scoreReading = readingMap[readingCorrect]
    let toeflScore = Math.round((scoreListening + scoreWritten + scoreReading) / 3 * 10) 

    await user.update({ 
      lastScore: toeflScore, 
      listening: scoreListening, 
      written: scoreWritten, 
      reading: scoreReading,
      listening_correct: listeningCorrect,
      written_correct: writtenCorrect,
      reading_correct: readingCorrect,
    });

    await ExamHistory.create({
      userNohp: nohp,
      startedAt: new Date(user.start_time || Date.now()), 
      endedAt: new Date(user.end_time || Date.now()),     
      listeningScore: scoreListening,
      structureScore: scoreWritten,
      readingScore: scoreReading,
      totalScore: toeflScore,
      listening_correct: listeningCorrect,
      written_correct: writtenCorrect,
      reading_correct: readingCorrect,
    });

    // Kirimkan total poin user
    res.status(200).json({ toeflScore, scoreListening, scoreWritten, scoreReading, listeningCorrect, writtenCorrect, readingCorrect });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router