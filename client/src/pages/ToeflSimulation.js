import React, { useEffect, useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import Main from '../components/Main'
import Loader from '../components/Loader'
import Error from '../components/Error'
import axios from 'axios'
import StartScreen from '../components/StartScreen'

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

const ToeflSimulation = () => {
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
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
      </Main>
    </div>
    
  )
}

export default ToeflSimulation