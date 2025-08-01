const request = require('supertest');
const app = require('../app'); 

describe('POST /users/login', () => {
  it('❌ Gagal login jika nomor HP tidak valid', async () => {
    const res = await request(app).post('/users/login').send({
      nohp: '123', 
      password: 'password123',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Nomor HP tidak valid');
  });
  

  it('❌ Gagal login jika password terlalu pendek', async () => {
    const res = await request(app).post('/users/login').send({
      nohp: '081999000123',
      password: '123',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Password minimal 6 karakter');
  });

  it('❌ Gagal login jika password salah', async () => {
    const res = await request(app).post('/users/login').send({
      nohp: '081999000123',
      password: 'salah123',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid password');
  });

  it('✅ Berhasil login jika data benar', async () => {
    const res = await request(app).post('/users/login').send({
      nohp: '081999000123',
      password: 'password123',
    });

    expect(res.statusCode).toBe(200);
  });
});
