import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavbarUser from '../../components/NavbarUser';
import Main from '../../components/Main';
import { useNavigate } from 'react-router-dom';
import FloatingWAButton from '../../components/FloatingWAButton';
import DownloadSertifButton from '../../components/DownloadSertifButton';

const PilihPaketSoal = () => {
  const [score, setScore] = useState('0')
  const [isLastScore, setIsLastScore] = useState(false)
  const [scoreListening, setScoreListening] = useState('0')
  const [scoreWritten, setScoreWritten] = useState('0')
  const [scoreReading, setScoreReading] = useState('0')
  const [correctListening, setCorrectListening] = useState('0')
  const [correctWritten, setCorrectWritten] = useState('0')
  const [correctReading, setCorrectReading] = useState('0')
  const [lastPaket, setLastPaket] = useState('')
  const navigate = useNavigate();
  const [paketList, setPaketList] = useState(null);

  const fetchHalamanPaketSoal = async () => {
    try {
      Swal.fire({
        title: "Loading...",
        text: "Mohon Tunggu",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      // Cek Akses
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/cek-akses`, { withCredentials: true });

      if (data.bolehAkses) {
        // langsung ke simulasi
        navigate(`/simulasi-toefl/${data.paketId}`);
      }

      // Get Score
      const responseGetLastScore = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users/lastScore`,
        { withCredentials: true }
      );
      if (responseGetLastScore.data.lastScore !== -1) {
        setScore(responseGetLastScore.data.lastScore)
        setScoreListening(responseGetLastScore.data.scoreListening)
        setScoreWritten(responseGetLastScore.data.scoreWritten)
        setScoreReading(responseGetLastScore.data.scoreReading)
        setCorrectListening(responseGetLastScore.data.listeningCorrect)
        setCorrectWritten(responseGetLastScore.data.writtenCorrect)
        setCorrectReading(responseGetLastScore.data.readingCorrect)
        setLastPaket(responseGetLastScore.data.lastPaket)
        setIsLastScore(true)
      }

      // Fetch Paket Soal
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/paket-soal`);
      setPaketList(response.data);
      
      
      Swal.close()
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
      } else {
        console.error("Error fetching score:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch score. Please try again later.",
        });

      }
    }
  }

  useEffect(() => {
    fetchHalamanPaketSoal();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchHalamanPaketSoal();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);


  const handlePilih = async (paketId, hargaPaket) => {
    try {
      Swal.fire({
        title: 'Mohon Tunggu',
        text: 'Sedang memeriksa akses Anda...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users/cek-akses/${paketId}`,
        { withCredentials: true }
      );

      Swal.close();
      const data = response.data;
      if (data.bolehAkses) {
        navigate(`/simulasi-toefl/${paketId}`);
      } else if (data.pending) {
        Swal.fire({
          title: 'Menunggu Verifikasi',
          text: data.alasan,
          icon: 'info',
          confirmButtonText: 'Ok',
        })
      } else {
        navigate(`/bayar/${paketId}`, {
          state: {
            hargaPaket
          }
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
      } else {
        console.error('Gagal cek akses:', error);
        Swal.close(); // Tutup loading kalau error juga
        Swal.fire('Error', 'Terjadi kesalahan saat menghubungi server', 'error');

      }
    }
  };

  return (
    <div className='mb-6'>
      <NavbarUser />
      <Main>
        <div className='container mx-auto mt-6'>
          {isLastScore === true && (
            <div className="border p-4 rounded-xl shadow-md col-span-3">
              <h1 className='text-center'>Skor Terakhir Simulasi Kamu :</h1>
              <h1 className='text-center font-bold'>{lastPaket}</h1>
              <div className='grid sm:grid-cols-3 grid-cols-4  mt-2 mb-4 border'>
                <div className='border py-2 px-3 text-center sm:col-span-1 col-span-2'>Sesi</div>
                <div className='border py-2 px-3 text-center'>Correct</div>
                <div className='border py-2 px-3 text-center'>Score</div>
                <div className='border py-2 px-3 text-center sm:col-span-1 col-span-2'>Listening Comprehension</div>
                <div className='border py-2 px-3 text-center flex items-center justify-center'>{correctListening}</div>
                <div className='border py-2 px-3 text-center flex items-center justify-center'>{scoreListening}</div>
                <div className='border py-2 px-3 text-center sm:col-span-1 col-span-2'>Structure And Written Expression</div>
                <div className='border py-2 px-3 text-center flex items-center justify-center'>{correctWritten}</div>
                <div className='border py-2 px-3 text-center flex items-center justify-center'>{scoreWritten}</div>
                <div className='border py-2 px-3 text-center sm:col-span-1 col-span-2'>Reading Comprehension</div>
                <div className='border py-2 px-3 text-center flex items-center justify-center'>{correctReading}</div>
                <div className='border py-2 px-3 text-center flex items-center justify-center'>{scoreReading}</div>
              </div>
              <div className='mt-2 mb-1'>
                  <div className='border py-2 px-3 text-center text-primary font-semibold'>Overall Score: {score}</div>
              </div>
              <div>
                <DownloadSertifButton />
              </div>
            </div>
          )}
          <div className="mt-5 space-y-8">
            {/* Paket Prediction Level */}
            <div className='p-6 rounded border border-[#FBD300]'>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Paket Prediction Level</h2>
              <p className="text-gray-600 mb-4">
                Paket prediction diperuntukkan bagi pemula yang belum pernah tes TOEFL sebelum nya. Sangat cocok bagi mereka yang ingin latihan sebelum tes TOEFL ITP sesungguhnya.
              </p>
              <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
                {paketList?.slice(0, 3).map((paket) => (
                  <div key={paket.id} className="border p-4 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Soal {paket.nama_paket}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Level: Prediction</p>
                    <p className="text-lg font-bold text-red-600 mt-2">Rp 20.000</p>
                    <button
                      onClick={() => handlePilih(paket.id, 'Rp 20.000')}
                      className="mt-4 text-sm bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700 transition"
                    >
                      Kerjakan Soal
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Paket ITP Level */}
            <div className='p-6 rounded border border-[#FBD300]'>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Paket ITP Level</h2>
              <p className="text-gray-600 mb-4">
                Simulasi TOEFL yang disusun dengan soal-soal yang lebih sulit dibandingkan Prediction Level. Direkomendasikan untuk kamu yang ingin mengukur kemampuan secara lebih mendalam sebelum mengikuti TOEFL ITP.
              </p>
              <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
                {!paketList ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 text-lg font-semibold">Loading...</p>
              </div>
            ) : paketList.slice(3).length > 0 ? (
              paketList.slice(3).map((paket) => (
                <div
                  key={paket.id}
                  className="border p-4 rounded-xl shadow hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    Soal {paket.nama_paket}
                  </h3>
                  <p className="text-sm text-blue-800 font-semibold mt-1">Level: ITP</p>
                  <p className="text-lg font-bold text-red-600 mt-2">Rp 25.000</p>
                  <button
                    onClick={() => handlePilih(paket.id, "Rp 25.000")}
                    className="mt-4 bg-blue-600 text-white text-sm px-4 py-2 w-full rounded hover:bg-blue-700 transition"
                  >
                    Kerjakan Soal
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-xl shadow-inner">
                <svg
                  className="w-16 h-16 text-white animate-bounce mb-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
                <h3 className="text-3xl font-bold text-white animate-pulse">
                  Coming Soon
                </h3>
                <p className="text-white mt-2 text-center max-w-xs">
                  Paket ITP Level akan segera tersedia. Pantau terus ya!
                </p>
              </div>
            )}
          </div>
        </div>

          </div>
        </div>
      </Main>
      <FloatingWAButton />
    </div>
    
  );
};

export default PilihPaketSoal;
