const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/authAdmin');
const ExamHistory = require('../models/exam_history');
const User = require('../models/users');
const { Op } = require("sequelize");

router.use(authAdmin);
router.get('/', async (req, res) => {
  try {
    // 1. Ambil parameter dari query string dengan nilai default
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sortBy = req.query.sortBy || 'created_at'; // Default sort berdasarkan created_at
    const sortOrder = req.query.sortOrder || 'DESC';

    // 2. Logika untuk menangani sorting dinamis, termasuk pada model 'user'
    let order;
    if (sortBy.includes('.')) {
      // Jika sortBy mengandung titik (contoh: 'user.nama')
      const [modelAlias, columnName] = sortBy.split('.');
      
      // Sesuaikan dengan alias yang digunakan di 'include'
      if (modelAlias === 'user') {
        order = [[{ model: User, as: 'user' }, columnName, sortOrder]];
      }
    } else {
      // Jika sorting pada kolom di model ExamHistory itu sendiri
      order = [[sortBy, sortOrder]];
    }

    // 3. Siapkan opsi dasar untuk query Sequelize
    const queryOptions = {
      include: [{
        model: User,
        as: 'user', // Gunakan alias 'user'
        attributes: ['nama']
      }],
      order: order // Gunakan variabel order yang sudah dibuat
    };

    // 4. Tambahkan kondisi pencarian jika ada
    if (search) {
      queryOptions.where = {
        [Op.or]: [
          // Ganti 'status' dan 'exam_name' dengan kolom yang relevan di model ExamHistory Anda
          { nama_paket: { [Op.like]: `%${search}%` } },
          { listeningScore: { [Op.like]: `%${search}%` } },
          { structureScore: { [Op.like]: `%${search}%` } },
          { readingScore: { [Op.like]: `%${search}%` } },
          { totalScore: { [Op.like]: `%${search}%` } },
          { listening_correct: { [Op.like]: `%${search}%` } },
          { written_correct: { [Op.like]: `%${search}%` } },
          { reading_correct: { [Op.like]: `%${search}%` } },
          
          // Pencarian pada kolom 'nama' dari model 'user' yang di-join
          // Pastikan menggunakan alias '$user.nama$'
          { '$user.nama$': { [Op.like]: `%${search}%` } }
        ]
      };
    }

    // 5. Logika untuk mengambil semua data atau data dengan paginasi
    if (limit === -1) {
      // Jika limit -1, ambil semua data tanpa paginasi
      const { count, rows } = await ExamHistory.findAndCountAll(queryOptions);
      res.json({
        histories: rows,
        totalPages: 1,
        currentPage: 1,
        totalItems: count
      });
    } else {
      // Jika menggunakan paginasi
      const offset = (page - 1) * limit;
      const { count, rows } = await ExamHistory.findAndCountAll({
        ...queryOptions,
        limit: limit,
        offset: offset,
      });
      const totalPages = Math.ceil(count / limit);
      res.json({
        histories: rows,
        totalPages: totalPages,
        currentPage: page,
        totalItems: count
      });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data exam history' });
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const histories = await ExamHistory.findAll({
//       include: [
//         {
//           model: User,
//           as: 'user',
//           attributes: ['nama'], // hanya ambil kolom nama
//         }
//       ],
//       order: [['created_at', 'DESC']]
//     });
//     res.json(histories);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Gagal mengambil data exam history' });
//   }
// });

module.exports = router;