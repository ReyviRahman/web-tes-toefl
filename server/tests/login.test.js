const request = require('supertest');
const app = require('../app'); 

describe('POST /users/login', () => {
  it('Gagal login jika identifier kosong', async () => {
    const res = await request(app).post('/users/login').send({
      identifier: '', 
      password: 'password123',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Email atau NoHP wajib diisi');
  });

  it('Gagal login jika password terlalu pendek (<8)', async () => {
    const res = await request(app).post('/users/login').send({
      identifier: '081999000123',
      password: '12345',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Password minimal 8 karakter');
  });

  it('Gagal login jika user tidak ditemukan', async () => {
    const res = await request(app).post('/users/login').send({
      identifier: '081372157000',
      password: 'password123',
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });

  it('Gagal login jika password salah', async () => {
    const res = await request(app).post('/users/login').send({
      identifier: '081372157714',
      password: 'salah1234',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid password');
  });

  it('Berhasil login jika data benar', async () => {
    const res = await request(app).post('/users/login').send({
      identifier: 'admin@gmail.com',
      password: 'reyvisacd123', 
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.metadata).toBe('Login success');
  });
});
