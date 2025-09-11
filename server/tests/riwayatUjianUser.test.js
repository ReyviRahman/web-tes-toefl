const request = require('supertest');
const { Model } = require('sequelize');

class MockUser extends Model {}
jest.mock('../models/users', () => MockUser);

class MockExamHistory extends Model {}
MockExamHistory.findAll = jest.fn();
jest.mock('../models/exam_history', () => MockExamHistory);
jest.mock('../models/payment', () => ({}));

jest.mock('../middleware/verifyToken', () => (req, res, next) => {
  req.user = { nohp: '08123456789' }; 
  next();
});

const app = require('../app');

describe('GET /users/riwayat-ujian', () => {
  it('✅ mengembalikan histori ujian untuk user yang sudah login', async () => {
    const dummyHistories = [{id: 1,userNohp: '08123456789',skor_total: 550,created_at: '2025-08-02T00:00:00Z',user: { nama: 'John Doe' }}];
    MockExamHistory.findAll.mockResolvedValue(dummyHistories);
    const res = await request(app).get('/users/riwayat-ujian');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('skor_total');
    expect(res.body[0].user).toHaveProperty('nama', 'John Doe');
  });
});
