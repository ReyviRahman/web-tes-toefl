import React, { useEffect, useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import Main from '../components/Main'
import Loader from '../components/Loader'
import Error from '../components/Error'
import axios from 'axios'
import StartScreen from '../components/StartScreen'
import Soal from './Soal'

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
    case 'start':
      return {
        ...state,
        status: 'active'
      }
    case 'prevQuestion':
      return {
        ...state,
        index: state.index - 1,
      }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
      }
  }
}

const ToeflSimulation = () => {
  const [{questions, status, index}, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length

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
        {status === 'ready' && <StartScreen dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Soal question={questions[index]} numQuestions={numQuestions} index={index} dispatch={dispatch}/>
          </>
        )}
      </Main>
    </div>
  )
}

export default ToeflSimulation