import React, { useState } from 'react'
import { IoIosEye, IoIosEyeOff  } from "react-icons/io";
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation} from 'react-router-dom'
import NavbarUser from '../../components/NavbarUser';
import Swal from 'sweetalert2';
import FloatingWAButton from '../../components/FloatingWAButton';

const Login = () => {
  const { setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const [nohp, setNohp] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault();

    // Tampilkan loading swal
    Swal.fire({
      title: 'Logging in...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/login`,
        { nohp, password },
        { withCredentials: true }
      );

      Swal.close(); // Tutup loading swal

      console.log('Login success:', response.data);
      const nama = response.data.nama;
      const role = response.data.role;
      const profilePic = response.data.profilePic;

      setAuth({ nohp, nama, role, profilePic });

      if (role === "User") {
        navigate('/paketsoal');
      } else {
        navigate('/admin');
      }
    } catch (error) {
      Swal.close(); // Tutup loading swal meskipun gagal

      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage(error.message);
      }

      // Tampilkan pesan error swal
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: error.response?.data?.error || error.message,
      });
    }
  };


  return (
    <>
      <NavbarUser />
      <div className="">
        <div className='flex justify-center px-2'>
          <form className='border border-primary rounded px-6 py-4 sm:w-1/2 w-full mt-5' onSubmit={handleLogin}>
            <h1 className='text-2xl font-bold mb-2 text-primary'>Login</h1>

            <label htmlFor="nohp" className="block mb-3">
              <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                NO HP
              </span>
              <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
              id="nohp"
              type="text"
              name="nohp"
              placeholder="Masukkan NO HP"
              value={nohp}
              onChange={e => setNohp(e.target.value)} />
            </label>

            <label htmlFor="password" className="block">
              <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Password
              </span>
              <div className="relative">
                <input
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Masukkan Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 focus:outline-none"
                >
                  {showPassword ? <IoIosEye className='text-2xl'/> : <IoIosEyeOff className='text-2xl'/> }
                </button>
              </div>
            </label>
            {errorMessage && (
              <p className="text-sm mt-2 text-red-600 text-center">{errorMessage}</p>
            )}
            <button type="submit" className="mt-4 w-full bg-primary text-white font-bold p-2 rounded-md hover:bg-blue-600">
              Login
            </button>
            <div className="mt-4 text-center text-sm">
              Belum punya akun?
              <a
                href="/register"
                className="ml-1 text-primary font-semibold hover:underline"
              >
                Daftar di sini
              </a>
            </div>
          </form>

        </div>
      </div>
      <FloatingWAButton />
    </>
  )
}

export default Login