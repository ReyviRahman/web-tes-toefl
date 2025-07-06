const express = require('express');
const router = express.Router();
const authAdmin = require('../middleware/authAdmin');
const PaketSoal = require('../models/paket_soal');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Soal = require('../models/soal');
const Question = require('../models/question');

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

// upload soal reading
const uploadDirReading = path.join(__dirname, '..', 'uploads', 'soal-reading');
if (!fs.existsSync(uploadDirReading)) fs.mkdirSync(uploadDirReading, { recursive: true });

const storageReading = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDirReading),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, uniqueName);
  }
});
const uploadReading = multer({ storage: storageReading });

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

router.get('/:paketId/:kategori/last', async (req, res) => {
  try {
    const { paketId, kategori } = req.params;

    // Ambil soal terakhir berdasarkan no_soal terbesar
    const lastSoal = await Soal.findOne({
      where: { paket_soal_id: paketId,  kategori: kategori},
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

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<LISTENING>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

    // Periksa apakah sudah ada 50 soal listening
    const totalListeningSoal = await Soal.count({
      where: {
        kategori: 'listening',
        paket_soal_id: paketSoalId,
      }
    });

    if (totalListeningSoal >= 50) {
      return res.status(400).json({ message: 'Jumlah soal listening sudah mencapai batas maksimal (50 soal).' });
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

router.get('/soal/:soalId', async (req, res) => {
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

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<STRUCTURE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post('/:paketSoalId/soal-structure', async (req, res) => {
  try {
    const { paketSoalId } = req.params;
    const {
      soal,
      pilihan_satu,
      pilihan_dua,
      pilihan_tiga,
      pilihan_empat,
      jawaban,
      no_soal,
      page,
    } = req.body;

    // Validasi field
    if (![soal, pilihan_satu, pilihan_dua, pilihan_tiga, pilihan_empat, jawaban, no_soal, page].every(Boolean)) {
      return res.status(400).json({ message: 'Semua field wajib diisi, termasuk nomor soal dan halaman.' });
    }

    if (!['1', '2', '3', '4'].includes(jawaban)) {
      return res.status(400).json({ message: 'Jawaban harus 1-4.' });
    }

    // Validasi maksimal page dan no_soal
    if (Number(page) > 66 || Number(no_soal) > 15) {
      return res.status(400).json({ message: 'Nomor soal max 15 dan halaman (page) untuk structure maksimal 66.' });
    }

    if (Number(page) < 52 ) {
      return res.status(400).json({ message: 'Halaman (page) untuk structure minimal 52.' });
    }

    // Periksa apakah sudah ada 15 soal structure
    const totalStructureSoal = await Soal.count({
      where: {
        kategori: 'structure',
        paket_soal_id: paketSoalId,
      }
    });

    if (totalStructureSoal >= 15) {
      return res.status(400).json({ message: 'Jumlah soal structure sudah mencapai batas maksimal (15 soal).' });
    }

    const newSoal = await Soal.create({
      soal,
      pilihan_satu,
      pilihan_dua,
      pilihan_tiga,
      pilihan_empat,
      jawaban,
      audio: '',
      paket_soal_id: paketSoalId,
      page,
      q_reading: 0,
      no_soal,
      kategori: 'structure'
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

router.get('/:paketSoalId/soal-structure', async (req, res) => {
  try {
    const { paketSoalId } = req.params;
    const soalStructure = await Soal.findAll({
      where: {
        paket_soal_id: paketSoalId,
        kategori: 'structure'
      },
      attributes: [
        'id',
        'soal',
        'pilihan_satu',
        'pilihan_dua',
        'pilihan_tiga',
        'pilihan_empat',
        'jawaban',
        'page',
        'no_soal'
      ],
      order: [['no_soal', 'ASC']]
    });
    res.json({
      message: 'Daftar soal structure berhasil diambil',
      data: soalStructure
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil soal structure.' });
  }
});

router.put('/soal-structure/:soalId', async (req, res) => {
  try {
    const { soalId } = req.params;
    const {
      soal,
      pilihan_satu,
      pilihan_dua,
      pilihan_tiga,
      pilihan_empat,
      jawaban,
      no_soal,
      page,
    } = req.body;

    // Validasi field
    if (![soal, pilihan_satu, pilihan_dua, pilihan_tiga, pilihan_empat, jawaban, no_soal, page].every(Boolean)) {
      return res.status(400).json({ message: 'Semua field wajib diisi, termasuk nomor soal dan halaman.' });
    }

    if (!['1', '2', '3', '4'].includes(jawaban)) {
      return res.status(400).json({ message: 'Jawaban harus 1-4.' });
    }

    // Validasi maksimal page dan no_soal
    if (Number(page) > 66 || Number(no_soal) > 15) {
      return res.status(400).json({ message: 'Nomor soal max 15 dan halaman (page) untuk structure maksimal 66.' });
    }

    if (Number(page) < 52 ) {
      return res.status(400).json({ message: 'Halaman (page) untuk structure minimal 52.' });
    }

    // Cek apakah soal dengan id tersebut ada dan kategorinya benar
    const soalData = await Soal.findOne({ where: { id: soalId, kategori: 'structure' } });
    if (!soalData) {
      return res.status(404).json({ message: 'Soal tidak ditemukan.' });
    }

    // Update data
    await Soal.update({
      soal,
      pilihan_satu,
      pilihan_dua,
      pilihan_tiga,
      pilihan_empat,
      jawaban,
      no_soal,
      page
    }, {
      where: { id: soalId }
    });

    // Ambil data soal yang sudah diupdate
    const updatedSoal = await Soal.findByPk(soalId);

    res.status(200).json({
      message: 'Soal structure berhasil diupdate',
      data: updatedSoal
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengupdate soal.' });
  }
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<WRITTEN>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post('/:paketSoalId/soal-written', async (req, res) => {
  try {
    const { paketSoalId } = req.params;
    const {
      soal,
      jawaban,
      no_soal,
      page,
    } = req.body;

    // Validasi field
    if (![soal, jawaban, no_soal, page].every(Boolean)) {
      return res.status(400).json({ message: 'Semua field wajib diisi, termasuk nomor soal dan halaman.' });
    }

    if (!['1', '2', '3', '4'].includes(jawaban)) {
      return res.status(400).json({ message: 'Jawaban harus 1-4.' });
    }

    // Validasi maksimal page dan no_soal
    if (Number(page) > 92 || Number(no_soal) > 40) {
      return res.status(400).json({ message: 'Nomor soal max 40 dan halaman (page) untuk written maksimal 92.' });
    }

    if (Number(page) < 68 ) {
      return res.status(400).json({ message: 'Halaman (page) untuk written minimal 68.' });
    }

    // Periksa apakah sudah ada 25 soal written
    const totalWrittenSoal = await Soal.count({
      where: {
        kategori: 'written',
        paket_soal_id: paketSoalId,
      }
    });

    if (totalWrittenSoal >= 25) {
      return res.status(400).json({ message: 'Jumlah soal written sudah mencapai batas maksimal (25 soal).' });
    }

    const newSoal = await Soal.create({
      soal,
      pilihan_satu: '',
      pilihan_dua: '',
      pilihan_tiga: '',
      pilihan_empat: '',
      jawaban,
      audio: '',
      paket_soal_id: paketSoalId,
      page,
      q_reading: 0,
      no_soal,
      kategori: 'written'
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

router.get('/:paketSoalId/soal-written', async (req, res) => {
  try {
    const { paketSoalId } = req.params;
    const soalWritten = await Soal.findAll({
      where: {
        paket_soal_id: paketSoalId,
        kategori: 'written'
      },
      attributes: [
        'id',
        'soal',
        'jawaban',
        'page',
        'no_soal'
      ],
      order: [['no_soal', 'ASC']]
    });
    res.json({
      message: 'Daftar soal written berhasil diambil',
      data: soalWritten
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil soal written.' });
  }
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<PHOTO READING>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post('/:paketSoalId/question-reading', uploadReading.single('soal-reading'), async (req, res) => {
  try {
    const { paketSoalId } = req.params;
    const {
      nama
    } = req.body;
    const soalReadingFile = req.file;

    // Validasi field
    if (!nama || !soalReadingFile) {
      return res.status(400).json({ message: 'Nama dan Gambar Soal wajib di input' });
    }
    // Path relatif untuk audio
    const soalReadingPath = `/uploads/soal-reading/${soalReadingFile.filename}`;

    const newReadingSoal = await Question.create({
      nama,
      reading: soalReadingPath,
      paket_soal_id: paketSoalId,
    });

    res.status(201).json({
      message: 'Soal Reading berhasil ditambahkan',
      data: newReadingSoal
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menambah soal reading.' });
  }
});

router.get('/question-reading/:paketSoalId', async (req, res) => {
  try {
    const { paketSoalId } = req.params;
    const questions = await Question.findAll({
      where: { paket_soal_id: paketSoalId }
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error });
  }
});

router.put('/question-reading/:id', uploadReading.single('soal-reading'), async (req, res) => {
  try {
    const { id } = req.params;
    const { nama } = req.body;
    const soalReadingFile = req.file;

    const soal = await Question.findByPk(id);

    if (!soal) {
      return res.status(404).json({ message: 'Soal Reading tidak ditemukan.' });
    }

    // Update nama jika ada di body
    if (nama) soal.nama = nama;

    // Update file jika ada file baru
    if (soalReadingFile) {
      // Hapus file lama jika ada
      if (soal.reading) {
        const oldPath = path.join(__dirname, '..', soal.reading);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      // Simpan path file baru
      soal.reading = `/uploads/soal-reading/${soalReadingFile.filename}`;
    }

    await soal.save();

    res.status(200).json({
      message: 'Soal Reading berhasil diupdate',
      data: soal
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengupdate soal reading.' });
  }
});

router.delete('/soal-reading/:questionId', async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await Question.findByPk(questionId);
    if (!question) {
      return res.status(404).json({ message: 'question tidak ditemukan.' });
    }

    // Hapus file reading kalau ada
    if (question.reading) {
      const questionPath = path.join(__dirname, '..', question.reading); 
      fs.unlink(questionPath, (err) => {
        if (err) {
          console.error('Gagal menghapus file reading:', err.message);
        }
      });
    }

    await question.destroy();
    res.status(200).json({ message: 'question dan file berhasil dihapus.' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus question.', error: error.message });
  }
});

module.exports = router;
