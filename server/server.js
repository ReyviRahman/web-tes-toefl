const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = 3001;

const sequelize = require('./db.config');
const PaketSoal = require('./models/paket_soal'); 
require('./models/payment');

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('Error creating database & tables:', error);
  });

// Inisialisasi aplikasi express
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Mengimpor endpoint
const userEndpoint = require('./routes/users');
const soalEndpoint = require('./routes/soal');
const startTestEndpoint = require('./routes/soal-copy');
const paketSoalEndpoint = require('./routes/paketSoal');
const paymentEndpoint = require('./routes/payment');
const adminPayments = require('./routes/adminPayments');

app.use('/users', userEndpoint);
app.use('/soal', soalEndpoint);
app.use('/start-test', startTestEndpoint);
app.use('/uploads', express.static('uploads'));
app.use('/paket-soal', paketSoalEndpoint);
app.use('/payment', paymentEndpoint);
app.use('/admin/payments', adminPayments);

// Jalankan server
app.listen(port, () => console.log(`Running server on port ${port}`));
