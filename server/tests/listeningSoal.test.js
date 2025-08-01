const request = require('supertest');
const app = require('../app');
const path = require('path');
const fs = require('fs');
const Soal = require('../models/soal');

jest.mock('../models/soal', () => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  findByPk: jest.fn(),
  count: jest.fn(),
  create: jest.fn(),
}));
jest.mock('../models/question', () => ({}));
jest.mock('../models/paket_soal', () => ({}));
jest.mock('../middleware/authAdmin', () => (req, res, next) => {
  req.user = { role: 'Admin', nohp: '08123456789' };
  next();
});

describe('Listening Soal API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('POST /:id/soal-listening - create soal success', async () => {
    Soal.count.mockResolvedValue(10);
    Soal.create.mockResolvedValue({
      id: 1,
      pilihan_satu: 'A',
      pilihan_dua: 'B',
      pilihan_tiga: 'C',
      pilihan_empat: 'D',
      jawaban: '1',
      audio: '/uploads/audio/audio-listening.mp3',
      no_soal: 1,
      page: 1,
      kategori: 'listening'
    });
    const res = await request(app)
      .post('/admin/paket-soal/123/soal-listening')
      .field('pilihan_satu', 'A')
      .field('pilihan_dua', 'B')
      .field('pilihan_tiga', 'C')
      .field('pilihan_empat', 'D')
      .field('jawaban', '1')
      .field('no_soal', '1')
      .field('page', '1')
      .attach('audio', path.join(__dirname, 'audio-listening.mp3'));
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Soal berhasil ditambahkan');
    expect(Soal.create).toHaveBeenCalled();
  });
  it('GET /:id/soal-listening - return list', async () => {
    Soal.findAll.mockResolvedValue([
      {
        id: 1,
        pilihan_satu: 'A',
        pilihan_dua: 'B',
        pilihan_tiga: 'C',
        pilihan_empat: 'D',
        jawaban: '1',
        page: 1,
        audio: '/uploads/audio/audio-listening.mp3',
        no_soal: 1
      }
    ]);
    const res = await request(app).get('/admin/paket-soal/123/soal-listening');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Daftar soal listening berhasil diambil');
    expect(Array.isArray(res.body.data)).toBe(true);
  });
  it('PUT /:id/soal-listening - update success', async () => {
    const dummySoal = {
      id: 1,
      pilihan_satu: 'X',
      pilihan_dua: 'Y',
      pilihan_tiga: 'Z',
      pilihan_empat: 'W',
      jawaban: '4',
      page: 1,
      no_soal: 1,
      audio: '/uploads/audio/old-audio.mp3',
      save: jest.fn().mockResolvedValue()
    };
    Soal.findOne.mockResolvedValue(dummySoal);
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'unlinkSync').mockImplementation(() => {});
    const res = await request(app)
      .put('/admin/paket-soal/1/soal-listening')
      .field('pilihan_satu', 'A')
      .field('pilihan_dua', 'B')
      .field('pilihan_tiga', 'C')
      .field('pilihan_empat', 'D')
      .field('jawaban', '2')
      .field('page', '1')
      .field('no_soal', '1')
      .attach('audio', path.join(__dirname, 'audio-listening.mp3'));
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Soal berhasil diperbarui.');
  });
  it('DELETE /soal/:id - delete success', async () => {
    const dummySoal = {
      id: 1,
      audio: '/uploads/audio/sample.mp3',
      destroy: jest.fn().mockResolvedValue(),
    };
    Soal.findByPk.mockResolvedValue(dummySoal);
    jest.spyOn(fs, 'unlink').mockImplementation((_, cb) => cb(null));
    const res = await request(app).delete('/admin/paket-soal/soal/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Soal dan audio berhasil dihapus.');
  });
});
