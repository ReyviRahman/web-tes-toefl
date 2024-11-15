import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import { MdMenu } from "react-icons/md";
import Dropdown from './Dropdown'
import { NavLink, useLocation } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import Swal from 'sweetalert2'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Navbar = () => {
  const { auth, setAuth } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();
	const isActive = location.pathname === '/suratpengantar' || location.pathname === '/cekstatussurat';

	useEffect(() => {
    const fetchUserData = async () => {
      // Menampilkan SweetAlert loading sebelum memulai fetching data
      Swal.fire({
        title: 'Loading...',
        text: 'Mohon tunggu, sedang mengambil data pengguna',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); // Tampilkan loading spinner
        }
      });

      try {
        const response = await axios.get('http://localhost:3001/users/getAuth', { withCredentials: true });
        const { nik, nama, profilePic, role } = response.data.dataUser;
        setAuth({ nik, nama, role, profilePic });

        console.log('ini profilePic', profilePic);
        console.log('ini nik dari auth', response.data.dataUser.nik);

        Swal.close();
      } catch (error) {
        console.error("Error fetching the users", error);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Gagal mengambil data pengguna!',
          footer: 'Silakan coba lagi nanti'
        });
      }
    };

    if (JSON.stringify(auth) === JSON.stringify({})) {
      fetchUserData();
    }
  }, [auth, setAuth]);

	return (
		<header className='w-full sticky z-10 top-0 flex justify-between items-center text-white py-4 px-8 bg-primary md:px-32 drop-shadow-md'>
			<Logo />
			<ul className='hidden xl:flex items-center gap-4 font-semibold text-base'>
				<NavLink exact='true' to='/' className={({ isActive }) => `rounded-md py-1 px-5 cursor-pointer transition-all ${ isActive ? 'bg-secondary text-white' : 'hover:bg-secondary'}`}>
					Beranda
				</NavLink>
				<NavLink to='/keuangan' className={({ isActive }) => `rounded-md py-1 px-5 cursor-pointer transition-all ${ isActive ? 'bg-secondary text-white' : 'hover:bg-secondary'}`}>
					Keuangan
				</NavLink>

				{ auth?.role == "Admin" && (
					<NavLink to='/dashboardadmin/admin' className={({ isActive }) => `rounded-md py-1 px-5 cursor-pointer transition-all ${ isActive ? 'bg-secondary text-white' : 'hover:bg-secondary'}`}>
						Dashboard Admin
					</NavLink>
				)}

				{ auth?.role === "User" && (
					<Menu as="div" className="relative inline-block text-left">
						<div>
							<MenuButton className={`inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-1  font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-secondary ${isActive ? 'bg-secondary' : ''}`}>
								Layanan
								<ChevronDownIcon aria-hidden="true" className="-mr-1 h-6 w-6 text-gray-400" />
							</MenuButton>
						</div>
			
						<MenuItems
							transition
							className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
						>
							<div className="py-1">
								<MenuItem>
									<NavLink
									to='/suratpengantar'
										className={({ isActive }) => `block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-secondary data-[focus]:text-gray-900 ${isActive ? 'bg-secondary text-white' : ''}`}
									>
										Surat Pengantar
									</NavLink>
								</MenuItem>
								<MenuItem>
									<NavLink
									to='/cekstatussurat'
										className={({ isActive }) => `block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-secondary data-[focus]:text-gray-900 ${isActive ? 'bg-secondary text-white' : ''}`}
									>
										Cek Status Surat
									</NavLink>
								</MenuItem>
								
							</div>
						</MenuItems>
					</Menu>
				)}
				
			</ul>
			{auth?.nama !== "" ? (
        <Dropdown nama={auth?.nama} profilePic={`http://localhost:3001/${auth?.profilePic}`} />
      ) : (
        <div>
					<NavLink to='/login' className={({ isActive }) => `me-2 rounded-md py-1 px-5 cursor-pointer font-semibold transition-all border-secondary border-2 ${ isActive ? 'bg-secondary text-white' : 'hover:bg-secondary'}`}>
						Login
					</NavLink>

					<NavLink to='/register' className={({ isActive }) => `rounded-md py-1 px-5 cursor-pointer font-semibold transition-all border-secondary border-2 ${ isActive ? 'bg-secondary text-white' : 'hover:bg-secondary'}`}>
						Register
					</NavLink>
				</div>
      )}
			
			<MdMenu className='lg:hidden block text-3xl cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}/>

			{ isMenuOpen && (
				<div className={`absolute xl:hidden top-20 left-0 w-full bg-primary flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? "opacity-100" : "opacity-0"}`} style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>
					<NavLink to='/'>
						<li className='list-none w-full text-center p-4 hover:bg-secondary hover:text-white transition-all cursor-pointer'>Beranda</li>
					</NavLink>
					<li className='list-none w-full text-center p-4 hover:bg-secondary hover:text-white transition-all cursor-pointer'>Products</li>
					<li className='list-none w-full text-center p-4 hover:bg-secondary hover:text-white transition-all cursor-pointer'>Explore</li>
					<li className='list-none w-full text-center p-4 hover:bg-secondary hover:text-white transition-all cursor-pointer'>Contact</li>
				</div>
			)}
			
			{/* <div className={`absolute xl:hidden top-20 left-0 w-full bg-primary flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? "opacity-100" : "opacity-0"}`} style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>
				<NavLink to='/'>
					<li className='list-none w-full text-center p-4 hover:bg-secondary hover:text-white transition-all cursor-pointer'>Beranda</li>
				</NavLink>
				<li className='list-none w-full text-center p-4 hover:bg-secondary hover:text-white transition-all cursor-pointer'>Products</li>
				<li className='list-none w-full text-center p-4 hover:bg-secondary hover:text-white transition-all cursor-pointer'>Explore</li>
				<li className='list-none w-full text-center p-4 hover:bg-secondary hover:text-white transition-all cursor-pointer'>Contact</li>
			</div> */}
		</header>
	)
}

export default Navbar