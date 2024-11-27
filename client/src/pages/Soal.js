import React, { useEffect } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import DOMPurify from 'dompurify';

const Soal = ({question, numQuestions, index, answer, dispatch, secondsRemaining, timeEnd}) => {
  const sanitizedHTML = DOMPurify.sanitize(question.soal);

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
            
          {![0, 51, 67].includes(index) ? (
            <div className='p-10 flex flex-col gap-3'>

              {question.audio_question !== "" && (
                <>
                  <h1>Conversation</h1>
                  <AudioPlayer
                    autoPlay={false}
                    src={`${question.audio_question}`}
                  />
                </>
              )}
              {question.audio !== "" && (
                <>
                  <h1>Question</h1>
                  <AudioPlayer
                    autoPlay={false}
                    src={`${question.audio}`}
                  />
                </>
              )}

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
            <div className='p-10 flex flex-col gap-3'>
              <h1 className='text-center text-xl leading-5 font-medium'>SECTION 1 <br/> LISTENING COMPREHENSION </h1>
              <p className='text-justify'>In this section of the test, you will have an opportunity to demonstrate your ability to understand
              conversations and talks in English. There are three parts to this section, with special directions for each part. Answer all the questions on the basis of what is <b>stated</b> or <b>implied</b> by the speakers you hear. Do <b>not</b> take notes or write in your test book at any time. Do <b>not</b> turn the pages until you are told to do so.</p>
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
          ) : index === 51 ? (
            <div className='p-10 flex flex-col gap-3'>
              <h1 className='text-center text-xl leading-5 font-medium'>SECTION 2 <br/> STRUCTURE AND WRITTEN EXPRESSION </h1>
              <p className='text-justify'>This section is designed to measure your ability to recognize language that is appropriate for standard
              written English. There are two types of questions in this section, with special directions for each type.</p>
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
          ) : index === 91 ? (
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
          ) : index === 67 && (
            <div className='p-10 flex flex-col gap-3'>
              <h1 className='text-center text-xl leading-5 font-medium'>WRITTEN EXPRESSION</h1>
              <p className='text-justify'>In these questions, each sentence has four underlined words or phrases. The four underlined parts of the sentence are marked (A), (B), (C), and (D). Identify the <b>one</b> underlined word or phrase that must be changed in order for the sentence to be correct. Then, on your answer sheet, find the number of the question and fill in the space that corresponds to the letter of the answer you have chosen.</p>
              <p>Look at the following examples.</p>
              
              <p className='font-bold'>Example I</p>
              <div className='flex flex-wrap gap-1'>
                <p className='leading-4 text-center'>
                  <u>The</u>
                  <br/>
                  A
                </p>
                <p className='leading-4'>Four</p>
                <p className='leading-4 text-center'>
                  <u>string</u>
                  <br/>
                  B
                </p>
                <p className='leading-4'>on a violin</p>
                <p className='leading-4 text-center'>
                  <u>are</u>
                  <br/>
                  C
                </p>
                <p className='leading-4 text-center'>
                  <u>tuned</u>
                  <br/>
                  D
                </p>
                <p className='leading-4'>in fifths</p>
              </div>
              <p className='font-bold'>Sample Answer</p>
              <div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    disabled
                  />
                  <label className="ml-2">A</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    disabled
                    defaultChecked
                  />
                  <label className="ml-2">B</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    disabled
                  />
                  <label className="ml-2">C</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    disabled
                  />
                  <label className="ml-2">D</label>
                </div>
              </div>
              
              
              
              <p>The sentence should read, "The four strings on a violin are tuned in fifths." Therefore, you should choose answer (B)</p>

              <p className='font-bold'>Example II</p>
              <div className='flex flex-wrap gap-1'>
                <p className='leading-4'>The</p>
                <p className='leading-4 text-center'>
                  <u>research</u>
                  <br/>
                  A
                </p>
                <p className='leading-4 text-center'>
                  <u>for the</u>
                  <br/>
                  B
                </p>
                <p className='leading-4'>book</p>
                <p className='leading-4 italic'>Roots</p>
                <p className='leading-4 text-center'>
                  <u>taking</u>
                  <br/>
                  C
                </p>
                <p className='leading-4'>Alex Haley</p>
                <p className='leading-4 text-center'>
                  <u>twelve years</u>
                  <br/>
                  D
                </p>
              </div>
              <p className='font-bold'>Sample Answer</p>
              <div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    disabled
                  />
                  <label className="ml-2">A</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio"
                    disabled 
                  />
                  <label className="ml-2">B</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    defaultChecked
                    disabled
                  />
                  <label className="ml-2">C</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    disabled
                  />
                  <label className="ml-2">D</label>
                </div>
              </div>
              
              
              <p>The sentence should read, "The research for the book <i>Roots</i> took Alex Haley twelve years." Therefore, you should choose answer (C)</p>
{/*  */}
              <div class='flex flex-wrap gap-1'>
                <p class='leading-4'>Various</p>
                <p class='leading-4 text-center'>
                  <u>chemical</u>
                  <br/>
                  A
                </p>
                <p class='leading-4 text-center'>
                  <u>element</u>
                  <br/>
                  B
                </p>
                <p class='leading-4'>have more than</p>
                <p class='leading-4 text-center'>
                  <u>one</u>
                  <br/>
                  C
                </p>
                <p class='leading-4 text-center'>
                  <u>isotope</u>
                  <br/>
                  D
                </p>
              </div>
{/*  */}

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
          )}
        </div>
      </div>
    </div>
  )
}

export default Soal