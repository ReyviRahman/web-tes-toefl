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

describe('Soal Written Endpoint', () => {
  const paketSoalId = '123';
  describe('POST /admin/paket-soal/:paketSoalId/soal-written', () => {
    it('mengembalikan 201 dan membuat soal saat data valid', async () => {
      Soal.count.mockResolvedValue(0);
      const dummySoal = {id: 1,soal: 'Kalimat dengan kesalahan tata bahasa',jawaban: '2',page: 70,no_soal: 1,pilihan_satu: '',pilihan_dua: '',pilihan_tiga: '',pilihan_empat: '',audio: '',paket_soal_id: paketSoalId,q_reading: 0,kategori: 'written'};
      Soal.create.mockResolvedValue(dummySoal);
      const res = await request(app)
        .post(`/admin/paket-soal/${paketSoalId}/soal-written`)
        .send({soal: 'Kalimat dengan kesalahan tata bahasa',jawaban: '2',page: 70,no_soal: 1});
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'Soal berhasil ditambahkan');
    });
  });
  describe('GET /admin/paket-soal/:paketSoalId/soal-written', () => {
    it('mengembalikan 200 dan daftar soal written', async () => {
      const soalList = [{id: 1,soal: 'Soal 1',jawaban: '1',page: 70,no_soal: 1},{id: 2,soal: 'Soal 2',jawaban: '3',page: 71,no_soal: 2}];
      Soal.findAll.mockResolvedValue(soalList);
      const res = await request(app)
        .get(`/admin/paket-soal/${paketSoalId}/soal-written`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Daftar soal written berhasil diambil');
    });
  });
});
