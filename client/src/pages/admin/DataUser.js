import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'react-medium-image-zoom/dist/styles.css'
import ImageZoom from 'react-medium-image-zoom';

const DataUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchDataUser = async () => {
      // Tampilkan swal loading
      Swal.fire({
        title: "Memuat data...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/admin/user`,
          { withCredentials: true }
        );
        setUsers(res.data);
        Swal.close();
      } catch (err) {
        if (err.response && err.response.status === 401) {
          window.location.href = "/login";
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Gagal mengambil data exam users",
          });

        }
      }
    };
    fetchDataUser();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Data User</h2>
      <div className="relative overflow-auto">
        <table className="border-collapse min-w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm shadow-sm">
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
                      <img class="h-[70px] w-96 object-cover" src={`${process.env.REACT_APP_API_BASE_URL}${user.profilePic}`} />
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
        </table>
      </div>
    </div>
  )
}

export default DataUser