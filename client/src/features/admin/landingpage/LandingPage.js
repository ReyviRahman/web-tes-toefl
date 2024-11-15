import React from 'react'
import ImgSelamatDatang from '../../../assets/img-selamat-datang-admin.png'

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1/2 pt-5 px-8">
      <h1 className="text-3xl text-white font-bold">Dashboard Admin</h1>
      <div className="flex items-center justify-around shadow-lg rounded-lg bg-white mt-5">
        <h1 className="text-3xl text-primary font-bold">Selamat Datang Admin</h1>
        <img src={ImgSelamatDatang} width={300} alt="gbr selamat datang" />
      </div>

      <div className='flex justify-between gap-3 mt-5'>
        <div className='bg-primary flex-1 px-4 py-2 rounded text-white font-semibold flex items-center'>
          <div className='flex-1'>
            <h1>Surat Masuk</h1>
            <h1>0</h1>
          </div>
          <span class="material-symbols-outlined text-5xl">
            upload_file
          </span>
        </div>
        <div className='bg-primary flex-1 px-4 py-2 rounded text-white font-semibold flex items-center'>
          <div className='flex-1'>
            <h1>Jumlah Penduduk</h1>
            <h1>0</h1>
          </div>
          <span class="material-symbols-outlined text-5xl">
            diversity_3
          </span>
        </div>
      </div>

    </div>

  )
}

export default LandingPage