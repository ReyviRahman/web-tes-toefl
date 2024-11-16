import React from 'react'
import logoWeb from '../assets/logoYTEA.png'

const Logo = () => {
  return (
    <div className='flex items-center md:gap-4 gap-2'>
      <img alt='Logo' src={logoWeb} width={80} height={80} className='cursor-pointer rounded-full'/>
      <h1 className='md:text-2xl text-xl font-semibold' style={{lineHeight: 1}}>Yanto Tanjung <br /> English Academy</h1>
    </div>
  )
}

export default Logo