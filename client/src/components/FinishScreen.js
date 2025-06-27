import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";

const FinishScreen = ({ answer, status, dispatch, nohp, role }) => {
  const [score, setScore] = useState('0')
  const [scoreListening, setScoreListening] = useState('0')
  const [scoreWritten, setScoreWritten] = useState('0')
  const [scoreReading, setScoreReading] = useState('0')
  const [correctListening, setCorrectListening] = useState('0')
  const [correctWritten, setCorrectWritten] = useState('0')
  const [correctReading, setCorrectReading] = useState('0')

  const tryAgain = async () => {
    Swal.fire({
      title: 'Mengirim permintaan...',
      text: 'Mohon tunggu sebentar',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/tryagain`, {
        nohp: nohp
      })

      Swal.close()
      // dispatch({ type: 'restart'})
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: error.response?.data?.message || 'Terjadi kesalahan pada server',
      })
    }
  }

  useEffect(() => {
    console.log('ini status dari Finish', status)
    localStorage.removeItem('toeflState');
    localStorage.removeItem(`audio-played-${nohp}`);
    const getScore = async () => {
      try {
        Swal.fire({
          title: "Loading...",
          text: "Checking your answers",
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });
        const responseGetLastScore = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/lastScore?nohp=${nohp}`)
        if (responseGetLastScore.data.lastScore !== -1) {
          setScore(responseGetLastScore.data.lastScore)
          setScoreListening(responseGetLastScore.data.scoreListening)
          setScoreWritten(responseGetLastScore.data.scoreWritten)
          setScoreReading(responseGetLastScore.data.scoreReading)
          setCorrectListening(responseGetLastScore.data.listeningCorrect)
          setCorrectWritten(responseGetLastScore.data.writtenCorrect)
          setCorrectReading(responseGetLastScore.data.readingCorrect)
          Swal.close()
        } else {
          const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/soal/jawaban`, {
            nohp: nohp,
            answers: answer
          });
          setScore(response.data.toeflScore)
          setScoreListening(response.data.scoreListening)
          setScoreWritten(response.data.scoreWritten)
          setScoreReading(response.data.scoreReading)
          setCorrectListening(response.data.listeningCorrect)
          setCorrectWritten(response.data.writtenCorrect)
          setCorrectReading(response.data.readingCorrect)
        }

        Swal.close()
      } catch (error) {
        console.error("Error fetching score:", error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch score. Please try again later.",
        });
      }
    }

    getScore()

    
  }, [])

  return (
    <div className='shadow-md rounded px-4'>
      <h1 className='text-center text-2xl font-semibold mt-4'>Selamat, kamu telah berhasil menyelesaikan simulasi tes TOEFL bahasa inggris</h1>
      <h1 className='text-center'>Berikut ini adalah hasil tes kamu :</h1>
      <div className='grid sm:grid-cols-3 grid-cols-4  mt-2 mb-4 border'>
        <div className='border py-2 px-3 text-center sm:col-span-1 col-span-2'>Sesi</div>
        <div className='border py-2 px-3 text-center'>Correct</div>
        <div className='border py-2 px-3 text-center'>Score</div>
        <div className='border py-2 px-3 text-center sm:col-span-1 col-span-2'>Listening Comprehension</div>
        <div className='border py-2 px-3 text-center flex items-center justify-center'>{correctListening}</div>
        <div className='border py-2 px-3 text-center flex items-center justify-center'>{scoreListening}</div>
        <div className='border py-2 px-3 text-center sm:col-span-1 col-span-2'>Structure And Written Expression</div>
        <div className='border py-2 px-3 text-center flex items-center justify-center'>{correctWritten}</div>
        <div className='border py-2 px-3 text-center flex items-center justify-center'>{scoreWritten}</div>
        <div className='border py-2 px-3 text-center sm:col-span-1 col-span-2'>Reading Comprehension</div>
        <div className='border py-2 px-3 text-center flex items-center justify-center'>{correctReading}</div>
        <div className='border py-2 px-3 text-center flex items-center justify-center'>{scoreReading}</div>
      </div>
      <div className='mt-2 mb-4'>
          <div className='border py-2 px-3 text-center text-primary font-semibold'>Overall Score: {score}</div>
      </div>

      {role === 'Admin' && (
        <div className='flex'>
          <button
            type='button'
            className='bg-primary flex-auto py-2 text-white font-semibold rounded hover:bg-secondary flex justify-center gap-2'
            onClick={tryAgain}
          >
            <span className="material-symbols-outlined">
              restart_alt
            </span>
            Tes Ulang
          </button>
        </div>
      )}

    </div>
  )
}

export default FinishScreen