import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import NavbarUser from "../../components/NavbarUser";
import Main from "../../components/Main";
import FloatingWAButton from "../../components/FloatingWAButton";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PaketSaya = () => {
  
  const [paketList, setPaketList] = useState([]);

  const fetchData = async () => {
    Swal.fire({
      title: "Memuat data...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users/payment`,
        {
          withCredentials: true, // kirim cookie token
        }
      );
      setPaketList(response.data);

      Swal.close(); // Tutup swal loading
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal memuat data",
          text:
            error.response?.data?.message ||
            error.message ||
            "Terjadi kesalahan saat mengambil data pembayaran.",
        });
        
      }
    }
  };

  useEffect(() => {

    fetchData();
  }, []);

  return (
    <div>
      <NavbarUser />
      <Main>
        <div className="container mx-auto py-4">
          <h2 className="text-2xl mb-4">Paket Saya</h2>
            <div className="relative overflow-auto">
                <table className="border-collapse min-w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm shadow-sm">
                    <thead className="bg-slate-50 dark:bg-slate-700">
                        <tr>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">No</th>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Nama Paket</th>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Bukti Pembayaran</th>
                            <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                      {paketList.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-6 text-slate-400">
                            Tidak ada data pembayaran.
                          </td>
                        </tr>
                      ) : (
                        paketList.map((p, index) => (
                          <tr key={p.id} className="p-4">
                            <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                              {index + 1}
                            </td>
                            <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                              {p.nama_paket}
                            </td>
                            <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                              {p.buktiBayar ? (
                                <a
                                  href={`${API_BASE_URL}/uploads/bukti/${p.buktiBayar}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline"
                                >
                                  Lihat Bukti Pembayaran
                                </a>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td
                              className={`border border-slate-300 dark:border-slate-700 px-4 py-4
                                ${
                                  p.status === "pending"
                                    ? "text-yellow-500"
                                    : p.status === "confirmed"
                                    ? "text-green-600"
                                    : p.status === "rejected"
                                    ? "text-red-600"
                                    : "text-slate-500 dark:text-slate-400"
                                }
                                dark:text-slate-400`}
                            >
                              {p.status === "pending"
                                ? "Sedang diverifikasi Admin"
                                : p.status === "confirmed"
                                ? "Pembayaran diterima"
                                : p.status === "rejected"
                                ? (
                                    <div>
                                      Pembayaran ditolak.
                                      {p.alasan_penolakan && (
                                        <span className="ms-1">
                                          Alasan: {p.alasan_penolakan}
                                        </span>
                                      )}
                                    </div>
                                  )
                                : p.status}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                </table>
            </div>
        </div>

      </Main>
      <FloatingWAButton />
    </div>
    // <div>
    //   <h2>Daftar Paket Saya</h2>
    //   <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
    //     <thead>
    //       <tr>
    //         <th>Nama Paket</th>
    //         <th>Bukti Bayar</th>
    //         <th>Status</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {paketList.length === 0 ? (
    //         <tr>
    //           <td colSpan={3} align="center">
    //             Tidak ada data pembayaran.
    //           </td>
    //         </tr>
    //       ) : (
    //         paketList.map((paket, idx) => (
    //           <tr key={idx}>
    //             <td>{paket.nama_paket}</td>
    //             <td>
    //               {paket.buktiBayar ? (
    //                 <a href={paket.buktiBayar} target="_blank" rel="noopener noreferrer">
    //                   Lihat Bukti
    //                 </a>
    //               ) : (
    //                 "-"
    //               )}
    //             </td>
    //             <td>{paket.status}</td>
    //           </tr>
    //         ))
    //       )}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default PaketSaya;
