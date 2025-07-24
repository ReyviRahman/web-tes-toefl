import { useEffect, useState } from "react";
import NavbarUser from "../../components/NavbarUser";
import Main from "../../components/Main";
import { useNavigate } from "react-router-dom";

const Finish = () => {
  const [correctListening, setCorrectListening] = useState(0);
  const [correctWritten, setCorrectWritten] = useState(0);
  const [correctReading, setCorrectReading] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const listeningAnswers = JSON.parse(localStorage.getItem("listeningAnswers")) || [];
    const writtenAnswers = JSON.parse(localStorage.getItem("structureAnswers")) || [];
    const readingAnswers = JSON.parse(localStorage.getItem("readingAnswers")) || [];

    const listeningKey = [2, 1, 3, 2, 3]; 
    const writtenKey = [2, 1, 0, 2, 3, 1, 1, 2, 1, 2];   
    const readingKey = [1, 3, 1, 2, 3];   

    const countCorrect = (answers, key) => {
      return answers.reduce((acc, val, i) => (val === key[i] ? acc + 1 : acc), 0);
    };

    const correctL = countCorrect(listeningAnswers, listeningKey);
    const correctW = countCorrect(writtenAnswers, writtenKey);
    const correctR = countCorrect(readingAnswers, readingKey);

    setCorrectListening(correctL);
    setCorrectWritten(correctW);
    setCorrectReading(correctR);

    const totalCorrect = correctL + correctW + correctR;
    const totalSoal = listeningKey.length + writtenKey.length + readingKey.length;
    const finalScore = Math.round((totalCorrect / totalSoal) * 100);
    setTotalScore(finalScore);
    localStorage.removeItem("listeningAnswers");
    localStorage.removeItem("structureAnswers");
    localStorage.removeItem("readingAnswers");
  }, []);

  const tryAgain = () => {
    navigate("/paketsoal");
  };

  return (
    <div>
      <NavbarUser />
      <Main>
        <div className='shadow-md rounded px-4'>
          <h1 className='text-center text-2xl font-semibold mt-4'>
            Selamat, kamu telah berhasil menyelesaikan Mini Test
          </h1>
          <h1 className='text-center'>Berikut ini adalah hasil tes kamu :</h1>

          <div className='grid sm:grid-cols-2 grid-cols-4 mt-2 mb-4 border'>
            <div className='border py-2 px-3 text-center sm:col-span-1 col-span-2'>Sesi</div>
            <div className='border py-2 px-3 text-center'>Correct</div>

            <div className='border py-2 px-3 text-center sm:col-span-1 col-span-2'>Listening Comprehension</div>
            <div className='border py-2 px-3 text-center flex items-center justify-center'>{correctListening}</div>

            <div className='border py-2 px-3 text-center sm:col-span-1 col-span-2'>Structure And Written Expression</div>
            <div className='border py-2 px-3 text-center flex items-center justify-center'>{correctWritten}</div>

            <div className='border py-2 px-3 text-center sm:col-span-1 col-span-2'>Reading Comprehension</div>
            <div className='border py-2 px-3 text-center flex items-center justify-center'>{correctReading}</div>
          </div>

          <div className='mt-2 mb-4'>
            <div className='border py-2 px-3 text-center text-primary font-semibold'>
              Total Score: {totalScore}
            </div>
          </div>

          <div className='flex'>
            <button
              type='button'
              className='bg-primary flex-auto py-2 text-white font-semibold rounded hover:bg-secondary flex justify-center gap-2'
              onClick={tryAgain}
            >
              Mulai Simulasi TOEFL
            </button>
          </div>
        </div>
      </Main>
    </div>
  );
};

export default Finish;
