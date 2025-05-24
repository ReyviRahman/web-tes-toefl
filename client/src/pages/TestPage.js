/*  React component  –  hitung mundur + submit
    Jalankan: npm i react react-dom
*/
import React, { useEffect, useRef, useState } from 'react';

// HARUS sama dgn backend
const GRACE_PERIOD_MS = 60 * 1000; // 1 menit

export default function TestPage({ userId }) {
  const [remaining, setRemaining]   = useState(null);   // ms (+/-)
  const [endTime,   setEndTime]     = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const intervalRef = useRef(null);

  // ---------- Start test ----------
  useEffect(() => {
    fetch('http://localhost:3001/start-test/', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ userId }),
    })
      .then(r => r.json())
      .then(({ endTime: srvEnd }) => {
        setEndTime(srvEnd);
        tick(srvEnd);                                // run sekali
        intervalRef.current = setInterval(() => tick(srvEnd), 1000);
      })
      .catch(console.error);

    return () => clearInterval(intervalRef.current);
  }, [userId]);

  // ---------- Hitung mundur ----------
  const tick = (srvEnd) => {
    const diff = srvEnd - Date.now(); // bisa negatif setelah habis
    setRemaining(diff);

    // Auto-submit begitu <0 (waktu resmi habis) tapi masih dalam grace
    if (diff <= 0 && diff > -GRACE_PERIOD_MS && !isSubmitting) {
      autoSubmit();
    }

    // Hentikan interval bila grace-period terlewati
    if (diff <= -GRACE_PERIOD_MS) clearInterval(intervalRef.current);
  };

  // ---------- Submit ----------
  const autoSubmit = async () => {
    await submitAnswers(true);
  };

  const manualSubmit = async () => {
    if (remaining <= -GRACE_PERIOD_MS) {
      alert('Maaf, waktu habis — tidak bisa submit.');
      return;
    }
    await submitAnswers(false);
  };

  const submitAnswers = async (auto) => {
    setSubmitting(true);
    try {
      const res  = await fetch('http://localhost:3001/submit-test', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          userId,
          answers: { /* … kumpulkan jawaban … */ },
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      alert(auto ? 'Auto-submit berhasil!' : 'Jawaban terkirim!');
      // TODO: redirect ke halaman hasil
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- Util format ----------
  const fmt = (ms) => {
    if (ms == null) return '--:--:--';
    const pos = Math.max(ms, 0);
    const s   = Math.floor(pos / 1000);
    const hh  = String(Math.floor(s / 3600)).padStart(2, '0');
    const mm  = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const ss  = String(s % 60).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  };

  // ---------- Flags ----------
  const inGrace  = remaining !== null && remaining <= 0 && remaining > -GRACE_PERIOD_MS;
  const locked   = remaining !== null && remaining <= -GRACE_PERIOD_MS;

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 420, margin: '2rem auto' }}>
      <h2>TOEFL Online Test</h2>
      <p>Sisa waktu: <strong>{fmt(remaining)}</strong></p>

      {inGrace && (
        <p style={{ color: 'orange' }}>
          ⏳ Waktu resmi habis. Anda punya 1&nbsp;menit grace-period untuk submit!
        </p>
      )}
      {locked && (
        <p style={{ color: 'red' }}>
          ❌ Grace-period selesai. Jawaban tidak akan diterima.
        </p>
      )}

      <button
        onClick={manualSubmit}
        disabled={locked || isSubmitting}
        style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}
      >
        {isSubmitting ? 'Mengirim…' : 'Submit Sekarang'}
      </button>
    </div>
  );
}
