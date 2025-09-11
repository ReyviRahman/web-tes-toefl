import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";

const SesiSoal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { paketId } = useParams();
  const namaPaket = location.state?.nama_paket || "";

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex gap-2'>
          <div className='cursor-pointer' onClick={() => {navigate(-1)}}>
            <IoArrowBackCircle size={30} />
          </div>
          <h2 className="text-2xl mb-4">Soal {namaPaket}</h2>
        </div>
      </div>
      <div className="relative overflow-auto">
        <table className="border-collapse min-w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm shadow-sm">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Sesi</th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-4 text-slate-900 dark:text-slate-200 text-start">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="p-4">
                <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">Listening</td>
                <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400 flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/admin/soal-simulasi/soal-listening/${paketId}`, {
                        state: { nama_paket: namaPaket }
                      })
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Tambah Soal
                  </button>
                </td>
              </tr>
              <tr className="p-4">
                <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">Structure</td>
                <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400 flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/soal-simulasi/soal-structure/${paketId}`, {
                      state: { nama_paket: namaPaket }
                    })}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Tambah Soal
                  </button>
                </td>
              </tr>
              <tr className="p-4">
                <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">Written Expression</td>
                <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400 flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/soal-simulasi/soal-written/${paketId}`, {
                      state: { nama_paket: namaPaket }
                    })}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Tambah Soal
                  </button>
                </td>
              </tr>
              <tr className="p-4">
                <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400">Reading</td>
                <td className="border border-slate-300 dark:border-slate-700 px-4 py-4 text-slate-500 dark:text-slate-400 flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/soal-simulasi/soal-reading/${paketId}`, {
                      state: { nama_paket: namaPaket }
                    })}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Tambah Soal
                  </button>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default SesiSoal