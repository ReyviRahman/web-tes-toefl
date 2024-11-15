import React, { useState } from 'react'
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { NavLink, Outlet } from 'react-router-dom';

const DashboardAdmin = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className='flex'>
      <div className={`${open ? 'w-72' : 'w-20'} min-h-screen bg-primary p-5 pt-8 relative duration-300`}>
        <span className={`material-symbols-outlined text-primary bg-white absolute cursor-pointer -right-3 top-9 w-7 border-primary border-2 rounded-full ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}>
          chevron_right
        </span>
        <NavLink to='/dashboardadmin/admin'>
          <div className='flex items-center text-white gap-x-3 cursor-pointer w-60'>
            <span className='material-symbols-outlined text-white text-3xl'>
              admin_panel_settings
            </span>
            <h1 className={`text-lg font-semibold origin-left duration-200 ${!open && 'scale-0'}`}>Dashboard Admin</h1>
          </div>

        </NavLink>
        <div className='mt-9 flex flex-col gap-2'>
          <NavLink to='/dashboardadmin/prosessurat' className={({ isActive }) => `text-white font-semibold rounded-md py-1 pl-1 cursor-pointer transition-all block ${ isActive ? 'bg-secondary' : 'hover:bg-secondary'}`}>
          <div className='flex items-center gap-x-2'>
            <span className='material-symbols-outlined text-white '>
              docs
            </span> 
            <h1 className={`${!open && 'hidden'}`}>Proses Surat</h1> 
          </div>
          </NavLink>

          <NavLink to='/prosessurat' className={({ isActive }) => `text-white font-semibold rounded-md py-1 pl-1 cursor-pointer transition-all block ${ isActive ? 'bg-secondary' : 'hover:bg-secondary'}`}>
          <div className='flex items-center gap-x-2'>
            <span className="material-symbols-outlined">
              diversity_3
            </span> 
            <h1 className={`${!open && 'hidden'}`}>Data Warga</h1> 
          </div>
          </NavLink>

          <NavLink to='/prosessurat' className={({ isActive }) => `text-white font-semibold rounded-md py-1 pl-1 cursor-pointer transition-all block ${ isActive ? 'bg-secondary' : 'hover:bg-secondary'}`}>
          <div className='flex items-center gap-x-2'>
            <span className="material-symbols-outlined">
              campaign
            </span> 
            <h1 className={`${!open && "hidden"}`}>Berita dan Pengumuman</h1> 
          </div>
          </NavLink>
        </div>
      </div>
      <div className='flex-1 overflow-x-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardAdmin