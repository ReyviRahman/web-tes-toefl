import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const TambahSoalListening = () => {
  const { paketId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    no_soal: '',
    page: '',
    pilihan_satu: '',
    pilihan_dua: '',
    pilihan_tiga: '',
    pilihan_empat: '',
    jawaban: '',
  });
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ambil soal terakhir
  useEffect(() => {
    const fetchLastSoal = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/${paketId}/listening/last`,
          { withCredentials: true }
        );
        setForm((prev) => ({
          ...prev,
          no_soal: (res.data.last_no_soal ?? 0) + 1,
          page: (res.data.last_page ?? 0) + 1,
        }));
      } catch (err) {
        setForm((prev) => ({
          ...prev,
          no_soal: 1,
          page: 1,
        }));
      }
    };

    fetchLastSoal();
  }, [paketId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setAudio(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.no_soal ||
      !form.page ||
      !form.pilihan_satu ||
      !form.pilihan_dua ||
      !form.pilihan_tiga ||
      !form.pilihan_empat ||
      !form.jawaban ||
      !audio
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Semua field wajib diisi!',
      });
      return;
    }

    if (!['1', '2', '3', '4'].includes(form.jawaban)) {
      Swal.fire({
        icon: 'error',
        title: 'Jawaban harus antara 1 sampai 4.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('no_soal', form.no_soal);
    formData.append('page', form.page);
    formData.append('pilihan_satu', form.pilihan_satu);
    formData.append('pilihan_dua', form.pilihan_dua);
    formData.append('pilihan_tiga', form.pilihan_tiga);
    formData.append('pilihan_empat', form.pilihan_empat);
    formData.append('jawaban', form.jawaban);
    formData.append('audio', audio);

    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/${paketId}/soal-listening`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Soal berhasil ditambahkan!',
      }).then(() => {
        navigate(-1);
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal menambah soal.',
        text: err.response?.data?.message || 'Terjadi kesalahan.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Tambah Soal Listening</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">No. Soal</label>
          <input
            type="number"
            min={1}
            name="no_soal"
            className="w-full border p-2 rounded"
            value={form.no_soal}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1">Page</label>
          <input
            type="number"
            min={1}
            name="page"
            className="w-full border p-2 rounded"
            value={form.page}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1">Pilihan 1</label>
          <input
            type="text"
            name="pilihan_satu"
            className="w-full border p-2 rounded"
            value={form.pilihan_satu}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1">Pilihan 2</label>
          <input
            type="text"
            name="pilihan_dua"
            className="w-full border p-2 rounded"
            value={form.pilihan_dua}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1">Pilihan 3</label>
          <input
            type="text"
            name="pilihan_tiga"
            className="w-full border p-2 rounded"
            value={form.pilihan_tiga}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1">Pilihan 4</label>
          <input
            type="text"
            name="pilihan_empat"
            className="w-full border p-2 rounded"
            value={form.pilihan_empat}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1">Jawaban (1-4)</label>
          <select
            name="jawaban"
            className="w-full border p-2 rounded"
            value={form.jawaban}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Jawaban</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Audio</label>
          <input
            type="file"
            name="audio"
            accept="audio/*"
            onChange={handleFileChange}
          />
          {audio && <p className="text-xs text-gray-500 mt-1">{audio.name}</p>}
        </div>
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded me-2"
          onClick={() => navigate(-1)}
          disabled={loading}
        >
          Batal
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan Soal'}
        </button>
      </form>
    </div>
  );
};

export default TambahSoalListening;
