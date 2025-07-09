import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const DownloadSertifButton = () => {
  const handleDownload = async () => {
    // Menampilkan loading Swal sebelum mulai proses download
    Swal.fire({
      title: 'Memuat...',
      text: 'Sedang mempersiapkan sertifikat...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users/lastScore/sertif`,
        {
          responseType: 'blob', // Menentukan jenis response untuk file
          withCredentials: true, // Jika menggunakan cookie untuk JWT
        }
      );

      // Menutup Swal loading setelah mendapatkan response
      Swal.close();

      // Periksa status response
      if (response.status !== 200) {
        throw new Error('Gagal download sertifikat');
      }

      // Dapatkan nama file dari header (optional)
      const disposition = response.headers['content-disposition'];
      let filename = 'sertifikat.pdf';
      if (disposition && disposition.indexOf('filename=') !== -1) {
        filename = disposition.split('filename=')[1].replace(/"/g, '');
      }

      // Ambil blob dari response
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);

      // Trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Menutup Swal loading dan menampilkan error
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Terjadi Kesalahan',
        text: err.message || 'Gagal mengunduh sertifikat',
      });
    }
  };

  return (
    <button
      className="border py-2 px-3 text-center text-black underline font-semibold w-full 
                hover:bg-primary hover:text-white transition-all duration-200"
      onClick={handleDownload}
    >
      Download Sertif
    </button>
  );
};

export default DownloadSertifButton;