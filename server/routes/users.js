const express = require('express')
const csurf = require("csurf")
const csrfProtection = csurf({ cookie: { httpOnly: true } })
const router = express.Router()
const UsersModel = require('../models/users')
const ExamHistory = require('../models/exam_history')
const upload = require('../middleware/upload')
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Payment = require('../models/payment')
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/users')
const secretKey = process.env.JWT_SECRET;

router.get('/riwayat-ujian', verifyToken, async (req, res) => {
  try {
    const nohp = req.user.nohp;

    // Ambil semua exam history milik user ini
    const histories = await ExamHistory.findAll({
      where: { userNohp: nohp },
      include: [
        {
          model: UsersModel,
          as: 'user',
          attributes: ['nama'],
        }
      ],
      order: [['created_at', 'DESC']],
    });

    res.json(histories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil histori simulasi' });
  }
});

router.get('/lastScore', verifyToken, async (req,res) => {
  const nohp = req.user.nohp;
  const user = await UsersModel.findByPk(nohp);
  
  res.status(200).json({
    lastScore : user.lastScore,
    scoreListening : user.listening, 
    scoreWritten: user.written, 
    scoreReading: user.reading,
    listeningCorrect: user.listening_correct,
    writtenCorrect: user.written_correct,
    readingCorrect: user.reading_correct,
    lastPaket : user.paket_terakhir,
  })
})

router.get('/payment', verifyToken, async (req, res) => {
  const nohp = req.user.nohp;
  try {
    const list = await Payment.findAll({
      where: { user_nohp: nohp },
      order: [['createdAt', 'DESC']],
      attributes: ['nama_paket', 'buktiBayar', 'status', 'alasan_penolakan'], // ambil hanya kolom ini
    });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data pembayaran' });
  }
});

router.get('/getAuth', async (req, res) => {
  if (req.cookies.cookieToken) {
    const decoded = jwt.verify(req.cookies.cookieToken, secretKey);

    console.log('ini decoded', decoded)

    res.status(200).json({
      dataUser: {
        "nohp" : decoded.nohp,
        "nama" : decoded.nama,
        "profilePic" : decoded.profilePic,
        "role" : decoded.role
      },
      metadata: "Get Authentication",
      cookieToken: `${req.cookies.cookieToken}`
    })
  } else {
    res.status(200).json({
      dataUser: {
        "nohp" : "",
        "nama": "",
        "profilePic" : "",
        "role" : ""
      },
      metadata: "Cookie is Empty",
    })
  }
})

router.get('/logout', async (req, res) => {
  res.clearCookie("cookieToken", { httpOnly: true, path: '/' });
  return res.status(200).json({ message: 'Logout berhasil' });
})

router.post('/', async (req, res) => {

  const { nohp, nama, password } = req.body

  const users = await UsersModel.create({
    nohp, nama, password
  })

  res.status(200).json({
    data: users,
    metadata: "test user endpoint"
  })
})

router.post('/tryagain', async (req, res) => {
  const { nohp } = req.body;

  try {
    const user = await UsersModel.findByPk(nohp);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({ message: 'Akses ditolak. Hanya Admin yang diizinkan.' });
    }

    await user.update({
      end_time: null,
      lastScore: -1,
    });

    res.status(200).json({ message: 'Ulang ujian berhasil' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});


// router.put('/', async (req, res) => {

//   const { nohp, nama, password, passwordBaru } = req.body

//   const userData = await UsersModel.findOne({ where: {nohp: nohp}})

//   if (userData.password === password) {
//     const users = await UsersModel.update({
//       nama, password: passwordBaru
//     }, {where: {nohp: nohp}})

//     res.status(200).json({
//       users,
//       metadata: "user updated"
//     })
//   } else {
//     res.status(400).json({
//       error: "data invalid"
//     })
//   }
// })

router.post(
  '/login', 
  [
    body('nohp')
      .trim()
      .isMobilePhone('id-ID')
      .withMessage('Nomor HP tidak valid')
      .escape(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password minimal 6 karakter')
      .escape()
  ],
  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  const { nohp, password } = req.body;

  try {
    // Cari pengguna berdasarkan NIP
    const users = await UsersModel.findOne({ where: { nohp: nohp } });
    
    // Jika pengguna tidak ditemukan
    if (!users) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    // Jika password cocok
    if (users.password === password) {
      const token = jwt.sign(
        { nohp: users.nohp }, // Payload yang dikodekan dalam token
        secretKey, // Secret key untuk menandatangani token
        { expiresIn: '3h' } // Token akan kadaluarsa dalam 1 jam
      );

      res.cookie("cookieToken", jwt.sign({ nohp: users.nohp, nama: users.nama, role: users.role, profilePic: users.profilePic }, secretKey), { httpOnly: true, maxAge: 3 * 60 * 60 * 1000});

      return res.status(200).json({
        nohp: users.nohp,
        role: users.role,
        nama: users.nama,
        profilePic: users.profilePic,
        token,
        metadata: "Login success"
      });
    } else {
      // Jika password salah
      return res.status(401).json({
        error: "Invalid password"
      });
    }
  } catch (error) {
    console.error(error); // Menampilkan error di server
    res.status(500).json({
      error: "An internal server error occurred"
    });
  }
});

router.post('/register', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    const { nohp, nama, ttl, jk, alamat, agama, statusPerkawinan, pekerjaan, email, password } = req.body;

    try {
      // Cek apakah user sudah ada
      const userExist = await UsersModel.findOne({ where: { nohp }});
      if (userExist) {
        return res.status(400).json({ message: 'User Already Exist' });
      }

      // Buat user baru dengan path foto
      const newUser = await UsersModel.create({
        nohp,
        nama,
        ttl, 
        jk, 
        alamat, 
        agama, 
        statusPerkawinan, 
        pekerjaan, 
        profilePic: req.file ? req.file.path : null,
        email,
        password,
        role: "User"
      });

      res.status(201).json({
        message: 'User Registered Successfully',
        user: newUser
      });
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong',
        error
      });
    }
  });
});

router.get('/refreshtoken', async (req, res) => {
  const authHeader = req.headers.authorization; // Mengambil header Authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token is required' });
  }

  const token = authHeader.split(' ')[1]; // Mengambil token dari header

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, secretKey);

    // Cari pengguna berdasarkan nohp
    const user = await UsersModel.findByPk(decoded.nohp);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Buat token baru
    const newToken = jwt.sign(
      { nohp: user.nohp }, // Payload yang dikodekan dalam token
      secretKey, // Secret key untuk menandatangani token
      { expiresIn: '1h' } // Token akan kadaluarsa dalam 1 jam
    );

    return res.status(200).json({
      role: user.role,
      nohp: user.nohp,
      token: newToken,
      metadata: 'Token refreshed successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Invalid token' });
  }
});

router.get('/cek-akses/:paketId', verifyToken, async (req, res) => {
  const { paketId } = req.params;
  const user_nohp = req.user.nohp;

  try {
    // 1. Ambil user
    const user = await User.findOne({ where: { nohp: user_nohp } });

    // 2. Cek apakah status sedang ujian dan paket yang sama
    if (
      user.status_ujian === 'sedang_ujian' &&
      parseInt(user.paket_soal_id_aktif) === parseInt(paketId)
    ) {
      return res.json({ bolehAkses: true });
    }

    // 3. Cek apakah ada payment yang dikonfirmasi
    const payment = await Payment.findOne({
      where: {
        user_nohp,
        status: 'pending'
      }
    });

    if (payment) {
      return res.json({ pending: true, alasan: 'Mohon tunggu pembayaran anda sedang diverifikasi Admin' });
    }

    return res.json({
      bolehAkses: false,
      alasan: 'Anda Belum Membayar untuk paket ini',
      bayar: false,
    });

  } catch (error) {
    console.error('Gagal cek akses:', error);
    res.status(500).json({ message: 'Terjadi kesalahan di server' });
  }
});

router.get('/cek-akses', verifyToken, async (req, res) => {
  const user_nohp = req.user.nohp;

  try {
    // 1. Ambil user
    const user = await User.findOne({ where: { nohp: user_nohp } });

    // 2. Cek apakah status sedang ujian dan paket yang sama
    if (
      user.status_ujian === 'sedang_ujian' &&
      parseInt(user.paket_soal_id_aktif) !== null
    ) {
      return res.json({ 
        bolehAkses: true, 
        paketId: user.paket_soal_id_aktif
      });
    }

    return res.json({
      bolehAkses: false,
      alasan: 'Anda Belum Membayar untuk paket ini',
      bayar: false,
    });

  } catch (error) {
    console.error('Gagal cek akses:', error);
    res.status(500).json({ message: 'Terjadi kesalahan di server' });
  }
});

module.exports = router;