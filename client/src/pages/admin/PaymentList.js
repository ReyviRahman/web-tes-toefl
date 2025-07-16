import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);

  const fetchPayments = async () => {
    Swal.fire({
      title: 'Loading...',
      text: 'Mohon tunggu sebentar',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/payments`, { withCredentials: true });
      Swal.close()
      setPayments(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        window.location.href = "/login";
      } else {
        setError(err.response?.data?.message || err.message);
        Swal.close()

      }
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const updateStatus = async (id, status, userNohp, userNama) => {
    let alasanPenolakan = "";

    // Kalau status rejected, minta input alasan via Swal
    if (status === "rejected") {
      const { value: alasan } = await Swal.fire({
        title: "Alasan Penolakan",
        input: "textarea",
        inputLabel: "Isi alasan penolakan pembayaran",
        inputPlaceholder: "Masukkan alasan penolakan...",
        inputAttributes: {
          "aria-label": "Alasan penolakan",
        },
        showCancelButton: true,
        confirmButtonText: "Kirim",
        cancelButtonText: "Batal",
      });

      if (!alasan) {
        Swal.fire({
          icon: "warning",
          title: "Penolakan dibatalkan",
          text: "Alasan penolakan harus diisi.",
        });
        return;
      }
      alasanPenolakan = alasan;
    }

    Swal.fire({
      title: "Memproses...",
      text: "Mohon tunggu sebentar",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Siapkan data body request
      const body = status === "rejected" 
        ? { status, alasanPenolakan }
        : { status };

      const response = await axios.put(
        `${API_BASE_URL}/admin/payments/${id}/status`,
        body,
        { withCredentials: true }
      );
      await fetchPayments();
      Swal.close();

      // Siapkan pesan WhatsApp
      let pesan = "";
      if (status === "confirmed") {
        pesan = `Halo ${userNama}, pembayaran Anda telah dikonfirmasi. Silakan mulai kerjakan simulasi TOEFL.`;
      } else if (status === "rejected") {
        pesan = `Halo ${userNama}, mohon maaf pembayaran Anda ditolak.\nAlasan: ${alasanPenolakan}`;
      } else {
        pesan = `Halo ${userNama}, status pembayaran Anda: ${status}.`;
      }

      // Format nomor: hapus 0 di depan, ganti jadi 62 jika perlu
      let waNohp = userNohp;
      if (waNohp.startsWith("0")) {
        waNohp = "62" + waNohp.slice(1);
      }

      // Buka WhatsApp Web
      window.open(
        `https://wa.me/${waNohp}?text=${encodeURIComponent(pesan)}`,
        "_blank"
      );
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response?.data?.message || "Terjadi kesalahan",
        });

      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Daftar Pembayaran</h2>
      <div className="card">
        <div className="">
            <div className="relative overflow-auto">
                <table className="border-collapse min-w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm shadow-sm">
                    <thead className="bg-slate-50 dark:bg-slate-700">
                        <tr>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">No</th>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">No Hp</th>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Nama</th>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Paket Soal</th>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Bukti Pembayaran</th>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Status</th>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Aksi</th>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Alasan Penolakan</th>
                        </tr>
                    </thead>
                    <tbody>
                      {payments.map((p, index) => (
                        <tr key={p.id} className="p-4">
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{index + 1}</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.userNohp}</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.User.nama}</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.nama_paket}</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                            <a href={`${API_BASE_URL}/uploads/bukti/${p.buktiBayar}`} target="_blank" rel="noopener noreferrer" className="underline">
                              Lihat Bukti Pembayaran
                            </a>
                          </td>
                          <td
                            className={
                              `border border-slate-300 dark:border-slate-700 px-4 py-4
                              ${
                                p.status === 'pending'
                                  ? 'text-yellow-500'
                                  : p.status === 'confirmed'
                                  ? 'text-green-600'
                                  : p.status === 'rejected'
                                  ? 'text-red-600'
                                  : 'text-slate-500 dark:text-slate-400'
                              }
                              dark:text-slate-400`
                            }
                          >
                            {p.status}
                          </td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                            {p.status === 'pending' && (
                              <>
                                <button 
                                  onClick={() => updateStatus(p.id, 'confirmed', p.userNohp, p.User.nama)}
                                  className="px-3 py-1 bg-green-500 text-white rounded me-2"
                                >
                                  Konfirmasi
                                </button>
                                <button 
                                  onClick={() => updateStatus(p.id, 'rejected', p.userNohp, p.User.nama)}
                                  className="px-3 py-1 bg-red-500 text-white rounded"
                                >
                                  Tolak
                                </button>
                              </>
                            )}
                          </td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-red-500 dark:text-slate-400">{p.alasanPenolakan}</td>
                        </tr>
                      ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentList