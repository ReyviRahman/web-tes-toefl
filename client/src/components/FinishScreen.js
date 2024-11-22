import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";

const FinishScreen = ({ answer }) => {
  const [score, setScore] = useState('')

  useEffect(() => {
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

        const response = await axios.post("http://localhost:3001/soal/jawaban", {
          answers: answer
        });
        setScore(response.data.totalPoints)

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
    <div>{score}</div>
  )
}

export default FinishScreen