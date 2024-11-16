import React from 'react'

const Soal = () => {
  return (
    <div>
      <div className='flex flex-row border min-h-[589px]'>
        <div className='basis-1/3 border-r'>
          <div className='p-4'>
            <div className="grid grid-cols-5 gap-4">
              <div className='border py-1 text-center bg-primary rounded text-white'>1</div>
              <div className='border py-1 text-center rounded'>2</div>
              <div className='border py-1 text-center rounded'>3</div>
              <div className='border py-1 text-center rounded'>4</div>
              <div className='border py-1 text-center rounded'>5</div>
              <div className='border py-1 text-center rounded'>6</div>
              <div className='border py-1 text-center rounded'>7</div>
              <div className='border py-1 text-center rounded'>8</div>
              
            </div>
          </div>
        </div>
        <div className='basis-full'>
          <div className='p-10 flex flex-col gap-3'>
            <h1>soal nya</h1>
            <div className="flex items-center">
              <input 
                id="option" 
                type="radio" 
                name="answer" 
                value="option-1" 
                className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
              />
              <label htmlFor="option" className="cursor-pointer ml-2">Pilihan A</label>
            </div>
            <div class="flex items-center">
              <input 
                id="option-1" 
                type="radio" 
                name="answer" 
                value="option-1" 
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
              />
              <label for="option-1" class="ml-2">Pilihan A</label>
            </div>
            <div class="flex items-center">
              <input 
                id="option-1" 
                type="radio" 
                name="answer" 
                value="option-1" 
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
              />
              <label for="option-1" class="ml-2">Pilihan A</label>
            </div>
            <div class="flex items-center">
              <input 
                id="option-1" 
                type="radio" 
                name="answer" 
                value="option-1" 
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
              />
              <label for="option-1" class="ml-2">Pilihan A</label>
            </div>
            <hr className='mt-5' />
            <div className='flex justify-between'>
              <button type='button' className='flex items-center'>
                <span class="material-symbols-outlined border border-secondary rounded-full me-2">
                  chevron_left
                </span>
                Sebelumnya
              </button>
              <button type='button' className='flex items-center'>
                Selanjutnya
                <span class="material-symbols-outlined border border-secondary rounded-full ms-2">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Soal