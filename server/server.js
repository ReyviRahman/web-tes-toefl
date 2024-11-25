const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = 3001;

const sequelize = require('./db.config');
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('Error creating database & tables:', error);
  });
  
sequelize.sync().then(() => console.log('database Ready'))

// Mengimpor endpoint
const userEndpoint = require('./routes/users');
const soalEndpoint = require('./routes/soal');

// Inisialisasi aplikasi express
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Ganti dengan URL front-end Anda
  credentials: true // Izinkan pengiriman cookie
}));
app.use(express.json());
app.use(cookieParser());

// Routing
app.use('/users', userEndpoint);
app.use('/soal', soalEndpoint);
app.use('/uploads', express.static('uploads'));

// Jalankan server
app.listen(port, () => console.log(`Running server on port ${port}`));
