import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-medium-image-zoom/dist/styles.css'
import ImageZoom from 'react-medium-image-zoom';
import { IoArrowBackCircle } from "react-icons/io5";

const TambahSoalReading = () => {
  const { paketId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    no_soal: '',
    page: '',
    soal: '',
    pilihan_satu: '',
    pilihan_dua: '',
    pilihan_tiga: '',
    pilihan_empat: '',
    jawaban: '',
  });
  const [loading, setLoading] = useState(false);
  const [qReading, setQReading] = useState('');
  const [qReadingNama, setQReadingNama] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [nama, setNama] = useState("");
  const [soalFile, setSoalFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  // Untuk form edit:
  const [editNama, setEditNama] = useState('');
  const [editFile, setEditFile] = useState(null);
  const [editPreviewUrl, setEditPreviewUrl] = useState(null);

  // Ambil soal terakhir
  useEffect(() => {
    const fetchLastSoal = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/${paketId}/reading/last`,
          { withCredentials: true }
        );
        setForm((prev) => ({
          ...prev,
          no_soal: (res.data.last_no_soal ?? 0) + 1,
          page: (res.data.last_page ?? 0) + 1,
        }));
      } catch (err) {
        if (err.response && err.response.status === 401) {
          window.location.href = "/login";
        } else {
          setForm((prev) => ({
            ...prev,
            no_soal: 1,
            page: 1,
          }));

        }
      }
    };

    fetchLastSoal();
    fetchQuestions();
  }, [paketId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validasi inputan form
    if (
      !form.no_soal ||
      !form.page ||
      !form.soal ||
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

    if (!qReading) {
      Swal.fire({
        icon: 'warning',
        title: 'Pilih Question Reading pada tabel di atas',
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

    // Siapkan objek data JSON
    const data = {
      no_soal: form.no_soal,
      page: form.page,
      soal: form.soal,
      pilihan_satu: form.pilihan_satu,
      pilihan_dua: form.pilihan_dua,
      pilihan_tiga: form.pilihan_tiga,
      pilihan_empat: form.pilihan_empat,
      jawaban: form.jawaban,
      q_reading: qReading
    };

    setLoading(true);
    try {
      // Kirim data sebagai JSON
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/${paketId}/soal-reading`,
        data,  // Kirim data dalam format JSON
        {
          headers: { 'Content-Type': 'application/json' }, // Header untuk JSON
          withCredentials: true,
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Soal berhasil ditambahkan!',
      }).then(() => {
        navigate(-1);
      });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        window.location.href = "/login";
      } else {

        Swal.fire({
          icon: 'error',
          title: 'Gagal menambah soal.',
          text: err.response?.data?.message || 'Terjadi kesalahan.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTambahSoal = () => {
    setShowForm(true);
    setNama("");
    setSoalFile(null);
  };

  const handleModalBgClick = (e) => {
    if (e.target.id === "modal-bg") {
      setShowForm(false);
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/question-reading/${paketId}`, {withCredentials: true});
      setQuestions(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        window.location.href = "/login";
      }
      setQuestions([]);
    }
    setLoading(false);
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    if (
      soalFile &&
      !["image/jpeg", "image/png", "image/jpg"].includes(soalFile.type)
    ) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "File harus berupa gambar (jpg, jpeg, png).",
      });
      return;
    }

    Swal.fire({
      title: "Mengupload...",
      html: "Mohon tunggu sebentar.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("soal-reading", soalFile);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/${paketId}/question-reading`,
        formData,
        { 
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: res.data.message,
      });
      setShowForm(false);
      setNama("");
      setSoalFile(null);
      setPreviewUrl(null);
      fetchQuestions();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        window.location.href = "/login";
      } else {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text:
            err.response?.data?.message ||
            "Gagal menambah soal reading.",
        });

      }
    }
  };

  const handleUpdateQuestion = async (e) => {
    e.preventDefault();
    if (!editNama) {
      Swal.fire({
        icon: 'warning',
        title: 'Nama soal wajib diisi',
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nama', editNama);
      if (editFile) {
        formData.append('soal-reading', editFile);
      }

      const res = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/question-reading/${editData.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );

      Swal.fire({
        icon: 'success',
        title: res.data.message || 'Soal berhasil diupdate',
        timer: 2000,
        showConfirmButton: false,
      });
      setShowEdit(false);
      setEditPreviewUrl(null);
      fetchQuestions(); 
    } catch (err) {
      if (err.response && err.response.status === 401) {
        window.location.href = "/login";
      } else {
        Swal.fire({
          icon: 'error',
          title:
            (err.response && err.response.data && err.response.data.message)
              ? err.response.data.message
              : 'Terjadi kesalahan saat mengupdate soal.',
          timer: 2500,
          showConfirmButton: false,
        });
        console.error(err);

      }
    }
  };

  const handleDeleteSoal = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus soal ini?",
      text: "Tindakan ini tidak bisa dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/soal-reading/${id}`,
          { withCredentials: true }
        );
        Swal.fire({
          icon: "success",
          title: "Soal berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchQuestions();
      } catch (err) {
        if (err.response && err.response.status === 401) {
          window.location.href = "/login";
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal menghapus soal",
            text: err.response?.data?.message || "Terjadi kesalahan",
          });

        }
      }
    }
  };

  return (
    <div className="mx-auto py-8">
      <div className='flex items-center justify-between mb-4'>
        <div className='flex gap-2'>
          <div className='cursor-pointer' onClick={() => {navigate(-1)}}>
            <IoArrowBackCircle size={30} />
          </div>
          <h2 className="text-2xl font-bold">Tambah Question Reading</h2>
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
          onClick={handleTambahSoal}
        >
          Tambah Soal
        </button>
      </div>

      <div className="relative overflow-auto">
        <table className="border-collapse min-w-full border border-slate-300 bg-white text-sm shadow-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="border px-4 py-3">No</th>
              <th className="border px-4 py-3">Question Untuk</th>
              <th className="border px-4 py-3">Question</th>
              <th className="border px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {questions.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-400">Belum ada question structure</td>
              </tr>
            ) : (
              questions.map((question, idx) => (
                <tr key={question.id}>
                  <td className="border px-4 py-2">{idx + 1}</td>
                  <td className="border px-4 py-2">
                    <div>
                      <button
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-150 shadow"
                        onClick={() => {
                          setQReading(question.id);
                          setQReadingNama(question.nama);
                        }}
                      >
                        {question.nama}
                      </button>
                    </div>
                  </td>
                  <td className="border px-4 py-2">
                    <ImageZoom>
                      <img class="h-[70px] w-96 object-cover" src={`${process.env.REACT_APP_API_BASE_URL}${question.reading}`} />
                    </ImageZoom>
                  </td>
                  <td className="border px-4 py-2 font-bold">
                    <div className='flex justify-center gap-2'>
                      <button
                        onClick={() => {
                          setEditData(question);
                          setEditNama(question.nama);
                          setEditFile(null);
                          setEditPreviewUrl(null);
                          setShowEdit(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    <button
                      onClick={() => handleDeleteSoal(question.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal tambah question */}
      {showForm && (
        <div
          id="modal-bg"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={handleModalBgClick}
          style={{ zIndex: 9999 }}
        >
          <div
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-2 sm:mx-0 p-4 sm:p-8 overflow-y-auto max-h-[90vh] flex flex-col"
            style={{ boxSizing: "border-box" }}
          >
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => {
                setShowForm(false);
                setPreviewUrl(null);
              }}
              type="button"
              aria-label="Tutup"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4 mt-2 text-center">Tambah Question Reading</h3>
            <form onSubmit={handleSubmitQuestion} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 font-medium">Nama Soal</label>
                <input
                  type="text"
                  className="border rounded-lg p-2 w-full focus:outline-blue-400"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">File Soal Reading (gambar)</label>
                <input
                  type="file"
                  className="border rounded-lg p-2 w-full focus:outline-blue-400"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSoalFile(file);
                    if (file) {
                      setPreviewUrl(URL.createObjectURL(file));
                    } else {
                      setPreviewUrl(null);
                    }
                  }}
                  required
                />
              </div>
              {previewUrl && (
                <div>
                  <label className="block mb-1 font-medium">Preview Gambar:</label>
                  <div className="flex justify-center">
                    <ImageZoom>
                      <img
                        src={previewUrl}
                        alt="Preview soal reading"
                        className="max-h-44 max-w-full rounded shadow border"
                      />
                    </ImageZoom>
                  </div>
                </div>
              )}
              <div className="flex gap-2 mt-2 justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Kirim
                </button>
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setShowForm(false);
                    setPreviewUrl(null);
                  }}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEdit && editData && (
        <div
          id="modal-bg-edit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={e => { if (e.target.id === 'modal-bg-edit') { setShowEdit(false); setEditPreviewUrl(null); } }}
          style={{ zIndex: 9999 }}
        >
          <div
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-2 sm:mx-0 p-4 sm:p-8 overflow-y-auto max-h-[90vh] flex flex-col"
            style={{ boxSizing: "border-box" }}
          >
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => { setShowEdit(false); setEditPreviewUrl(null); }}
              type="button"
              aria-label="Tutup"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4 mt-2 text-center">Edit Question Reading</h3>
            <form onSubmit={handleUpdateQuestion} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 font-medium">Nama Soal</label>
                <input
                  type="text"
                  className="border rounded-lg p-2 w-full focus:outline-blue-400"
                  value={editNama}
                  onChange={e => setEditNama(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">File Soal Reading (gambar, opsional)</label>
                <input
                  type="file"
                  className="border rounded-lg p-2 w-full focus:outline-blue-400"
                  accept=".jpg,.jpeg,.png"
                  onChange={e => {
                    const file = e.target.files[0];
                    setEditFile(file);
                    if (file) {
                      setEditPreviewUrl(URL.createObjectURL(file));
                    } else {
                      setEditPreviewUrl(null);
                    }
                  }}
                />
              </div>
              {(editPreviewUrl || editData.reading) && (
                <div>
                  <label className="block mb-1 font-medium">Preview Gambar:</label>
                  <div className="flex justify-center">
                    <ImageZoom>
                      <img
                        src={
                          editPreviewUrl
                            ? editPreviewUrl
                            : `${process.env.REACT_APP_API_BASE_URL}${editData.reading}`
                        }
                        alt="Preview soal reading"
                        className="max-h-44 max-w-full rounded shadow border"
                      />
                    </ImageZoom>
                  </div>
                </div>
              )}
              <div className="flex gap-2 mt-2 justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => { setShowEdit(false); setEditPreviewUrl(null); }}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold my-6">Tambah Soal Reading</h2>
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
          <label className="block mb-1">Question Reading</label>
          <input
            type="text"
            name="q_reading"
            className="w-full border border-gray-300 bg-gray-100 text-gray-500 p-2 rounded focus:outline-none"
            value={qReadingNama}
            disabled
            readOnly
          />
        </div>
        <div>
          <label className="block mb-1">Soal</label>
          <input
            type="text"
            name="soal"
            className="w-full border p-2 rounded"
            value={form.soal}
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

export default TambahSoalReading;
