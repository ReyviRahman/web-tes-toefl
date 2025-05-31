import React from 'react'
import useAuth from '../hooks/useAuth'
import HeaderOne from "../layouts/headers/HeaderOne";

const Home = () => {
  const { auth } = useAuth()
  console.log('ini auth di home', auth)
  return (
    <>
        <HeaderOne />
    </>
  )
}

export default Home