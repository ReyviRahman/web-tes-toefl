import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-scroll';
import useAuth from '../hooks/useAuth';
import { NavLink, useLocation } from 'react-router-dom';
import Dropdown from './Dropdown';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const navigation = [
  { name: 'Daftar', to: 'daftar', current: true },
  { name: 'Fasilitas', to: 'fasilitas', current: false },
  { name: 'Profile', to: 'profile', current: false },
  { name: 'Testimoni', to: 'testimoni', current: false },
  { name: 'Berlangganan', to: 'berlangganan', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

  

export default function NavbarUser() {
  const { auth, setAuth } = useAuth();
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
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/getAuth`, { withCredentials: true });
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

  const location = useLocation();
  const isActiveCustom =
    location.pathname.startsWith("/paketsoal") ||
    location.pathname.startsWith("/simulasi-toefl");

  return (
    <Disclosure as="nav" className="sticky top-0 z-10 bg-primary shadow-xl ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#4300FF] hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center sm:ms-0 ms-12 sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <a href='/'>
                <img
                  alt="Your Company"
                  src="/logoYTEAnav.jpg"
                  className="sm:h-14 h-10 w-auto rounded-full"
                />
              </a>
              <a href='/' className='md:text-xl ms-2 text-base text-white font-semibold sm:block' style={{lineHeight: 1}}>Yanto Tanjung <br /> English Academy</a>
            </div>
            <div className="hidden sm:ml-6 sm:flex items-center">
              <nav className="flex space-x-4">
                <NavLink
                  to="/paketsoal"
                  className={`px-3 py-2 rounded-lg transition text-sm
                    ${isActiveCustom
                      ? "bg-[#4300FF] text-white"
                      : "text-gray-300 hover:bg-[#6528F7] hover:text-white"}`}
                >
                  Simulasi
                </NavLink>
                <NavLink
                  to="/paket-saya"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition text-sm
                    ${isActive
                      ? "bg-[#4300FF] text-white"
                      : "text-gray-300 hover:bg-[#6528F7] hover:text-white"}`
                  }
                >
                  Paket Saya
                </NavLink>
                <NavLink
                  to="/riwayat-ujian"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition text-sm
                    ${isActive
                      ? "bg-[#4300FF] text-white"
                      : "text-gray-300 hover:bg-[#6528F7] hover:text-white"}`
                  }
                >
                  Riwayat Simulasi
                </NavLink>
                <NavLink
                  to="/mini-test"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition text-sm
                    ${isActive
                      ? "bg-[#4300FF] text-white"
                      : "text-gray-300 hover:bg-[#6528F7] hover:text-white"}`
                  }
                >
                  Mini Test
                </NavLink>
              </nav>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button
              type="button"
              className="relative rounded-full bg-primary p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button> */}

            {/* Profile dropdown */}
            {auth?.nama ? (
                <Dropdown nama={auth?.nama} 
                profilePic={`${process.env.REACT_APP_API_BASE_URL}${auth?.profilePic}`} role={auth?.role}/>
              ) : (
                <div>
                  <NavLink to='/login' className={({ isActive }) => `text-sm me-1 text-white  rounded-md py-1 sm:px-5 px-2 cursor-pointer transition-all bg-[#6528F7]`}>
                    Login
                  </NavLink>

                  <NavLink to='/register' className={({ isActive }) => `text-sm text-white  rounded-md py-1 sm:px-5 px-2 cursor-pointer transition-all border border-[#6528F7] hover:bg-[#6528F7]`}>
                    Daftar
                  </NavLink>
                  
                </div>
            )}
            
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <nav className="flex flex-col space-y-2">
            <NavLink
              to="/paketsoal"
              className={`px-3 py-2 rounded-lg transition text-sm
                ${isActiveCustom
                  ? "bg-[#4300FF] text-white"
                  : "text-gray-300 hover:bg-[#6528F7] hover:text-white"}`}
            >
              Simulasi
            </NavLink>
            <NavLink
              to="/paket-saya"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition text-sm
                ${isActive
                  ? "bg-[#4300FF] text-white"
                  : "text-gray-300 hover:bg-[#6528F7] hover:text-white"}`
              }
            >
              Paket Saya
            </NavLink>
            <NavLink
              to="/riwayat-ujian"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition text-sm
                ${isActive
                  ? "bg-[#4300FF] text-white"
                  : "text-gray-300 hover:bg-[#6528F7] hover:text-white"}`
              }
            >
              Riwayat Simulasi
            </NavLink>
            <NavLink
              to="/mini-test"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition text-sm
                ${isActive
                  ? "bg-[#4300FF] text-white"
                  : "text-gray-300 hover:bg-[#6528F7] hover:text-white"}`
              }
            >
              Mini Test
            </NavLink>
          </nav>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
