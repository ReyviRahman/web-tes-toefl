jest.mock('../middleware/verifyToken', () =>
  (req, res, next) => {
    req.user = { nohp: '08123456789' };
    next();
  }
);


const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../app');

jest.mock('../models/payment', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn()
}));

const Payment = require('../models/payment');

describe('POST /payment/upload', () => {
  afterEach(() => {jest.clearAllMocks();});
  it('harus mengembalikan 201 jika upload bukti berhasil', async () => {
    const dummyPath = path.join(__dirname, 'dummy-bukti.jpg');
    fs.writeFileSync(dummyPath, 'dummy content');
    Payment.create.mockResolvedValue({id: 1,userNohp: '08123456789',paket_soal_id: 1,status: 'pending',buktiBayar: 'dummy-bukti.jpg',nama_paket: 'Paket A'});
    const res = await request(app)
      .post('/payment/upload')
      .field('paket_soal_id', '1')
      .field('namaPaket', 'Paket A')
      .attach('bukti', dummyPath);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Bukti pembayaran berhasil diunggah. Mohon tunggu verifikasi admin.');
    expect(Payment.create).toHaveBeenCalled();
    fs.unlinkSync(dummyPath); 
  });
});
