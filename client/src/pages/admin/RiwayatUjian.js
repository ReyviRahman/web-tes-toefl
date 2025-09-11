import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SortIcon = ({ direction }) => {
  if (direction === 'ASC') return <FaSortUp />; // Panah ke atas
  if (direction === 'DESC') return <FaSortDown />; // Panah ke bawah
  return <FaSort />; // Default
};

const RiwayatUjian = () => {
  const [histories, setHistories] = useState([]);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'DESC' });

  const fetchHistories = async () => {
    Swal.fire({
      title: 'Loading...',
      text: 'Mohon tunggu sebentar',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: limit,
        search: searchTerm,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.direction,
      });

      const res = await axios.get(
        `${API_BASE_URL}/admin/riwayat-ujian?${params.toString()}`,
        { withCredentials: true }
      );
      Swal.close();

      setHistories(res.data.histories);
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

  useEffect(() => {
    fetchHistories();
  }, [currentPage, limit, searchTerm, sortConfig]);

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setCurrentPage(1); 
  };

  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setCurrentPage(1); // Kembali ke halaman pertama setiap kali melakukan pencarian
  };

  const handleSort = (key) => {
    let direction = 'ASC';
    // Jika kolom yang sama di-klik, ubah arah sorting
    if (sortConfig.key === key && sortConfig.direction === 'ASC') {
      direction = 'DESC';
    }
    setSortConfig({ key, direction });
  };

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return(
    <div>
      <h2 className="text-2xl mb-4">Riwayat Simulasi</h2>
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

      <div className='card'>
        <div className='relative overflow-auto'>
          <table className="border-collapse min-w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm shadow-sm">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">No</th>
                {/* --- Modifikasi: Tambahkan onClick untuk sorting pada header tabel --- */}
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                  <button onClick={() => handleSort('nama_paket')} className="w-full text-start flex items-center gap-1">
                    Nama Paket <SortIcon direction={sortConfig.key === 'nama_paket' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                   <button onClick={() => handleSort('user.nama')} className="w-full text-start flex items-center gap-1">
                    Nama Peserta <SortIcon direction={sortConfig.key === 'user.nama' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                   <button onClick={() => handleSort('listeningScore')} className="w-full text-start flex items-center gap-1">
                    Listening Score <SortIcon direction={sortConfig.key === 'listeningScore' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                   <button onClick={() => handleSort('structureScore')} className="w-full text-start flex items-center gap-1">
                    Structure Score <SortIcon direction={sortConfig.key === 'structureScore' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                   <button onClick={() => handleSort('readingScore')} className="w-full text-start flex items-center gap-1">
                    Reading Score <SortIcon direction={sortConfig.key === 'readingScore' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                   <button onClick={() => handleSort('totalScore')} className="w-full text-start flex items-center gap-1">
                    Total Score <SortIcon direction={sortConfig.key === 'totalScore' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                   <button onClick={() => handleSort('listening_correct')} className="w-full text-start flex items-center gap-1">
                    Listening Correct <SortIcon direction={sortConfig.key === 'listening_correct' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                   <button onClick={() => handleSort('written_correct')} className="w-full text-start flex items-center gap-1">
                    Structure Correct <SortIcon direction={sortConfig.key === 'written_correct' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                   <button onClick={() => handleSort('reading_correct')} className="w-full text-start flex items-center gap-1">
                    Reading Correct <SortIcon direction={sortConfig.key === 'reading_correct' ? sortConfig.direction : null} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {histories.map((p, index) => (
                <tr key={p.id} className="p-4">
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                    {(currentPage - 1) * (limit > 0 ? limit : 0) + index + 1}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.nama_paket}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.user.nama}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.listeningScore}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.structureScore}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.readingScore}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.totalScore}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.listening_correct}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.written_correct}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.reading_correct}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
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
  )

  // const [histories, setHistories] = useState([]);
  // useEffect(() => {
  //   const fetchHistories = async () => {
  //     Swal.fire({
  //       title: "Memuat data...",
  //       allowOutsideClick: false,
  //       didOpen: () => {
  //         Swal.showLoading();
  //       },
  //     });

  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_API_BASE_URL}/admin/riwayat-ujian`,
  //         { withCredentials: true }
  //       );
  //       setHistories(res.data);
  //       Swal.close();
  //     } catch (err) {
  //       if (err.response && err.response.status === 401) {
  //         window.location.href = "/login";
  //       } else {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Gagal",
  //           text: "Gagal mengambil data exam histories",
  //         });

  //       }
  //     }
  //   };
  //   fetchHistories();
  // }, []);
  // return (
  //   <div>
  //     <h2 className="text-2xl mb-4">Riwayat Simulasi</h2>
  //     <div className="relative overflow-auto">
  //       <table className="border-collapse min-w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm shadow-sm">
  //           <thead className="bg-slate-50 dark:bg-slate-700">
  //               <tr>
  //                   <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">No</th>
  //                   <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Nama Paket</th>
  //                   <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Nama Peserta</th>
  //                   <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Listening Score</th>
  //                   <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Structure Score</th>
  //                   <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Reading Score</th>
  //                   <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Total Score</th>
  //                   <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Listening Correct</th>
  //                   <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Written Correct</th>
  //                   <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Reading Correct</th>
  //               </tr>
  //           </thead>
  //           <tbody>
  //             {histories.map((histori, index) => (
  //               <tr key={histori.id} className="p-4">
  //                 <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{index + 1}</td>
  //                 <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.nama_paket}</td>
  //                 <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.user.nama}</td>
  //                 <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.listeningScore}</td>
  //                 <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.structureScore}</td>
  //                 <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.readingScore}</td>
  //                 <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.totalScore}</td>
  //                 <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.listening_correct}</td>
  //                 <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.written_correct}</td>
  //                 <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.reading_correct}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //       </table>
  //     </div>
  //   </div>
  // )
}

export default RiwayatUjian