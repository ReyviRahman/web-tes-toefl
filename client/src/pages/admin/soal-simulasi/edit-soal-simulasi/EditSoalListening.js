import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const EditSoalListening = () => {
  const { soalId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    pilihan_satu: '',
    pilihan_dua: '',
    pilihan_tiga: '',
    pilihan_empat: '',
    jawaban: '',
    no_soal: '',
    page: '',
  });
  const [audio, setAudio] = useState(null);
  const [audioPreview, setAudioPreview] = useState('');
  const [loading, setLoading] = useState(false);

  // Ambil data soal berdasarkan soalId
  useEffect(() => {
    const fetchSoal = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/soal/${soalId}`,
          { withCredentials: true }
        );
        const data = res.data.data;
        setForm({
          pilihan_satu: data.pilihan_satu,
          pilihan_dua: data.pilihan_dua,
          pilihan_tiga: data.pilihan_tiga,
          pilihan_empat: data.pilihan_empat,
          jawaban: data.jawaban,
          no_soal: data.no_soal,
          page: data.page,
        });
        setAudioPreview(`${process.env.REACT_APP_API_BASE_URL}${data.audio}`);
      } catch (error) {
        Swal.fire('Error', 'Gagal mengambil data soal.', 'error');
      }
    };
    fetchSoal();
  }, [soalId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAudio(e.target.files[0]);
    setAudioPreview(URL.createObjectURL(e.target.files[0]));
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
      !form.jawaban
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
    if (audio) {
      formData.append('audio', audio);
    }

    setLoading(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/${soalId}/soal-listening`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Soal berhasil diupdate!',
      }).then(() => {
        navigate(-1);
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal update soal.',
        text: err.response?.data?.message || 'Terjadi kesalahan.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Edit Soal Listening</h2>
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
          <label className="block mb-1">Audio (Kosongkan jika tidak ingin mengganti)</label>
          <input
            type="file"
            name="audio"
            accept="audio/*"
            onChange={handleFileChange}
          />
          {(audioPreview && (
            <div className="mt-2">
              <audio controls src={audioPreview} className="w-full" />
              <span className="block text-xs text-gray-500 mt-1">
                Preview Audio
              </span>
            </div>
          ))}
          {audio && !audioPreview && (
            <p className="text-xs text-gray-500 mt-1">{audio.name}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
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
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSoalListening;
