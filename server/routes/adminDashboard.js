const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/authAdmin');
const User = require('../models/users');
const ExamHistory = require('../models/exam_history');
const Payment = require('../models/payment');
const PaketSoal = require('../models/paket_soal');

router.use(authAdmin);
router.get('/', async (req, res) => {
  try {
    // total user dengan role = 'User'
    const totalUsers = await User.count({ where: { role: 'User' } });

    // total simulasi ujian
    const totalSimulation = await ExamHistory.count();

    // semua pembayaran yang sudah dikonfirmasi
    const confirmedPayments = await Payment.findAll({
      where: { status: 'confirmed' },
      attributes: ['paket_soal_id']
    });

    // hitung total pendapatan
    let totalRevenue = 0;
    confirmedPayments.forEach(payment => {
      const paketId = payment.paket_soal_id;
      if ([1, 8, 9].includes(paketId)) {
        totalRevenue += 20000;
      } else {
        totalRevenue += 25000;
      }
    });

    // hitung jumlah pembayaran pending
    const pendingPayments = await Payment.count({ where: { status: 'pending' } });

    // ambil 1 aktivitas terbaru dari ExamHistory
    const latestExam = await ExamHistory.findOne({
      include: [{
        model: User,
        as: 'user',
        attributes: ['nama']
      }],
      order: [['createdAt', 'DESC']]
    });

    const latestUser = await User.findOne({
      order: [['createdAt', 'DESC']]
    });
    
    const latestPayment = await Payment.findOne({
      include: [{
        model: User,
        attributes: ['nama']
      }],
      order: [['createdAt', 'DESC']]
    });

    let latestActivity = null;
    if (latestExam) {
      latestActivity = `${latestExam.user.nama} baru saja menyelesaikan simulasi ${latestExam.nama_paket} dengan skor ${latestExam.totalScore}`;
    }

    let latestUserRegister = null;
    if (latestUser) {
      latestUserRegister = `${latestUser.nama} baru saja mendaftarkan akun`;
    }

    let latestUserPayment = null;
    if (latestPayment) {
      latestUserPayment = `${latestPayment.User.nama} melakukan pembayaran`;
    }

    // 3 Paket Soal Terlaris (berdasarkan jumlah payment confirmed)
    const topPaketSoal = await Payment.findAll({
      where: { status: 'confirmed' },
      attributes: [
        'paket_soal_id',
        'nama_paket',
        [Payment.sequelize.fn('COUNT', Payment.sequelize.col('paket_soal_id')), 'total']
      ],
      group: ['paket_soal_id', 'nama_paket'],
      order: [[Payment.sequelize.literal('total'), 'DESC']],
      limit: 3,
      raw: true, // biar hasilnya plain JSON, bukan instance Sequelize
    });

    res.json({
      message: 'Berhasil mengambil data dashboard',
      totalUsers,
      totalSimulation,
      totalRevenue,
      pendingPayments,
      latestActivity,
      latestUserRegister,
      latestUserPayment,
      topPaketSoal
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data dashboard' });
  }
});

module.exports = router;
