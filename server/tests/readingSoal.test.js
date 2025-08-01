jest.mock('../models/paket_soal', () => ({}));
jest.mock('../models/question', () => ({}));
jest.mock('../models/payment', () => ({}));
jest.mock('../models/exam_history', () => ({}));

jest.mock('../models/soal', () => ({
  count: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  findByPk: jest.fn()
}));

jest.mock('../middleware/authAdmin', () => (req, res, next) => {
  req.user = { role: 'Admin', nohp: '08123456789' };
  next();
});

jest.mock('../models/users', () => ({
  findOne: jest.fn()
}));

const request = require('supertest');
const app = require('../app');

const Soal = require('../models/soal');

describe('Endpoint Soal Reading', () => {
  const id = 1;
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('POST /admin/paket-soal/:id/soal-reading', () => {
    it('Soal berhasil ditambahkan', async () => {
      const dummySoal = {soal: 'Contoh soal Reading',pilihan_satu: 'A',pilihan_dua: 'B',pilihan_tiga: 'C',pilihan_empat: 'D',jawaban: '1',no_soal: 1,page: 100,q_reading: 'Q1'};
      Soal.count.mockResolvedValue(10);
      Soal.create.mockResolvedValue({ id: 99, ...dummySoal });
      const res = await request(app)
        .post(`/admin/paket-soal/${id}/soal-reading`)
        .send(dummySoal);
      expect(res.status).toBe(201);
    });
  });
  describe('GET /admin/paket-soal/:id/soal-reading', () => {
    it('Berhasil mendapatkan array soal', async () => {
      Soal.findAll.mockResolvedValue([{ id: 1, soal: 'Soal 1', kategori: 'reading', paket_soal_id: id },{ id: 2, soal: 'Soal 2', kategori: 'reading', paket_soal_id: id }]);
      const res = await request(app)
        .get(`/admin/paket-soal/${id}/soal-reading`);
      expect(res.status).toBe(200);
    });
  });
  describe('PUT /admin/paket-soal/soal-reading/:soalId', () => {
    const soalId = 999;
    const updatedPayload = {soal: 'Soal updated',pilihan_satu: 'A1',pilihan_dua: 'B1',pilihan_tiga: 'C1',pilihan_empat: 'D1',jawaban: '2',q_reading: '4',no_soal: 2,page: 100};
    it('Soal berhasil diupdate', async () => {
      Soal.findOne.mockResolvedValue({ id: soalId });
      Soal.update.mockResolvedValue([1]);
      Soal.findByPk.mockResolvedValue({ id: soalId, ...updatedPayload});
      const res = await request(app)
        .put(`/admin/paket-soal/soal-reading/${soalId}`)
        .send(updatedPayload);
      expect(res.status).toBe(200);
    });
  });
});
