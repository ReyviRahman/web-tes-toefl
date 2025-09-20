const request = require('supertest');
const { Model } = require('sequelize');

class MockUser extends Model {}
jest.mock('../models/users', () => MockUser);

class MockExamHistory extends Model {}
MockExamHistory.findAndCountAll = jest.fn();
jest.mock('../models/exam_history', () => MockExamHistory);

jest.mock('../middleware/authAdmin', () => (req, res, next) => next());
jest.mock('../models/payment', () => ({}));

const app = require('../app');

describe('GET /admin/riwayat-ujian', () => {
  it('harus mengembalikan daftar riwayat ujian beserta nama user', async () => {
    const dummyHistory = [
      {
        id: 1,
        userNohp: '08123456789',
        paket_soal_id: 2,
        skor_listening: 40,
        created_at: '2025-07-31T10:00:00.000Z',
        user: { nama: 'Budi' }
      }
    ];
    MockExamHistory.findAndCountAll.mockResolvedValue({
      count: 1,
      rows: dummyHistory
    });

    const res = await request(app).get('/admin/riwayat-ujian');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.histories)).toBe(true);
    expect(res.body.histories[0].user.nama).toBe('Budi');
    expect(res.body.totalPages).toBe(1);
    expect(res.body.currentPage).toBe(1);
    expect(res.body.totalItems).toBe(1);

    const User = require('../models/users');
    expect(MockExamHistory.findAndCountAll).toHaveBeenCalledWith({
      include: [{ model: User, as: 'user', attributes: ['nama'] }],
      order: [['created_at', 'DESC']],
      limit: 10,
      offset: 0
    });
  });
});
