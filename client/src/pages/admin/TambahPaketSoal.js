import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TambahPaketSoal = () => {
  const [namaPaket, setNamaPaket] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaPaket) {
      Swal.fire({ icon: "warning", title: "Nama paket wajib diisi!" });
      return;
    }

    Swal.fire({
      title: "Menyimpan...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal`,
        { nama_paket: namaPaket }, // Tidak ada field status
        { withCredentials: true }
      );
      navigate("/admin/soal-simulasi");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        window.location.href = "/login";
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal menambah paket soal",
          text: err.response?.data?.message || "Terjadi kesalahan",
        });

      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="font-bold text-xl mb-4">Tambah Paket Soal</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Nama Paket</label>
          <input
            type="text"
            className="border w-full rounded px-3 py-2"
            value={namaPaket}
            onChange={(e) => setNamaPaket(e.target.value)}
            placeholder="Masukkan Nama Paket"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default TambahPaketSoal;
