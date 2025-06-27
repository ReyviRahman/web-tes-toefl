import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavbarUser from '../../components/NavbarUser';
import Main from '../../components/Main';
import { useNavigate } from 'react-router-dom';

const PilihPaketSoal = () => {
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
  useEffect(() => {
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
        {/* <div className="max-w-3xl mx-auto p-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">Pilih Paket Soal</h2>
          <div className="grid gap-4">
            {paketList.map((paket) => (
              <div key={paket.id} className="border p-4 rounded-xl shadow-md">
                <h3 className="text-xl font-bold">{paket.nama_paket}</h3>
                <p className="text-gray-700">{paket.deskripsi || 'Tidak ada deskripsi'}</p>
                <p className="text-sm text-gray-500 mt-1">Durasi: {paket.durasi} menit</p>
                <p className="text-sm text-gray-500">Harga: Rp{paket.harga?.toLocaleString('id-ID')}</p>
                <button
                  onClick={() => handlePilih(paket.id)}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Pilih Paket
                </button>
              </div>
            ))}
          </div>
        </div> */}
      </Main>
    </div>
    
  );
};

export default PilihPaketSoal;
