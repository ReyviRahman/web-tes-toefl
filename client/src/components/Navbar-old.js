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
const baseURL = "http://localhost:3001";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();
	const isActive = location.pathname === '/suratpengantar' || location.pathname === '/cekstatussurat';

	useEffect(() => {
    const fetchUserData = async () => {
      Swal.fire({
        title: 'Loading...',
        text: 'Mohon tunggu, sedang mengambil data pengguna',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); 
        }
      });

      try {
        const response = await axios.get(`${baseURL}/users/getAuth`, { withCredentials: true });
        const { nohp, nama, profilePic, role } = response.data.dataUser;
        setAuth({ nohp, nama, role, profilePic });

        console.log('ini profilePic', profilePic);
        console.log('ini nohp dari auth', response.data.dataUser.nohp);

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
		<header className='w-full sticky z-10 top-0 flex justify-between items-center text-white py-1 px-8 bg-primary md:px-32 drop-shadow-md'>
			<Logo />

      <h1 className='border border-white px-4 py-2 rounded-md'>Berlangganan Youtube</h1>
      <h1 className='border border-white px-4 py-2 rounded-md'>Simulasi</h1>
			
			{auth?.nama !== "" ? (
        <Dropdown nama={auth?.nama} profilePic={`${baseURL}/${auth?.profilePic}`} />
      ) : (
        <div>
					<NavLink to='/login' className={({ isActive }) => `me-2 rounded-md py-1 px-5 cursor-pointer font-semibold transition-all border-secondary border-2 ${ isActive ? 'bg-secondary text-white' : 'hover:bg-secondary'}`}>
						Login
					</NavLink>

					<NavLink to='/register' className={({ isActive }) => `hidden rounded-md py-1 px-5 cursor-pointer font-semibold transition-all border-secondary border-2 ${ isActive ? 'bg-secondary text-white' : 'hover:bg-secondary'}`}>
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
			
		</header>
	)
}

export default Navbar