const jwt = require('jsonwebtoken');
const secretKey = 'reyvisacd123';

const verifyToken = (req, res, next) => {
  const token = req.cookies.cookieToken;

  if (!token) {
    return res.status(401).json({ message: 'Tidak ada token, akses ditolak' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // simpan ke req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token tidak valid' });
  }
};

module.exports = verifyToken;
