import React from 'react'

const InstructionReading = ({index, dispatch, numQuestions}) => {
  return (
    <div className='p-10 flex flex-col gap-3'>
      <p class='text-justify indent-8'>The Hollywood sign in the hills that line the northern border of Los Angeles is a famous landmark recognized the world over. The white-painted, 50-foot-high, sheet metal letters can be seen from great distances across the Los Angeles basin.</p>
      <p class='text-justify indent-8'>The sign was not constructed, as one might suppose, by the movie business as a means of celebrating the importance of Hollywood to this industry; instead, it was first constructed in 1923 as a means of advertising homes for sale in a 500-acre housing subdivision in a part of Los Angeles called "Hollywoodland." The sign that was constructed at the time of course said "Hollywoodland." Over the years, people began referring to the area by the shortened version "Hollywood," and after the sign and its site were donated to the city in 1945, the last four letters were removed.</p>
      <p class='text-justify indent-8'>The sign was not constructed, as one might suppose, by the movie business as a means of celebrating the importance of Hollywood to this industry; instead, it was first constructed in 1923 as a means of advertising homes for sale in a 500-acre housing subdivision in a part of Los Angeles called "Hollywoodland." The sign that was constructed at the time of course said "Hollywoodland." Over the years, people began referring to the area by the shortened version "Hollywood," and after the sign and its site were donated to the city in 1945, the last four letters were removed.</p>


      <h1 className='text-center text-xl leading-5 font-medium'>SECTION 3<br />READING COMPREHENSION</h1>
      <p className='text-justify'>In this section you will read several passages. Each one is followed by a number of questions about it. You are to choose the <b>one</b> best answer, (A), (B), (C), (D), to each question. Then, letter of the answer you have chosen</p>
      <p className='text-justify indent-8'>Answer all questions about the information in a passage on the basis of what is <b>stated</b> or <b>implied</b> in that passage.</p>
      <p className='text-justify'>Read the following passage:</p>
      <p className='text-justify indent-8'>John Quincy Adams, who served as the sixth president of the United States from 1825 to 1829, is today recognized for his masterful statesmanship and diplomacy. He dedicated his life to public service, both in the presidency and in the various other political offices that he held. Throughout his political career he demonstrated his unswerving belief in freedom of speech, the antislavery cause, and the right of Americans to be free from European and Asian domination.</p>
      <div>
        <p className='font-bold'>Example I</p>
        <p>To what did John Quincy Adams devote his life?</p>
      </div>
      <div>
        <p className='font-bold'>Sample Answer</p>
        <div className="flex items-center">
          <input 
            type="radio" 
            disabled
          />
          <label className="ml-2">(A) Improving his personal life
          </label>
        </div>
        <div className="flex items-center">
          <input 
            type="radio" 
            disabled
            defaultChecked
          />
          <label className="ml-2">(B) Serving the public</label>
        </div>
        <div className="flex items-center">
          <input 
            type="radio" 
            disabled
          />
          <label className="ml-2">(C) Increasing his fortune</label>
        </div>
        <div className="flex items-center">
          <input 
            type="radio" 
            disabled
          />
          <label className="ml-2">(D) Working on his private business</label>
        </div>
      </div>
      
      <p>According to the passage, John Quincy Adams "dedicated his life to public service." Therefore, you should choose answer (B)</p>
      
      <div>
        <p className='font-bold'>Example II</p>
        <p>In line 4, the word "unswerving" is closest in meaning to</p>
      </div>
      <div>
        <p className='font-bold'>Sample Answer</p>
        <div className="flex items-center">
          <input 
            type="radio" 
            disabled
          />
          <label className="ml-2">(A) moveable</label>
        </div>
        <div className="flex items-center">
          <input 
            type="radio"
            disabled 
          />
          <label className="ml-2">(B) insignificant</label>
        </div>
        <div className="flex items-center">
          <input 
            type="radio" 
            defaultChecked
            disabled
          />
          <label className="ml-2">(C) unchanging</label>
        </div>
        <div className="flex items-center">
          <input 
            type="radio" 
            disabled
          />
          <label className="ml-2">(D) diplomatic</label>
        </div>
      </div>
      
      <p>The passage states that John Quincy Adams demonstrated his unswerving belief "throughout his career." This implies that the belief did not change.Therefore, you should choose answer (C)</p>

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

export default InstructionReading