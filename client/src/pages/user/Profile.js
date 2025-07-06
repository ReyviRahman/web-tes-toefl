import React, { useEffect, useState, useRef } from 'react';
import NavbarUser from '../../components/NavbarUser';
import Main from '../../components/Main';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'; // Import ikon mata

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState({
    nama: auth?.nama || '',
    nohp: auth?.nohp || '',
    profilePic: auth?.profilePic || '',
  });
  const [newNohp, setNewNohp] = useState(auth?.nohp || '');
  const [previewPic, setPreviewPic] = useState('');
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    old: '',
    new: ''
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    setNewNohp(user.nohp);
  }, [user.nohp]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewNohp = (e) => setNewNohp(e.target.value);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    Swal.fire({
      title: 'Menyimpan perubahan...',
      text: 'Harap tunggu...',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const formData = new FormData();
    formData.append('nohp', user.nohp); // nohp lama
    formData.append('nama', user.nama);
    formData.append('newNohp', newNohp);

    if (profilePicFile) {
      formData.append('profilePic', profilePicFile);
    }

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/users/profile`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.data?.user) {
        setUser({
          nama: res.data.user.nama,
          nohp: res.data.user.nohp,
          profilePic: res.data.user.profilePic
        });
        setAuth((prev) => ({
          ...prev,
          nama: res.data.user.nama,
          nohp: res.data.user.nohp,
          profilePic: res.data.user.profilePic
        }));
      }

      Swal.fire({
        title: 'Sukses!',
        text: res.data.message || "Perubahan berhasil disimpan.",
        icon: 'success',
        confirmButtonText: 'OK',
      });

      setPreviewPic('');
      setProfilePicFile(null);

    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err?.response?.data?.message || "Terjadi kesalahan saat menyimpan perubahan.",
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handlePasswordInput = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async () => {
    const { old, new: newPass } = passwordForm;

    if (!old || !newPass) {
      Swal.fire({
        icon: 'warning',
        title: 'Lengkapi Data',
        text: 'Harap isi password lama dan baru.',
      });
      return;
    }

    try {
      Swal.fire({
        title: 'Memproses...',
        text: 'Mengubah password...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/users/update-password`,
        { 
          nohp: auth.nohp,
          oldPassword: old,
          newPassword: newPass 
        },
        {
          withCredentials: true
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: res.data.message || 'Password berhasil diperbarui.',
      });

      setShowPasswordModal(false);
      setPasswordForm({ old: '', new: '' });

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: err.response?.data?.message || 'Terjadi kesalahan saat memperbarui password.',
      });
    }
  };

  return (
    <div>
      <NavbarUser />
      <Main>
        <div className="container mx-auto py-6 px-4">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
            <div className="text-center relative">
              <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                Profile User
              </h1>
              <img
                src={
                  previewPic ||
                  (user.profilePic
                    ? `${process.env.REACT_APP_API_BASE_URL}${user.profilePic}`
                    : '/default-profile.png'
                  )
                }
                alt="Foto Profil"
                className="w-32 h-32 rounded-full mx-auto object-cover border mb-2"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="mt-2 px-4 py-1 text-sm border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
              >
                Ubah Foto
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>

            <div className="mb-4 mt-6">
              <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={user.nama}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="newNohp" className="block text-sm font-medium text-gray-700 mb-1">
                Nomor HP
              </label>
              <input
                type="text"
                id="newNohp"
                name="newNohp"
                value={newNohp}
                onChange={handleNewNohp}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Masukkan nomor HP baru jika ingin mengubah"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
            >
              Simpan Perubahan
            </button>

            <button
              onClick={() => setShowPasswordModal(true)}
              className="mt-3 w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Ubah Password
            </button>
          </div>
        </div>

        {/* Modal Password */}
        {showPasswordModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={() => setShowPasswordModal(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Ubah Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Password Lama</label>
                  <div className="relative">
                    <input
                      type={showPassword.old ? 'text' : 'password'}
                      name="old"
                      value={passwordForm.old}
                      onChange={handlePasswordInput}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword({ ...showPassword, old: !showPassword.old })}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                    >
                      {showPassword.old ? <IoIosEye /> : <IoIosEyeOff />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Password Baru</label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? 'text' : 'password'}
                      name="new"
                      value={passwordForm.new}
                      onChange={handlePasswordInput}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                    >
                      {showPassword.new ? <IoIosEye /> : <IoIosEyeOff />}
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={handlePasswordSubmit}
                className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
              >
                Simpan Password
              </button>
            </div>
          </div>
        )}
      </Main>
    </div>
  );
};

export default Profile;
