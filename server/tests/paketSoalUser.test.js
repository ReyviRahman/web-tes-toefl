const request = require('supertest');
const app = require('../app');

jest.mock('../models/paket_soal');
const PaketSoal = require('../models/paket_soal');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('GET /paket-soal', () => {
  afterEach(() => {jest.clearAllMocks();});
  it('harus mengembalikan status 200 dan daftar paket soal dengan status "siap"', async () => {
    const mockData = [{ id: 1, nama: 'Paket 1', status: 'siap' },{ id: 2, nama: 'Paket 2', status: 'siap' },];
    PaketSoal.findAll.mockResolvedValue(mockData);
    const res = await request(app).get('/paket-soal');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
    expect(PaketSoal.findAll).toHaveBeenCalledWith({ where: { status: 'siap' } });
  });
});
describe('GET /paket-soal/:paketId', () => {
  afterEach(() => {jest.clearAllMocks();});
  it('harus mengembalikan status 200 dan data paket jika ditemukan', async () => {
    const mockPaket = { id: 1, nama: 'Paket 1', status: 'siap' };
    PaketSoal.findByPk.mockResolvedValue(mockPaket);
    const res = await request(app).get('/paket-soal/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockPaket);
    expect(PaketSoal.findByPk).toHaveBeenCalledWith('1'); 
  });
});
