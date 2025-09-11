const request = require('supertest');
const express = require('express');
const router = require('../routes/adminPayments'); // path ke router-mu

const app = express();
app.use(express.json());
app.use('/admin/payments', router);

jest.mock('../middleware/authAdmin', () => (req, res, next) => next());

describe('Admin Payments Endpoint', () => {
  it('GET /admin/payments harus return 200', async () => {
    const res = await request(app).get('/admin/payments');
    expect(res.status).toBe(200);
  });

  it('PUT /admin/payments/:id/status harus bisa update', async () => {
    const res = await request(app)
      .put(`/admin/payments/16/status`)
      .send({ status: 'confirmed' });

    expect(res.status).toBe(200);
    expect(res.body.payment.status).toBe('confirmed');
  });
});
