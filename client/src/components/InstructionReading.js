import React from 'react'

const InstructionReading = ({index, dispatch, numQuestions}) => {
  return (
    <div className='p-10 flex flex-col gap-3'>
<p class='text-justify indent-8'>It is a characteristic of human nature that people like to get together and have fun, and people living during America's frontier days were no exception. However, because life was hard and the necessities of day-to-day living took up their time, it was common for recreation to be combined with activities necessary for survival.</p><p class='text-justify indent-8'>One example of such a form of recreation was logrolling. Many frontier areas were heavily wooded, and in order to settle an area it was necessary to remove the trees. A settler could cut down the trees alone, but help was needed to move the cut trees. After a settler had cut a bunch of trees, he would then invite his neighbors over for a logrolling.</p><p class='text-justify indent-8'>A logrolling was a community event where families got together for a combination of work and fun. The women wuould bring food and have a much needed and infrequent opportunity to relax and chat with friends, the children would play together exuberantly, and the men would hold lively competitions that involved rolling logs from place to place as quickly as possible. This was a day of fun for everyone involved, but at its foundation was the need to clear the land.</p>
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