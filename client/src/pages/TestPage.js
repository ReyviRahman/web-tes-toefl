import React, { useState, useRef, useEffect } from "react";

const questions = [
  { id: 1, audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: 3, audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
];

export default function TestPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const audioRef = useRef(null);

  // Mainkan audio otomatis saat soal berubah
  useEffect(() => {
    setHasPlayed(false);

    // Coba play audio, jika gagal karena autoplay policy, user harus interaksi dulu
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // autoplay gagal, bisa kasih notifikasi ke user agar klik tombol play manual
        console.log("Autoplay gagal, butuh interaksi user");
      });
    }
  }, [currentIndex]);

  const handlePlay = () => {
    if (!hasPlayed) {
      setHasPlayed(true);
    } else {
      // Kalau sudah pernah play, langsung pause supaya gak replay
      audioRef.current.pause();
    }
  };

  const handleEnded = () => {
    setHasPlayed(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h3>Soal Audio #{questions[currentIndex].id}</h3>

      <audio
        ref={audioRef}
        src={questions[currentIndex].audio}
        onPlay={handlePlay}
        onEnded={handleEnded}
        controls={false} // sembunyikan kontrol player
      />

      {!hasPlayed && (
        <p style={{ color: "blue" }}>
          Audio sedang diputar otomatis, tunggu sampai selesai...
        </p>
      )}

      <button onClick={handleNext} style={{ marginTop: 10 }}>
        Soal Berikutnya
      </button>
    </div>
  );
}
