import React from 'react'

const InstructionListening = ({index, dispatch, numQuestions}) => {
  return (
    <div className='p-10 flex flex-col gap-3'>
      <h1 className='text-center text-xl leading-5 font-medium'>SECTION 1 <br/> LISTENING COMPREHENSION </h1>
      <p className='text-justify'>
  In this section of the test, you will have the opportunity to demonstrate your ability to understand conversations and talks in English. Answer all questions based on what is <b>stated</b> or <b>implied</b> by the speakers you hear. 
</p>
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

export default InstructionListening  