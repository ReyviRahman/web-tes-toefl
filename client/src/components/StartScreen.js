import axios from 'axios';
import React from 'react'

const StartScreen = ({dispatch, setTimeEnd}) => {

  const getTimers = async () => {
    const timeUjian = new Date().getTime(); 
    const twoHoursInMillis = 2 * 60 * 60 * 1000; 
    const updatedTime = new Date(timeUjian + twoHoursInMillis); 
    const formattedTime = updatedTime.toTimeString().split(' ')[0];

    try {
      const response = await axios.put('http://localhost:3001/soal/timers', {
        nohp: '123',
        timeUjian: formattedTime
      });
      setTimeEnd(response.data.timeUjian)
      dispatch({type: 'start'})
    } catch (error) {
      console.error('Error updating timeUjian:', error);
    }
  }

  return (
    <div className='border border-abu text-center pt-10 mt-20 rounded-md'>
      <h1>SECTION 1 LISTENING COMPREHENSION</h1>
      
      <h1 className='font-bold'>Question 1-50</h1>
      <h1 className='mt-10'>SECTION 2 STRUCTURE AND WRITTEN EXPRESSION</h1>
      
      <h1 className='font-bold'>Question 51-90</h1>
      <h1 className='mt-10'>SECTION 3 READING COMPREHENSION</h1>
      
      <h1 className='font-bold'>Question 91-140</h1>

      <button type="button" className="mt-10 w-full bg-primary text-white font-bold p-2 hover:bg-blue-600 rounded-b-md" onClick={() => {
        getTimers()
      }
      }>Mulai Ujian</button>
    </div>
  )
}

export default StartScreen