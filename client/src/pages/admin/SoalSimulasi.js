import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SoalSimulasi = () => {
  const [pakets, setPakets] = useState([]);
  const navigate = useNavigate();
  const fetchHistories = async () => {
    Swal.fire({
      title: "Memuat data...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/paket-soal`,
      );
      setPakets(res.data);
      Swal.close();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal mengambil data exam pakets",
      });
    }
  };

  const handleDeletePaket = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus paket soal ini?",
      text: "Tindakan ini tidak bisa dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/${id}`,
          { withCredentials: true }
        );
        Swal.fire({
          icon: "success",
          title: "Paket soal berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
        // Refresh data di sini, misal: fetchPaketSoal();
        fetchHistories();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal menghapus paket soal",
          text: err.response?.data?.message || "Terjadi kesalahan",
        });
      }
    }
  };

  useEffect(() => {
    
    fetchHistories();
  }, []);

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2 className="text-2xl mb-4">Soal Simulasi</h2>
        <button
          onClick={() => navigate(`/admin/soal-simulasi/add`)}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded "
        >
          Tambah Paket Soal
        </button>
      </div>
      <div className="relative overflow-auto">
        <table className="border-collapse min-w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm shadow-sm">
            <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">No</th>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Nama Paket</th>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Status</th>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Aksi</th>
                </tr>
            </thead>
            <tbody>
              {pakets.map((paket, index) => (
                <tr key={paket.id} className="p-4">
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{index + 1}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{paket.nama_paket}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{paket.status}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400 flex gap-2">
                    {/* Tambah Soal */}
                    <button
                      // onClick={() => navigate(`/admin/paket-soal/${paket.id}/tambah-soal`)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Tambah Soal
                    </button>
                    {/* Edit Paket */}
                    <button
                      onClick={() => navigate(`/admin/soal-simulasi/edit/${paket.id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit Paket
                    </button>
                    {/* Hapus Paket */}
                    <button
                      onClick={() => handleDeletePaket(paket.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default SoalSimulasi