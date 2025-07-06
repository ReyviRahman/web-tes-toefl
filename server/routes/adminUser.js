const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/authAdmin');
const User = require('../models/users');

router.use(authAdmin);
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({ 
      where: { role: 'User' }
    });
    res.json(users);
  } catch (err) {
    console.error('Gagal ambil data user:', err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

module.exports = router;