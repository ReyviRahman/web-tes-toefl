import React, { useState } from 'react'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NavbarUser from '../../components/NavbarUser';
import Swal from 'sweetalert2';
import FloatingWAButton from '../../components/FloatingWAButton';

const Register = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [nohp, setNohp] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Register',
        text: 'Password dan konfirmasi password tidak sama!',
      });
      return; 
    }

    Swal.fire({
      title: 'Registering...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/register`,
        { nohp, nama, password, email },
        { withCredentials: true }
      );

      Swal.close();
      navigate('/login');
    } catch (error) {
      Swal.close();

      const errorMsg = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message;
      setErrorMessage(errorMsg);

      Swal.fire({
        icon: 'error',
        title: 'Gagal Register',
        text: errorMsg,
      });
    }
  };

  return (
    <>
      <NavbarUser />
      <div className="flex justify-center px-2">
        <form className='border border-primary rounded px-6 py-4 sm:w-1/2 w-full mt-5' onSubmit={handleRegister}>
          <h1 className='text-2xl font-bold mb-2 text-primary'>Daftar Akun</h1>

          <label htmlFor="nama" className="block mb-3">
            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Nama Lengkap
            </span>
            <input
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              id="nama"
              type="text"
              name="nama"
              placeholder="Masukkan nama lengkap"
              value={nama}
              onChange={e => setNama(e.target.value)}
            />
          </label>

          <label htmlFor="nohp" className="block mb-3">
            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              NO HP
            </span>
            <input
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              id="nohp"
              type="text"
              name="nohp"
              placeholder="Masukkan NO HP"
              value={nohp}
              onChange={e => setNohp(e.target.value)}
            />
          </label>

          <label htmlFor="email" className="block mb-3">
            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Email
            </span>
            <input
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              id="email"
              type="email"
              name="email"
              placeholder="Masukkan email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
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
                {showPassword ? <IoIosEye className='text-2xl' /> : <IoIosEyeOff className='text-2xl' />}
              </button>
            </div>
          </label>
          <p className="text-xs mt-1 text-primary">Password minimal 8 karakter boleh berupa huruf, simbol, atau angka</p>
          <label htmlFor="confirmPassword" className="block">
            <span className="block text-sm font-medium text-slate-700">
              Konfirmasi Password
            </span>
            <div className="relative">
              <input
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Ulangi Password Anda"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <IoIosEye className='text-2xl' /> : <IoIosEyeOff className='text-2xl' />}
              </button>
            </div>
             {/* Menampilkan pesan error jika password tidak cocok */}
             {password && confirmPassword && password !== confirmPassword && (
                <p className="text-xs mt-1 text-red-500">Password tidak cocok.</p>
             )}
          </label>

          {errorMessage && (
            <p className="text-sm mt-2 text-red-600 text-center">{errorMessage}</p>
          )}

          <button type="submit" className="mt-4 w-full bg-primary text-white font-bold p-2 rounded-md hover:bg-blue-600">
            Register
          </button>

          <div className="mt-4 text-center text-sm">
            Sudah punya akun?
            <a
              href="/login"
              className="ml-1 text-primary font-semibold underline"
            >
              Login di sini
            </a>
          </div>
        </form>
      </div>
      <FloatingWAButton />
    </>
  )
}

export default Register;
