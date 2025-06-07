const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = 3001;

// const sequelize = require('./db.config');
// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log('Database & tables created!');
//   })
//   .catch((error) => {
//     console.error('Error creating database & tables:', error);
//   });

// Mengimpor endpoint
const userEndpoint = require('./routes/users');
const soalEndpoint = require('./routes/soal');
const startTestEndpoint = require('./routes/soal-copy');

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

app.use('/users', userEndpoint);
app.use('/soal', soalEndpoint);
app.use('/start-test', startTestEndpoint);
app.use('/uploads', express.static('uploads'));

// Jalankan server
app.listen(port, () => console.log(`Running server on port ${port}`));
