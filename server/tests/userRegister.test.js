const request = require('supertest');
const app = require('../app'); 
const User = require('../models/users');

jest.mock('../models/payment', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
}));

jest.mock('../models/users', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
}));

jest.mock('../middleware/authAdmin', () => (req, res, next) => next());
jest.mock('../models/exam_history', () => ({})); 

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('POST /users/register', () => {
  afterEach(() => {jest.clearAllMocks();});
  it('berhasil mendaftarkan user baru', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({toJSON: () => ({id: 1,nohp: '08123456789',nama: 'John Doe',email: 'john@example.com',role: 'User'})});
    const res = await request(app).post('/users/register').send({nohp: '08123456789',nama: 'John Doe',email: 'john@example.com',password: 'secret123'});
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User berhasil dibuat');
    expect(res.body.user).not.toHaveProperty('password');
  });
  it('mengembalikan 400 jika validasi input gagal', async () => {
    const res = await request(app).post('/users/register').send({nohp: 'invalid-number',nama: '',email: 'not-an-email',password: '123'});
    expect(res.statusCode).toBe(400);
    expect(res.body.errors.length).toBeGreaterThan(0);
  });
  it('mengembalikan 409 jika user sudah terdaftar', async () => {
    User.findOne.mockResolvedValue({ id: 1 });
    const res = await request(app).post('/users/register').send({nohp: '08123456789',nama: 'Jane Doe',email: 'jane@example.com',password: 'secret123'});
    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('message', 'User dengan nomor HP atau email ini sudah terdaftar');
  });
  it('mengembalikan 500 jika terjadi kesalahan server', async () => {
    User.findOne.mockRejectedValue(new Error('Database error'));
    const res = await request(app).post('/users/register').send({nohp: '08123456789',nama: 'Jane Doe',email: 'jane@example.com',password: 'secret123'});
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('message', 'Terjadi kesalahan server');
  });
});

