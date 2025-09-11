import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
// --- Perbaikan: Mengimpor Swal dari CDN untuk mengatasi masalah resolusi modul ---
import Swal from 'sweetalert2';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// --- Komponen kecil untuk ikon sorting ---
const SortIcon = ({ direction }) => {
  if (direction === 'ASC') return <FaSortUp />; // Panah ke atas
  if (direction === 'DESC') return <FaSortDown />; // Panah ke bawah
  return <FaSort />; // Default
};

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);

  // --- State untuk pagination ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // --- Penambahan state untuk fitur baru ---
  const [limit, setLimit] = useState(10); // State untuk jumlah item per halaman
  const [searchQuery, setSearchQuery] = useState(""); // State untuk input pencarian
  const [searchTerm, setSearchTerm] = useState(""); // State untuk term pencarian yang dikirim ke API
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'DESC' }); // State untuk sorting

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
      // --- Modifikasi: Kirim semua parameter (page, limit, search, sort) ke API ---
      const params = new URLSearchParams({
        page: currentPage,
        limit: limit,
        search: searchTerm,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.direction,
      });

      const res = await axios.get(
        `${API_BASE_URL}/admin/payments?${params.toString()}`,
        { withCredentials: true }
      );
      Swal.close();

      setPayments(res.data.payments);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      if (err.response && err.response.status === 401) {
        window.location.href = "/login";
      } else {
        setError(err.response?.data?.message || err.message);
        Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.message || err.message });
      }
    }
  };

  // --- Modifikasi: Tambahkan dependency baru ---
  // Data akan di-fetch ulang saat halaman, limit, term pencarian, atau sorting berubah
  useEffect(() => {
    fetchPayments();
  }, [currentPage, limit, searchTerm, sortConfig]);

  // --- Fungsi untuk menangani perubahan limit ---
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setCurrentPage(1); // Kembali ke halaman pertama setiap kali limit diubah
  };

  // --- Fungsi untuk menangani pencarian ---
  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setCurrentPage(1); // Kembali ke halaman pertama setiap kali melakukan pencarian
  };

  // --- Fungsi untuk menangani sorting ---
  const handleSort = (key) => {
    let direction = 'ASC';
    // Jika kolom yang sama di-klik, ubah arah sorting
    if (sortConfig.key === key && sortConfig.direction === 'ASC') {
      direction = 'DESC';
    }
    setSortConfig({ key, direction });
  };

  // --- Fungsi updateStatus tidak berubah, hanya memastikan fetchPayments dipanggil tanpa argumen ---
  const updateStatus = async (id, status, userNohp, userNama, namaPaket) => {
    let alasanPenolakan = "";

    if (status === "rejected") {
      const { value: alasan } = await Swal.fire({
        title: "Alasan Penolakan",
        input: "textarea",
        inputLabel: "Isi alasan penolakan pembayaran",
        inputPlaceholder: "Masukkan alasan penolakan...",
        showCancelButton: true,
        confirmButtonText: "Kirim",
        cancelButtonText: "Batal",
      });

      if (!alasan) {
        Swal.fire({ icon: "warning", title: "Dibatalkan", text: "Alasan penolakan harus diisi." });
        return;
      }
      alasanPenolakan = alasan;
    }

    Swal.fire({ title: "Memproses...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
      const body = status === "rejected" ? { status, alasanPenolakan } : { status };
      await axios.put(`${API_BASE_URL}/admin/payments/${id}/status`, body, { withCredentials: true });
      
      await fetchPayments(); // Memuat ulang data di halaman saat ini
      Swal.close();

      let pesan = "";
      if (status === "confirmed") {
        pesan = `Halo ${userNama}, pembayaran Anda untuk paket simulasi TOEFL ${namaPaket} telah berhasil dikonfirmasi. Silakan mulai mengerjakan simulasi kapan pun Anda siap.\n\nIni adalah simulasi TOEFL, jadi Anda bebas beristirahat setiap kali selesai satu sesi, sebelum lanjut ke sesi berikutnya. Ambil waktu sebentar kalau perlu!\n\nTerima kasih telah menggunakan platform simulasi TOEFL dari YantoTanjung. Semoga sukses dan tetap semangat!`;
      } else if (status === "rejected") {
        pesan = `Halo ${userNama}, mohon maaf pembayaran Anda ditolak.\nAlasan: ${alasanPenolakan}`;
      }
      
      let waNohp = userNohp.trim();
      if (waNohp.startsWith("0")) waNohp = "62" + waNohp.slice(1);
      else if (waNohp.startsWith("+62")) waNohp = waNohp.slice(1);
      
      const encodedMessage = encodeURIComponent(pesan);
      window.open(`https://wa.me/${waNohp}?text=${encodedMessage}`, "_blank");

    } catch (error) {
      if (error.response && error.response.status === 401) window.location.href = "/login";
      else Swal.fire({ icon: "error", title: "Gagal", text: error.response?.data?.message || "Terjadi kesalahan"  });
    }
  };

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <h2 className="text-2xl mb-4">Daftar Pembayaran</h2>
      
      {/* --- Penambahan: Kontrol untuk Filter, Search, dan Limit --- */}
      <div className="mb-4 p-4 card flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span>Tampilkan:</span>
          <select value={limit} onChange={handleLimitChange} className="p-2 border rounded dark:bg-slate-700 dark:border-slate-600">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="-1">Semua</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Cari..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="p-2 border rounded w-full sm:w-auto dark:bg-slate-700 dark:border-slate-600"
          />
          <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded">
            Cari
          </button>
        </div>
      </div>

      <div className="card">
        <div className="relative overflow-auto">
          <table className="border-collapse min-w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm shadow-sm">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">No</th>
                {/* --- Modifikasi: Tambahkan onClick untuk sorting pada header tabel --- */}
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                  <button onClick={() => handleSort('userNohp')} className="w-full text-start flex items-center gap-1">
                    No Hp <SortIcon direction={sortConfig.key === 'userNohp' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                   <button onClick={() => handleSort('User.nama')} className="w-full text-start flex items-center gap-1">
                    Nama <SortIcon direction={sortConfig.key === 'User.nama' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                   <button onClick={() => handleSort('nama_paket')} className="w-full text-start flex items-center gap-1">
                    Paket Soal <SortIcon direction={sortConfig.key === 'nama_paket' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Bukti Bayar</th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                   <button onClick={() => handleSort('status')} className="w-full text-start flex items-center gap-1">
                    Status <SortIcon direction={sortConfig.key === 'status' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Aksi</th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Alasan Penolakan</th>
              </tr>
            </thead>
            
            <tbody>
              {payments.map((p, index) => (
                <tr key={p.id} className="p-4">
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                    {(currentPage - 1) * (limit > 0 ? limit : 0) + index + 1}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.userNohp}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.User.nama}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.nama_paket}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                    <a href={`${API_BASE_URL}/uploads/bukti/${p.buktiBayar}`} target="_blank" rel="noopener noreferrer" className="underline">
                      Lihat Bukti
                    </a>
                  </td>
                  <td className={`border border-slate-300 dark:border-slate-700 px-4 py-4 ${p.status === 'pending' ? 'text-yellow-500' : p.status === 'confirmed' ? 'text-green-600' : p.status === 'rejected' ? 'text-red-600' : 'text-slate-500'}`}>
                    {p.status}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                    {p.status === 'pending' && (
                      <>
                        <button onClick={() => updateStatus(p.id, 'confirmed', p.userNohp, p.User.nama, p.nama_paket)} className="px-3 py-1 bg-green-500 text-white rounded me-2">
                          Konfirmasi
                        </button>
                        <button onClick={() => updateStatus(p.id, 'rejected', p.userNohp, p.User.nama, p.nama_paket)} className="px-3 py-1 bg-red-500 text-white rounded">
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

        {/* --- Modifikasi: Sembunyikan pagination jika semua data ditampilkan --- */}
        {totalPages > 1 && limit !== -1 && (
          <div className="flex justify-between items-center mt-4">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 rounded disabled:opacity-50 disabled:cursor-not-allowed">
              Sebelumnya
            </button>
            <span className="text-sm text-slate-700 dark:text-slate-400">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 rounded disabled:opacity-50 disabled:cursor-not-allowed">
              Selanjutnya
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentList;
