import React from 'react'

const InstructionReading = ({index, dispatch, numQuestions}) => {
  return (
    <div className='p-10 flex flex-col gap-3'>
{/* <p class='text-justify indent-8'>Quite different from storm surges are the giant sea waves called <i>tsunamis</i>, which derive their name from the Japanese expression for "high water in a harbor." These waves are also referred to by the general public as tidal waves, although they have relatively little to do with tides. Scientists often refer to them as seismic sea waves, far more appropriate in that they do result from undersea seismic activity.</p><p class='text-justify indent-8'>Tsunamis are caused when the sea bottom suddenly moves, during an underwater earthquake or volcano for example, and the water above the moving earth is suddenly displaced. This sudden shift of water sets off a series of waves. These waves can travel great distances at specds close to 700 kilometers per hour. In the open ocean, tsunamis have little noticeable amplitude, often no more than one or two meters. It is when they hit the shallow waters near the coast that they increase in height, possibly up to 40 meters.</p><p class='text-justify indent-8'>Tsunamis often occur in the Pacific because the Pacific is an area of heavy seismic activity. Two areas of the Pacific well accustomed to the threat of tsunamis are Japan and Hawaii. Because the seismic activity that causes tsunamis in Japan often occurs on the ocean bottom quite close to the islands, the tsunamis that hit Japan often come with little warning and can therefore prove disastrous. Most of the tsunamis that hit the Hawaiian Islands, however, originate thousands of miles away near the coast of Alaska, so these tsunamis have a much greater distance to trarrel and the inhabitants of Hawaii generally have time for warning of their imminent arrival.</p><p class='text-justify indent-8'>Tsunamis are certainly not limited to Japan and Hawaii. In 1755, Europe experienced a calamitons tsunami, when movement along the fault lines near the Azores caused a massive tsunami to sweep onto the Portuguese coast and flood the heavily populated area around Lisbon. The greatest tsunami on record occurred on the other side of the world in 1883 when the Krakatoa volcano underwent a massive explosion, sending waves more than 30 meters high onto nearby Indonesian islands; the tsunami from this volcano actually traveled around the world and was witnessed as far away as the English Channel.</p> */}
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