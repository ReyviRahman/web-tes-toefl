import React from 'react'

const InstructionStructure = ({ index, dispatch, numQuestions }) => {
  return (
    <div className='p-10 flex flex-col gap-3'>
      <h1 className='text-center text-xl leading-5 font-medium'>
        SECTION 2 <br /> STRUCTURE
      </h1>
      <p className='text-justify'>
        This part of the test measures your ability to recognize correct English structure. 
        Each sentence has a blank indicating a missing word or phrase. Choose the answer that 
        best completes the sentence grammatically and logically.
      </p>
      <p className='text-justify'>
        Select the best answer and proceed to the next question.
      </p>
      <hr className='mt-5' />
      <div className='flex justify-between'>
        <div></div>
        <div>
          {index < numQuestions - 1 && (
            <button
              type='button'
              className='flex items-center'
              onClick={() => dispatch({ type: 'nextQuestion' })}
            >
              Selanjutnya
              <span className='material-symbols-outlined border border-secondary rounded-full ms-2'>
                chevron_right
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default InstructionStructure
