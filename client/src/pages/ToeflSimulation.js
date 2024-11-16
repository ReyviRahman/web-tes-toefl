import React from 'react'
import { Outlet } from 'react-router-dom'

const ToeflSimulation = () => {
  return (
    <div>
      <div className='container mx-auto'>
        <div className='border border-abu text-center pt-10 mt-20 rounded-md'>
          <h1>SECTION 1 LISTENING COMPREHENSION</h1>
          
          <h1 className='font-bold'>Question 1-50</h1>
          <h1 className='mt-10'>SECTION 2 STRUCTURE AND WRITTEN EXPRESSION</h1>
          
          <h1 className='font-bold'>Question 51-90</h1>
          <h1 className='mt-10'>SECTION 3 READING COMPREHENSION</h1>
          
          <h1 className='font-bold'>Question 91-140</h1>

          <button type="submit" className="mt-10 w-full bg-primary text-white font-bold p-2 hover:bg-blue-600 rounded-b-md">Mulai Ujian</button>

        </div>
        
      </div>
    </div>
    
  )
}

export default ToeflSimulation