import React from 'react'
import userImage from '../assets/user-image.jpg'

const Avatar = ({onClick}) => {
  return (
    <img onClick={onClick} className='rounded-full cursor-pointer' height={40} width={40} alt='Avatar' src={userImage}/>
  )
}

export default Avatar