const express = require('express')
const csurf = require("csurf")
const csrfProtection = csurf({ cookie: { httpOnly: true } })
const router = express.Router()
const UsersModel = require('../models/users')
const ExamHistory = require('../models/exam_history')
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Payment = require('../models/payment')
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/users');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const secretKey = process.env.JWT_SECRET;
const { PDFDocument } = require('pdf-lib');
const { Op } = require("sequelize");


// Setup folder upload
const folderPath = path.join(__dirname, '../uploads/profilepic');
if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// Endpoint update profil user
router.put('/profile', verifyToken, upload.single('profilePic'), async (req, res) => {
  try {
    const { nohp, nama, newNohp, email } = req.body;
    const profilePicPath = req.file ? `/uploads/profilepic/${req.file.filename}` : null;

    // Cari user berdasarkan nohp lama
    const user = await User.findOne({ where: { nohp } });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    // Cek nohp baru sudah dipakai atau belum
    if (newNohp && newNohp !== nohp) {
      const existing = await User.findOne({ where: { nohp: newNohp } });
      if (existing) return res.status(409).json({ message: 'Nomor HP baru sudah terdaftar' });
    }

    // Hapus file foto lama jika user upload foto baru dan file lama bukan default
    if (profilePicPath && user.profilePic && user.profilePic !== '/uploads/profilepic/default-profile.png') {
      const oldPicPath = path.join(__dirname, '..', user.profilePic);
      fs.access(oldPicPath, fs.constants.F_OK, (err) => {
        if (!err) fs.unlink(oldPicPath, () => {});
      });
    }

    // Siapkan data update
    const updateData = {};
    if (newNohp && newNohp !== nohp) updateData.nohp = newNohp;
    if (nama) updateData.nama = nama;
    if (email) updateData.email = email;
    if (profilePicPath) updateData.profilePic = profilePicPath;

    // Lakukan update
    await User.update(updateData, { where: { nohp } });

    // Ambil data user baru
    const updatedUser = await User.findOne({
      where: { nohp: newNohp || nohp },
      attributes: ['nohp', 'nama', 'profilePic', 'role']
    });

    // Generate JWT token baru (cookieToken)
    const newToken = jwt.sign(
      {
        nohp: updatedUser.nohp,
        nama: updatedUser.nama,
        role: updatedUser.role,
        profilePic: updatedUser.profilePic,
      },
      secretKey,
      { expiresIn: '3h' }
    );

    // Set cookie baru
    res.cookie('cookieToken', newToken, { httpOnly: true, maxAge: 3 * 60 * 60 * 1000 });

    // Return data terbaru ke FE
    res.json({
      message: 'Profil berhasil diperbarui',
      user: {
        nohp: updatedUser.nohp,
        nama: updatedUser.nama,
        profilePic: updatedUser.profilePic
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui profil' });
  }
});

// Route untuk mengubah password user
router.put('/update-password', verifyToken, async (req, res) => {
  const { nohp, oldPassword, newPassword } = req.body;

  // Pastikan semua parameter yang diperlukan sudah ada
  if (!nohp || !oldPassword || !newPassword) {
    return res.status(400).json({ message: 'NoHP, password lama, dan password baru wajib diisi' });
  }

  try {
    // Cari user berdasarkan nohp (primary key)
    const user = await User.findOne({ where: { nohp } });

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Cek apakah password lama sesuai dengan password yang ada di database
    if (user.password !== oldPassword) {
      return res.status(401).json({ message: 'Password lama tidak cocok' });
    }

    // Update password dengan password baru
    await user.update({ password: newPassword });

    return res.status(200).json({ message: 'Password berhasil diperbarui' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui password' });
  }
});

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

router.get('/lastScore/sertif', verifyToken, async (req, res) => {
  const nohp = req.user.nohp;

  function formatTanggalInggris(tanggal) {
    if (!tanggal) return '-';
    const bulanInggris = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dateObj = new Date(tanggal);
    const tanggalNum = dateObj.getDate();
    const bulan = bulanInggris[dateObj.getMonth()];
    const tahun = dateObj.getFullYear();
    return `${bulan} ${tanggalNum}, ${tahun}`;
  }

  try {
    const user = await UsersModel.findByPk(nohp);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const nama = user.nama;
    const tanggalUjian = user.end_time ? formatTanggalInggris(user.end_time) : '-';
    const listeningScore = user.listening;
    const structureScore = user.written;
    const readingScore = user.reading;
    const totalScore = user.lastScore;

    const pdfPath = path.join(__dirname, '../uploads/sertifikat.pdf');
    const templateBytes = fs.readFileSync(pdfPath);

    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();

    form.getTextField('name').setText(nama);
    form.getTextField('listeningScore').setText(listeningScore.toString());
    form.getTextField('structureScore').setText(structureScore.toString());
    form.getTextField('readingScore').setText(readingScore.toString());
    form.getTextField('totalScore').setText(totalScore.toString());
    form.getTextField('date').setText(tanggalUjian);

    form.flatten();

    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=sertifikat-${nama}.pdf`);
    res.end(Buffer.from(pdfBytes));

  } catch (error) {
    console.error('Gagal generate sertifikat:', error);
    res.status(500).json({ message: 'Terjadi kesalahan di server' });
  }
});

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

router.post(
  '/register',
  [
    body('nohp')
      .trim()
      .isMobilePhone('id-ID')
      .withMessage('Nomor HP tidak valid')
      .escape(),
    body('nama')
      .trim()
      .notEmpty()
      .withMessage('Nama wajib diisi')
      .escape(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password minimal 6 karakter')
      .escape(),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Email tidak valid')
      .normalizeEmail()
      .escape()
  ],
  async (req, res) => {
    // Validasi input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nohp, nama, password, email } = req.body;

    try {
      // Cek user sudah ada (berdasarkan nohp atau email)
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { nohp },
            { email }
          ]
        }
      });
      if (existingUser) {
        return res.status(409).json({ message: 'User dengan nomor HP atau email ini sudah terdaftar' });
      }

      // Insert user baru (role default ke 'User')
      const user = await User.create({
        nohp,
        nama,
        password,
        email,
        role: 'User'
      });

      // Jangan return password ke frontend
      const userData = user.toJSON();
      delete userData.password;

      res.status(201).json({ message: 'User berhasil dibuat', user: userData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  }
);

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

router.get('/detail-user', verifyToken, async (req, res) => {
  const user_nohp = req.user.nohp;
  try {
    const user = await User.findOne({ where: { nohp: user_nohp } });

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const { nama, nohp, email, profilePic } = user;

    res.json({
      nama,
      nohp,
      email,
      profilePic
    });
  } catch (error) {
    console.error('Gagal cek akses:', error);
    res.status(500).json({ message: 'Terjadi kesalahan di server' });
  }
});


router.get('/certificate/:idSertif', verifyToken, async (req, res) => {
  const user_nohp = req.user.nohp;
  const { idSertif } = req.params;

  function formatTanggalInggris(tanggal) {
    if (!tanggal) return '-';
    const bulanInggris = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dateObj = new Date(tanggal);
    const tanggalNum = dateObj.getDate();
    const bulan = bulanInggris[dateObj.getMonth()];
    const tahun = dateObj.getFullYear();
    return `${bulan} ${tanggalNum}, ${tahun}`;
  }

  try {
    const histori = await ExamHistory.findOne({
      where: {
        userNohp: user_nohp,
        id: idSertif,
      },
      include: [{
        model: User,
        as: 'user',
        attributes: ['nama'],
      }]
    });

    if (!histori) {
      return res.status(404).json({ message: 'Data sertifikat tidak ditemukan' });
    }

    const nama = histori.user.nama;
    const tanggalUjian = histori.endedAt ? formatTanggalInggris(histori.endedAt) : '-';
    const listeningScore = histori.listeningScore;
    const structureScore = histori.structureScore;
    const readingScore = histori.readingScore;
    const totalScore = histori.totalScore;

    const pdfPath = path.join(__dirname, '../uploads/sertifikat.pdf');
    const templateBytes = fs.readFileSync(pdfPath);

    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();

    form.getTextField('name').setText(nama);
    form.getTextField('listeningScore').setText(listeningScore.toString());
    form.getTextField('structureScore').setText(structureScore.toString());
    form.getTextField('readingScore').setText(readingScore.toString());
    form.getTextField('totalScore').setText(totalScore.toString());
    form.getTextField('date').setText(tanggalUjian);

    form.flatten();

    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=sertifikat-${nama}.pdf`);
    res.end(Buffer.from(pdfBytes));

  } catch (error) {
    console.error('Gagal generate sertifikat:', error);
    res.status(500).json({ message: 'Terjadi kesalahan di server' });
  }
});

module.exports = router;