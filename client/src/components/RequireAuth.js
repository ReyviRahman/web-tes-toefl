import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios'

const RequireAuth = ({ allowedRoles }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true); // State untuk loading
  console.log('ini auth', auth);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/getAuth', { withCredentials: true }); // Ganti dengan URL API-mu
        const nik = response.data.dataUser.nik
        const nama = response.data.dataUser.nama
        const profilePic = response.data.dataUser.profilePic
        const role = response.data.dataUser.role
        setAuth({ nik, nama, role, profilePic})
        setIsLoading(false); // Update loading setelah setAuth
        // Menutup Swal setelah data diambil
        console.log('ini nik dari auth', response.data.dataUser.nik)
      } catch (error) {
        console.error("Error fetching the users", error);
      }
    }

    if (JSON.stringify(auth) === JSON.stringify({})) {
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Tampilkan loading jika sedang memproses
  if (isLoading) {
    return <div>Loading...</div>; // atau komponen loading lainnya
  }

  // Setelah loading selesai, lakukan pengecekan auth
  return (
    allowedRoles?.includes(auth?.role)
      ? <Outlet />
      : <Navigate to='/login' state={{ from: location }} replace />
  );
}

export default RequireAuth;
