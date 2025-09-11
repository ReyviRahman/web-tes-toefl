import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactDOMServer from 'react-dom/server';
import { IoArrowBackCircle } from "react-icons/io5";

const TambahSoalWritten = () => {
  const { paketId } = useParams();
  const labels = ['A', 'B', 'C', 'D'];

  const [jumlahKolom, setJumlahKolom] = useState(9);
  const [inputValues, setInputValues] = useState([]);
  const [words, setWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState({});
  const [noSoal, setNoSoal] = useState('');
  const [page, setPage] = useState('');
  const [jawaban, setJawaban] = useState('');
  const navigate = useNavigate()

  const handleJumlahKolomChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setJumlahKolom(count);
    setInputValues(Array(count).fill(''));
    setWords([]);
    setSelectedWords({});
  };

  const handleInputChange = (index, value) => {
    const updated = [...inputValues];
    updated[index] = value;
    setInputValues(updated);
  };

  const handleSubmitWords = () => {
    const cleanedWords = inputValues.map((val) => val.trim()).filter((val) => val !== '');
    setWords(cleanedWords);
    setSelectedWords({});
  };

  const handleClick2 = (index) => {
    if (!selectedWords[index]) {
      const nextLabel = labels[Object.keys(selectedWords).length];
      if (nextLabel) {
        setSelectedWords((prev) => ({ ...prev, [index]: nextLabel }));
      }
    }
  };

  const RenderedContent = () => (
    <div className="flex flex-wrap gap-1">
      {words.map((word, index) => (
        <p
          key={index}
          className={`leading-4 text-center cursor-pointer  ${
            selectedWords[index] ? 'text-black' : ''
          }`}
        >
          {selectedWords[index] ? (
            <>
              <u>{word}</u>
              <br />
              {selectedWords[index]}
            </>
          ) : (
            word
          )}
        </p>
      ))}
    </div>
  );

  const handleSave = async () => {
    const soalHTML = ReactDOMServer.renderToString(<RenderedContent />);

    if (!jawaban || !noSoal || !page) {
      Swal.fire('Gagal', 'Lengkapi jawaban, nomor soal, dan halaman!', 'error');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/${paketId}/soal-written`, {
        soal: soalHTML,
        jawaban,
        no_soal: noSoal,
        page,
      }, { withCredentials: true });

      navigate(-1)            
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
      } else {
        console.error(error);
        Swal.fire('Error', error.response?.data?.message || 'Gagal menyimpan soal', 'error');

      }
    }
  };

  useEffect(() => {
    const fetchLastSoal = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/admin/paket-soal/${paketId}/written/last`,
          { withCredentials: true }
        );
        setNoSoal((res.data.last_no_soal ?? 0) + 1)
        setPage((res.data.last_page ?? 0) + 1)
      } catch (err) {
        if (err.response && err.response.status === 401) {
          window.location.href = "/login";
        } else {

          setNoSoal(1)
          setPage(1)
        }
      }
    };

    fetchLastSoal();
    const count = jumlahKolom;
    setInputValues(Array(count).fill(''));
    setWords([]);
    setSelectedWords({});
  }, [paketId]);

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className='flex gap-2'>
        <div className='cursor-pointer' onClick={() => {navigate(-1)}}>
          <IoArrowBackCircle size={30} />
        </div>
        <h2 className="text-2xl font-bold mb-6">Tambah Soal Written</h2>
      </div>

      <div className="mb-2 space-y-2">
        <label className="block font-semibold">No Soal</label>
        <input
          type="number"
          placeholder="Nomor Soal"
          className="border p-2 rounded w-full"
          value={noSoal}
          onChange={(e) => setNoSoal(e.target.value)}
        />
        <label className="block font-semibold">No Page</label>
        <input
          type="number"
          placeholder="Halaman (page)"
          className="border p-2 rounded w-full"
          value={page}
          onChange={(e) => setPage(e.target.value)}
        />
        <div>
          <label className="block mb-1 font-bold">Jawaban (1-4)</label>
          <select
            name="jawaban"
            className="w-full border p-2 rounded"
            value={jawaban}
            onChange={e => setJawaban(e.target.value)}
            required
          >
            <option value="">Pilih Jawaban</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>

      {/* Input jumlah kolom */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Jumlah Kolom</label>
        <input
          type="number"
          className="border p-2 rounded w-full"
          value={jumlahKolom}
          onChange={handleJumlahKolomChange}
          min={0}
        />
      </div>

      {/* Input kata */}
      {jumlahKolom > 0 && (
        <div className="mb-4 space-y-2">
          {inputValues.map((val, idx) => (
            <input
              key={idx}
              type="text"
              className="border p-2 rounded w-full"
              placeholder={`Kata ${idx + 1}`}
              value={val}
              onChange={(e) => handleInputChange(idx, e.target.value)}
            />
          ))}
          <button
            onClick={handleSubmitWords}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Gunakan Kata
          </button>
        </div>
      )}
      {/* Klik pilihan jawaban */}
      {words.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {words.map((word, index) => (
            <p
              key={index}
              className={`leading-4 text-center cursor-pointer  ${
                selectedWords[index] ? 'text-black' : ''
              }`}
              onClick={() => handleClick2(index)}
            >
              {selectedWords[index] ? (
                <>
                  <u>{word}</u>
                  <br />
                  {selectedWords[index]}
                </>
              ) : (
                word
              )}
            </p>
          ))}
        </div>
      )}

      {/* Tombol Simpan */}
      {words.length > 0 && (
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Simpan Soal
        </button>
      )}
    </div>
  );
};

export default TambahSoalWritten;
