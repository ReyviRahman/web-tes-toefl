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
  const [paketList, setPaketList] = useState([]);

  const fetchPaketSoal = async () => {
    Swal.fire({
      title: 'Memuat...',
      text: 'Mengambil paket soal',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/paket-soal`);
      setPaketList(response.data);
      Swal.close();
    } catch (error) {
      console.error('Gagal mengambil paket soal:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Tidak bisa mengambil data paket soal.'
      });
    }
  };
  const cekAkses = async () => {
    // 1. Tampilkan Swal loading
    Swal.fire({
      title: 'Memeriksa akses ujian…',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      // 2. Panggil API dengan cookie
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/cek-akses`, { withCredentials: true });

      // 3. Tutup loading
      Swal.close();

      if (data.bolehAkses) {
        // langsung ke simulasi
        navigate(`/simulasi-toefl/${data.paketId}`);
      } 
    } catch (err) {
      // tutup loading, lalu tampilkan error
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memeriksa Akses',
        text: err.response?.data?.message || err.message,
      });
    }
  };
  const getScore = async () => {
    try {
      Swal.fire({
        title: "Loading...",
        text: "Checking your answers",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
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
        Swal.close()
      }  
      Swal.close()
    } catch (error) {
      console.error("Error fetching score:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch score. Please try again later.",
      });
    }
  }

  useEffect(() => {
    getScore();
    cekAkses();
    fetchPaketSoal();
  }, [navigate]);

  const handlePilih = async (paketId) => {
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
        navigate(`/bayar/${paketId}`);
      }
    } catch (error) {
      console.error('Gagal cek akses:', error);
      Swal.close(); // Tutup loading kalau error juga
      Swal.fire('Error', 'Terjadi kesalahan saat menghubungi server', 'error');
    }
  };

  return (
    <div>
      <NavbarUser />
      <Main>
        <div className='container mx-auto'>
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 p-4">
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
            {paketList.map((paket) => (
              <div key={paket.id} className="border p-4 rounded-xl shadow-md">
                <h3 className="text-xl font-bold">Soal {paket.nama_paket}</h3>
                <p className="text-lg font-semibold text-primary">
                  Harga: <span className="text-red-600">Rp 20.000</span>
                </p>
                <button
                  onClick={() => handlePilih(paket.id)}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
                >
                  Pilih Paket
                </button>
              </div>
            ))}
          </div>
        </div>
      </Main>
      <FloatingWAButton />
    </div>
    
  );
};

export default PilihPaketSoal;
