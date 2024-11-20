import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      }
    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      }
  }
}

const Soal = () => {
  const [{questions, status, index}, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const fetchDataSoal = async () => {
      try {
        const response = await axios.get('http://localhost:3001/soal')
        dispatch({type: 'dataReceived', payload: response.data.soal})
      } catch (error) {
        dispatch({type: 'dataFailed'})
      }
    }

    fetchDataSoal()
  }, [])

  return (
    <div>
      <div className='flex flex-row border min-h-[589px]'>
        <div className='basis-1/3 border-r'>
          <div className='p-4'>
            <div className="grid grid-cols-5 gap-4">
              <div className={`border py-1 text-center rounded ${page === 1 ? 'bg-primary text-white' : ''}`}>1</div>
              <div className={`border py-1 text-center rounded ${page === 2 ? 'bg-primary text-white' : ''}`}>2</div>
              
              <div className='border border-primary bg-secondary py-1 text-center rounded'>3</div>
              <div className='border py-1 text-center rounded'>4</div>
              <div className='border py-1 text-center rounded'>5</div>
              <div className='border py-1 text-center rounded'>6</div>
              <div className='border py-1 text-center rounded'>7</div>
              <div className='border py-1 text-center rounded'>8</div>
              
            </div>
          </div>
        </div>
        <div className='basis-full'>
          {data && (
            <div className='p-10 flex flex-col gap-3'>
              <h1>{data.soal}</h1>
              <div className="flex items-center">
                <input 
                  id="option-1" 
                  type="radio" 
                  name="answer" 
                  value="option-1" 
                  className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
                />
                <label htmlFor="option-1" className="cursor-pointer ml-2">A. {data.pilihan_satu}</label>
              </div>
              <div className="flex items-center">
                <input 
                  id="option-2" 
                  type="radio" 
                  name="answer" 
                  value="option-2" 
                  className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
                />
                <label htmlFor="option-2" className="cursor-pointer ml-2">B. {data.pilihan_dua}</label>
              </div>
              <div className="flex items-center">
                <input 
                  id="option-3" 
                  type="radio" 
                  name="answer" 
                  value="option-3" 
                  className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
                />
                <label htmlFor="option-3" className="cursor-pointer ml-2">C. {data.pilihan_tiga}</label>
              </div>
              <div className="flex items-center">
                <input 
                  id="option-4" 
                  type="radio" 
                  name="answer" 
                  value="option-4" 
                  className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
                />
                <label htmlFor="option-4" className="cursor-pointer ml-2">D. {data.pilihan_empat}</label>
              </div>
              
              <hr className='mt-5' />
              <div className='flex justify-between'>
                <button type='button' className='flex items-center' onClick={handlePrevious}>
                  <span class="material-symbols-outlined border border-secondary rounded-full me-2">
                    chevron_left
                  </span>
                  Sebelumnya
                </button>
                <button type='button' className='flex items-center' onClick={handleNext}>
                  Selanjutnya
                  <span class="material-symbols-outlined border border-secondary rounded-full ms-2">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          )}
          
          
        </div>
      </div>
    </div>
  )
}

export default Soal