import React from 'react'
import logoWeb from '../assets/logo.jpeg'

const Logo = () => {
  return (
    <div className='flex items-center md:gap-4 gap-2'>
      <img alt='Logo' src={logoWeb} width={50} height={50} className='cursor-pointer rounded-full'/>
      <h1 className='md:text-2xl text-xl font-semibold'>Website RT</h1>
    </div>
  )
}

export default Logo