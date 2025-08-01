const request = require('supertest');
const app = require('../app');

// ✅ Mock model
jest.mock('../models/paket_soal');
const PaketSoal = require('../models/paket_soal');

// ✅ Mock middleware authAdmin agar semua request lolos
jest.mock('../middleware/authAdmin', () => (req, res, next) => {
  req.user = { role: 'Admin', nohp: '08123456789' };
  next();
});

describe('Paket Soal API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('GET /admin/paket-soal', () => {
    it('harus menampilkan semua paket soal', async () => {
      PaketSoal.findAll.mockResolvedValue([
        { id: 1, nama_paket: 'Paket A', status: 'siap' },
        { id: 2, nama_paket: 'Paket B', status: 'belum' },
      ]);
      const res = await request(app).get('/admin/paket-soal');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });
  });
  describe('POST /admin/paket-soal', () => {
    it('berhasil menambah paket soal', async () => {
      const payload = { nama_paket: 'Paket C' };
      const created = { id: 3, nama_paket: 'Paket C', status: 'belum' };
      PaketSoal.create.mockResolvedValue(created);
      const res = await request(app).post('/admin/paket-soal').send(payload);
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Paket soal berhasil ditambahkan');
      expect(res.body.data).toEqual(created);
    });
  });
  describe('PUT /admin/paket-soal/:id', () => {
    it('berhasil update paket soal', async () => {
      const mockPaket = {
        id: 1,
        nama_paket: 'Paket Lama',
        status: 'belum',
        save: jest.fn(),
      };
      PaketSoal.findByPk.mockResolvedValue(mockPaket);
      const res = await request(app)
        .put('/admin/paket-soal/1')
        .send({ nama_paket: 'Paket Baru', status: 'siap' });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Paket soal berhasil diupdate');
      expect(mockPaket.nama_paket).toBe('Paket Baru');
      expect(mockPaket.status).toBe('siap');
      expect(mockPaket.save).toHaveBeenCalled();
    });
  });
  describe('DELETE /admin/paket-soal/:id', () => {
    it('berhasil menghapus paket soal', async () => {
      const mockPaket = {
        id: 2,
        destroy: jest.fn(),
      };
      PaketSoal.findByPk.mockResolvedValue(mockPaket);
      const res = await request(app).delete('/admin/paket-soal/2');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Paket soal berhasil dihapus.');
      expect(mockPaket.destroy).toHaveBeenCalled();
    });
  });
});
