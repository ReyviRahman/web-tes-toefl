import React, { useEffect, useReducer, useState } from 'react'
import Main from '../components/Main'
import Loader from '../components/Loader'
import Error from '../components/Error'
import axios from 'axios'
import StartScreen from '../components/StartScreen'
import Soal from './Soal'
import FinishScreen from '../components/FinishScreen'
import useAuth from '../hooks/useAuth'
import Navbar from '../components/Navbar'
import NavbarUser from '../components/NavbarUser'

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: [],
  secondsRemaining: null,
  sesi: ''
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
    case 'restart':
      return {
        status: 'ready'
      }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        secondsRemaining: 0
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1
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
    }
    case 'getSesi':
      return {
        ...state,
        sesi: action.payload
      };
  }
}

const ToeflSimulation = () => {
  const { auth } = useAuth()
  console.log('auth dari toefl simulation', auth)
  const [{questions, status, index, answer, secondsRemaining, sesi}, dispatch] = useReducer(reducer, initialState, initializer)
  console.log('ini sesi', sesi)
  const numQuestions = questions.length

  useEffect(() => {
    const stateToSave = {index, answer}
    localStorage.setItem('toeflState', JSON.stringify(stateToSave));
  }, [index, answer])

  useEffect(() => {
    const fetchDataSoal = async () => {
      try {
        
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/soal`);
        console.log(response.data);

        const newObject = {petunjuk: "petunjuk"};

        let soalToefl = response.data.soal

        soalToefl.splice(0, 0, newObject);
        soalToefl.splice(51, 0, newObject);
        soalToefl.splice(67, 0, newObject);
        soalToefl.splice(93, 0, newObject);

        dispatch({type: 'dataReceived', payload: response.data.soal})
      } catch (error) {
        dispatch({type: 'dataFailed'})
      }
    }

    fetchDataSoal()
  }, [])

  return (
    <div>
      <NavbarUser />
      <Main>
        <div className='container mx-auto'>
          {status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
          {status === 'ready' && <StartScreen dispatch={dispatch} nohp={auth.nohp}/>}
          {status === 'active' && (
            <>
              <Soal question={questions[index]} numQuestions={numQuestions} index={index} answer={answer} dispatch={dispatch} secondsRemaining={secondsRemaining} nohp={auth.nohp} sesi={sesi}/>
            </>
          )}
          {status === 'finished' && <FinishScreen dispatch={dispatch} nohp={auth.nohp} status={status} answer={answer} />}
        </div>
      </Main>
    </div>
  )
}

export default ToeflSimulation