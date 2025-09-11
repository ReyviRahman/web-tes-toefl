const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = 3001;
// const sequelize = require('./db.config');
require('./models/paket_soal');
require('./models/payment');
require('./models/question');
// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log("✅ Database berhasil di-sync (alter)");
//   })
//   .catch((err) => {
//     console.error("❌ Gagal sync database:", err);
//   });
const app = express();

// Whitelist domain yang diizinkan
const allowedOrigins = [
  'https://simulasitoefl.yantotanjung.com',
  'https://www.simulasitoefl.yantotanjung.com',
  'https://yantotanjung.com',
  'https://www.yantotanjung.com',
  'http://localhost:3000'
];

// Konfigurasi CORS
const corsOptions = {
  credentials: true, // penting untuk cookies / token
  origin: (origin, cb) => {
    // Request dari Postman atau curl (tanpa origin) → langsung lolos
    if (!origin) return cb(null, true);

    // Cek apakah origin masuk whitelist
    const ok = allowedOrigins.includes(origin);
    return ok ? cb(null, true) : cb(new Error('Origin not allowed by CORS'));
  }
};

// Middleware CORS
app.use(cors(corsOptions));

// Handle preflight request (OPTIONS)
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Routing utama
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Import endpoint
const userEndpoint = require('./routes/users');
const soalEndpoint = require('./routes/soal');
const paketSoalEndpoint = require('./routes/paketSoal');
const paymentEndpoint = require('./routes/payment');
const adminPayments = require('./routes/adminPayments');
const riwayatUjian = require('./routes/riwayatUjian');
const paketSoal = require('./routes/adminSoal');
const adminUser = require('./routes/adminUser');
const adminDashboard = require('./routes/adminDashboard');

app.use('/users', userEndpoint);
app.use('/soal', soalEndpoint);
app.use('/uploads', express.static('uploads'));
app.use('/paket-soal', paketSoalEndpoint);
app.use('/payment', paymentEndpoint);
app.use('/admin/payments', adminPayments);
app.use('/admin/riwayat-ujian', riwayatUjian);
app.use('/admin/paket-soal', paketSoal);
app.use('/admin/user', adminUser);
app.use('/admin/dashboard', adminDashboard);

// Jalankan server
app.listen(port, () => console.log(`Running server on port ${port}`));
