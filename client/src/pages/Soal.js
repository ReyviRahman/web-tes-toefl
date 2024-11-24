import React, { useEffect } from 'react'
import ReactAudioPlayer from 'react-audio-player';
import lagu from './lagu.mp3';

const Soal = ({question, numQuestions, index, answer, dispatch, secondsRemaining, timeEnd}) => {

  let hours = Math.floor((secondsRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((secondsRemaining % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((secondsRemaining % (1000 * 60)) / 1000);

  const userAnswer = answer.find(item => item.id === index)?.answer ?? '-1';
  const answerIds = answer.map(item => item.id);

  useEffect(() => {
    let targetTime = new Date();
    let [hours, minutes, seconds] = timeEnd.split(":").map(Number);
    targetTime.setHours(hours, minutes, seconds, 0);

    const id = setInterval(() => {
      dispatch({ type: 'tick', payload: targetTime.getTime()})
    }, 1000);
    return () => clearInterval(id)
  }, [dispatch])

  return (
    <div>
      <div className='flex justify-end border border-b-0 py-2'>
        <button type='button' className=' bg-green-600 px-3 py-1 me-5 rounded text-white' onClick={() => dispatch({type: 'finish'})}>Selesai</button>
        <h1 className='px-3 py-1 text-red-600 border me-2 rounded'>
          {hours < 10 && '0'}{hours}:{minutes < 10 && '0'}{minutes}:{seconds < 10 && '0'}{seconds}
        </h1>
      </div>
      <div className='flex flex-row border min-h-[589px]'>
        <div className='basis-1/3 border-r'>
          <div className='p-4'>
            <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: numQuestions }, (_, idx) => (
              <div key={idx} className={`${index === idx ? 'bg-primary text-white' : answerIds.includes(idx) ? 'bg-secondary border-primary' : ''} cursor-pointer  border py-1 text-center rounded`}
              onClick={() => dispatch({type: 'moveToIdx', payload: idx})}>
                {idx}
              </div>
            ))}
            </div>
          </div>
        </div>
        <div className='basis-full'>
        
          {![0, 2, 4].includes(index) ? (
            <div className='p-10 flex flex-col gap-3'>
              <ReactAudioPlayer
                src={lagu}
                controls
              />
              <h1>{question.soal}</h1>
              <div className="flex items-center">
                <input 
                  id="option-1" 
                  type="radio" 
                  name="answer" 
                  value="1"
                  checked={userAnswer === "1"} 
                  className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
                  onChange={(e) => {
                    dispatch({type: 'newAnswer', payload: e.target.value})
                  }}
                />
                <label htmlFor="option-1" className="cursor-pointer ml-2">A. {question.pilihan_satu}</label>
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
                    dispatch({type: 'newAnswer', payload: e.target.value})
                  }} 
                />
                <label htmlFor="option-2" className="cursor-pointer ml-2">B. {question.pilihan_dua}</label>
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
                    dispatch({type: 'newAnswer', payload: e.target.value})
                  }} 
                />
                <label htmlFor="option-3" className="cursor-pointer ml-2">C. {question.pilihan_tiga}</label>
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
                    dispatch({type: 'newAnswer', payload: e.target.value})
                  }} 
                />
                <label htmlFor="option-4" className="cursor-pointer ml-2">D. {question.pilihan_empat}</label>
              </div>
              
              <hr className='mt-5' />
              <div className='flex justify-between'>
                <div>
                  {index > 0 && (
                    <button type='button' className='flex items-center'
                    onClick={() => dispatch({type:'prevQuestion'})}>
                      <span className="material-symbols-outlined border border-secondary rounded-full me-2">
                        chevron_left
                      </span>
                      Sebelumnya
                    </button>
                  )}
                </div>
                <div>
                  {index < numQuestions - 1 && (
                    <button type='button' className='flex items-center'
                    onClick={() => dispatch({type:'nextQuestion'})}>
                      Selanjutnya
                      <span className="material-symbols-outlined border border-secondary rounded-full ms-2">
                        chevron_right
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className='flex justify-between'>
                <div>
                  {index > 0 && (
                    <button type='button' className='flex items-center'
                    onClick={() => dispatch({type:'prevQuestion'})}>
                      <span className="material-symbols-outlined border border-secondary rounded-full me-2">
                        chevron_left
                      </span>
                      Sebelumnya
                    </button>
                  )}
                </div>
                <div>
                  {index < numQuestions - 1 && (
                    <button type='button' className='flex items-center'
                    onClick={() => dispatch({type:'nextQuestion'})}>
                      Selanjutnya
                      <span className="material-symbols-outlined border border-secondary rounded-full ms-2">
                        chevron_right
                      </span>
                    </button>
                  )}
                </div>
              </div>
            
          )}
        </div>
      </div>
    </div>
  )
}

export default Soal