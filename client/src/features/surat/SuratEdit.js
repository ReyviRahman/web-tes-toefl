import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const SuratEdit = () => {
  const { id } = useParams()
  const [detailSurat, setDetailSurat] = useState(null)
  const [terimaSurat, setTerimaSurat] = useState(null)
  const [fileBalasan , setFileBalasan] = useState(null)
  const [keterangan, setKeterangan] = useState('')
  const navigate = useNavigate()

  const updateSurat = async (e) => {
    e.preventDefault()
    try {
      Swal.fire({
        title: 'Updating...',
        text: 'Mohon Tunggu',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      })
      let statusSurat = "Terkirim"
      console.log('ini terima surat', terimaSurat)
      if (terimaSurat) {
        statusSurat = "Diterima"
        
        
      } else {
        statusSurat = "Ditolak"
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/surat/detailsurat/${id}`, {
          status: statusSurat,
          keterangan,
        }, {
          withCredentials: true // Mengirim cookie (jika API membutuhkan cookie)
        });
  
        Swal.fire({
          icon: 'sucess',
          title: 'Update Success',
          text: response.data.message
        }).then(() => {
          navigate(-1)
        })
      }
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Update',
        text: error.response?.data?.message || 'Terjadi kesalahan saat memperbarui surat',
      });
    }
  }
  
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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/surat/detailsurat/${id}`, {
          withCredentials: true
        })
        setDetailSurat(response.data.surat)
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
        edit_document
      </span>
        Proses Surat
      </h1>

      { detailSurat && (
        <div className='flex justify-center mt-3'>
          <form onSubmit={updateSurat} className='basis-1/2 flex flex-col border border-primary rounded p-5'>
            <h1 className='text-2xl text-center font-semibold mb-3'>Berkas {detailSurat.User.nama}</h1>

            <div className='flex flex-col mt-2'>
              <label htmlFor='nama' className='text-md font-medium text-gray-900'>
                Nama Lengkap
              </label>
              <input
                className='mt-1 border border-slate-300 focus:outline-none focus:ring-1 focus:border-sky-500 focus:ring-sky-500 rounded-md px-3 py-2 '
                id='nama'
                type='text'
                name='nama'
                value={detailSurat.User.nama}
                disabled={true}
              />
            </div>

            <div className='flex flex-col mt-2'>
              <label htmlFor='nik' className='text-md font-medium text-gray-900'>
                Nomor NIK
              </label>
              <input
                className='mt-1 border border-slate-300 focus:outline-none focus:ring-1 focus:border-sky-500 focus:ring-sky-500 rounded-md px-3 py-2 '
                id='nik'
                type='text'
                name='nik'
                value={detailSurat.nik}
                disabled={true}
              />
            </div>

            <div className='flex flex-col mt-2'>
              <label htmlFor='ttl' className='text-md font-medium text-gray-900'>
                Tempat, Tanggal Lahir
              </label>
              <input
                className='mt-1 border border-slate-300 focus:outline-none focus:ring-1 focus:border-sky-500 focus:ring-sky-500 rounded-md px-3 py-2 '
                id='ttl'
                type='text'
                name='ttl'
                value={detailSurat.User.ttl}
                disabled={true}
              />
            </div>

            <div className='flex flex-col mt-2'>
              <label htmlFor='agama' className='text-md font-medium text-gray-900'>
                Agama
              </label>
              <input
                className='mt-1 border border-slate-300 focus:outline-none focus:ring-1 focus:border-sky-500 focus:ring-sky-500 rounded-md px-3 py-2 '
                id='agama'
                type='text'
                name='agama'
                value={detailSurat.User.agama}
                disabled={true}
              />
            </div>

            <div className='flex flex-col mt-2'>
              <label htmlFor='statusPernikahan' className='text-md font-medium text-gray-900'>
                Status Pernikahan
              </label>
              <input
                className='mt-1 border border-slate-300 focus:outline-none focus:ring-1 focus:border-sky-500 focus:ring-sky-500 rounded-md px-3 py-2 '
                id='statusPernikahan'
                type='text'
                name='statusPernikahan'
                value={detailSurat.User.statusPerkawinan}
                disabled={true}
              />
            </div>

            <div className='flex flex-col mt-2'>
              <label htmlFor='alamat' className='text-md font-medium text-gray-900'>
                Alamat Lengkap
              </label>
              <textarea
                rows='3'
                className='mt-1 border border-slate-300 focus:outline-none focus:ring-1 focus:border-sky-500 focus:ring-sky-500 rounded-md px-3 py-2 '
                id='alamat'
                type='text'
                name='alamat'
                value={detailSurat.User.alamat}
                disabled={true}
              />
            </div>

            <div className='flex flex-col mt-2'>
              <label htmlFor='keperluanSurat' className='text-md font-medium text-gray-900'>
                Jenis Keperluan Surat
              </label>
              <input
                className='mt-1 border border-slate-300 focus:outline-none focus:ring-1 focus:border-sky-500 focus:ring-sky-500 rounded-md px-3 py-2 '
                id='keperluanSurat'
                type='text'
                name='keperluanSurat'
                value={detailSurat.keperluanSurat}
                disabled={true}
              />
            </div>

            <h1 className='mt-2'>KTP</h1>
            <a href={`http://localhost:3001/${detailSurat.KTP}`} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline hover:text-blue-700'>Lihat KTP</a>

            <h1 className='mt-2'>KK</h1>
            <a href={`http://localhost:3001/${detailSurat.KK}`} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline hover:text-blue-700'>Lihat KK</a>

            <h1 className='mt-2 text-center font-semibold text-2xl'>Terima Permohonan Surat?</h1>

            <div className='flex justify-around mt-1'>
              <button type="button" class="flex-1 px-4 py-1 font-semibold text-green-600 bg-green-100 border border-green-500 rounded hover:bg-green-200"
              onClick={() => setTerimaSurat(true)}>
                Ya
              </button>
              <button type="button" class="flex-1 px-4 py-1 font-semibold text-red-600 bg-red-100 border border-red-500 rounded hover:bg-red-200 ml-2"
              onClick={() => setTerimaSurat(false)}>
                Tidak
              </button>
            </div>

            {terimaSurat === true && (
              <div className='flex flex-col mt-2'>
              <label htmlFor='fileBalasan' className='text-md font-medium text-gray-900'>
                Upload Surat Balasan
              </label>
              <label htmlFor='fileBalasan' className='text-sm font-medium text-primary'>
                Upload file dalam bentuk PDF
              </label>
              <input
                className='mt-1 border border-slate-300 focus:outline-none focus:ring-1 focus:border-sky-500 focus:ring-sky-500 rounded-md px-3 py-2 '
                id='fileBalasan'
                type='file'
                name='fileBalasan'
                accept='.pdf'
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.type !== "application/pdf") {
                    alert("Hanya file PDF yang diperbolehkan!");
                    e.target.value = null;
                  } else {
                    setFileBalasan(file)
                  }
                }} 
              />
            </div>
            )}
            {terimaSurat === false && (
              <div className='flex flex-col mt-2'>
              <label htmlFor='alasanPenolakan' className='text-md font-medium text-gray-900'>
                Alasan Penolakan
              </label>
              <textarea
                rows='3'
                className='mt-1 border border-slate-300 focus:outline-none focus:ring-1 focus:border-sky-500 focus:ring-sky-500 rounded-md px-3 py-2 '
                id='alasanPenolakan'
                type='text'
                name='alasanPenolakan'
                placeholder='Berikan Alasan Penolakan'
                onChange={e => setKeterangan(e.target.value)}
              />
            </div>
            )}


            <button className='bg-primary hover:bg-primaryHover mt-5 text-white py-2 text-lg font-semibold rounded'>Kirim Berkas</button>
          </form>
        </div>
      )}

      
    </div>
  )
}

export default SuratEdit