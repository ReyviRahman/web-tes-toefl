import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavbarUser from '../../components/NavbarUser';
import Main from '../../components/Main';

const Bayar = () => {
  const { paketId } = useParams();
  const [paket, setPaket] = useState(null);
  const [bukti, setBukti] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const location = useLocation()
  const hargaPaket = location.state?.hargaPaket || ''

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/paket-soal/${paketId}`);
        setPaket(res.data);
      } catch (err) {
        console.error('Gagal mengambil data paket', err);
        Swal.fire('Error', 'Gagal mengambil data paket', 'error');
      }
    };

    fetchPaket();
  }, [paketId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bukti) {
      return Swal.fire('Peringatan', 'Mohon unggah bukti pembayaran terlebih dahulu', 'warning');
    }

    const formData = new FormData();
    formData.append('paket_soal_id', paketId);
    formData.append('bukti', bukti);
    formData.append('namaPaket', paket.nama_paket);

    try {
      // Tampilkan loading Swal
      Swal.fire({
        title: 'Mengunggah Bukti...',
        text: 'Mohon tunggu sebentar',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/payment/upload`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.close(); // Tutup loading sebelum tampil Swal berikutnya

      Swal.fire('Berhasil', 'Bukti pembayaran berhasil dikirim. Silakan tunggu konfirmasi admin.', 'success')
        .then(() => {
          navigate('/paketsoal');
        });

    } catch (err) {
      if (err.response && err.response.status === 401) {
        window.location.href = "/login";
      } else {
        Swal.close();
        Swal.fire('Error', 'Gagal mengunggah bukti pembayaran', 'error');
      }
    }
  };
  
  return (
    <div>
      <NavbarUser />
        <div className="max-w-xl mx-auto m-10 p-4 border rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Pembayaran Paket Soal</h2>
          
          {paket ? (
            <div className="mb-6">
              <p><strong>Nama Paket:</strong> {paket.nama_paket}</p>
            </div>
          ) : (
            <p>Memuat detail paket...</p>
          )}

          <div className="mb-6 text-center">
            <p className="mb-2 font-semibold">Silakan scan QRIS berikut untuk membayar:</p>
            <img
              src="/qris.jpeg"
              alt="QRIS"
              className="w-60 mx-auto rounded shadow"
            />
            <p className="mt-3 text-lg font-semibold text-primary">
              Total Pembayaran: <span className="text-red-600">{hargaPaket}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-medium">Upload Bukti Pembayaran</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setBukti(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="block w-full border p-2 mb-2 cursor-pointer"
            />

            {preview && (
              <div className="mb-4">
                <p className="font-medium mb-1 text-center">Bukti Pembayaran:</p>
                <img
                  src={preview}
                  alt="Preview Bukti"
                  className="w-48 rounded shadow border mx-auto"
                />
              </div>
            )}


            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Kirim Bukti
            </button>
          </form>
        </div>
    </div>
  );
};

export default Bayar;
