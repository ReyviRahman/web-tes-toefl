const express = require('express')
const router = express.Router()

const TEST_DURATION_MS  = 60 * 60 * 1000;  // 1 jam
const GRACE_PERIOD_MS   = 60 * 1000;       // 1 menit (boleh telat)

const sessions = new Map(); // key = userId
router.post('/', (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId diperlukan' });

  const startTime = Date.now();                 // UTC timestamp ms
  const endTime   = startTime + TEST_DURATION_MS;

  sessions.set(userId, { startTime, endTime });
  return res.json({
    startTime,
    endTime,
    serverNow: Date.now(),                      // utk sync offset kalau mau
    durationMs: TEST_DURATION_MS
  });
});

router.post('/submit-test', (req, res) => {
  const { userId, answers } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId diperlukan' });

  const session = sessions.get(userId);
  if (!session) return res.status(404).json({ error: 'Session tidak ditemukan' });

  const now = Date.now();
  const { endTime } = session;

  if (now > endTime + GRACE_PERIOD_MS) {
    return res.status(403).json({ error: 'Waktu tes sudah habis (termasuk grace-period).' });
  }

  // TODO: simpan `answers` ke database
  console.log('Jawaban diterima:', { userId, answers, receivedAt: now });

  return res.json({ success: true, receivedAt: now });
});



module.exports = router