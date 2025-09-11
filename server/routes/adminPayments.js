const express = require('express');
const router = express.Router();
const Payment  = require('../models/payment');
const authAdmin = require('../middleware/authAdmin');
const User = require('../models/users');
const { Op } = require("sequelize");

// Semua endpoint di sini hanya bisa diakses oleh admin
router.use(authAdmin);
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'DESC';

    // --- PERBAIKAN UNTUK SORTING ---
    // Logika untuk menangani sorting pada model yang di-include
    let order;
    if (sortBy.includes('.')) {
      // Jika sortBy mengandung titik (misal: 'User.nama')
      const [modelName, columnName] = sortBy.split('.');
      // Asumsikan modelName adalah 'User'
      if (modelName === 'User') {
        order = [[User, columnName, sortOrder]];
      }
    } else {
      // Jika sorting pada kolom di model Payment itu sendiri
      order = [[sortBy, sortOrder]];
    }

    const queryOptions = {
      include: [{
        model: User,
        attributes: ['nama']
      }],
      order: order // Gunakan variabel order yang sudah dibuat
    };

    // Ganti Op.iLike dengan Op.like agar kompatibel dengan lebih banyak database
    if (search) {
      queryOptions.where = {
        [Op.or]: [
          { userNohp: { [Op.like]: `%${search}%` } },
          { nama_paket: { [Op.like]: `%${search}%` } },
          { status: { [Op.like]: `%${search}%` } },
          // Sintaks untuk mencari di kolom dari tabel yang di-join sudah benar
          { '$User.nama$': { [Op.like]: `%${search}%` } }
        ]
      };
    }

    // --- Sisa logika Anda tetap sama ---
    if (limit === -1) {
      const { count, rows } = await Payment.findAndCountAll(queryOptions);
      res.json({
        payments: rows,
        totalPages: 1,
        currentPage: 1,
        totalItems: count
      });
    } else {
      const offset = (page - 1) * limit;
      const { count, rows } = await Payment.findAndCountAll({
        ...queryOptions,
        limit: limit,
        offset: offset,
      });
      const totalPages = Math.ceil(count / limit);
      res.json({
        payments: rows,
        totalPages: totalPages,
        currentPage: page,
        totalItems: count
      });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data pembayaran' });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const { id }     = req.params;
    const { status, alasanPenolakan } = req.body;

    if (!['pending', 'confirmed', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid' });
    }

    // 1) cari payment-nya
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: 'Pembayaran tidak ditemukan' });
    }

    // 2) update status payment
    payment.status = status;

    // Jika status rejected, update alasanPenolakan juga
    if (status === 'rejected') {
      payment.alasanPenolakan = alasanPenolakan || null;
    } else {
      payment.alasanPenolakan = null; // reset kalau bukan rejected
    }

    await payment.save();

    // 3) jika sudah confirmed, update status_ujian di users
    if (status === 'confirmed') {
      await User.update(
        { 
          status_ujian: 'sedang_ujian',
          paket_soal_id_aktif: payment.paket_soal_id,
          sesi: 'ready',
          end_time: null,
        },
        { where: { nohp: payment.userNohp } }
      );
    }

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
