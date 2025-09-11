const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/authAdmin');
const { Op } = require('sequelize');
const User = require('../models/users');

// GET /admin/users?page=1&limit=10&search=...&sortBy=nama&sortOrder=ASC
router.use(authAdmin);

router.get('/', async (req, res) => {
  try {
    // 1. Ambil parameter dari query string dengan nilai default
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sortBy = req.query.sortBy || 'createdAt'; // default pakai createdAt
    const sortOrder = req.query.sortOrder || 'DESC';

    // 2. Tentukan order (sorting)
    let order = [[sortBy, sortOrder]];

    // 3. Siapkan opsi query dasar
    const queryOptions = {
      where: {
        role: 'User'
      },
      order: order
    };

    // 4. Tambahkan kondisi pencarian jika ada
    if (search) {
      queryOptions.where = {
        [Op.and]: [
          { role: 'User' },
          {
            [Op.or]: [
              { nama: { [Op.like]: `%${search}%` } },
              { nohp: { [Op.like]: `%${search}%` } },
              { email: { [Op.like]: `%${search}%` } }
            ]
          }
        ]
      };
    }

    // 5. Logika ambil semua data atau pakai paginasi
    if (limit === -1) {
      const { count, rows } = await User.findAndCountAll(queryOptions);
      return res.json({
        users: rows,
        totalPages: 1,
        currentPage: 1,
        totalItems: count
      });
    } else {
      const offset = (page - 1) * limit;
      const { count, rows } = await User.findAndCountAll({
        ...queryOptions,
        limit,
        offset
      });
      const totalPages = Math.ceil(count / limit);
      return res.json({
        users: rows,
        totalPages,
        currentPage: page,
        totalItems: count
      });
    }

  } catch (err) {
    console.error('Gagal ambil data user:', err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

module.exports = router;

// router.get('/', async (req, res) => {
//   try {
//     const users = await User.findAll({ 
//       where: { role: 'User' }
//     });
//     res.json(users);
//   } catch (err) {
//     console.error('Gagal ambil data user:', err);
//     res.status(500).json({ message: 'Terjadi kesalahan server' });
//   }
// });
