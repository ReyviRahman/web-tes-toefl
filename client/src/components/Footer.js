import React from 'react'
import logoweb from '../assets/logo.jpeg'
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-primary py-6'>
      <div className='container mx-auto'>
        <div className='flex items-center gap-2'>
          <div className='basis-1/2 flex items-center'>
            <img src={logoweb} width={130} alt='logo web' className='rounded-full'/>
            <h1 className='text-white ms-5  font-semibold text-justify'>RT 11 Perumahan Valencia, Desa Mendalo Indah, Kecamatan Jambi Luar Kota, Kabupaten Muaro Jambi</h1>
          </div>
          <div className='basis-1/2 flex flex-col justify-center'>
            <h1 className='text-white text-center text-xl font-semibold'>Kontak Kami</h1>
            <h1 className='text-center text-white text-xl'>+62 8000-0000-0000</h1>
            <div className='flex justify-center gap-2'>
              <FaFacebook className='text-3xl text-white' />
              <FaInstagram className='text-3xl text-primary bg-white rounded-full p-1' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer