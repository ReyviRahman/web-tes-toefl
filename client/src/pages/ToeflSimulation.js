import React, { useEffect, useReducer, useState } from 'react'
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
  secondsRemaining: undefined
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
        // status: state.secondsRemaining === 0 ? 'finished' : state.status,
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
  const [{questions, status, index, answer, secondsRemaining}, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length

  const [timeEnd, setTimeEnd] = useState()

  useEffect(() => {
    const fetchDataSoal = async () => {
      try {
        const timeUjian = new Date().getTime(); 
        const twoHoursInMillis = 2 * 60 * 60 * 1000; 
        const updatedTime = new Date(timeUjian + twoHoursInMillis); 
        const formattedTime = updatedTime.toTimeString().split(' ')[0];
        const response = await axios.get(`http://localhost:3001/soal?nohp=123&timeUjian=${formattedTime}`);

        const newObject = {petunjuk: "petunjuk"};

        let soalToefl = response.data.soal

        soalToefl.splice(0, 0, newObject);
        soalToefl.splice(2, 0, newObject);
        soalToefl.splice(4, 0, newObject);

        setTimeEnd(response.data.timeUjian) 
        console.log('ini seconds Remaining: ', timeEnd)
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
            <Soal question={questions[index]} numQuestions={numQuestions} index={index} answer={answer} dispatch={dispatch} secondsRemaining={secondsRemaining} timeEnd={timeEnd}/>
          </>
        )}
        {status === 'finished' && <FinishScreen answer={answer} />}
      </Main>
    </div>
  )
}

export default ToeflSimulation