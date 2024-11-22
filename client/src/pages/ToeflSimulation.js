import React, { useEffect, useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import Main from '../components/Main'
import Loader from '../components/Loader'
import Error from '../components/Error'
import axios from 'axios'
import StartScreen from '../components/StartScreen'
import Soal from './Soal'
import FinishScreen from '../components/FinishScreen'

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: [],
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
    case 'moveToIdx':
      return {
        ...state,
        index: action.payload
      }
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: state.answer.some(item => item.id === state.index)
          ? state.answer.map(item =>
              item.id === question.page ? { ...item, answer: action.payload } : item
            )
          : [...state.answer, { id: state.index, answer: action.payload }]
    };
  }
}

const ToeflSimulation = () => {
  const [{questions, status, index, answer}, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length

  useEffect(() => {
    const fetchDataSoal = async () => {
      try {
        const response = await axios.get('http://localhost:3001/soal')

        const newObject = {petunjuk: "petunjuk"};

        let soalToefl = response.data.soal

        soalToefl.splice(0, 0, newObject);
        soalToefl.splice(2, 0, newObject);
        soalToefl.splice(4, 0, newObject);
        console.log('ini soalToefl', soalToefl)

        dispatch({type: 'dataReceived', payload: response.data.soal})
      } catch (error) {
        dispatch({type: 'dataFailed'})
      }
    }

    fetchDataSoal()
  }, [])

  useEffect(() => {
    console.log("State changed:");
    console.log("Questions:", questions);
    console.log("Status:", status);
    console.log("Index:", index);
    console.log("Answer:", answer);
  }, [questions, status, index, answer]);

  return (
    <div>
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Soal question={questions[index]} numQuestions={numQuestions} index={index} answer={answer} dispatch={dispatch}/>
          </>
        )}
        {status === 'finished' && <FinishScreen answer={answer} />}
      </Main>
    </div>
  )
}

export default ToeflSimulation