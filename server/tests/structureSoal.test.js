const request = require('supertest');
const app = require('../app');
const Soal = require('../models/soal');

jest.mock('../models/soal', () => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByPk: jest.fn(),
  count: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
}));
jest.mock('../models/question', () => ({}));
jest.mock('../models/paket_soal', () => ({}));
jest.mock('../middleware/authAdmin', () => (req, res, next) => {
  req.user = { role: 'Admin', nohp: '08123456789' };
  next();
});

describe('Soal Structure Endpoints', () => {
  const validBody = { soal: 'Contoh soal structure', pilihan_satu: 'A',pilihan_dua: 'B',pilihan_tiga: 'C',pilihan_empat: 'D',jawaban: '2',no_soal: 1,page: 52};
  describe('POST /:paketSoalId/soal-structure', () => {
    it('membuat soal jika semua data valid', async () => {
      Soal.count.mockResolvedValue(0);
      Soal.create.mockResolvedValue({ id: 1, ...validBody });
      const res = await request(app)
        .post('/admin/paket-soal/1/soal-structure')
        .send(validBody);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'Soal berhasil ditambahkan');
      expect(Soal.count).toHaveBeenCalledWith({
        where: { kategori: 'structure', paket_soal_id: '1' }
      });
      expect(Soal.create).toHaveBeenCalledWith(expect.objectContaining({
        soal: validBody.soal,
        kategori: 'structure'
      }));
    });
  });
  describe('GET /:paketSoalId/soal-structure', () => {
    it('mendapatkan seluruh soal', async () => {
      const dummySoal = [{ id: 1, soal: 'Contoh soal structure', pilihan_satu: 'A', pilihan_dua: 'B', pilihan_tiga: 'C', pilihan_empat: 'D', jawaban: '2', page: 52, no_soal: 1,} ];
      Soal.findAll.mockResolvedValue(dummySoal);
      const res = await request(app).get('/admin/paket-soal/1/soal-structure');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Daftar soal structure berhasil diambil');
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(Soal.findAll).toHaveBeenCalledWith(expect.objectContaining({
        where: {
          paket_soal_id: '1',
          kategori: 'structure'
        }
      }));
    });
  });
  describe('PUT /soal-structure/:soalId', () => {
    it('mengupdate data', async () => {
      const soalId = 1;
      const bodyUpdate = {soal: 'Updated soal', pilihan_satu: 'A', pilihan_dua: 'B', pilihan_tiga: 'C', pilihan_empat: 'D', jawaban: '3', no_soal: 2, page: 53 };
      Soal.findOne.mockResolvedValue({ id: soalId });
      Soal.update.mockResolvedValue([1]);
      Soal.findByPk.mockResolvedValue({ id: soalId, ...bodyUpdate });
      const res = await request(app)
        .put(`/admin/paket-soal/soal-structure/${soalId}`)
        .send(bodyUpdate);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Soal structure berhasil diupdate');
      expect(res.body.data).toHaveProperty('id', soalId);
      expect(Soal.findOne).toHaveBeenCalledWith({ where: { id: `${soalId}`, kategori: 'structure' } });
      expect(Soal.update).toHaveBeenCalledWith(expect.objectContaining(bodyUpdate), {
        where: { id: `${soalId}` } // pastikan ini string
      });
    });
  });
});
