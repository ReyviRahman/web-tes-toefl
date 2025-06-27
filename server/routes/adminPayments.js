// routes/adminPayments.js
const express = require('express');
const router = express.Router();
const Payment  = require('../models/payment');
const authAdmin = require('../middleware/authAdmin');
const User = require('../models/users');

// Semua endpoint di sini hanya bisa diakses oleh admin
router.use(authAdmin);
router.get('/', async (req, res) => {
  try {
    const list = await Payment.findAll({
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        attributes: ['nama']
      }]
    });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data pembayaran' });
  }
});

/**
 * PUT /admin/payments/:id/status
 * Body: { status: 'confirmed' | 'rejected' }
 */
router.put('/:id/status', async (req, res) => {
  try {
    const { id }     = req.params;
    const { status } = req.body;

    if (!['pending','confirmed','rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid' });
    }

    // 1) cari payment-nya
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: 'Pembayaran tidak ditemukan' });
    }

    // 2) update status payment
    payment.status = status;
    await payment.save();

    // 3) jika sudah confirmed, update status_ujian di users
    if (status === 'confirmed') {
      await User.update(
        { 
          status_ujian: 'sedang_ujian',
          paket_soal_id_aktif: payment.paket_soal_id
         },
        { where: { nohp: payment.userNohp } }
      );
    }

    // 4) kirim response
    res.json({
      message: 'Status pembayaran diupdate',
      payment
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal memperbarui status' });
  }
});

module.exports = router;
