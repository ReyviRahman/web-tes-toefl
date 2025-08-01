const request = require('supertest');
const app = require('../app');

// MOCK semua model yang menyebabkan relasi error
jest.mock('../models/payment', () => ({})); // RELASI ERROR DI SINI
jest.mock('../models/exam_history', () => ({})); // kalau ini juga dipakai
jest.mock('../models/users', () => ({
  findAll: jest.fn(),
}));

// Optional: mock auth jika route pakai middleware
jest.mock('../middleware/authAdmin', () => (req, res, next) => next());

const User = require('../models/users');

describe('GET /admin/user', () => {
  it('harus mengembalikan daftar user dengan role "User"', async () => {
    const dummyUsers = [ { id: 1, nama: 'Ani', role: 'User' },{ id: 2, nama: 'Budi', role: 'User' }];
    User.findAll.mockResolvedValue(dummyUsers);
    const res = await request(app).get('/admin/user');
    expect(res.status).toBe(200);
    expect(User.findAll).toHaveBeenCalledWith({ where: { role: 'User' } });
  });
});
