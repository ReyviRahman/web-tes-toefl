import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

const EditPaketSoal = () => {
  const { id } = useParams();
  const [namaPaket, setNamaPaket] = useState("");
  const [status, setStatus] = useState("belum");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaket = async () => {
      Swal.fire({
        title: "Memuat data...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/${id}`,
          { withCredentials: true }
        );
        setNamaPaket(res.data.data.nama_paket);
        setStatus(res.data.data.status);
        Swal.close();
      } catch (err) {
        if (err.response && err.response.status === 401) {
          window.location.href = "/login";
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal mengambil data paket soal",
            text: err.response?.data?.message || "Terjadi kesalahan",
          });

        }
      }
    };
    fetchPaket();
  }, [id]);

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
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/${id}`,
        { nama_paket: namaPaket, status },
        { withCredentials: true }
      );
      navigate("/admin/soal-simulasi");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        window.location.href = "/login";
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal mengupdate paket soal",
          text: err.response?.data?.message || "Terjadi kesalahan",
        });

      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="font-bold text-xl mb-4">Edit Paket Soal</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Nama Paket</label>
          <input
            type="text"
            className="border w-full rounded px-3 py-2"
            value={namaPaket}
            onChange={(e) => setNamaPaket(e.target.value)}
            placeholder="Misal: Paket A"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Status</label>
          <select
            className="border w-full rounded px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="siap">Siap</option>
            <option value="belum">Belum</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditPaketSoal;
