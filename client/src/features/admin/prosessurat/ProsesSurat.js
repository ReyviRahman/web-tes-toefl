import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const ProsesSurat = () => {
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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/surat`, {
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
    <div>
      <h1 className='bg-secondary px-5 py-2 text-primary font-bold text-lg flex items-center gap-1'>
      <span className='material-symbols-outlined text-primary '>
        docs
      </span>
        Proses Surat
      </h1>

      <div className='overflow-x-auto mt-4 px-10 mb-6'> 
        <table className='min-w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 p-2 '>No</th>
              <th className='border border-gray-300 p-2'>Tanggal Pengajuan</th>
              <th className='border border-gray-300 p-2'>Nama</th>
              <th className='border border-gray-300 p-2'>NIK</th>
              <th className='border border-gray-300 p-2'>Tempat, Tanggal Lahir</th>
              <th className='border border-gray-300 p-2'>Agama</th>
              <th className='border border-gray-300 p-2'>Status Pernikahan</th>
              <th className='border border-gray-300 p-2'>Alamat</th>
              <th className='border border-gray-300 p-2'>Keperluan Surat</th>
              <th className='border border-gray-300 p-2'>KTP</th>
              <th className='border border-gray-300 p-2'>KK</th>
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
                <td className='border border-gray-300 p-2'>{surat.User.nama}</td>
                <td className='border border-gray-300 p-2'>{surat.nik}</td>
                <td className='border border-gray-300 p-2'>{surat.User.ttl}</td>
                <td className='border border-gray-300 p-2'>{surat.User.agama}</td>
                <td className='border border-gray-300 p-2'>{surat.User.statusPerkawinan}</td>
                <td className='border border-gray-300 p-2'>{surat.User.alamat}</td>
                <td className='border border-gray-300 p-2'>{surat.keperluanSurat}</td>
                <td className='border border-gray-300 p-2'> <a href={`http://localhost:3001/${surat.KTP}`} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline hover:text-blue-700'>KTP.pdf</a> </td>
                <td className='border border-gray-300 p-2'><a href={`http://localhost:3001/${surat.KK}`} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline hover:text-blue-700'>KK.pdf</a></td>
                <td className='text-center border border-gray-300 p-2'>
                  <NavLink to={`http://localhost:3000/dashboardadmin/prosessurat/${surat.id}`}>
                    <h1 className={`${surat.status === 'Terkirim'
                    ? 'bg-primary'
                    : surat.status === 'Ditolak'
                    ? 'bg-red-500'
                    : surat.status === 'Diterima'
                    ? 'bg-green-500'
                    : ''
                  } text-white rounded inline-block px-3 py-1`}>{surat.status}</h1>
                  </NavLink>
                </td>
                <td className='text-center border border-gray-300 p-2'>{surat.keterangan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProsesSurat