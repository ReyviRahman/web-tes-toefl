const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Inisialisasi aplikasi express
const app = express();

require('./models/paket_soal'); 
require('./models/payment');
require('./models/question');

const allowedOrigins = [
  'https://yantotanjung.com',
  'https://www.yantotanjung.com',
  'http://localhost:3000'
];

app.use(
  cors({
    credentials: true,
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      const ok = allowedOrigins.includes(origin);
      return ok ? cb(null, true) : cb(new Error('Origin not allowed by CORS'));
    },
  }),
);

app.use(express.json());
app.use(cookieParser());

// Routing dasar
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Endpoint
app.use('/users', require('./routes/users'));
app.use('/soal', require('./routes/soal'));
app.use('/uploads', express.static('uploads'));
app.use('/paket-soal', require('./routes/paketSoal'));
app.use('/payment', require('./routes/payment'));
app.use('/admin/payments', require('./routes/adminPayments'));
app.use('/admin/riwayat-ujian', require('./routes/riwayatUjian'));
app.use('/admin/paket-soal', require('./routes/adminSoal'));
app.use('/admin/user', require('./routes/adminUser'));

module.exports = app;
