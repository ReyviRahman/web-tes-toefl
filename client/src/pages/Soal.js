import React, { useEffect } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import DOMPurify from 'dompurify';
import InstructionListening from '../components/InstructionListening';
import InstructionStructure from '../components/InstructionStructure';
import InstructionWritten from '../components/InstructionWritten';
import InstructionReading from '../components/InstructionReading';

const Soal = ({question, numQuestions, index, answer, dispatch, secondsRemaining, timeEnd}) => {
  let sanitizedHTML = DOMPurify.sanitize(question.soal);
 
  let sanitizedHTMLReading;
  if (![0, 51, 67, 93].includes(index)) {
    sanitizedHTMLReading = DOMPurify.sanitize(question.readingQuestion.reading);
  }

  let hours = Math.floor((secondsRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((secondsRemaining % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((secondsRemaining % (1000 * 60)) / 1000);

  const userAnswer = answer.find(item => item.id === index)?.answer ?? '-1';
  const answerIds = answer.map(item => item.id);

  useEffect(() => {
    let targetTime = new Date();
    let [hours, minutes, seconds] = timeEnd.split(":").map(Number);
    targetTime.setHours(hours, minutes, seconds, 0);

    // Pastikan targetTime di masa depan
    if (targetTime < new Date()) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const id = setInterval(() => {
      const now = Date.now();
      dispatch({ type: 'tick', payload: targetTime.getTime() });

      if (now >= targetTime.getTime()) {
        clearInterval(id);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [timeEnd]);

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
              <div key={idx} className={`${index === idx ? 'bg-primary text-white' : answerIds.includes(idx) ? 'bg-secondary border-primary' : ''} cursor-pointer  border py-1 text-center rounded ${[0, 51, 67, 93].includes(idx) ? 'border-secondary' : ''} `}
              onClick={() => dispatch({type: 'moveToIdx', payload: idx})}>
                { idx === 0 ? (
                  <>
                    I1
                  </>
                ) : idx === 51 ? (
                  <>
                    I2
                  </>
                ) : idx === 67 ? (
                  <>
                    I3
                  </>
                ) : idx === 93 ? (
                  <>
                    I4
                  </>
                ) : idx > 51 && idx < 67 ? (
                  <>
                    {idx - 1}
                  </>
                ) : idx > 67 && idx < 93 ? (
                  <>
                    {idx - 2}
                  </>
                ) : idx > 93 ? (
                  <>
                    {idx - 3}
                  </>
                ) : (
                  <>
                    {idx}
                  </>
                )}
              </div>
            ))}
            </div>
          </div>
        </div>
        <div className='basis-full'>
            
          {![0, 51, 67, 93].includes(index) ? (
            <div className='p-10 flex flex-col gap-3'>

              {question.audio_question !== "" && (
                <>
                  <h1>Conversation</h1>
                  <AudioPlayer
                    autoPlayAfterSrcChange={false}
                    src={`${question.audio_question}`}
                  />
                </>
              )}
              {question.audio !== "" && (
                <>
                  <h1>Question</h1>
                  <AudioPlayer
                    autoPlayAfterSrcChange={false}
                    src={`${question.audio}`}
                  />
                </>
              )}
              <div dangerouslySetInnerHTML={{ __html: sanitizedHTMLReading }} />
              <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

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
                <label htmlFor="option-1" className="cursor-pointer ml-2">(A) {question.pilihan_satu}</label>
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
                    dispatch({type: 'newAnswer', payload: e.target.value})
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
                    dispatch({type: 'newAnswer', payload: e.target.value})
                  }} 
                />
                <label htmlFor="option-4" className="cursor-pointer ml-2">(D) {question.pilihan_empat}</label>
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
      </div>
    </div>
  )
}

export default Soal