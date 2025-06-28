const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/authAdmin');
const ExamHistory = require('../models/exam_history');
const User = require('../models/users');

router.use(authAdmin);
router.get('/', async (req, res) => {
  try {
    const histories = await ExamHistory.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['nama'], // hanya ambil kolom nama
        }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(histories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data exam history' });
  }
});

module.exports = router;