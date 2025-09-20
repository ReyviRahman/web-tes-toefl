const request = require('supertest');
const app = require('../app');

jest.mock('../models/payment', () => ({})); 
jest.mock('../models/exam_history', () => ({})); 
jest.mock('../models/users', () => ({
  findAndCountAll: jest.fn(), // <--- ganti findAll ke findAndCountAll
}));

jest.mock('../middleware/authAdmin', () => (req, res, next) => next());

const User = require('../models/users');

describe('GET /admin/user', () => {
  it('harus mengembalikan daftar user dengan role "User"', async () => {
    const dummyUsers = [
      { id: 1, nama: 'Ani', role: 'User' },
      { id: 2, nama: 'Budi', role: 'User' }
    ];

    User.findAndCountAll.mockResolvedValue({
      count: dummyUsers.length,
      rows: dummyUsers
    });

    const res = await request(app).get('/admin/user');

    expect(res.status).toBe(200);
    expect(res.body.users).toEqual(dummyUsers); // cek hasil response
    expect(User.findAndCountAll).toHaveBeenCalledWith(expect.objectContaining({
      where: { role: 'User' }
    }));
  });
});
