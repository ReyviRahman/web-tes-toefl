const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = 3001;

const sequelize = require('./db.config');
require('./models/paket_soal'); 
require('./models/payment');

// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('Database & tables created!');
//   })
//   .catch((error) => {
//     console.error('Error creating database & tables:', error);
//   });

// Inisialisasi aplikasi express
const app = express();

// Middleware
const allowedOrigins = [
  'https://yantotanjung.com',
  'https://www.yantotanjung.com',
  'http://localhost:3000'
];

app.use(
  cors({
    credentials: true,
    origin: (origin, cb) => {
      // request dari Postman / curl kadang tanpa origin → langsung lolos
      if (!origin) return cb(null, true);

      // cek apakah origin ada di whitelist (string) atau cocok regex
      const ok = allowedOrigins.includes(origin);
      return ok ? cb(null, true) : cb(new Error('Origin not allowed by CORS'));
    },
  }),
);

app.use(express.json());
app.use(cookieParser());

// Routing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Mengimpor endpoint
const userEndpoint = require('./routes/users');
const soalEndpoint = require('./routes/soal');
const paketSoalEndpoint = require('./routes/paketSoal');
const paymentEndpoint = require('./routes/payment');
const adminPayments = require('./routes/adminPayments');
const riwayatUjian = require('./routes/riwayatUjian');

app.use('/users', userEndpoint);
app.use('/soal', soalEndpoint);
app.use('/uploads', express.static('uploads'));
app.use('/paket-soal', paketSoalEndpoint);
app.use('/payment', paymentEndpoint);
app.use('/admin/payments', adminPayments);
app.use('/admin/riwayat-ujian', riwayatUjian);

// Jalankan server
app.listen(port, () => console.log(`Running server on port ${port}`));
