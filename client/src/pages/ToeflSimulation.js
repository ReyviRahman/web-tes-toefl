import React, { useEffect, useReducer, useState } from 'react'
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
  secondsRemaining: null
}

const initializer = (initialState) => {
  const savedState = localStorage.getItem('toeflState');
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    return {
      ...initialState,
      index: parsedState.index || initialState.index,
      answer: parsedState.answer || initialState.answer
    }
  }
  return initialState
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
        status: 'active',
        secondsRemaining: action.payload
      }
    case 'finish':
      return {
        ...state,
        status: 'finished'
      }
    case 'tick':
      let now = new Date().getTime();
      return {
        ...state,
        secondsRemaining: action.payload - now,
        status: now > action.payload ? 'finished' : state.status,
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
  const [{questions, status, index, answer, secondsRemaining}, dispatch] = useReducer(reducer, initialState, initializer)
  const numQuestions = questions.length

  const [timeEnd, setTimeEnd] = useState()

  useEffect(() => {
    const stateToSave = {index, answer}
    localStorage.setItem('toeflState', JSON.stringify(stateToSave));
  }, [index, answer])

  useEffect(() => {
    const fetchDataSoal = async () => {
      try {
        
        const response = await axios.get(`http://localhost:3001/soal`);

        const newObject = {petunjuk: "petunjuk"};

        let soalToefl = response.data.soal

        soalToefl.splice(0, 0, newObject);
        soalToefl.splice(51, 0, newObject);
        soalToefl.splice(67, 0, newObject);
        soalToefl.splice(93, 0, newObject);

        console.log('ini seconds Remaining: ', timeEnd)
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
        {status === 'ready' && <StartScreen dispatch={dispatch} setTimeEnd={setTimeEnd} />}
        {status === 'active' && (
          <>
            <Soal question={questions[index]} numQuestions={numQuestions} index={index} answer={answer} dispatch={dispatch} secondsRemaining={secondsRemaining} timeEnd={timeEnd}/>
          </>
        )}
        {status === 'finished' && <FinishScreen status={status} answer={answer} />}
      </Main>
    </div>
  )
}

export default ToeflSimulation