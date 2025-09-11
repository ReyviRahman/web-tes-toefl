import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import 'react-medium-image-zoom/dist/styles.css'
import ImageZoom from 'react-medium-image-zoom';
import { IoArrowBackCircle } from "react-icons/io5";

const SoalReading = () => {
  const [soals, setSoals] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { paketId } = useParams();
  const namaPaket = location.state?.nama_paket || "";

  const fetchSoalReading = async () => {
    Swal.fire({
      title: "Memuat data...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/${paketId}/soal-reading`,
        { withCredentials: true }
      );
      setSoals(res.data.data);
      Swal.close();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        window.location.href = "/login";
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal mengambil data soal reading",
        });

      }
    }
  };

  const handleDeleteSoal = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus soal ini?",
      text: "Tindakan ini tidak bisa dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/soal/${id}`,
          { withCredentials: true }
        );
        Swal.fire({
          icon: "success",
          title: "Soal berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchSoalReading();
      } catch (err) {
        if (err.response && err.response.status === 401) {
          window.location.href = "/login";
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal menghapus soal",
            text: err.response?.data?.message || "Terjadi kesalahan",
          });

        }
      }
    }
  };

  useEffect(() => {
    fetchSoalReading();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex gap-2'>
          <div className='cursor-pointer' onClick={() => {navigate(-1)}}>
            <IoArrowBackCircle size={30} />
          </div>
          <h2 className="text-2xl">Soal Reading {namaPaket}</h2>
        </div>
        <button
          onClick={() => navigate(`/admin/soal-simulasi/add-soal-reading/${paketId}`, { state: { nama_paket: namaPaket } })}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
        >
          Tambah Soal
        </button>
      </div>
      <div className="relative overflow-auto sm:max-w-[1050px]">
        <table className="border-collapse border border-slate-300 bg-white text-sm shadow-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="border px-4 py-3" rowSpan={2}>No</th>
              <th className="border px-4 py-3" rowSpan={2}>Jawaban</th>
              <th className="border px-4 py-3" rowSpan={2}>Soal</th>
              <th className="border px-4 py-3" rowSpan={2}>Page</th>
              <th className="border px-4 py-3" rowSpan={2}>Pilihan 1</th>
              <th className="border px-4 py-3" rowSpan={2}>Pilihan 2</th>
              <th className="border px-4 py-3" rowSpan={2}>Pilihan 3</th>
              <th className="border px-4 py-3" rowSpan={2}>Pilihan 4</th>
              <th className="border px-4 py-3" rowSpan={2}>Question</th>
              <th className="border px-4 py-3" rowSpan={2}>Aksi</th>
              <th className="border px-4 py-3 text-center" colSpan={2}>Jawaban Peserta</th>
            </tr>
            <tr>
              <th className="border px-4 py-3">Benar</th>
              <th className="border px-4 py-3">Salah</th>
            </tr>
          </thead>
          <tbody>
            {soals.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-400">Belum ada soal reading</td>
              </tr>
            ) : (
              soals.map((soal, idx) => (
                <tr key={soal.id}>
                  <td className="border px-4 py-2">{soal.no_soal}</td>
                  <td className="border px-4 py-2 font-bold">{soal.jawaban}</td>
                  <td className="border px-4 py-2">
                    {soal.soal}
                  </td>
                  <td className="border px-4 py-2">{soal.page}</td>
                  <td className="border px-4 py-2">{soal.pilihan_satu}</td>
                  <td className="border px-4 py-2">{soal.pilihan_dua}</td>
                  <td className="border px-4 py-2">{soal.pilihan_tiga}</td>
                  <td className="border px-4 py-2">{soal.pilihan_empat}</td>
                  <td className="border px-4 py-2">
                    <ImageZoom>
                      <img class="h-[70px] w-96 object-cover" src={`${process.env.REACT_APP_API_BASE_URL}${soal.readingQuestion.reading}`} />
                    </ImageZoom>
                  </td>
                  <td className="border px-4 py-2 font-bold">
                    <div className='flex justify-center gap-2'>
                      <button
                      onClick={() => navigate(`/admin/soal-simulasi/edit-soal-reading/${soal.id}`, {
                        state: { paketId, nama_paket: namaPaket }
                      })}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSoal(soal.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                    </div>
                  </td>
                  <td className="border px-4 py-2">{soal.benar}</td>
                  <td className="border px-4 py-2">{soal.salah}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SoalReading;
