const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

describe('GET /soal', () => {
  const existingUser = {
    nohp: '081372157714', 
  };

  const secretKey = 'reyvisacd123'; 
  const token = jwt.sign({ nohp: existingUser.nohp }, secretKey);

  it('✅ mengembalikan soal jika user punya paket aktif', async () => {
    const res = await request(app)
      .get('/soal')
      .set('Cookie', [`cookieToken=${token}`]);
    if (res.statusCode !== 200) {
      console.error('❌ RESPONSE STATUS:', res.statusCode);
      console.error('❌ RESPONSE BODY:', res.body);
    }

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('soal');
    expect(Array.isArray(res.body.soal)).toBe(true);
    expect(res.body.metadata).toBe('Get soal by paket_soal_id_aktif user');
  });
});

describe('POST /soal/jawaban', () => {
  const existingUser = {
    nohp: '081372157714', 
  };
  const token = jwt.sign({ nohp: existingUser.nohp }, 'reyvisacd123');
  const answerUser = [
    { id: 1, answer: '1' },
    { id: 2, answer: '2' },
    { id: 3, answer: '3' },
  ];

  it('✅ mengembalikan skor jika jawaban dikirim dengan benar', async () => {
    const res = await request(app)
      .post('/soal/jawaban')
      .set('Cookie', [`cookieToken=${token}`])
      .send({
        nohp: existingUser.nohp,
        answers: answerUser
      });

    if (res.statusCode !== 200) {
      console.error('❌ RESPONSE STATUS:', res.statusCode);
      console.error('❌ RESPONSE BODY:', res.body);
    }

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('toeflScore');
    expect(res.body).toHaveProperty('scoreListening');
    expect(res.body).toHaveProperty('scoreWritten');
    expect(res.body).toHaveProperty('scoreReading');
    expect(res.body).toHaveProperty('listeningCorrect');
    expect(res.body).toHaveProperty('writtenCorrect');
    expect(res.body).toHaveProperty('readingCorrect');
  });
});
