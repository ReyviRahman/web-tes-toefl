const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/authAdmin');
const PaketSoal = require('../models/paket_soal');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Soal = require('../models/soal');

router.use(authAdmin);
const uploadDir = path.join(__dirname, '..', 'uploads', 'audio');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

router.get('/:id', async (req, res) => {
  try {
    const paket = await PaketSoal.findByPk(req.params.id);
    if (!paket) {
      return res.status(404).json({ message: 'Paket soal tidak ditemukan.' });
    }
    res.json({ data: paket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data paket soal' });
  }
});

router.get('/:paketSoalId/soal-listening', async (req, res) => {
  try {
    const { paketSoalId } = req.params;
    const soalListening = await Soal.findAll({
      where: {
        paket_soal_id: paketSoalId,
        kategori: 'listening'
      },
      attributes: [
        'id',
        'pilihan_satu',
        'pilihan_dua',
        'pilihan_tiga',
        'pilihan_empat',
        'jawaban',
        'page',
        'audio',
        'no_soal'
      ],
      order: [['no_soal', 'ASC']]
    });
    res.json({
      message: 'Daftar soal listening berhasil diambil',
      data: soalListening
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil soal listening.' });
  }
});

router.get('/:paketId/soal-listening/last', async (req, res) => {
  try {
    const { paketId } = req.params;

    // Ambil soal terakhir berdasarkan no_soal terbesar
    const lastSoal = await Soal.findOne({
      where: { paket_soal_id: paketId },
      order: [['no_soal', 'DESC']],
      attributes: ['no_soal', 'page'],
    });

    if (!lastSoal) {
      return res.json({ last_no_soal: 0, last_page: 0 });
    }

    res.json({
      last_no_soal: lastSoal.no_soal,
      last_page: lastSoal.page,
    });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil soal terakhir', error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nama_paket } = req.body;

    if (!nama_paket) {
      return res.status(400).json({ message: 'Nama paket wajib diisi.' });
    }

    // Status otomatis 'belum'
    const newPaket = await PaketSoal.create({ nama_paket, status: 'belum' });

    res.status(201).json({
      message: 'Paket soal berhasil ditambahkan',
      data: newPaket,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menambah paket soal' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_paket, status } = req.body;

    // Validasi status jika dikirim
    if (status && !['siap', 'belum'].includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid.' });
    }

    const paket = await PaketSoal.findByPk(id);
    if (!paket) {
      return res.status(404).json({ message: 'Paket soal tidak ditemukan.' });
    }

    if (nama_paket) paket.nama_paket = nama_paket;
    if (status) paket.status = status;
    await paket.save();

    res.json({
      message: 'Paket soal berhasil diupdate',
      data: paket,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal update paket soal' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const paket = await PaketSoal.findByPk(req.params.id);
    if (!paket) {
      return res.status(404).json({ message: 'Paket soal tidak ditemukan.' });
    }
    await paket.destroy();
    res.json({ message: 'Paket soal berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus paket soal.' });
  }
});

router.post('/:paketSoalId/soal-listening', upload.single('audio'), async (req, res) => {
  try {
    const { paketSoalId } = req.params;
    const {
      pilihan_satu,
      pilihan_dua,
      pilihan_tiga,
      pilihan_empat,
      jawaban,
      no_soal,
      page,
    } = req.body;
    const audioFile = req.file;

    // Validasi field
    if (![pilihan_satu, pilihan_dua, pilihan_tiga, pilihan_empat, jawaban, no_soal, page].every(Boolean) || !audioFile) {
      return res.status(400).json({ message: 'Semua field wajib diisi, termasuk nomor soal, halaman, dan file audio.' });
    }
    if (!['1', '2', '3', '4'].includes(jawaban)) {
      return res.status(400).json({ message: 'Jawaban harus 1-4.' });
    }

    // Validasi maksimal page dan no_soal
    if (Number(page) > 50 || Number(no_soal) > 50) {
      return res.status(400).json({ message: 'Nomor soal dan halaman (page) untuk listening maksimal 50.' });
    }

    // Path relatif untuk audio
    const audioPath = `/uploads/audio/${audioFile.filename}`;

    const newSoal = await Soal.create({
      soal: '',
      pilihan_satu,
      pilihan_dua,
      pilihan_tiga,
      pilihan_empat,
      jawaban,
      audio: audioPath,
      paket_soal_id: paketSoalId,
      page,
      q_reading: 0,
      no_soal,
      kategori: 'listening'
    });

    res.status(201).json({
      message: 'Soal berhasil ditambahkan',
      data: newSoal
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menambah soal.' });
  }
});

router.get('/soal-listening/:soalId', async (req, res) => {
  try {
    const { soalId } = req.params;
    
    // Ambil data soal berdasarkan soalId
    const soal = await Soal.findOne({
      where: {
        id: soalId, // Menggunakan hanya soalId
      },
    });

    if (!soal) {
      return res.status(404).json({ message: 'Soal tidak ditemukan.' });
    }

    // Kirim data soal jika ditemukan
    res.status(200).json({
      message: 'Soal ditemukan.',
      data: soal,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data soal.' });
  }
});

router.put('/:soalId/soal-listening', upload.single('audio'), async (req, res) => {
  try {
    const { soalId } = req.params;
    const {
      pilihan_satu,
      pilihan_dua,
      pilihan_tiga,
      pilihan_empat,
      jawaban,
      no_soal,
      page,
    } = req.body;
    const audioFile = req.file;

    // Validasi field
    if (![pilihan_satu, pilihan_dua, pilihan_tiga, pilihan_empat, jawaban, no_soal, page].every(Boolean)) {
      return res.status(400).json({ message: 'Semua field wajib diisi, termasuk nomor soal dan halaman.' });
    }
    if (!['1', '2', '3', '4'].includes(jawaban)) {
      return res.status(400).json({ message: 'Jawaban harus 1-4.' });
    }

    // Validasi maksimal page dan no_soal
    if (Number(page) > 50 || Number(no_soal) > 50) {
      return res.status(400).json({ message: 'Nomor soal dan halaman (page) untuk listening maksimal 50.' });
    }

    // Cari soal yang akan diedit
    const soal = await Soal.findOne({ where: { id: soalId } });
    if (!soal) {
      return res.status(404).json({ message: 'Soal tidak ditemukan.' });
    }

    // Jika ada file audio baru, hapus file lama
    if (audioFile) {
      const oldAudioPath = path.join(__dirname, '..', soal.audio); // Lokasi file audio lama
      if (fs.existsSync(oldAudioPath)) {
        fs.unlinkSync(oldAudioPath); // Menghapus file audio lama
      }
    }

    // Path relatif untuk audio baru
    const audioPath = audioFile ? `/uploads/audio/${audioFile.filename}` : soal.audio;

    // Update soal dengan data baru
    soal.pilihan_satu = pilihan_satu;
    soal.pilihan_dua = pilihan_dua;
    soal.pilihan_tiga = pilihan_tiga;
    soal.pilihan_empat = pilihan_empat;
    soal.jawaban = jawaban;
    soal.no_soal = no_soal;
    soal.page = page;
    soal.audio = audioPath;

    await soal.save();

    res.status(200).json({
      message: 'Soal berhasil diperbarui.',
      data: soal,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal memperbarui soal.' });
  }
});

router.delete('/soal/:soalId', async (req, res) => {
  const { soalId } = req.params;
  try {
    const soal = await Soal.findByPk(soalId);
    if (!soal) {
      return res.status(404).json({ message: 'Soal tidak ditemukan.' });
    }

    // Hapus file audio kalau ada
    if (soal.audio) {
      const audioPath = path.join(__dirname, '..', soal.audio); // asumsi path di DB: 'uploads/audio/namafile.mp3'
      fs.unlink(audioPath, (err) => {
        // Optional: log jika error hapus file, tapi tidak batalkan proses hapus soal
        if (err) {
          console.error('Gagal menghapus file audio:', err.message);
        }
      });
    }

    await soal.destroy();
    res.status(200).json({ message: 'Soal dan audio berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus soal.', error: error.message });
  }
});



module.exports = router;
