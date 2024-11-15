import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Swal from 'sweetalert2';
import axios from 'axios';

const SuratList = () => {
  const [suratData, setSuratData] = useState([])
  
  useEffect(() => {
    const fetchSurat = async () => {
      Swal.fire({
        title: 'Mohon Tunggu',
        text: 'Mengambil Data Surat',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/surat/suratuser`, {
          withCredentials: true
        })

        setSuratData(response.data.allSurat)

        Swal.close()
      } catch (error) {
        Swal.close()
        console.log(error)
      }
    }

    fetchSurat()
  }, [])

  return (
    <>
      <h1 className='text-center text-3xl font-semibold mt-3'>Riwayat Pengajuan Surat</h1>
      <div className='overflow-x-auto mt-4 px-10 mb-6'> {/* Membungkus tabel dengan div untuk scroll horizontal */}
        <table className='min-w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 p-2 '>No</th>
              <th className='border border-gray-300 p-2'>Tanggal Pengajuan</th>
              <th className='border border-gray-300 p-2'>Keperluan Surat</th>
              <th className='border border-gray-300 p-2'>Status</th>
              <th className='border border-gray-300 p-2'>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {suratData.map((surat, index) => (
              <tr key={index + 1}>
                <td className='text-center border border-gray-300 p-2'>{index + 1}</td>
                <td className='text-center border border-gray-300 p-2'>{new Date(surat.createdAt).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}</td>
                <td className='border border-gray-300 p-2'>{surat.keperluanSurat}</td>
                <td className='text-center border border-gray-300 p-2'><h1 className={`${surat.status === 'Terkirim'
                  ? 'bg-primary'
                  : surat.status === 'Ditolak'
                  ? 'bg-red-500'
                  : surat.status === 'Diterima'
                  ? 'bg-green-500'
                  : ''
                } text-white rounded inline-block px-3 py-1`}>{surat.status}</h1></td>
                <td className='text-center border border-gray-300 p-2'>{surat.keterangan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
};

export default SuratList;
