import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2';
import { IoIosEye, IoIosEyeOff  } from "react-icons/io";

const Register = () => {
  const navigate = useNavigate()
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [ttl, setTtl] = useState('');
  const [jk, setJk] = useState('Laki-Laki');
  const [alamat, setAlamat] = useState('');
  const [agama, setAgama] = useState('');
  const [status, setStatus] = useState('Sudah Kawin');
  const [pekerjaan, setPekerjaan] = useState('');
  const [fileFoto, setFileFoto] = useState(null)

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nik', nik);
    formData.append('nama', nama);
    formData.append('ttl', ttl);
    formData.append('jk', jk);
    formData.append('alamat', alamat);
    formData.append('agama', agama);
    formData.append('statusPerkawinan', status);
    formData.append('pekerjaan', pekerjaan);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profilePic', fileFoto);
  
    try {
      // Tampilkan Swal loading
      Swal.fire({
        title: 'Please wait...',
        text: 'Registering your account...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      // Hit API registrasi
      const response = await axios.post('http://localhost:3001/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Jika sukses, tutup Swal loading dan tampilkan pesan sukses
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: response.data.message,
      });
    } catch (error) {
      // Jika gagal, tutup Swal loading dan tampilkan pesan error
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <div className="container flex justify-center mx-auto">
      <form className='border border-primary rounded px-6 py-4 w-1/2 mb-10 mt-5' onSubmit={handleRegister}>
        <h1 className='text-2xl font-bold mb-2 text-primary text-center'>Register</h1>

        <label htmlFor="nik" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            NIK
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="nik"
          type="text"
          name="nik"
          placeholder="Masukkan NIK"
          value={nik}
          onChange={e => setNik(e.target.value)} />
        </label>

        <label htmlFor="nama" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Nama
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="nama"
          type="text"
          name="nama"
          placeholder="Masukkan Nama"
          value={nama}
          onChange={e => setNama(e.target.value)} />
        </label>

        <label htmlFor="ttl" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Tempat, Tanggal Lahir
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="ttl"
          type="text"
          name="ttl"
          placeholder="Masukkan Tempat Tanggal Lahir"
          value={ttl}
          onChange={e => setTtl(e.target.value)} />
        </label>

        <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          Jenis Kelamin
        </span>
        <select
          className="mt-1 mb-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          id="jk"
          name="jk"
          value={jk}
          onChange={e => setJk(e.target.value)}
        >
          <option value="Laki-Laki">Laki-Laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>

        <label htmlFor="alamat" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Alamat Lengkap
          </span>
          <textarea rows={4} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="alamat"
          type="alamat"
          name="alamat"
          placeholder="Masukkan Alamat Lengkap"
          value={alamat}
          onChange={e => setAlamat(e.target.value)} />
        </label>

        <label htmlFor="agama" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Agama
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="agama"
          type="text"
          name="agama"
          placeholder="Masukkan Agama"
          value={agama}
          onChange={e => setAgama(e.target.value)} />
        </label>

        <label htmlFor="status" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Status Perkawinan
          </span>
          <select
          className="mt-1 mb-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          id="status"
          name="status"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="Sudah Kawin">Sudah Kawin</option>
          <option value="Belum Kawin">Belum Kawin</option>
        </select>
        </label>

        <label htmlFor="pekerjaan" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Pekerjaan
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="pekerjaan"
          type="text"
          name="pekerjaan"
          placeholder="Masukkan Pekerjaan"
          value={pekerjaan}
          onChange={e => setPekerjaan(e.target.value)} />
        </label>

        <label htmlFor="fileFoto" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Upload Foto
          </span>
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
            id="fileFoto"
            type="file"
            name="fileFoto"
            onChange={(e) => setFileFoto(e.target.files[0])} // Mengambil file yang dipilih
          />
        </label>

        <label htmlFor="email" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Email
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="email"
          type="email"
          name="email"
          placeholder="Masukkan Email"
          value={email}
          onChange={e => setEmail(e.target.value)} />
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
      
        <button type="submit" className="mt-4 w-full bg-primary text-white font-bold p-2 rounded-md hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  )
}

export default Register