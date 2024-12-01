import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";

const FinishScreen = ({ answer, status }) => {
  const [score, setScore] = useState('0')
  const [scoreListening, setScoreListening] = useState('0')
  const [scoreWritten, setScoreWritten] = useState('0')
  const [scoreReading, setScoreReading] = useState('0')

  useEffect(() => {
    console.log('ini status dari Finish', status)
    localStorage.removeItem('toeflState');
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
        const responseGetLastScore = await axios.get("http://localhost:3001/users/lastScore?nohp=123")
        if (responseGetLastScore.data.lastScore !== -1) {
          setScore(responseGetLastScore.data.lastScore)
          setScoreListening(responseGetLastScore.data.scoreListening)
          setScoreWritten(responseGetLastScore.data.scoreWritten)
          setScoreReading(responseGetLastScore.data.scoreReading)
        } else {
          const response = await axios.post("http://localhost:3001/soal/jawaban", {
            nohp: 123,
            answers: answer
          });
          setScore(response.data.toeflScore)
          setScoreListening(response.data.scoreListening)
          setScoreWritten(response.data.scoreWritten)
          setScoreReading(response.data.scoreReading)
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
    <div className='border'>
      <h1></h1>
    </div>
  )
}

export default FinishScreen