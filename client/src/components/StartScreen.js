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
    <div className='border border-abu pt-10 my-20 rounded-md'>
      <div className='text-center'>
        <h1>SESI 1 LISTENING COMPREHENSION</h1>
        <h1 className='font-bold'>Soal 1-50</h1>
        <h1>30 Menit</h1>

        <h1 className='mt-3'>SESI 2 STRUCTURE AND WRITTEN EXPRESSION</h1>
        <h1 className='font-bold'>Soal 1-40</h1>
        <h1>25 Menit</h1>

        <h1 className='mt-3'>SESI 3 READING COMPREHENSION</h1>
        <h1 className='font-bold'>Soal 1-50</h1>
        <h1>55 Menit</h1>
      </div>
      <div className='flex justify-center mt-3'>
        <div>
          <p className='underline'>Petunjuk Penting Sebelum Mulai:</p>
          <ul className="list-disc sm:ms-0 ms-5">
            <li>Anda akan mengerjakan 140 soal yang terbagi dalam beberapa sesi</li>
            <li>Waktu akan berjalan secara otomatis dan tidak dapat dihentikan atau dijeda selama sesi berlangsung</li>
            <li>Anda dapat beristirahat pada setiap sesi</li>
            <li>Setelah Anda menyelesaikan dan melanjutkan ke sesi berikutnya, Anda tidak dapat kembali ke sesi sebelumnya</li>
          </ul>
          <p className='underline mt-2 sm:text-start text-center'>Perhatikan arti warna pada nomor soal:</p>
          <div className='flex sm:flex-row flex-col items-center gap-x-2'>
            <div className='flex gap-2 mt-2 items-center'>
              <div
                className={`inline-block border py-1 px-4 text-center rounded`}
              >
                1
              </div>
              <p className='text-base'> : Soal No 1 Belum Terjawab</p>
            </div>
            <div className='flex gap-2 mt-2 items-center'>
              <div
                className={`inline-block border py-1 px-4 text-center rounded bg-primary text-white`}
              >
                1
              </div>
              <p className='text-base'> : Anda Berada Di Soal No 1</p>
            </div>
            <div className='flex gap-2 mt-2 items-center'>
              <div
                className={`inline-block border py-1 px-4 text-center rounded bg-secondary border-primary`}
              >
                1
              </div>
              <p className='text-base'> : Anda Sudah Menjawab Soal No 1</p>
            </div>
          </div>
        </div>

      </div>

      <button
        type="button"
        className="mt-6 w-full bg-primary text-white font-bold p-2 hover:bg-blue-600 rounded-b-md"
        onClick={async () => {
          const result = await Swal.fire({
            title: 'Mulai Simulasi TOEFL?',
            text: 'Setelah kamu klik mulai, simulasi TOEFL dan timer akan berjalan. Pastikan kamu sudah siap.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Mulai',
            cancelButtonText: 'Batal'
          });

          if (result.isConfirmed) {
            getTimers();
          }
        }}
      >
        Mulai Simulasi TOEFL
      </button>
    </div>
  )
}

export default StartScreen