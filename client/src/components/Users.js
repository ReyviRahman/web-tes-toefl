import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios'
import useAuth from '../hooks/useAuth';
const Users = () => {
  const [ users, setUsers ] = useState()
  const { auth } = useAuth();
  const { setAuth } = useAuth();

  useEffect(() => {
    // Menampilkan Swal Loading
    Swal.fire({
      title: 'Loading users...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Fetch data dari API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users', { withCredentials: true }); // Ganti dengan URL API-mu
        setUsers(response.data.data);
        // Menutup Swal setelah data diambil
        console.log('ini cookie token', response.data)
        Swal.close();
      } catch (error) {
        console.error("Error fetching the users", error);

        // Menutup Swal dan menampilkan pesan error jika terjadi kesalahan
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    };

    fetchUsers();
  }, []);

  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   const getUsers = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3001/users', {
  //         signal: controller.signal
  //       });
  //       console.log(response.data);
  //       isMounted && setUsers(response.data)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   getUsers();

  //   return () => {
  //     isMounted = false
  //     controller.abort();
  //   }
  // }, [])

  const handleRefreshToken = async () => {
    try {
      // Token yang akan digunakan di Authorization header
      const accessToken = auth.accessToken; // Ganti dengan token kamu

      const response = await axios.get('http://localhost:3001/users/refreshtoken', {
        headers: {
          Authorization: `Bearer ${accessToken}` // Header Authorization dengan token
        }
      });
      const nik = response.data.nik;
      const role = response.data.role;
      const newToken = response.data.token;

      setAuth({ nik, role, newToken })
      console.log('ini token baru', response.data.token);

      // Menyimpan token dan role baru
      // setToken(response.data.token);
      // setRole(response.data.role);
      // setMessage(response.data.metadata);

      console.log('Token refreshed successfully:', response.data);
    } catch (error) {
      console.error('Error refreshing token:', error.response?.data || error.message);
    }
  };

  return (
    <article>
      <h2>Users list</h2>
      {users?.length
        ? (
          <ul>
            {users.map((user, i) => 
              <li key={i}>{user?.nama}</li>
            )}
          </ul>
        ) : <p>No users</p>
      }
      <button type='button' className=' bg-primary p-2 cursor-pointer me-2' onClick={handleRefreshToken}>Refresh Token</button>
      <button type='button' className=' bg-blue-300 p-2 cursor-pointer' onClick={() => {console.log(auth.accessToken)}}>Get Auth</button>
    </article>
  )
}

export default Users