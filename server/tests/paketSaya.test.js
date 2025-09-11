jest.mock('../middleware/verifyToken', () =>
  (req, res, next) => {
    req.user = { nohp: '08123456789' };
    next();
  }
);

const request = require('supertest');
const app = require('../app'); 

jest.mock('../models/payment', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn()
}));

const Payment = require('../models/payment');

describe('GET /users/payment', () => {
  afterEach(() => {jest.clearAllMocks();});
  it('harus mengembalikan daftar pembayaran user berdasarkan nohp user', async () => {
    const dummyPayments = [{nama_paket: 'Paket A',buktiBayar: 'bukti-a.jpg',status: 'pending',alasan_penolakan: null},{nama_paket: 'Paket B',buktiBayar: 'bukti-b.jpg',status: 'ditolak',alasan_penolakan: 'Gambar buram'}];
    Payment.findAll.mockResolvedValue(dummyPayments);
    const res = await request(app).get('/users/payment');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(dummyPayments);
    expect(Payment.findAll).toHaveBeenCalledWith({where: { user_nohp: '08123456789' },order: [['createdAt', 'DESC']],attributes: ['nama_paket', 'buktiBayar', 'status', 'alasan_penolakan'],});
  });
});
