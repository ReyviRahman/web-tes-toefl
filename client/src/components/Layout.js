import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { Helmet } from 'react-helmet'

const Layout = () => {
  return (
    <>
      <main className='App !p-0'>
        <Outlet />
      </main>
    </>
  )
}

export default Layout