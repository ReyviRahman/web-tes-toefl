import React from 'react'

const InstructionStructure = ({index, dispatch, numQuestions}) => {
  return (
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
  )
}

export default InstructionStructure 