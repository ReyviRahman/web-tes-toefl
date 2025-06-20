import React, { useCallback, useEffect, useRef, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import DOMPurify from 'dompurify';
import InstructionListening from '../components/InstructionListening';
import InstructionStructure from '../components/InstructionStructure';
import InstructionWritten from '../components/InstructionWritten';
import InstructionReading from '../components/InstructionReading';
import axios from 'axios';
import AudioItem from '../components/AudioItem';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css'

const Soal = ({question, numQuestions, index, answer, dispatch, secondsRemaining, sesi, nohp}) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const localStorageKey = `audio-played-${nohp}`;
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const playedRaw = localStorage.getItem(localStorageKey);
    const playedList = playedRaw ? JSON.parse(playedRaw) : [];

    setHasPlayed(playedList.includes(index));
  }, [index]);

  const handlePlay = (e) => {
    if (hasPlayed) {
      e.preventDefault();
      e.target.pause();
      e.target.currentTime = 0;
    }
  };

  const handleEnded = () => {
    const playedRaw = localStorage.getItem(localStorageKey);
    const playedList = playedRaw ? JSON.parse(playedRaw) : [];

    if (!playedList.includes(index)) {
      playedList.push(index);
      localStorage.setItem(localStorageKey, JSON.stringify(playedList));
    }

    setHasPlayed(true);
  };

  const sesiLabels = {
    listening: 'LISTENING COMPREHENSION',
    written: 'STRUCTURE AND WRITTEN EXPRESSION',
    reading: 'READING COMPREHENSION',
  };
  const sessionRanges = {
    listening: [0, 50],
    written: [51, 92],
    reading: [93, 143],
  };
  const [currentSession, setCurrentSession] = React.useState(sesi);
  const [start, end] = sessionRanges[currentSession];
  const isIndexInCurrentSession = () => {
    const [start, end] = sessionRanges[sesi] || [];
    return index >= start && index <= end;
  };

  let sanitizedHTML = DOMPurify.sanitize(question.soal);
  let sanitizedHTMLReading;
  if (![0, 51, 67, 93].includes(index)) {
    sanitizedHTMLReading = DOMPurify.sanitize(question.readingQuestion?.reading);
  }

  const hours = String(Math.floor(secondsRemaining / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((secondsRemaining % 3600) / 60)).padStart(2, '0');
  const seconds = String(secondsRemaining % 60).padStart(2, '0');

  const userAnswer = answer.find(item => item.id === question.page)?.answer ?? '-1';

  const answerIds = answer.map(item => item.id);

  const intervalRef = useRef(null);

  const startTick = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
  }, [dispatch]);

  // Pasang interval sekali di mount
  useEffect(() => {
    startTick();
    return () => clearInterval(intervalRef.current);
  }, [startTick]);

  // Handle timeout & restart
  useEffect(() => {
    if (secondsRemaining > 0) return;

    clearInterval(intervalRef.current);

    const refreshTimer = async () => {
      try {
        const res = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/soal/timers`, { nohp: nohp });
        if (res.data.sesi === "finished") {
          dispatch({ type: "finish" });
        } else {
          const newSeconds = res.data.secondsRemaining;
          dispatch({ type: "getSesi", payload: res.data.sesi });
          dispatch({ type: "start", payload: newSeconds });
          setCurrentSession(res.data.sesi)
          const sesiToIndexMap = {
            listening: 0,
            written: 51,
            reading: 93,
          };

          const sesi = res.data.sesi;
          const targetIdx = sesiToIndexMap[sesi];

          if (targetIdx !== undefined) {
            dispatch({ type: 'moveToIdx', payload: targetIdx });
          }

          startTick(); // **kunci**: mulai interval ulang
        }
      } catch (err) {
        console.error("Error refreshing timer:", err);
        // dispatch({ type: "finish" });
      }
    };

    refreshTimer();
  }, [secondsRemaining, dispatch, startTick]);

  const displayLabels = React.useMemo(() => {
    const arr = [];

    // blok 1 ───────────────────────────────────────────────
    arr.push('I1');
    for (let i = 1; i <= 50; i++) arr.push(i);

    // blok 2 ───────────────────────────────────────────────
    arr.push('I2');
    for (let i = 1; i <= 15; i++) arr.push(i);

    // blok 3 ───────────────────────────────────────────────
    arr.push('I3');
    for (let i = 16; i <= 40; i++) arr.push(i);
    // penutup
    arr.push('I4');
    for (let i = 1; i <= 50; i++) arr.push(i);

    return arr;          // total elemen = 134
  }, []);

  return (
    <div>
      <div className='flex sm:flex-row flex-col justify-between border border-b-0 py-2'>
        <div className='flex sm:ms-5 mx-2'>
          <button type='button' className='sm:w-fit w-full bg-green-600 px-3 py-1  rounded text-white' onClick={() => dispatch({type: 'finish'})}>Selesai </button>
          <h1 className='sm:w-fit w-full px-3 py-1 text-red-600 border ms-2 rounded text-center'>
            {hours}:{minutes}:{seconds}
          </h1>
        </div>
        <h1 className='px-3 py-1 text-primary text-center border ms-2 me-2 mt-2 sm:mt-0 rounded'>
          SESI: {sesiLabels[sesi] ?? sesi}
        </h1>
      </div>
      <div className='flex sm:flex-row flex-col border min-h-[589px]'>
        
          
        {/* <div className='basis-full items-center'>
          <h1 className='text-center'>Sekarang <span className='text-primary'>SESI: {sesiLabels[sesi] ?? sesi}.</span> <br/> Mohon kerjakan <span className='text-primary'>SESI: {sesiLabels[sesi] ?? sesi}</span> terlebih dahulu</h1>
        </div> */}

        {!isIndexInCurrentSession() ? (
          // ❌ Index tidak sesuai sesi → tampilkan peringatan
          <div className='basis-full items-center'>
            <h1 className='text-center'>
              Sekarang <span className='text-primary'>SESI: {sesiLabels[sesi] ?? sesi}</span>.<br />
              Mohon kerjakan <span className='text-primary'>SESI: {sesiLabels[sesi] ?? sesi}</span> terlebih dahulu
            </h1>
          </div>
        ) : (
          // ✅ Index sesuai → tampilkan soal
          <div className='basis-full'>
            {![0, 51, 67, 93].includes(index) ? (
              <div className='sm:p-10 p-2 flex flex-col gap-3'>

                {question.audio !== "" && (
                  <>
                    <h1>Question</h1>
                    {/* <AudioPlayer
                      autoPlayAfterSrcChange={false}
                      src={question.audio}
                      onPlay={handlePlay}
                      onEnded={handleEnded}
                      showJumpControls={false}
                      customAdditionalControls={[]}
                    /> */}
                    <AudioItem key={index} index={index} audioSrc={`${baseUrl}${question.audio}`} nohp={nohp}/>
                  </>
                )}
                {/* <div dangerouslySetInnerHTML={{ __html: sanitizedHTMLReading }} /> */}
                
                {question.readingQuestion?.reading !== "" && question.type !== "group" && (
  <div className="">
    <Zoom>
      <img
        alt="Soal Reading"
        src={`${baseUrl}${question.readingQuestion?.reading}`}
        className="w-full mx-auto"
      />
    </Zoom>
  </div>
)}

                
                <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

                {question?.type === 'group' ? (
                  <div className='grid sm:grid-cols-2 gap-y-6 gap-x-4'>

                    {question.items?.map((item) => {
                      // ① hitung jawaban user utk item ini
                      const userAnswerItem =
                        answer.find(a => a.id === item.page)?.answer ?? "-1";

                      // ② kembalikan elemen JSX
                      return (
                        <div className="flex mb-4" key={item.id}>
                          <div className="pe-2">
                            <p className="border border-secondary px-3 py-1 rounded-md">
                              {item.no_soal}
                            </p>
                          </div>

                          <div className="flex flex-col gap-4">
                            {[1, 2, 3, 4].map((num) => (
                              <div className="flex items-center" key={num}>
                                <input
                                  id={`option-${item.id}-${num}`}
                                  type="radio"
                                  name={`answer-${item.page}`}          
                                  value={num.toString()}
                                  checked={userAnswerItem === num.toString()}  
                                  className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                  onChange={(e) =>
                                    dispatch({
                                      type: "newAnswer",
                                      payload: { page: item.page, answer: e.target.value },
                                    })
                                  }
                                />
                                <label
                                  htmlFor={`option-${item.id}-${num}`}
                                  className="cursor-pointer ml-2 break-words"
                                >
                                  {(num === 1 && `(A) ${item.pilihan_satu}`) ||
                                    (num === 2 && `(B) ${item.pilihan_dua}`) ||
                                    (num === 3 && `(C) ${item.pilihan_tiga}`) ||
                                    (num === 4 && `(D) ${item.pilihan_empat}`)}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}

                  
                  </div>
                ) : (
                  <div className='flex'>
                    <div className='pe-2'>
                      <p className='border border-secondary px-3 py-1 rounded-md '>{question.no_soal}</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                      <div className="flex items-center mt-2">
                        <input 
                          id="option-1" 
                          type="radio" 
                          name="answer" 
                          value="1"
                          checked={userAnswer === "1"} 
                          className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
                          onChange={(e) => {
                            dispatch({
                              type: 'newAnswer',
                              payload: {
                                page: question.page,        // atau soal.id kalau kamu pakai id
                                answer: e.target.value
                              }
                            });
                          }}
                        />
                        <label htmlFor="option-1" className="cursor-pointer ml-2 break-words">(A) {question.pilihan_satu}</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="option-2" 
                          type="radio" 
                          name="answer" 
                          value="2"
                          checked={userAnswer === "2"}
                          className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                          onChange={(e) => {
                            dispatch({
                              type: 'newAnswer',
                              payload: {
                                page: question.page,        // atau soal.id kalau kamu pakai id
                                answer: e.target.value
                              }
                            });
                          }}
                        />
                        <label htmlFor="option-2" className="cursor-pointer ml-2">(B) {question.pilihan_dua}</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="option-3" 
                          type="radio" 
                          name="answer" 
                          value="3" 
                          checked={userAnswer === "3"}
                          className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                          onChange={(e) => {
                            dispatch({
                              type: 'newAnswer',
                              payload: {
                                page: question.page,        // atau soal.id kalau kamu pakai id
                                answer: e.target.value
                              }
                            });
                          }}
                        />
                        <label htmlFor="option-3" className="cursor-pointer ml-2">(C) {question.pilihan_tiga}</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          id="option-4" 
                          type="radio" 
                          name="answer" 
                          value="4" 
                          checked={userAnswer === "4"}
                          className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                          onChange={(e) => {
                            dispatch({
                              type: 'newAnswer',
                              payload: {
                                page: question.page,        // atau soal.id kalau kamu pakai id
                                answer: e.target.value
                              }
                            });
                          }}
                        />
                        <label htmlFor="option-4" className="cursor-pointer ml-2">(D) {question.pilihan_empat}</label>
                      </div>


                    </div>
                  </div>
                )}

                <hr className='mt-5' />
                <div className='flex justify-between'>
                  <div>
                    {index > 0 && (
                      <button
                        type='button'
                        className='flex items-center'
                        onClick={() => dispatch({ type: 'prevQuestion' })}
                      >
                        <span className="material-symbols-outlined border border-secondary rounded-full me-2">
                          chevron_left
                        </span>
                        Sebelumnya
                      </button>
                    )}
                  </div>
                  <div>
                    {index < numQuestions - 1 && index !== 50 && index !== 92 && index !== 47 &&(
                      <button
                        type='button'
                        className='flex items-center'
                        onClick={() => dispatch({ type: 'nextQuestion' })}
                      >
                        Selanjutnya
                        <span className="material-symbols-outlined border border-secondary rounded-full ms-2">
                          chevron_right
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : index === 0 ? (
              <InstructionListening index={index} dispatch={dispatch} numQuestions={numQuestions} />
            ) : index === 51 ? (
              <InstructionStructure index={index} dispatch={dispatch} numQuestions={numQuestions} />
            ) : index === 67 ? (
              <InstructionWritten index={index} dispatch={dispatch} numQuestions={numQuestions} />
            ) : index === 93 &&(
              <InstructionReading index={index} dispatch={dispatch} numQuestions={numQuestions} />
            )}
          </div>
        )}

        <div className='basis-1/3 border-l sm:border-t-0 border-t-1'>
          <div className='p-4'>
            <div className="grid grid-cols-5 gap-4">
            
            {displayLabels.map((label, idx) => {
              // Abaikan indeks di luar rentang
              if (idx < start || idx > end) return null;

              const disabledIndices = [32, 33, 34, 36, 37, 38, 40, 41, 42, 44, 45, 46, 48, 49, 50];
              const isDisabled = disabledIndices.includes(idx);

              return (
                <div
                  key={idx}
                  className={`
                    ${index === idx ? 'bg-primary text-white'
                      : answerIds.includes(idx) ? 'bg-secondary border-primary'
                      : ''}
                    ${['I1','I2','I3','I4'].includes(label) ? 'border-secondary' : ''}
                    ${isDisabled ? '' : 'cursor-pointer'}
                    border py-1 text-center rounded
                  `}
                  onClick={isDisabled ? undefined : () => dispatch({ type: 'moveToIdx', payload: idx })}
                >
                  {label}
                </div>
              );
            })}
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Soal