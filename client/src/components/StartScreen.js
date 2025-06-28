import axios from 'axios';
import Swal from 'sweetalert2';

const StartScreen = ({dispatch, nohp}) => {

  const getTimers = async () => {
    try {
      // 🔁 Tampilkan loading
      Swal.fire({
        title: 'Memuat...',
        text: 'Mengambil data sesi dan timer...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // ① cek skor terakhir
      // const resScore = await axios.get(
      //   `${process.env.REACT_APP_API_BASE_URL}/users/lastScore`,
      //   { params: { nohp: nohp } }
      // );

      // if (resScore.data.lastScore !== -1) {
      //   Swal.close(); 
      //   dispatch({ type: "finish" });
      //   return;
      // }

      // ② minta/jalankan timer
      const resTimer = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/soal/timers`,
        { nohp: nohp }
      );

      console.log("timer payload =", resTimer.data);

      if (resTimer.data.sesi === "finished") {
        Swal.close();
        dispatch({ type: "finish" });
        return;
      }

      const { end_time, server_now } = resTimer.data;

      // ► selisih antara jam klien & jam server (ms)
      const skew = Date.now() - server_now;
      console.log('ini remaining', resTimer.data.secondsRemaining);

      // ► sisa detik
      const secondsRemaining = resTimer.data.secondsRemaining;

      dispatch({ type: "start", payload: secondsRemaining });
      dispatch({ type: "getSesi", payload: resTimer.data.sesi });

      Swal.close(); // ✅ Tutup loading setelah selesai
    } catch (err) {
      console.error("Error updating timeUjian:", err);

      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Terjadi kesalahan saat mengambil data timer.',
      });
    }
  };

  return (
    <div className='border border-abu text-center pt-10 mt-20 rounded-md'>
      <h1>SECTION 1 LISTENING COMPREHENSION</h1>
      <h1 className='font-bold'>Question 1-50</h1>

      <h1 className='mt-10'>SECTION 2 STRUCTURE AND WRITTEN EXPRESSION</h1>
      <h1 className='font-bold'>Question 1-40</h1>

      <h1 className='mt-10'>SECTION 3 READING COMPREHENSION</h1>
      <h1 className='font-bold'>Question 1-50</h1>

      <button type="button" className="mt-10 w-full bg-primary text-white font-bold p-2 hover:bg-blue-600 rounded-b-md" onClick={() => {
        getTimers()
      }
      }>Mulai Ujian</button>
    </div>
  )
}

export default StartScreen