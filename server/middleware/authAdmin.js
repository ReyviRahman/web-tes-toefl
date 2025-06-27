// middleware/authAdmin.js
const jwt = require('jsonwebtoken');
// jangan pake destructuring { User }, tapi langsung:
const User = require('../models/users');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async function authAdmin(req, res, next) {
  try {
    const token = req.cookies.cookieToken;
    if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

    const decoded = jwt.verify(token, JWT_SECRET);
    // decoded.id: ini harus sesuai dengan apa yang kamu masukkan saat sign token

    const user = await User.findByPk(decoded.nohp);
    if (!user || user.role !== 'Admin') {
      return res.status(403).json({ message: 'Hanya admin yang berwenang' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('authAdmin error:', err);
    res.status(401).json({ message: 'Autentikasi gagal' });
  }
};
