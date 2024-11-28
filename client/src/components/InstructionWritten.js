import React from 'react'

const InstructionWritten = (index, dispatch, numQuestions) => {
  return (
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
          <label className="ml-2">(A)</label>
        </div>
        <div className="flex items-center">
          <input 
            type="radio" 
            disabled
            defaultChecked
          />
          <label className="ml-2">(B)</label>
        </div>
        <div className="flex items-center">
          <input 
            type="radio" 
            disabled
          />
          <label className="ml-2">(C)</label>
        </div>
        <div className="flex items-center">
          <input 
            type="radio" 
            disabled
          />
          <label className="ml-2">(D)</label>
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
          <label className="ml-2">(A)</label>
        </div>
        <div className="flex items-center">
          <input 
            type="radio"
            disabled 
          />
          <label className="ml-2">(B)</label>
        </div>
        <div className="flex items-center">
          <input 
            type="radio" 
            defaultChecked
            disabled
          />
          <label className="ml-2">(C)</label>
        </div>
        <div className="flex items-center">
          <input 
            type="radio" 
            disabled
          />
          <label className="ml-2">(D)</label>
        </div>
      </div>
      
      <p>The sentence should read, "The research for the book <i>Roots</i> took Alex Haley twelve years." Therefore, you should choose answer (C)</p>

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
  )
}

export default InstructionWritten