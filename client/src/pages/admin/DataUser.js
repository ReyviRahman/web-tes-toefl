import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'react-medium-image-zoom/dist/styles.css'
import ImageZoom from 'react-medium-image-zoom';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SortIcon = ({ direction }) => {
  if (direction === 'ASC') return <FaSortUp />; // Panah ke atas
  if (direction === 'DESC') return <FaSortDown />; // Panah ke bawah
  return <FaSort />; // Default
};

const DataUser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'DESC' });
  
  const fetchDataUser = async () => {
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
        `${API_BASE_URL}/admin/user?${params.toString()}`,
        { withCredentials: true }
      );
      Swal.close();

      setUsers(res.data.users);
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
    fetchDataUser();
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

  return (
    <div>
      <h2 className="text-2xl mb-4">Data User</h2>
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

      <div className="relative overflow-auto">
        <table className="border-collapse min-w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm shadow-sm">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">No</th>
                {/* --- Modifikasi: Tambahkan onClick untuk sorting pada header tabel --- */}
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                  <button onClick={() => handleSort('nohp')} className="w-full text-start flex items-center gap-1">
                    No HP <SortIcon direction={sortConfig.key === 'nohp' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                   <button onClick={() => handleSort('nama')} className="w-full text-start flex items-center gap-1">
                    Nama Peserta <SortIcon direction={sortConfig.key === 'nama' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                    Foto Profil 
                </th>
                {/* <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                    Password 
                </th> */}
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                   <button onClick={() => handleSort('status_ujian')} className="w-full text-start flex items-center gap-1">
                    Status Ujian <SortIcon direction={sortConfig.key === 'status_ujian' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                   <button onClick={() => handleSort('paket_soal_id_aktif')} className="w-full text-start flex items-center gap-1">
                    Paket Soal Aktif <SortIcon direction={sortConfig.key === 'paket_soal_id_aktif' ? sortConfig.direction : null} />
                  </button>
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">
                   <button onClick={() => handleSort('paket_terakhir')} className="w-full text-start flex items-center gap-1">
                    Paket Terakhir <SortIcon direction={sortConfig.key === 'paket_terakhir' ? sortConfig.direction : null} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((p, index) => (
                <tr key={p.id} className="p-4">
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                    {(currentPage - 1) * (limit > 0 ? limit : 0) + index + 1}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.nohp}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.nama}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                    <ImageZoom>
                      <img class="h-[50px] w-[50px] object-cover" src={`${process.env.REACT_APP_API_BASE_URL}${p.profilePic}`} />
                    </ImageZoom>
                  </td>
                  {/* <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{p.password}</td> */}
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                    {p.status_ujian === 'idle' ? 'Belum Ujian' : 'Sedang Ujian'}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                    {p.paket_soal_id_aktif === null ? 'Belum Ada' : p.paket_soal_id_aktif}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                    {p.paket_terakhir === null ? 'Belum Ada' : p.paket_terakhir}
                  </td>
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
  )
}


{/* <table className="border-collapse min-w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm shadow-sm">
            <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">No</th>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">No HP</th>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Nama Peserta</th>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Foto Profil</th>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Password</th>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Status Ujian</th>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Paket Soal Aktif</th>
                    <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Paket Terakhir</th>
                    
                </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="p-4">
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{index + 1}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{user.nohp}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{user.nama}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                    <ImageZoom>
                      <img class="h-[50px] w-[50px] object-cover" src={`${process.env.REACT_APP_API_BASE_URL}${user.profilePic}`} />
                    </ImageZoom>
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{user.password}</td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                    {user.status_ujian === 'idle' ? 'Belum Ujian' : 'Sedang Ujian'}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                    {user.paket_soal_id_aktif === null ? 'Belum Ada' : user.paket_soal_id_aktif}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">
                    {user.paket_terakhir === null ? 'Belum Ada' : user.paket_terakhir}
                  </td>
                </tr>
              ))}
            </tbody>
        </table> */}

export default DataUser