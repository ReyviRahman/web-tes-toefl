import axios from 'axios';
import React from 'react'

const StartScreen = ({dispatch}) => {

  const getTimers = async () => {
    try {
      // ① cek skor terakhir
      const resScore = await axios.get(
        "http://localhost:3001/users/lastScore",
        { params: { nohp: 123 } }
      );

      if (resScore.data.lastScore !== -1) {
        dispatch({ type: "finish" });
        return;
      }

      // ② minta/jalankan timer
      const resTimer = await axios.put(
        "http://localhost:3001/soal/timers",
        { nohp: 123 }
      );

      console.log("timer payload =", resTimer.data);

      const { end_time, server_now } = resTimer.data;

      // ► selisih antara jam klien & jam server (ms)
      const skew = Date.now() - server_now;
      console.log('ini remaining', resTimer.data.secondsRemaining)

      // ► sisa detik = (end_time - (Date.now() - skew)) / 1000
      const secondsRemaining = resTimer.data.secondsRemaining;

      dispatch({ type: "start", payload: secondsRemaining });
      dispatch({ type: "getSesi", payload: resTimer.data.sesi });
    } catch (err) {
      console.error("Error updating timeUjian:", err);
    }
  };

  return (
    <div className='border border-abu text-center pt-10 mt-20 rounded-md'>
      <h1>SECTION 1 LISTENING COMPREHENSION</h1>
      
      <h1 className='font-bold'>Question 1-50</h1>
      <h1 className='mt-10'>SECTION 2 STRUCTURE AND WRITTEN EXPRESSION</h1>
      
      <h1 className='font-bold'>Question 51-90</h1>
      <h1 className='mt-10'>SECTION 3 READING COMPREHENSION</h1>
      
      <h1 className='font-bold'>Question 91-140</h1>

      <button type="button" className="mt-10 w-full bg-primary text-white font-bold p-2 hover:bg-blue-600 rounded-b-md" onClick={() => {
        getTimers()
      }
      }>Mulai Ujian</button>
    </div>
  )
}

export default StartScreen