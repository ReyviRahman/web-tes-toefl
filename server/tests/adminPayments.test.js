const request = require('supertest');
const app = require('../app'); // asumsi app sudah require route adminPayments
const Payment = require('../models/payment');
const User = require('../models/users');

// Mock model dan middleware
jest.mock('../models/payment', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
}));
jest.mock('../models/users', () => ({
  update: jest.fn(),
}));
jest.mock('../middleware/authAdmin', () => (req, res, next) => next());
jest.mock('../models/exam_history', () => ({})); // penting agar tidak error

describe('Admin Payments Endpoint', () => {
  let mockSave;

  const dummyPayment = {
    id: 1,
    userNohp: '08123456789',
    paket_soal_id: 2,
    status: 'pending',
  };

  beforeEach(() => {
    mockSave = jest.fn();
    jest.clearAllMocks();
  });

  describe('GET /admin/payments', () => {
    it('harus mengembalikan daftar pembayaran', async () => {
      Payment.findAll.mockResolvedValue([{id: 1,status: 'pending',userNohp: '08123456789',user: { nama: 'Budi' }}]);
      const res = await request(app).get('/admin/payments');
      expect(res.status).toBe(200);
    });
  });
  describe('PUT /admin/payments/:id/status', () => {
    it('harus mengubah status pembayaran menjadi confirmed dan memperbarui status user', async () => {
      Payment.findByPk.mockResolvedValue({ ...dummyPayment, save: mockSave });
      User.update.mockResolvedValue([1]);
      const res = await request(app)
        .put('/admin/payments/1/status')
        .send({ status: 'confirmed' });
      expect(res.status).toBe(200);
      expect(Payment.findByPk).toHaveBeenCalledWith('1');
      expect(mockSave).toHaveBeenCalled();
      expect(User.update).toHaveBeenCalledWith(
        {
          status_ujian: 'sedang_ujian',
          paket_soal_id_aktif: dummyPayment.paket_soal_id,
          end_time: null,
        },
        { where: { nohp: dummyPayment.userNohp } }
      );
    });
    it('harus mengubah status pembayaran menjadi rejected dan menyimpan alasan penolakan', async () => {
      Payment.findByPk.mockResolvedValue({ ...dummyPayment, save: mockSave });
      const res = await request(app)
        .put('/admin/payments/1/status')
        .send({ status: 'rejected', alasanPenolakan: 'Bukti tidak jelas' });
      expect(res.status).toBe(200);
      expect(res.body.payment.alasanPenolakan).toBe('Bukti tidak jelas');
    });
  });
});

