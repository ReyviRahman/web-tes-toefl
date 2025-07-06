import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavbarUser from '../../components/NavbarUser';
import Main from '../../components/Main';

const RiwayatUjian = () => {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const fetchHistories = async () => {
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
          `${process.env.REACT_APP_API_BASE_URL}/users/riwayat-ujian`,
          { withCredentials: true }
        );
        setHistories(res.data);
        Swal.close();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal mengambil data exam histories",
        });
      }
    };
    fetchHistories();
  }, []);

  return (
    <div>
      <NavbarUser />
      <Main>
        <div className='container mx-auto py-4'>
          <h2 className="text-2xl mb-4">Riwayat Ujian</h2>
          <div className="relative overflow-auto">
            <table className="border-collapse min-w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm shadow-sm">
                <thead className="bg-slate-50 dark:bg-slate-700">
                    <tr>
                        <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">No</th>
                        <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Nama Paket</th>
                        <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Nama Peserta</th>
                        <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Listening Score</th>
                        <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Structure Score</th>
                        <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Reading Score</th>
                        <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Total Score</th>
                        <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Listening Correct</th>
                        <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Written Correct</th>
                        <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Reading Correct</th>
                        <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Download Sertif</th>
                    </tr>
                </thead>
                <tbody>
                  {histories.map((histori, index) => (
                    <tr key={histori.id} className="p-4">
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{index + 1}</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.nama_paket}</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.user.nama}</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.listeningScore}</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.structureScore}</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.readingScore}</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.totalScore}</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.listening_correct}</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.written_correct}</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">{histori.reading_correct}</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">Download</td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
        </div>
      </Main>
    </div>
  )
}

export default RiwayatUjian