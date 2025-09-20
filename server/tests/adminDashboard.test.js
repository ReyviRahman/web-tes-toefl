const request = require('supertest');
const express = require('express');
const router = require('../routes/adminDashboard'); 

jest.mock('../middleware/authAdmin', () => (req, res, next) => next());

jest.mock('../models/exam_history', () => {
  return {
    count: jest.fn(),
    findOne: jest.fn(),
    belongsTo: jest.fn(), 
  };
});

jest.mock('../models/users', () => {
  return {
    count: jest.fn(),
    findOne: jest.fn(),
  };
});

jest.mock('../models/payment', () => {
  return {
    count: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    sequelize: { fn: jest.fn(), col: jest.fn(), literal: jest.fn() }, 
  };
});

jest.mock('../models/paket_soal', () => ({}));

const User = require('../models/users');
const ExamHistory = require('../models/exam_history');
const Payment = require('../models/payment');
const PaketSoal = require('../models/paket_soal');

const app = express();
app.use('/admin/dashboard', router);

describe('GET /admin/dashboard (Dashboard)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('mengembalikan data dashboard dengan benar', async () => {
    // Mock User.count
    User.count.mockResolvedValue(10);

    // Mock ExamHistory.count
    ExamHistory.count.mockResolvedValue(5);

    // Mock Payment.count (pending payments)
    Payment.count.mockResolvedValue(2);

    // Mock ExamHistory.findOne
    ExamHistory.findOne.mockResolvedValue({
      user: { nama: 'Budi' },
      nama_paket: 'TOEFL Basic',
      totalScore: 500,
    });

    // Mock User.findOne
    User.findOne.mockResolvedValue({ nama: 'Siti' });

    // Mock Payment.findOne
    Payment.findOne.mockResolvedValue({
      User: { nama: 'Andi' },
    });

    // Mock Payment.findAll dipanggil 2x:
    // 1st call -> confirmedPayments (revenue)
    // 2nd call -> topPaketSoal
    Payment.findAll
      .mockResolvedValueOnce([
        { paket_soal_id: 1 },
        { paket_soal_id: 2 },
        { paket_soal_id: 9 },
      ])
      .mockResolvedValueOnce([
        { paket_soal_id: 1, nama_paket: 'TOEFL Basic', total: 3 },
        { paket_soal_id: 2, nama_paket: 'TOEFL Intermediate', total: 2 },
        { paket_soal_id: 3, nama_paket: 'TOEFL Advanced', total: 1 },
      ]);

    const res = await request(app).get('/admin/dashboard');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: 'Berhasil mengambil data dashboard',
      totalUsers: 10,
      totalSimulation: 5,
      totalRevenue: 65000, // 20k (id 1) + 25k (id 2) + 20k (id 9)
      pendingPayments: 2,
      latestActivity: 'Budi baru saja menyelesaikan simulasi TOEFL Basic dengan skor 500',
      latestUserRegister: 'Siti baru saja mendaftarkan akun',
      latestUserPayment: 'Andi melakukan pembayaran',
      topPaketSoal: [
        { paket_soal_id: 1, nama_paket: 'TOEFL Basic', total: 3 },
        { paket_soal_id: 2, nama_paket: 'TOEFL Intermediate', total: 2 },
        { paket_soal_id: 3, nama_paket: 'TOEFL Advanced', total: 1 },
      ],
    });
  });
});
